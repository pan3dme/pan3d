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

typedef void (^SuccessBlock)(NSString* localPath);
typedef void (^FinishBlock)(NSDictionary* dic);
typedef void (^FailureBlock)(NSError *error);
typedef void (^ProceeseBlock)(int);

typedef void (^SuccessMaterial)(Material* material);
typedef void (^SuccessMaterialInfo)(Material* material,NSObject* info);

#endif /* GL_Header_h */
