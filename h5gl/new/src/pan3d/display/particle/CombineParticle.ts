module Pan3d {
    export class CombineParticle extends EventDispatcher {
        //private _sourceComNum: number; 
        //private _sourceAllNum: number;

        public sourceData: CombineParticleData;

        public url: string;

        private _displayAry: Array<Display3DParticle>;
        private _time: number;
        private _maxTime: number = 1000000;
        public type: number; //类型  
        public bindMatrix: Matrix3D;
        public bindVecter3d: Vector3D;
        public bindScale: Vector3D;
        public invertBindMatrix: Matrix3D;

        //public groupBindMatrix: Matrix3D;

        private _bindTarget: IBind;
        private _bindSocket: string;

        private _rotationX: number = 0;
        private _rotationY: number = 0;
        private _rotationZ: number = 0;

        private _isInGroup: boolean;
        private _groupPos: Vector3D;
        private _groupRotation: Vector3D;
        private _groupScale: Vector3D;
        public groupMatrix: Matrix3D;
        public groupRotationMatrix: Matrix3D;

        public hasMulItem: boolean = false;

        public sceneVisible: boolean = true;

        public dynamic: boolean = false;
        public hasDestory: boolean = false;

        public constructor() {
            super();
            this._displayAry = new Array;
            this._time = 0;

            this.bindMatrix = new Matrix3D;
            this.invertBindMatrix = new Matrix3D;
            this.bindVecter3d = new Vector3D();
            this.bindScale = new Vector3D(1, 1, 1);
            this.groupMatrix = new Matrix3D();
            this.groupRotationMatrix = new Matrix3D();
            //this.groupBindMatrix = new Matrix3D();

        }
        public get displayAry(): Array<Display3DParticle> {
            return this._displayAry;
        }
        public set displayAry(value: Array<Display3DParticle>) {
            this._displayAry = value
        }

        public set maxTime(value: number) {
            this._maxTime = value;
        }

        public set bindTarget(value: IBind) {
            this._bindTarget = value;

            this.invertBindMatrix.isIdentity = false;
        }

        public set bindSocket(value: string) {
            this._bindSocket = value;
        }

        public set x(value: number) {
            this.bindVecter3d.x = value;
        }

        public set y(value: number) {
            this.bindVecter3d.y = value;
        }

        public set z(value: number) {
            this.bindVecter3d.z = value;
        }

        public get x(): number {
            return this.bindVecter3d.x;
        }

        public get y(): number {
            return this.bindVecter3d.y;
        }

        public get z(): number {
            return this.bindVecter3d.z;
        }

        public setPos($xpos: number, $ypos: number, $zpos: number): void {

        }

        public setMulPos(ary: Array<Array<Array<number>>>): void {

        }

        public set scaleX(value: number) {
            this.bindScale.x = value;
        }

        public set scaleY(value: number) {
            this.bindScale.y = value;
        }

        public set scaleZ(value: number) {
            this.bindScale.z = value;
        }

        public set rotationX(value: number) {
            this._rotationX = value;
            this.applyRotation();
        }

        public set rotationY(value: number) {
            this._rotationY = value;
            this.applyRotation();
        }

        public set rotationZ(value: number) {
            this._rotationZ = value;
            this.applyRotation();
        }

        public applyRotation(): void {
            this.bindMatrix.identity();
            this.bindMatrix.appendRotation(this._rotationX, Vector3D.X_AXIS);
            this.bindMatrix.appendRotation(this._rotationY, Vector3D.Y_AXIS);
            this.bindMatrix.appendRotation(this._rotationZ, Vector3D.Z_AXIS);

            this.bindMatrix.copyTo(this.invertBindMatrix);
            this.invertBindMatrix.invert();
            this.invertBindMatrix.isIdentity = false;
        }

        public setGroup($pos: Vector3D, $rotaion: Vector3D, $scale: Vector3D): void {
            this._isInGroup = true;
            this._groupPos = $pos;
            this._groupRotation = $rotaion;
            this._groupScale = $scale;

            this.groupMatrix.isIdentity = false;
            this.groupMatrix.identity();

            this.groupMatrix.appendScale($scale.x, $scale.y, $scale.z);
            this.groupMatrix.appendRotation($rotaion.x, Vector3D.X_AXIS);
            this.groupMatrix.appendRotation($rotaion.y, Vector3D.Y_AXIS);
            this.groupMatrix.appendRotation($rotaion.z, Vector3D.Z_AXIS);
            this.groupMatrix.appendTranslation($pos.x, $pos.y, $pos.z);

            this.groupRotationMatrix.isIdentity = false;
            this.groupRotationMatrix.identity();

            this.groupRotationMatrix.prependRotation($rotaion.z, Vector3D.Z_AXIS);
            this.groupRotationMatrix.prependRotation($rotaion.y, Vector3D.Y_AXIS);
            this.groupRotationMatrix.prependRotation($rotaion.x, Vector3D.X_AXIS);

        }


        public addPrticleItem($dis: Display3DParticle): void {
            $dis.visible = false;
            $dis.setBind(this.bindVecter3d, this.bindMatrix, this.bindScale, this.invertBindMatrix, this.groupMatrix);
            this._displayAry.push($dis);
        }




        public updateTime(t: number): void {
            this._time += t;
            if (!this._displayAry) {
                return;
            }

            for (var i: number = 0; i < this._displayAry.length; i++) {
                this._displayAry[i].updateTime(this._time);
            }

            this.updateBind();

            if (this._time >= this._maxTime) {
                this.dispatchEvent(new BaseEvent(BaseEvent.COMPLETE));
            }

        }

        public updateBind(): void {
            if (this._bindTarget) {

                this._bindTarget.getSocket(this._bindSocket, this.bindMatrix);

                this.bindVecter3d.setTo(this.bindMatrix.x, this.bindMatrix.y, this.bindMatrix.z);

                this.bindMatrix.identityPostion();

                if (!this.groupRotationMatrix.isIdentity) {
                    this.bindMatrix.copyTo(this.invertBindMatrix);
                    this.invertBindMatrix.prepend(this.groupRotationMatrix);
                    this.invertBindMatrix.invert();
                } else {
                    this.bindMatrix.invertToMatrix(this.invertBindMatrix);
                }



            }

        }

        public reset(): void {
            this._time = 0;
            for (var i: number = 0; i < this._displayAry.length; i++) {
                this._displayAry[i].reset();
            }
        }

        public update(): void {
            if (!this.sceneVisible) {
                return;
            }
            if (!this._displayAry) {
                return;
            }
            for (var i: number = 0; i < this._displayAry.length; i++) {

                if(this._displayAry[i] instanceof Display3DBallPartilce){
                   
                }
                this._displayAry[i].update();
                
            }
        }

        public updateItem(idx: number): void {
            if (!this.sceneVisible) {
                return;
            }
            if (this.hasDestory) {
                return;
            }
            this._displayAry[idx].update();
        }

        public get size(): number {
            if (!this._displayAry) {
                return 0;
            }
            return this._displayAry.length;
        }




    }
}