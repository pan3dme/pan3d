//
//  MtlModelDisplaySprite.m
//  iosgl
//
//  Created by pan3dme on 2021/1/24.
//  Copyright © 2021 zhao. All rights reserved.
//

#import "MtlModelDisplaySprite.h"
#import "MtlModelDisplayShader.h"
#import "MtlModelDisplayType.h"

@interface MtlModelDisplaySprite ()

 
@property (nonatomic, strong) id<MTLTexture> texture;
@property (nonatomic, strong) MtlModelDisplayShader* rotationShaderA;
  
@end

@implementation MtlModelDisplaySprite
- (instancetype)init:(MtkScene3D*)val
{
    self = [super init];
    if (self) {
        self.mtkScene3D=val;
        [self customInit];
    }
    return self;
}
- (void)customInit {
    self.rotationShaderA=[[MtlModelDisplayShader alloc] init:self.mtkScene3D];
    [self.rotationShaderA encode];
    
    self.objData=[[ObjData alloc] init:self.mtkScene3D];
    [self.objData makeTempObjData];
}

- (void)setupMatrixWithEncoder:(id<MTLRenderCommandEncoder>)renderEncoder {
   
   
   static float y = 0.0 ;
   y+=10;
   Matrix3D* posMatrix =[[Matrix3D alloc]init];
   [posMatrix appendScale:20 y:20 z:20];
   [posMatrix appendRotation:y axis:Vector3D.Y_AXIS];

    
 
    
    ModelMatrixView matrix = {[self.mtkScene3D.camera3D.modelMatrix getMatrixFloat4x4], [posMatrix getMatrixFloat4x4]};
  
   [renderEncoder setVertexBytes:&matrix
                          length:sizeof(matrix)
                         atIndex:1];
}
-(void)updata  {
   
   id<MTLRenderCommandEncoder> renderEncoder=self.mtkScene3D.context3D.renderEncoder;
    
   [self.rotationShaderA setProgramShader];
   
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
