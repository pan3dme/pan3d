//
//  FrameLinePointVo.m
//  iosgl
//
//  Created by pan3dme on 2020/11/16.
//  Copyright © 2020 zhao. All rights reserved.
//

#import "FrameLinePointVo.h"

@implementation FrameLinePointVo
-(void)writeObject:(NSDictionary*)val ;
{
    FrameLinePointVo* this=self;
    
    this.time = [[val valueForKey:@"time"]intValue];
    
    this.iskeyFrame = [[val valueForKey:@"iskeyFrame"]boolValue];
    this.isAnimation =[[val valueForKey:@"isAnimation"]boolValue];
    
    this.x =  [[val valueForKey:@"x"]floatValue]/ 10;
    this.y =  [[val valueForKey:@"y"]floatValue]  / 10;
    this.z =   [[val valueForKey:@"z"]floatValue]  / 10;
    
    this.scaleX =  [[val valueForKey:@"scaleX"]floatValue] / 10;
    this.scaleY =  [[val valueForKey:@"scaleY"]floatValue]/ 10;
    this.scaleZ =   [[val valueForKey:@"scaleZ"]floatValue] / 10;
    
    this.rotationX =  [[val valueForKey:@"rotationX"]floatValue];
    this.rotationY =  [[val valueForKey:@"rotationY"]floatValue] ;
    this.rotationZ =   [[val valueForKey:@"rotationZ"]floatValue];
    this.data = [val valueForKey: @"data"];
 

}
@end
