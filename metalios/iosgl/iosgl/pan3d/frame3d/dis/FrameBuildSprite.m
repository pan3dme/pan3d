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
    ObjData* objData= display.objData;
    FrameBuildSprite* this=self;
    
    NSLog(@"这里了这里了");
    
    /*
    
    Context3D *ctx=this.scene3D.context3D;
    GLuint progame= self.shader3d.program;
    glUseProgram(progame);
    
    [self setVc];
    [ctx pushVa:objData.verticesBuffer];
    [ctx setVaOffset:this.shader3d name:"vPosition" dataWidth:3 stride:0 offset:0];
    [ctx pushVa:objData.uvBuffer];
    [ctx setVaOffset:this.shader3d name:"texcoord" dataWidth:2 stride:0 offset:0];
    [ctx setRenderTexture:self.shader3d name:@"fs0"  texture:display.textureRes.textTureLuint level:0];
    [ctx drawCall: objData.indexBuffer  numTril:objData.trinum];
    */
    
}
- (void)setVc;
{
    FrameBuildSprite* this=self;
    /*
    Context3D *context3D=this.scene3D.context3D;
    Matrix3D* viewM=this.viewMatrix;
    [context3D setVcMatrix4fv:this.shader3d name:"vpMatrix3D" data:viewM.m];
    [context3D setVcMatrix4fv:this.shader3d name:"posMatrix3D" data:this.posMatrix3d.m];
     */
}
@end
