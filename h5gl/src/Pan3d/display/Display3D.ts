module Pan3d {
    export class Display3D extends Object3D{
        public scene3D:Scene3D;
        public posMatrix:Matrix3D;
        public sceneVisible: boolean = true;
        constructor(value:Scene3D ) {
            super();
            this.scene3D=value;
            this.posMatrix=new Matrix3D();
        }
        public upFrame():void {
       
            
        }
        public updateMatrix(): void {
            this.posMatrix.identity();
            this.posMatrix.appendScale(this.scaleX, this.scaleY, this.scaleZ);
            this.posMatrix.appendRotation(this.rotationX, Vector3D.X_AXIS)
            this.posMatrix.appendRotation(this.rotationY, Vector3D.Y_AXIS)
            this.posMatrix.appendRotation(this.rotationZ, Vector3D.Z_AXIS)
             this.posMatrix.appendTranslation(this.x, this.y, this.z);
        }
      
    }
}