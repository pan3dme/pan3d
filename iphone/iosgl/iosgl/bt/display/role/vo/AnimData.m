//
//  AnimData.m
//  iosgl
//
//  Created by zhao on 3/4/2020.
//  Copyright © 2020 zhao. All rights reserved.
//

#import "AnimData.h"
#import "SkinMesh.h"
#import "Quaternion.h"
#import "DualQuatFloat32Array.h"

@implementation AnimData

-(void)processMesh:(SkinMesh*)skinMesh;
{
    if (self.hasProcess){
        NSLog(@"has process logic error");
        return;
    }
    for (int i = 0; i < self.matrixAry.count; i++) {
        NSMutableArray<Matrix3D*>* frameAry = self.matrixAry[i];
        for (int j = 0; j < frameAry.count; j++) {
            [frameAry[j]prepend:skinMesh.bindPosMatrixAry[j]];
      
        }
    }
    [self makeFrameDualQuatFloatArray:skinMesh];
    self.hasProcess = YES;
}
-(void)makeFrameDualQuatFloatArray:(SkinMesh*)skinMesh;
{
    AnimData* this=self;
    this.boneQPAry=[[NSMutableArray alloc]init];
          Matrix3D* tempMatrix  = [[Matrix3D alloc]init];
          for (int i  =0; i < skinMesh.meshAry.count; i++)
          {
            NSMutableArray<DualQuatFloat32Array*>* frameDualQuat = [[NSMutableArray alloc]init];
            NSArray<NSNumber*>* newIDBoneArr = skinMesh.meshAry[i].boneNewIDAry;
            for (int j = 0; j < this.matrixAry.count; j++) {
                NSArray<Matrix3D*>* baseBone  = this.matrixAry[j];
                DualQuatFloat32Array* dualQuatFloat32Array = [[DualQuatFloat32Array alloc]init];
   
                GLfloat quat[newIDBoneArr.count * 4];
                GLfloat pos[newIDBoneArr.count * 3];
      
                for (int k = 0; k < newIDBoneArr.count; k++)
                {
                    Matrix3D* m=  [baseBone[newIDBoneArr[k].intValue] clone:tempMatrix];
                    [m appendScale:-1 y:1 z:1];
                    Quaternion* q=[[Quaternion alloc]init];
                    [q fromMatrix:m];
                    Vector3D* p=m.position;
            
                    quat[k * 4 + 0] = q.x;
                    quat[k * 4 + 1] = q.y;
                    quat[k * 4 + 2] = q.z;
                    quat[k * 4 + 3] = q.w;
                    pos[k * 3 + 0] = p.x;
                    pos[k * 3 + 1] = p.y;
                    pos[k * 3 + 2] = p.z;
                }
                NSMutableArray<NSNumber*>* quatArr=[[NSMutableArray alloc]init];
                for(int m=0;m<newIDBoneArr.count * 4;m++){
                    [quatArr addObject:[NSNumber numberWithFloat:quat[m]]];
                }
                dualQuatFloat32Array.quatArr=[[NSArray alloc]initWithArray:quatArr];
                
                NSMutableArray<NSNumber*>* posArr=[[NSMutableArray alloc]init];
                for(int n=0;n<newIDBoneArr.count * 3;n++){
                    [posArr addObject:[NSNumber numberWithFloat:pos[n]]];
                }
                dualQuatFloat32Array.posArr=[[NSArray alloc]initWithArray:posArr];
                
                [frameDualQuat addObject:dualQuatFloat32Array];
           

            }
              [this.boneQPAry addObject:frameDualQuat];

          }
}
 
@end

