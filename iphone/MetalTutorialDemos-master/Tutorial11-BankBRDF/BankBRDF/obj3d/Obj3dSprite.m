//
//  Obj3dSprite.m
//  BankBRDF
//
//  Created by pan3dme on 2021/1/15.
//  Copyright © 2021 Xinhou Jiang. All rights reserved.
//

#import "Obj3dSprite.h"
#import "AAPLMesh.h"
#import "AAPLMathUtilities.h"
#import "ShaderTypes.h"
@import simd;
@import ModelIO;
@import MetalKit;

@interface Obj3dSprite ()
@property(nonatomic,strong) id <MTLDevice> device;;
@property(nonatomic,strong) id <MTLCommandQueue> _commandQueue;
@property(nonatomic,strong) id <MTLRenderPipelineState> _pipelineStateOne;
@property(nonatomic,strong) id <MTLBuffer> _uniformBufferOne;
@property(nonatomic,assign) NSArray<AAPLMesh *> *_meshes;
@property(nonatomic,strong)  MTLVertexDescriptor *_defaultVertexDescriptor;
 

@end


@implementation Obj3dSprite
- (instancetype)init:(MTKView*)view;
{
    self = [super init];
    if (self) {
        _device=view.device;
        [self loadMetalWithMetalKitView:view];
 
    }
    return self;
}
-(void)setMeshInfo:(NSArray<AAPLMesh *> *) meshData;
{
    self._meshes=meshData;
}
 
- (void)loadMetalWithMetalKitView:(nonnull MTKView *)view
{
    view.depthStencilPixelFormat = MTLPixelFormatDepth32Float_Stencil8;
    view.colorPixelFormat = MTLPixelFormatBGRA8Unorm_sRGB;
    view.sampleCount = 1;
    

    id <MTLLibrary> defaultLibrary = [_device newDefaultLibrary];
    
    NSString *shaderName = @"One";

    const MTLResourceOptions storageMode = MTLResourceStorageModeShared;
    self._uniformBufferOne = [_device newBufferWithLength:sizeof(UniformsOne)
                                                  options:storageMode];
    
    self._defaultVertexDescriptor = [[MTLVertexDescriptor alloc] init];

    // Positions.
    self._defaultVertexDescriptor.attributes[0].format = MTLVertexFormatFloat3;
    self._defaultVertexDescriptor.attributes[0].offset = 0;
    self._defaultVertexDescriptor.attributes[0].bufferIndex = 0;

    // Texture coordinates.
    self._defaultVertexDescriptor.attributes[1].format = MTLVertexFormatFloat2;
    self._defaultVertexDescriptor.attributes[1].offset = 12;
    self._defaultVertexDescriptor.attributes[1].bufferIndex = 0;
    
    // Normals
    self._defaultVertexDescriptor.attributes[2].format = MTLVertexFormatHalf4;
    self._defaultVertexDescriptor.attributes[2].offset = 20;
    self._defaultVertexDescriptor.attributes[2].bufferIndex = 0;
    
    // ...

    self._defaultVertexDescriptor.layouts[0].stride = 44;
    self._defaultVertexDescriptor.layouts[0].stepRate = 1;
    self._defaultVertexDescriptor.layouts[0].stepFunction = MTLVertexStepFunctionPerVertex;
      

    id <MTLFunction> vertexStandardMaterialOne = [defaultLibrary newFunctionWithName:   [@"vertexShader" stringByAppendingString:shaderName]];
 
    

    
    // Create a render pipeline state descriptor.

    
    MTLRenderPipelineDescriptor * renderPipelineStateDescriptorOne = [MTLRenderPipelineDescriptor new];

    renderPipelineStateDescriptorOne.label = @"Forward LightingOne";
    renderPipelineStateDescriptorOne.sampleCount = view.sampleCount;
    renderPipelineStateDescriptorOne.vertexDescriptor = self._defaultVertexDescriptor;
    renderPipelineStateDescriptorOne.vertexFunction = vertexStandardMaterialOne;
    renderPipelineStateDescriptorOne.fragmentFunction =  [defaultLibrary newFunctionWithName:    [@"fragmentShader" stringByAppendingString:shaderName]];
    renderPipelineStateDescriptorOne.colorAttachments[0].pixelFormat = view.colorPixelFormat;
    renderPipelineStateDescriptorOne.depthAttachmentPixelFormat = view.depthStencilPixelFormat;
    renderPipelineStateDescriptorOne.stencilAttachmentPixelFormat = view.depthStencilPixelFormat;
    
  
    
    NSError* error = NULL;
    self._pipelineStateOne = [_device newRenderPipelineStateWithDescriptor:renderPipelineStateDescriptorOne
                                       error:&error];
 
        
  
}
 
- (void)updata:(id<MTLRenderCommandEncoder>)renderEncoder
{
    if(self._meshes!=nil)
    {
       
       
    }
   

}

/// Update app state for the current frame.
- (void)updateGameStateOne:(matrix_float4x4)_projectionMatrix;
{
    UniformsOne * uniforms = (UniformsOne*)self._uniformBufferOne.contents;
    // P
    uniforms->projectionMatrix = _projectionMatrix;
    // V
    uniforms->viewMatrix = matrix_multiply(matrix4x4_translation(0, -100, 1100),
                                           matrix4x4_rotation(-0.5, (vector_float3){1,0,0}));
    // M
    uniforms->modelMatrix = matrix_multiply(matrix4x4_rotation(0, (vector_float3){0,1,0}),
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

 
}
- (void)updataTest:(id<MTLRenderCommandEncoder>)renderEncoder  m:(matrix_float4x4)m
{
 
    [self updateGameStateOne:m];
    [renderEncoder setVertexBuffer:self._uniformBufferOne offset:0 atIndex:1];
    [renderEncoder setFragmentBuffer:self._uniformBufferOne offset:0 atIndex:1];
    [renderEncoder setRenderPipelineState:self._pipelineStateOne];
    
    [self drawMeshes:renderEncoder idx:0];
    [self drawMeshes:renderEncoder idx:1];
    [self drawMeshes:renderEncoder idx:2];
}


/// Draw the mesh objects with the given render command encoder.
- (void)drawMeshes:(id<MTLRenderCommandEncoder>)renderEncoder idx:(int)idx;
{
    int skipNum=0;
    for (__unsafe_unretained AAPLMesh *mesh in self._meshes)
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
@end
