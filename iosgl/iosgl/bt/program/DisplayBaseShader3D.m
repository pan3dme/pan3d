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
    return    [[NSBundle mainBundle]pathForResource:@"shaderv" ofType:@"vsh"];
}
-(NSString *)getFragmentShaderString;{
    return    [[NSBundle mainBundle]pathForResource:@"shaderf" ofType:@"fsh"];
}
@end
