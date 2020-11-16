module gamelaya {
    import CannoSceneManager = game.GameSceneManager;
    import GameLevelManeger = game.GameLevelManeger;
    import CannoSoundManager = game.GameSoundManager;
    import GameDataModel = game.GameDataModel;
    import ModuleEventManager = Pan3d.ModuleEventManager;

    export class GameLayaPanel extends Laya.Sprite {
        private _cannoSceneManager: CannoSceneManager
        constructor() {
            super();

            this.ape = new Laya.Sprite()
            this.addChild(this.ape);
            this.ape.pos(0, 0)

            this.layaSceneLevel = new ShadowLaya3dSprite();
            this.layaSceneLevel.camDistance = 350 *( GameData.pixelRatio/2)
            this.layaSceneLevel.camAotuMove = false
            this.addChild(this.layaSceneLevel)
            this.layaSceneLevel.addMaskUi(mainpan3d.canvas.width, mainpan3d.canvas.height);

            game.CannonGameStart.initData(this.layaSceneLevel.scene);

            this.addEvents();

        }
        private addEvents(): void {
            Laya.stage.on(Pan3d.MouseType.MouseDown, this, this.onMouseDown);
            Laya.stage.on(Pan3d.MouseType.MouseUp, this, this.onMouseUp);
            Laya.stage.on(Pan3d.MouseType.MouseMove, this, this.onMouseMove);
            Laya.stage.on(Laya.Event.KEY_DOWN, this, this.onKeyDown);
   
        }
        private onKeyDown(e: Event): void {
            console.log("ee")
            if (game.GameDataModel.centenBall) {
                var $pos: Pan3d.Vector3D = new Pan3d.Vector3D(Math.floor(game.GameDataModel.centenBall.x), Math.floor(game.GameDataModel.centenBall.y), Math.floor(game.GameDataModel.centenBall.z))
                console.log("球位置",$pos)
            }
     
        }
        private onMouseDown(e: Event): void {
            this.show_log_txt("onMouseDown");
 
            GameDataModel.onMouseDown(new Pan3d.Vector2D(Laya.stage.mouseX, Laya.stage.mouseY))
            Pan3d.UIManager.getInstance().mouseEvetData(new Pan3d.InteractiveEvent(Pan3d.InteractiveEvent.Down), new Pan3d.Vector2D(Laya.stage.mouseX, Laya.stage.mouseY));
        }
        private onMouseUp(e: Event): void {
            GameDataModel.mouseDownPosint = null
            this.show_log_txt("onMouseUp")
            Pan3d.UIManager.getInstance().mouseEvetData(new Pan3d.InteractiveEvent(Pan3d.InteractiveEvent.Up), new Pan3d.Vector2D(Laya.stage.mouseX, Laya.stage.mouseY));

        }
        private onMouseMove(e: Event): void {
            GameDataModel.onMouseMove(new Pan3d.Vector2D(Laya.stage.mouseX, Laya.stage.mouseY))
            this.show_log_txt("onMouseMove")
            Pan3d.UIManager.getInstance().mouseEvetData(new Pan3d.InteractiveEvent(Pan3d.InteractiveEvent.Move), new Pan3d.Vector2D(Laya.stage.mouseX, Laya.stage.mouseY));
        }

        public compassChangeFun(value: number) {

        }
        public show_log_txt(value: string): void {
        
            //var $evt: uiview.TopUiViewEvent = new uiview.TopUiViewEvent(uiview.TopUiViewEvent.SHOW_LOG_TXT)
            //$evt.data = value
            //ModuleEventManager.dispatchEvent($evt);
        }
        public onAccelerometerChange(value: any): void {
    
        }
   

        render(context: Laya.RenderContext, x: number, y: number): void {
            super.render(context, x, y)
            this.layaSceneLevel.x = this.ape.x;
            this.layaSceneLevel.y = this.ape.y;

            game.CannonGameStart.upFrame();

            if (GameDataModel.centenBall) {
                this.layaSceneLevel.focus3d.x = GameDataModel.centenBall.x;
                this.layaSceneLevel.focus3d.y = GameDataModel.centenBall.y;
                this.layaSceneLevel.focus3d.z = GameDataModel.centenBall.z;

            }
       
            if (GameDataModel.modelRotation) {
                this.layaSceneLevel.camRotationY = GameDataModel.gameAngle
                this.layaSceneLevel.camRotationX = -35 - GameDataModel.modelRotation.z;
                this.layaSceneLevel.camRotationZ = -GameDataModel.modelRotation.x;
            }

      
        }
    
        private ape: Laya.Sprite
        public layaSceneLevel: ShadowLaya3dSprite


    }
}