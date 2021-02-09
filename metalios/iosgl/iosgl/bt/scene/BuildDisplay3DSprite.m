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


@implementation BuildDisplay3DLightUvShader
+(NSString*)shaderStr;
{
    return @"BuildDisplay3DLightUvShader";
}

-(NSString *)getVertexShaderString;{
    char* relplayChat =
    "attribute vec3 v3Position;\n"
    "attribute vec2 v2LightUv;\n"
    "uniform mat4 vpMatrix3D;\n"
    "uniform mat4 posMatrix3D;\n"
    "varying vec2 v0;\n"
    "void main()"
    "{"
    "v0= v2LightUv;\n"
    "vec4 vPos = vec4(v3Position.xyz,1.0);\n"
    "gl_Position = vPos * posMatrix3D* vpMatrix3D;\n"
    "}";
    return    [ NSString stringWithFormat:@"%s" ,relplayChat];
    
}
-(NSString *)getFragmentShaderString;{
    char* relplayChat =
    "precision mediump float;\n"
    "uniform sampler2D lighttexture;"
    "varying vec2 v0;\n"
    "void main()"
    "{"
    //"gl_FragColor =vec4(1.0,1.0,1.0,1.0);\n"
    "gl_FragColor =texture2D(lighttexture,v0);\n"
    "}";
    return    [ NSString stringWithFormat:@"%s" ,relplayChat];
}
@end

@interface BuildDisplay3DSprite ()
@property(nonatomic,strong)BuildSceneVo* buildSceneVo;
@property(nonatomic,strong)TextureRes* lightTextureRes;
@property(nonatomic,strong)Shader3D* lightUvShader;
@property(nonatomic,strong)MaterialBaseParam* materialParam;
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
    self.lighturl=self.buildSceneVo.lighturl;
    
    [self setObjUrl:self.buildSceneVo.objsurl];
    [self setMaterialUrl:self.buildSceneVo.materialurl paramData:self.buildSceneVo.materialInfoArr];
    
}

-(void)setLighturl:(NSString*)value;
{
    if(value&&value.length){
        [self.mtkScene3D.textureManager getTexture:[[Scene_data default]getWorkUrlByFilePath:value] fun:^(NSObject * _Nonnull any) {
            self.lightTextureRes=(TextureRes*)any;
        } wrapType:0 info: nil filteType:0 mipmapType:0];
    }
}
- (void)setMaterialVa;
{
    BuildDisplay3DSprite* this=self;
    Context3D *ctx=self.mtkScene3D.context3D;
    if (!(this.material.directLight || this.material.noLight)) {
        [ctx pushVa:this.objData.lightuvsBuffer];
        [ctx setVaOffset:this.shader3d name:"v2lightuv" dataWidth:2 stride:0 offset:0];
    }
    [super setMaterialVa];
    
}
//-(void)setMaterialTexture:(Material*)material  mp:(MaterialBaseParam*)mp;
//{
//    [super setMaterialTexture:material mp:mp];
//    Context3D *ctx=self.mtkScene3D.context3D;
//    NSArray<TexItem*>* texVec  = mp.material.texList;
//    for (int i   = 0; i < texVec.count; i++) {
//        TexItem* texItem=texVec[i];
//        if (texItem.type == TexItem.LIGHTMAP&&self.lightTextureRes) {
//            [ctx setRenderTexture:material.shader name:texItem.name texture:self.lightTextureRes.textTureLuint level:texItem.id];
//        }
//    }
//      
//    
//}
- (void)setupMatrixWithEncoder:(id<MTLRenderCommandEncoder>)renderEncoder {
    
 
  
    Matrix3D* posMatrix =[[Matrix3D alloc]init];
    [posMatrix appendScale:0.25 y:0.25 z:0.25];
    [posMatrix appendRotation:0 axis:Vector3D.Y_AXIS];

  
 
    [self setMatrixVc:self.mtkScene3D.camera3D.modelMatrix renderEncoder:renderEncoder idx:3];
    [self setMatrixVc:posMatrix renderEncoder:renderEncoder idx:4];
     
}
-(void)setMatrixVc:(Matrix3D*)m renderEncoder:(id<MTLRenderCommandEncoder>)renderEncoder   idx:(int)idx
{
    matrix_float4x4 viewMatrix = [m getMatrixFloat4x4] ;
    [renderEncoder setVertexBytes:&viewMatrix
                           length:sizeof(matrix_float4x4)
                          atIndex:idx];
}
-(void)setMaterialUrl:(NSString*)value  paramData:(NSArray*)paramData;
{
    BuildDisplay3DSprite* this=self;
    value= [value stringByReplacingOccurrencesOfString:@"_byte.txt" withString:@".txt"];
    value= [value stringByReplacingOccurrencesOfString:@".txt" withString:@"_byte.txt"];
//    this.materialUrl =   value;
    
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

- (void)upFrame;
{
 
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
    
    [renderEncoder setVertexBuffer: self.objData.mtklightuvs
                            offset:0
                           atIndex:2];
    

    
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
                
                if( self.lightTextureRes){
                    [renderEncoder setFragmentTexture:self.lightTextureRes.mtlTexture
                                              atIndex:1];
                }
            }
            
        }
    }
    
}


-(void)upFrameLightUv;
{
    if(!self.objData){
        return;
    }
    BuildDisplay3DSprite* this=self;
    if(!this.lightUvShader){
        [ self.mtkScene3D.progrmaManager registe:BuildDisplay3DLightUvShader.shaderStr shader3d: [[BuildDisplay3DLightUvShader alloc]init]];
        this.lightUvShader=  [ self.mtkScene3D.progrmaManager getProgram:BuildDisplay3DLightUvShader.shaderStr];
    }else{
        
        this.shader3d= this.lightUvShader;
        Context3D *ctx=this.mtkScene3D.context3D;
        GLuint progame= self.shader3d.program;
        glUseProgram(progame);
        
        [ctx setVcMatrix4fv:this.shader3d name:"vpMatrix3D" data:this.viewMatrix.m];
        [ctx setVcMatrix4fv:this.shader3d name:"posMatrix3D" data:this.posMatrix3d.m];
        [ctx pushVa:self.objData.verticesBuffer];
        [ctx setVaOffset:self.shader3d name:"v3Position" dataWidth:3 stride:0 offset:0];
        [ctx pushVa:self.objData.lightuvsBuffer];
        [ctx setVaOffset:self.shader3d name:"v2LightUv" dataWidth:2 stride:0 offset:0];
        [ctx setRenderTexture:self.shader3d name:@"lighttexture" texture:this.lightTextureRes.textTureLuint  level:0];
        [ctx drawCall:self.objData.indexBuffer  numTril:self.objData.trinum ];
        
        
    }
    
    
}

@end

