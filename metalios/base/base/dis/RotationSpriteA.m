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
@import MetalKit;
@import GLKit;


@interface RotationSpriteA ()


// data
@property (nonatomic, assign) vector_uint2 viewportSize;
@property (nonatomic, strong) id<MTLRenderPipelineState> pipelineState;
@property (nonatomic, strong) id<MTLTexture> texture;
@property (nonatomic, strong)  id <MTLDepthStencilState> _relaxedDepthState;
//@property (nonatomic, assign) NSUInteger indexCount;
//@property (nonatomic, strong) id<MTLBuffer> vertices;
//@property (nonatomic, strong) id<MTLBuffer> indexs;


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
    [self setupPipeline];
  
    self.objData=[[ObjData alloc] init:self.scene3D];
    [self.objData makeTempObjData];
    self.texture=[self.scene3D.textureManager setupTexture  ];
}

-(void)setupPipeline {
    id<MTLLibrary> defaultLibrary = [self.scene3D.mtkView.device newDefaultLibrary];
    id<MTLFunction> vertexFunction = [defaultLibrary newFunctionWithName:@"vertexShaderBase"];
    id<MTLFunction> fragmentFunction = [defaultLibrary newFunctionWithName:@"samplingShaderBase"];
    
    MTLRenderPipelineDescriptor *pipelineStateDescriptor = [[MTLRenderPipelineDescriptor alloc] init];
    pipelineStateDescriptor.vertexFunction = vertexFunction;
    pipelineStateDescriptor.fragmentFunction = fragmentFunction;
    pipelineStateDescriptor.colorAttachments[0].pixelFormat = self.scene3D.mtkView.colorPixelFormat;
    pipelineStateDescriptor.depthAttachmentPixelFormat =  self.scene3D.mtkView.depthStencilPixelFormat;
    pipelineStateDescriptor.stencilAttachmentPixelFormat = self.scene3D.mtkView.depthStencilPixelFormat;
    
    self.pipelineState = [self.scene3D.mtkView.device newRenderPipelineStateWithDescriptor:pipelineStateDescriptor
                                                                                     error:NULL];
     
    
    MTLDepthStencilDescriptor *depthStateDesc = [[MTLDepthStencilDescriptor alloc] init];
    
    {
        depthStateDesc.depthCompareFunction = MTLCompareFunctionLessEqual;
        depthStateDesc.depthWriteEnabled = YES;
        self._relaxedDepthState = [self.scene3D.mtkView.device newDepthStencilStateWithDescriptor:depthStateDesc];
    }
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
    
    [renderEncoder setRenderPipelineState:self.pipelineState];
    [renderEncoder setDepthStencilState:self._relaxedDepthState];
    [renderEncoder setFrontFacingWinding:MTLWindingCounterClockwise];
    [renderEncoder setCullMode:MTLCullModeFront];
    [renderEncoder pushDebugGroup:@"Render Forward Lighting"];
    
    
    [self setupMatrixWithEncoder:renderEncoder];
    
    [renderEncoder setVertexBuffer: self.objData.vertices
                            offset:0
                           atIndex:LYVertexInputIndexVertices];
    [renderEncoder setCullMode:MTLCullModeFront];
    [renderEncoder setFrontFacingWinding:MTLWindingCounterClockwise];
    
    [renderEncoder setFragmentTexture:self.texture
                              atIndex:LYFragmentInputIndexTexture];
    
    [renderEncoder drawIndexedPrimitives:MTLPrimitiveTypeTriangle
                              indexCount: self.objData.indexCount
                               indexType:MTLIndexTypeUInt32
                             indexBuffer: self.objData.indexs
                       indexBufferOffset:0];
}
@end

