module task {
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

    export class TaskMeshVo {
        public static everydayonline: number = 1
        public static everydayendless: number = 2
        public static helpOther: number = 3
        public static everydayLookAd: number = 4
        public static specialLeveladd: number = 5
        public static megameAdd: number = 6
        public type: number
        public processdata: number
        public txt: string
        public tipstr: string
        public iconUrl: string
        public num: number
        public event: any
    }

    export class TaskUiList extends SList {
        public constructor() {
            super();
            this.center = 0;
            this.middle = 0;
            this._maskLevel = 7
        }
        public init($uiAtlas: UIAtlas): void {
            this.baseAtlas = $uiAtlas;
            this.initData();
        }
        private initData(): void {
            var $ary = new Array<SListItemData>();
            this.setData($ary, TaskViewRender, 400, 80 * 6, 0, 80, 6, 256, 1024, 1, 10);
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

    export class TaskViewRender extends SListItem {
        public static baseAtlas: UIAtlas;

        private Task_list_id: UICompenent;
        private Task_ion_pic: UICompenent;
        private Task_but: UICompenent;
        private Task_info: UICompenent;
        private Task_bg: UICompenent
        public create($container: UIConatiner, $bgRender: UIRenderComponent, $baseRender: UIRenderComponent, $customizeRenderAry: Array<UIRenderComponent> = null): void {
            super.create($container, $bgRender, $baseRender, $customizeRenderAry);


            //this.Task_bg = this.creatSUI($bgRender, this.parentTarget.baseAtlas, "Task_bg", 0, 0, 400, 64);
            this.Task_bg = this.creatGrid9SUI($bgRender, this.parentTarget.baseAtlas, "Task_bg", 0, 0,400, 80, 25, 25)
            $container.addChild(this.Task_bg);

            this.Task_list_id = this.creatSUI($baseRender, this.parentTarget.baseAtlas, "Task_list_id", 10, 13, 45, 45);
            $container.addChild(this.Task_list_id);

            this.Task_ion_pic = this.creatSUI($bgRender, this.parentTarget.baseAtlas, "Task_ion_pic", 70, 18, 44, 44);
            $container.addChild(this.Task_ion_pic);

            this.Task_info = this.creatSUI($baseRender, this.parentTarget.baseAtlas, "Task_info", 100, 28, 190, 20);
            $container.addChild(this.Task_info);

            this.Task_but = this.creatSUI($baseRender, this.parentTarget.baseAtlas, "Task_but", 280, 13, 110, 49);
            $container.addChild(this.Task_but);

            this.Task_but.addEventListener(InteractiveEvent.Down, this.butDown, this);
            this.Task_but.addEventListener(InteractiveEvent.Up, this.butUp, this);

        }
        private downTarget: any
        private lastMouseV2d: Vector2D
        public butDown(evt: InteractiveEvent): void {
            this.lastMouseV2d = new Vector2D(evt.x, evt.y)
            this.downTarget = evt.target;
        }
        public static isClikAddMe: boolean
        public butUp(evt: InteractiveEvent): void {
            if (this.itdata && this.downTarget == evt.target && this.lastMouseV2d && this.lastMouseV2d.x == evt.x && this.lastMouseV2d.y == evt.y) {
                var $tadayStr: string = GameData.getDayStr()
                var $taskMeshVo: TaskMeshVo = this.itdata.data;
                switch ($taskMeshVo.processdata) {
                    case 0:
                        switch ($taskMeshVo.type) {
                            case TaskMeshVo.specialLeveladd:
                                Pan3d.ModuleEventManager.dispatchEvent(new special.SpecialEvent(special.SpecialEvent.SHOW_SPECIAL_PANEL))
                                break;
                            case TaskMeshVo.megameAdd:
                                if (!TaskViewRender.isClikAddMe) {
                                    TaskViewRender.isClikAddMe = true
                                    GameData.dispatchEvent(new megame.MeGameEvent(megame.MeGameEvent.SHOW_ME_GAME_PANEL), true)
                                } else {
                                    msgalert.AlertUtil.show("重新从我的小程序进入就可以领取奖励了", "提示", (bee: any) => {
                                       
                                    }, 2)

                                    return
                                }
                            
                                break;
                            case TaskMeshVo.everydayLookAd:
                                if (GameData.devicetypepc) {
                                    var tempData: EveryDataSync = GameData.getEveryDataSyncByName("lookVideoNum");
                                    GameData.setEveryDataSyncByName("lookVideoNum", tempData.num + 1);
                                } else {
                                    GameData.dispatchEvent(new game.SceneEvent(game.SceneEvent.WX_LOOK_VIDEO_VD_EVENT), (value: number) => {
                                        if (value == 0) {
                                            msgalert.AlertUtil.show("网络已断开,无法看到广告", "提示")
                                        } else if (value == 1) {
                                            var tempData: EveryDataSync = GameData.getEveryDataSyncByName("lookVideoNum");
                                            GameData.setEveryDataSyncByName("lookVideoNum", tempData.num + 1);
                                            Pan3d.ModuleEventManager.dispatchEvent(new TaskEvent(TaskEvent.SHOW_TASK_PANEL))
                                        } else if (value == 2) {
                                       
                                            msgalert.AlertUtil.show("需要看完视屏才能得到 金币奖励", "提示", (bee: any) => {
                                                if (bee == 1) {
                                                    Pan3d.ModuleEventManager.dispatchEvent(new TaskEvent(TaskEvent.SHOW_TASK_PANEL))
                                                }
                                            }, 2)
                                        }
                                    })
                               
                                }
                         
               
                                break;
                            case TaskMeshVo.helpOther:
         
                                Pan3d.ModuleEventManager.dispatchEvent(new help.HelpEvent(help.HelpEvent.SHOW_HELP_LIST_PANEL))

                                break;
                            default:
                                break;
                        }
                        Pan3d.ModuleEventManager.dispatchEvent(new TaskEvent(TaskEvent.HIDE_TASK_PANEL))
                        break
                    case 1:
               
                        GameData.dispatchEvent(new TaskEvent(TaskEvent.SHOW_GET_TASK_PANEL), $taskMeshVo)
 
                        break
                    default:
                        break
                }
            }
        }
      
        public render($data: SListItemData): void {
            this.itdata = $data;
            if ($data && $data.data) {

                var $taskMeshVo: TaskMeshVo = $data.data

         

                this.drawPicAndTxt(this.Task_list_id, "List_id_bg", String($data.id  ), new Vector2D(0, 15), TextAlign.CENTER)
                this.uiAtlas.upDataPicToTexture($taskMeshVo.iconUrl, this.Task_ion_pic.skinName);

                var $textColor: string = ColorType.Black000000
                var $processStr: string ="前往完成"
                var $picStr: string = "But_base_1"
                if ($taskMeshVo.processdata == 1) {
                    $processStr =  "可领取"
                    $picStr = "But_base_1"
                    $textColor = ColorType.Redff0000
                }
                if ($taskMeshVo.processdata == 2) {
                    $processStr = "已领取"
                    var $picStr: string = "But_base_2"
                    $textColor = ColorType.Black000000
                }
                LabelTextFont.writeSingleLabel(this.uiAtlas, this.Task_info.skinName, $taskMeshVo.txt, 18, TextAlign.CENTER, $textColor);

                this.drawPicAndTxt(this.Task_but, $picStr, $processStr, new Vector2D(0, 15), TextAlign.CENTER)
                UiDraw.uiAtlasDrawImg(this.uiAtlas, this.Task_bg.skinName, UIData.textlist, "List_base_bg_1")
            }

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