//
//  Display3DFacetParticle.m
//  iosgl
//
//  Created by zhao on 29/3/2020.
//  Copyright © 2020 zhao. All rights reserved.
//

#import "Display3DFacetParticle.h"
#import "ProgrmaManager.h"
#import "Context3D.h"
#import "Scene3D.h"
#import "ObjData.h"
#import "ParticleFacetData.h"
#import "DisplayBaseTriSprite.h"
#import "Display3DFacetShader.h"

@interface Display3DFacetParticle ()
 
@end

 
@implementation Display3DFacetParticle

- (instancetype)init
{
    self = [super init];
    if (self) {
        [[ProgrmaManager default] registe:Display3DFacetShader.shaderStr shader3d: [[Display3DFacetShader alloc]init]];
        self.shader3d=  [[ProgrmaManager default] getProgram:Display3DFacetShader.shaderStr];
         
    }
    return self;
}
- (void)update;
{
 
       if(self.shader3d&&self.facetdata.objData){
       
               Context3D *ctx=self.scene3d.context3D;
                glUseProgram(self.shader3d.program);
                [ctx setBlendParticleFactors:self.data._alphaMode];
                [ctx cullFaceBack:self.data.materialParam.material.backCull];
                [self updateMatrix];
                [self setMaterialTexture];
                [self setVc];
                [self setVa];
                [self resetVa];
    
       }
 
 
}
- (void)setVc;
{
      [self setViewCamModeMatr3d];
}
- (void)setVa;
{
    Context3D *ctx=self.scene3d.context3D;
    ObjData* temp=self.facetdata.objData;
    
  
    [ctx pushVa: temp.verticesBuffer];
          [ctx setVaOffset:self.shader3d name:"v3Position" dataWidth:3 stride:0 offset:0];
          [ctx pushVa: temp.uvBuffer];
          [ctx setVaOffset:self.shader3d name:"v2TexCoord" dataWidth:2 stride:0 offset:0];
          [ctx drawCall:temp.indexBuffer  numTril:temp.trinum ];
    
}
-(void)updateRotaionMatrix;
{
    
}
-(ParticleFacetData*)facetdata;
{
    return (ParticleFacetData*)self.data;
}
@end
