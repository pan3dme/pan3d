//
//  BuildDisplay3DSprite.h
//  iosgl
//
//  Created by zhao on 24/4/2020.
//  Copyright © 2020 zhao. All rights reserved.
//

#import "Display3DSprite.h"

NS_ASSUME_NONNULL_BEGIN
@interface BuildDisplay3DLightUvShader : Shader3D
+(NSString*)shaderStr;
@end

@interface BuildDisplay3DSprite : Display3DSprite
-(void) setInfo:(NSDictionary*)value;
@end

NS_ASSUME_NONNULL_END
