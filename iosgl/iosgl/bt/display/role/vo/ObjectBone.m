//
//  ObjectBone.m
//  iosgl
//
//  Created by zhao on 3/4/2020.
//  Copyright © 2020 zhao. All rights reserved.
//

#import "ObjectBone.h"

@implementation ObjectBone
-(ObjectBone*)clone
{
    ObjectBone* this=self;
    ObjectBone* newBone =[[ObjectBone alloc] init];
           newBone.tx = this.tx;
           newBone.ty = this.ty;
           newBone.tz = this.tz;
//           newBone.tw = this.tw;
           newBone.qx = this.qx;
           newBone.qy = this.qy;
           newBone.qz = this.qz;
           newBone.qw = this.qw;
           newBone.changtype = this.changtype;
           newBone.name = this.name;
           newBone.father = this.father;
           newBone.startIndex = this.startIndex;
           newBone.matrix = this.matrix;
           return newBone;
}
@end
