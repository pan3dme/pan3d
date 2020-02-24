module linkplay {
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

    export class RoomMeshVo {
 
        public data: MsRoomAttribute
        public txt: string
 
    }

    export class LinkPlayRoomList extends SList {
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
            this.setData($ary, TaskViewRender, 400, 64 * 7, 0, 64, 7, 256, 1024, 1, 10);
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

        private RoomId: UICompenent;
        private Task_ion_pic: UICompenent;
        private PlayNum: UICompenent;
        private RoomName: UICompenent;
        private Maptxt: UICompenent
        private Task_bg: UICompenent

        public create($container: UIConatiner, $bgRender: UIRenderComponent, $baseRender: UIRenderComponent, $customizeRenderAry: Array<UIRenderComponent> = null): void {
            super.create($container, $bgRender, $baseRender, $customizeRenderAry);


            this.Task_bg = this.creatSUI($bgRender, this.parentTarget.baseAtlas, "Task_bg", 0, 0, 400, 64);
            $container.addChild(this.Task_bg);

            this.RoomId = this.creatSUI($baseRender, this.parentTarget.baseAtlas, "RoomId", 10, 28, 50, 20);
            $container.addChild(this.RoomId);

            this.Task_ion_pic = this.creatSUI($bgRender, this.parentTarget.baseAtlas, "Task_ion_pic", 70, 15, 44, 44);
            $container.addChild(this.Task_ion_pic);

            this.RoomName = this.creatSUI($baseRender, this.parentTarget.baseAtlas, "RoomName", 50, 28, 190, 20);
            $container.addChild(this.RoomName);

            this.Maptxt = this.creatSUI($baseRender, this.parentTarget.baseAtlas, "Maptxt", 250, 28, 53, 20);
            $container.addChild(this.Maptxt);

            
            this.PlayNum = this.creatSUI($baseRender, this.parentTarget.baseAtlas, "PlayNum", 300, 28, 60, 20);
            $container.addChild(this.PlayNum);

            this.Task_bg.addEventListener(InteractiveEvent.Down, this.butDown, this);
            this.Task_bg.addEventListener(InteractiveEvent.Up, this.butUp, this);

        }
        private downTarget: any
        private lastMouseV2d: Vector2D
        public butDown(evt: InteractiveEvent): void {
            this.lastMouseV2d = new Vector2D(evt.x, evt.y)
            this.downTarget = evt.target;
            if (this.itdata && this.itdata.data ) {
                var $taskMeshVo: RoomMeshVo = this.itdata.data;
                GameData.dispatchEvent(new LinkPlayRoomEvent(LinkPlayRoomEvent.SELECT_ROOM_LIST_EVENT), $taskMeshVo)

            }

        }
        public butUp(evt: InteractiveEvent): void {
            if (this.itdata && this.downTarget == evt.target && this.lastMouseV2d && this.lastMouseV2d.x == evt.x && this.lastMouseV2d.y == evt.y) {
                var $taskMeshVo: RoomMeshVo = this.itdata.data;
                GameData.dispatchEvent(new LinkPlayRoomEvent(LinkPlayRoomEvent.SELECT_ROOM_LIST_EVENT), $taskMeshVo)
            }
        }
        public render($data: SListItemData): void {
            this.itdata = $data;
            if ($data && $data.data) {

                var $vo: RoomMeshVo = $data.data

                var $txtColor: string = ColorType.Green20a200

               

    


                LabelTextFont.writeSingleLabel(this.uiAtlas, this.RoomId.skinName, String($data.id+1), 16, TextAlign.CENTER, $txtColor);
                LabelTextFont.writeSingleLabel(this.uiAtlas, this.RoomName.skinName, String($vo.data.roomName), 16, TextAlign.CENTER, $txtColor);

               
                LabelTextFont.writeSingleLabel(this.uiAtlas, this.Maptxt.skinName, $vo.data.roomProperty, 16, TextAlign.CENTER, $txtColor);

                var $stateStr: string
                if ($vo.data.state == 2) {
                    $stateStr = ColorType.Redd92200 + "进行中...";
                } else {
                    $stateStr = ColorType.Green20a200+ $vo.data.gamePlayer + "/" + $vo.data.maxPlayer;
                }
                LabelTextFont.writeSingleLabel(this.uiAtlas, this.PlayNum.skinName, $stateStr, 16, TextAlign.CENTER);

                
                this.fileColor(this.Task_bg.skinName, $data.id % 2 == 0 ? "rgba(66,66,66,1)" : "rgba(56,53,54,1)");
            } else {
                LabelTextFont.clearLabel(this.uiAtlas, this.RoomId.skinName);
                LabelTextFont.clearLabel(this.uiAtlas, this.RoomName.skinName);
                LabelTextFont.clearLabel(this.uiAtlas, this.Maptxt.skinName);
                LabelTextFont.clearLabel(this.uiAtlas, this.PlayNum.skinName);
                this.fileColor(this.Task_bg.skinName, "rgba(66,66,66,0)"  )
            }

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