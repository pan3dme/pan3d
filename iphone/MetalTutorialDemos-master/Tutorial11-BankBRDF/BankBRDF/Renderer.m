/*
See LICENSE folder for this sample’s licensing information.

Abstract:
Implementation of renderer class that perfoms Metal setup and per-frame rendering.
*/
@import simd;
@import ModelIO;
@import MetalKit;

#import "Renderer.h"
#import "AAPLMesh.h"
#import "AAPLMathUtilities.h"
#import "ShaderTypes.h"
#import "Box3dSprite.h"
#import "RedRect3dSprite.h"
#import "Obj3dSprite.h"
#import "Obj3dTestSprite.h"


@implementation Renderer
{
    id <MTLDevice> _device;
    id <MTLCommandQueue> _commandQueue;

    MTLVertexDescriptor *_defaultVertexDescriptor;

    id <MTLDepthStencilState> _relaxedDepthState;

    matrix_float4x4 _projectionMatrix;
    float _rotation;

    NSArray<AAPLMesh *> *_meshes;
    
    Box3dSprite* _box3dSprite;
    RedRect3dSprite* _redRect3dSprite;
    
    Obj3dSprite* _obj3dSprite;
    Obj3dTestSprite* _obj3dTestSprite;
    
}
 


-(nonnull instancetype)initWithMetalKitView:(nonnull MTKView *)view;
{
    self = [super init];
    if(self)
    {
        _device = view.device;
        
        _box3dSprite= [[Box3dSprite alloc]init:view];
        _redRect3dSprite=[[RedRect3dSprite alloc]init:view];
        _obj3dSprite=[[Obj3dSprite alloc] init:view];
        _obj3dTestSprite=[[Obj3dTestSprite alloc] init:view];

        [self loadMetalWithMetalKitView:view];
        [self loadAssets];
  
    }

    return self;
}
 

- (void)loadMetalWithMetalKitView:(nonnull MTKView *)view
{
    view.depthStencilPixelFormat = MTLPixelFormatDepth32Float_Stencil8;
    view.colorPixelFormat = MTLPixelFormatBGRA8Unorm_sRGB;
    view.sampleCount = 1;
    
    _rotation = 0;
     
 
    _defaultVertexDescriptor = [[MTLVertexDescriptor alloc] init];

    // Positions.
    _defaultVertexDescriptor.attributes[0].format = MTLVertexFormatFloat3;
    _defaultVertexDescriptor.attributes[0].offset = 0;
    _defaultVertexDescriptor.attributes[0].bufferIndex = 0;

    // Texture coordinates.
    _defaultVertexDescriptor.attributes[1].format = MTLVertexFormatFloat2;
    _defaultVertexDescriptor.attributes[1].offset = 12;
    _defaultVertexDescriptor.attributes[1].bufferIndex = 0;
    
    // Normals
    _defaultVertexDescriptor.attributes[2].format = MTLVertexFormatHalf4;
    _defaultVertexDescriptor.attributes[2].offset = 20;
    _defaultVertexDescriptor.attributes[2].bufferIndex = 0;
     

    _defaultVertexDescriptor.layouts[0].stride = 44;
    _defaultVertexDescriptor.layouts[0].stepRate = 1;
    _defaultVertexDescriptor.layouts[0].stepFunction = MTLVertexStepFunctionPerVertex;

    MTLDepthStencilDescriptor *depthStateDesc = [[MTLDepthStencilDescriptor alloc] init];

    {
        depthStateDesc.depthCompareFunction = MTLCompareFunctionLessEqual;
        depthStateDesc.depthWriteEnabled = YES;
        _relaxedDepthState = [_device newDepthStencilStateWithDescriptor:depthStateDesc];
    }
    _commandQueue = [_device newCommandQueue];
    
    [_obj3dSprite setMtlVertexDes:_defaultVertexDescriptor];
    [_obj3dTestSprite setMtlVertexDes:_defaultVertexDescriptor];
}

