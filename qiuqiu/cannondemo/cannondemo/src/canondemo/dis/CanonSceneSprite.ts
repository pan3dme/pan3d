module cannondis {
    import Display3DSprite = Pan3d.Display3DSprite;
    import Vector3D = Pan3d.Vector3D;
    import Quaternion = Pan3d.Quaternion;
    import Vector2D = Pan3d.Vector2D;
    import Matrix3D = Pan3d.Matrix3D;
    import SceneManager = Pan3d.SceneManager;

    import Scene_data = Pan3d.Scene_data;
    import ObjDataManager = Pan3d.ObjDataManager;
    import ObjData = Pan3d.ObjData;
    import Shader3D = Pan3d.Shader3D;
    import DirectShadowDisplay3DSprite = shadow.DirectShadowDisplay3DSprite;
    import Physics = canonkey.Physics;
    
  
    export class CanonSceneSprite extends Display3DSprite {


        public _directShadowDisplay3DSprite: DirectShadowColorSprite
        public constructor(value: CANNON.Body) {
            super();
            this.dispList = new Array;
            this._body = value;


        }
        public get mass(): number {
            return this._body.mass;
        }
        //体积
        public set mass(value: number) {
            this._body.mass = value;
        }
        public get bodytype(): number {
            return this._body.type;
        }
        //类型
        public set bodytype(value: number) {
            this._body.type = value;
        }


        public dispList: Array<DirectShadowDisplay3DSprite>
        protected mathBodyScale(): void {
           


        }
      
        public updateMatrix(): void {
            if (this._body) {
                this._body.position = Physics.Vec3dW2C(new Vector3D(this._x, this._y, this._z));
                var $m: Matrix3D = new Matrix3D();
                $m.appendRotation(this._rotationZ, Vector3D.Z_AXIS)
                $m.appendRotation(this._rotationY, Vector3D.Y_AXIS)
                $m.appendRotation(this._rotationX, Vector3D.X_AXIS)
                var $q: Quaternion = new Quaternion()
                $q.fromMatrix($m)
                this._body.quaternion = Physics.QuaternionW2C($q);

                this.changeDisplayPos = true
            }

        }
        private changeDisplayPos: boolean = true
        public update(): void {
            if (this._body) {
                this.mathPosMatrix();
                if (this._body.type == CANNON.Body.KINEMATIC && !this.changeDisplayPos) {
                    //专门为静态对象限制他的更新
                    return;
                }
                this.changeDisplayPos = false;
                for (var i: number = 0; i < this.dispList.length; i++) {
                    var $dis: DirectShadowDisplay3DSprite = this.dispList[i]
                    var $ma: Matrix3D = new Matrix3D;
                    Physics.MathBody2WMatrix3D(this._body, $ma)

                    var $shapeQua: Quaternion = Physics.Quaternion2W(this._body.shapeOrientations[i]);
                    var $shapePos: Vector3D = Physics.Vect3dC2W(this._body.shapeOffsets[i])

                    var $mqua: Matrix3D = $shapeQua.toMatrix3D();
                    $mqua.invert();
                    var $endM: Matrix3D = new Matrix3D;
                    if (this.dispList.length > 1) {//这里可能有潜在需要修改的对象 
                        $endM.append($mqua);
                        $endM.appendTranslation($shapePos.x, $shapePos.y, $shapePos.z)
                    }
                    $endM.append($ma);

                    var $pos: Vector3D = $endM.position;
                    $dis.x = $pos.x;
                    $dis.y = $pos.y;
                    $dis.z = $pos.z;
                    var $shapeQua: Quaternion = new Quaternion();
                    $shapeQua.fromMatrix($endM);
                    var $angle: Vector3D = $shapeQua.toEulerAngles();

                    $dis.rotationX = $angle.x * 180 / Math.PI;
                    $dis.rotationY = $angle.y * 180 / Math.PI;
                    $dis.rotationZ = $angle.z * 180 / Math.PI;


                }
            } 
        }
        protected _body: CANNON.Body
        public get body(): CANNON.Body {
            return this._body
        }
        public addToWorld(): void {
            if (this._body) {
                Physics.world.addBody(this._body);
            }
            this._scene.addDisplay(this);
            for (var i: number = 0; i < this.dispList.length; i++) {
                this.dispList[i]._scene = this._scene;
                this._scene.addDisplay(this.dispList[i]);
            }
        }
        public destory(): void {
            super.destory();
            if (this._body) {
                Physics.world.removeBody(this._body);
            }
            while (this.dispList.length) {
                this._scene.removeDisplay(this.dispList.pop());
            }
            this._scene.removeDisplay(this);

        }
        public mathPosMatrix(): void {
            var $ma: Matrix3D = new Matrix3D
            Physics.MathBody2WMatrix3D(this._body, $ma)
            this.posMatrix.m = $ma.m;
            var $shapeQua: Quaternion = Physics.Quaternion2W(this._body.shapeOrientations[0]);
            var $m: Matrix3D = $shapeQua.toMatrix3D()
            this.posMatrix.prepend($m);
            this.posMatrix.prependScale(this._scaleX, this._scaleY, this._scaleZ);

            var $pos: Vector3D = $ma.position
            this._x = $pos.x;
            this._y = $pos.y;
            this._z = $pos.z;
            var $shapeQua: Quaternion = new Quaternion()
            $shapeQua.fromMatrix(this.posMatrix);
            var $angle: Vector3D = $shapeQua.toEulerAngles();
            this._rotationX = $angle.x * 180 / Math.PI;
            this._rotationY = $angle.y * 180 / Math.PI;
            this._rotationZ = $angle.z * 180 / Math.PI;

        }



    }
}