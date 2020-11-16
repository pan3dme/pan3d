module selectlevel {
    import ListItemRender = Pan3d.ListItemRender
    import UIManager = Pan3d.UIManager
    import Rectangle = Pan3d.Rectangle
    import UIConatiner = Pan3d.UIConatiner
    import UIData = Pan3d.UIData
    import PuiData = Pan3d.PuiData
    import TextAlign = Pan3d.TextAlign
    import UIRenderComponent = Pan3d.UIRenderComponent
    import UiDraw = Pan3d.UiDraw
    import GridList = Pan3d.GridList
    import UIMask = Pan3d.UIMask
    import UIListRenderComponent = Pan3d.UIListRenderComponent
    import Vector2D = Pan3d.Vector2D
    import UICompenent = Pan3d.UICompenent
    import ListItemData = Pan3d.ListItemData
    import InteractiveEvent = Pan3d.InteractiveEvent
    import LabelTextFont = Pan3d.LabelTextFont
    import ColorType = Pan3d.ColorType
    import Scene_data = Pan3d.Scene_data;
    import AlphaUIRenderComponent = Pan3d.AlphaUIRenderComponent
    import AlphaFrameCompenent = Pan3d.AlphaFrameCompenent
    import AlphaUICompenent = Pan3d.AlphaUICompenent;
    

    export class SelectLevelPanel extends H5UIConatiner {


        private _bottomRender: AlphaUIRenderComponent;
        private _tittleRender: AlphaUIRenderComponent;
        private _midRender: AlphaUIRenderComponent;
        private _topRender: AlphaUIRenderComponent;
 

        public constructor() {
            super();
 
            this.width = 540
            this.height = 960
            this.center = 0;
            this.middle = 0;

            this.allMc = new Array;

            this._bottomRender = new AlphaUIRenderComponent();
            this.addRender(this._bottomRender);
            this._tittleRender = new AlphaUIRenderComponent();
            this.addRender(this._tittleRender);
            this._midRender = new AlphaUIRenderComponent();
            this.addRender(this._midRender);
            this._topRender = new AlphaUIRenderComponent();
            this.addRender(this._topRender);
 

            this.h5UIAtlas = new H5UIAtlas;
            this.h5UIAtlas.setInfo("panelui/selectlevel/selectlevel.txt", "panelui/selectlevel/selectlevel.png", () => { this.loadConfigCom() });

        }
 

    
        private e_back_an: UICompenent
        private loadConfigCom(): void {
            this._bottomRender.uiAtlas = this.h5UIAtlas
            this._tittleRender.uiAtlas = this.h5UIAtlas
            this._midRender.uiAtlas = this.h5UIAtlas
            this._topRender.uiAtlas = this.h5UIAtlas





            this.win_tip_bg = this.addChild(<UICompenent>this._bottomRender.getComponent("e_bg"));
            this.win_tip_bg.addEventListener(InteractiveEvent.Down, this.mouseDown, this);
            this.win_tip_bg.addEventListener(InteractiveEvent.Up, this.baseButUp, this);
 
 


            this.addChild(<UICompenent>this._tittleRender.getComponent("e_tittle_txt"));


            this.addChild(<UICompenent>this._midRender.getComponent("e_window_bg"));
 
 

            this.e_back_an = this.addEvntButUp("e_back_an", this._topRender)


            // GameData.getStorageSyncNumber(GameData.SELF_MAX_LEVEL)
  

 
            this.uiLoadComplte = true;
            this.showPanel()
            this.showLevelAll();
        

        }
   
        private page_point_item: Array<AlphaUICompenent>
        private adde_page_point(): void {
            if (!this.page_point_item) {
                this.page_point_item = new Array()
            }
            while (this.page_point_item.length) {
                this.removeChild( this.page_point_item.pop())
            }
         
            for (var i: number = 0; i < this.pageMax; i++) {
                var $temp: AlphaUICompenent = <AlphaUICompenent>( this.addChild(<AlphaUICompenent>this._topRender.getComponent("e_page_point")));
                $temp.center = i * 40 - 40
                $temp.bottom=100
                $temp.alpha = 0.5;
                this.page_point_item.push($temp)
            }
        }
        private allMc: Array<AlphaFrameCompenent>;
        private pageNum: number = 0;
        private pageMax: number = 2;

        private pageTatolNum24: number = 30;
        private pageRollNum = 5;
        private clearAll(): void {
            while (this.allMc.length) {
                this.removeChild(this.allMc.pop());
            }
        }
        private lastShowMaxLevel
        public showLevelAll(): void {
            this.clearAll()
            this.lastShowMaxLevel = GameData.getStorageSyncNumber(GameData.SELF_MAX_LEVEL)
            var maxLevel: number = GameData.getStorageSyncNumber(GameData.SELF_MAX_LEVEL)+1

            for (var i: number = 0; i < this.pageTatolNum24; i++) {
                var $level: number = i + 1 + (this.pageNum * this.pageTatolNum24)
                var e_level_bg: AlphaFrameCompenent = <AlphaFrameCompenent>this.addEvntButUp("e_level_bg", this._midRender);
                e_level_bg.data = $level;
                e_level_bg.alpha=0.0
                e_level_bg.data = $level;
                e_level_bg.x = i % this.pageRollNum * 80 + + e_level_bg.baseRec.x;
                e_level_bg.y = Math.floor(i / this.pageRollNum) * 80 + e_level_bg.baseRec.y;
                var show: boolean = maxLevel < $level;
                e_level_bg.goToAndStop(show ? 1 : 0)

                var e_level_num: AlphaFrameCompenent = <AlphaFrameCompenent>this.addChild(<UICompenent>this._topRender.getComponent("e_level_num"));
                e_level_num.alpha=0.0
                e_level_num.goToAndStop(i);
                e_level_num.x = e_level_bg.x +22
                e_level_num.y = e_level_bg.y + 30;
                if (show) {
                     e_level_num.x = 10000;
                }
                var $toRect: Rectangle = e_level_num.getSkinCtxRect();
                var $ctx: CanvasRenderingContext2D = UIManager.getInstance().getContext2D($toRect.width, $toRect.height, false);
                Pan3d.ArtFont.getInstance().writeFontToCtxCenten($ctx, String($level), "NUM41", 20, 0,8);
                e_level_num.drawToCtx(this._topRender.uiAtlas, $ctx);
         

                TweenLite.to(e_level_bg, 0.3, { alpha: 1,delay:i*0.01 })
                TweenLite.to(e_level_num, 0.3, { alpha: 1, delay: i * 0.01 })


                this.allMc.push(e_level_bg)
                this.allMc.push(e_level_num)
            }

            for (var k: number = 0; k < this.page_point_item.length; k++) {
                this.page_point_item[k].alpha = this.pageNum == k ? 1 : 0.5;
            }
        }
        public addEvntButUp($name: string, $uiRender: UIRenderComponent): any {
            var $temp: UICompenent = this.addChild(<UICompenent>$uiRender.getComponent($name));
            $temp.addEventListener(InteractiveEvent.Up, this.baseButUp, this);
            return $temp;
        }

        private isMove: boolean = false;
        private lastCentenX: number=0
        private mouseDownX: number = 0

        public get center(): number {
            return this._center
        }
        public set center(value: number) {
            this._center = value;
            this._xType = 2;
            this._x = this._center * UIData.Scale + Scene_data.stageWidth / 2 - this.width * UIData.Scale / 2;
            this.applyChild();
        }
   
        protected mouseDown(evt: InteractiveEvent): void {
            this.isMove = false
            this.mouseDownX = evt.x;
            this.lastCentenX = this.center;
            Scene_data.uiStage.addEventListener(InteractiveEvent.Move, this.onMove, this);
 
        }
        protected onMove(evt: InteractiveEvent): void {
            this.isMove = true;
            this.center = this.lastCentenX + (evt.x - this.mouseDownX) / UIData.Scale;
        }
        private showNextPage(): void {
            Pan3d.TimeUtil.addTimeOut(150, () => {
                this.showLevelAll();
                this.center=0
            })
        }
        protected baseButUp(evt: InteractiveEvent): void {  //只接收UP事件
            Scene_data.uiStage.removeEventListener(InteractiveEvent.Move, this.onMove, this);
            if (this.isMove && Math.abs(this.center)> 5) {
                if (Math.abs(this.center) < 150) {
                    TweenLite.to(this, 0.3, { center: 0 })
                } else {
                    var $d = this.center / Math.abs(this.center) * 500
                    var $toMove: number = $d
                    if ($d > 0) {
                        if (this.pageNum <= 0) {
                            $toMove=0
                        } else {
                            this.pageNum--
                            this.showNextPage()
                        }
                    } else {
                        if ((this.pageNum+1) >= this.pageMax) {
                            $toMove = 0
                        } else {
                            this.pageNum++
                            this.showNextPage()
                        }
                    }
                    TweenLite.to(this, 0.1, { center: $toMove })
                }
            } else {
                if (evt.target == this.e_back_an) {
                    this.hidePanel()
                } else {
                    var $selectNum: number = <number>(evt.target.data);
                    var $maxLevel: number = GameData.getStorageSyncNumber(GameData.SELF_MAX_LEVEL)
                    if ($selectNum <= ($maxLevel + 1)) {

                        Pan3d.ModuleEventManager.dispatchEvent(new topstart.TopStartEvent(topstart.TopStartEvent.HIDE_TOP_START_PANEL))
                    

                        GameData.dispatchToLevel($selectNum)
                        this.center=0
                        this.hidePanel()
                    }
                }
            }
         
        }
        private hidePanel(): void {
 
            this.TweenLiteScale(UIData.Scale, 0.1, 0.2, () => {
                UIManager.getInstance().removeUIContainer(this)
   
            });
        }
        public showPanel(): void {


        


            if (this.uiLoadComplte) {

                var ke: number = Math.min(GameData.getStorageSyncNumber(GameData.SELF_MAX_LEVEL) + 2, GameData.severinfo.level)
                this.pageMax = Math.ceil(ke / this.pageTatolNum24)
                this.adde_page_point();
                this.pageNum = Math.floor((game.GameDataModel.levelNum-1) / this.pageTatolNum24);


                this.center = 0
                Pan3d.UIManager.getInstance().addUIContainer(this)
                if (!isNaN(this.lastShowMaxLevel) && this._topRender.uiAtlas) {
                    if (this.lastShowMaxLevel != GameData.getStorageSyncNumber(GameData.SELF_MAX_LEVEL)) {
                        //刷新等级列表
                        this.showLevelAll()
                    }
                }
                this.TweenLiteScale(0.1, UIData.Scale, 0.5);
            } else {
                this.h5UIAtlas.testLoading();
            }
  
 

        }

 
    }
}
