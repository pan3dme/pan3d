module Pan3d {

    export class SkinMesh extends ResCount {
        public meshAry: Array<MeshData> = new Array;
        allParticleDic: Object;
        boneSocketDic: Object;
        public addMesh($mesh: MeshData): void {
            $mesh.uid = this.meshAry.length;
            this.meshAry.push($mesh);
        }
        makeHitBoxItem() {
 
        }
        fileScale: any;
        tittleHeight: any;
        hitBox: Vector2D;
    }
}