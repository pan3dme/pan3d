module Pan3d {
    export class Frame3dSprite extends Display3D {
        private frame3dRes: Frame3dRes;
        public constructor(value: Scene3D) {
            super(value);
            this.frame3dRes = new Frame3dRes(this.scene3D);
            this.frame3dRes.load(this.scene3D.fileRoot + "pan/frame3dres/huowumatou_frame.txt", () => this.loadFrame3DFinish( ));
        }
        private frameImodelItem: Array<FrameFileNode>;
        public loadFrame3DFinish( ): void {
            this.frameImodelItem = new Array
            for (var i: number = 0; i <   this.frame3dRes.frameItem.length; i++) {
                var $base: FrameFileNode = new FrameFileNode(this.scene3D);
                $base.setFrameNodeVo(  this.frame3dRes.frameItem[i]);
                this.frameImodelItem.push($base);
            }

        }
       
    }
}