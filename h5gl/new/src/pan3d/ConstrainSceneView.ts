module Pan3d {
    export class ConstrainSceneView {
        public renderContext: WebGLRenderingContext;
        public canvas3D: HTMLCanvasElement;
        public scene3D: Scene3D;
        constructor(value: HTMLCanvasElement) {
            this.canvas3D = value;
            var gl: any = this.canvas3D.getContext('webgl', { stencil: true, alpha: true, depth: true, antialias: false })
                || this.canvas3D.getContext('experimental-webgl', { stencil: true, alpha: true, depth: true, antialias: false });

            this.renderContext = gl;
            this.initData();
        }
        public resetSize(): void {
            var stageWidth: number = document.body.clientWidth;
            var stageHeight: number = document.body.clientHeight;
            this.canvas3D.width = stageWidth;
            this.canvas3D.height = stageHeight;
            this.renderContext.viewport(0, 0, stageWidth, stageHeight);
            this.canvas3D.style.position = "absolute";
            this.canvas3D.style.left = "0px";
            this.canvas3D.style.top = "0px";

        }
        private initData(): void {
            this.scene3D = new Scene3D(this.renderContext);

        }
        public upFrame(): void {

            this.scene3D.upFrame();

        }
    }
}