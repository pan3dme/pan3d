//
//  Display3DModelPartilce.m
//  iosgl
//
//  Created by zhao on 15/4/2020.
//  Copyright © 2020 zhao. All rights reserved.
//

#import "Display3DModelPartilce.h"
#import "Context3D.h"
#import "TextureManager.h"
#import "DynamicTexItem.h"
#import "Scene3D.h"
#import "TextureRes.h"
#import "MaterialManager.h"
#import "ObjData.h"
#import "Scene_data.h"
#import "ParticleModelData.h"

@interface Display3DModelPartilce ()
@property (nonatomic, strong)  TextureRes* testTextureRes;
@property (nonatomic, assign)  BOOL  isTrue;
@end


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
- (void)resetVa;
{
   Context3D *ctx=self.scene3d.context3D;
    [ctx clearVa:0];
    [ctx clearVa:1];
}
 
-(void)updateRotaionMatrix;
{
    Camera3D *cam=self.scene3d.camera3D;
    Display3DModelPartilce* this=self;
    [this.rotationMatrix3D identity];
    if (this.data._watchEye) {
        //        this.timeline.inverAxisRotation(this._rotationMatrix);
        //        this._rotationMatrix.prependRotation(-Scene_data.cam3D.rotationY, Vector3D.Y_AXIS);
        //        this._rotationMatrix.prependRotation(-Scene_data.cam3D.rotationX, Vector3D.X_AXIS);
    }
    if (this.data._isZiZhuan) {
        [this.timeLine applySelfRotation:this.rotationMatrix3D axis:this.data._ziZhuanAngly];
    }
 
     
}
-(ParticleModelData*)facetdata;
{
    return (ParticleModelData*)self.data;
}
@end
