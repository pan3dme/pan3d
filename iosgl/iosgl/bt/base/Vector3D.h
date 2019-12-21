//
//  Vector3D.h
//  iosgl
//
//  Created by zhao on 5/12/2019.
//  Copyright © 2019 zhao. All rights reserved.
//

#import <Foundation/Foundation.h>

NS_ASSUME_NONNULL_BEGIN
 
@interface Vector3D : NSObject
 {
float _x;
float _y;
float _z;
float _w;
 
 }
-(void)setX:(float)value;
-(float)x;
-(void)setY:(float)value;
-(float)y;
-(void)setZ:(float)value;
-(float)z;
-(void)setW:(float)value;
-(float)w;
//@property (nonatomic, assign)  float x;
//@property (nonatomic, assign)  float y;
//@property (nonatomic, assign)  float z;
//@property (nonatomic, assign)  float w;

 
+ (Vector3D *)X_AXIS;
+ (Vector3D *)Y_AXIS;
+ (Vector3D *)Z_AXIS;
- (instancetype)x:(float)x y:(float)y z:(float)z w:(float)w;

 
@end

NS_ASSUME_NONNULL_END
