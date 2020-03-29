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
    Camera3D *cam=self.scene3d.camera3D;
    Display3DFacetParticle* this=self;
    [this.rotationMatrix3D identity];
    if (this.data._watchEye) {
        if (!this.facetdata._locky && !this.facetdata._lockx) {
            [this inverBind];
        }
        if (!this.facetdata._locky) {
            [this.rotationMatrix3D prependRotation:-cam.rotationY axis:Vector3D.Y_AXIS];
        }
        if (!this.facetdata._lockx) {
            //  this._rotationMatrix.prependRotation(-Scene_data.cam3D.rotationX, Vector3D.X_AXIS);
            [this.rotationMatrix3D prependRotation:-cam.rotationX axis:Vector3D.X_AXIS];
        }
    }
    if (this.data._isZiZhuan) {
        // this.timeline.applySelfRotation(this._rotationMatrix, this.data._ziZhuanAngly);
    }
}
-(ParticleFacetData*)facetdata;
{
    return (ParticleFacetData*)self.data;
}
@end
