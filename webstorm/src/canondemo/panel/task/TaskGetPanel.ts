module task {
    import UIConatiner = Pan3d.UIConatiner;
    import UIRenderComponent = Pan3d.UIRenderComponent;
    import UIData = Pan3d.UIData;
    import UICompenent = Pan3d.UICompenent;
    import SelectButton = Pan3d.SelectButton;
    import FrameCompenent = Pan3d.FrameCompenent;
    import UIManager = Pan3d.UIManager;
    import LabelTextFont = Pan3d.LabelTextFont;
    import TextAlign = Pan3d.TextAlign;
    import ArtFont = Pan3d.ArtFont;
    import Rectangle = Pan3d.Rectangle
    import InteractiveEvent = Pan3d.InteractiveEvent;
    import ModuleEventManager = Pan3d.ModuleEventManager


    import SceneEvent = game.SceneEvent
    import PandaMeshData = rightpanda.PandaMeshData

    export class TaskGetPanel extends H5UIConatiner {
        private _bottomRender: UIRenderComponent;
        private _midRender: UIRenderComponent;
        private _topRender: UIRenderComponent;


        public constructor() {
            super();

            this.width = 540
            this.height = 960
            this.center = 0;
            this.middle = 0;


            this._bottomRender = new UIRenderComponent();
            this.addRender(this._bottomRender);
            this._midRender = new UIRenderComponent();
            this.addRender(this._midRender);
            this._topRender = new UIRenderComponent();
            this.addRender(this._topRender);


            this.h5UIAtlas = new H5UIAtlas;
            this.h5UIAtlas.setInfo("panelui/task/task.txt", "panelui/task/task.png", () => { this.loadConfigCom() });

        }




        private loadConfigCom(): void {
            this._bottomRender.uiAtlas = this.h5UIAtlas
            this._midRender.uiAtlas = this.h5UIAtlas
            this._topRender.uiAtlas = this.h5UIAtlas

            this.win_tip_bg = this.addEvntBut("b_win_tip_bg", this._bottomRender)
            this.win_tip_bg.addEventListener(InteractiveEvent.Up, this.butClik, this);

 
            this.addChild(<UICompenent>this._topRender.getComponent("b_baoxian_pic"));
             this.addChild(this._topRender.getComponent("b_get_num_label"));

            this.b_get_num_txt =  this._topRender.getComponent("b_get_num_txt");

            

            this.b_big_but = <SelectButton> this.addEvntBut("b_big_but", this._topRender)
            this.b_no_need = this.addEvntBut("b_no_need", this._topRender)



 



            this.uiLoadComplte = true;


            this.showPanel();


        }
        private b_big_but: SelectButton
        private b_get_num_txt: UICompenent
        private b_no_need: UICompenent
 
 
        protected butClik(evt: InteractiveEvent): void {
            switch (evt.target) {
                case this.b_big_but:
                    this.setBigButSelect()
                    if (GameData.severinfo.adshareModel == 1) {
                        this.toLookAdAndPlay();
                    } else {
                        this.shareBut_Clik();
                    }
                    break
                case this.b_no_need:
                case this.win_tip_bg:
                    this.hidePanel()
                    break
                default:
                    break

            }

        }
        private shareBut_Clik(): void {
            GameData.dispatchEvent(new game.SceneEvent(game.SceneEvent.ALL_SHARE_SCENE_ONLY_EVENT), new AllShareMeshVo((value: number) => {
                if (value == 1) {
                    this.getNumFinish()
                }
            }, AllShareMeshVo.type7))
        }
        private getNumFinish(): void {
            var $tadayStr: string = GameData.getDayStr();
            var $taskMeshVo: TaskMeshVo = this.taskMeshVo;
            GameData.hasdiamondsHavenum += $taskMeshVo.num;

            switch ($taskMeshVo.type) {
                case TaskMeshVo.megameAdd:
    
                    GameData.setStorageSync("getMegameReward", true);
                    break;

                case TaskMeshVo.everydayLookAd:
                    var $lookAtTemp: EveryDataSync = GameData.getEveryDataSyncByName("lookVideoNum");
                    $lookAtTemp.isget = true
                    GameData.setStorageSync("lookVideoNum", $lookAtTemp);
                    break;

         
                case TaskMeshVo.everydayonline:
                    GameData.setStorageSync("everydayonline", $tadayStr);
                    break;
                case TaskMeshVo.everydayendless:
                    GameData.setStorageSync("everydayendless", $tadayStr);
                    break;
                case TaskMeshVo.specialLeveladd:
                    var $specialLeveladd: any = GameData.getStorageSync("specialLeveladd");
                    $specialLeveladd.isget = true
                    GameData.setStorageSync("specialLeveladd", $specialLeveladd);
                    break;
                case TaskMeshVo.helpOther:
                    var $helpdata: any = GameData.getStorageSync("helpdata");
                    $helpdata.isget = true
                    GameData.setStorageSync("helpdata", $helpdata);
                    break;
                default:
                    break;
            }
            Pan3d.ModuleEventManager.dispatchEvent(new task.TaskEvent(task.TaskEvent.SHOW_TASK_PANEL));


            this.hidePanel();
        }
        private toLookAdAndPlay(): void {
            GameData.dispatchEvent(new game.SceneEvent(game.SceneEvent.WX_LOOK_VIDEO_VD_EVENT), (value: number) => {
                if (value == 2) {
                    msgalert.AlertUtil.show("需要看完视屏才能领取奖励", "提示", (value: any) => {
                    }, 2)
                }
                if (value == 1) {
                    this.getNumFinish()
                }
                if (value == 0) {
                    //视频看完了，就只能分享；
                    this.shareBut_Clik();
                }

            })



        }
        private setBigButSelect(): void {
            this.b_big_but.selected = GameData.severinfo.adshareModel == 1
        }
      
        public taskMeshVo: TaskMeshVo;
        public showPanel(): void {
            if (this.uiLoadComplte && this.taskMeshVo) {
           
                UIManager.getInstance().addUIContainer(this);
                this.TweenLiteScale(0.3, UIData.Scale, 0.5);

                this.setBigButSelect()
           

                LabelTextFont.writeSingleLabel(this._topRender.uiAtlas, this.b_get_num_txt.skinName, Pan3d.ColorType.Redff0000 + this.taskMeshVo.num , 26, Pan3d.TextAlign.CENTER);

            } else {
                if (this.h5UIAtlas) {
                    this.h5UIAtlas.testLoading();
                }

            }
        }

        private hidePanel(): void {
            this.TweenLiteScale(UIData.Scale, 0.3, 0.2, () => {
                UIManager.getInstance().removeUIContainer(this);

            });
        }


    }

}