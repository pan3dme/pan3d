//
//  ResGC.m
//  base
//
//  Created by pan3dme on 2021/1/17.
//

#import "ResGC.h"

@implementation ResGC
- (instancetype)init
{
    self = [super init];
    if (self) {
           self.dic=[[NSMutableDictionary alloc]init];
    }
    return self;
}
@end
