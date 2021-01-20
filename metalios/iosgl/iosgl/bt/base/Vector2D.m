//
//  Vector2D.m
//  iosgl
//
//  Created by zhao on 29/2/2020.
//  Copyright © 2020 zhao. All rights reserved.
//

#import "Vector2D.h"

@implementation Vector2D
- (instancetype)x:(float)x y:(float)y ;
{
    _x=x;
    _y=y;
  
    return self;
}
-(void)setX:(float)value; {
    _x=value;
}
-(float)x;{
    return _x;
}
-(void)setY:(float)value;{
      _y=value;
}
-(float)y;{
       return _y;
}
@end
