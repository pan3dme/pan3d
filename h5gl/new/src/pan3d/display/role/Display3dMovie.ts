module Pan3d {
    export class Display3dMovie extends Display3DSprite implements IBind  {
        
        protected _partUrl: Object;
        private _preLoadActionDic: Object;
        private _waitLoadActionDic: Object;
        public meshVisible: boolean = true;
        public name: string;
        public id: number;
        public objurl: string;
        public picUrl: string;
        public materialUrl: string;
        public materialInfoArr: Array<any>
        protected _defaultAction: string = "stand";
        // protected _defaultAction: string = "m_attack_01";
        // protected _defaultAction: string = "walk";
        protected _curentFrame: number = 0;
        protected _actionTime: number = 0;
        private curentAction: string;
        private _skinMesh: SkinMesh;
        protected _partDic: Object;
        private fileScale: number=1;
        private _animDic: Object;
 
        public time: number = 0;
        public lightMapTextureRes: TextureRes;


        protected _rotationMatrix: Matrix3D;
    

        public bindMatrix: Matrix3D;
        public bindTarget: IBind;
        public bindSocket: string;

        private _isInGroup: boolean;
        private _groupPos: Vector3D;
        private _groupRotation: Vector3D;
        private _groupScale: Vector3D;
        public groupMatrix: Matrix3D;
        public groupRotationMatrix: Matrix3D;
        protected resultSHVec: Array<Vector3D>;
        public dynamic: boolean = false;

        public constructor(val:Scene3D)
        {
            super(val);
            this._animDic = new Object;
            this._partDic = new Object;
            this._partUrl = new Object;
            this._preLoadActionDic = new Object;
            this._waitLoadActionDic = new Object;
        }
        public getSocket(socketName: string, resultMatrix: Matrix3D): void {

            resultMatrix.identity();
            if (!this._skinMesh) {
                resultMatrix.append(this.posMatrix);
                return;
            } else if (!this._skinMesh.boneSocketDic[socketName]) {
                if (socketName = "none") {
                    resultMatrix.appendTranslation(this.x, this.y, this.z);
                } else {
                    resultMatrix.append(this.posMatrix);
                }
                return;
            }

            var boneSocketData: BoneSocketData = this._skinMesh.boneSocketDic[socketName];
 

            var testmatix: Matrix3D;
            var index: number = boneSocketData.index;

            testmatix = this.getFrameMatrix(index);

            resultMatrix.appendScale(1 / this.scaleX, 1 / this.scaleY, 1 / this.scaleZ);

            resultMatrix.appendRotation(boneSocketData.rotationX, Vector3D.X_AXIS);
            resultMatrix.appendRotation(boneSocketData.rotationY, Vector3D.Y_AXIS);
            resultMatrix.appendRotation(boneSocketData.rotationZ, Vector3D.Z_AXIS);
            resultMatrix.appendTranslation(boneSocketData.x, boneSocketData.y, boneSocketData.z);

            if (testmatix) {
                resultMatrix.append(this._skinMesh.meshAry[this._skinMesh.meshAry.length-1].bindPosInvertMatrixAry[index]);

                resultMatrix.append(testmatix);
            }

            resultMatrix.append(this.posMatrix);

        }

        protected getFrameMatrix(index: number): Matrix3D {

            if (this._animDic[this.curentAction]) {
                var animData: AnimData = this._animDic[this.curentAction];
                if (this._curentFrame >= animData.matrixAry.length) {
                    return animData.matrixAry[0][index];
                }
                return animData.matrixAry[this._curentFrame][index];
            } else if (this._animDic[this._defaultAction]) {
                var animData: AnimData = this._animDic[this._defaultAction];
                return animData.matrixAry[this._curentFrame][index];
            }

            return null;
        }
       
      
        public setRoleUrl(url: string) {
     
            this.scene3D.meshDataManager.getMeshData(url,(value:SkinMesh)=>{

                this._skinMesh = value;
                this.fileScale = value.fileScale;
                this.updateMatrix();
                this.addSkinMeshParticle();
                this._animDic = value.animDic;
                this.onMeshLoaded();
 

            })
        }
        public updateMatrix(): void {
             super.updateMatrix();
            this.posMatrix.appendScale( this.fileScale,  this.fileScale,  this.fileScale);
 
            
 
        }
        public onMeshLoaded(): void {
            
        }
        public addSkinMeshParticle(): void {
            if (!this._skinMesh) {
                return;
            }
            var dicAry: Array<CombineParticle> = new Array;
            this._partDic["mesh"] = dicAry;

            var meshAry: Array<MeshData> = this._skinMesh.meshAry;
            if (!meshAry) {
                return;
            }
            for (var i: number = 0; i < meshAry.length; i++) {
                var particleAry: Array<BindParticle> = meshAry[i].particleAry;
                for (var j: number = 0; j < particleAry.length; j++) {
                    var bindPartcle: BindParticle = particleAry[j];
                    var particle: CombineParticle;
                    particle = this.scene3D.particleManager.getParticleByte(this.scene3D.fileRoot + bindPartcle.url);
                    if (!particle.sourceData) {
                        console.log("particle.sourceData error");
                    }
                    particle.dynamic = true;
                    particle.bindSocket = bindPartcle.socketName;
                    dicAry.push(particle);
                    particle.bindTarget = this;
                    this.scene3D.particleManager.addParticle(particle);

                }
            }
        }
        public upFrame():void
        {
            if (!this._skinMesh) {
                return;
            }
 
            this.updateBind();

            if (this.meshVisible) {
                for (var i: number = 0; i < this._skinMesh.meshAry.length; i++) {
                    this.updateMaterialMesh(this._skinMesh.meshAry[i]);
                }
            }

         

        }
 
        public play($action: string, $completeState: number = 0, needFollow: boolean = true): boolean {
            //FpsMc.tipStr = "1" + $action + "," + this._curentAction;
            if (this.curentAction == $action) {
                return;
            }
            //FpsMc.tipStr = "2";
            this.curentAction = $action;
            this.completeState = $completeState;
            this._actionTime = 0;
        
            this.updateFrame(0);
            //FpsMc.tipStr = "3";
            if (this._animDic.hasOwnProperty($action)) {
                //FpsMc.tipStr = "4";
                return true;
            } else {
                //FpsMc.tipStr = "5";
                if (!this._waitLoadActionDic[$action] && this._preLoadActionDic[$action]) {
                    //FpsMc.tipStr = "6";
                    // this.setAnimUrl($action, this._preLoadActionDic[$action]);
                }
                return false;
            }
        }

        public    completeState:number=0;
    
        public    updateFrame(t:number):void{
            this._actionTime+=t;
            if(this._skinMesh==null){
                return;
            }
            var animData :AnimData  =this._getCurentAnimData();
            if (animData==null) {
                return;
            }
            this._curentFrame=Math.floor(this._actionTime/(Scene3D.frameTime*1.5) );
            if (this._curentFrame >= animData.matrixAry.length) {
                if (this.completeState == 0) {
                    this._actionTime = 0;
                    this._curentFrame = 0;
                } else if (this.completeState == 1) {
                    this._curentFrame = animData.matrixAry.length - 1;
                } else if (this.completeState == 2) {
                    this._curentFrame = 0;
                    this.completeState = 0;
                    this.changeAction(this.curentAction);
                } else if (this.completeState == 3) {
                }
            }
    
        }
        private  changeAction(curentAction:string ) :void{
            this.curentAction = this._defaultAction;
        }
        private   _getCurentAnimData():AnimData{

            var animData:AnimData   = null;
            if (this._animDic[this.curentAction]) {
                animData =this._animDic[this.curentAction];
            } else if (this._animDic[this._defaultAction]) {
                animData= this._animDic[this._defaultAction]
            }
          
            return animData;
        }
        public updateMaterialMesh(mesh: MeshData): void {
            if (!mesh.material) {
                return;
            }
            if (mesh.material.shader==null ) {
                console.log("没有:");
                return;
            }
            this.shader3D=mesh.material.shader;
            var ctx:Context3D= this.scene3D.context3D;
            ctx.setDepthTest(true);
            ctx.setWriteDepth(true);
            ctx.setProgram(this.shader3D.program);
            this.setVc();
            this.setMaterialTexture(mesh.material,mesh.materialParam);
            this.setMeshVc(mesh);
            this.setVaCompress(mesh);
            ctx.drawCall(mesh.indexBuffer,mesh.treNum);
 
        }
        protected setVc ():void
        {
            var ctx: Context3D = this.scene3D.context3D;
            ctx.setVcMatrix4fv(this.shader3D, "vpMatrix3D", this.scene3D.camera3D.modelMatrix.m);
            ctx.setVcMatrix4fv(this.shader3D, "posMatrix3D", this.posMatrix.m);

           
        }
        public setVaCompress($mesh: MeshData): void {
            var ctx:Context3D= this.scene3D.context3D;
            var tf: boolean = ctx.pushVa($mesh.vertexBuffer);
            if (tf) {
                return;
            }

            ctx.setVaOffset(0, 3, $mesh.stride, 0);
            ctx.setVaOffset(1, 2, $mesh.stride, $mesh.uvsOffsets);
            ctx.setVaOffset(2, 4, $mesh.stride, $mesh.boneIDOffsets);
            ctx.setVaOffset(3, 4, $mesh.stride, $mesh.boneWeightOffsets);
        }
        public setMeshVc($mesh: MeshData): void {
            var ctx:Context3D= this.scene3D.context3D;
            var animData: AnimData
            if (this._animDic[this.curentAction]) {
                animData = this._animDic[this.curentAction];
            } else if (this._animDic[this._defaultAction]) {
                animData = this._animDic[this._defaultAction];
            } else {
                return;
            }
          
           
        
            var $dualQuatFrame: DualQuatFloat32Array = animData.getBoneQPAryByMesh($mesh)[$mesh.uid][this._curentFrame];
 
            if (!$dualQuatFrame) {
                return;
            }
        
            ctx.setVc4fv($mesh.material.shader, "boneQ", $dualQuatFrame.quat); //旋转
            ctx.setVc3fv($mesh.material.shader, "boneD", $dualQuatFrame.pos);  //所有的位移
        }
        protected setMaterialTexture($material: Material, $mp: MaterialBaseParam = null): void {
            //有重复需要优化
            var ctx:Context3D= this.scene3D.context3D;
            var texVec: Array<TexItem> = $material.texList;
            for (var i: number = 0; i < texVec.length; i++) {
                    if (texVec[i].texture) {
                        ctx.setRenderTexture($material.shader, texVec[i].name, texVec[i].texture, texVec[i].id);
                    }
            }
            if ($mp) {
                for (i = 0; i < $mp.dynamicTexList.length; i++) {
 
                    if ($mp.dynamicTexList[i].target) {
                        ctx.setRenderTexture($material.shader, $mp.dynamicTexList[i].target.name,
                            $mp.dynamicTexList[i].texture, $mp.dynamicTexList[i].target.id);
                    }
                }
            }


        }
        public updateBind(): void {
            if (this.bindTarget) {

                this.posMatrix.identity();
                this.posMatrix.appendScale(this.scaleX, this.scaleY, this.scaleZ);

                if (this._isInGroup) {
                    this.posMatrix.append(this.groupMatrix);
                    //posMatrix.prependTranslation(groupPos.x, groupPos.y, groupPos.z);
                    //posMatrix.prependRotation(groupRotation.z, Vector3D.Z_AXIS);
                    //posMatrix.prependRotation(groupRotation.y, Vector3D.Y_AXIS);
                    //posMatrix.prependRotation(groupRotation.x, Vector3D.X_AXIS);
                    //posMatrix.prependScale(groupScale.x, groupScale.y, groupScale.z);
                }

                this.bindTarget.getSocket(this.bindSocket, this.bindMatrix)

                this.posMatrix.append(this.bindMatrix);

                this.bindMatrix.copyTo(this._rotationMatrix);


                this._rotationMatrix.identityPostion();


                if (this._isInGroup) {
                    this._rotationMatrix.prepend(this.groupRotationMatrix);
                    //_rotationMatrix.prependRotation(groupRotation.z, Vector3D.Z_AXIS);
                    //_rotationMatrix.prependRotation(groupRotation.y, Vector3D.Y_AXIS);
                    //_rotationMatrix.prependRotation(groupRotation.x, Vector3D.X_AXIS);
                }

                this.sceneVisible = (<any>this.bindTarget).visible;
            }
        }

    }
}