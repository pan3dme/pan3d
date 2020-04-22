//
//  TexItem.m
//  iosgl
//
//  Created by zhao on 9/3/2020.
//  Copyright © 2020 zhao. All rights reserved.
//

#import "TexItem.h"
@interface TexItem()
@property (nonatomic, assign)  int  idx;
@end
@implementation TexItem

+(int)LIGHTMAP;
{
    return 1;
}
+(int)LTUMAP;
{
    return 2;
}
+(int)CUBEMAP;
{
    return 3;
}
+(int)HEIGHTMAP;
{
    return 4;
}
+(int)REFRACTIONMAP;
{
    return 5;
}
 

- (instancetype)init
{
    self = [super init];
    if (self) {
         
    }
    return self;
}
-(void)setId:(int)id;
{
    _idx=id;
    self.name =[NSString stringWithFormat:@"fs%d",_idx];
}
-(int)id;
{
    return _idx;
}
@end
