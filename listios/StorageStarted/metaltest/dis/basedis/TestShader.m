//
//  TestShader.m
//  iosgl
//
//  Created by pan3dme on 2021/2/22.
//  Copyright © 2021 zhao. All rights reserved.
//

#import "TestShader.h"
#import "Scene3D.h"

@interface TestShader ()

 
@property (nonatomic, strong) id<MTLLibrary> library;

  
@end

@implementation TestShader


#if !defined(_STRINGIFY)
#define __STRINGIFY( _x )   # _x
#define _STRINGIFY( _x )   __STRINGIFY( _x )
#endif

typedef NSString *(^StringifyArrayOfIncludes)(NSArray <NSString *> *includes);
static NSString *(^stringifyHeaderFileNamesArray)(NSArray <NSString *> *) = ^(NSArray <NSString *> *includes) {
    NSMutableString *importStatements = [NSMutableString new];
    [includes enumerateObjectsUsingBlock:^(NSString * _Nonnull include, NSUInteger idx, BOOL * _Nonnull stop) {
        [importStatements appendString:@"#include <"];
        [importStatements appendString:include];
        [importStatements appendString:@">\n"];
    }];

    return [NSString new];
};

typedef NSString *(^StringifyArrayOfHeaderFileNames)(NSArray <NSString *> *headerFileNames);
static NSString *(^stringifyIncludesArray)(NSArray *) = ^(NSArray *headerFileNames) {
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

- (NSString *)shaderccav
{
//    NSString *includes = stringifyIncludesArray(@[@"metal_stdlib",  @"simd/simd.h"]);
//    NSString *imports  = stringifyHeaderFileNamesArray(@[@"TestShader.h"]);
    
    NSString *includes = stringifyIncludesArray(@[@"metal_stdlib" ]);
    NSString *imports  = stringifyHeaderFileNamesArray(@[@"TestShader.h"]);
    
    includes=@"";
    imports=@"";
    NSString *code     = [NSString stringWithFormat:@"%s",
                          _STRINGIFY(
                                     using namespace metal;

                                     
                                     typedef struct
                                     {
        float3 position;
                                     } BaseFloat3;

                                     typedef struct
                                     {
        float4x4 matrix;
                                     }  BaseMatrix;
                                     
                                     typedef struct
                                     {
                                         float4 clipSpacePosition [[position]];
                                      
                                         
                                     } OutData;
                                     
                                     




                                     vertex OutData // 顶点
                                     vertexShader001(uint vertexID [[ vertex_id ]],
                                                  constant BaseFloat3 *vertexArray [[ buffer(0) ]],
                                                     constant BaseMatrix *projectionMatrix [[ buffer(1) ]],
                                                     constant BaseMatrix *modelViewMatrix [[ buffer(2) ]]) {
 
        OutData out;
                                         out.clipSpacePosition =  projectionMatrix->matrix * modelViewMatrix->matrix * float4(vertexArray[vertexID].position, 1);
                                      
                                         
                                         return out;
                                     }
                                      
                                     fragment float4 // 片元
                                     fragmentShader001(OutData input [[stage_in]],
                                                    texture2d<half> textureColor [[ texture(0) ]])
                                     {
//        float abc=sin(0.2f);
        float cc=max(1.f,0.2f);
                                         half4 colorTex = half4(cc, 0,0, 1);
                                         return float4(colorTex);
                                     }

                                     )];

    return [NSString stringWithFormat:@"%@\n%@\n%@", includes, imports, code];
}

-(void)mtlEncode
{
    
    MTKView *mtkView=self.scene3D.context3D. mtkView;
    

    /*
    * Metal setup: Library
    */
    __autoreleasing NSError *error = nil;

    NSString* librarySrc = [self shaderccav];
    if(!librarySrc) {
        [NSException raise:@"Failed to read shaders" format:@"%@", [error localizedDescription]];
    }

    _library = [mtkView.device newLibraryWithSource:librarySrc options:nil error:&error];
    if(!_library) {
        [NSException raise:@"Failed to compile shaders" format:@"%@", [error localizedDescription]];
    }

    id <MTLFunction> vertexProgram = [_library newFunctionWithName:@"vertexShader001"];
    id <MTLFunction> fragmentProgram = [_library newFunctionWithName:@"fragmentShader001"];
    
 
}

@end
