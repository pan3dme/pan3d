module task {
    import UIConatiner = Pan3d.UIConatiner;
    import UIRenderComponent = Pan3d.UIRenderComponent;
    import UIData = Pan3d.UIData;
    import UICompenent = Pan3d.UICompenent;
    import FrameCompenent = Pan3d.FrameCompenent;
    import UIManager = Pan3d.UIManager;
    import LabelTextFont = Pan3d.LabelTextFont;
    import TextAlign = Pan3d.TextAlign;
    import ArtFont = Pan3d.ArtFont;
    import InteractiveEvent = Pan3d.InteractiveEvent;
    import ModuleEventManager = Pan3d.ModuleEventManager
    import TimeUtil = Pan3d.TimeUtil
    import ColorType = Pan3d.ColorType
    import Rectangle = Pan3d.Rectangle
    import SListItemData = Pan3d.SListItemData
 



    export class TaskPanel extends basewin.BaseWinPanel {
        private _bottomRender: UIRenderComponent;
        private _midRender: UIRenderComponent;
        private _topRender: UIRenderComponent;

        
        public constructor() {
            super();
        }

        protected baseWindowLoadFinish(): void {
            super.baseWindowLoadFinish()

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
            this._bottomRender.uiAtlas = this.h5UIAtlas;
            this._midRender.uiAtlas = this.h5UIAtlas;
            this._topRender.uiAtlas = this.h5UIAtlas;
            this.uiLoadComplte = true 

            this.winRect = new Rectangle(0, -20, 450, 500)

            this.win_tip_bg.addEventListener(InteractiveEvent.Down, () => { }, this);
            this.win_tip_bg.addEventListener(InteractiveEvent.Up, () => { }, this);


            this.addChild(this._topRender.getComponent("a_win_tittle_txt"));
            this.addChild(this._topRender.getComponent("a_task_label_id"));
            this.addChild(this._topRender.getComponent("a_task_label_contet"));
            this.addChild(this._topRender.getComponent("a_task_label_pro"));

          


            this._taskUiList = new TaskUiList();
            this._taskUiList.init(this._topRender.uiAtlas);

            this.showPanel();
  
        }
        private _taskUiList: TaskUiList
        private _dayStr: string
        private showTaskListData(): void {
            var ary: Array<SListItemData> = new Array;
            this._dayStr = GameData.getDayStr();
            this.pushTempSListItemData(ary, this.meshMeGame());
            this.pushTempSListItemData(ary, this.meshEverydayOnLine());
 
          //  this.pushTempSListItemData(ary, this.meshHelpByEveryDay());
            this.pushTempSListItemData(ary, this.meshLookAdVideoDay());

            this.pushTempSListItemData(ary, this.meshSpecialLevel());

            this._taskUiList.refreshData(ary);
        }
        private meshSpecialLevel(): SListItemData {
 
            var tempData: EveryDataSync = GameData.getEveryDataSyncByName("specialLeveladd");
            var item: SListItemData = new SListItemData;
            var $taskMeshVo: TaskMeshVo = new TaskMeshVo();
            $taskMeshVo.iconUrl = "ui/panda/7.png"
            $taskMeshVo.type = TaskMeshVo.specialLeveladd;
            $taskMeshVo.num = 10
            $taskMeshVo.tipstr = "完成新的神秘关卡"
            item.data = $taskMeshVo;
            item.id = 1;
            $taskMeshVo.processdata = 0
            if (tempData.num>=1) {
                $taskMeshVo.processdata = 1
            }
            if (tempData.isget) {
                $taskMeshVo.processdata = 2
            }
            $taskMeshVo.txt = "完成一次新的关卡";

            return item;
        }
        private meshLookAdVideoDay(): SListItemData {

            var tempData: EveryDataSync = GameData.getEveryDataSyncByName("lookVideoNum");
  
            var item: SListItemData = new SListItemData;
            var $taskMeshVo: TaskMeshVo = new TaskMeshVo();
            $taskMeshVo.iconUrl = "ui/panda/8.png"
            $taskMeshVo.type = TaskMeshVo.everydayLookAd;
            $taskMeshVo.num = 20
            $taskMeshVo.tipstr = "领取视屏奖励"
            item.data = $taskMeshVo;
            item.id = 1;

            $taskMeshVo.processdata = 0
            if (tempData.num >= 2) {
                $taskMeshVo.processdata = 1
            }
            if (tempData.isget) {
                $taskMeshVo.processdata = 2
            }
            $taskMeshVo.txt = "每天观看(" + tempData.num + "/2)次"
            return item;
        }
        private pushTempSListItemData(ary: Array<SListItemData>, $vo1: SListItemData): void {
            if ($vo1) {
                ary.push($vo1);
                $vo1.id = ary.length
            }
        }

        private meshMeGame(): SListItemData {
            var item: SListItemData = new SListItemData;
            var $taskMeshVo: TaskMeshVo = new TaskMeshVo();
            $taskMeshVo.txt = "添加我的小程序"
            $taskMeshVo.iconUrl = "ui/panda/88.png";
            $taskMeshVo.type = TaskMeshVo.megameAdd;
            $taskMeshVo.num = 10
            $taskMeshVo.tipstr = "领取奖励"
            item.data = $taskMeshVo;
            item.id = 1;
            var $isUseMeGame = GameData.getStorageSync("scene1104")
            var $lastGetDate: boolean = GameData.getStorageSync("getMegameReward");
            if ($isUseMeGame) {
                $taskMeshVo.processdata = 1;
                $taskMeshVo.txt = "从我的小程序进入"
            } else {
                $taskMeshVo.processdata = 0;
                if (TaskViewRender.isClikAddMe) {
                    $taskMeshVo.txt = "从我的小程序登入可领"
                }
            }
            if ($lastGetDate) {
                $taskMeshVo.txt = "已添加了我的小程序"
                $taskMeshVo.processdata = 2;
            }

            return item;
        }
        private meshEverydayOnLine(): SListItemData {
            var item: SListItemData = new SListItemData;
            var $taskMeshVo: TaskMeshVo = new TaskMeshVo();
            $taskMeshVo.txt = "每日上线奖励"
            $taskMeshVo.iconUrl = "ui/panda/9.png";
            $taskMeshVo.type = TaskMeshVo.everydayonline;
            $taskMeshVo.num = 10
            $taskMeshVo.tipstr = "领取每日奖励"
            item.data = $taskMeshVo;
            item.id = 1;




          
            var $lastGetDate: string = GameData.getStorageSync("everydayonline");
      
            if ($lastGetDate) {
                if ($lastGetDate == this._dayStr) {
                    $taskMeshVo.processdata = 2;
                } else {
                    $taskMeshVo.processdata = 1;
                }
            } else {
                $taskMeshVo.processdata = 1;
 
            }
            var $selfMaxLevel: number = GameData.getStorageSyncNumber(GameData.SELF_MAX_LEVEL);
            if ($selfMaxLevel < 20) {
                $taskMeshVo.txt = "达到20关"
                $taskMeshVo.processdata = 0;
            }

         

            return item;
        }
        private meshEverydayEndless(): SListItemData {
            var item: SListItemData = new SListItemData;
            var $taskMeshVo: TaskMeshVo = new TaskMeshVo();
            $taskMeshVo.txt ="每日无尽榜单奖励"
            $taskMeshVo.iconUrl = "ui/panda/11.png";
            $taskMeshVo.type = TaskMeshVo.everydayendless;
            $taskMeshVo.num = 10
            $taskMeshVo.tipstr="领取无尽榜单奖励"
            item.data = $taskMeshVo;
            item.id = 1;

    
           
            var $lastGetDate: string = GameData.getStorageSync("everydayendless");
            var $endlessMaxLevel= GameData.getStorageSyncNumber("endlessMaxLevel");
            if ($lastGetDate) {
                if ($lastGetDate == this._dayStr) {
                    $taskMeshVo.processdata = 2;
                } else {
                    $taskMeshVo.processdata = 1;
                }
            } else {
                $taskMeshVo.processdata = 1;
            }
            if (isNaN($endlessMaxLevel) || $endlessMaxLevel < 1) {
                $taskMeshVo.processdata = 0;
            }

            return item;
        }
        private meshHelpByEveryDay(): SListItemData {
            var $helpdata: any = GameData.getStorageSync("helpdata");
            if (!$helpdata) {
                $helpdata = {};
                GameData.setStorageSync("helpdata", $helpdata);
            }
            if ($helpdata.date != this._dayStr) {
                $helpdata.date = this._dayStr
                $helpdata.helpnum = 0
                $helpdata.isget = false
            }
            var item: SListItemData = new SListItemData;
            var $taskMeshVo: TaskMeshVo = new TaskMeshVo();
            $taskMeshVo.iconUrl = "ui/panda/1.png"
            $taskMeshVo.type = TaskMeshVo.helpOther;
            $taskMeshVo.num = 10
            $taskMeshVo.tipstr = "领取帮助奖励"
            item.data = $taskMeshVo;
            item.id = 1;
            $taskMeshVo.processdata = 0
            if ($helpdata.helpnum>=2) {
                $taskMeshVo.processdata = 1
            }
            if ($helpdata.isget) {
                $taskMeshVo.processdata = 2
            }
            $taskMeshVo.txt = "每天帮助(" + $helpdata.helpnum + "/2)人"
            return item;
        }
        protected butClik(evt: InteractiveEvent): void {
            this.hidePanel()
        }
        public showPanel(): void {
            if (this.uiLoadComplte) {

                if (!this.hasStage) {
                    Pan3d.UIManager.getInstance().addUIContainer(this)
                    this._taskUiList.show()
                    this._taskUiList.middle=50
                    this.TweenLiteScale(0.1, UIData.Scale, 0.5);
                }
       
                this.showTaskListData()
     
            } else {
                if (this.h5UIAtlas) {
                    this.h5UIAtlas.testLoading();
                }
            
            }
        }
        public resize(): void {
            super.resize();
            this._taskUiList.resize()
        }
        public hidePanel(): void {
            if (this.uiLoadComplte) {
                this.TweenLiteScale(UIData.Scale, 0.1, 0.2, () => {
                    Pan3d.UIManager.getInstance().removeUIContainer(this)
                    this._taskUiList.hide()
                });
            }
        }
    }
}