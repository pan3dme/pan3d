//
//  Display3DBonePartilce.m
//  StorageStarted
//
//  Created by pan3dme on 2021/6/1.
//  Copyright © 2021 cuiyiran. All rights reserved.
//

#import "Display3DBonePartilce.h"
#import "Scene3D.h"
#import "ParticleBoneData.h"
#import "MtlMoveDisplayType.h"
#import "Scene_data.h"
#import "TimeUtil.h"
#import "Scene_data.h"

@implementation Display3DBonePartilce

 
 

- (void)update;
{

    [super update];
 
}
 
- (void)setVc;
{
    Display3DBonePartilce* this=self;
    ParticleBoneData* particleBoneData=(ParticleBoneData*)this.data;
    AnimData*  anim= particleBoneData.animData;
    
    id<MTLRenderCommandEncoder> renderEncoder=this.scene3D.context3D.renderEncoder;
    
    LineMatrixRoleView matrix = {[self.scene3D.camera3D.modelMatrix getMatrixFloat4x4], [self.modeMatrix getMatrixFloat4x4]};
    [renderEncoder setVertexBytes:&matrix
                           length:sizeof(matrix)
                          atIndex:0];
    
    
    
    NSMutableArray<DualQuatFloat32Array*>* dualQuatFrame = [anim.boneQPAry objectAtIndex:0];
    
 
    
 
    int bb=this._time/([Scene_data default].frameTime*2);
  
    NSLog(@"%f   %d",this._time,bb%(int)dualQuatFrame.count );
    bb=bb%(int)dualQuatFrame.count;
    
    DualQuatFloat32Array*  dualQuatFloat32Array=[dualQuatFrame objectAtIndex:bb];
 
    [renderEncoder setVertexBuffer: dualQuatFloat32Array.mtkquatArr   offset:0   atIndex:5];
    [renderEncoder setVertexBuffer: dualQuatFloat32Array.mtkposArr   offset:0   atIndex:6];
}
 
- (void)setVa;
{
    Display3DBonePartilce* this=self;
   
 
    
    id<MTLRenderCommandEncoder> renderEncoder=this.scene3D.context3D.renderEncoder;
    
   
    
    
    [renderEncoder setCullMode:0];
    
   
    ParticleBoneData* particleBoneData=(ParticleBoneData*)this.data;
    MeshData*  mesh= particleBoneData.meshData;

    
    [renderEncoder setVertexBuffer: mesh.mtkvertices  offset:0  atIndex:1];
    [renderEncoder setVertexBuffer: mesh.mtkuvs  offset:0  atIndex:2];
    [renderEncoder setVertexBuffer: mesh.mtkboneId  offset:0  atIndex:3];
    [renderEncoder setVertexBuffer: mesh.mtkboneWeight   offset:0   atIndex:4];
    
    
    [renderEncoder drawIndexedPrimitives:MTLPrimitiveTypeTriangle
                              indexCount: mesh.mtkindexCount
                               indexType:MTLIndexTypeUInt32
                             indexBuffer: mesh.mtkindexs
                       indexBufferOffset:0];
    
 
    
  
   
}
 
@end
