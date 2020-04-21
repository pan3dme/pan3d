//
//  Matrix3D.h
//  iosgl
//
//  Created by zhao on 5/12/2019.
//  Copyright © 2019 zhao. All rights reserved.
//

#import <Foundation/Foundation.h>
#import <GLKit/GLKit.h>
#import "Vector3D.h"
#import "Matrix4x4.h"

NS_ASSUME_NONNULL_BEGIN

@interface Matrix3D : NSObject
@property (nonatomic, assign)  Matrix4x4  matrix4x4;
-(void)identity;
-(Matrix3D*)clone;
-(Matrix3D *)clone:(Matrix3D*)value;
-(void)copyTo:(Matrix3D*)target;
-(Matrix3D*)Invert;
-(void) outString;
-(void) appendTranslation:(float  )x  y:(float)y z:(float)z ;
-(void) prependTranslation:(float  )x  y:(float)y z:(float)z  ;
-(void) appendScale:(float  )x  y:(float)y z:(float)z;
-(void) prependScale:(float  )x  y:(float)y z:(float)z;
-(void) appendRotation:(float)rad axis:(Vector3D*)axis;
-(void) prependRotation:(float)rad axis:(Vector3D*)axis;
-(void) prepend :(Matrix3D*)matrx3d;
-(void) append :(Matrix3D*)matrx3d;
-(void)fromVtoV:(Vector3D*)basePos newPos:(Vector3D*)newPos;
-(void) perspectiveFieldOfViewLH:(float)fieldOfViewY  aspectRatio:(float)aspectRatio zNear:(float)zNear zFar:(float)zFar;
-(Vector3D*)transformVector:(Vector3D*)vec3d;
-(GLfloat *)m;
-(GLfloat *)rotationM;
-(Vector3D*)position;
-(void)inputStrData:(NSString*)str;
-(void)identityPostion;
 
@end

NS_ASSUME_NONNULL_END
