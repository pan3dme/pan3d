//
//  Display3D.m
//  base
//
//  Created by pan3dme on 2021/1/17.
//

#import "Display3D.h"

@implementation Display3D
- (instancetype)init:(Scene3D*)value
{
    self = [super init];
    if (self) {
        self.scene3D=value;
    }
    return self;
}
@end
