//
//  MtkBaseLine.m
//  iosgl
//
//  Created by pan3dme on 2021/1/23.
//  Copyright © 2021 zhao. All rights reserved.
//

#import "MtkBaseLine.h"
#import "RotationShaderA.h"
#import "RotationSahder.h"
#import "../../metail/LYShaderTypes.h"

@interface MtkBaseLine ()

 
@property (nonatomic, strong) id<MTLTexture> texture;
@property (nonatomic, strong) RotationShaderA* rotationShaderA;
  
@end

@implementation MtkBaseLine
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
    self.rotationShaderA=[[RotationShaderA alloc] init:self.mtkScene3D];
    [self.rotationShaderA encode];
    
    self.objData=[[ObjData alloc] init:self.mtkScene3D];
    [self makeLineObjData];
}
-(void)makeLineObjData
{
    static const LYVertex quadVertices[] =
    {  // 顶点坐标                          顶点颜色                    纹理坐标
        {{-0.5f, 0.5f, 0.0f, 1.0f},      {0.0f, 0.0f, 0.5f},       {0.0f, 1.0f}},//左上
        {{0.5f, 0.5f, 0.0f, 1.0f},       {0.0f, 0.5f, 0.0f},       {1.0f, 1.0f}},//右上
        {{-0.5f, -0.5f, 0.0f, 1.0f},     {0.5f, 0.0f, 1.0f},       {0.0f, 0.0f}},//左下
        {{0.5f, -0.5f, 0.0f, 1.0f},      {0.0f, 0.0f, 0.5f},       {1.0f, 0.0f}},//右下
        {{0.0f, 0.0f, 1.0f, 1.0f},       {1.0f, 1.0f, 1.0f},       {0.5f, 0.5f}},//顶点
    };
    self.objData.mtkvertices = [self.mtkScene3D.mtkView.device newBufferWithBytes:quadVertices
                                                 length:sizeof(quadVertices)
                                                options:MTLResourceStorageModeShared];
    static int indices[] =
    { // 索引
        0, 3, 2,
        0, 1, 3,
        0, 2, 4,
        0, 4, 1,
        2, 3, 4,
        1, 4, 3,
    };
    self.objData.mtkindexs = [self.mtkScene3D.mtkView.device newBufferWithBytes:indices
                                                     length:sizeof(indices)
                                                    options:MTLResourceStorageModeShared];
    self.objData.mtkindexCount = sizeof(indices) / sizeof(int);
}
- (void)setupMatrixWithEncoder:(id<MTLRenderCommandEncoder>)renderEncoder {
   
   
   static float y = 0.0 ;
   y-=5;
   Matrix3D* posMatrix =[[Matrix3D alloc]init];
   [posMatrix appendScale:20 y:20 z:20];
   [posMatrix appendRotation:y axis:Vector3D.Y_AXIS];

    
 
    
   RotationMatrix matrix = {[self.mtkScene3D.camera3D.modelMatrix getMatrixFloat4x4], [posMatrix getMatrixFloat4x4]};
  
   [renderEncoder setVertexBytes:&matrix
                          length:sizeof(matrix)
                         atIndex:RotationVertexInputIndexMatrix_1];
}
-(void)updata  {
   
   id<MTLRenderCommandEncoder> renderEncoder=self.mtkScene3D.context3D.renderEncoder;
    
   [self.rotationShaderA setProgramShader];
   
   [self setupMatrixWithEncoder:renderEncoder];
   
   [renderEncoder setVertexBuffer: self.objData.mtkvertices
                           offset:0
                          atIndex:RotationVertexInputIndexVertices_0];
   
   [renderEncoder setFragmentTexture:self.texture
                             atIndex:RotationFragmentInputIndexTexture_0];
   
   [renderEncoder drawIndexedPrimitives:MTLPrimitiveTypeLine
                             indexCount: self.objData.mtkindexCount
                              indexType:MTLIndexTypeUInt32
                            indexBuffer: self.objData.mtkindexs
                      indexBufferOffset:0];
}

@end
