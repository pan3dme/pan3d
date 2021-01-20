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
 
 

static NSString * const COMPLETE         =@"complete";

static NSString * const CharAction_stand         =@"stand";
static NSString * const CharAction_walk          =@"walk";
static NSString * const CharAction_jump          =@"jump";
static NSString * const CharAction_death         =@"death";
static NSString * const CharAction_injured       =@"injured";

static NSString * const CharAction_stand_mount_01         =@"stand_mount_01";
static NSString * const CharAction_walk_mount_01          =@"walk_mount_01";

static NSString * const CharAction_attack_01         =@"attack_01";
static NSString * const CharAction_attack_02         =@"attack_02";
static NSString * const CharAction_attack_03         =@"attack_03";
static NSString * const CharAction_attack_010        =@"attack_010";


static NSString * const CharAction_m_attack_01        =@"m_attack_01";
static NSString * const CharAction_m_attack_02        =@"m_attack_02";
static NSString * const CharAction_m_attack_03        =@"m_attack_03";
static NSString * const CharAction_m_attack_04        =@"m_attack_04";

 
/*
 文件地址
 */
#define getSkillUrl(url)(NSString*)[NSString stringWithFormat:@"skill/%@_byte.txt",url]
#define getModelUrl(url)(NSString*)[NSString stringWithFormat:@"model/%@.txt",url]
#define getRoleUrl(url)(NSString*)[NSString stringWithFormat:@"role/%@.txt",url]
#define getMapUrl(url)(NSString*)[NSString stringWithFormat:@"map/%@.txt",url]

/*
 随机函数
 */
#define randomFloat() drand48()
#define randomInt(x) (int)floor(randomFloat()*x)
#define float2int(x)  (int)floor(x)

/*
 Nslog打印提示
 */
#define NSLog(FORMAT, ...) fprintf(stderr,"%s:%d\t%s\n",[[[NSString stringWithUTF8String:__FILE__] lastPathComponent] UTF8String], __LINE__, [[NSString stringWithFormat:FORMAT, ##__VA_ARGS__] UTF8String]);
 

#endif /* GL_Header_h */
