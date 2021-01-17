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
@import MetalKit;
@import GLKit;


@interface RotationSpriteA ()
  

// data
@property (nonatomic, assign) vector_uint2 viewportSize;
@property (nonatomic, strong) id<MTLRenderPipelineState> pipelineState;
@property (nonatomic, strong) id<MTLCommandQueue> commandQueue;
@property (nonatomic, strong) id<MTLTexture> texture;
@property (nonatomic, strong) id<MTLBuffer> vertices;
@property (nonatomic, strong) id<MTLBuffer> indexs;
@property (nonatomic, strong)  id <MTLDepthStencilState> _relaxedDepthState;
@property (nonatomic, assign) NSUInteger indexCount;


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
    [self setupVertex];
    [self setupTexture];
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
    self.commandQueue = [self.scene3D.mtkView.device newCommandQueue];
    
    
    
    MTLDepthStencilDescriptor *depthStateDesc = [[MTLDepthStencilDescriptor alloc] init];

    {
        depthStateDesc.depthCompareFunction = MTLCompareFunctionLessEqual;
        depthStateDesc.depthWriteEnabled = YES;
        self._relaxedDepthState = [self.scene3D.mtkView.device newDepthStencilStateWithDescriptor:depthStateDesc];
    }
}

- (void)setupVertex {
    static const LYVertex quadVertices[] =
    {  // 顶点坐标                          顶点颜色                    纹理坐标
        {{-0.5f, 0.5f, 0.0f, 1.0f},      {0.0f, 0.0f, 0.5f},       {0.0f, 1.0f}},//左上
        {{0.5f, 0.5f, 0.0f, 1.0f},       {0.0f, 0.5f, 0.0f},       {1.0f, 1.0f}},//右上
        {{-0.5f, -0.5f, 0.0f, 1.0f},     {0.5f, 0.0f, 1.0f},       {0.0f, 0.0f}},//左下
        {{0.5f, -0.5f, 0.0f, 1.0f},      {0.0f, 0.0f, 0.5f},       {1.0f, 0.0f}},//右下
        {{0.0f, 0.0f, 1.0f, 1.0f},       {1.0f, 1.0f, 1.0f},       {0.5f, 0.5f}},//顶点
    };
    self.vertices = [self.scene3D.mtkView.device newBufferWithBytes:quadVertices
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
    self.indexs = [self.scene3D.mtkView.device newBufferWithBytes:indices
                                                     length:sizeof(indices)
                                                    options:MTLResourceStorageModeShared];
    self.indexCount = sizeof(indices) / sizeof(int);
}

- (void)setupTexture {
    UIImage *image = [UIImage imageNamed:@"texture01"];
    MTLTextureDescriptor *textureDescriptor = [[MTLTextureDescriptor alloc] init];
    textureDescriptor.pixelFormat = MTLPixelFormatRGBA8Unorm;
    textureDescriptor.width = image.size.width;
    textureDescriptor.height = image.size.height;
    self.texture = [self.scene3D.mtkView.device newTextureWithDescriptor:textureDescriptor];
    
    MTLRegion region = {{ 0, 0, 0 }, {image.size.width, image.size.height, 1}};
    Byte *imageBytes = [self loadImage:image];
    if (imageBytes) {
        [self.texture replaceRegion:region
                    mipmapLevel:0
                      withBytes:imageBytes
                    bytesPerRow:4 * image.size.width];
        free(imageBytes);
        imageBytes = NULL;
    }
}

- (Byte *)loadImage:(UIImage *)image {
    // 1获取图片的CGImageRef
    CGImageRef spriteImage = image.CGImage;
    
    // 2 读取图片的大小
    size_t width = CGImageGetWidth(spriteImage);
    size_t height = CGImageGetHeight(spriteImage);
    
    Byte * spriteData = (Byte *) calloc(width * height * 4, sizeof(Byte)); //rgba共4个byte
    
    CGContextRef spriteContext = CGBitmapContextCreate(spriteData, width, height, 8, width*4,
                                                       CGImageGetColorSpace(spriteImage), kCGImageAlphaPremultipliedLast);
    
    // 3在CGContextRef上绘图
    CGContextDrawImage(spriteContext, CGRectMake(0, 0, width, height), spriteImage);
    
    CGContextRelease(spriteContext);
    
    return spriteData;
}


/**
 找了很多文档，都没有发现metalKit或者simd相关的接口可以快捷创建矩阵的，于是只能从GLKit里面借力

 @param matrix GLKit的矩阵
 @return metal用的矩阵
 */
- (matrix_float4x4)getMetalMatrixFromGLKMatrix:(GLKMatrix4)matrix {
    matrix_float4x4 ret = (matrix_float4x4){
        simd_make_float4(matrix.m00, matrix.m01, matrix.m02, matrix.m03),
        simd_make_float4(matrix.m10, matrix.m11, matrix.m12, matrix.m13),
        simd_make_float4(matrix.m20, matrix.m21, matrix.m22, matrix.m23),
        simd_make_float4(matrix.m30, matrix.m31, matrix.m32, matrix.m33),
    };
    return ret;
}

- (void)setupMatrixWithEncoder:(id<MTLRenderCommandEncoder>)renderEncoder {
 
  
    static float y = 0.0 ;
    y+=1;
    Matrix3D* posMatrix =[[Matrix3D alloc]init];
    [posMatrix appendScale:2 y:2 z:2];
    [posMatrix appendRotation:y axis:Vector3D.Y_AXIS];
 
 
    LYMatrix matrix = {[self.scene3D.camera3D.viewMatrix getMatrixFloat4x4], [posMatrix getMatrixFloat4x4]};
    
 
    [renderEncoder setVertexBytes:&matrix
                           length:sizeof(matrix)
                          atIndex:LYVertexInputIndexMatrix];
}
-(void)updata:(id<MTLRenderCommandEncoder>)renderEncoder {
    
    
    
    [renderEncoder setViewport:(MTLViewport){0.0, 0.0, self.scene3D.camera3D.fovw, self.scene3D.camera3D.fovh, -1.0, 1.0 }];
    
    [renderEncoder setRenderPipelineState:self.pipelineState];
    [renderEncoder setDepthStencilState:self._relaxedDepthState];
    [renderEncoder setFrontFacingWinding:MTLWindingCounterClockwise];
    [renderEncoder setCullMode:MTLCullModeFront];
    [renderEncoder pushDebugGroup:@"Render Forward Lighting"];

    
    [self setupMatrixWithEncoder:renderEncoder];
    
    [renderEncoder setVertexBuffer:self.vertices
                            offset:0
                           atIndex:LYVertexInputIndexVertices];
    [renderEncoder setCullMode:MTLCullModeFront];
       [renderEncoder setFrontFacingWinding:MTLWindingCounterClockwise];
    
    [renderEncoder setFragmentTexture:self.texture
                              atIndex:LYFragmentInputIndexTexture];
    
    [renderEncoder drawIndexedPrimitives:MTLPrimitiveTypeTriangle
                              indexCount:self.indexCount
                               indexType:MTLIndexTypeUInt32
                             indexBuffer:self.indexs
                       indexBufferOffset:0];
}
@end

