module baoxiang {
    import ProgrmaManager = Pan3d.ProgrmaManager
    import ObjData = Pan3d.ObjData
    import UIManager = Pan3d.UIManager
    import Vector3D = Pan3d.Vector3D
    import TextureManager = Pan3d.TextureManager
    import Scene_data = Pan3d.Scene_data
    import ObjDataManager = Pan3d.ObjDataManager
    import Shader3D = Pan3d.Shader3D
    import Display3DSprite = Pan3d.Display3DSprite
    import TextureRes = Pan3d.TextureRes
    import GroupDataManager = Pan3d.GroupDataManager
    import GroupItem = Pan3d.GroupItem
    import GroupRes = Pan3d.GroupRes
    import BaseRes = Pan3d.BaseRes


    export class BaoxiangMeshVo {
        public name: string
        public id: number;
        public type: number
        public num: number
        public x: number
        public y: number
        public z: number
        public rotation: number
        public random: number
        public meshObj(value: any): void {
            this.id = value.id;
            this.type = value.type;
            this.num = value.num;
            this.random = value.random;
            this.x = value.x;
            this.y = value.y;
            this.z = value.z;
            this.rotation = value.rotation;
        }
    }

    export class BaoxiangDisplay3DSprite extends Display3DSprite {

        constructor() {
            super();
        }
        public baoxiangMeshVo: BaoxiangMeshVo;
        public isOpen: boolean;
        public update(): void {
       
            if (!this.isOpen&&game.GameDataModel.centenBall && Math.abs(this.y - game.GameDataModel.centenBall.y) < 400) {
                this.sceneVisible = true
            } else {
                this.sceneVisible = false
            }
            if (this.objData && this.sceneVisible) {
                super.update()
                this.textHitCentenBall()
            }
        }
        protected textHitCentenBall(): void {
            var $dis: number = Vector3D.distance(new Vector3D(game.GameDataModel.centenBall.x, game.GameDataModel.centenBall.y, game.GameDataModel.centenBall.z), new Vector3D(this.x, this.y, this.z))
            if ($dis < 20) {
                this.isOpen = true
                this.showFinishEfict()
                GameData.dispatchEvent(new baoxiang.BaoxiangEvent(baoxiang.BaoxiangEvent.SHOW_BAOXIANG_PANEL), this.baoxiangMeshVo)

            }
        }

        public showFinishEfict(): void {

            var $str: string = GameData.getStorageSync("hasBaoxiang")
            var $arr: Array<any>
            if (!$str) {
                console.log("第一次获取钻石")
                $arr = new Array;
            } else {
                $arr = JSON.parse($str);
            }
            $arr.push({ name: this.baoxiangMeshVo.name, time: Date.now().toString() })
            GameData.setStorageSync("hasBaoxiang", JSON.stringify($arr))

        }
        public setModelById($str: string): void {

            GroupDataManager.getInstance().getGroupData(Scene_data.fileRoot + getModelUrl($str), (groupRes: GroupRes) => {
                for (var i: number = 0; i < groupRes.dataAry.length; i++) {
                    var item: GroupItem = groupRes.dataAry[i];
                    if (item.types == BaseRes.PREFAB_TYPE) {
             
                        this.setObjUrl(item.objUrl);
                        this.setMaterialUrl(item.materialUrl, item.materialInfoArr);

                        this.scale=0.4

                    }
                }
             
            })


        }

    }

}
