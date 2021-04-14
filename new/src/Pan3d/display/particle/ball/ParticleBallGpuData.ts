module Pan3d {
    export class ParticleBallGpuData extends ParticleGpuData {
        public basePos: Array<number>;
        public basePosBuffer: WebGLBuffer;

        public beMove: Array<number>;
        public beMoveBuffer: WebGLBuffer

        public randomColor: Array<number>;
        public randomColorBuffer: WebGLBuffer;
        public randomOffset: number;

        public baseRotation: Array<number>;
        public baseRotationBuffer: WebGLBuffer;

    }
}