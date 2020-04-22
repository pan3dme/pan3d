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
#import "Material.h"
#import "Scene_data.h"
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
@property(nonatomic,strong)NSString* materialUrl;
@property(nonatomic,strong)Material* material;
@property(nonatomic,strong)MaterialBaseParam* materialParam;
 
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
//    [self registetProgame];
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
//    [[ProgrmaManager default] registe:MaterialShader.shaderStr shader3d: [[MaterialShader alloc]init]];
//    self.shader3d=  [[ProgrmaManager default] getProgram:MaterialShader.shaderStr];
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
    
   
    if (self.dynamic) {
        if (!self.sceneVisible) {
            return;
        }
    }
    
    if(self.material){
         [self updateMaterial];
    }else{
        if(self.shader3d&&self.objData){
              GLuint progame= self.shader3d.program;
              glUseProgram(progame);
              
              [self updateBind];
              [self setVc];
              [self setVa];
              [self resetVa];
          }
    }
 
   
    
 
     
    
}
-(void)updateMaterial;
{
    Display3DSprite* this=self;
    if (!this.material || !this.objData) {
        return;
    }
    [this updateBind];
    this.shader3d=this.material.shader;
    
    
    GLuint progame= self.shader3d.program;
    glUseProgram(progame);
    
    [this updateBind];
    [this setVc];
    [this setMaterialTexture:this.material mp:this.materialParam];
    [this setMaterialVa];
    [this resetVa];
 
 
}
-(void)setMaterialVa;
{
    Display3DSprite* this=self;
    Context3D *ctx=this.scene3d.context3D;
    [ctx pushVa:this.objData.verticesBuffer];
    [ctx setVaOffset:this.shader3d name:"vPosition" dataWidth:3 stride:0 offset:0];
    [ctx pushVa:this.objData.uvBuffer];
    [ctx setVaOffset:this.shader3d name:"v2CubeTexST" dataWidth:2 stride:0 offset:0];
    if (this.material.usePbr || this.material.directLight) {
        [ctx pushVa:this.objData.nrmsBuffer];
        [ctx setVaOffset:this.shader3d name:"v3Normal" dataWidth:4 stride:0 offset:0];
        
    }
     
    [ctx drawCall:self.objData.indexBuffer  numTril:self.objData.trinum ];
}
- (void)resetVa;
{
   Context3D *ctx=self.scene3d.context3D;
    [ctx clearVa:0];
    [ctx clearVa:1];
    [ctx clearVa:2];
}
-(void)setMaterialUrl:(NSString*)value  paramData:(NSArray*)paramData;
{
    Display3DSprite* this=self;
    value= [value stringByReplacingOccurrencesOfString:@"_byte.txt" withString:@".txt"];
    value= [value stringByReplacingOccurrencesOfString:@".txt" withString:@"_byte.txt"];
    this.materialUrl =   value;
    
    [[MaterialManager default]getMaterialByte:[[Scene_data default]getWorkUrlByFilePath:value ] fun:^(NSObject *obj) {
        this.material=(Material*)obj;
        if (this.material.useNormal) {
        }
        if (paramData) {
            this.materialParam = [[MaterialBaseParam alloc]init];
            [this.materialParam setData:this.material ary:paramData];
         }
    } info:nil autoReg:YES regName:MaterialShader.shaderStr shader3DCls:[[MaterialShader alloc]init]];
}
 
-(void)setMaterialTexture:(Material*)material  mp:(MaterialBaseParam*)mp;
{
    Context3D *ctx=self.scene3d.context3D;
    NSArray<TexItem*>* texVec  = mp.material.texList;
    for (int i   = 0; i < texVec.count; i++) {
        if (texVec[i].isDynamic) {
            continue;
        }
        if (texVec[i].type == TexItem.LIGHTMAP) {
            // Scene_data.context3D.setRenderTexture($material.shader, texVec[i].name, this.lightMapTexture, texVec[i].id);
            NSLog(@"TexItem.LIGHTMAP)");
        }
        else if (texVec[i].type == TexItem.LTUMAP && [Scene_data default].pubLut ) {
            //  Scene_data.context3D.setRenderTexture($material.shader, texVec[i].name, Scene_data.pubLut, texVec[i].id);
             NSLog(@"TexItem.LTUMAP)");
        }
        else if (texVec[i].type == TexItem.CUBEMAP) {
            if (material.useDynamicIBL) {// && _reflectionTextureVo) {
                NSLog(@"TexItem.useDynamicIBL)");
            } else {
                if([Scene_data default].skyCubeTexture){
                     [ctx setRenderTextureCube:material.shader name:texVec[i].name texture:[Scene_data default].skyCubeTexture level:0];
                }
            }
        }else{
            [ctx setRenderTexture:material.shader name:texVec[i].name texture:  texVec[i].textureRes.textTureLuint level:0];
        }
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
