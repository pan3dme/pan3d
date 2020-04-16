//
//  ResManager.m
//  iosgl
//
//  Created by zhao on 2/4/2020.
//  Copyright © 2020 zhao. All rights reserved.
//

#import "ResManager.h"
#import "GL_Header.h"
#import "RoleRes.h"
#import "SkillRes.h"

@interface ResManager()

@end
static ResManager *instance = nil;
@implementation ResManager
+ (instancetype)default{
    if (instance == nil) {
        instance = [[ResManager alloc] init];
    }
    return instance;
}
-(void)loadRoleRes:(NSString*)url fun:(RoleResBfun)fun meshBatchNum:(int)meshBatchNum;
{
    RoleRes* roleRes = [[RoleRes alloc]init];
     roleRes.meshBatchNum = meshBatchNum;
    [roleRes load:url fun:^(NSString *localPath) {
        fun(roleRes);
    }];
         
}
-(void)loadSkillRes:(NSString*)url fun:(SkillResBfun)fun;
{
    /*
   var skillRes: SkillRes = new SkillRes();

       skillRes.load(url, () => {
           $fun(skillRes);
         
       });
    
    */
    
    SkillRes* skillRes = [[SkillRes alloc]init];
       [skillRes load:url fun:^(NSString *localPath) {
           fun(skillRes);
       }];
}

 
@end
