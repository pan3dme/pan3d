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
//@property(nonatomic,strong) MTLVertexDescriptor *_defaultVertexDescriptor;
//@property(nonatomic,strong) id <MTLRenderPipelineState> _pipelineStateOne;
//@property(nonatomic,strong) id <MTLDepthStencilState> _relaxedDepthState;
//@property(nonatomic,strong) id <MTLBuffer> _uniformBufferOne;
//@property(nonatomic,assign) matrix_float4x4 _projectionMatrix;
//@property(nonatomic,assign) float _rotation;
@property(nonatomic,assign) NSArray<AAPLMesh *> *_meshes;

@end


@implementation Obj3dSprite
- (instancetype)init:(MTKView*)view;
{
    self = [super init];
    if (self) {
        _device=view.device;
 
    }
    return self;
}
-(void)setMeshInfo:(NSArray<AAPLMesh *> *) meshData;
{
    self._meshes=meshData;
}
 
 
- (void)updata:(id<MTLRenderCommandEncoder>)renderEncoder
{
    if(self._meshes!=nil)
    {
       
       
    }
   

}
- (void)updataTest:(id<MTLRenderCommandEncoder>)renderEncoder uniformBuffer:(id <MTLBuffer>)uniformBuffer pipelineState:( id <MTLRenderPipelineState>)pipelineState
{
 
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
