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
#import "TimeUtil.h"
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
@property (nonatomic, assign) float time;
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

    
        self.textureRes=[[MaterialManager default] getMaterialByUrl:@"tu001.jpg"];
}

-(void)onCreated;
{
  
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
-(void)setGroup:(Vector3D*)pos rotaion:(Vector3D*)rotaion  scale:(Vector3D*)scale;
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
    [this setBaseMaterialVc:this.material];
    [this setMaterialTexture:this.material mp:this.materialParam];
    [this setMaterialVc:this.material mp:this.materialParam];
    [this setMaterialVa];
    [this resetVa];
 
 
}
/*
 基础vc[x]数据
 */
-(void)setBaseMaterialVc:(Material*)material;
{
    Display3DSprite* this=self;
    float t = 0;
    if (material.hasTime) {
        // t = ( [[TimeUtil default]getTimer] - this.time) % 100000 * 0.001;
        t=[[TimeUtil default]getTimer] - this.time;
    }
    if (material.hasTime || material.usePbr || material.useKill) {
        //Scene_data.context3D.setVc4fv($material.shader, "fc0", [1, 0, $material.killNum, t]);//sceneEvnScale,null,killNum,time;
    }
    if (material.scaleLightMap) {
        // Scene_data.context3D.setVcFloat($material.shader, "scalelight", Scene_data.scaleLight);
    }
    if (material.usePbr || material.fogMode == 1) {
        // this.setCamPos($material);
    }
    if (material.fogMode != 0) {
        // Scene_data.context3D.setVc2fv($material.shader, "fogdata", Scene_data.fogData);
        //Scene_data.context3D.setVc3fv($material.shader, "fogcolor", Scene_data.fogColor);
    }
}
-(void)setMaterialVa;
{
    Display3DSprite* this=self;
    Context3D *ctx=this.scene3d.context3D;
    [ctx pushVa:this.objData.verticesBuffer];
    [ctx setVaOffset:this.shader3d name:"v3Position" dataWidth:3 stride:0 offset:0];
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
 /*
 材质vc[x]数据
 */
-(void)setMaterialVc:(Material*)material  mp:(MaterialBaseParam*)mp;
{
    Display3DSprite* this=self;
    Context3D *ctx=self.scene3d.context3D;
    if (material.fcNum <= 0) {
        return;
    }
    float t   = 0;
    if (material.hasTime) {
        t=[[TimeUtil default]getTimer]-this.time;
    }
    [material update:t];
    if (mp) {
        [mp update];
    }
    NSMutableArray<NSNumber*>*   fcData= material.fcData;
    GLfloat fcDataGlArr[fcData.count];
    for (int i=0; i<fcData.count; i++) {
        fcDataGlArr[i]=fcData[i].floatValue;
    }
    fcDataGlArr[0]=0.0;
    fcDataGlArr[1]=1.7677669525146484;
    fcDataGlArr[2]=-1.7677669525146484;
    fcDataGlArr[3]=0.0;
    fcDataGlArr[4]=0.0;
    fcDataGlArr[5]=0.0;
    fcDataGlArr[6]=0.0;
    fcDataGlArr[7]=0.0;
    
    [ctx setVc4fv:material.shader name:"fc" data:fcDataGlArr len:material.fcNum];
    
//    0: 0
//    1: 1.7677669525146484
//    2: -1.7677669525146484
//    3: 0
//    4: 0
//    5: 0
//    6: 0
//    7: 0
    /*
     var t: number = 0;
          if ($material.hasTime) {
              t = (TimeUtil.getTimer() - this.time) % 100000 * 0.001;
          }

          $material.update(t);

          this.setCamPos($material);

          if ($mp) {
              $mp.update();
          }
 
     */
}
 
-(void)setMaterialTexture:(Material*)material  mp:(MaterialBaseParam*)mp;
{
    Context3D *ctx=self.scene3d.context3D;
    NSArray<TexItem*>* texVec  = mp.material.texList;
    TexItem* texItem;
    for (int i   = 0; i < texVec.count; i++) {
        texItem=texVec[i];
        if (texItem.isDynamic) {
            continue;
        }
        if (texItem.type == TexItem.LIGHTMAP) {
            // Scene_data.context3D.setRenderTexture($material.shader, texVec[i].name, this.lightMapTexture, texVec[i].id);
            NSLog(@"TexItem.LIGHTMAP)");
        }
        else if (texItem.type == TexItem.LTUMAP && [Scene_data default].pubLut ) {
            //  Scene_data.context3D.setRenderTexture($material.shader, texVec[i].name, Scene_data.pubLut, texVec[i].id);
             NSLog(@"TexItem.LTUMAP)");
        }
        else if (texItem.type == TexItem.CUBEMAP) {
            if (material.useDynamicIBL) {// && _reflectionTextureVo) {
                NSLog(@"TexItem.useDynamicIBL)");
            } else {
                if([Scene_data default].skyCubeTexture){
                     [ctx setRenderTextureCube:material.shader name:texItem.name texture:[Scene_data default].skyCubeTexture level:texItem.id];
                }
            }
        }else{
            [ctx setRenderTexture:material.shader name:texItem.name texture:  texItem.textureRes.textTureLuint level:texItem.id];
            
        }
    }
    NSArray<DynamicTexItem*>* texDynamicVec  =( NSArray<DynamicTexItem*>*) mp.dynamicTexList;
    for (int i   = 0; i < texDynamicVec.count; i++) {
        texItem=texDynamicVec[i].target;
        if(texItem ){
            [ctx setRenderTexture:material.shader name:texItem.name  texture:texDynamicVec[i].textureRes.textTureLuint level:texItem.id];
            
            
        }
    }
    
}

-(void)setVc;
{
    Display3DSprite* this=self;
    Context3D *context3D=this.scene3d.context3D;
    [context3D setVcMatrix4fv:this.shader3d name:"vpMatrix3D" data:this.viewMatrix.m];
    [context3D setVcMatrix4fv:this.shader3d name:"posMatrix3D" data:this.posMatrix3d.m];
    if (this.material.usePbr || this.material.directLight) {
         [context3D setVcMatrix3fv:this.shader3d name:"rotationMatrix3D" data:this.rotationMatrix3D.rotationM];
    }
}
-(void)setVa;
{
     
    
}
 
@end
