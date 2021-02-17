//
//  MtkBaseLine.m
//  iosgl
//
//  Created by pan3dme on 2021/1/23.
//  Copyright © 2021 zhao. All rights reserved.
//

#import "MtkBaseDis.h"
 
#import "MtkBaseDisShader.h"
 
 
 
@interface MtkBaseDis ()

 
@property (nonatomic, strong) id<MTLTexture> texture;
@property (nonatomic, strong) MtkBaseDisShader* mtkBaseLineShader;
  
@end

@implementation MtkBaseDis
- (instancetype)init:(Scene3D*)value
{
    self = [super init:value];
    if (self) {
        [self customInit];
    }
    return self;
}
- (void)customInit {
    self.mtkBaseLineShader=[[MtkBaseDisShader alloc] init:self.scene3D];
    [self.mtkBaseLineShader mtlEncode];
    
    self.objData=[[ObjData alloc] init:self.scene3D];
 
    
    [self refrishLineDataToGpu];
  
    
    
}
  
-(void)addLineA2B:(Vector3D*)a b:(Vector3D*)b;
{
 
}
-(void)refrishLineDataToGpu;
{
 
    vector_float3 quarr[3];
        int idxs[3];
       
    
    quarr[0]=(vector_float3){0,0,0} ;
    quarr[1]=(vector_float3){100.0,0,0.0       };
    quarr[2]=(vector_float3){0.0,0.0,100    };
    
    idxs[0]=0;
    idxs[1]=2;
    idxs[2]=1;
   
        
        self.objData.mtkvertices = [self.scene3D.mtkView.device newBufferWithBytes:quarr
                                                     length:sizeof(quarr)
                                                    options:MTLResourceStorageModeShared];
   
        self.objData.mtkindexs = [self.scene3D.mtkView.device newBufferWithBytes:idxs
                                                         length:sizeof(idxs)
                                                        options:MTLResourceStorageModeShared];
        self.objData.mtkindexCount = 3;
        
        self.objData.compressBuffer=YES;
    
  

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
-(void)upFrame  {
    if( !self.objData||!self.objData.compressBuffer){
        return;
    }
   
   id<MTLRenderCommandEncoder> renderEncoder=self.scene3D.context3D.renderEncoder;
    
   [self.mtkBaseLineShader mtlSetProgramShader];
   
   [self setupMatrixWithEncoder:renderEncoder];
   
   [renderEncoder setVertexBuffer: self.objData.mtkvertices
                           offset:0
                          atIndex:0];
   
   [renderEncoder setFragmentTexture:self.texture
                             atIndex:0];
   
   [renderEncoder drawIndexedPrimitives:MTLPrimitiveTypeTriangle
                             indexCount: self.objData.mtkindexCount
                              indexType:MTLIndexTypeUInt32
                            indexBuffer: self.objData.mtkindexs
                      indexBufferOffset:0];
}

@end
