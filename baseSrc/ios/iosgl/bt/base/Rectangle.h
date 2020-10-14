//
//  Rectangle.h
//  iosgl
//
//  Created by zhao on 30/12/2019.
//  Copyright © 2019 zhao. All rights reserved.
//

#import <Foundation/Foundation.h>

NS_ASSUME_NONNULL_BEGIN

@interface Rectangle : NSObject
{
float _x;
float _y;
float _height;
float _weight;
 
 }
- (instancetype)x:(float)x y:(float)y  width:(float)w height:(float)h;
-(void)setX:(float)value;
-(float)x;
-(void)setY:(float)value;
-(float)y;
-(void)setWeight:(float)value;
-(float)weight;
-(void)setHeight:(float)value;
-(float)height;
@end

NS_ASSUME_NONNULL_END
