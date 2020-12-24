module Pan3d {
 
    export class AnimData {
        public inLoop: number = 0;

        public inter: Array<number> = new Array;

        public bounds: Array<Vector3D> = new Array;

        public nameHeight: number = 0;

        public posAry: Array<Vector3D> = new Array;

        public matrixAry: Array<Array<Matrix3D>>;

        public boneQPAry: Array<Array<DualQuatFloat32Array>>;

        public hasProcess: boolean = false;
    }
}