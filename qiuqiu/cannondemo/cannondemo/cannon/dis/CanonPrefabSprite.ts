module canonkey {
    import Display3DSprite = Pan3d.Display3DSprite;
    import Vector3D = Pan3d.Vector3D;
    import Quaternion = Pan3d.Quaternion;
    import Vector2D = Pan3d.Vector2D;
    import Matrix3D = Pan3d.Matrix3D;
    import SceneManager = Pan3d.SceneManager;
    import DirectShadowDisplay3DSprite = shadow.DirectShadowDisplay3DSprite;
    
    export class CanonPrefabSprite extends Display3DSprite {

        public _bodyLineSprite: CannonLineSprite;
        public _directShadowDisplay3DSprite: DirectShadowDisplay3DSprite
        public constructor(value: CANNON.Body) {
            super();
            this.dispList = new Array;

            this._body = value;

            this._bodyLineSprite = new CannonLineSprite()
            this._bodyLineSprite.baseColor = new Vector3D(Math.random() * 0.5 + 0.5, Math.random() * 0.5 + 0.5, Math.random() * 0.5 + 0.5, 1)
            this._bodyLineSprite.setBody(this._body);



            this.mathBodyScale();

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


        protected dispList: Array<DirectShadowDisplay3DSprite>
        protected mathBodyScale(): void {
            var $body: CANNON.Body = this._body;

            var arr: Array<number> = null



            for (var i: number = 0; i < $body.shapes.length; i++) {
                var $shapePos: Vector3D = Physics.Vect3dC2W($body.shapeOffsets[i])
                var $shapeQua: Quaternion = Physics.Quaternion2W($body.shapeOrientations[i]);
                var $tempDis: DirectShadowDisplay3DSprite = new DirectShadowDisplay3DSprite()


                switch ($body.shapes[i].type) {
                    case 1:
                        var $sphere: CANNON.Sphere = <CANNON.Sphere>$body.shapes[i];
                        $shapePos.scaleBy(100 / $sphere.radius)
                        $tempDis.setModelById("whiteball");
                        $tempDis.scaleX = $sphere.radius * 1;
                        $tempDis.scaleY = $sphere.radius * 1;
                        $tempDis.scaleZ = $sphere.radius * 1;
                        break;
                    case 4:
                        var $box: CANNON.Box = <CANNON.Box>$body.shapes[i];
                        var $boxSize: Vector3D = Physics.Vect3dC2W($box.halfExtents);
                        $tempDis.setModelById("whitebox");
                        $tempDis.scaleX = $boxSize.x /50;
                        $tempDis.scaleY = $boxSize.y / 50;
                        $tempDis.scaleZ = $boxSize.z / 50;

                        break;
                    case 16:
                        var $cylinder: CANNON.Cylinder = <CANNON.Cylinder>$body.shapes[i];
                        var $scaleVec: Vector2D = this.drawCylinderConvexPolyh($cylinder, $shapePos, $shapeQua);
                        $tempDis.setModelById("whitecylinder");
                        $tempDis.scaleX = $scaleVec.x * 1.3;
                        $tempDis.scaleY = $scaleVec.y * 1.5;
                        $tempDis.scaleZ = $scaleVec.x * 1.3;

                        break;
                    case 32:
                        var $heightField: CANNON.Heightfield = <CANNON.Heightfield>$body.shapes[i];
                        break;
                    default:

                        break;
                }

                this._directShadowDisplay3DSprite = $tempDis

                this.dispList.push($tempDis);


            }


        }
        protected drawCylinderConvexPolyh($cylinder: CANNON.Cylinder, $pos: Vector3D, $qua: Quaternion): Vector2D {

            var m: Matrix3D = new Matrix3D;
            $qua.toMatrix3D(m);
            m.invert()
            m.appendTranslation($pos.x, $pos.y, $pos.z)
            var $radius: number = 0;
            var $height: number = 0
            for (var i: number = 0; i < $cylinder.faces.length; i++) {
                var a: number = $cylinder.faces[i][0];
                var b: number = $cylinder.faces[i][1];
                var c: number = $cylinder.faces[i][2];
                var d: number = $cylinder.faces[i][3];

                var A: Vector3D = Physics.Vect3dC2W($cylinder.vertices[a])
                var B: Vector3D = Physics.Vect3dC2W($cylinder.vertices[b])
                var C: Vector3D = Physics.Vect3dC2W($cylinder.vertices[c])
                var D: Vector3D = Physics.Vect3dC2W($cylinder.vertices[d])


                $height = Math.max($height, A.y, B.y, C.y, D.y);

                $radius = Math.max($radius, A.x * A.x + A.z * A.z)
                $radius = Math.max($radius, B.x * B.x + B.z * B.z)
                $radius = Math.max($radius, C.x * C.x + C.z * C.z)

            }
            return new Vector2D(Math.sqrt($radius) / Physics.baseScale10, $height / Physics.baseScale10)

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

            }

        }
        public update(): void {
            if (this._body) {
                this.mathPosMatrix();

                //this._directShadowDisplay3DSprite.x = this._x;
                //this._directShadowDisplay3DSprite.y = this._y;
                //this._directShadowDisplay3DSprite.z = this._z;

                //this._directShadowDisplay3DSprite.rotationX = this._rotationX;
                //this._directShadowDisplay3DSprite.rotationY = this._rotationY;
                //this._directShadowDisplay3DSprite.rotationZ = this._rotationZ;

                for (var i: number = 0; i < this.dispList.length; i++) {
                    var $dis: DirectShadowDisplay3DSprite = this.dispList[i]
                    var $ma: Matrix3D = new Matrix3D;
                    Physics.MathBody2WMatrix3D(this._body, $ma)

                    var $shapeQua: Quaternion = Physics.Quaternion2W(this._body.shapeOrientations[i]);
                    var $shapePos: Vector3D = Physics.Vect3dC2W(this._body.shapeOffsets[i])

                    var $mqua: Matrix3D = $shapeQua.toMatrix3D();
                    $mqua.invert()

                    var $endM: Matrix3D = new Matrix3D;
                    $endM.append($mqua);
                    $endM.appendTranslation($shapePos.x, $shapePos.y, $shapePos.z)
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
                this._scene.addDisplay(this);
                this._bodyLineSprite._scene = this._scene;
              //  this._scene.addDisplay(this._bodyLineSprite);
                for (var i: number = 0; i < this.dispList.length; i++) {
                    this.dispList[i]._scene = this._scene;
                    this._scene.addDisplay(this.dispList[i]);
                }
                Physics.world.addBody(this._body);
            }
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
        public getPostionV3d(): Vector3D {
            return new Vector3D(this.x,this.y,this.z)
        }


    }
}