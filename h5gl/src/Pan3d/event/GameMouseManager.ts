
module Pan3d {
    export class GameMouseManager {
        private static _instance: GameMouseManager;
        public static getInstance(): GameMouseManager {
            if (!this._instance) {
                this._instance = new GameMouseManager();

            }
            return this._instance;
        }
        public constructor(){
            this.isPc=this.IsPCFun();
            this.uiBlankStage=new UIStage();
        }
        private resetPos: Vector2D = new Vector2D();
        private bindPos: Vector2D = new Vector2D();
        private useMouseEvent: boolean = true;
        private isPc:boolean=true;
        public addMouseEvent(value: HTMLCanvasElement): void {
          
            if (this.isPc) {
                value.addEventListener(MouseType.MouseDown, ($evt: MouseEvent) => { this.onMouse($evt) });
                value.addEventListener(MouseType.MouseUp, ($evt: MouseEvent) => { this.onMouse($evt) });
                value.addEventListener(MouseType.MouseMove, ($evt: MouseEvent) => { this.onMouse($evt) });
                value.addEventListener(MouseType.MouseWheel, ($evt: WheelEvent) => { this.onMouseWheel($evt) });
            } else {
                value.addEventListener(MouseType.TouchMove, ($evt: TouchEvent) => { this.onTouchMove($evt) });
                value.addEventListener(MouseType.TouchEnd, ($evt: TouchEvent) => { this.onTouchEnd($evt) });
                value.addEventListener(MouseType.TouchStart, ($evt: TouchEvent) => { this.onTouchStart($evt) });
                value.addEventListener(MouseType.MouseWheel, ($evt: WheelEvent) => { this.onMouseWheel($evt) });

            }
            this.bindPos.x = this.resetPos.x;
            this.bindPos.y = this.resetPos.y;
        }
        private IsPCFun():boolean {
            var userAgentInfo = navigator.userAgent;
            var Agents = ["Android", "iPhone",
               "SymbianOS", "Windows Phone",
               "iPad", "iPod"];
            var flag = true;
            for (var v = 0; v < Agents.length; v++) {
               if (userAgentInfo.indexOf(Agents[v]) > 0) {
                  flag = false;
                  break;
               }
            }
            return flag;
         }
        private onMouseWheel(event: WheelEvent): void {
    
            var evt: InteractiveEvent;
            evt = new InteractiveEvent(InteractiveEvent.WheelEvent);
            evt.data=event.deltaY;
            this.uiBlankStage.interactiveEvent(evt);
        }
    
        private isCanUseMouseEvent(): boolean {
            return this.useMouseEvent;
        }

        private onMouse($e: MouseEvent): void {
            if (!this.isCanUseMouseEvent()) {
                return
            }
            if ($e.button == 2) {
                return
            }
            var evt: InteractiveEvent;
            var point: Vector2D = new Vector2D();
            if ($e instanceof MouseEvent) {
                if ($e.type == MouseType.MouseDown) {
                    evt = new InteractiveEvent(InteractiveEvent.Down);
                } else if ($e.type == MouseType.MouseUp) {
                    evt = new InteractiveEvent(InteractiveEvent.Up);
                } else if ($e.type == MouseType.MouseMove) {
                    evt = new InteractiveEvent(InteractiveEvent.Move);
                } else if ($e.type == MouseType.MouseClick) {

                }
                point.x = $e.pageX;
                point.y = $e.pageY;
            }
            if (evt) {
                evt.mouseEvent = $e;
            }
            this.makeMouseEvent(evt, point);
       
        }
    
        private mouseToEvent($touchEvent: TouchEvent): InteractiveEvent {
            var evt: InteractiveEvent;
            var point: Vector2D = new Vector2D();
            if ($touchEvent.type == MouseType.TouchStart) {
                evt = new InteractiveEvent(InteractiveEvent.Down);
            } else if ($touchEvent.type == MouseType.TouchEnd) {
                evt = new InteractiveEvent(InteractiveEvent.Up);
                point.x = $touchEvent.changedTouches[0].pageX;
                point.y = $touchEvent.changedTouches[0].pageY;
            } else if ($touchEvent.type == MouseType.TouchMove) {
                evt = new InteractiveEvent(InteractiveEvent.Move);
            }
            if ($touchEvent.touches.length) {
                point.x = $touchEvent.touches[$touchEvent.touches.length - 1].clientX;
                point.y = $touchEvent.touches[$touchEvent.touches.length - 1].clientY;
            }
            this.makeMouseEvent(evt, point);
            return evt;
        }
        public uiBlankStage:UIStage;
        private makeMouseEvent(evt: InteractiveEvent, point: Vector2D): void {
 
            evt.mouseEvent=new MouseEvent(evt.type);
            evt.mouseEvent.initMouseEvent(evt.type, true, true, window, 0, 0, 0, point.x, point.y, false, false, false, false, 0, null);

            this.uiBlankStage.interactiveEvent(evt);
        }
        private onTouchStart($e: TouchEvent): void {
            if (!this.isCanUseMouseEvent()) {
                return
            }
            this.mouseToEvent($e);
        }
        private onTouchEnd($e: TouchEvent): void {
            if (!this.isCanUseMouseEvent()) {
                return
            }
            this.mouseToEvent($e);
        }
        private onTouchMove($e: TouchEvent): void {
            if (!this.isCanUseMouseEvent()) {
                return
            }
            this.mouseToEvent($e);
         
        }
     
  


    }
}