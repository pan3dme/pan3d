module special {
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

    export class SpecialMeshVo {
 
        public id: number
        public levelnum: number
        public name: string
        public mapname: string
        public picurl: string
        public colorid: number
        public openlevel: number
        public ranklist: Array<GameUserVo>
        public isPass: boolean
        
 
    }

    export class SpecialUiList extends SList {
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
            this.setData($ary, SpecialViewRender, 445, 135 * 4, 0, 135, 4, 512, 1024, 1, 6);
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

    export class SpecialViewRender extends SListItem {
        public static baseAtlas: UIAtlas;


        private Special_but: UICompenent;
        private Special_info: UICompenent;
        private Special_pass: UICompenent
        private Special_bg: UICompenent
        public create($container: UIConatiner, $bgRender: UIRenderComponent, $baseRender: UIRenderComponent, $customizeRenderAry: Array<UIRenderComponent> = null): void {
            super.create($container, $bgRender, $baseRender, $customizeRenderAry);


            //this.Special_bg = this.creatSUI($bgRender, this.parentTarget.baseAtlas, "Special_bg", 0, 0, 400, 64);
 
            this.Special_bg = this.creatSUI($baseRender, this.parentTarget.baseAtlas, "Special_bg", 0, 0, 300, 120);
            $container.addChild(this.Special_bg);

      

            this.Special_info = this.creatSUI($baseRender, this.parentTarget.baseAtlas, "Special_info", 300, 0, 120, 75);
            $container.addChild(this.Special_info);

            this.Special_pass = this.creatSUI($baseRender, this.parentTarget.baseAtlas, "Special_pass", 100, 30, 95, 60);
            $container.addChild(this.Special_pass);


            
            this.Special_but = this.creatSUI($baseRender, this.parentTarget.baseAtlas, "Special_but", 310, 80, 110, 40);
            $container.addChild(this.Special_but);

            this.Special_but.addEventListener(InteractiveEvent.Down, this.butDown, this);
            this.Special_but.addEventListener(InteractiveEvent.Up, this.butUp, this);

        }
        private downTarget: any
        private lastMouseV2d: Vector2D
        public butDown(evt: InteractiveEvent): void {
            this.lastMouseV2d = new Vector2D(evt.x, evt.y)
            this.downTarget = evt.target;
        }
        private lookAtFinishVideoTm: number = 0;
        public butUp(evt: InteractiveEvent): void {
            if (this.itdata && this.downTarget == evt.target && this.lastMouseV2d && this.lastMouseV2d.x == evt.x && this.lastMouseV2d.y == evt.y) {
                var $specialMeshVo: SpecialMeshVo = this.itdata.data;
                this.loadSpecialSceneData($specialMeshVo.mapname)
                var $selfMaxLevel: number = GameData.getStorageSyncNumber(GameData.SELF_MAX_LEVEL)
                if ($specialMeshVo.openlevel <= $selfMaxLevel) {
                    if (GameData.isCanUseLookVideoBut) {
                        this.toLookAdAndPlay($specialMeshVo)
                    } else {
                        if (GameData.severinfo.special.needshare) {
                            this.shareBut_Clik($specialMeshVo)
                        } else {
                            this.isLoadFinish = true
                            this.tobePlay($specialMeshVo)
                        }
                    }
                }
            }

          
        }
        private isLoadFinish: boolean
        private loadSpecialSceneData(mapStr: string): void {
            this.isLoadFinish=false
            var sceneRes: Pan3d.SceneRes = new Pan3d.SceneRes
                sceneRes.load(mapStr, () => { }, () => { }, ($data: any) => {
                    console.log("预备加载特殊场景", mapStr)
                    this.isLoadFinish = true
                })
        }
        private shareBut_Clik($specialMeshVo): void {
            GameData.dispatchEvent(new game.SceneEvent(game.SceneEvent.ALL_SHARE_SCENE_ONLY_EVENT), new AllShareMeshVo((value: number) => {
                if (value == 1) {
                    this.tobePlay($specialMeshVo)
                } else {
                    msgalert.AlertUtil.show("需要分享成功才能继续挑战", "提示", (value: any) => {
                        if (value == 1) {
                            this.shareBut_Clik($specialMeshVo)
                        }
                    }, 2)
                }
            }, AllShareMeshVo.type9))
        }
        private tobePlay($specialMeshVo: SpecialMeshVo): void {
            if (this.isLoadFinish) {
                Pan3d.ModuleEventManager.dispatchEvent(new SpecialEvent(SpecialEvent.HIDE_SPECIAL_PANEL))
                GameData.dispatchEvent(new SpecialEvent(SpecialEvent.SELECT_SPECIAL_LEVEL), $specialMeshVo)
            } else {
                msgalert.AlertUtil.show("网络中断，无法加载场景", "提示", (value: any) => {
                    
                }, 2)
            }

        }

        private toLookAdAndPlay($specialMeshVo: SpecialMeshVo): void {
            GameData.dispatchEvent(new game.SceneEvent(game.SceneEvent.WX_LOOK_VIDEO_VD_EVENT), (value: number) => {
                if (value == 0) {
                    
                } else if (value == 1) {
                    this.tobePlay($specialMeshVo)
                } else if (value == 2) {
                    msgalert.AlertUtil.show("需要看完视屏才能挑战\n是否还继续观看", "提示", (value: any) => {
                        if (value == 1) {
                            this.toLookAdAndPlay($specialMeshVo);
                        }
                    }, 2)
                }

            })
       
        }
        
        public render($data: SListItemData): void {
            this.itdata = $data;
            this.uiAtlas.clearCtxTextureBySkilname(this.Special_info.skinName)
            this.uiAtlas.clearCtxTextureBySkilname(this.Special_bg.skinName)
            this.uiAtlas.clearCtxTextureBySkilname(this.Special_but.skinName)
            this.uiAtlas.clearCtxTextureBySkilname(this.Special_pass.skinName)
   
            if ($data && $data.data) {

                var $taskMeshVo: SpecialMeshVo = $data.data
                var $textColor: string = ColorType.Black000000

                this.drawRankCell(this.Special_info, $taskMeshVo.ranklist)
                var $selfMaxLevel: number = GameData.getStorageSyncNumber(GameData.SELF_MAX_LEVEL)

                if ($taskMeshVo.openlevel <= $selfMaxLevel) {
                    this.drawPicAndTxt(this.Special_but, "But_base_1", "挑战排名", new Vector2D(0, 10), TextAlign.CENTER)
                } else {
                    this.drawPicAndTxt(this.Special_but, "But_base_2", $taskMeshVo.openlevel +"关开启", new Vector2D(0, 10), TextAlign.CENTER)
                }
                this.uiAtlas.upDataPicToTexture("panelui/special/bg/" + $taskMeshVo.picurl, this.Special_bg.skinName)
                if ($taskMeshVo.isPass) {
                    this.uiAtlas.upDataPicToTexture("panelui/special/bg/ispasstxt.png", this.Special_pass.skinName)
                } 
    
            }

        }
      
        private drawRankCell($ui: UICompenent, $arr: Array<GameUserVo>): void {

            var $rect: Pan3d.UIRectangle = this.uiAtlas.getRec($ui.skinName);
            this.uiAtlas.ctx = UIManager.getInstance().getContext2D($rect.pixelWitdh, $rect.pixelHeight, false);
            for (var i: number = 0; i < $arr.length; i++) {
                var $pos: Vector2D = new Vector2D(0, i*25)
                UiDraw.cxtDrawImg(this.uiAtlas.ctx, "List_id_rank" + (1 + i), new Rectangle(0, $pos.y, 30, 25), UIData.textlist);
                LabelTextFont.writeSingleLabelToCtx(this.uiAtlas.ctx, Pan3d.ColorType.Black000000 + $arr[i].name, 16, 35, $pos.y + 5, TextAlign.LEFT)
            }
         
            Pan3d.TextureManager.getInstance().updateTexture(this.uiAtlas.texture, $rect.pixelX, $rect.pixelY, this.uiAtlas.ctx);
        }
        private drawPicAndTxt($ui: UICompenent, puslicname: string, txt: string, pos: Vector2D, $align: string = TextAlign.CENTER): void {
            var $rect: Pan3d.UIRectangle = this.uiAtlas.getRec($ui.skinName);
            this.uiAtlas.ctx = UIManager.getInstance().getContext2D($rect.pixelWitdh, $rect.pixelHeight, false);
            UiDraw.cxtDrawImg(this.uiAtlas.ctx, puslicname, new Rectangle(0, 0, $rect.pixelWitdh, $rect.pixelHeight), UIData.textlist);
            LabelTextFont.writeSingleLabelToCtx(this.uiAtlas.ctx, txt, 16, pos.x, pos.y, $align)
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