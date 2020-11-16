module cannondis {

    import Display3DSprite = Pan3d.Display3DSprite;
    import Vector3D = Pan3d.Vector3D;
    import Quaternion = Pan3d.Quaternion;
    import Vector2D = Pan3d.Vector2D;
    import Matrix3D = Pan3d.Matrix3D;
    import SceneManager = Pan3d.SceneManager;
    import Scene_data = Pan3d.Scene_data;
    import Shader3D = Pan3d.Shader3D;
    import CombineParticle = Pan3d.CombineParticle;
    import GroupItem = Pan3d.GroupItem;
    import GroupRes = Pan3d.GroupRes;
    import BaseRes = Pan3d.BaseRes;
    import ObjData = Pan3d.ObjData;
    import TextureManager = Pan3d.TextureManager
    import TextureRes = Pan3d.TextureRes
    import TimeUtil = Pan3d.TimeUtil

    import DirectShadowDisplay3DSprite = shadow.DirectShadowDisplay3DSprite;
    import ShadowModel = shadow.ShadowModel;
    import Physics = canonkey.Physics;

    export class MainCanonPrefabSprite extends canonkey.CanonPrefabSprite {

        public bodyfouce: Vector3D;
        public constructor(value: CANNON.Body) {
            super(value);
            this.bodyfouce = new Vector3D

        }
        protected LinearFun(t: number, b: number, c: number, d: number): number {
            return c * t / d + b;
        }
        public beginGravityVo: GravityVo;
        public aotuFallDownTm: number
        public endGravityVo: GravityVo;
        public update(): void {
            this.hasGravityVoDown()
            super.update();
            if (this.guijiparticle) {
                if (this.tureMovePos) {
                    this.guijiparticle.x = this.x + this.tureMovePos.x;
                    this.guijiparticle.y = this.y + this.tureMovePos.y;
                    this.guijiparticle.z = this.z + this.tureMovePos.z;
                } else {
                    this.guijiparticle.x = this.x;
                    this.guijiparticle.y = this.y;
                    this.guijiparticle.z = this.z;
                }
            }

        }
        private hasGravityVoDown(): boolean {
            if (this.beginGravityVo && this.endGravityVo) {//有掉落信息
                var n: number = TimeUtil.getTimer() - this.aotuFallDownTm;
                var $tmNum: number = 400
                if (n < $tmNum) {
                    var add: Vector3D = new Vector3D(this.endGravityVo.x - this.beginGravityVo.x, this.endGravityVo.y - this.beginGravityVo.y, this.endGravityVo.z - this.beginGravityVo.z);
                    add.scaleBy(this.LinearFun(n, 0, 1, $tmNum));
                    this.body.position = Physics.Vec3dW2C(new Vector3D(this.beginGravityVo.x + add.x, this.beginGravityVo.y + add.y, this.beginGravityVo.z + add.z))
                } else {
                    this.body.position = Physics.Vec3dW2C(new Vector3D(this.endGravityVo.x, this.endGravityVo.y, this.endGravityVo.z));
                    this.beginGravityVo = null;
                    this.endGravityVo = null;
                    this.body.wakeUp();

                }
                return true
            } else {
                if (this.body && this.bodyfouce) {
                    this.body.force = canonkey.Physics.Vec3dW2C(this.bodyfouce);
                }
                return false
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
        private tureMovePos: Vector3D
        public resetParticlePos(): void {
            if (this.guijiparticle) {
                if (this.tureMovePos) {
                    this.guijiparticle.x = this.x + this.tureMovePos.x;
                    this.guijiparticle.y = this.y + this.tureMovePos.y;
                    this.guijiparticle.z = this.z + this.tureMovePos.z;
                } else {
                    this.guijiparticle.x = this.x;
                    this.guijiparticle.y = this.y;
                    this.guijiparticle.z = this.z;
                }
                
                this.guijiparticle.reset();
            }
        }
        public guijiparticle: CombineParticle
        public playLyf($url: string, $pos: Vector3D = null, $scale: number = 1, $bfun: Function = null): void {
            var $scene: layapan.LayaOverride2dSceneManager = (<layapan.LayaOverride2dSceneManager>this._scene)
            $scene.groupDataManager.scene = $scene
            $scene.groupDataManager.getGroupData(Scene_data.fileRoot + $url, (groupRes: GroupRes) => {
                for (var i: number = 0; i < groupRes.dataAry.length; i++) {
                    var item: GroupItem = groupRes.dataAry[i];
                    if (item.types == BaseRes.SCENE_PARTICLE_TYPE) {
                        var $particle: CombineParticle = $scene.particleManager.getParticleByte(Scene_data.fileRoot + item.particleUrl);
                        if (this.guijiparticle) {
                            $scene.particleManager.removeParticle(this.guijiparticle);
                        }
                        $scene.particleManager.addParticle($particle);
                        this.guijiparticle = $particle;
                        this.guijiparticle.scaleX = $scale
                        this.guijiparticle.scaleY = $scale
                        this.guijiparticle.scaleZ = $scale
                        this.tureMovePos = $pos;
                        this.resetParticlePos()

                        $bfun && $bfun()
                    } else {
                        console.log("播放的不是单纯特效");
                    }
                }
            })
        }
        public changeSkinById(value: number): void {
            (<MainDirectShadowDisplay3DSprite>this._directShadowDisplay3DSprite).setOtherPic("panelui/skin/pic/skin" + value + ".png");

        }
        protected mathBodyScale(): void {
            var $body: CANNON.Body = this._body;
            var arr: Array<number> = null

            for (var i: number = 0; i < $body.shapes.length; i++) {
                var $shapePos: Vector3D = canonkey.Physics.Vect3dC2W($body.shapeOffsets[i])
                var $shapeQua: Quaternion = canonkey.Physics.Quaternion2W($body.shapeOrientations[i]);
                var $tempDis: MainDirectShadowDisplay3DSprite = new MainDirectShadowDisplay3DSprite()

                switch ($body.shapes[i].type) {
                    case 1:
                        var $sphere: CANNON.Sphere = <CANNON.Sphere>$body.shapes[i];
                        $shapePos.scaleBy(100 / $sphere.radius)
                        $tempDis.setModelById("whiteball");
                        $tempDis.scaleX = $sphere.radius *1;
                        $tempDis.scaleY = $sphere.radius * 1;
                        $tempDis.scaleZ = $sphere.radius * 1;
                        break;
                    default:

                        break;
                }
                this._directShadowDisplay3DSprite = $tempDis
                this.dispList.push($tempDis);
            }
        }

    }
}