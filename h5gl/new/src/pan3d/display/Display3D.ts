module Pan3d {
    export class Display3D extends Object3D{
        public scene3D:Scene3D;
        public posMatrix:Matrix3D;
    
        constructor(value:Scene3D ) {
            super();
            this.scene3D=value;
            this.posMatrix=new Matrix3D();
        }
        public upFrame():void {
       
        }
      
    }
}