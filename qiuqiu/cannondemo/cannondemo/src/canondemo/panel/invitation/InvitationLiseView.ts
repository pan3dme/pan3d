module invitation {
    import SList = Pan3d.SList
    import UIAtlas = Pan3d.UIAtlas
    import UIManager = Pan3d.UIManager
    import SListItem = Pan3d.SListItem
    import UICompenent = Pan3d.UICompenent
    import UIRenderComponent = Pan3d.UIRenderComponent
    import UIConatiner = Pan3d.UIConatiner
    import InteractiveEvent = Pan3d.InteractiveEvent
    import SListItemData = Pan3d.SListItemData
    import LabelTextFont = Pan3d.LabelTextFont;
    import TextAlign = Pan3d.TextAlign;
    import ColorType = Pan3d.ColorType;
    import Vector2D = Pan3d.Vector2D
    import UIRectangle = Pan3d.UIRectangle;
    import TextureManager = Pan3d.TextureManager;
    import UiDraw = Pan3d.UiDraw
    import Rectangle=Pan3d.Rectangle
    export class InvitationVO {
 
        public name: string;
        public id: number;
        public resnum: number;
        public resSkinId: number;
        public constructor($id: number,  $resnum: number, $resicon: number) {
            this.id = $id
 
            this.resnum = $resnum
            this.resSkinId = $resicon


        }
    }
    export class InvitationMeshVo {

        public type: number
        public txtvo: InvitationVO
        public user: GameUserVo
        public isget: boolean
 

    }

    export class InvitationLiseView extends SList {
        public constructor() {
            super();
            this.center = 0;
            this.middle = -0;
            this._maskLevel = 7
        }
        public init($uiAtlas: UIAtlas): void {
            this.baseAtlas = $uiAtlas;
            this.initData();
        }
        private initData(): void {
            var $ary = new Array<SListItemData>();
            this.setData($ary, InvitationListRender, 450, 120 * 4, 0, 120, 4, 512, 1024, 1, 7);
        }
        public show(): void {
            if (!this.hasStage) {
                UIManager.getInstance().addUIContainer(this);
            }
        }

        public hide(): void {
            if (this.hasStage) {
                UIManager.getInstance().removeUIContainer(this);
            }
        }
    }

    export class InvitationListRender extends SListItem {
        public static baseAtlas: UIAtlas;

        private List_bg: UICompenent;
        private B_icon: UICompenent;
        private B_select_bt: UICompenent
        private B_tittle_txt: UICompenent
        private B_tip_rward_txt: UICompenent
        private B_user_name: UICompenent
 
        public create($container: UIConatiner, $bgRender: UIRenderComponent, $baseRender: UIRenderComponent, $customizeRenderAry: Array<UIRenderComponent> = null): void {
            super.create($container, $bgRender, $baseRender, $customizeRenderAry);


            //this.Task_bg = this.creatSUI($bgRender, this.parentTarget.baseAtlas, "Task_bg", 0, 0, 400, 64);
            this.List_bg = this.creatGrid9SUI($bgRender, this.parentTarget.baseAtlas, "List_bg", 0, 0, 450, 118, 25, 25)
            $container.addChild(this.List_bg);

            this.B_icon = this.creatSUI($baseRender, this.parentTarget.baseAtlas, "B_icon", 20, 20, 64, 64);
            $container.addChild(this.B_icon);
            this.B_user_name = this.creatSUI($baseRender, this.parentTarget.baseAtlas, "B_user_name", 2, 90, 100, 22);
            $container.addChild(this.B_user_name);

            

            this.B_select_bt = this.creatSUI($baseRender, this.parentTarget.baseAtlas, "B_select_bt", 315, 30, 110, 49);
            $container.addChild(this.B_select_bt);

            this.B_tittle_txt = this.creatSUI($baseRender, this.parentTarget.baseAtlas, "B_tittle_txt", 100, 30, 250, 26);
            $container.addChild(this.B_tittle_txt);


            this.B_tip_rward_txt = this.creatSUI($baseRender, this.parentTarget.baseAtlas, "B_tip_rward_txt", 100, 60, 150, 26);
            $container.addChild(this.B_tip_rward_txt);


            




            this.B_select_bt.addEventListener(InteractiveEvent.Down, this.butDown, this);
            this.B_select_bt.addEventListener(InteractiveEvent.Up, this.butUp, this);

          

        }
     

        private downTarget: any
        private lastMouseV2d: Vector2D
        public butDown(evt: InteractiveEvent): void {
            this.lastMouseV2d = new Vector2D(evt.x, evt.y)
            this.downTarget = evt.target;
        }
        public butUp(evt: InteractiveEvent): void {
            if (this.itdata && this.downTarget == evt.target && this.lastMouseV2d && this.lastMouseV2d.x == evt.x && this.lastMouseV2d.y == evt.y) {

     

                var $taskMeshVo: InvitationMeshVo = this.itdata.data;
                if ($taskMeshVo.user) {
                    if (!$taskMeshVo.isget) {
                        $taskMeshVo.isget = true

                        var invitationData: any = {}
                        if (GameData.getStorageSync(InvitationListRender.INVITATION_SYNC_STR)) {
                            invitationData = JSON.parse(GameData.getStorageSync(InvitationListRender.INVITATION_SYNC_STR))
                        }

                        invitationData[$taskMeshVo.txtvo.id] = true;
                        GameData.setStorageSync(InvitationListRender.INVITATION_SYNC_STR, JSON.stringify(invitationData));


                        GameData.hasdiamondsHavenum += $taskMeshVo.txtvo.resnum;

                        msgalert.OnlyTopTxt.show(Pan3d.ColorType.Whiteffffff + "获得钻石+" + $taskMeshVo.txtvo.resnum)

                        this.render(this.itdata)
                    }
                } else {
                    console.log("需要邀请")

                    GameData.dispatchEvent(new game.SceneEvent(game.SceneEvent.ALL_SHARE_SCENE_ONLY_EVENT), new AllShareMeshVo((value: number) => {
                    }, AllShareMeshVo.type2))
                }

 

            }
        }
        public static INVITATION_SYNC_STR: string ="invitation_sync_str"
        public render($data: SListItemData): void {
            this.itdata = $data;
            if ($data && $data.data) {

                var $taskMeshVo: InvitationMeshVo = $data.data

       


                UiDraw.uiAtlasDrawImg(this.uiAtlas, this.List_bg.skinName, UIData.textlist, "List_base_bg_1")
    
                var invitationData: any = {}
                if (GameData.getStorageSync(InvitationListRender.INVITATION_SYNC_STR)) {
                    invitationData = JSON.parse(GameData.getStorageSync(InvitationListRender.INVITATION_SYNC_STR))
                }
                $taskMeshVo.isget = Boolean(invitationData[$taskMeshVo.txtvo.id]);


                var $butPic: string = "But_base_1";
                var $butStr: string = ColorType.Whiteffffff + "邀请好友";
                if ($taskMeshVo.user) {
                    if ($taskMeshVo.isget) {
                        $butPic = "But_base_2";
                        $butStr = ColorType.Whiteffffff + "已领取";
                    } else {
                        $butPic = "But_base_1";
                        $butStr = ColorType.Black000000 + "领取奖励";
                    }

                    this.setNull(this.B_icon.skinName)
                    this.uiAtlas.upDataWebPicToTexture($taskMeshVo.user.avatar, this.B_icon.skinName);
                    LabelTextFont.writeSingleLabel(this.uiAtlas, this.B_user_name.skinName, ColorType.Black000000 + $taskMeshVo.user.name, 14, TextAlign.CENTER);
                } else {
                    UiDraw.uiAtlasDrawImg(this.uiAtlas, this.B_icon.skinName, UIData.textlist, "PIC_add_role")
                    this.setNull(this.B_user_name.skinName)
                }
                this.drawPicAndTxt(this.B_select_bt, $butPic, $butStr, new Vector2D(0, 15), TextAlign.CENTER)


                LabelTextFont.writeSingleLabel(this.uiAtlas, this.B_tittle_txt.skinName, ColorType.Black000000 + "邀请到第" + $taskMeshVo.txtvo.id + "位好友", 18, TextAlign.LEFT);
                LabelTextFont.writeSingleLabel(this.uiAtlas, this.B_tip_rward_txt.skinName, ColorType.Black000000 + "奖励:" + $taskMeshVo.txtvo.resnum + "钻石", 18, TextAlign.LEFT);
                
                this.uiAtlas.copyPicToTexture
            }

        }
        private setNull(skinName: string): void {
            LabelTextFont.writeSingleLabel(this.uiAtlas, skinName, "", 14, TextAlign.CENTER);

        }
        private drawPicAndTxt($ui: UICompenent, puslicname: string, txt: string, pos: Vector2D, $align: string = TextAlign.CENTER): void {
            var $rect: Pan3d.UIRectangle = this.uiAtlas.getRec($ui.skinName);
            this.uiAtlas.ctx = UIManager.getInstance().getContext2D($rect.pixelWitdh, $rect.pixelHeight, false);
            UiDraw.cxtDrawImg(this.uiAtlas.ctx, puslicname, new Rectangle(0, 0, $rect.pixelWitdh, $rect.pixelHeight), UIData.textlist);
            LabelTextFont.writeSingleLabelToCtx(this.uiAtlas.ctx, txt, 18, pos.x, pos.y, $align)
            Pan3d.TextureManager.getInstance().updateTexture(this.uiAtlas.texture, $rect.pixelX, $rect.pixelY, this.uiAtlas.ctx);
        }
 

        private fileColor($iconName: string, $color: string): void {
            var rec: UIRectangle = this.uiAtlas.getRec($iconName);
            rec.pixelX -= 1;
            rec.pixelY -= 1;
            rec.pixelWitdh += 2;
            rec.pixelHeight += 2;
            this.uiAtlas.ctx = UIManager.getInstance().getContext2D(rec.pixelWitdh, rec.pixelHeight, false);
            this.uiAtlas.ctx.fillStyle = $color
            this.uiAtlas.ctx.fillRect(0, 0, rec.pixelWitdh, rec.pixelHeight);
            TextureManager.getInstance().updateTexture(this.uiAtlas.texture, rec.pixelX, rec.pixelY, this.uiAtlas.ctx);
        }
        private _num: number = 1;

    }

}