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
#import "MtkBaseDis.h"
#import "Display3DFacetShader.h"
 

@interface Display3DFacetParticle ()
@property (nonatomic, strong)  Vector2D*   uvMove;
@property (nonatomic,strong) MtkBaseDis* mtkBaseLine;
//@property (nonatomic,strong) Display3DFacetShader* mtkBaseLineShader;
@end

 
@implementation Display3DFacetParticle

- (instancetype)init:value
{
    self = [super init:value];
    if (self) {
        self.uvMove=[[Vector2D alloc] init];
        self.mtkBaseLine=[[MtkBaseDis alloc] init:self.scene3D];
        
//        self.mtkBaseLineShader=[[Display3DFacetShader alloc] init:self.scene3D];
//        [self.mtkBaseLineShader mtlEncode];
    }
    return self;
}
 
- (void)update;
{
 
    [super update];
  
 
    
    
    
}
-(void)upFrameCopy  {
    if( !self.mtkBaseLine.objData||!self.mtkBaseLine.objData.compressBuffer){
        return;
    }
   
   id<MTLRenderCommandEncoder> renderEncoder=self.scene3D.context3D.renderEncoder;
    
   [self.shader3d mtlSetProgramShader];
   
   [self setupMatrixWithEncoder:renderEncoder];
   
   [renderEncoder setVertexBuffer: self.mtkBaseLine.objData.mtkvertices
                           offset:0
                          atIndex:0];
   
 
   
   [renderEncoder drawIndexedPrimitives:MTLPrimitiveTypeTriangle
                             indexCount: self.mtkBaseLine.objData.mtkindexCount
                              indexType:MTLIndexTypeUInt32
                            indexBuffer: self.mtkBaseLine.objData.mtkindexs
                      indexBufferOffset:0];
}
- (void)setupMatrixWithEncoder:(id<MTLRenderCommandEncoder>)renderEncoder {
   
   
   static float y = 0.0 ;
    y-=0.05;
   Matrix3D* posMatrix =[[Matrix3D alloc]init];
   [posMatrix appendScale:1 y:1 z:1];
   [posMatrix appendRotation:y axis:Vector3D.Y_AXIS];
  
    
    [self.scene3D.context3D setMatrixVc:self.scene3D.camera3D.modelMatrix renderEncoder:renderEncoder idx:1];
    [self.scene3D.context3D setMatrixVc:posMatrix renderEncoder:renderEncoder idx:2];
    
  
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
    /*
    Context3D *ctx=self.scene3D.context3D;
    ObjData* temp=self.facetdata.objData;
    [ctx pushVa: temp.verticesBuffer];
    [ctx setVaOffset:self.shader3d name:"v3Position" dataWidth:3 stride:0 offset:0];
    [ctx pushVa: temp.uvBuffer];
    [ctx setVaOffset:self.shader3d name:"v2TexCoord" dataWidth:2 stride:0 offset:0];
    [ctx drawCall:temp.indexBuffer  numTril:temp.trinum ];
    
    */
    
    if( !self.mtkBaseLine.objData||!self.mtkBaseLine.objData.compressBuffer){
        return;
    }
   
   id<MTLRenderCommandEncoder> renderEncoder=self.scene3D.context3D.renderEncoder;
    
   [self.shader3d mtlSetProgramShader];
   
   [self setupMatrixWithEncoder:renderEncoder];
   
   [renderEncoder setVertexBuffer: self.mtkBaseLine.objData.mtkvertices
                           offset:0
                          atIndex:0];
   
 
   
   [renderEncoder drawIndexedPrimitives:MTLPrimitiveTypeTriangle
                             indexCount: self.mtkBaseLine.objData.mtkindexCount
                              indexType:MTLIndexTypeUInt32
                            indexBuffer: self.mtkBaseLine.objData.mtkindexs
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
