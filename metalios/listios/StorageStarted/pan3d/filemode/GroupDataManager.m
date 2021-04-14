//
//  GroupDataManager.m
//  iosgl
//
//  Created by zhao on 22/2/2020.
//  Copyright © 2020 zhao. All rights reserved.
//

#import "GroupDataManager.h"
#import "GroupRes.h"
#import "GL_Header.h"

 
@implementation GroupDataManager
 
-(void)getGroupData:(NSString*)url Block:(void (^)(GroupRes * ))block;
{
    //url    __NSCFString *    @"http://jilioss.oss-cn-hongkong.aliyuncs.com/rb_ios/a/res/model/50011_byte.txt"    0x00000002818449c0
    if(self.dic[url]){
        block(self.dic[url]);
    }else{
        GroupRes *groupRes=[[GroupRes alloc]init:self.scene3D];
        [groupRes load:url  Block:^(NSString* value) {
            self.dic[url]=groupRes;
            block(self.dic[url]);
        }];
    }
}
  
@end
