//
//  Scene_data.m
//  iosgl
//
//  Created by zhao on 1/3/2020.
//  Copyright © 2020 zhao. All rights reserved.
//

#import "Scene_data.h"
static Scene_data *instance = nil;
@implementation Scene_data
+ (instancetype)default{
    if (instance == nil) {
        instance = [[Scene_data alloc] init];
    }
    return instance;
}
- (instancetype)init
{
    self = [super init];
    if (self) {
        self.frameTime=1000.0 / 60.0;
        self.MAX_NUMBER=10000000;
        self.supportBlob=YES;
    }
    return self;
}
-(NSString*)getWorkUrlByFilePath:(NSString*)value;
{
    NSString*   rootUrl=@"https://webpan.oss-cn-shanghai.aliyuncs.com/res";
    return [NSString stringWithFormat:@"%@/%@",rootUrl,value];
}
@end
