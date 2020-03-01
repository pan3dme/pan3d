//
//  Display3DBallPartilce.m
//  iosgl
//
//  Created by zhao on 25/2/2020.
//  Copyright © 2020 zhao. All rights reserved.
//


#import "Display3DBallPartilce.h"
#import "ObjData.h"
#import "ParticleData.h"
#import "ProgrmaManager.h"
#import "Display3DBallPartilceShader.h"
#import "ParticleBallGpuData.h"
#import "Context3D.h"
#import "ParticleBallData.h"
#import "MaterialManager.h"
#import "TextureRes.h"

@interface Display3DBallPartilce ()
@property (nonatomic, strong) ObjData* objData ;
@property (nonatomic, strong) Shader3D* shader3d;
@property (nonatomic, strong) TextureRes* textureRes;

@property (nonatomic, assign) GLuint  textBsetGLuint;


@end
@implementation Display3DBallPartilce

-(void)onCreated;
{
    [[ProgrmaManager default] registe:Display3DBallPartilceShader.shaderStr shader3d: [[Display3DBallPartilceShader alloc]init]];
      self.shader3d=  [[ProgrmaManager default] getProgram:Display3DBallPartilceShader.shaderStr];
  
     self.textureRes=[[MaterialManager default] getMaterialByUrl:@"tu001.jpg"];
  
}
- (void)update;
{
    if(self.shader3d&&self.textureRes&&self.textureRes.textTureLuint ){
        glUseProgram(self.shader3d.program);
        Context3D *ctx=self.scene3d.context3D;
        
        [ctx setVcMatrix4fv:self.shader3d name:"viewMatrix" data:self.viewMatrix.m];
        [ctx setVcMatrix4fv:self.shader3d name:"posMatrix" data:self.posMatrix3d.m];
        
        [ctx pushVa:self.particleBallGpuData.verticesBuffer];
        [ctx setVaOffset:self.shader3d name:"position" dataWidth:4 stride:0 offset:0];
        [ctx pushVa:self.particleBallGpuData.uvBuffer];
        [ctx setVaOffset:self.shader3d name:"texcoord" dataWidth:3 stride:0 offset:0];
        [ctx pushVa: self.particleBallGpuData.basePosBuffer];
        [ctx setVaOffset:self.shader3d name:"basePos" dataWidth:4 stride:0 offset:0];
        [ctx pushVa: self.particleBallGpuData.speedBuffer];
        [ctx setVaOffset:self.shader3d name:"speed" dataWidth:3 stride:0 offset:0];
        
        [ctx setRenderTexture:self.shader3d name:"colorMap" texture: self.textureRes.textTureLuint];
         
      
        int lznum=self.particleBallData._totalNum;
        [ctx drawCall:self.particleBallGpuData.indexBuffer  numTril:6*lznum ];
    }
    
}
 
-(ParticleBallData*)particleBallData;
{
    return ((ParticleBallData*)(self.data));
}
-(ParticleBallGpuData*)particleBallGpuData;
{
    return self.particleBallData.particleGpuData;
}
@end
