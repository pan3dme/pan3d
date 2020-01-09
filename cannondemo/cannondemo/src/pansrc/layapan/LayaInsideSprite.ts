/*
自定义着色器
*/
module layapan {
    import Pan3dByteArray = Pan3d.Pan3dByteArray;
 
    
	export class Pan3dInSideLaya {
		static inited: boolean = false;
		static overrideMethods(): void {
			if (this.inited) {
				return;
			}
            this.inited = true;
    
			let compatibleLayaRender = function (pan3dFunc: Function, ...args): any {
				let gl = Pan3d.Scene_data.context3D.renderContext;
				let arrayBuffer = gl.getParameter(gl.ARRAY_BUFFER_BINDING);
				let elementArrayBuffer = gl.getParameter(gl.ELEMENT_ARRAY_BUFFER_BINDING);
				let v = pan3dFunc.apply(this, args);
				gl.bindBuffer(gl.ARRAY_BUFFER, arrayBuffer);
                gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, elementArrayBuffer);
				return v;
            }
                
			let ParticleBoneData_setAllByteInfo = Pan3d.ParticleBoneData.prototype.setAllByteInfo;
			Pan3d.ParticleBoneData.prototype.setAllByteInfo = function (byte: Pan3dByteArray): void {
				return compatibleLayaRender.call(this, ParticleBoneData_setAllByteInfo, byte);
			}
			let ParticleFacetData_setAllByteInfo = Pan3d.ParticleFacetData.prototype.setAllByteInfo;
			Pan3d.ParticleFacetData.prototype.setAllByteInfo = function (byte: Pan3dByteArray): void {
				return compatibleLayaRender.call(this, ParticleFacetData_setAllByteInfo, byte);
			}
			let ParticleFollowData_setAllByteInfo = Pan3d.ParticleFollowData.prototype.setAllByteInfo;
			Pan3d.ParticleFollowData.prototype.setAllByteInfo = function (byte: Pan3dByteArray): void {
				return compatibleLayaRender.call(this, ParticleFollowData_setAllByteInfo, byte);
			}
			let ParticleFollowLocusData_setAllByteInfo = Pan3d.ParticleFollowLocusData.prototype.setAllByteInfo;
			Pan3d.ParticleFollowLocusData.prototype.setAllByteInfo = function (byte: Pan3dByteArray): void {
				return compatibleLayaRender.call(this, ParticleFollowLocusData_setAllByteInfo, byte);
			}
			let ParticleLocusData_setAllByteInfo = Pan3d.ParticleLocusData.prototype.setAllByteInfo;
			Pan3d.ParticleLocusData.prototype.setAllByteInfo = function (byte: Pan3dByteArray): void {
				return compatibleLayaRender.call(this, ParticleLocusData_setAllByteInfo, byte);
			}
			let ParticleLocusballData_setAllByteInfo = Pan3d.ParticleLocusballData.prototype.setAllByteInfo;
			Pan3d.ParticleLocusballData.prototype.setAllByteInfo = function (byte: Pan3dByteArray): void {
				return compatibleLayaRender.call(this, ParticleLocusballData_setAllByteInfo, byte);
			}
			let ParticleModelData_setAllByteInfo = Pan3d.ParticleModelData.prototype.setAllByteInfo;
			Pan3d.ParticleModelData.prototype.setAllByteInfo = function (byte: Pan3dByteArray): void {
				return compatibleLayaRender.call(this, ParticleModelData_setAllByteInfo, byte);
			}
			let ParticleBallData_setAllByteInfo = Pan3d.ParticleBallData.prototype.regShader;
			Pan3d.ParticleBallData.prototype.regShader = function (): void {
				return compatibleLayaRender.call(this, ParticleBallData_setAllByteInfo);
            }
			// 重写下以下方法 要不会影响到渲染队列之前的laya绘制
			let MeshDataManager_readData = Pan3d.MeshDataManager.prototype.readData;
			Pan3d.MeshDataManager.prototype.readData = function (byte, batchNum, url, version): Pan3d.SkinMesh {
				return compatibleLayaRender.call(this, MeshDataManager_readData, byte, batchNum, url, version);
			}
			let ObjDataManager_loadObjCom = Pan3d.ObjDataManager.prototype.loadObjCom;
			Pan3d.ObjDataManager.prototype.loadObjCom = function (byte: ArrayBuffer, url: string): Pan3d.ObjData {
				return compatibleLayaRender.call(this, ObjDataManager_loadObjCom, byte, url);
			}

			let ArtFont_getAirFontWidth = Pan3d.ArtFont.prototype.getAirFontWidth;
			Pan3d.ArtFont.prototype.getAirFontWidth = function ($ctx: CanvasRenderingContext2D, $str: string, $color: string = Pan3d.ArtFont.White, $txtInterval: number = 0): number {
				return compatibleLayaRender.call(this, ArtFont_getAirFontWidth, $ctx, $str, $color, $txtInterval) + $txtInterval;
			}

