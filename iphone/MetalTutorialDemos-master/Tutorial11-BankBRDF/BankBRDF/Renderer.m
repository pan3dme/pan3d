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


@implementation Renderer
{
    id <MTLDevice> _device;
    id <MTLCommandQueue> _commandQueue;

    MTLVertexDescriptor *_defaultVertexDescriptor;

    id <MTLRenderPipelineState> _pipelineStateOne;
    id <MTLRenderPipelineState> _pipelineStateTwo;

    id <MTLDepthStencilState> _relaxedDepthState;
    id <MTLBuffer> _uniformBufferOne;
    id <MTLBuffer> _uniformBufferTwo;

    matrix_float4x4 _projectionMatrix;
    float _rotation;

    NSArray<AAPLMesh *> *_meshes;
    
 
    
    Box3dSprite* _box3dSprite;
    RedRect3dSprite* _redRect3dSprite;
    
}
 


-(nonnull instancetype)initWithMetalKitView:(nonnull MTKView *)view;
{
    self = [super init];
    if(self)
    {
        _device = view.device;
        
        _box3dSprite= [[Box3dSprite alloc]init:view];
        _redRect3dSprite=[[RedRect3dSprite alloc]init:view];

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
    
    id <MTLLibrary> defaultLibrary = [_device newDefaultLibrary];

    const MTLResourceOptions storageMode = MTLResourceStorageModeShared;
    _uniformBufferOne = [_device newBufferWithLength:sizeof(UniformsOne)
                                                  options:storageMode];
    _uniformBufferTwo = [_device newBufferWithLength:sizeof(UniformsTwo)
                                                  options:storageMode];
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
    
    // ...

    _defaultVertexDescriptor.layouts[0].stride = 44;
    _defaultVertexDescriptor.layouts[0].stepRate = 1;
    _defaultVertexDescriptor.layouts[0].stepFunction = MTLVertexStepFunctionPerVertex;

    id <MTLFunction> vertexStandardMaterialOne = [defaultLibrary newFunctionWithName:@"vertexShaderOne"];
    id <MTLFunction> vertexStandardMaterialTwo = [defaultLibrary newFunctionWithName:@"vertexShaderTwo"];
 
    
    // Create a render pipeline state descriptor.

    
    MTLRenderPipelineDescriptor * renderPipelineStateDescriptorOne = [MTLRenderPipelineDescriptor new];

    renderPipelineStateDescriptorOne.label = @"Forward LightingOne";
    renderPipelineStateDescriptorOne.sampleCount = view.sampleCount;
    renderPipelineStateDescriptorOne.vertexDescriptor = _defaultVertexDescriptor;
    renderPipelineStateDescriptorOne.vertexFunction = vertexStandardMaterialOne;
    renderPipelineStateDescriptorOne.fragmentFunction =  [defaultLibrary newFunctionWithName:@"fragmentShaderOne"];
    renderPipelineStateDescriptorOne.colorAttachments[0].pixelFormat = view.colorPixelFormat;
    renderPipelineStateDescriptorOne.depthAttachmentPixelFormat = view.depthStencilPixelFormat;
    renderPipelineStateDescriptorOne.stencilAttachmentPixelFormat = view.depthStencilPixelFormat;
    
    
    MTLRenderPipelineDescriptor * renderPipelineStateDescriptorTwo = [MTLRenderPipelineDescriptor new];

    renderPipelineStateDescriptorTwo.label = @"Forward LightingTwo";
    renderPipelineStateDescriptorTwo.sampleCount = view.sampleCount;
    renderPipelineStateDescriptorTwo.vertexDescriptor = _defaultVertexDescriptor;
    renderPipelineStateDescriptorTwo.vertexFunction = vertexStandardMaterialTwo;
    renderPipelineStateDescriptorTwo.fragmentFunction =  [defaultLibrary newFunctionWithName:@"fragmentShaderTwo"];
    renderPipelineStateDescriptorTwo.colorAttachments[0].pixelFormat = view.colorPixelFormat;
    renderPipelineStateDescriptorTwo.depthAttachmentPixelFormat = view.depthStencilPixelFormat;
    renderPipelineStateDescriptorTwo.stencilAttachmentPixelFormat = view.depthStencilPixelFormat;
    
    NSError* error = NULL;
    _pipelineStateOne = [_device newRenderPipelineStateWithDescriptor:renderPipelineStateDescriptorOne
                                       error:&error];
    
    _pipelineStateTwo = [_device newRenderPipelineStateWithDescriptor:renderPipelineStateDescriptorTwo
                                       error:&error];
        
 

    MTLDepthStencilDescriptor *depthStateDesc = [[MTLDepthStencilDescriptor alloc] init];

    {
        depthStateDesc.depthCompareFunction = MTLCompareFunctionLessEqual;
        depthStateDesc.depthWriteEnabled = YES;
        _relaxedDepthState = [_device newDepthStencilStateWithDescriptor:depthStateDesc];
    }
    _commandQueue = [_device newCommandQueue];
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
    //modelIOVertexDescriptor.attributes[3].name   = MDLVertexAttributeTangent;
    //modelIOVertexDescriptor.attributes[4].name = MDLVertexAttributeBitangent;
    NSURL *modelFileURL = [[NSBundle mainBundle] URLForResource:@"Temple.obj" withExtension:nil];
    NSAssert(modelFileURL, @"Could not find model (%@) file in bundle", modelFileURL.absoluteString);
    _meshes = [AAPLMesh newMeshesFromURL:modelFileURL
                 modelIOVertexDescriptor:modelIOVertexDescriptor
                             metalDevice:_device
                                   error:&error];
    
    NSAssert(_meshes, @"Could not find model (%@) file in bundle", error);
}

/// Update app state for the current frame.
- (void)updateGameStateOne
{
    UniformsOne * uniforms = (UniformsOne*)_uniformBufferOne.contents;
    // P
    uniforms->projectionMatrix = _projectionMatrix;
    // V
    uniforms->viewMatrix = matrix_multiply(matrix4x4_translation(0, -100, 1100),
                                           matrix4x4_rotation(-0.5, (vector_float3){1,0,0}));
    // M
    uniforms->modelMatrix = matrix_multiply(matrix4x4_rotation(_rotation, (vector_float3){0,1,0}),
                                            matrix4x4_translation(0, 0, 0));
    // MV
    uniforms->modelViewMatrix = matrix_multiply(uniforms->viewMatrix, uniforms->modelMatrix);
        
    // 平行光
    uniforms->directionalLightDirection = (vector_float3){-1.0,-1.0,-1.0};
    uniforms->directionalLightColor = (vector_float3){0.8,0.8,0.8};
    
    uniforms->IL = 10.0f;
    uniforms->Kd = 0.1f;
    uniforms->Ks = 0.9f;
    uniforms->Ia = 3.0f;
    uniforms->Ka = 0.1f;
    //uniforms->shininess = 15.0f;
    
    uniforms->f = 0.015;
    uniforms->m = 0.8;
    
    uniforms->cameraPos = (vector_float3){0,100,-1100};

    _rotation += 0.002f;
}
- (void)updateGameStateTwo
{
    UniformsTwo * uniforms = (UniformsTwo*)_uniformBufferTwo.contents;
    // P
    uniforms->projectionMatrix = _projectionMatrix;
    // V
    uniforms->viewMatrix = matrix_multiply(matrix4x4_translation(0, -100, 1100),
                                           matrix4x4_rotation(-0.5, (vector_float3){1,0,0}));
    // M
    uniforms->modelMatrix = matrix_multiply(matrix4x4_rotation(_rotation, (vector_float3){0,1,0}),
                                            matrix4x4_translation(0, 0, 0));
    // MV
    uniforms->modelViewMatrix = matrix_multiply(uniforms->viewMatrix, uniforms->modelMatrix);
        
 
    _rotation += 0.002f;

 
}
 

/// Called whenever the view changes orientation or size.
- (void) mtkView:(nonnull MTKView *)view drawableSizeWillChange:(CGSize)size
{
    float aspect = size.width / (float)size.height;
    float _fov = 65.0f * (M_PI / 180.0f);
    float _nearPlane = 1.0f;
    float _farPlane = 1500.0f;
    _projectionMatrix = matrix_perspective_left_hand(_fov, aspect, _nearPlane, _farPlane);
}

/// Draw the mesh objects with the given render command encoder.
- (void)drawMeshes:(id<MTLRenderCommandEncoder>)renderEncoder idx:(int)idx;
{
    int skipNum=0;
    for (__unsafe_unretained AAPLMesh *mesh in _meshes)
    {
        __unsafe_unretained MTKMesh *metalKitMesh = mesh.metalKitMesh;

        // Set the mesh's vertex buffers.
        for (NSUInteger bufferIndex = 0; bufferIndex < metalKitMesh.vertexBuffers.count; bufferIndex++)
        {
            __unsafe_unretained MTKMeshBuffer *vertexBuffer = metalKitMesh.vertexBuffers[bufferIndex];
            if((NSNull*)vertexBuffer != [NSNull null])
            {
                [renderEncoder setVertexBuffer:vertexBuffer.buffer
                                        offset:vertexBuffer.offset
                                       atIndex:bufferIndex];
            }
        }

        // Draw each submesh of the mesh.
        for(AAPLSubmesh *submesh in mesh.submeshes)
        {
            if(skipNum==idx){
                // Set any textures that you read or sample in the render pipeline.
                [renderEncoder setFragmentTexture:submesh.textures[0]
                                          atIndex:0];

                [renderEncoder setFragmentTexture:submesh.textures[1]
                                          atIndex:1];

                [renderEncoder setFragmentTexture:submesh.textures[2]
                                          atIndex:2];
                
                if(idx==0){
                    [renderEncoder setFragmentBuffer:_uniformBufferOne offset:0 atIndex:1];
                }else{
                    [renderEncoder setFragmentBuffer:_uniformBufferTwo offset:0 atIndex:1];
                }
               

                MTKSubmesh *metalKitSubmesh = submesh.metalKitSubmmesh;

                [renderEncoder drawIndexedPrimitives:metalKitSubmesh.primitiveType
                                          indexCount:metalKitSubmesh.indexCount
                                           indexType:metalKitSubmesh.indexType
                                         indexBuffer:metalKitSubmesh.indexBuffer.buffer
                                   indexBufferOffset:metalKitSubmesh.indexBuffer.offset];
            }
            
            skipNum++;
            
        }
    }
}
-(void)selectOneShader:( id <MTLRenderCommandEncoder> ) renderEncoder idx:(int)idx{
  
 


    
    if(idx==0){
        [self updateGameStateOne];
        [renderEncoder setVertexBuffer:_uniformBufferOne offset:0 atIndex:1];
        [renderEncoder setRenderPipelineState:_pipelineStateOne];
    }else{
        [self updateGameStateTwo];
        [renderEncoder setVertexBuffer:_uniformBufferTwo offset:0 atIndex:1];
        [renderEncoder setRenderPipelineState:_pipelineStateTwo];
    }
 
    [self drawMeshes:renderEncoder idx:idx];
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
        [renderEncoder setDepthStencilState:_relaxedDepthState];
        
        [_redRect3dSprite updata:renderEncoder];
        
        
        [self selectOneShader:renderEncoder idx:0];
        [self selectOneShader:renderEncoder idx:1];
        
        
    
 
        
//        [_box3dSprite updata:renderEncoder];
   
  
        [renderEncoder popDebugGroup];

        [renderEncoder endEncoding];
    }
    
    
    
  

    [commandBuffer presentDrawable:view.currentDrawable];
    [commandBuffer commit];
}

 
@end
