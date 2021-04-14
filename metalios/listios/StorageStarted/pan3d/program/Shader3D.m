//
//  Shader3D.m
//  iosgl
//
//  Created by zhao on 7/12/2019.
//  Copyright © 2019 zhao. All rights reserved.
//
#import <GLKit/GLKit.h>
#import "Shader3D.h"
#import "Scene3D.h"

@implementation Shader3D


-(void)mtlEncode;
{
    
}
 
-(void)mtlSetProgramShader
{
   id<MTLRenderCommandEncoder> renderEncoder= self.scene3D.context3D.renderEncoder;
   [renderEncoder setRenderPipelineState:self.pipelineState];
   [renderEncoder setDepthStencilState:self.relaxedDepthState];
   [renderEncoder setFrontFacingWinding:MTLWindingCounterClockwise];
   [renderEncoder setCullMode:MTLCullModeNone];
 
}
-(void)encodeVstr:(NSString*)vstr encodeFstr:(NSString*)fstr;
{
    
   
}
-(NSString*)vertexStr;
{
    if(self.vertex){
        return self.vertex;
    }else{
        return [self getVertexShaderString];
    }
}
-(void)compileShaderStr:(GLuint *)shader type:(GLenum)type str:(NSString *)str;
{
     
    
}
-(NSString *)getVertexShaderString;{
    return   @"";
}
-(NSString *)getFragmentShaderString;{
    return  @"";
}
@end
