//
//  Matrix3D.m
//  iosgl
//
//  Created by zhao on 5/12/2019.
//  Copyright © 2019 zhao. All rights reserved.
//

#import "Matrix3D.h"
#import "Vector3D.h"
#import "Matrix4x4.h"
#import <GLKit/GLKit.h>


@interface Matrix3D()
@property (nonatomic, assign)  Matrix4x4  matrix4x4;
@end
@implementation Matrix3D
- (instancetype)init
{
    self = [super init];
    if (self) {
        self.matrix4x4=Matrix4x4Zero;
        [self identity];
    }
    return self;
}
 
-(GLfloat *)m;
{
    return (GLfloat *)&_matrix4x4;
}
-(void)identity
{
    self.matrix4x4=Matrix4x4Identity;
}
-(void)outString{
}
-(void) appendTranslation:(float  )x  y:(float)y z:(float)z ;
{
    Matrix3D *tempM= [[Matrix3D alloc]init];
    [tempM prependTranslation:x y:y z:z];
    [self append:tempM];
}
-(void) perspectiveFieldOfViewLH:(float)fieldOfViewY  aspectRatio:(float)aspectRatio zNear:(float)zNear zFar:(float)zFar;
{
    float yScale = 1.0 / tan(fieldOfViewY / 2.0);
    float xScale = yScale / aspectRatio;
    self.matrix4x4 = Matrix4x4Make
    (xScale,0,0,0,0,yScale,0,0,0,0,zFar / (zFar - zNear),1,0,0,(zNear * zFar) / (zNear - zFar),0);
}

-(void)append :(Matrix3D*)matrx3d;
{
    Matrix3D *tempM= [[Matrix3D alloc]init];
    tempM.matrix4x4= Matrix4x4clone(matrx3d.matrix4x4);
    [tempM prepend:self];
    self.matrix4x4= Matrix4x4clone(tempM.matrix4x4);
}
-(Matrix3D *)clone;
{
    Matrix3D *tempM= [[Matrix3D alloc]init];
    tempM.matrix4x4=Matrix4x4clone(self.matrix4x4);
    return tempM;
}
-(void)  appendRotation:(float)rad axis:(Vector3D*)axis;
{
    Matrix3D *tempM=[[Matrix3D alloc]init];
    [tempM prependRotation: rad axis:axis];
    [self append:tempM];
}

-(void) appendScale:(float  )x  y:(float)y z:(float)z;
{
    Matrix3D *tempM=[[Matrix3D alloc]init];
    [tempM prependScale: x y:y z:z];
    [self append:tempM];
}
-(void)prepend:(Matrix3D*)matrx3d;
{
    self.matrix4x4=Matrix4x4Multiply( self.matrix4x4,  matrx3d.matrix4x4);
}
-(void)prependTranslation:(float  )x  y:(float)y z:(float)z ;
{
    self.matrix4x4=   Matrix4x4Translate(self.matrix4x4,x,y,z);
}
-(void)prependRotation:(float)rad axis:(Vector3D*)axis;
{
    self.matrix4x4=  Matrix4x4Rotate(self.matrix4x4,rad,axis.x,axis.y,axis.z);
}
-(void)prependScale:(float  )x  y:(float)y z:(float)z ;
{
    self.matrix4x4= Matrix4x4Scale(self.matrix4x4,x,y,z);
};

@end
