module Pan3d {
    export class Display3dMovie extends Display3DSprite  {
        public setRoleUrl(url: string) {
     
            this.scene3D.meshDataManager.getMeshData(url,(value:SkinMesh)=>{

            })
        }

    }
}