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

static GroupDataManager *instance = nil;
@implementation GroupDataManager
+ (instancetype)default{
    if (instance == nil) {
        instance = [[GroupDataManager alloc] init];
    }
    return instance;
}
- (instancetype)init
{
    self = [super init];
    if (self) {
        self.dic=[[NSMutableDictionary alloc]init];
    }
    return self;
}
-(void)getGroupData:(NSString*)url Block:(void (^)(GroupRes * ))block;
{
    
    if(self.dic[url]){
        block(self.dic[url]);
    }else{
        GroupRes *groupRes=[[GroupRes alloc]init];
        [groupRes load:url  Block:^(NSString* value) {
            self.dic[url]=groupRes;
            block(self.dic[url]);
        }];
    }
}
  
@end
