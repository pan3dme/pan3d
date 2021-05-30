//
//  Display3DFacetParticle.m
//  iosgl
//
//  Created by zhao on 29/3/2020.
//  Copyright © 2020 zhao. All rights reserved.
//

#import "Display3DFacetParticle.h"
#import "Scene_data.h"
#import "Context3D.h"
#import "Scene3D.h"
#import "ObjData.h"
#import "Vector2D.h"
#import "ParticleFacetData.h"
#import "Display3DFacetShader.h"
#import "ParticleMetalType.h"
 

@interface Display3DFacetParticle ()
@property (nonatomic, strong)  Vector2D*   uvMove;
//@property (nonatomic,strong) MtkBaseDis* mtkBaseLine;
//@property (nonatomic,strong) Display3DFacetShader* mtkBaseLineShader;
@end

 
@implementation Display3DFacetParticle

- (instancetype)init:value
{
    self = [super init:value];
    if (self) {
        self.uvMove=[[Vector2D alloc] init];
 
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
      [self updateUV];
    
    
    /*
      Context3D *ctx=self.scene3D.context3D;
      [ctx setVcMatrix4fv:self.shader3d name:"rotMatrix" data:self.rotationMatrix3D.m];
      [ctx setVcUniform2f:self.shader3d name:"uvMove" x:self.uvMove.x y:self.uvMove.y];
    */
    id<MTLRenderCommandEncoder> renderEncoder=self.scene3D.context3D.renderEncoder;
   
    
    ParticleBaseFloat2v uvMoveVc = { (vector_float2){self.uvMove.x,self.uvMove.y }  };
   [renderEncoder setVertexBytes:&uvMoveVc
                          length:sizeof(uvMoveVc)
                         atIndex: 3];
    
    NSLog(@"%f----%f",self.uvMove.x,self.uvMove.y);
}
-(void)updateUV;
{
  
    Display3DFacetParticle* this=self;
    int currentFrame=(int)(this._time/[Scene_data default].frameTime );
    currentFrame = currentFrame > this.facetdata._maxAnimTime ? this.facetdata._maxAnimTime : currentFrame;
    currentFrame=  (int)( currentFrame /this.data._animInterval)%(int)(this.data._animLine * this.data._animRow);
    self.uvMove.x=( (currentFrame % (int)this.data._animLine)/this.data._animLine)+(this._time / [Scene_data default].frameTime* this.data._uSpeed);
    self.uvMove.y=(int)(currentFrame / this.data._animLine)/this.data._animRow+this._time / [Scene_data default].frameTime* this.data._vSpeed;
 
  
}
- (void)setVa;
{
  
   
   id<MTLRenderCommandEncoder> renderEncoder=self.scene3D.context3D.renderEncoder;
   
   
    [renderEncoder setVertexBuffer: self.facetdata.objData.mtkvertices
                            offset:0
                           atIndex:0];
    [renderEncoder setVertexBuffer: self.facetdata.objData.mtkuvs
                            offset:0
                           atIndex:1];
    
    
 
    
   [renderEncoder drawIndexedPrimitives:MTLPrimitiveTypeTriangle
                             indexCount: self.facetdata.objData.mtkindexCount
                              indexType:MTLIndexTypeUInt32
                            indexBuffer: self.facetdata.objData.mtkindexs
                      indexBufferOffset:0];
    
}
- (void)resetVa;
{
    Context3D *ctx=self.scene3D.context3D;
    [ctx clearVa:0];
    [ctx clearVa:1];
 
}
-(void)setViewCamModeMatr3d;
{
 
    Camera3D* cam3D=self.scene3D.camera3D;
    
 
    id<MTLRenderCommandEncoder> renderEncoder=self.scene3D.context3D.renderEncoder;
    
    ParticleMetalMatrixData matrixList = {[cam3D.viewMatrix getMatrixFloat4x4], [cam3D.camMatrix3D getMatrixFloat4x4], [self.modeMatrix getMatrixFloat4x4], [self.rotationMatrix3D getMatrixFloat4x4]};

 
    
   [renderEncoder setVertexBytes:&matrixList
                          length:sizeof(matrixList)
                         atIndex:2];
    

}
-(void)updateRotaionMatrix;
{
    Camera3D *cam=self.scene3D.camera3D;
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
