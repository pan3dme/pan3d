//
//  Display3DLocusPartilce.m
//  iosgl
//
//  Created by zhao on 25/3/2020.
//  Copyright © 2020 zhao. All rights reserved.
//

#import "Display3DLocusPartilce.h"
#import "ParticleLocusData.h"
#import "Display3DLocusShader.h"
#import "Context3D.h"
#import "Scene3D.h"
#import "ProgrmaManager.h"
#import "Display3DSprite.h"
@interface Display3DLocusPartilce ()

@property (nonatomic, strong) Shader3D* shader3d;
@property (nonatomic, strong) Display3DSprite* display3DSprite;

@end
@implementation Display3DLocusPartilce


-(ParticleLocusData*)locusdata;
{
    return (ParticleLocusData*)self.data;
}
-(ObjData*)particleGpuObjData;
{
    return self.locusdata.objData;
}
- (instancetype)init
{
    self = [super init];
    if (self) {
        [[ProgrmaManager default] registe:Display3DLocusShader.shaderStr shader3d: [[Display3DLocusShader alloc]init]];
        self.shader3d=  [[ProgrmaManager default] getProgram:Display3DLocusShader.shaderStr];
        
        self.display3DSprite=[[Display3DSprite  alloc]init];
        
    }
    return self;
}
- (void)update;
{
   
    if(self.visible ){
        if ( self.data.materialParam){
 
             glUseProgram( self.shader3d.program);
        //    [ctx setBlendParticleFactors:self.data._alphaMode];
         //   [ctx cullFaceBack:self.data.materialParam.material.backCull];
            [self updateMatrix];
        
            self.scaleX=1.1;
            self.scaleY=1.1;
            self.scaleZ=1.1;
        
            [self setVc];
            [self setVa];
            [self resetVa];
            
         //   self.display3DSprite.scene3d=self.scene3d;
           // [self.display3DSprite upFrame];
        }
        
    }
}
- (void)setVc;
{
    Context3D *ctx=self.scene3d.context3D;
    Camera3D* cam3D=self.scene3d.camera3D;
    [ctx setVcMatrix4fv:self.shader3d name:"viewMatrix" data:cam3D.viewMatrix.m];
    [ctx setVcMatrix4fv:self.shader3d name:"camMatrix" data:cam3D.camMatrix3D.m];
    [ctx setVcMatrix4fv:self.shader3d name:"modeMatrix" data:self.modeMatrix.m];
}
- (void)setVa;
{
    Context3D *ctx=self.scene3d.context3D;
 
    //ObjData* temp=self.display3DSprite.objData;
   ObjData*  temp=self.locusdata.objData;
    [ctx pushVa: temp.verticesBuffer];
    [ctx setVaOffset:self.shader3d name:"vPosition" dataWidth:3 stride:0 offset:0];
     [ctx drawCall:temp.indexBuffer  numTril:temp.trinum];
  
    //      [ctx pushVa:self.particleGpuObjData.uvBuffer];
    //      [ctx setVaOffset:self.shader3d name:"texcoord" dataWidth:3 stride:0 offset:0];
    //      [ctx pushVa: self.particleGpuObjData.nrmsBuffer];
    //      [ctx setVaOffset:self.shader3d name:"basePos" dataWidth:4 stride:0 offset:0];
    
 
    
    //NSLog(@"->%d",temp.trinum);
}
- (void)resetVa;
{
    
}
@end
