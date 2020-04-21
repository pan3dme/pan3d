//
//  GL_Header.h
//  iosgl
//
//  Created by zhao on 11/3/2020.
//  Copyright © 2020 zhao. All rights reserved.
//
#import "Material.h"
#ifndef GL_Header_h
#define GL_Header_h
typedef struct {
    float data[3];
} numDATA;
typedef void (^SuccessBlock)(NSString* localPath);
typedef void (^FinishBlock)(NSDictionary* dic);
typedef void (^FailureBlock)(NSError *error);
typedef void (^ProceeseBlock)(int);

typedef void (^SuccessMaterial)(NSObject* obj);
//typedef void (^SuccessMaterialInfo)(Material* material,NSObject* info);


 
#define getSkillUrl(url)(NSString*)[NSString stringWithFormat:@"skill/%@_byte.txt",url]
#define getModelUrl(url)(NSString*)[NSString stringWithFormat:@"model/%@.txt",url]
#define randomFloat() drand48()
#define randomInt(x) (int)floor(randomFloat()*x)
#define float2int(x)  (int)floor(x)


#define NSLog(FORMAT, ...) fprintf(stderr,"%s:%d\t%s\n",[[[NSString stringWithUTF8String:__FILE__] lastPathComponent] UTF8String], __LINE__, [[NSString stringWithFormat:FORMAT, ##__VA_ARGS__] UTF8String]);
 

#endif /* GL_Header_h */
