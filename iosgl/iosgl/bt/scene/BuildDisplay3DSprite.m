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
    
 
    NSLog(@"%@", value[@"lighturl"]);
    
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
        [[ TextureManager default]getTexture:[[Scene_data default]getWorkUrlByFilePath:value] fun:^(NSObject * _Nonnull any) {
            self.lightTextureRes=(TextureRes*)any;
        } wrapType:0 info: nil filteType:0 mipmapType:0];
    }
}

- (void)upFrame;
{
    BOOL showLightUv=YES;
    if(showLightUv&&self.lightTextureRes){
        [self upFrameLightUv];
    }else{
        [super upFrame];
    }
}

-(void)upFrameLightUv;
{
    if(!self.objData){
        return;
    }
    BuildDisplay3DSprite* this=self;
    if(!this.lightUvShader){
        [[ProgrmaManager default] registe:BuildDisplay3DLightUvShader.shaderStr shader3d: [[BuildDisplay3DLightUvShader alloc]init]];
        this.lightUvShader=  [[ProgrmaManager default] getProgram:BuildDisplay3DLightUvShader.shaderStr];
    }else{
        NSLog(@"显示灯光贴图");
       
        this.shader3d= this.lightUvShader;
        Context3D *ctx=this.scene3d.context3D;
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
