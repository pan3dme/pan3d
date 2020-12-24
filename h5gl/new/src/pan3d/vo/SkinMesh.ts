module Pan3d {

    export class SkinMesh extends ResCount {
        public animUrlAry: Array<string>;
        public animDic: Object = new Object;
        public meshAry: Array<MeshData> = new Array;
        allParticleDic: Object;
        boneSocketDic: Object;
        url: string;
        lightData: number[][];
        ready: boolean;
        public addMesh($mesh: MeshData): void {
            $mesh.uid = this.meshAry.length;
            this.meshAry.push($mesh);
        }
        makeHitBoxItem() {
 
        }
        fileScale: any;
        tittleHeight: any;
        hitBox: Vector2D;

        public loadMaterial($fun: Function = null): void {
            for (var i: number = 0; i < this.meshAry.length; i++) {
                this.loadByteMeshDataMaterial(this.meshAry[i], $fun);
            }
        }

        private loadByteMeshDataMaterial($meshData: MeshData, $fun: Function = null): void {
            var url: string = this.scene3D.fileRoot + $meshData.materialUrl;
            url = url.replace("_byte.txt", ".txt")
            url = url.replace(".txt", "_byte.txt")

            this.scene3D.materialManager.getMaterialByte(url, ($material: Material) => {
                $meshData.material = $material;
                if ($material.usePbr) {
                    this.scene3D.meshDataManager.uploadPbrMesh($meshData, $material.useNormal);
                } else if ($material.lightProbe || $material.directLight) {
                    this.scene3D.meshDataManager.uploadPbrMesh($meshData, false);
                }

                if ($meshData.materialParamData) {
                    $meshData.materialParam = new MaterialBaseParam(this.scene3D);
                    $meshData.materialParam.setData($meshData.material, $meshData.materialParamData);
                }

                if ($fun) {
                    $fun($material);
                }
            }, null, true, MaterialAnimShader.MATERIAL_ANIM_SHADER, MaterialAnimShader);
        }

        public setAction(actionAry: Array<string>, roleUrl: string): void {
            this.animUrlAry = new Array;
            for (var i: number = 0; i < actionAry.length; i++) {
                var name: string = actionAry[i];
                var url: string = roleUrl + actionAry[i];
                var anim: AnimData = this.scene3D.animManager.getAnimDataImmediate(url);
                anim.processMesh(this);
                this.animDic[name] = anim;
                this.animUrlAry.push(url);
            }
        }

    }
}