module Pan3d {
    export class Display3D extends Object3D{
        public scene3D:Scene3D;
    
        constructor(value:Scene3D ) {
            super();
            this.scene3D=value;
        }
        public upFrame():void {
       
        }
      
    }
}