			let ArtFont_writeFontToCtxLeft = Pan3d. ArtFont.prototype.writeFontToCtxLeft;
			Pan3d.ArtFont.prototype.writeFontToCtxLeft = function ($ctx: CanvasRenderingContext2D, $str: string, $color: string = Pan3d.ArtFont.num1, $tx: number = 0, $ty: number = 0, $txtInterval: number = 0): number {
				return compatibleLayaRender.call(this, ArtFont_writeFontToCtxLeft, $ctx, $str, $color, $tx, $ty, $txtInterval) + $txtInterval;
			}

			let SkillRes_loadComplete = Pan3d.SkillRes.prototype.loadComplete;
			Pan3d.SkillRes.prototype.loadComplete = function (byte: ArrayBuffer): void {
				compatibleLayaRender.call(this, SkillRes_loadComplete, byte);
			}
			let RoleRes_loadComplete = Pan3d.RoleRes.prototype.loadComplete;
			Pan3d.RoleRes.prototype.loadComplete = function (byte: ArrayBuffer): void {
				compatibleLayaRender.call(this, RoleRes_loadComplete, byte);
			}
			let RoleResLow_loadComplete = Pan3d.RoleResLow.prototype.loadComplete;
			Pan3d.RoleResLow.prototype.loadComplete = function (byte: ArrayBuffer): void {
				compatibleLayaRender.call(this, RoleResLow_loadComplete, byte);
			}
			let ModelRes_loadComplete = Pan3d.ModelRes.prototype.loadComplete;
			Pan3d.ModelRes.prototype.loadComplete = function (byte: ArrayBuffer): void {
				compatibleLayaRender.call(this, ModelRes_loadComplete, byte);
			}
			let GroupRes_loadComplete = Pan3d.GroupRes.prototype.loadComplete;
			Pan3d.GroupRes.prototype.loadComplete = function (byte: ArrayBuffer): void {
				compatibleLayaRender.call(this, GroupRes_loadComplete, byte);
			}

