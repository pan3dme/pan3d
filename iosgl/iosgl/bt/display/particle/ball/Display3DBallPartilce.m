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

@interface Display3DBallPartilce ()
@property (nonatomic, strong) ObjData* objData ;
@property (nonatomic, strong) Shader3D *shader3d;
@end
@implementation Display3DBallPartilce

-(void)onCreated;
{
    [[ProgrmaManager default] registe:Display3DBallPartilceShader.shaderStr shader3d: [[Display3DBallPartilceShader alloc]init]];
      self.shader3d=  [[ProgrmaManager default] getProgram:Display3DBallPartilceShader.shaderStr];
}
- (void)update;
{
    if(self.shader3d ){
        glUseProgram(self.shader3d.program);
        Context3D *ctx=self.scene3d.context3D;
        
        [ctx setVcMatrix4fv:self.shader3d name:"viewMatrix" data:self.viewMatrix.m];
        [ctx setVcMatrix4fv:self.shader3d name:"posMatrix" data:self.posMatrix3d.m];
        
        [ctx pushVa:self.particleBallGpuData.verticesBuffer];
        [ctx setVaOffset:self.shader3d name:"position" dataWidth:3 stride:0 offset:0];
        
        [ctx pushVa: self.particleBallGpuData.basePosBuffer];
        [ctx setVaOffset:self.shader3d name:"basePos" dataWidth:3 stride:0 offset:0];
 
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
