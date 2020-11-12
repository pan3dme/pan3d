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
 + (NSString *)BYTE_TYPE;
{
    return @"BYTE_TYPE";
}
 + (NSString *)IMG_TYPE;
{
    return @"IMG_TYPE";
}
 + (NSString *)XML_TYPE;
{
    return @"XML_TYPE";
}
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
        for (int i = 0; i < 1; i++) {
            [self.loadThreadList addObject:[[LoaderThread alloc]init] ];
        }
    }
    return self;
}
-(void)loadUrl:(NSString*)url type:(NSString*)type fun:(SuccessBlock)fun;
{
    NSDictionary* a=[[NSDictionary alloc]init];
    ProceeseBlock b=^(int num){};
    [self loadUrl:url type:type fun:fun info:a progressFun:b];
    
}
-(void)loadUrl:(NSString*)url type:(int)type fun:(SuccessBlock)fun info:(NSDictionary*)info progressFun:(ProceeseBlock)progressFun;
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
-(void)loadWaitList;
{
    for (int i = 0; self.waitLoadList.count&&i < self.loadThreadList.count; i++) {
        if (self.loadThreadList[i].idle) {
            LoadInfo* loadInfo=self.waitLoadList[0];
            [self.waitLoadList removeObjectAtIndex:0];
            [self.loadThreadList[i] load:loadInfo] ;
            return;
        }
    }
}
-(void)load:(NSString*)url type:(int)type fun:(void (^)(NSObject* any))fun info:(NSObject*)info progressFun:(ProceeseBlock)progressFun;
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
