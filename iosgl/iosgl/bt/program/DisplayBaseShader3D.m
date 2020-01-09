//
//  DisplayBaseShader3D.m
//  iosgl
//
//  Created by zhao on 7/12/2019.
//  Copyright © 2019 zhao. All rights reserved.
//

#import "DisplayBaseShader3D.h"

@implementation DisplayBaseShader3D
-(NSString *)getVertexShaderString;{
    NSString *vertexShader= [[NSBundle mainBundle]pathForResource:@"shadertwo" ofType:@"vsh"];
 
    return   vertexShader;
}
-(NSString *)getFragmentShaderString;{
     char* relplayChat =
    "varying lowp vec2 varyTextCoord;\n"
    "uniform sampler2D colorMap;\n"
    "void main()"
    "{"
    "gl_FragColor = vec4(1.0, 0.0, 0.0, 1.0);\n"
    "}";
    return    [ NSString stringWithFormat:@"%s" ,relplayChat];
}
@end
