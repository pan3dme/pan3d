//
//  SceneInfoVo.m
//  iosgl
//
//  Created by pan3dme on 2021/3/29.
//  Copyright © 2021 zhao. All rights reserved.
//

#import "SceneInfoVo.h"

@implementation SceneInfoVo
- (instancetype)init:(NSDictionary*)val;
{
     
    self = [super init];
    if (self) {
        self.data=val;
        self.id=[[val valueForKey:@"id"]intValue];
        self.type=[[val valueForKey:@"type"]intValue];
        self.text=[val valueForKey:@"text"];
        self.info=[val valueForKey:@"info"];
   
 
    }
    return self;
}
@end
