module Pan3d {
    export class ObjData extends ResCount {
        public vertices: Array<number> = new Array;
        public uvs: Array<number> = new Array;
        public indexs: Array<number> = new Array;
        public lightuvs: Array<number> = new Array;
        public normals: Array<number> = new Array;
        public tangents: Array<number> = new Array;
        public bitangents: Array<number> = new Array;


        public treNum: number;

        public vertexBuffer: WebGLBuffer;
        public uvBuffer: WebGLBuffer;
        public indexBuffer: WebGLBuffer;
        public lightUvBuffer: WebGLBuffer;
        public normalsBuffer: WebGLBuffer;
        public tangentBuffer: WebGLBuffer;
        public bitangentBuffer: WebGLBuffer;


        constructor(value: Scene3D) {
            super(value);
        }
        public upToGpu(): void {


            if (this.indexs.length) {
                this.treNum = this.indexs.length
                var context3D: Context3D = this.scene3D.context3D;
                this.vertices ? this.vertexBuffer = context3D.uploadBuff3D(this.vertices) : null;
                this.uvs ? this.uvBuffer = context3D.uploadBuff3D(this.uvs) : null;
                this.normals ? this.normalsBuffer = context3D.uploadBuff3D(this.normals) : null;
                this.indexs ? this.indexBuffer = context3D.uploadIndexBuff3D(this.indexs) : null;
            }

        }



    }
}