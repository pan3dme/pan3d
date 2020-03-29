//
//  Display3DFacetParticle.m
//  iosgl
//
//  Created by zhao on 29/3/2020.
//  Copyright © 2020 zhao. All rights reserved.
//

#import "Display3DFacetParticle.h"
 
#import "Context3D.h"
#import "Scene3D.h"
#import "ObjData.h"
#import "ParticleFacetData.h"
 

@interface Display3DFacetParticle ()
 
@end

 
@implementation Display3DFacetParticle

- (instancetype)init
{
    self = [super init];
    if (self) {
   
         
    }
    return self;
}
- (void)update;
{
 
 
    [super update];
 
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
