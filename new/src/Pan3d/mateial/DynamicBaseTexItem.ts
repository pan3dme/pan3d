module Pan3d {
    export class DynamicBaseTexItem {
        public target: TexItem;
        public paramName: string;
        public textureRes: TextureRes;

      
        public scene3D:Scene3D;
        public constructor(value:Scene3D){

            this.scene3D=value;
        }


        public get texture(): WebGLTexture {
            if (this.textureRes) {
                return this.textureRes.texture;
            }
            return null;
        }

    }
}