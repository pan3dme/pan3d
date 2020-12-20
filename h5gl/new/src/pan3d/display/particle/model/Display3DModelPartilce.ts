module Pan3d {
    export class Display3DModelPartilce extends Display3DParticle {
 
        protected _resultUvVec: Array<number>;
        public constructor(value:Scene3D) {
            super(value);
            this._resultUvVec = new Array(2);
        }

        public get modeldata(): ParticleModelData {
            return <ParticleModelData>this.data;
        }

        public creatData(): void {
            this.data = new ParticleModelData(this.scene3D);
        }
        public setVc(): void {

            super.setVc();
            var  ctx:Context3D= this.scene3D.context3D;
            this.setViewCamModeMatr3d();
            this.updateRotaionMatrix();
            ctx.setVcMatrix4fv(this.shader,"rotMatrix",this._rotationMatrix.m);

            console.log(this);

        }

        private updateRotaionMatrix():void
        {

        }

        public setVa(): void {
         
            super.setVa();
          
        }

        
 
 


    }
}