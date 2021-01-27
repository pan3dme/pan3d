//
//  GC.m
//  iosgl
//
//  Created by pan3dme on 2021/1/27.
//  Copyright © 2021 zhao. All rights reserved.
//

#import "GC.h"

@implementation GC
- (instancetype)init:(Scene3D*)value;

{
    self = [super init];
    if (self) {
        self.mtkScene3D=value;
    }
    return self;
}
@end
