module frame3d {
    import Display3D = Pan3d.Display3D;
    import Vector3D = Pan3d.Vector3D;
    import Quaternion = Pan3d.Quaternion;
    import Vector2D = Pan3d.Vector2D;

    import ObjDataManager = Pan3d.ObjDataManager;
    import Scene_data = Pan3d.Scene_data;
    import ObjData = Pan3d.ObjData;

  
    export class CanonFrame3DSprite extends Display3D {
        public name: string
        public spriteItem: Array<FrameCanonPrefabSprite>;
        constructor() {
            super();
            this.delayedTm =0
        }
        private isStop: boolean
        public clik(value: boolean): void {
            this.isStop = !this.isStop;
            for (var i: number = 0; this.spriteItem && i < this.spriteItem.length; i++) {
       
                this.spriteItem[i].isStop = this.isStop;
            }
            console.log("点到了", this.isStop)

        }
        public setInfo(value: any): void {
            this.frame3dUrl = "frame3d/jiguan001_frame_base.txt"; //获得frame3D的地址
            if (value.name) {
                this.setSpecialDataByName(value.name)
            }
            this.spriteItem = new Array();
            this.frame3dRes = new frame3d.Frame3dRes();
            this.frame3dRes.load(Pan3d.Scene_data.fileRoot + this.frame3dUrl, () => this.loadFrame3DFinish());
        
        }

        private frame3dUrl: string;
        private delayedTm: number;
        private setSpecialDataByName(value: string): void {
            var arr: Array<String> = value.split("_");
            if (Pan3d.Scene_data.supportBlob) {
                this.frame3dUrl = "frame3d/" + arr[0] + "_frame.txt"    //[0] 为机关名
            } else {
                this.frame3dUrl = "frame3d/" + arr[0] + "_frame_base.txt"    //[0] 为机关名
            }
         
            if (arr[1] && !isNaN(Number(arr[1]))) {                    //[1]为延时
                this.delayedTm = Number(arr[1])
            } else {
                this.delayedTm = 0
            }
       
     
       
        }

        public destory(): void {
         
            console.log("清理机关")
            while (this.spriteItem.length) {
                var dis: FrameCanonPrefabSprite = this.spriteItem.pop();
                dis.destory();
               
            }
            super.destory();
        }
        private frame3dRes: frame3d.Frame3dRes
        private loadFrame3DFinish(): void {
            if (!this._scene) {
                return
            }
       
            for (var i: number = 0; i < this.frame3dRes.frameItem.length; i++) {
                var $box: CANNON.Shape = new CANNON.Box(new CANNON.Vec3(0.001, 0.001, 0.001))
                var $body: CANNON.Body = new CANNON.Body({ mass: 1 });
                $body.collisionFilterGroup = game. GameDataModel.GROUP2;
                $body.collisionFilterMask = game. GameDataModel.GROUP1;
                $body.type = CANNON.Body.KINEMATIC;
                $body.addShape($box)
                var $sprite: FrameCanonPrefabSprite = new FrameCanonPrefabSprite($body);
                $sprite.frame3dRes = this.frame3dRes;
                $sprite._scene = this._scene;
                $sprite.makeSpriteByData(this.frame3dRes.frameItem[i]);
 

                $sprite.delayedTm = this.delayedTm


                $sprite.addToWorld();

                this.spriteItem.push($sprite);
                for (var j: number = 0; j < this.frame3dRes.frameItem[i].pointitem.length; j++) {
                    $sprite.maxTime = Math.max($sprite.maxTime,this.frame3dRes.frameItem[i].pointitem[j].time)
                }
                $sprite.bindMatrix = this.posMatrix;
              
            }
        }
    }
}