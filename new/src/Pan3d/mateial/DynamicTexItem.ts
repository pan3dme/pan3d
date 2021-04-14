module Pan3d {
    export class DynamicTexItem extends DynamicBaseTexItem {
        public url: string;
        //public target: TexItem;
        //public paramName: string;
        private _textureDynamic: WebGLTexture;
        //public textureRes:TextureRes;
        public isParticleColor: boolean;
        public curve: Curve;
        public life: number;
        private _life: number;




        public initCurve($type: number): void {
            this.curve = new Curve(this.scene3D);
            this.curve.type = $type;
        }

        public get texture(): WebGLTexture {
            if (this._textureDynamic) {
                return this._textureDynamic;
            } else {
                if (this.textureRes) {
                    return this.textureRes.texture;
                } else {
                    return null;
                }
            }

        }

        public creatTextureByCurve(): void {

            var i: number = 0;
            var endVecIndex: number = this.curve.valueVec.length - 1;
            var imgNumVec: Array<number> = new Array;
            for (var i: number = 0; i < this.life; i++) {
                if (i < this.curve.begintFrame) {

                    imgNumVec.push(this.curve.valueVec[0][0] * 0xff, this.curve.valueVec[0][1] * 0xff, this.curve.valueVec[0][2] * 0xff, this.curve.valueVec[0][3] * 0xff);
                } else if (i > this.curve.maxFrame) {
                    if (this.curve.maxFrame == 0 && this.curve.begintFrame < 0) {
                        imgNumVec.push(0xff, 0xff, 0xff, 0xff);
                    } else {
                        imgNumVec.push(this.curve.valueVec[endVecIndex][0] * 0xff, this.curve.valueVec[endVecIndex][1] * 0xff, this.curve.valueVec[endVecIndex][2] * 0xff, this.curve.valueVec[endVecIndex][3] * 0xff);
                    }

                } else {
                    if (this.curve.begintFrame < 0) {
                        imgNumVec.push(0xff, 0xff, 0xff, 0xff);
                    } else {
                        var index: number = i - this.curve.begintFrame;

                        imgNumVec.push(this.curve.valueVec[index][0] * 0xff, this.curve.valueVec[index][1] * 0xff, this.curve.valueVec[index][2] * 0xff, this.curve.valueVec[index][3] * 0xff);
                    }

                }
        }


        var img: ImageData = ColorTransition.getInstance().getImageDataByVec(imgNumVec, this.life);
      
        this._textureDynamic = this.scene3D.context3D.getTexture(img);
      
        }

    }


}