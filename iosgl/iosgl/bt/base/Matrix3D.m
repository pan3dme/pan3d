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
#import "Quaternion.h"
#import <GLKit/GLKit.h>


@interface Matrix3D()

@property (nonatomic, assign)  Matrix3x3  matrix3x3;
@end
@implementation Matrix3D
- (instancetype)init
{
    self = [super init];
    if (self) {
        self.matrix4x4=Matrix4x4Zero;
        self.matrix3x3=Matrix3x3Zero;
        [self identity];
    }
    return self;
}
 
-(GLfloat *)m;
{
    return (GLfloat *)&_matrix4x4;
}
 
-(GLfloat *)rotationM;
{
    _matrix3x3.data[0]=_matrix4x4.data[0];
    _matrix3x3.data[1]=_matrix4x4.data[1];
    _matrix3x3.data[2]=_matrix4x4.data[2];
    _matrix3x3.data[3]=_matrix4x4.data[4];
    _matrix3x3.data[4]=_matrix4x4.data[5];
    _matrix3x3.data[5]=_matrix4x4.data[6];
    _matrix3x3.data[6]=_matrix4x4.data[8];
    _matrix3x3.data[7]=_matrix4x4.data[9];
    _matrix3x3.data[8]=_matrix4x4.data[10];
    return (GLfloat *)&_matrix3x3;
}
-(void)fromVtoV:(Vector3D*)basePos newPos:(Vector3D*)newPos;
{
    Vector3D* axis = [basePos cross:newPos];
    double angle = acos([basePos dot:newPos]);
    Quaternion* q=[[Quaternion alloc]init];
    [q fromAxisAngle:axis angle:angle];
    [q toMatrix3D:self];
}

/*
 public fromVtoV($basePos: Vector3D, $newPos: Vector3D): void {
       var axis: Vector3D = $basePos.cross($newPos);
       var angle: number = Math.acos($basePos.dot($newPos));
       var q: Quaternion = new Quaternion();
       q.fromAxisAngle(axis, angle);
       q.toMatrix3D(this);
   }
 */
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
-(Vector3D*)transformVector:(Vector3D*)vec3d;
{
     
    Matrix4x4 mvp= self.matrix4x4;
    Vector3D *out  = [[Vector3D alloc]init];
    out.x = mvp.data[0] * vec3d.x + mvp.data[4] * vec3d.y + mvp.data[8] * vec3d.z + mvp.data[12] * vec3d.w;
    out.y = mvp.data[1] * vec3d.x + mvp.data[5] * vec3d.y + mvp.data[9] * vec3d.z + mvp.data[13] * vec3d.w;
    out.z = mvp.data[2] * vec3d.x + mvp.data[6] * vec3d.y + mvp.data[10] * vec3d.z + mvp.data[14] * vec3d.w;
    out.w = mvp.data[3] * vec3d.x + mvp.data[7] * vec3d.y + mvp.data[11] * vec3d.z + mvp.data[15] * vec3d.w;
    return out;
 
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
-(void)inputStrData:(NSString*)str;
{
    NSArray *array = [str componentsSeparatedByString:@","];
    for(int i=0;i<16;i++){
        _matrix4x4.data[i]=[array[i] floatValue] ;
        
    }
    self.m;
    
    
}

@end
