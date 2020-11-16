module game {
    import Vector3D = Pan3d.Vector3D;
    import Vector2D = Pan3d.Vector2D;
    import LightVo = Pan3d.LightVo;

    export class GameSceneColorVo {

        public bgTop: Vector3D; //背景上面颜色
        public bgBottom: Vector3D; //背景上面颜色
        public modelcolor: Vector3D; //模型渐变

        public clone(): GameSceneColorVo {
            var $vo: GameSceneColorVo = new GameSceneColorVo;
            $vo.bgTop = this.bgTop.clone();
            $vo.bgBottom = this.bgBottom.clone();
            $vo.modelcolor = this.modelcolor.clone();
            return $vo
        }
    }

    export class GameSceneColor {

        public static makeBaseColor(value: number): void { //黄色
            var $arr: Array<any> = this.makeTo4();

            switch (value) {
                case 1:
                    $arr= this.makeTo1();
                    break
                case 2:
                    $arr= this.makeTo2();
                    break
                case 3:
                    $arr =this.makeTo3();
                    break
                case 4:
                    $arr =this.makeTo4();
                    break
                default:
                    console.log("没有颜色类型", value)
                    break
            }
          //  $arr = this.makeTo3();

            this.tweenToColor($arr[0], $arr[1]);
        }
        private static makeTo1(): Array<any> { //蓝色
            var $sceneColorVo: GameSceneColorVo = new GameSceneColorVo()
            var $lightVo: LightVo = new LightVo()

            $sceneColorVo.bgTop = new Vector3D(115 / 255, 178 / 255, 168 / 255);
            $sceneColorVo.bgBottom = new Vector3D(96 / 255, 170 / 255, 220 / 255);
            $sceneColorVo.modelcolor = new Vector3D(115 / 255, 178 / 255, 168 / 255);

            var $sunDirect = new Vector3D(0, 1, 0)
            var $sunColor = new Vector3D(40 / 255, 56 / 255, 65 / 255);
            var $ambientColor = new Vector3D(64 / 255, 100 / 255, 110 / 255);

            $lightVo.setData($sunDirect, $sunColor, $ambientColor);

            return [$sceneColorVo, $lightVo];
        }
    

        private static makeTo2(): Array<any> {//紫色
            var $sceneColorVo: GameSceneColorVo = new GameSceneColorVo()
            var $lightVo: LightVo = new LightVo()

            $sceneColorVo.bgTop = new Vector3D(90 / 255, 100 / 255, 160 / 255);
            $sceneColorVo.bgBottom = new Vector3D(110 / 255, 60 / 255, 180 / 255);
            $sceneColorVo.modelcolor = new Vector3D(94 / 255, 92 / 255, 164 / 255);

            var $sunDirect = new Vector3D(0, 1, 0)
            var $sunColor = new Vector3D(35 / 255, 15 / 255, 60 / 255);
            var $ambientColor = new Vector3D(76 / 255, 36 / 255, 126 / 255);


            $lightVo.setData($sunDirect, $sunColor, $ambientColor);

            return [$sceneColorVo, $lightVo];
        }

        private static makeTo3(): Array<any> {//粉色
            var $sceneColorVo: GameSceneColorVo = new GameSceneColorVo()
            var $lightVo: LightVo = new LightVo()

            $sceneColorVo.bgTop = new Vector3D(218 / 255, 199 / 255, 219 / 255);
            $sceneColorVo.bgBottom = new Vector3D(233 / 255, 201 / 255, 202 / 255);
            $sceneColorVo.modelcolor = new Vector3D(218 / 255, 199 / 255, 219 / 255);

            var $sunDirect = new Vector3D(0, 1, 0)
            var $sunColor = new Vector3D(13 / 255, 35 / 255, 39 / 255);
            var $ambientColor = new Vector3D(226 / 255, 167 / 255, 159 / 255);


            $lightVo.setData($sunDirect, $sunColor, $ambientColor);

            return [$sceneColorVo, $lightVo];
        }
        private static makeTo4(): Array<any> {//黑白
            var $sceneColorVo: GameSceneColorVo = new GameSceneColorVo()
            var $lightVo: LightVo = new LightVo()

            $sceneColorVo.bgTop = new Vector3D(82 / 255, 82 / 255, 82 / 255);
            $sceneColorVo.bgBottom = new Vector3D(55 / 255, 55 / 255, 55 / 255);
            $sceneColorVo.modelcolor = new Vector3D(76 / 255, 76 / 255, 76 / 255);

            var $sunDirect = new Vector3D(0, 1, 0)
            var $sunColor = new Vector3D(50 / 255, 50 / 255, 50 / 255);
            var $ambientColor = new Vector3D(30 / 255, 30 / 255, 30 / 255);


            $lightVo.setData($sunDirect, $sunColor, $ambientColor);

            return [$sceneColorVo, $lightVo];
        }
       
        private static tweenToColor($toSceneColor: GameSceneColorVo, $tolightVo: LightVo): void {
            this.toSceneColor = $toSceneColor;
            this.tolightVo = $tolightVo;
            this.statColor = GameDataModel.useColor.clone();
            this.statLight = GameDataModel.lightVo.clone();
            this._speedNum = 0
            TweenLite.to(this, 0.3, { speedNum: 1 });
        }
        private static statColor: GameSceneColorVo;
        private static statLight: LightVo;
        private static toSceneColor: GameSceneColorVo;
        private static tolightVo: LightVo;

        private static _speedNum: number
        private static set speedNum(value: number) {
            this._speedNum = value;

            GameDataModel.useColor.bgTop.x = this.statColor.bgTop.x + (this.toSceneColor.bgTop.x - this.statColor.bgTop.x) * this._speedNum;
            GameDataModel.useColor.bgTop.y = this.statColor.bgTop.y + (this.toSceneColor.bgTop.y - this.statColor.bgTop.y) * this._speedNum;
            GameDataModel.useColor.bgTop.z = this.statColor.bgTop.z + (this.toSceneColor.bgTop.z - this.statColor.bgTop.z) * this._speedNum;

            GameDataModel.useColor.bgBottom.x = this.statColor.bgBottom.x + (this.toSceneColor.bgBottom.x - this.statColor.bgBottom.x) * this._speedNum;
            GameDataModel.useColor.bgBottom.y = this.statColor.bgBottom.y + (this.toSceneColor.bgBottom.y - this.statColor.bgBottom.y) * this._speedNum;
            GameDataModel.useColor.bgBottom.z = this.statColor.bgBottom.z + (this.toSceneColor.bgBottom.z - this.statColor.bgBottom.z) * this._speedNum;

            GameDataModel.useColor.modelcolor.x = this.statColor.modelcolor.x + (this.toSceneColor.modelcolor.x - this.statColor.modelcolor.x) * this._speedNum;
            GameDataModel.useColor.modelcolor.y = this.statColor.modelcolor.y + (this.toSceneColor.modelcolor.y - this.statColor.modelcolor.y) * this._speedNum;
            GameDataModel.useColor.modelcolor.z = this.statColor.modelcolor.z + (this.toSceneColor.modelcolor.z - this.statColor.modelcolor.z) * this._speedNum;


            GameDataModel.lightVo.ambientColor[0] = this.statLight.ambientColor[0] + (this.tolightVo.ambientColor[0] - this.statLight.ambientColor[0]) * this._speedNum;
            GameDataModel.lightVo.ambientColor[1] = this.statLight.ambientColor[1] + (this.tolightVo.ambientColor[1] - this.statLight.ambientColor[1]) * this._speedNum;
            GameDataModel.lightVo.ambientColor[2] = this.statLight.ambientColor[2] + (this.tolightVo.ambientColor[2] - this.statLight.ambientColor[2]) * this._speedNum;


            GameDataModel.lightVo.sunColor[0] = this.statLight.sunColor[0] + (this.tolightVo.sunColor[0] - this.statLight.sunColor[0]) * this._speedNum;
            GameDataModel.lightVo.sunColor[1] = this.statLight.sunColor[1] + (this.tolightVo.sunColor[1] - this.statLight.sunColor[1]) * this._speedNum;
            GameDataModel.lightVo.sunColor[2] = this.statLight.sunColor[2] + (this.tolightVo.sunColor[2] - this.statLight.sunColor[2]) * this._speedNum;


            GameDataModel.lightVo.ambientColor[0] = this.statLight.ambientColor[0] + (this.tolightVo.ambientColor[0] - this.statLight.ambientColor[0]) * this._speedNum;
            GameDataModel.lightVo.ambientColor[1] = this.statLight.ambientColor[1] + (this.tolightVo.ambientColor[1] - this.statLight.ambientColor[1]) * this._speedNum;
            GameDataModel.lightVo.ambientColor[2] = this.statLight.ambientColor[2] + (this.tolightVo.ambientColor[2] - this.statLight.ambientColor[2]) * this._speedNum;



        }
        private static get speedNum(): number {
            return this._speedNum
        }

 

    }
}