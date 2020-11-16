

module onlypan3d {
    import CannoSceneManager = game.GameSceneManager;
    import GameLevelManeger = game.GameLevelManeger;
    import AotuGravityManager = game.GameGravityManager;
    import CannoSoundManager = game.GameSoundManager;
    import GameDataModel = game.GameDataModel;

    import GameInstance = Pan3d.GameInstance;
    import GameMouseManager = Pan3d.GameMouseManager;
    import Scene_data = Pan3d.Scene_data
    import UIData = Pan3d.UIData
    import Vector2D = Pan3d.Vector2D
    import Engine = Pan3d.Engine
    import SceneManager = Pan3d.SceneManager
    import InteractiveEvent = Pan3d.InteractiveEvent
    import ModuleEventManager = Pan3d.ModuleEventManager


    export class GamePanPanel {
        // 美术设计画布像素高宽
        constructor() {
            let canvas_Laya
            if (window['wx']) {
                canvas_Laya = canvas;
                GameMouseManager.mouseCanvasScale = 1.0;          //这里特殊修改适配小程序后，的鼠标缩放位置
                canvas_Laya.width = canvas_Laya.width * GameMouseManager.mouseCanvasScale;
                canvas_Laya.height = canvas_Laya.height * GameMouseManager.mouseCanvasScale;

                MiniPan3dAdpter.init();
            } else {
                canvas_Laya = document.createElement("canvas");
                canvas_Laya.width = document.documentElement.clientWidth;
                canvas_Laya.height = document.documentElement.clientHeight;
                document.body.appendChild(canvas_Laya);

            }
      
            
            mainpan3d.canvas = canvas_Laya;
           // Scene_data.skyCubeMap = new Array
            Scene_data.fileRoot = "res/";
            GameData.webseverurl = "https://wxwdqq.chiji-h5.com/api/";
  

            game.CannonGameStart.changeFunUrlLocal(() => {
                this.loadBaseUiArt()
            });

        }
        private scene: layapan.LayaOverride2dSceneManager
        private addScene3d(): void {
            scene3d.Scene3dInit.initData();
            this.scene = new layapan.LayaOverride2dSceneManager;
            this.scene.ready = true;
            SceneManager._instance = this.scene;
            //  this.addGridLineSprite();
            //  this.addBaseSprite();
            game.CannonGameStart.initData(this.scene);
            Scene_data.cam3D.distance = 350 * (GameData.pixelRatio / 2)
            Scene_data.focus3D.rotationY = 0;

            false ? this.timeFrame() : this.windowFrme();

            this.addMouseEvents()

        }
        private addMouseEvents(): void {
            GameInstance.useYaoGan = false
            GameMouseManager.getInstance().addMouseEvent();
            Scene_data.uiBlankStage.addEventListener(InteractiveEvent.Down, this.onMouseDown, this);
            Scene_data.uiStage.addEventListener(InteractiveEvent.Up, this.onMouseUp, this);
            Scene_data.uiBlankStage.addEventListener(InteractiveEvent.Move, this.onMouseMove, this);

        }

        private onMouseMove($evt: InteractiveEvent): void {
            GameDataModel.onMouseMove(new Pan3d.Vector2D($evt.x, $evt.y))
           // traceLog("onMouseMove")
        }
        private onMouseDown($evt: InteractiveEvent): void {
            GameDataModel.onMouseDown(new Pan3d.Vector2D($evt.x, $evt.y))
          //  traceLog("onMouseDown")
        }
        private onMouseUp($evt: InteractiveEvent): void {
            GameDataModel.mouseDownPosint = null
           // traceLog("onMouseUp")
        }

        private timeFrame(): void {
            //时间心跳
            setInterval(() => { this.upFrame(); }, 1000 / 60);
        }
        private windowFrme(): void {
            //系统计心跳
            window.requestAnimationFrame = window.requestAnimationFrame || window.webkitRequestAnimationFrame;
            window.requestAnimationFrame((t: any) => { this.step(t) });
        }
        private step(timestamp: any) {
            this.upFrame();
            window.requestAnimationFrame((t: any) => { this.step(t) });
        }
        private loadBaseUiArt(): void {
            var $baseUiList: Array<any> = new Array;
            $baseUiList.push({ xmlurl: "ui/textlist/textlist.txt", picurl: Pan3d.Scene_data.fileRoot + "ui/textlist/textlist.png", name: UIData.textlist });

            UIData.init($baseUiList,
                () => {
                    console.log("ui加载完成")
                    this.addScene3d();
                },
                (num: number) => {
                   
                }
            );
        }
        private upFrame(): void {
            game.CannonGameStart.upFrame();

            if (scene3d.Scene3dInit.isConfig) {
                if (GameDataModel.centenBall) {
                    Scene_data.focus3D.x = GameDataModel.centenBall.x;
                    Scene_data.focus3D.y = GameDataModel.centenBall.y;
                    Scene_data.focus3D.z = GameDataModel.centenBall.z;
                }
                if (GameDataModel.modelRotation) {
                    Scene_data.focus3D.rotationY = GameDataModel.gameAngle;
                    Scene_data.focus3D.rotationX = -35 - GameDataModel.modelRotation.z;
                    Scene_data.focus3D.rotationZ = -GameDataModel.modelRotation.x;
                }

                Scene_data.context3D._contextSetTest.clear()
                shadow.ShadowModel.getInstance().updateDepth(this.scene)
                Scene_data.context3D._contextSetTest.clear()
                Scene_data.context3D.update()
                Engine.update();

          
             

            }
        }

    }
}
console.log("Pan3dAir");
new onlypan3d.GamePanPanel();