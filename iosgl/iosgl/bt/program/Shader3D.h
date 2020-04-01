//
//  Shader3D.h
//  iosgl
//
//  Created by zhao on 7/12/2019.
//  Copyright © 2019 zhao. All rights reserved.
//

#import "ResCount.h"
#import <GLKit/GLKit.h>
NS_ASSUME_NONNULL_BEGIN

@interface Shader3D : ResCount
 
@property (nonatomic,assign)  GLuint program;

@property (nonatomic,strong)  NSString* vertex;
@property (nonatomic,strong)  NSString* fragment;
@property (nonatomic,strong)  NSArray<NSNumber*>* paramAry;
 

-(void)encodeVstr:(NSString*)vstr encodeFstr:(NSString*)fstr;
-(NSString *)getVertexShaderString;
-(NSString *)getFragmentShaderString;

@end

NS_ASSUME_NONNULL_END
