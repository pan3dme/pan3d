//
//  BuildDisplay3DSprite.m
//  iosgl
//
//  Created by zhao on 24/4/2020.
//  Copyright © 2020 zhao. All rights reserved.
//

#import "BuildDisplay3DSprite.h"
#import "BuildSceneVo.h"
#import "DynamicTexItem.h"
#import "TextureManager.h"
#import "MaterialManager.h"
#import "ObjDataManager.h"
#import "ProgrmaManager.h"
#import "Context3D.h"
#import "Scene3D.h"
#import "MaterialShader.h"
#import "Scene_data.h"


@interface BuildDisplay3DSprite ()
@property(nonatomic,strong)BuildSceneVo* buildSceneVo;
@property(nonatomic,strong)TextureRes* lightTextureRes;
@property(nonatomic,strong)Shader3D* lightUvShader;
@property(nonatomic,strong)MaterialBaseParam* materialParam;
@property(nonatomic,assign)int  vertexIdxNum;
@end
@implementation BuildDisplay3DSprite
-(void) setInfo:(NSDictionary*)value;
{
    /*
     [0]    (null)    @"id" : (long)1
     [1]    (null)    @"objsurl" : @"content/finalscens/mapscene/copy/ba卦tai/moxing/ljtai_fb_zhongtai_0.xml"
     [2]    (null)    @"rotationY" : (long)0
     [3]    (null)    @"x" : (long)0
     [4]    (null)    @"y" : (long)0
     [5]    (null)    @"rotationZ" : (long)0
     [6]    (null)    @"z" : (long)0
     [7]    (null)    @"type" : (long)1
     [8]    (null)    @"scaleZ" : (long)1
     [9]    (null)    @"materialurl" : @"content/materialinstance/changjinghongpei/standard.txt"
     [10]    (null)    @"scaleY" : (long)1
     [11]    (null)    @"rotationX" : (long)0
     [12]    (null)    @"materialInfoArr" : @"1 element"
     [13]    (null)    @"scaleX" : (long)1
     [14]    (null)    @"isPerspective" : NO
     [15]    (null)    @"lighturl" : @"content/finalscens/mapscene/copy/ba卦tai/ba卦tai_hide/lightuv/build1.jpg"
     
     */
    
    self.vertexIdxNum=0;
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
    
   
    if(self.buildSceneVo.lighturl){
        self.lighturl=self.buildSceneVo.lighturl;
    } 
 
    
    [self setObjUrl:self.buildSceneVo.objsurl];
    [self setMaterialUrl:self.buildSceneVo.materialurl paramData:self.buildSceneVo.materialInfoArr];
    
}

-(void)setLighturl:(NSString*)value;
{
    if(value&&value.length){
        [self.scene3D.textureManager getTexture:[[Scene_data default]getWorkUrlByFilePath:value] fun:^(NSObject * _Nonnull any) {
            self.lightTextureRes=(TextureRes*)any;
        } wrapType:0 info: nil filteType:0 mipmapType:0];
    }
}
- (void)setMaterialVa;
{
    BuildDisplay3DSprite* this=self;
    Context3D *ctx=self.scene3D.context3D;
    if (!(this.material.directLight || this.material.noLight)) {
        [ctx pushVa:this.objData.lightuvsBuffer];
        [ctx setVaOffset:this.shader3d name:"v2lightuv" dataWidth:2 stride:0 offset:0];
    }
    [super setMaterialVa];
    
}
 
- (void)setupMatrixWithEncoder:(id<MTLRenderCommandEncoder>)renderEncoder {
    
 
  
     
   
 
    [self.scene3D.context3D setMatrixVc:self.scene3D.camera3D.modelMatrix renderEncoder:renderEncoder idx:self.vertexIdxNum+0];
    [self.scene3D.context3D setMatrixVc: self.posMatrix3d renderEncoder:renderEncoder idx:self.vertexIdxNum+1];
 
}
 
-(void)setMaterialUrl:(NSString*)value  paramData:(NSArray*)paramData;
{
    BuildDisplay3DSprite* this=self;
    value= [value stringByReplacingOccurrencesOfString:@"_byte.txt" withString:@".txt"];
    value= [value stringByReplacingOccurrencesOfString:@".txt" withString:@"_byte.txt"];
 
    
    [self.scene3D.materialManager getMaterialByte:[[Scene_data default]getWorkUrlByFilePath:value ] fun:^(NSObject *obj) {
        this.material=(Material*)obj;
        if (this.material.useNormal) {
        }
        if (paramData) {
            this.materialParam = [[MaterialBaseParam alloc]init:self.scene3D];
            [this.materialParam setData:this.material ary:paramData];
        }
    } info:nil autoReg:YES regName:MaterialShader.shaderStr shader3DCls:[[MaterialShader alloc]init:self.scene3D]];
}

- (void)upFrame;
{
 
    if(self.objData==nil){
        return;
    }
    id<MTLRenderCommandEncoder> renderEncoder=self.scene3D.context3D.renderEncoder;
    [self.material.shader mtlSetProgramShader];
  
    
    [renderEncoder setVertexBuffer: self.objData.mtkvertices
                            offset:0
                           atIndex:0];
    
    [renderEncoder setVertexBuffer: self.objData.mtkuvs
                            offset:0
                           atIndex:1];
    

    
    if (!(self.material.directLight || self.material.noLight)) {
            [renderEncoder setVertexBuffer: self.objData.mtklightuvs
                                    offset:0
                                   atIndex:2];
        self.vertexIdxNum=3;
    }else{
        self.vertexIdxNum=2;
    }
    [self setupMatrixWithEncoder:renderEncoder];

    
    [self setMaterialTexture:self.material mp:self.materialParam];
    
    [renderEncoder drawIndexedPrimitives:MTLPrimitiveTypeTriangle
                              indexCount: self.objData.mtkindexCount
                               indexType:MTLIndexTypeUInt32
                             indexBuffer: self.objData.mtkindexs
                       indexBufferOffset:0];
}

-(void)setMaterialTexture:(Material*)material  mp:(MaterialBaseParam*)mp;
{
    
    if(!material){
        return;
    }
    id<MTLRenderCommandEncoder> renderEncoder=self.scene3D.context3D.renderEncoder;
    NSArray<TexItem*>* texVec  = mp.material.texList;
    TexItem* texItem;
    for (int i   = 0; i < texVec.count; i++) {
        texItem=texVec[i];
        if (texItem.isDynamic) {
            continue;
        }
        if (texItem.type == TexItem.LIGHTMAP) {
            
            if( self.lightTextureRes){
                [renderEncoder setFragmentTexture:self.lightTextureRes.mtlTexture
                                          atIndex:1];
            }
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
         
                [renderEncoder setFragmentTexture:texDynamicVec[i].textureRes.mtlTexture
                                          atIndex:0];
                
          
            }
            
        }
    }
    
}


-(void)upFrameLightUv;
{
     
    
    
}

@end

