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
#import "DynamicTexItem.h"
#import "MaterialShader.h"
#import "MaterialManager.h"
#import "MaterialShaderType.h"

@interface MtlModelDisplaySprite ()
@property(nonatomic,strong)NSString* materialUrl;
@property(nonatomic,strong)MaterialBaseParam* materialParam;
@property(nonatomic,strong)BuildSceneVo* buildSceneVo;
@property (nonatomic, strong) id<MTLTexture> texture;
@property (nonatomic, strong) MtlModelDisplayShader* mtlModelDisplayShader;

@end

@implementation MtlModelDisplaySprite
- (instancetype)init:(Scene3D*)value
{
    self = [super init:value];
    if (self) {
        [self customInit];
    }
    return self;
}
- (void)customInit {
    self.mtlModelDisplayShader=[[MtlModelDisplayShader alloc] init:self.mtkScene3D];
    [self.mtlModelDisplayShader mtlEncode];
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
    [self.mtkScene3D.objDataManager getObjData:value fun:^(ObjData * obj) {
        
        obj.scene3D=self.mtkScene3D;
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
    
    [self.mtkScene3D.materialManager getMaterialByte:[[Scene_data default]getWorkUrlByFilePath:value ] fun:^(NSObject *obj) {
        this.material=(Material*)obj;
        if (this.material.useNormal) {
        }
        if (paramData) {
            this.materialParam = [[MaterialBaseParam alloc]init:self.mtkScene3D];
            [this.materialParam setData:this.material ary:paramData];
        }
    } info:nil autoReg:YES regName:MaterialShader.shaderStr shader3DCls:[[MaterialShader alloc]init:self.mtkScene3D]];
}



-(void)setMaterialTexture:(Material*)material  mp:(MaterialBaseParam*)mp;
{
    
    if(!material){
        return;
    }
    NSArray<TexItem*>* texVec  = mp.material.texList;
    TexItem* texItem;
    for (int i   = 0; i < texVec.count; i++) {
        texItem=texVec[i];
        if (texItem.isDynamic) {
            continue;
        }
        if (texItem.type == TexItem.LIGHTMAP) {
        }
        else if (texItem.type == TexItem.LTUMAP && [Scene_data default].pubLut ) {
            NSLog(@"TexItem.LTUMAP)");
        }
        else if (texItem.type == TexItem.CUBEMAP) {
            
        }
        else if (texItem.type == 0) {
            
            
        }
    }
    NSArray<DynamicTexItem*>* texDynamicVec  =( NSArray<DynamicTexItem*>*) mp.dynamicTexList;
    for (int i   = 0; i < texDynamicVec.count; i++) {
        texItem=texDynamicVec[i].target;
        if(texItem ){
            if(texItem.isMain){
                id<MTLRenderCommandEncoder> renderEncoder=self.mtkScene3D.context3D.renderEncoder;
                [renderEncoder setFragmentTexture:texDynamicVec[i].textureRes.mtlTexture
                                          atIndex:0];
            }
            
        }
    }
    
}


- (void)setupMatrixWithEncoder:(id<MTLRenderCommandEncoder>)renderEncoder {
    
 
  
    Matrix3D* posMatrix =[[Matrix3D alloc]init];
    [posMatrix appendScale:0.25 y:0.25 z:0.25];
    [posMatrix appendRotation:0 axis:Vector3D.Y_AXIS];

  
    [self setMatrixVc:self.mtkScene3D.camera3D.modelMatrix renderEncoder:renderEncoder idx:2];
    [self setMatrixVc:posMatrix renderEncoder:renderEncoder idx:3];
     
}
-(void)setMatrixVc:(Matrix3D*)m renderEncoder:(id<MTLRenderCommandEncoder>)renderEncoder   idx:(int)idx
{
    matrix_float4x4 viewMatrix = [m getMatrixFloat4x4] ;
    [renderEncoder setVertexBytes:&viewMatrix
                           length:sizeof(matrix_float4x4)
                          atIndex:idx];
}
-(void)updata  {
    if(self.objData==nil){
        return;
    }
    id<MTLRenderCommandEncoder> renderEncoder=self.mtkScene3D.context3D.renderEncoder;
    [self.material.shader mtlSetProgramShader];
    [self setupMatrixWithEncoder:renderEncoder];
    
    [renderEncoder setVertexBuffer: self.objData.mtkvertices
                            offset:0
                           atIndex:0];
    
    [renderEncoder setVertexBuffer: self.objData.mtkuvs
                            offset:0
                           atIndex:1];
    

    
    [self setMaterialTexture:self.material mp:self.materialParam];
    
    [renderEncoder drawIndexedPrimitives:MTLPrimitiveTypeTriangle
                              indexCount: self.objData.mtkindexCount
                               indexType:MTLIndexTypeUInt32
                             indexBuffer: self.objData.mtkindexs
                       indexBufferOffset:0];
}

@end
