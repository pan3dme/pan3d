module invitation {
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
    import UIRectangle = Pan3d.UIRectangle

    import SListItemData = Pan3d.SListItemData

    import PandaMeshData = rightpanda.PandaMeshData


 

    export class InvitationPanel extends basewin.BaseWinPanel {
        private _bottomRender: UIRenderComponent;


        public constructor() {
            super();
            this.interfaceUI = false
            this.width = 540
            this.height = 960
            this.center = 0;
            this.middle = 0;
        

 

        }
        protected baseWindowLoadFinish(): void {
            super.baseWindowLoadFinish()


            this._bottomRender = new UIRenderComponent();
            this.addRender(this._bottomRender);


            this.h5UIAtlas = new H5UIAtlas;
            this.h5UIAtlas.setInfo("panelui/invitation/invitation.txt", "panelui/invitation/invitation.png", () => { this.loadConfigCom() });

        }
   

        protected butClik(evt: InteractiveEvent): void {
            switch (evt.target) {
                case this.base_win_close:
                    this.hidePanel();
                    break
     
                default:
                    break;
            }
         
 
        }


        private loadConfigCom(): void {

            this._bottomRender.uiAtlas = this.h5UIAtlas

            this.winRect = new Rectangle(0, 0, 500, 560)

            this.addChild(this._bottomRender.getComponent("a_win_tittle_txt"));


            this._invitationList = new InvitationLiseView();
            this._invitationList.init(this._bottomRender.uiAtlas);

            this.uiLoadComplte = true;

            this.showPanel();

            
        }
        private _invitationList: InvitationLiseView
        private userWebItem: Array<GameUserVo>


        private showTaskListData(): void {
            var $textArr: Array < InvitationVO > = new Array;
            $textArr.push(new InvitationVO(1, 100, 1));
            $textArr.push(new InvitationVO(2, 100, 6));
            $textArr.push(new InvitationVO(3, 100, 3));
            $textArr.push(new InvitationVO(4, 100, 7));
            $textArr.push(new InvitationVO(5, 100, 7));
            $textArr.push(new InvitationVO(6, 100, 7));
            $textArr.push(new InvitationVO(7, 100, 7));
            $textArr.push(new InvitationVO(8, 100, 7));
            $textArr.push(new InvitationVO(9, 100, 7));
            $textArr.push(new InvitationVO(10, 100, 7));


            var ary: Array<SListItemData> = new Array;
            for (var i: number = 0; i < $textArr.length; i++) {
                var item: SListItemData = new SListItemData;
                var $taskMeshVo: InvitationMeshVo = new InvitationMeshVo();
      
                $taskMeshVo.txtvo = $textArr[i];
                $taskMeshVo.user = this.userWebItem[i];

                item.data = $taskMeshVo;

          
                item.id = i;

                ary.push(item);
            }
            this._invitationList.refreshData(ary);
        }
        private popOldData(value: number): void {
            //处理如果删除了之前的记录，主要是防止删除了记后，再邀请新人，依然需要可以获取奖励
            if (GameData.getStorageSync(InvitationListRender.INVITATION_SYNC_STR)) {
                var invitationData: any = JSON.parse(GameData.getStorageSync(InvitationListRender.INVITATION_SYNC_STR))
                var newData: any = {};
                var skipNum: number = 0;
                for (var key in invitationData) {
                    if (skipNum < value) {
                        newData[key] = invitationData[key]
                        skipNum++
                    }
                }
                GameData.setStorageSync(InvitationListRender.INVITATION_SYNC_STR, JSON.stringify(newData));
            }
        }

        private refrishData(): void {
    
            var $postStr: string = "";
            $postStr += "openid=" + GameData.getStorageSync("openid");
            $postStr += "&time=" + 0;
            $postStr += "&type=" + 2;
            GameData.WEB_SEVER_EVENT_AND_BACK("get_advertise_list", $postStr, (res: any) => {
                if (res && res.data && res.data.list && res.data.list.length) {
                    console.log("回来的列表", res.data.list);
                    var $openidarr: Array<string> = new Array
                    for (var i: number = 0; i < res.data.list.length; i++) {
                        $openidarr.push(res.data.list[i].openid)
                    }
                    this.popOldData($openidarr.length)
                    GameData.GET_USER_INFO_LIST($openidarr, ($listArr: Array<any>) => {
                        this.userWebItem = new Array
                        if ($listArr && $listArr.length) {
                            for (var j: number = 0; j < $listArr.length; j++) {
                                var $gameUserVo: GameUserVo = new GameUserVo();
                                $gameUserVo.name = $listArr[j].name;
                                $gameUserVo.openid = $listArr[j].openid;
                                $gameUserVo.avatar = $listArr[j].avatar;
                                this.userWebItem.push($gameUserVo)
                            }
                        }
                        this.showTaskListData()
                    })
                } else {
                    this.userWebItem = new Array
                    this.showTaskListData()

                }
            })
       
        }
      
   
       

      
  

        public resize(): void {
            super.resize();
            this._invitationList.resize()
        }
        public showPanel(): void {
            if (this.uiLoadComplte) {
                Pan3d.UIManager.getInstance().addUIContainer(this)
                this._invitationList.show();
                this.refrishData();
                this.TweenLiteScale(0.1, UIData.Scale, 0.5);

            } else {
                if (this.h5UIAtlas) {
                    this.h5UIAtlas.testLoading();
                }
               
            }
        }
        public hidePanel(): void {
            this.TweenLiteScale(UIData.Scale, 0.1, 0.2, () => {
                UIManager.getInstance().removeUIContainer(this);
                this._invitationList.hide();
            });
     
        }
      


    }
}