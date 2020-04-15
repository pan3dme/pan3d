//
//  Display3DModelPartilce.m
//  iosgl
//
//  Created by zhao on 15/4/2020.
//  Copyright © 2020 zhao. All rights reserved.
//

#import "Display3DModelPartilce.h"
#import "Context3D.h"
#import "Scene3D.h"
#import "ObjData.h"
#import "ParticleModelData.h"

@implementation Display3DModelPartilce

- (void)update;
{
    [super update];
}
 
- (void)setVc;
{
      [self setViewCamModeMatr3d];
      [self updateRotaionMatrix];
      Context3D *ctx=self.scene3d.context3D;
      [ctx setVcMatrix4fv:self.shader3d name:"rotMatrix" data:self.rotationMatrix3D.m];
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
 
    Display3DModelPartilce* this=self;
    [this.rotationMatrix3D identity];
   
}
-(ParticleModelData*)facetdata;
{
    return (ParticleModelData*)self.data;
}
@end
