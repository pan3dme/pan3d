//
//  Shader3D.h
//  iosgl
//
//  Created by zhao on 7/12/2019.
//  Copyright © 2019 zhao. All rights reserved.
//

#import "ResCount.h"
#import <GLKit/GLKit.h>

@import MetalKit;
@import GLKit;

@protocol ShaderBind <NSObject>
-(NSString *)getVertexShaderString;
-(NSString *)getFragmentShaderString;
@end



#if !defined(_STRINGIFY)
#define __STRINGIFY( _x )   # _x
#define _STRINGIFY( _x )   __STRINGIFY( _x )
#endif
 
typedef NSString *(^StringifyArrayOfIncludes)(NSArray <NSString *> *includes);
static NSString *(^stringifyHeaderincludeArray)(NSArray <NSString *> *) = ^(NSArray <NSString *> *includes) {
    NSMutableString *importStatements = [NSMutableString new];
    [includes enumerateObjectsUsingBlock:^(NSString * _Nonnull include, NSUInteger idx, BOOL * _Nonnull stop) {
        [importStatements appendString:@"#include <"];
        [importStatements appendString:include];
        [importStatements appendString:@">\n"];
    }];

    return importStatements;
};

typedef NSString *(^StringifyArrayOfHeaderFileNames)(NSArray <NSString *> *headerFileNames);
static NSString *(^stringifyImportsArray)(NSArray *) = ^(NSArray *headerFileNames) {
    NSMutableString *importStatements = [NSMutableString new];
    [headerFileNames enumerateObjectsUsingBlock:^(NSString * _Nonnull headerFileName, NSUInteger idx, BOOL * _Nonnull stop) {
        [importStatements appendString:@"#import "];
        [importStatements appendString:@_STRINGIFY("")];
        [importStatements appendString:headerFileName];
        [importStatements appendString:@_STRINGIFY("")];
        [importStatements appendString:@"\n"];
    }];

    return importStatements;
};



NS_ASSUME_NONNULL_BEGIN

@interface Shader3D : ResCount<ShaderBind>


@property (nonatomic, strong) id<MTLRenderPipelineState> pipelineState;
@property (nonatomic, strong)  id <MTLDepthStencilState> relaxedDepthState;
 

-(void)mtlEncode;
-(void)mtlSetProgramShader;
 
 
@property (nonatomic,assign)  GLuint program;

@property (nonatomic,strong)  NSString* vertex;
@property (nonatomic,strong)  NSString* fragment;
@property (nonatomic,strong)  NSArray<NSNumber*>* paramAry;
 

-(void)encodeVstr:(NSString*)vstr encodeFstr:(NSString*)fstr;
-(NSString *)getVertexShaderString;
-(NSString *)getFragmentShaderString;

-(NSString*)vertexStr;

@end

NS_ASSUME_NONNULL_END
