module Pan3d {
    export class Display3DLocusBallPartilce extends Display3DBallPartilce {

        

        public creatData(): void {
            this.data = new ParticleLocusballData(this.scene3D);
        }

       


    }
}