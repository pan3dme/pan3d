//
//  LoadManager.m
//  iosgl
//
//  Created by zhao on 9/3/2020.
//  Copyright © 2020 zhao. All rights reserved.
//

#import "LoadManager.h"
#import "ByteArray.h"
#import "LoaderThread.h"
#import "LoadInfo.h"
#import "GL_Header.h"
#import "AFNetworking.h"
@interface LoadManager()
@property (nonatomic, strong) NSMutableArray<LoaderThread*>* loadThreadList;
@property (nonatomic, strong) NSMutableArray<LoadInfo*>* waitLoadList;
@end

static LoadManager *instance = nil;
@implementation LoadManager
 
+ (instancetype)default{
    if (instance == nil) {
        instance = [[LoadManager alloc] init];
    }
    return instance;
}
- (instancetype)init
{
    self = [super init];
    if (self) {
        self.loadThreadList=[[NSMutableArray alloc]init];
        self.waitLoadList=[[NSMutableArray alloc]init];
        for (int i = 0; i < 10; i++) {
            [self.loadThreadList addObject:[[LoaderThread alloc]init] ];
        }
    }
    return self;
}
-(void)load:(NSString*)url type:(int)type fun:(SuccessBlock)fun info:(NSDictionary*)info progressFun:(ProceeseBlock)progressFun;
{
    
    LoadInfo* loadInfo= [[LoadInfo alloc]initUrl:url type:type  fun:fun info:info progressFun:progressFun];
       for (int i = 0; i < self.loadThreadList.count; i++) {
           if (self.loadThreadList[i].idle) {
              [self.loadThreadList[i] load:loadInfo] ;
               return;
           }
       }
    [self.waitLoadList addObject:loadInfo];
 
    
   
}
 



@end
