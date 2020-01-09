module revive {
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


    import LayaOverride2dSceneManager = layapan.LayaOverride2dSceneManager;

    export class ReviveModelSprite extends Display3DSprite {

        constructor() {
            super();
        }
        private _istobeHit: boolean
        private get istobeHit(): boolean {
            return this._istobeHit
        }
        private set istobeHit(value: boolean) {
            this._istobeHit = value
            this.setIsHitEff()
        }
        public update(): void {
            super.update()
            if (!this.istobeHit) {
                this.textHitCentenBall()
            }
            if (this.selectParticeModel) {

                if (game.GameDataModel.centenBall && Math.abs(this.y - game.GameDataModel.centenBall.y) < 400) {
                    this.selectParticeModel.sceneVisible = true
                } else {
                    this.selectParticeModel.sceneVisible = false
                }
          
            }
        }
        protected textHitCentenBall(): void {
            if (20 > Pan3d.Display3D.distance(game.GameDataModel.centenBall, this)) {
                game.GameDataModel.lastRevivePos = new Vector3D(this.x, this.y, this.z)
                this.istobeHit = true;

            }
        }
        private selectPartice(): void {
            if (this.particleItem.length == 2 && this._scene) {
                var $scene: LayaOverride2dSceneManager = <LayaOverride2dSceneManager>this._scene
                $scene.particleManager.removeParticle(this.selectParticeModel);
                this.selectParticeModel = this.particleItem[0]
                $scene.particleManager.addParticle(this.selectParticeModel);
            } else {
                console.log("复活点特效不是设计需求")
            }

        }
        public selectParticeModel: Pan3d.CombineParticle
        private setIsHitEff(): void {
            if (this.particleItem.length == 2 && this._scene) {
                var $scene: LayaOverride2dSceneManager = <LayaOverride2dSceneManager>this._scene
                $scene.particleManager.removeParticle(this.selectParticeModel);
                this.selectParticeModel = this.particleItem[1]
                $scene.particleManager.addParticle(this.selectParticeModel);
            } 
            else {
                console.log("复活点特效不是设计需求")
            }

        }
        private particleItem: Array<Pan3d.CombineParticle>
        public setReviveTemp(value: any): void {

            var $str = "reviveeff"
            var $arr: Array<string> = String(value.name).split("_");
            if ($arr[1]) {
                $str=$arr[1]
            }
            this.particleItem = new Array()
            GroupDataManager.getInstance().getGroupData(Scene_data.fileRoot + getModelUrl($str), (groupRes: GroupRes) => {
                for (var i: number = 0; i < groupRes.dataAry.length; i++) {
                    var item: GroupItem = groupRes.dataAry[i];
                    if (item.types == BaseRes.SCENE_PARTICLE_TYPE) {
                        var $scene: LayaOverride2dSceneManager = <LayaOverride2dSceneManager>this._scene
                        var $particle: Pan3d.CombineParticle = $scene.particleManager.getParticleByte(Pan3d.Scene_data.fileRoot + item.particleUrl);
                        $particle.x = this.x;
                        $particle.y = this.y-7 ;
                        $particle.z = this.z;
                        this.particleItem.push($particle)
                    } else {
                        console.log("复活点特效不是设计需求")
                    }
                }

                this.selectPartice()

            })
        }
        public destory(): void {
            super.destory();
            while (this.particleItem.length) {
                var $scene: LayaOverride2dSceneManager = <LayaOverride2dSceneManager>this._scene
                $scene.particleManager.removeParticle(this.particleItem.pop());
            }
        }
      

    }

}
