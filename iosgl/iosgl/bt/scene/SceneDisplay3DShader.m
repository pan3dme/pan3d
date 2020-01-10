//
//  SceneDisplay3DShader.m
//  iosgl
//
//  Created by zhao on 10/1/2020.
//  Copyright © 2020 zhao. All rights reserved.
//

#import "SceneDisplay3DShader.h"

@implementation SceneDisplay3DShader
-(NSString *)getVertexShaderString;{
    char* relplayChat =
    "attribute vec3 position;\n"
    "attribute vec2 textCoordinate;\n"
    "uniform mat4 posMatrix;\n"
    "varying lowp vec2 varyTextCoord;\n"
    "void main()"
    "{"
        "varyTextCoord = textCoordinate;\n"
        "vec4 vPos = vec4(position.xyz,1.0);\n"
        "gl_Position = vPos * posMatrix;\n"
    "}";
    return    [ NSString stringWithFormat:@"%s" ,relplayChat];
    
}
-(NSString *)getFragmentShaderString;{
    char* relplayChat =
    "varying lowp vec2 varyTextCoord;\n"
    "uniform sampler2D colorMap;\n"
    "void main()"
    "{"
        "gl_FragColor = vec4(1.0, 1.0, 0.0, 1.0);\n"
    "}";
    return    [ NSString stringWithFormat:@"%s" ,relplayChat];
}
@end
 
