module special {
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
 



    export class SpecialPanel extends basewin.BaseWinPanel {
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
            this.h5UIAtlas.setInfo("panelui/special/special.txt", "panelui/special/special.png", () => { this.loadConfigCom() });
        }
        private loadConfigCom(): void {
            this._bottomRender.uiAtlas = this.h5UIAtlas;
            this._midRender.uiAtlas = this.h5UIAtlas;
            this._topRender.uiAtlas = this.h5UIAtlas;
            this.uiLoadComplte = true 

            this.winRect = new Rectangle(0, 0, 480, 600)


            this.addChild(this._topRender.getComponent("a_win_tittle_txt"));
 
    
            this._taskUiList = new SpecialUiList();
            this._taskUiList.init(this._topRender.uiAtlas);

            this.showPanel();
  
        }
        private _taskUiList: SpecialUiList;

        private specialSelfshow: Array<number>
        private makeListArr($str: string): Array<any> {

            var $arr: Array<any> = JSON.parse($str);
            this.specialSelfshow = GameData.getStorageSync("specialSelfshow");
            this.makeWillSelfShow($arr);

            var $backArr: Array<any> = new Array()
            for (var i: number = 0; i < this.specialSelfshow.length; i++) {
                for (var j: number = 0; j < $arr.length; j++) {
                    if ($arr[j].levelnum == this.specialSelfshow[i]) {
                        $backArr.push($arr[j])
                    }
                }
            }
            return $backArr;
        }
        private maxShowNum4: number=5
        private makeWillSelfShow($arr: Array<any>): void {
            if (!this.specialSelfshow) {
                //如果第一次进来
                this.specialSelfshow = new Array();
                for (var i: number = 0; i < $arr.length && i < this.maxShowNum4; i++) {
                    this.specialSelfshow.push($arr[i].levelnum);
                }
         
            } else {
                var $passNum: number=0
                for (var j: number = 0; j < this.specialSelfshow.length; j++) {
                    if (this.isPassByLevel(this.specialSelfshow[j])) {
                        $passNum++
                    }
                }
                if ($passNum >= this.maxShowNum4 - 1) {
                    this.specialSelfshow = new Array();
                    for (var k: number = 0; k < $arr.length && this.specialSelfshow.length < this.maxShowNum4; k++) {
                        if (!this.isPassByLevel($arr[k].levelnum)) {
                            this.specialSelfshow.push($arr[k].levelnum);
                        }
                    }
                    console.log("准备更新新的关卡", this.specialSelfshow)
                } else {
                    console.log("保持原来数据")
                }
            }
            GameData.setStorageSync("specialSelfshow", this.specialSelfshow);
        }
      
        
        private showSpecialListData(): void {
            var ary: Array<SListItemData> = new Array;

            LoadManager.getInstance().load(Scene_data.fileRoot + "panelui/special/bg/speciallist.txt", LoadManager.XML_TYPE,
                ($str: string) => {
                    var $xmlArr: Array<any> = this.makeListArr($str);

                    //this.toBiFinish(5000)
                    //this.toBiFinish(5001)
                    //this.toBiFinish(5002)
                    //this.toBiFinish(5003)
                    console.log("$xmlArr", $xmlArr)
                    var $leveItem: Array<number> = new Array;
                    for (var i: number = 0; i < $xmlArr.length; i++) {
                        $leveItem.push($xmlArr[i].levelnum)
                    }
                    var $postStr: string = "levels=" + JSON.stringify($leveItem);
                    GameData.WEB_SEVER_EVENT_AND_BACK("get_level_record", $postStr, (res: any) => {
                        console.log("返回的数据", res)
                        for (var i: number = 0; i < $xmlArr.length; i++) {
                            var item: SListItemData = new SListItemData;
                            var $taskMeshVo: SpecialMeshVo = new SpecialMeshVo();
                            $taskMeshVo.picurl = $xmlArr[i].picurl
                            $taskMeshVo.colorid = $xmlArr[i].colorid
                            $taskMeshVo.mapname = $xmlArr[i].mapname
                            $taskMeshVo.openlevel = $xmlArr[i].openlevel

                            $taskMeshVo.id = $xmlArr[i].id
                            $taskMeshVo.levelnum = $xmlArr[i].levelnum
                            $taskMeshVo.name = $xmlArr[i].name
                            $taskMeshVo.isPass = this.isPassByLevel($taskMeshVo.levelnum)
                            $taskMeshVo.ranklist = this.rankListArrByLevel($taskMeshVo.levelnum, res)

                            $taskMeshVo.id = 1
                            item.data = $taskMeshVo;
                            item.id = 1;
                            ary.push(item)
                        }
                        this._taskUiList.refreshData(ary);

                
                    })
                  

                });
 

        }
        private rankListArrByLevel(value: number, res: any): Array<GameUserVo> {
            var $arr: Array<GameUserVo> = new Array;
            if (res && res.data && res.data.list) {
                var $list: Array<any> = res.data.list[value]
 
                for (var i: number = 0; $list && i < $list.length; i++) {
                    var $vo: GameUserVo = new GameUserVo
                    $vo.name = $list[i].info;
                    $vo.openid = $list[i].openid;
                    $vo.data = $list[i].time;
;
                    $arr.push($vo)
                }
             
            }
           
            return $arr

        }

        public static SPECIAL_DATA_SYNC_STR: string ="SPECIAL_DATA_SYNC_STR"
        /*
        private toBiFinish($level: number): void {
            var $specialdata: any = GameData.getStorageSync(SpecialPanel.SPECIAL_DATA_SYNC_STR);
            if (!$specialdata[$level]) {
                $specialdata[$level] = {}
            }
            $specialdata[$level].ispass = true
            GameData.setStorageSync(SpecialPanel.SPECIAL_DATA_SYNC_STR, $specialdata);
        }
        */
        private isPassByLevel(value: number): boolean {
            var $specialdata: any = GameData.getStorageSync(SpecialPanel.SPECIAL_DATA_SYNC_STR);
            if (!$specialdata) {
                $specialdata = {}
                GameData.setStorageSync(SpecialPanel.SPECIAL_DATA_SYNC_STR, $specialdata)
            }
            if ($specialdata[value]) {
                return $specialdata[value].ispass
            } 

            return false
        }
        private pushTempSListItemData(ary: Array<SListItemData>, $vo1: SListItemData): void {
            if ($vo1) {
                ary.push($vo1);
                $vo1.id = ary.length
            }
        }
      
         
        protected butClik(evt: InteractiveEvent): void {
            this.hidePanel()
        }
        public showPanel(): void {
            if (this.uiLoadComplte) {
                if (!this.hasStage) {
                    Pan3d.UIManager.getInstance().addUIContainer(this)
                    this._taskUiList.show()
                    this.TweenLiteScale(0.1, UIData.Scale, 0.5);
                }
                this.showSpecialListData();
           
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
            if (this.uiLoadComplte && this.hasStage) {
                this.TweenLiteScale(UIData.Scale, 0.1, 0.2, () => {
                    Pan3d.UIManager.getInstance().removeUIContainer(this)
                    this._taskUiList.hide()
                });
            }
        }
    }
}