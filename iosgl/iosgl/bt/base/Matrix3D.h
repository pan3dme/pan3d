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

NS_ASSUME_NONNULL_BEGIN

@interface Matrix3D : NSObject
 
@property (nonatomic, assign)  BOOL isIdentity;
-(Matrix3D *)clone;
-(void) outString;
-(void) appendTranslation:(float  )x  y:(float)y z:(float)z ;
-(void) prependTranslation:(float  )x  y:(float)y z:(float)z  ;
-(void) appendScale:(float  )x  y:(float)y z:(float)z;
-(void) prependScale:(float  )x  y:(float)y z:(float)z;
-(void) appendRotation:(float)rad axis:(Vector3D*)axis;
-(void) prependRotation:(float)rad axis:(Vector3D*)axis;
-(void) prepend :(Matrix3D*)matrx3d;
-(void) append :(Matrix3D*)matrx3d;
-(void) perspectiveFieldOfViewLH:(float)fieldOfViewY  aspectRatio:(float)aspectRatio zNear:(float)zNear zFar:(float)zFar;
-(GLfloat *)m;
 
@end

NS_ASSUME_NONNULL_END
