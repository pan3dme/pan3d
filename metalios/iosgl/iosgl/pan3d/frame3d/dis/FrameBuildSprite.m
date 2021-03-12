//
//  FrameBuildSprite.m
//  iosgl
//
//  Created by pan3dme on 2020/11/16.
//  Copyright © 2020 zhao. All rights reserved.
//
#import "FrameBuildSprite.h"
#import "Scene3D.h"
#import "FrameBuildShader.h"
#import "ProgrmaManager.h"
#import "Context3D.h"
@implementation FrameBuildSprite

- (instancetype)init:(Scene3D *)val
{
    self =[super init:val];
    [self inidShader];
    return self;
}
-(void)inidShader
{
    [self.scene3D.progrmaManager registe:FrameBuildShader.shaderStr shader3d: [[FrameBuildShader alloc]init:self.scene3D]];
    self.shader3d=  [self.scene3D.progrmaManager getProgram:FrameBuildShader.shaderStr];
}

-(void)setFrameNodeUrl:(FrameNodeVo*)nodeVo;
{
    [super setFrameNodeUrl:nodeVo];
    FrameBuildSprite* this=self;
    this.groupItem =[[NSMutableArray alloc] init];
    Display3DSprite* dis =[[Display3DSprite alloc]init:this.scene3D];
    [dis setObjUrl:nodeVo.resurl];
    NSDictionary* info =nodeVo.materialInfoArr[0];
    [dis setPicUrl:  [info valueForKey:@"url"]];
    [this.groupItem addObject:dis];
    
}
- (void)upFrame
{
    FrameBuildSprite* this=self;
    if( this.sceneVisible){
        for (int i=0;i<this.groupItem.count;i++){
            [self drawTempDisplay:this.groupItem[i]];
        }
    }
}

-(void)drawTempDisplay:(Display3DSprite*)display
{
    
    if(display.objData==nil){
        return;
    }
    self.objData= display.objData;
 
    
    
    
    id<MTLRenderCommandEncoder> renderEncoder=self.scene3D.context3D.renderEncoder;
    [self.shader3d mtlSetProgramShader];
    [self setVc];
    
    [renderEncoder setVertexBuffer: self.objData.mtkvertices
                            offset:0
                           atIndex:0];
    
    [renderEncoder setVertexBuffer: self.objData.mtkuvs
                            offset:0
                           atIndex:1];
    
    
      [renderEncoder setFragmentTexture:display.textureRes.mtlTexture
                                atIndex:0];
  
    [renderEncoder drawIndexedPrimitives:MTLPrimitiveTypeTriangle
                              indexCount: self.objData.mtkindexCount
                               indexType:MTLIndexTypeUInt32
                             indexBuffer: self.objData.mtkindexs
                       indexBufferOffset:0];
    
}
- (void)setVc;
{
 
    id<MTLRenderCommandEncoder> renderEncoder=self.scene3D.context3D.renderEncoder;
    [self.scene3D.context3D setMatrixVc:self.scene3D.camera3D.modelMatrix renderEncoder:renderEncoder idx:2];
    [self.scene3D.context3D setMatrixVc: self.posMatrix3d renderEncoder:renderEncoder idx:3];
}
@end
