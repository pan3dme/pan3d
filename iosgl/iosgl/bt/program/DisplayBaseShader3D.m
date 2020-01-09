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
    NSString *fragmentShader= [[NSBundle mainBundle]pathForResource:@"shadertwo" ofType:@"fsh"];
 
    return    fragmentShader;
}
@end