			let UIRenderComponent_applyObjData = Pan3d.UIRenderComponent.prototype.applyObjData;
			Pan3d.UIRenderComponent.prototype.applyObjData = function (): void {
				compatibleLayaRender.call(this, UIRenderComponent_applyObjData);
			}
			let Display3dShadow_applyObjData = Pan3d.Display3dShadow.prototype.applyObjData;
			Pan3d.Display3dShadow.prototype.applyObjData = function (): void {
				compatibleLayaRender.call(this, Display3dShadow_applyObjData);
			}
       
		}
	}
	
    /*
    该类需继承自显示对象类
    在该类中使用了自定义的着色器程序
    注意：使用自定义着色器时，需要设置该显示对象类的渲染模式this._renderType |= Laya.RenderSprite.CUSTOM;并且需要重写该类的渲染处理函数
    */
    export class LayaInsideSprite extends Laya.Sprite {
        private static _list: Array<LayaInsideSprite> = [];
        private static add(v: LayaInsideSprite): void {
            LayaInsideSprite._list.push(v);
            // 重写下laya的渲染提交函数插入pan渲染
            let context = Laya.Render.context.ctx as Laya.WebGLContext2D;
            context.submitElement = (start: number, end: number): void => {
                var renderList = context._submits;
                end < 0 && (end = renderList._length);
                if (start == end) {
                    LayaInsideSprite.forEach((value: LayaInsideSprite, index: number) => {
                        value.testRenderPan3d(-1);
                    });
                }
                else {
                    while (start < end) {
                        start += renderList[start].renderSubmit();
                        LayaInsideSprite.forEach((value: LayaInsideSprite, index: number) => {
                            value.testRenderPan3d(start);
                        });
                    }
                }
            }
        }
        private static forEach(f: Function) {
            for (let item of this._list) {
                f.call(null, item, 0);
            }
        }
        protected _layaRenderIndex: number = -1;
        public scene: LayaOverride2dSceneManager;
        constructor() {
            super();
            LayaInsideSprite.add(this);
            this.initData()
        }
        protected initData(): void {
           // Pan3dInSideLaya.overrideMethods();
            this.init(null);
            this.scene = new LayaOverride2dSceneManager();
            this.scene.layaSprite = this;
            this.scene.ready = true
            this.addOther()
        }
        protected addOther(): void {
            var $other: layapan.OtherLayaRectSprite = new layapan.OtherLayaRectSprite();
            this.addChild($other);
        }
        /*
        初始化此类
        texture 纹理对象
        vb 顶点数组
        ib 顶点索引数组
        */
        public init(texture: Laya.Texture, vb: Array<any> = null, ib: Array<any> = null): void {
			// 保证customRender必定执行
			this.frameLoop(1, this, () => {
				this.graphics.clear();
				this.graphics.drawLine(0, 0, 1, 0, '#000');
			});
			this.customRenderEnable = true;
			this.customRender = (context: Laya.RenderContext, x: number, y: number) => {
                let webGLContext = context.ctx as Laya.WebGLContext2D;
                this._layaRenderIndex = webGLContext._submits._length;
			}
        }
        public testRenderPan3d(index: number): void {

			if (this._layaRenderIndex < 0
				|| (index != 0 && index != this._layaRenderIndex)
            ) {
				return;
            }
            this._layaRenderIndex = -1;
      
            this.upFrame();
 
        }
        protected upFrame(): void {
         
        }
     

		// 保存WebGLContext laya的渲染状态
		static saveLayaWebGLContext(): void {
			let gl = laya.webgl.WebGL.mainContext;
            laya.webgl.WebGLContext._depthTest = gl.isEnabled(laya.webgl.WebGLContext.DEPTH_TEST);
            laya.webgl.WebGLContext._depthMask = gl.getParameter(laya.webgl.WebGLContext.DEPTH_WRITEMASK);
            laya.webgl.WebGLContext._depthFunc = gl.getParameter(laya.webgl.WebGLContext.DEPTH_FUNC)
            laya.webgl.WebGLContext._blend = gl.isEnabled(laya.webgl.WebGLContext.BLEND);
            laya.webgl.WebGLContext._sFactor = gl.getParameter(laya.webgl.WebGLContext.BLEND_SRC_RGB);
            laya.webgl.WebGLContext._dFactor = gl.getParameter(laya.webgl.WebGLContext.BLEND_DST_RGB);
            laya.webgl.WebGLContext._cullFace = gl.isEnabled(laya.webgl.WebGLContext.CULL_FACE);
            laya.webgl.WebGLContext['_cullFaceMode'] = gl.getParameter(laya.webgl.WebGLContext.CULL_FACE_MODE);

            laya.webgl.WebGLContext['_arrayBuffer'] = gl.getParameter(laya.webgl.WebGLContext.ARRAY_BUFFER_BINDING);
            laya.webgl.WebGLContext['_arrayBuffer'] && gl.bindBuffer(laya.webgl.WebGLContext.ARRAY_BUFFER, null);
            laya.webgl.WebGLContext['_elementArrayBuffer'] = gl.getParameter(laya.webgl.WebGLContext.ELEMENT_ARRAY_BUFFER_BINDING);
            laya.webgl.WebGLContext['_elementArrayBuffer'] && gl.bindBuffer(laya.webgl.WebGLContext.ELEMENT_ARRAY_BUFFER, null);

            laya.webgl.WebGLContext['_frameBuffer'] = gl.getParameter(laya.webgl.WebGLContext.FRAMEBUFFER_BINDING);
            laya.webgl.WebGLContext['_frameBuffer'] && gl.bindFramebuffer(laya.webgl.WebGLContext.FRAMEBUFFER, null);
            laya.webgl.WebGLContext['_renderBuffer'] = gl.getParameter(laya.webgl.WebGLContext.RENDERBUFFER_BINDING);
            laya.webgl.WebGLContext['_renderBuffer'] && gl.bindRenderbuffer(laya.webgl.WebGLContext.RENDERBUFFER, null);

            laya.webgl.WebGLContext['_bindTextureCubeMap'] = gl.getParameter(laya.webgl.WebGLContext.TEXTURE_BINDING_CUBE_MAP);
            laya.webgl.WebGLContext['_activeTexture'] = gl.getParameter(laya.webgl.WebGLContext.ACTIVE_TEXTURE);

		}

		// 还原WebGLContext到laya之前的渲染状态
		static revertLayaWebGLContext(): void {
            let gl = laya.webgl.WebGL.mainContext;
            gl.bindBuffer(laya.webgl.WebGLContext.ARRAY_BUFFER, laya.webgl.WebGLContext['_arrayBuffer']);
            gl.bindBuffer(laya.webgl.WebGLContext.ELEMENT_ARRAY_BUFFER, laya.webgl.WebGLContext['_elementArrayBuffer']);
            gl.bindFramebuffer(laya.webgl.WebGLContext.FRAMEBUFFER, laya.webgl.WebGLContext['_frameBuffer']);
            gl.bindRenderbuffer(laya.webgl.WebGLContext.RENDERBUFFER, laya.webgl.WebGLContext['_renderBuffer']);
            gl.useProgram(laya.webgl.WebGLContext._useProgram);

		}

    }




    /*
    自定义着色器
    */
    export  class OtherShader extends Laya.Shader {
        /**
         *当前着色器的一个实例对象 
         */
        public static shader: OtherShader = new OtherShader();
        constructor() {
            //顶点着色器程序和片元着色器程序。
            var vs: string = "attribute vec2 position;attribute vec2 texcoord;attribute vec4 color;uniform vec2 size;uniform mat4 mmat;varying vec2 v_texcoord;varying vec4 v_color;void main(){vec4 pos =mmat*vec4(position.x,position.y,0,1.0);gl_Position = vec4((pos.x/size.x-0.5)*2.0, (0.5-pos.y/size.y)*2.0, pos.z, 1.0);v_color = color;v_texcoord = texcoord;}"
            var ps: string = "precision mediump float;varying vec2 v_texcoord;varying vec4 v_color;uniform sampler2D texture;void main(){vec4 t_color = texture2D(texture, v_texcoord);gl_FragColor = vec4(1.0,0.0,1.0,1.0);}";
            super(vs, ps, "myShader");
        }
    }
    export class OtherShaderValue extends Laya.Value2D {
        public texcoord: any;
        constructor() {
            super(0, 0);
            var _vlen: number = 8 * Laya.CONST3D2D.BYTES_PE;
            //设置在shader程序文件里定义的属性相关描述：【属性长度，属性类型，false，属性起始位置索引*CONST3D2D.BYTES_PE】
            this.position = [2, Laya.WebGLContext.FLOAT, false, _vlen, 0];
            this.texcoord = [2, Laya.WebGLContext.FLOAT, false, _vlen, 2 * Laya.CONST3D2D.BYTES_PE];
            this.color = [4, Laya.WebGLContext.FLOAT, false, _vlen, 4 * Laya.CONST3D2D.BYTES_PE];
        }
    }

    export class OtherLayaRectSprite extends Laya.Sprite {
        /** 顶点缓冲区。      */
        private vBuffer: Laya.VertexBuffer2D;
        /** 片元缓冲区。      */
        private iBuffer: Laya.IndexBuffer2D;
        private vbData: Float32Array;
        private ibData: Uint16Array;
        private iNum: number = 0;
        /** 着色器变量。      */
        private shaderValue: OtherShaderValue;
        constructor() {
            super();
            this.init(null)
        }
        /*
        初始化此类
        texture 纹理对象
        vb 顶点数组
        ib 顶点索引数组
        */
        public init(texture: Laya.Texture, vb: Array<any> = null, ib: Array<any> = null): void {
            this.vBuffer = Laya.VertexBuffer2D.create();
            this.iBuffer = Laya.IndexBuffer2D.create();
            this.ibData = new Uint16Array([]);
            var vbArray: Array<any>;
            var ibArray: Array<any>;
            if (vb) {
                vbArray = vb;
            }
            else {
                vbArray = [];
                var texWidth: number =100
                var texHeight: number =20
                //定义颜色值，取值范围0~1浮点
                var red: number = 1;
                var greed: number = 1;
                var blue: number = 1;
                var alpha: number = 1;
                //在顶点数组中放入4个顶点
                //每个顶点的数据：（坐标x，坐标y，u，v，R,G,B,A）
                vbArray.push(0, 0, 0, 0, red, greed, blue, alpha);
                vbArray.push(texWidth, 0, 1, 0, red, greed, blue, alpha);
                vbArray.push(texWidth, texHeight, 1, 1, red, greed, blue, alpha);
                vbArray.push(0, texHeight, 0, 1, red, greed, blue, alpha);
            }
            if (ib) {
                ibArray = ib;
            }
            else {
                ibArray = [];
                //在顶点索引数组中放入组成三角形的顶点索引
                //三角形的顶点索引对应顶点数组vbArray里的点索引，索引从0开始
                ibArray.push(0, 1, 3);//从第一个三角形的顶点索引
                //ibArray.push(3,1,2);第二个三角形的顶点索引
            }
            this.iNum = ibArray.length;
            this.vbData = new Float32Array(vbArray);
            this.ibData = new Uint16Array(ibArray);
            this.vBuffer.append(this.vbData);
            this.iBuffer.append(this.ibData);
            this.shaderValue = new OtherShaderValue();
            this.shaderValue.textureHost = null;
            this._renderType |= Laya.RenderSprite.CUSTOM;//设置当前显示对象的渲染模式为自定义渲染模式
        }
 
        public customRender(context: Laya.RenderContext, x: number, y: number): void {
            (context.ctx as Laya.WebGLContext2D).setIBVB(x, y, (this.iBuffer) as Laya.IndexBuffer2D, (this.vBuffer) as Laya.VertexBuffer2D, this.iNum, null, OtherShader.shader, this.shaderValue, 0, 0);

      }



    }

}