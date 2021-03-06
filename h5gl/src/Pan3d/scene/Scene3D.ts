module Pan3d {
    export class Scene3D {
    
        public static getArrByStr(str: String): Array<string> {
            var boneNameAry: Array<string> = str.split(/\s+/g);
            for (var i: number = boneNameAry.length - 1; i >= 0; i--) {
                if (String(boneNameAry[i]).length < 1) {
                    boneNameAry.splice(i, 1);
                }
            }
            return boneNameAry;
        }
        public context3D: Context3D;
        public camera3D: Camera3D;
        public   skyCubeMap: Array<WebGLTexture>;
        public   pubLut: WebGLTexture;
        public get cam3D(): Camera3D {
            return this.camera3D
        }
        public get viewMatrx3D(): Matrix3D {
            return this.cam3D.cameraMatrix;
        }
        public   initPbr(): void {
            if (!this.pubLut) {
                this.textureManager.getTexture(this.fileRoot + "base/brdf_ltu.jpg", ($texture: TextureRes) => {
                    this.pubLut = $texture.texture;
                }, 1);
            }

            if (!this.skyCubeMap) {
                this.textureManager.loadCubeTexture(this.fileRoot + "base/cube/e", ($ary: any) => {
                    this.skyCubeMap = $ary;
                })
            }


        }
    
        public progrmaManager: ProgrmaManager;
        public objDataManager: ObjDataManager;
        public textureManager: TextureManager;
        public materialManager: MaterialManager;
        public particleManager: ParticleManager;
        public groupDataManager: GroupDataManager;
        public resManager: ResManager;
        public animManager: AnimManager;
        public meshDataManager: MeshDataManager;
        public skillManager: SkillManager;
        public fileRoot: string = "https://webpan.oss-cn-shanghai.aliyuncs.com/res/";
        public supportBlob: boolean;
        public fogColor: Array<number> = [0, 0, 0];
        public fogData: Array<number> = [1000, 0.003];
        public scaleLight: Array<number> = [2.0];
       
        public static frameTime: number = 1000 / 60;
        public static MAX_NUMBER: number = 10000000;
        protected _displayList: Array<Display3D>;
        protected _displayRoleList: Array<Display3dMovie>;
        constructor(value: WebGLRenderingContext) {

            this.supportBlob = true;
            this.context3D = new Context3D(value)
            this.camera3D = new Camera3D();
            this.progrmaManager = new ProgrmaManager(this);
            this.objDataManager = new ObjDataManager(this);
            this.textureManager = new TextureManager(this);
            this.materialManager = new MaterialManager(this);
            this.groupDataManager = new GroupDataManager(this);
            this.resManager = new ResManager(this);
            this.animManager = new AnimManager(this);
            this.meshDataManager = new MeshDataManager(this);
            this.particleManager = new ParticleManager(this);
            this.skillManager = new SkillManager(this);
            this._displayList = new Array();
            this._displayRoleList = new Array();
            this.initPbr();
            this.addDisplay(new GridLineSprite(this));
            // this.displayBaseSprite=new DisplayBaseSprite( this.context3D.webGlRender);
        }
        public clearAll() {
            this._displayList = new Array();
            this._displayRoleList = new Array();
            this.particleManager.clearAll();
        }
        private displayBaseSprite: DisplayBaseSprite;

        public addDisplay(itemDisplay: Display3D) {
            this._displayList.push(itemDisplay)
        }
        public addMovieDisplay(role: Display3dMovie) {
        this._displayRoleList.push(role);
        }

        public upFrame(): void {
            this.camera3D.upFrame();
            this.updateFrameRole();
            // this.camera3D.rotationY++;
            this.context3D.setBaseRender();
            this.context3D.setWriteDepth(true);
            this.context3D.setBlendParticleFactors(0);
            for (var i: number = 0; i < this._displayList.length; i++) {
                this._displayList[i].upFrame();
            }
            for (var i: number = 0; i < this._displayRoleList.length; i++) {
           
                this._displayRoleList[i].upFrame();
            }
            this.skillManager.update();
            this.particleManager.upFrame()
            this.displayBaseSprite ? this.displayBaseSprite.upFrame() : null;

        }
        public time:number=0;
        private   updateFrameRole():void{
            var _tempTime:number= TimeUtil.getTimer();
            var delay :number=  _tempTime - this.time;
            this.time=_tempTime;
            for (var i: number = 0; i < this._displayRoleList.length; i++) {
           
                this._displayRoleList[i].updateFrame(delay);
            }
            
    
        }
    

    }
}