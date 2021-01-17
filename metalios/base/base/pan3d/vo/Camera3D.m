//
//  Camera3D.m
//  base
//
//  Created by pan3dme on 2021/1/17.
//

#import "Camera3D.h"
#import "Matrix3D.h"

@implementation Camera3D

- (instancetype)init
{
    self = [super init];
    if (self) {
        [self initData];
    }
    return self;
}
-(void)initData
{
    self.viewMatrix=[[Matrix3D alloc] init];
    [self.viewMatrix perspectiveFieldOfViewLH:1 aspectRatio:1 zNear:1 zFar:10];
    [self.viewMatrix prependTranslation: 0 y:0 z:5.0f];
}
@end