// 加载模型
- (void)loadAssets
{
    // Create and load assets into Metal objects.
    NSError *error = nil;
    MDLVertexDescriptor *modelIOVertexDescriptor =
        MTKModelIOVertexDescriptorFromMetal(_defaultVertexDescriptor);
    modelIOVertexDescriptor.attributes[0].name  = MDLVertexAttributePosition;
    modelIOVertexDescriptor.attributes[1].name  = MDLVertexAttributeTextureCoordinate;
    modelIOVertexDescriptor.attributes[2].name    = MDLVertexAttributeNormal;
 
    NSURL *modelFileURL = [[NSBundle mainBundle] URLForResource:@"Temple.obj" withExtension:nil];
 
    _meshes = [AAPLMesh newMeshesFromURL:modelFileURL
                 modelIOVertexDescriptor:modelIOVertexDescriptor
                             metalDevice:_device
                                   error:&error];
    
 
    
    [_obj3dSprite setMeshInfo:_meshes ];
    [_obj3dTestSprite setMeshInfo:_meshes ];
}
/// Called whenever the view changes orientation or size.
- (void) mtkView:(nonnull MTKView *)view drawableSizeWillChange:(CGSize)size
{
    float aspect = size.width / (float)size.height;
    float _fov = 65.0f * (M_PI / 180.0f);
    float _nearPlane = 1.0f;
    float _farPlane = 1500.0f;
    _projectionMatrix = matrix_perspective_left_hand(_fov, aspect, _nearPlane, _farPlane);
    
    [_obj3dTestSprite drawableSizeWillChange:size];
    [_obj3dSprite drawableSizeWillChange:size];
}
 
-(void)selectOneShader:( id <MTLRenderCommandEncoder> ) renderEncoder idx:(int)idx{
    [_obj3dSprite updataTest:renderEncoder];
    [_obj3dTestSprite updataTest:renderEncoder];
}

 

- (void)drawInMTKViewBase:(nonnull MTKView *)view
{
    id <MTLCommandBuffer> commandBuffer = [_commandQueue commandBuffer];
    commandBuffer.label = @"MyCommand";
    MTLRenderPassDescriptor* renderPassDescriptor = view.currentRenderPassDescriptor;
    renderPassDescriptor.tileWidth = 16;
    renderPassDescriptor.tileHeight = 16;
    if(renderPassDescriptor != nil)
    {
        id <MTLRenderCommandEncoder> renderEncoder =
        [commandBuffer renderCommandEncoderWithDescriptor:renderPassDescriptor];
        renderEncoder.label = @"MyRenderEncoder";
        [renderEncoder pushDebugGroup:@"DrawBox"];
        [renderEncoder popDebugGroup];
        [renderEncoder endEncoding];
        [commandBuffer presentDrawable:view.currentDrawable];
    }
    [commandBuffer commit];
}

- (void) drawInMTKView:(nonnull MTKView *)view
{
    id <MTLCommandBuffer> commandBuffer = [_commandQueue commandBuffer];
    commandBuffer.label = @"MyCommand";
    MTLRenderPassDescriptor *renderPassDescriptor = view.currentRenderPassDescriptor;
    if(renderPassDescriptor != nil)
    {
        id <MTLRenderCommandEncoder> renderEncoder =
            [commandBuffer renderCommandEncoderWithDescriptor:renderPassDescriptor];

        [renderEncoder setCullMode:MTLCullModeBack];
        [renderEncoder pushDebugGroup:@"Render Forward Lighting"];
//        [renderEncoder setDepthStencilState:_relaxedDepthState];
    
        [self selectOneShader:renderEncoder idx:0];
        [_redRect3dSprite updata:renderEncoder];
        [self selectOneShader:renderEncoder idx:1];
        
        [renderEncoder popDebugGroup];
        [renderEncoder endEncoding];
    }

    [commandBuffer presentDrawable:view.currentDrawable];
    [commandBuffer commit];
}

 
@end
