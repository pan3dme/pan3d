module canonkey {
    import LineDisplayShader = Pan3d.LineDisplayShader;
    import ProgrmaManager = Pan3d.ProgrmaManager;
    import Vector3D = Pan3d.Vector3D;
    import GridLineSprite = Pan3d.GridLineSprite;
    import TimeUtil = Pan3d.TimeUtil;
    import SceneManager = Pan3d.SceneManager;
    
    export class DemoSceneManager {

        private static _instance: DemoSceneManager;
        public static getInstance(): DemoSceneManager {
            if (!this._instance) {
                this._instance = new DemoSceneManager();
            }
            return this._instance;
        }
        constructor() {
            ProgrmaManager.getInstance().registe(LineDisplayShader.LineShader, new LineDisplayShader);
            TimeUtil.addFrameTick(() => { this.upData() });
        }
        public upData(): void {
            if (Physics.ready) {
                Physics.update()
            }
        }
        public initScene(): void {
            Physics.creatWorld();
            SceneConanManager.getInstance().makeGround(new Vector3D())
            var $k: Bounce_html = new Bounce_html();
            Physics.ready = true;

            this.addGridLineSprite();
        }
        private addGridLineSprite(): void {
            ProgrmaManager.getInstance().registe(LineDisplayShader.LineShader, new LineDisplayShader);
            var $GridLineSprite: GridLineSprite = new GridLineSprite();
            SceneManager.getInstance().addDisplay($GridLineSprite);
            SceneManager.getInstance().ready = true;

        }
    }
}