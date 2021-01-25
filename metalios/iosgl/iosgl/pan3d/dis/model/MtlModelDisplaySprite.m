//
//  MtlModelDisplaySprite.m
//  iosgl
//
//  Created by pan3dme on 2021/1/24.
//  Copyright © 2021 zhao. All rights reserved.
//

#import "MtlModelDisplaySprite.h"
#import "MtlModelDisplayShader.h"
#import "MtlModelDisplayType.h"
#import "ObjData.h"
#import "Scene_data.h"
#import "Material.h"
#import "BuildSceneVo.h"
#import "LoadManager.h"
#import "ObjDataManager.h"
#import "MaterialBaseParam.h"
#import "MaterialShader.h"
#import "MaterialManager.h"

@interface MtlModelDisplaySprite ()
@property(nonatomic,strong)NSString* materialUrl;
@property(nonatomic,strong)MaterialBaseParam* materialParam;
@property(nonatomic,strong)BuildSceneVo* buildSceneVo;
@property (nonatomic, strong) id<MTLTexture> texture;
@property (nonatomic, strong) MtlModelDisplayShader* rotationShaderA;
  
@end

@implementation MtlModelDisplaySprite
- (instancetype)init:(MtkScene3D*)val
{
    self = [super init];
    if (self) {
        self.mtkScene3D=val;
        [self customInit];
    }
    return self;
}
- (void)customInit {
    self.rotationShaderA=[[MtlModelDisplayShader alloc] init:self.mtkScene3D];
    [self.rotationShaderA encode];
    
 
 
}
-(void) setInfo:(NSDictionary*)value;
{
    self.buildSceneVo=[[BuildSceneVo alloc]init];
    [self.buildSceneVo preshValue:value];
    self.x=self.buildSceneVo.x;
    self.y=self.buildSceneVo.y;
    self.z=self.buildSceneVo.z;
    self.scaleX=self.buildSceneVo.scaleX;
    self.scaleY=self.buildSceneVo.scaleY;
    self.scaleZ=self.buildSceneVo.scaleZ;
    self.rotationX=self.buildSceneVo.rotationX;
    self.rotationY=self.buildSceneVo.rotationY;
    self.rotationZ=self.buildSceneVo.rotationZ;
 
    
    [self setObjUrl:self.buildSceneVo.objsurl];
    [self setMaterialUrl:self.buildSceneVo.materialurl paramData:self.buildSceneVo.materialInfoArr];

}
 
-(void)setObjUrl:(NSString*)value;
{
  
    [[ObjDataManager default]getObjData:value fun:^(ObjData * obj) {
         
        obj.mtkScene3D=self.mtkScene3D;
        [obj changeObjDataToMtkGpu];
        self.objData=obj;
        
        
    }];
}
-(void)setMaterialUrl:(NSString*)value  paramData:(NSArray*)paramData;
{
    MtlModelDisplaySprite* this=self;
    value= [value stringByReplacingOccurrencesOfString:@"_byte.txt" withString:@".txt"];
    value= [value stringByReplacingOccurrencesOfString:@".txt" withString:@"_byte.txt"];
    this.materialUrl =   value;
    
    [[MaterialManager default]getMaterialByte:[[Scene_data default]getWorkUrlByFilePath:value ] fun:^(NSObject *obj) {
        this.material=(Material*)obj;
        if (this.material.useNormal) {
        }
        if (paramData) {
            [this getMaterialMaiinTexture:this.material ary:paramData];
            
         }
    } info:nil autoReg:YES regName:MaterialShader.shaderStr shader3DCls:[[MaterialShader alloc]init]];
    

}
-(void)getMaterialMaiinTexture:(Material*)material ary:(NSArray<NSDictionary*>*)ary;
{
  
    
    NSMutableArray<TexItem*>* texList  = material.texList;
    
    for (int i = 0; i < ary.count; i++) {
        
        NSDictionary* obj = ary[i];
        int obj_type=[obj[@"type"]intValue];
        NSString* obj_name=(NSString*)obj[@"name"] ;
        if (obj_type == 0) {
            DynamicBaseTexItem* texItem   = [[DynamicBaseTexItem alloc]init];
            texItem.paramName = obj_name;
            for (int j = 0; j < texList.count; j++) {
                if (texItem.paramName == texList[j].paramName) {
                    texItem.target = texList[j];
                    break;
                }
            }
            if(texItem.target.isMain){
                [self loadNetImage:[[Scene_data default]getWorkUrlByFilePath:obj[@"url"]]];
            }
      
        }
    }
    
}
-(void)loadNetImage:(NSString*)url
{
    if ([ TextureManager default] .resDic[url]) {
        UIImage* img=[ TextureManager default] .resDic[url];
        [TextureManager default].mtkScene3D=self.mtkScene3D;
        self.texture=  [[TextureManager default]getBaseMitTexture:img];
    }
}
 
 

- (void)setupMatrixWithEncoder:(id<MTLRenderCommandEncoder>)renderEncoder {
   
   
   static float y = 0.0 ;
   y+=0.1;
   Matrix3D* posMatrix =[[Matrix3D alloc]init];
   [posMatrix appendScale:0.25 y:0.25 z:0.25];
   [posMatrix appendRotation:y axis:Vector3D.Y_AXIS];
 
    
    ModelMatrixView matrix = {[self.mtkScene3D.camera3D.modelMatrix getMatrixFloat4x4], [posMatrix getMatrixFloat4x4]};
  
   [renderEncoder setVertexBytes:&matrix
                          length:sizeof(matrix)
                         atIndex:1];
}
-(void)updata  {
    if(self.objData==nil){
        return;
    }
   
   id<MTLRenderCommandEncoder> renderEncoder=self.mtkScene3D.context3D.renderEncoder;
    
   [self.rotationShaderA setProgramShader];
   
   [self setupMatrixWithEncoder:renderEncoder];
   
   [renderEncoder setVertexBuffer: self.objData.mtkvertices
                           offset:0
                          atIndex:0];
   
   [renderEncoder setFragmentTexture:self.texture
                             atIndex:0];
   
   [renderEncoder drawIndexedPrimitives:MTLPrimitiveTypeTriangle
                             indexCount: self.objData.mtkindexCount
                              indexType:MTLIndexTypeUInt32
                            indexBuffer: self.objData.mtkindexs
                      indexBufferOffset:0];
}

@end
