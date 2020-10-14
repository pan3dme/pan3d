//
//  Rectangle.m
//  iosgl
//
//  Created by zhao on 30/12/2019.
//  Copyright © 2019 zhao. All rights reserved.
//

#import "Rectangle.h"

@implementation Rectangle
- (instancetype)init
{
    self = [super init];
    if (self) {
         _x=0;
         _y=0;
         _height=0;
         _weight=1;
    }
    return self;
}
- (instancetype)x:(float)x y:(float)y  width:(float)w height:(float)h;
{
    _x=x;
    _y=y;
    _height=h;
    _weight=w;
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
-(void)setWeight:(float)value;{
      _weight=value;
}
-(float)weight;{
       return _weight;
}
-(void)setHeight:(float)value;{
      _height=value;
}
-(float)height;{
       return _height;
}

@end
