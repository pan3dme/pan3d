module endless {

    import Display3D = Pan3d.Display3D;
    import Vector3D = Pan3d.Vector3D;
    import ResManager = Pan3d.ResManager;
    import CollisionItemVo = Pan3d.CollisionItemVo;
    import BaseRes = Pan3d.BaseRes;
    import TimeUtil = Pan3d.TimeUtil;
    import SceneRes = Pan3d.SceneRes;

    import GameDataModel = game.GameDataModel;

    export class EndlessMapSceneVo {
        public mapuid: number;
        public isfinish: boolean;
        public sceneRes: SceneRes;
        public initData($fun: Function): void {
            this.sceneRes = new SceneRes
            this.sceneRes.load(String(this.mapuid), this.mainSceneComplete, this.mainSceneProgress, ($str: any) => {
                this.isfinish = true
                $fun();
            }, {
                    failfun: () => {
                        console.log("加载失败了")
                    }
                });
        }
        private mainSceneComplete(): void {
        }
        private mainSceneProgress(num: number): void {

        }
    }

}
