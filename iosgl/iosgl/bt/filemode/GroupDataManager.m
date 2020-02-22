//
//  GroupDataManager.m
//  iosgl
//
//  Created by zhao on 22/2/2020.
//  Copyright © 2020 zhao. All rights reserved.
//

#import "GroupDataManager.h"
#import "GroupRes.h"

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
 
    GroupRes *group=[[GroupRes alloc]init];
   [group load:url  Block:^(int code) {
       
   }];

    /*
              group.load($url, () => {
                  var ary: Array<Function> = this._loadDic[$url];
                  for (var i: number = 0; i < ary.length; i++) {
                      var fun: Function = ary[i];
                      fun(group);
                  }
                  this._dic[$url] = group;
                  delete this._loadDic[$url];
                  group.initReg();
              })
     */
    
    
}
  
@end
