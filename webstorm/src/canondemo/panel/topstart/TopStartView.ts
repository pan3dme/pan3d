module topstart {
    import UIConatiner = Pan3d.UIConatiner;
    import UIRenderComponent = Pan3d.UIRenderComponent;
    import UIData = Pan3d.UIData;
    import UICompenent = Pan3d.UICompenent;
    import UIManager = Pan3d.UIManager;
    import LabelTextFont = Pan3d.LabelTextFont;
    import TextAlign = Pan3d.TextAlign;
    import ArtFont = Pan3d.ArtFont;
    import TimeUtil = Pan3d.TimeUtil
    import InteractiveEvent = Pan3d.InteractiveEvent;
    import ModuleEventManager = Pan3d.ModuleEventManager

    import PandaMeshData=rightpanda.PandaMeshData
    import SceneEvent = game.SceneEvent;
    import GameDataModel = game.GameDataModel;

    export class TopStartView extends H5UIConatiner {
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

            this.lastUserInfo = GameData.getStorageSync("userInfo");

            this.h5UIAtlas = new H5UIAtlas;
            this.h5UIAtlas.setInfo("panelui/topstart/topstart.txt", "panelui/topstart/topstart.png", () => { this.loadConfigCom() });

        }
        private lastUserInfo: any
        private c_game_star_bg: UICompenent
        protected butClik(evt: InteractiveEvent): void {
            switch (evt.target) {
                case this.win_tip_bg:
                    break
                case this.c_game_star_bg:
                    this.clikStartBut()
                    break;
                case this.c_skin_but:
                    Pan3d.ModuleEventManager.dispatchEvent(new skinui.SkinListEvent(skinui.SkinListEvent.SHOW_SKIN_LIST_PANEL));
                    break;
                case this.c_level_but:
                    Pan3d.ModuleEventManager.dispatchEvent(new selectlevel.SelectLevelEvent(selectlevel.SelectLevelEvent.SHOW_SELECT_LEVEL));
                    break;
                case this.c_system_but:
                    Pan3d.ModuleEventManager.dispatchEvent(new setupui.SetupWinEvent(setupui.SetupWinEvent.SHOW_SETUP_WIN_PANEL));
                    break;
                case this.c_rank_but:
                    Pan3d.ModuleEventManager.dispatchEvent(new rank.RankEvent(rank.RankEvent.SHOW_RANK_PANEL));
                    break
                case this.c_ad_cell_0:
                case this.c_ad_cell_1:
                case this.c_ad_cell_2:
 
                    GameData.dispatchEvent(new platform.PlatFormEvent(platform.PlatFormEvent.CLIK_PLAT_OTHER_GAME), evt.target.data)
                    break

                
                default:
                    break

            }
        }
    

        private loadPanelH5UiXml(): void {

            new basewin.BaseWinPanel()

            var $arr: Array<string> = new Array;

            $arr.push("panelui/basewin/basewin");
            $arr.push("panelui/levelup/levelup");
            $arr.push("panelui/resetplay/resetplay");
            $arr.push("panelui/skin/skin");

            $arr.push("panelui/alert/alert");
            $arr.push("panelui/help/help");
            $arr.push("panelui/invitation/invitation");
            $arr.push("panelui/task/task");
 
   


            for (var i: number = 0; i < $arr.length; i++) {
                var $name: string = $arr[i]
                var $h5UIAtlas: H5UIAtlas = new H5UIAtlas
                $h5UIAtlas.setInfo($name + ".txt", $name + ".png", () => { });
            }

        }

        private getSelfInfo(): void {
            GameData.GET_USER_INFO_LIST([GameData.getStorageSync("openid")], ($listArr: Array<any>) => {
                if ($listArr && $listArr.length) {
                    if (String($listArr[0].name).length < 1) {
                        GameData.changeWebUserInfo("name", "无名");
                    } else {
                        if (GameData.userInfo) {
                            if (GameData.userInfo.nickName != $listArr[0].name) {
                                console.log("服务器信息和自己名字不一样")
                                GameData.changeWebUserInfo("name", GameData.userInfo.nickName);
                            }
                        }
                    }
                    GameData.webuserInfo = $listArr;
                } else {
                    console.log("没有我的用户信息")
                    this.user_create()
                }

            })
        }
        //user_create (openid,avatar,name,area,gender,enter_type)
        private user_create(): void {
            //GameData.userInfo.avatarUrl = "https://wx.qlogo.cn/mmopen/vi_32/DYAIOgq83eq3WqyPdicRC94cdib7xaor446tP803NprpvsP80mwqKT4OwovKicicaEf0Y1vWxYTxs3KOErGamXE37g/132"
            //GameData.userInfo.city = "Xiamen";
            //GameData.userInfo.country = "China";
            //GameData.userInfo.gender = 1;
            //GameData.userInfo.language = "zh_CN";
            //GameData.userInfo.nickName = "美丽人生";
            //GameData.userInfo.province = "Fujian";
            var $postStr: string = "";
            $postStr += "openid=" + GameData.getStorageSync("openid");
            if (GameData.userInfo) {
                $postStr += "&avatar=" + GameData.userInfo.avatarUrl;
                $postStr += "&area=" + GameData.userInfo.province;
                $postStr += "&gender=" + (GameData.userInfo.gender == 1 ? "男" : "女");
                $postStr += "&name=" + GameData.userInfo.nickName;

                var $enter_type: string = this.getInputQuest(GameData.onLaunchRes);
                if ($enter_type.length<=0) {
                    if (GameData.onshowRes && GameData.onshowRes.referrerInfo) {
                        if (GameData.onshowRes.referrerInfo.appId) {
                            $enter_type = "&enter_type=" + GameData.onshowRes.referrerInfo.appId;
                        } else {
                            $enter_type = "&enter_type=" + "无";
                        }
                    }  
                }
                if ($enter_type.length <= 0) {
                    $enter_type = this.getInputQuest(GameData.onshowRes);
                }
                $postStr += $enter_type;
            } else {
                $postStr += "&name=" + "没有授权";
            }
            GameData.WEB_SEVER_EVENT_AND_BACK("user_create", $postStr, (res: any) => {
                GameData.setStorageSync("user_create", true)
                console.log("第一次登入，注册用户信息")
                if (res && res.data && res.data.success) {
                    this.getSelfInfo();
                }
            })


        }
        private getInputQuest(value: any): string {
            //获取邀请进入的
            var $enter_type: string = ""
            if (value) {
                var query: any = value.query;
                if (query && query.type) {
                    switch (query.type) {
                        case "only_share":
                            if (GameData.getStorageSync("openid") != query.openid) {
                                $enter_type = "&enter_type=" + query.openid;
                            }
                            break
                        default:
                            console.log("对应类型还没处理好");
                            break
                    }
                }
            }
            return $enter_type

        }
     
        private c_level_but: UICompenent
        private c_rank_but: UICompenent
        private c_skin_but: UICompenent
        private c_system_but: UICompenent;
        private c_level_txt: UICompenent
        private c_ad_cell_0: UICompenent
        private c_ad_cell_1: UICompenent
        private c_ad_cell_2: UICompenent
        private loadConfigCom(): void {

            this._bottomRender.uiAtlas = this.h5UIAtlas
            this._midRender.uiAtlas = this.h5UIAtlas
            this._topRender.uiAtlas = this.h5UIAtlas

            this.win_tip_bg = <UICompenent>this.addEvntButUp("c_tip_bg", this._bottomRender);

           

            this.addChild(this._midRender.getComponent("c_game_name"));
            this.addChild(this._midRender.getComponent("c_self_level_label"));

            this.c_level_txt = this.addChild(this._topRender.getComponent("c_level_txt"));



            this.addChild(this._midRender.getComponent("c_ad_bg"));
            this.addChild(this._topRender.getComponent("c_link_game"));
 
            this.c_ad_cell_0 = this.addEvntButUp("c_ad_cell_0", this._topRender)
            this.c_ad_cell_1 = this.addEvntButUp("c_ad_cell_1", this._topRender)
            this.c_ad_cell_2 = this.addEvntButUp("c_ad_cell_2", this._topRender)

 

            this.c_level_but = this.addEvntButUp("c_level_but", this._topRender)
            this.c_rank_but = this.addEvntButUp("c_rank_but", this._topRender)
            this.c_skin_but = this.addEvntButUp("c_skin_but", this._topRender)
            this.c_system_but = this.addEvntButUp("c_system_but", this._topRender)

            this.c_engine_info_txt = this.addChild(this._topRender.getComponent("c_engine_info_txt"));
            LabelTextFont.writeSingleLabel(this._topRender.uiAtlas, this.c_engine_info_txt.skinName, "Powered by LayaAir Engine", 14, TextAlign.CENTER, Pan3d.ColorType.Whiteffffff)
            this.c_game_star_bg = <UICompenent>this.addEvntButUp("c_game_star_but", this._midRender);

            GameData.dispatchEvent(new game.SceneEvent(game.SceneEvent.WX_CREATE_USER_INFO_BUTTON), (res: boolean) => {
                if (res) {
                    this.clikStartBut();
                }
            })
            this.uiLoadComplte = true
            this.startPanelScale = UIData.Scale
            this.showPanel()

        }
        private isFrist: boolean = true
        private clikStartBut(): void {
            this.hidePanel();
      
            if (this.isFrist) {
                GameData.setStorageSync("loginnum", GameData.getStorageSyncNumber("loginnum")+1)
                GameData.getAdvertiseList();
                this.isFrist = false; //每次打开只执行一次
                if (this.lastUserInfo && Boolean(GameData.getStorageSync("user_create"))) {
                    var $postStr: string = "";
                    $postStr += "openid=" + GameData.getStorageSync("openid");
                    GameData.WEB_SEVER_EVENT_AND_BACK("user_login", $postStr, (res: any) => {
                        console.log("user_login", res)
                    })
                    this.getSelfInfo()
                } else {
                    this.user_create()
                }
                TimeUtil.addTimeOut(1000, () => {
                    this.loadPanelH5UiXml();
                })
                ModuleEventManager.dispatchEvent(new help.HelpEvent(help.HelpEvent.CHECK_SELF_HELP_INFO));
                TimeUtil.addTimeOut(2000, () => {
               
                    PandaMeshData.showRightPanda(PandaMeshData.key4, Scene_data.fileRoot + "ui/panda/4.png", new invitation.InvitationEvent(invitation.InvitationEvent.SHOW_INVITATIOIN_PANEL))
       
                    PandaMeshData.showRightPanda(PandaMeshData.key14, Scene_data.fileRoot + "ui/panda/14.png", new task.TaskEvent(task.TaskEvent.SHOW_TASK_PANEL))

                    PandaMeshData.showRightPanda(PandaMeshData.key7, Scene_data.fileRoot + "ui/panda/7.png", new special.SpecialEvent(special.SpecialEvent.SHOW_SPECIAL_PANEL))

                    if (game.CannonGameStart.iSresetLevel) {
                        //重置关卡的情况下，有选关卡图标
                        game.CannonGameStart.iSresetLevel = false
                        PandaMeshData.showRightPanda(PandaMeshData.key16, Scene_data.fileRoot + "ui/panda/16.png", new selectlevel.SelectLevelEvent(selectlevel.SelectLevelEvent.SHOW_SELECT_LEVEL));
                    }
                 

                 
                })

              
            }


        }
        private startPanelScale: number=1
        public showPanel(): void {
            if (this.uiLoadComplte) {
                UIManager.getInstance().addUIContainer(this);
                if (!GameDataModel.levelNum) {
                    GameDataModel.levelNum = 1
                }
            

                LabelTextFont.writeSingleLabel(this._topRender.uiAtlas, this.c_level_txt.skinName, Pan3d.ColorType.Whiteffffff+ String(GameDataModel.levelNum), 24, TextAlign.CENTER);
     
                this.TweenLiteScale(this.startPanelScale, UIData.Scale, 0.5);


                this.showAdList()
                Pan3d.ModuleEventManager.dispatchEvent(new megame.MeGameEvent(megame.MeGameEvent.SHOW_ME_GAME_PANEL))
            } else {
                if (this.h5UIAtlas) {
                    this.h5UIAtlas.testLoading();
                }

            }
        }
        private showAdList(): void {
            var $url: string = "https://jsonconfig.chiji-h5.com/json/wdqq/adlist.json"
            if (GameData.devicetypepc) {
                $url = "res/adlist.json"
            }
            LoadManager.getInstance().load($url, LoadManager.XML_TYPE,
                ($liststr: string) => {
                    var $objItem: Array<any> = JSON.parse($liststr);
                    for (var i: number = 0; i < $objItem.length && i < 3; i++) {
                        var $ui: UICompenent = this["c_ad_cell_" + i]
                        $ui.data = $objItem[i]

                        this.drawTempUre($ui)
                    }
                
                });
        }
        private drawTempUre($ui: UICompenent): void {
           
            var $data = $ui.data
            GameData.loadImgByPicUrl($data.skin,
                ($img: any) => {
                    var rec: Pan3d.UIRectangle = this._topRender.uiAtlas.getRec($ui.skinName);
                    this._topRender.uiAtlas.ctx = UIManager.getInstance().getContext2D(rec.pixelWitdh, rec.pixelHeight, false);
                    this._topRender.uiAtlas.ctx.drawImage($img, 0, 0, rec.pixelWitdh, rec.pixelWitdh);

                    LabelTextFont.writeSingleLabelToCtx(this._topRender.uiAtlas.ctx, Pan3d.ColorType.Whiteffffff+ $data.name, 14, 0, rec.pixelWitdh + 5, Pan3d.TextAlign.CENTER)
                    TextureManager.getInstance().updateTexture(this._topRender.uiAtlas.texture, rec.pixelX, rec.pixelY, this._topRender.uiAtlas.ctx);

                });

        }
        public hidePanel(): void {
            if (this.hasStage) {
                this.TweenLiteScale(UIData.Scale, 0.3, 0.2, () => {
                    this.startPanelScale=0.3
                    UIManager.getInstance().removeUIContainer(this);
                    ModuleEventManager.dispatchEvent(new mainui.MainuiEvent(mainui.MainuiEvent.SHOW_MAIN_UI_PANEL));
                });
            }

            Pan3d.ModuleEventManager.dispatchEvent(new megame.MeGameEvent(megame.MeGameEvent.HIDE_ME_GAME_PANEL))
       
        }
        private c_engine_info_txt: UICompenent;

    }

}