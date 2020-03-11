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
        self.frameTime=0.0f;
    }
    return self;
}
-(NSString*)getWorkUrlByFilePath:(NSString*)value;
{
    NSString* rootUrl=@"https://jilioss.oss-cn-hongkong.aliyuncs.com/rb_ios/%08zhao/RedbagApp/assetfile";
    return [NSString stringWithFormat:@"%@/%@",rootUrl,value];
}
@end
