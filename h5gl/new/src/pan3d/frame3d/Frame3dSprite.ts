module Pan3d {
    export class Frame3dSprite extends Display3D {
        private frame3dRes: Frame3dRes;
        public constructor(value: Scene3D) {
            super(value);
            this.frameImodelItem = new Array
            this.frame3dRes = new Frame3dRes(this.scene3D);
            this.frame3dRes.load(this.scene3D.fileRoot + "pan/frame3dres/huowumatou_frame.txt", () => this.loadFrame3DFinish());
        }
        private frameImodelItem: Array<FrameFileNode>;
        public loadFrame3DFinish(): void {
     
            for (var i: number = 0; i < this.frame3dRes.frameItem.length; i++) {
                var $base: FrameFileNode = new FrameFileNode(this.scene3D);
                $base.setFrameNodeVo(this.frame3dRes.frameItem[i]);
                this.frameImodelItem.push($base);
            }

        }
        public upFrame():void {
       
            this.mathTimeFrame();
            for(var i=0;i<this.frameImodelItem.length;i++){
                this.frameImodelItem[i].update();
            }
            
            
        }
        private lastTime: number = 0
        private mathTimeFrame(): void
        {
            if (isNaN(Frame3dRes.frameNum)) {
                Frame3dRes.frameNum = 0;
            }
            var dt: number = TimeUtil.getTimer() - this.lastTime;
            Frame3dRes.frameNum += dt / (1000 / Frame3dRes.frameSpeedNum);
            Frame3dRes.frameNum = Frame3dRes.frameNum % (FrameLinePointVo.maxTime-1);
            this.lastTime = TimeUtil.getTimer();
        }


    }
}