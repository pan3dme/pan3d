module frame3d {

    import Display3D = Pan3d.Display3D;
    import Vector3D = Pan3d.Vector3D;
    import Quaternion = Pan3d.Quaternion;
    import Vector2D = Pan3d.Vector2D;
    import Object3D = Pan3d.Object3D;
    import Matrix3D = Pan3d.Matrix3D;
    import TimeUtil = Pan3d.TimeUtil;
    import Scene_data = Pan3d.Scene_data
    import ObjDataManager = Pan3d.ObjDataManager;
    import ObjData = Pan3d.ObjData
    import CollisionVo = Pan3d.CollisionVo
    import Display3DSprite = Pan3d.Display3DSprite;

    import DirectShadowColorSprite = cannondis.DirectShadowColorSprite
    import MainDirectShadowDisplay3DSprite = cannondis.MainDirectShadowDisplay3DSprite


    import CanonPrefabSprite = canonkey.CanonPrefabSprite;
    import Physics = canonkey.Physics;

    export class BaseVo {
        public x: number;
        public y: number;
        public z: number;

        public rotationX: number;
        public rotationY: number;
        public rotationZ: number;

        public tx: number;
        public ty: number;
        public tz: number;

        public rx: number;
        public ry: number;
        public rz: number;
        public rw: number;
    }

    export class FrameCanonPrefabSprite extends CanonPrefabSprite {
        public frameFileNode: frame3d.FrameFileNode;
        public frame3dRes: frame3d.Frame3dRes;
        public maxTime: number
        public delayedTm: number
        public isStop: boolean
        public constructor(value: CANNON.Body) {
            super(value);
            this.frameFileNode = new frame3d.FrameFileNode;
            this.frameFileNode.sprite = new Object3D;
            this.maxTime = 0;
            this.x = 0;
            this.y = 0;
            this.z = 0;
            this._frmeNumItemDic = new Pan3d.Dictionary([])
        }
        private _frmeNumItemDic: Pan3d.Dictionary
        public static isMove: boolean = true;

        private static skipNum: number = 0;
        private lastSysTm: number=0
        public update(): void {
            if (FrameCanonPrefabSprite.isMove) {
                var useTim: number = TimeUtil.getTimer() - game.GameDataModel.levelStartTm;
                if (this.isStop) {
                    this.delayedTm += TimeUtil.getTimer() - this.lastSysTm;
                }
                this.lastSysTm = TimeUtil.getTimer() 
             

                useTim = Math.max(useTim - this.delayedTm, 0);
                var $f: number = useTim / 60
                var $frameTime: number = $f % this.maxTime;
                $frameTime = Math.floor($frameTime * 5) / 5
                var $obj: BaseVo

                if (!this._frmeNumItemDic[$frameTime]) {
                    $obj = new BaseVo();
                    this.frameFileNode.update($frameTime)
                    var $m: Matrix3D = new Matrix3D();
                    $m.appendTranslation(this.frameFileNode.sprite.x * 10, this.frameFileNode.sprite.y * 10, this.frameFileNode.sprite.z * 10);
                    var tempM: Matrix3D = this.bindMatrix.clone();
                    tempM.prepend($m);
                    $obj.x = tempM.position.x;
                    $obj.y = tempM.position.y;
                    $obj.z = tempM.position.z;
                    $obj.rotationX =- this.frameFileNode.sprite._rotationX;
                    $obj.rotationY =- this.frameFileNode.sprite._rotationY;
                    $obj.rotationZ =- this.frameFileNode.sprite._rotationZ;

                    this._x = $obj.x;
                    this._y = $obj.y;
                    this._z = $obj.z;
                    this._rotationX = $obj.rotationX;
                    this._rotationY = $obj.rotationY;
                    this._rotationZ = $obj.rotationZ;
            
                    this.updateMatrix();

                    $obj.tx = this.body.position.x
                    $obj.ty = this.body.position.y
                    $obj.tz = this.body.position.z
                    $obj.rx = this.body.quaternion.x
                    $obj.ry = this.body.quaternion.y
                    $obj.rz = this.body.quaternion.z
                    $obj.rw = this.body.quaternion.w

                    this._frmeNumItemDic[$frameTime] = $obj

                } else {
                    $obj = this._frmeNumItemDic[$frameTime];
                    this._x = $obj.x;
                    this._y = $obj.y;
                    this._z = $obj.z;
                    this._rotationX = $obj.rotationX;
                    this._rotationY = $obj.rotationY;
                    this._rotationZ = $obj.rotationZ;
                    this.body.position.x = $obj.tx
                    this.body.position.y = $obj.ty
                    this.body.position.z = $obj.tz

                    this.body.quaternion.x = $obj.rx
                    this.body.quaternion.y = $obj.ry
                    this.body.quaternion.z = $obj.rz
                    this.body.quaternion.w = $obj.rw
                }
   
                    super.update();

           
            }
        }

        public destory(): void {
            Physics.world.removeBody(this._body);
            while (this.dispList.length) {
                this._scene.removeDisplay(this.dispList.pop());
            }
            this._scene.removeDisplay(this);
            super.destory();
        }
        public makeSpriteByData($vo: FrameNodeVo): void {
            this.frameFileNode.setFrameNodeVo($vo);
            var $base: MainDirectShadowDisplay3DSprite = new MainDirectShadowDisplay3DSprite();
            $base._scene = this._scene;
            $base.groupItem = new Array();
            var $dis: Pan3d.Display3DSprite = new Pan3d.Display3DSprite();
            $dis.setObjUrl($vo.resurl);
            $dis._rotationData = new Float32Array(9)
            if ($vo.materialInfoArr && $vo.materialInfoArr.length) {
                $base.setPicUrl($vo.materialInfoArr[0].url);
            } else {
                console.log("没有指定贴图")
            }



            $base.groupItem.push($dis);
     
            $base.scaleX = $vo.pointitem[0].scaleX * 10;
            $base.scaleY = $vo.pointitem[0].scaleY * 10;
            $base.scaleZ = $vo.pointitem[0].scaleZ * 10;

            $base.x = 10000//先设定一个很大的值 
            this._scene.addDisplay($base)
            this._directShadowDisplay3DSprite = $base;
            this.dispList.push($base);

            this.makeBodyByObjData($vo.resurl)
            //加上渲染模式
    
            if ($vo.receiveShadow) {
                $base.renderType = 1;
            } else {
                $base.renderType = 0;
            }


        }
        private makeBodyByObjData($objUrl: string): void {

            ObjDataManager.getInstance().getObjData(Scene_data.fileRoot + $objUrl, ($objData: ObjData) => {

                /*
                for (var i: number = 0; i < $objData.collision.collisionItem.length && i < 1; i++) {
                    var $vo: CollisionVo = $objData.collision.collisionItem[i];

                    var $scale: Vector3D = new Vector3D;
                    var $base: Display3DSprite = this._directShadowDisplay3DSprite
                    $scale.x = $vo.scaleX * $base.scaleX * 100;
                    $scale.y = $vo.scaleY * $base.scaleY * 100;
                    $scale.z = $vo.scaleZ * $base.scaleZ * 100;
                    $scale.x = 1
                    $scale.y = 1
                    $scale.z=1
                    console.log($scale)
                    Physics.bodyAddShape(this.body, Physics.makeBoxShape($scale))

                }
                */
                Physics.makeBuildBodyMesh(this._directShadowDisplay3DSprite, $objData.collision, this.body);
                this.body.position.x=100000//设置一个很远的位置

            });
        }

        protected mathBodyScale(): void {

        }

    }

}