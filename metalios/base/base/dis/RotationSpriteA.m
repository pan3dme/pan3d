//
//  RotationSpriteA.m
//  BankBRDF
//
//  Created by pan3dme on 2021/1/16.
//  Copyright © 2021 Xinhou Jiang. All rights reserved.
//

#import "RotationSpriteA.h"
#import "ShaderTypes.h"
#import "Matrix3D.h"
#import "TextureManager.h"
#import "RotationShaderA.h"
@import MetalKit;
@import GLKit;


@interface RotationSpriteA ()

 
@property (nonatomic, strong) id<MTLTexture> texture;
@property (nonatomic, strong) RotationShaderA* rotationShaderA;
  
@end
@implementation RotationSpriteA

- (instancetype)init:(Scene3D *)value
{
    self = [super init:value];
    if (self) {
        [self customInit];
    }
    return self;
}

- (void)customInit {
   
    self.rotationShaderA=[[RotationShaderA alloc] init:self.scene3D];
    [self.rotationShaderA encode];
    self.objData=[[ObjData alloc] init:self.scene3D];
    [self.objData makeTempObjData];
    self.texture=[self.scene3D.textureManager setupTexture  ];
}
 
- (void)setupMatrixWithEncoder:(id<MTLRenderCommandEncoder>)renderEncoder {
    
    
    static float y = 0.0 ;
    y+=10;
    Matrix3D* posMatrix =[[Matrix3D alloc]init];
    [posMatrix appendScale:20 y:20 z:20];
    [posMatrix appendRotation:y axis:Vector3D.Y_AXIS];
 
    LYMatrix matrix = {[self.scene3D.camera3D.modelMatrix getMatrixFloat4x4], [posMatrix getMatrixFloat4x4]};
   
    [renderEncoder setVertexBytes:&matrix
                           length:sizeof(matrix)
                          atIndex:LYVertexInputIndexMatrix];
}
-(void)updata  {
    
    id<MTLRenderCommandEncoder> renderEncoder=self.scene3D.context3D.renderEncoder;
     
    [self.rotationShaderA setProgramShader];
    
    [self setupMatrixWithEncoder:renderEncoder];
    
    [renderEncoder setVertexBuffer: self.objData.vertices
                            offset:0
                           atIndex:LYVertexInputIndexVertices];
    
    [renderEncoder setFragmentTexture:self.texture
                              atIndex:LYFragmentInputIndexTexture];
    
    [renderEncoder drawIndexedPrimitives:MTLPrimitiveTypeTriangle
                              indexCount: self.objData.indexCount
                               indexType:MTLIndexTypeUInt32
                             indexBuffer: self.objData.indexs
                       indexBufferOffset:0];
}
@end

