//
//  AnimData.m
//  iosgl
//
//  Created by zhao on 3/4/2020.
//  Copyright © 2020 zhao. All rights reserved.
//

#import "AnimData.h"
#import "SkinMesh.h"
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
                
                dualQuatFloat32Array.quat =[Float32Array arrayWithObjects:@0,@0,@0,@0, nil];
                dualQuatFloat32Array.pos =[Float32Array arrayWithObjects:@0,@0,@0, nil];
                
                
                for (int k = 0; k < newIDBoneArr.count; k++)
                {
                    /*
                    var $m: Matrix3D = baseBone[newIDBoneArr[k]].clone(tempMatrix);
                    $m.appendScale(-1,1,1)  //特别标记，因为四元数和矩阵运算结果不一
                    var $q: Quaternion = new Quaternion();
                    $q.fromMatrix($m)
                    var $p: Vector3D = $m.position;
                    $DualQuatFloat32Array.quat[k * 4 + 0] = $q.x
                    $DualQuatFloat32Array.quat[k * 4 + 1] = $q.y
                    $DualQuatFloat32Array.quat[k * 4 + 2] = $q.z
                    $DualQuatFloat32Array.quat[k * 4 + 3] = $q.w

                    $DualQuatFloat32Array.pos[k * 3 + 0] = $p.x;
                    $DualQuatFloat32Array.pos[k * 3 + 1] = $p.y;
                    $DualQuatFloat32Array.pos[k * 3 + 2] = $p.z;

                 */

                }
                [frameDualQuat addObject:dualQuatFloat32Array];

            }
              [this.boneQPAry addObject:frameDualQuat];

          }
}
/*
private makeFrameDualQuatFloatArray($skinMesh: SkinMesh): void
   {
       this.boneQPAry=new Array();
       var tempMatrix:Matrix3D = new Matrix3D();
       for (var i: number = 0; i < $skinMesh.meshAry.length; i++)
       {
           var $frameDualQuat: Array<DualQuatFloat32Array> = new Array;
           var newIDBoneArr: Array< number>= $skinMesh.meshAry[i].boneNewIDAry;
           for (var j: number = 0; j < this.matrixAry.length; j++) {
               var baseBone: Array<Matrix3D> = this.matrixAry[j];
               var $DualQuatFloat32Array: DualQuatFloat32Array = new DualQuatFloat32Array;
               $DualQuatFloat32Array.quat = new Float32Array(newIDBoneArr.length * 4);
               $DualQuatFloat32Array.pos = new Float32Array(newIDBoneArr.length * 3);
               for (var k: number = 0; k < newIDBoneArr.length; k++)
               {
                   var $m: Matrix3D = baseBone[newIDBoneArr[k]].clone(tempMatrix);
                   $m.appendScale(-1,1,1)  //特别标记，因为四元数和矩阵运算结果不一
                   var $q: Quaternion = new Quaternion();
                   $q.fromMatrix($m)
                   var $p: Vector3D = $m.position;
                   $DualQuatFloat32Array.quat[k * 4 + 0] = $q.x
                   $DualQuatFloat32Array.quat[k * 4 + 1] = $q.y
                   $DualQuatFloat32Array.quat[k * 4 + 2] = $q.z
                   $DualQuatFloat32Array.quat[k * 4 + 3] = $q.w

                   $DualQuatFloat32Array.pos[k * 3 + 0] = $p.x;
                   $DualQuatFloat32Array.pos[k * 3 + 1] = $p.y;
                   $DualQuatFloat32Array.pos[k * 3 + 2] = $p.z;

                

               }
               $frameDualQuat.push($DualQuatFloat32Array)

           }
           this.boneQPAry.push($frameDualQuat);

       }

   }
*/
@end
