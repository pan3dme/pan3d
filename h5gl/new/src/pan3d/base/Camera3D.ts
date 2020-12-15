module Pan3d {
    export class Camera3D extends Object3D {
        public camMatrix3D:Matrix3D ;
        public viewMatrix:Matrix3D ;
        public modelMatrix:Matrix3D ;
        public distance:number ;
        public sceneViewHW:number ;
        public fovw:number ;
        public fovh:number ;
      
        public get cameraMatrix(): Matrix3D {
            return this.modelMatrix;
        }
        public constructor()
        {
            super()

            this.camMatrix3D=new Matrix3D();
            this.viewMatrix =new Matrix3D();
            this.modelMatrix =new Matrix3D();
            this.distance=100;
            this.sceneViewHW=100;
            this.fovw=300;
            this.fovh=500;
            this.rotationX =-30;
            this.rotationY=45;

        }
        public  upFrame  ():void
        {
    
            this.viewMatrix.identity();
            this.viewMatrix.perspectiveFieldOfViewLH(1,1,10,5000);
            this.camMatrix3D.identity();
            this.camMatrix3D.appendRotation(this.rotationY, Vector3D.Y_AXIS);
            this.camMatrix3D.appendRotation(this.rotationX, Vector3D.X_AXIS);
            this.camMatrix3D.appendTranslation(0,0,this.distance);
            this.modelMatrix= this.viewMatrix.clone();
            this.modelMatrix.prepend(this.camMatrix3D);
            var m:Matrix3D=this.camMatrix3D.clone();
            m.invert();
            var p:Vector3D=   m.transformVector(new Vector3D(0,0,-this.distance));
            this.x=p.x;
            this.y=p.y;
            this.z=p.z;
        }
    }
}