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
 
@implementation ResManager
 
-(void)loadRoleRes:(NSString*)url fun:(RoleResBfun)fun meshBatchNum:(int)meshBatchNum;
{
    RoleRes* roleRes = [[RoleRes alloc]init:self.scene3D];
     roleRes.meshBatchNum = meshBatchNum;
    [roleRes load:url fun:^(NSString *localPath) {
        fun(roleRes);
    }];
         
}
-(void)loadSkillRes:(NSString*)url fun:(SkillResBfun)fun;
{
   
    SkillRes* skillRes = [[SkillRes alloc]init:self.scene3D];
       [skillRes load:url fun:^(NSString *localPath) {
           fun(skillRes);
       }];
}

 
@end
