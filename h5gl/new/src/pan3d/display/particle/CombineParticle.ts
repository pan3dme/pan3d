module Pan3d {
    export class CombineParticle extends EventDispatcher {
        public maxTime: number = 1000000;
        public url: string;
        public sourceData: CombineParticleData;
        public addPrticleItem($dis: Display3DParticle): void {
            $dis.visible = false;
            // $dis.setBind(this.bindVecter3d, this.bindMatrix, this.bindScale, this.invertBindMatrix, this.groupMatrix);
            // this._displayAry.push($dis);
        }
    }
}