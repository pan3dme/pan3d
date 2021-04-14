module Pan3d {
    export class ColorTransition {
        private _canvas: HTMLCanvasElement;
        private _cxt: CanvasRenderingContext2D;
        private _gnt: CanvasGradient;

        private static _instance: ColorTransition;
        public static getInstance(): ColorTransition {
            if (!this._instance) {
                this._instance = new ColorTransition();
            }
            return this._instance;
        }

        public constructor() {
            // this._canvas = document.createElement("canvas");
            // this._cxt = this._canvas.getContext("2d");
            // this._gnt = this._cxt.createLinearGradient(0, 0, 128, 0);
            // this._canvas.style.zIndex = "1";
            //document.body.appendChild(this._canvas);
        }

        public getImageData($data: any): ImageData {
            // console.log($data);
            // var length: number = $data.pos.length;
            // var color: Vector3D = new Vector3D();
            // for (var i: number = 0; i < length; i++) {
            //     hexToArgb($data.color[i], false, color);
            //     this._gnt.addColorStop($data.pos[i] / 255, 'rgba(' + color.x + ',' + color.y + ',' + color.z + ',' + $data.alpha[i] + ')');
            // }
            // this._cxt.fillStyle = this._gnt;
            // this._cxt.fillRect(0, 0, 128, 2);
            // return this._cxt.getImageData(0, 0, 128, 2);

            var imgData: ImageData = new ImageData(128,1);
            var index: number;
            for (var i: number = 0; i < imgData.width; i++) {
                index = i * 4;
                imgData.data[index] = 1;
                imgData.data[index + 1] =0;
                imgData.data[index + 2] = 0;
                imgData.data[index + 3] = 1;
            }
            return imgData;
        }

        public getImageDataByVec($data: any, $lenght: number): ImageData {
            var imgData: ImageData = new ImageData(64,1);
            var index: number;
            var baseindex: number;
            for (var i: number = 0; i < imgData.width; i++) {
                index = i * 4;
                baseindex = float2int(i / imgData.width * $lenght) * 4;
                imgData.data[index] = $data[baseindex];
                imgData.data[index + 1] = $data[baseindex + 1];
                imgData.data[index + 2] = $data[baseindex + 2];
                imgData.data[index + 3] = $data[baseindex + 3];
            }
            return imgData;
 
        }

        public setData() {




        }
    }
}