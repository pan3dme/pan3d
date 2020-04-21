//
//  Display3DSprite.m
//  iosgl
//
//  Created by zhao on 7/12/2019.
//  Copyright © 2019 zhao. All rights reserved.
//

#import "Display3DSprite.h"
#import "MaterialManager.h"
#import "ObjDataManager.h"
#import "MetalMatrixUtilities.h"
#import "Scene3D.h"
#import "MaterialShader.h"
#import "GL_Header.h"
#import "DynamicTexItem.h"
#import "Display3DShader.h"
#import "ProgrmaManager.h"
#import "ObjDataManager.h"


@interface Display3DSprite()
@property (nonatomic, strong) Matrix3D *bindMatrix;
@property (nonatomic, strong) id<IBind> bindTarget;
@property (nonatomic, strong) NSString *bindSocket;
@property (nonatomic, strong) Matrix3D *groupMatrix;
@property (nonatomic, strong) Matrix3D *groupRotationMatrix;
 
@property (nonatomic, assign) BOOL isInGroup;



@end
@implementation Display3DSprite

- (instancetype)init
{
    self = [super init];
    if (self) {
        [self initData];
    }
    return self;
}
-(void)initData;
{
    [self onCreated];
    [self registetProgame];
}

-(void)onCreated;
{
  
}
-(void)setObjUrl:(NSString*)value;
{
    [[ObjDataManager default]getObjData:value fun:^(ObjData * obj) {
     self.objData=obj;
        [self.objData upToGpu];
 
    }];
}
-(void)setBind:(id<IBind>)bindTarget bindSocket:(NSString*)bindSocket;
{
    self.bindTarget = bindTarget;
    self.bindSocket = bindSocket;
    self.bindMatrix = [[Matrix3D alloc]init];
}
-(void)updateBind;
{
    Display3DSprite* this=self;
    if (this.bindTarget) {
        
        [this.posMatrix3d identity];
        [this.posMatrix3d  appendScale:this.scaleX y:this.scaleX z:this.scaleX];
        if (this.isInGroup) {
            [this.posMatrix3d append:self.groupMatrix];
        }
        [this.bindTarget getSocket:this.bindSocket resultMatrix:this.bindMatrix];
        [this.posMatrix3d append:this.bindMatrix];
        [this.posMatrix3d copyTo:this.rotationMatrix3D];
        [this.rotationMatrix3D identityPostion ];
        if (this.isInGroup) {
            [this.rotationMatrix3D prepend:self.groupRotationMatrix];
            
        }
        
    }
}
  
-(void)setGroup:(Vector3D*)pos rotaion:(Vector3D*)rotaion  scale:(Vector3D*)scale;
{
    
}
 
-(void)registetProgame;
{
    [[ProgrmaManager default] registe:MaterialShader.shaderStr shader3d: [[MaterialShader alloc]init]];
    self.shader3d=  [[ProgrmaManager default] getProgram:MaterialShader.shaderStr];
}
-(void)loadObjDataByUrl:(NSString*)url
{
    [[ ObjDataManager default] getObjDataByUrl: url Block:^(ObjData *objData) {
      //  self.objData=objData;
      //  [self.objData upToGpu];
    }];
}

-(void)loadTextureResByUrl:(NSString*)value;
{
    self.textureRes=[[MaterialManager default] getMaterialByUrl:value];
}
-(void)upFrame{
    
    if(self.shader3d&&self.objData){
        GLuint progame= self.shader3d.program;
        glUseProgram(progame);
    
        [self updateBind];
        [self setVc];
        [self setVa];
        [self resetVa];
    }
}
- (void)resetVa;
{
   Context3D *ctx=self.scene3d.context3D;
    [ctx clearVa:0];
    [ctx clearVa:1];
}
-(void)setMaterialUrl:(NSString*)value  paramData:(NSArray*)paramData;
{
    
}
/*
 public setMaterialUrl(value: string, $paramData: Array<any> = null): void {


     value = value.replace("_byte.txt", ".txt")
     value = value.replace(".txt", "_byte.txt")

     this.materialUrl = Scene_data.fileRoot + value;
  
     MaterialManager.getInstance().getMaterialByte(this.materialUrl, ($material: Material) => {
         this.material = $material;
         if (this.material.useNormal) {
             if (this.objData && !this.objData.tangentBuffer) {
                 ObjDataManager.getInstance().creatTBNBuffer(this.objData);
             }
         }
         if (this.material.usePbr || this.material.directLight) {
             this._rotationData = new Float32Array(9);
             this.updateRotationMatrix();
         }

         if ($paramData) {
             this.materialParam = new MaterialBaseParam();
             this.materialParam.setData(this.material, $paramData);
         }

     }, null, true, MaterialShader.MATERIAL_SHADER, MaterialShader);
 }
 */
-(void)setMaterialTexture:(Material*)material  mp:(MaterialBaseParam*)mp;
{
    Context3D *ctx=self.scene3d.context3D;
    NSArray<TexItem*>* texVec  = mp.material.texList;
    for (int i   = 0; i < texVec.count; i++) {
        if (texVec[i].isDynamic) {
            continue;
        }
        [ctx setRenderTexture:material.shader name:texVec[i].name texture:  texVec[i].textureRes.textTureLuint level:0];
    }
    
    NSArray<DynamicTexItem*>* texDynamicVec  =( NSArray<DynamicTexItem*>*) mp.dynamicTexList;
    for (int i   = 0; i < texDynamicVec.count; i++) {
        TexItem* texItem=texDynamicVec[i].target;
        if(texItem ){
            [ctx setRenderTexture:material.shader name:texItem.name  texture:texDynamicVec[i].textureRes.textTureLuint level:texItem.id];
        }
    }
    
}

-(void)setVc;
{
    Context3D *context3D=self.scene3d.context3D;
    [context3D setVcMatrix4fv:self.shader3d name:"viewMatrix" data:self.viewMatrix.m];
    [context3D setVcMatrix4fv:self.shader3d name:"posMatrix" data:self.posMatrix3d.m];
}
-(void)setVa;
{
    
    Context3D *ctx=self.scene3d.context3D;
    [ctx pushVa:self.objData.verticesBuffer];
    [ctx setVaOffset:self.shader3d name:"vPosition" dataWidth:3 stride:0 offset:0];
    [ctx pushVa:self.objData.uvBuffer];
    [ctx setVaOffset:self.shader3d name:"texcoord" dataWidth:2 stride:0 offset:0];
    
    [ctx drawCall:self.objData.indexBuffer  numTril:self.objData.trinum ];
    
}
 
@end
