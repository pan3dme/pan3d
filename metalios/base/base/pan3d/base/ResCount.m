//
//  ResCount.m
//  base
//
//  Created by pan3dme on 2021/1/17.
//

#import "ResCount.h"

@implementation ResCount
- (instancetype)init:(Scene3D*)value
{
    self = [super init];
    if (self) {
        self.scene3D=value;
    }
    return self;
}
@end
