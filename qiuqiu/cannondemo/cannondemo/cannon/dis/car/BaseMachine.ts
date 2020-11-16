
module canonkey {
    import Display3D = Pan3d.Display3D;
    import Matrix3D = Pan3d.Matrix3D;
    import Object3D = Pan3d.Object3D;
    import Vector3D = Pan3d.Vector3D;
    import Quaternion = Pan3d.Quaternion;

    
    export class WheelInfoMesh implements CANNON.IWheelInfoOptions {

        worldTransform: Object
        chassisConnectionPointLocal: CANNON.Vec3;
        chassisConnectionPointWorld: CANNON.Vec3;
        directionLocal: CANNON.Vec3;
        directionWorld: CANNON.Vec3;
        axleLocal: CANNON.Vec3;
        axleWorld: CANNON.Vec3;
        suspensionRestLength: number;
        suspensionMaxLength: number;
        radius: number;
        suspensionStiffness: number;
        dampingCompression: number;
        dampingRelaxation: number;
        frictionSlip: number;
        steering: number;
        engineForce: number
        rotation: number;
        deltaRotation: number;
        rollInfluence: number;
        maxSuspensionForce: number;
        isFrontWheel: boolean;
        clippedInvContactDotSuspension: number;
        suspensionRelativeVelocity: number;
        suspensionForce: number;
        skidInfo: number;
        suspensionLength: number;
        maxSuspensionTravel: number;
        useCustomSlidingRotationalSpeed: boolean;
        customSlidingRotationalSpeed: number;

        position: CANNON.Vec3;
        direction: CANNON.Vec3;
        axis: CANNON.Vec3;
        body: CANNON.Body;
        constructor() {

        }


    }

    export class MachineBoneSocket extends Display3D {
        public name: string;
        public matrix3D: Matrix3D
        constructor($x: number = 0, $y: number = 0, $z: number = 0) {
            super();
            this.matrix3D = new Matrix3D;
        }
    }
    export  interface Imachine {
        upData();
        getSocket(socketName: string): MachineBoneSocket;
        getBody(): CANNON.Body;
        setMachineMatrix3d(value: Matrix3D);
    }

    export  class BaseMachine extends Object3D implements Imachine {
        constructor($x: number = 0, $y: number = 0, $z: number = 0) {
            super($x, $y, $z);
            this.displayList = new Array();
            this.boneSocketDic = new Array();
            this.initData();
        }
        public upData(): void {
            this.upDataBoneSocket();
        }
        public setMachineMatrix3d(value: Matrix3D): void {

        }
        protected displayList: Array<CanonPrefabSprite>;
        public boneSocketDic: Array<MachineBoneSocket>;
        public getSocket(socketName: string): MachineBoneSocket {
            for (var i: number = 0; i < this.boneSocketDic.length; i++) {
                if (this.boneSocketDic[i].name == socketName) {
                    return this.boneSocketDic[i];
                }
            }
            return null
        }
        public getBody(): CANNON.Body {
            return null
        }
        public upDataBoneSocket(): void {
            this.posMatrix.identity();
            this.posMatrix.appendScale(this._scaleX, this._scaleY, this._scaleZ);
            this.posMatrix.appendRotation(this._rotationX, Vector3D.X_AXIS)
            this.posMatrix.appendRotation(this._rotationY, Vector3D.Y_AXIS)
            this.posMatrix.appendRotation(this._rotationZ, Vector3D.Z_AXIS)
            this.posMatrix.appendTranslation(this._x, this._y, this._z);

            for (var i: number = 0; i < this.boneSocketDic.length; i++) {
                var $k: MachineBoneSocket = this.boneSocketDic[i]
                $k.updateMatrix()
                $k.matrix3D = this.posMatrix.clone();
                $k.matrix3D.prepend($k.posMatrix);
            }

        }

        protected initData(): void {

        }
        protected resetPostion(): void {
            for (var i: number = 0; i < this.displayList.length; i++) {
                var $mc: CanonPrefabSprite = this.displayList[i];
                var $m: Matrix3D = $mc.posMatrix.clone();
                $m.append(this.posMatrix.clone());
                var $q: Quaternion = new Quaternion();
                $q.fromMatrix($m);

                var $angle: Vector3D = $q.toEulerAngles();
                $mc.rotationX = $angle.x * 180 / Math.PI;
                $mc.rotationY = - $angle.y * 180 / Math.PI;
                $mc.rotationZ = $angle.z * 180 / Math.PI;

                $mc.x = $m.position.x;
                $mc.y = $m.position.y;
                $mc.z = $m.position.z;
            }
        }
        protected addSpriteToStage($body: CANNON.Body): void {
            var $mc: CanonPrefabSprite = new CanonPrefabSprite($body);
            $mc.addToWorld();
            $mc.update();
            this.displayList.push($mc);
        }

    }
    class RigidVehicleSprite extends BaseMachine {

        public rigidVehicle: CANNON.RigidVehicle
        constructor($x: number = 0, $y: number = 0, $z: number = 0) {
            super($x, $y, $z);
        }
    }
}