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
#import "ParticleMetalType.h"

@interface Display3DModelPartilce ()
@property (nonatomic, strong)  TextureRes* testTextureRes;
@property (nonatomic, assign)  BOOL  isTrue;
@end

@implementation Display3DModelPartilce
- (void)setVc;
{
      [self setViewCamModeMatr3d];
      [self updateRotaionMatrix];
//      Context3D *ctx=self.scene3D.context3D;
//      [ctx setVcMatrix4fv:self.shader3d name:"rotMatrix" data:self.rotationMatrix3D.m];
    Camera3D* cam3D=self.scene3D.camera3D;
    id<MTLRenderCommandEncoder> renderEncoder=self.scene3D.context3D.renderEncoder;
    
    ParticleMetalModelMatrixData matrixList = {[cam3D.viewMatrix getMatrixFloat4x4], [cam3D.camMatrix3D getMatrixFloat4x4], [self.modeMatrix getMatrixFloat4x4], [self.rotationMatrix3D getMatrixFloat4x4]};

 
    
   [renderEncoder setVertexBytes:&matrixList
                          length:sizeof(matrixList)
                         atIndex:2];
}
- (void)setVa;
{
 
    ObjData* temp=self.modeldata.objData;
 
   
    id<MTLRenderCommandEncoder> renderEncoder=self.scene3D.context3D.renderEncoder;
    
    
    [renderEncoder setVertexBuffer: temp.mtkvertices
                            offset:0
                           atIndex:0];
   [renderEncoder setVertexBuffer: temp.mtkuvs
                           offset:0
                          atIndex:1];
    
    
   [renderEncoder drawIndexedPrimitives:MTLPrimitiveTypeTriangle
                             indexCount:temp.mtkindexCount
                              indexType:MTLIndexTypeUInt32
                            indexBuffer:temp.mtkindexs
                      indexBufferOffset:0];
}
- (void)resetVa;
{
   Context3D *ctx=self.scene3D.context3D;
    [ctx clearVa:0];
    [ctx clearVa:1];
}
 
-(void)updateRotaionMatrix;
{
//    Camera3D *cam=self.scene3D.camera3D;
    Display3DModelPartilce* this=self;
    [this.rotationMatrix3D identity];
    if (this.data._watchEye) {
     
    }
    if (this.data._isZiZhuan) {
        NSLog(@"%f    %f     %f",this.data._ziZhuanAngly.x ,this.data._ziZhuanAngly.y,this.data._ziZhuanAngly.z);
         [this.timeLine applySelfRotation:this.rotationMatrix3D axis:this.data._ziZhuanAngly];
    }
 
     
}
-(ParticleModelData*)modeldata;
{
    return (ParticleModelData*)self.data;
}
@end
