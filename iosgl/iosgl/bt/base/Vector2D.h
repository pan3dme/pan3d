//
//  Vector2D.h
//  iosgl
//
//  Created by zhao on 29/2/2020.
//  Copyright © 2020 zhao. All rights reserved.
//

#import <Foundation/Foundation.h>

NS_ASSUME_NONNULL_BEGIN

@interface Vector2D : NSObject
 {
    float _x;
    float _y;
 }
- (instancetype)x:(float)x y:(float)y ;
-(void)setX:(float)value;
-(float)x;
-(void)setY:(float)value;
-(float)y;
 
 
@end
NS_ASSUME_NONNULL_END
