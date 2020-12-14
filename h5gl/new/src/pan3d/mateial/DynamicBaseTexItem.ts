module Pan3d {
    export class DynamicBaseTexItem {
        public target: TexItem;
        public paramName: string;
        public textureRes: TextureRes;

      

        public get texture(): WebGLTexture {
            if (this.textureRes) {
                return this.textureRes.texture;
            }
            return null;
        }

    }
}