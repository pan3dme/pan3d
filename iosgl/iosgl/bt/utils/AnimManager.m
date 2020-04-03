//
//  AnimManager.m
//  iosgl
//
//  Created by zhao on 3/4/2020.
//  Copyright © 2020 zhao. All rights reserved.
//

#import "AnimManager.h"
#import "ByteArray.h"
#import "AnimData.h"
#import "ObjectBone.h"
static AnimManager *instance = nil;
@implementation AnimManager
+ (instancetype)default{
    if (instance == nil) {
        instance = [[AnimManager alloc] init];
    }
    return instance;
}
-(AnimData*)readData:(ByteArray*)byte url:(NSString*)url;
{
    NSMutableArray<ObjectBone*>* hierarchyList=[[NSMutableArray alloc]init];
    NSMutableArray<NSMutableArray<NSNumber*>*>* frameAry=[[NSMutableArray alloc]init];
    
    AnimData* animData=[[AnimData alloc]init];
    animData.inLoop = [byte readInt];
    
    int numLength = [byte readInt];
    for (int i = 0; i < numLength; i++) {
        [animData.inter addObject:[NSNumber numberWithInt:[byte readInt] ]];
    }
    
    numLength = [byte readInt];
    for (int i = 0; i < numLength; i++) {
        [animData.bounds addObject:  [byte readVector3D]];
    }
    animData.nameHeight = [byte readInt];
    numLength = [byte readInt];
    
    for (int i = 0; i < numLength; i++) {
        ObjectBone* objBone  = [[ObjectBone alloc]init];
        objBone.father = [byte readInt];
        objBone.changtype =  [byte readInt];
        objBone.startIndex = [byte readInt];
        
        objBone.tx =  [byte readFloat];
        objBone.ty = [byte readFloat];
        objBone.tz = [byte readFloat];
        
        objBone.qx = [byte readFloat];
        objBone.qy = [byte readFloat];
        objBone.qz =  [byte readFloat];
        
        [hierarchyList addObject:objBone];
    }
    [self readFrameData:byte frameAry:frameAry];
    
    numLength = [byte readInt];
           for (int i = 0; i < numLength; i++) {
               [animData.posAry addObject:[byte readVector3D] ];
           }

   
    animData.matrixAry =   [self processFrame:frameAry hierarchyList:hierarchyList];

         //  this._dic[$url] = animData;
    
    
    return nil;
}
-(NSMutableArray<NSMutableArray<Matrix3D*>*>*)processFrame:(NSMutableArray<NSMutableArray<NSNumber*>*>*)frameAry hierarchyList:(NSMutableArray<ObjectBone*>*)hierarchyList
 
{
    NSMutableArray<NSMutableArray<ObjectBone*>*>* newFrameAry=[[NSMutableArray alloc]init];
    
    for (int i = 0; i < frameAry.count; i++) {
        //  newFrameAry.push(this.frameToBone(frameAry[i], hierarchyList));//
      }
      
    
    
    return nil;
}
/*
private processFrame(frameAry: Array<Array<number>>, hierarchyList: Array<ObjectBone>): Array<Array<Matrix3D>> {
    var newFrameAry: Array<Array<ObjectBaseBone>> = new Array;
    for (var i: number = 0; i < frameAry.length; i++) {
        newFrameAry.push(this.frameToBone(frameAry[i], hierarchyList));
    }
    
    return this.setFrameToMatrix(newFrameAry);
}
*/
-(NSMutableArray<NSNumber*>*)readFrameTypeData:(ByteArray*)byte;
{
    NSMutableArray<NSNumber*>* arr=[[NSMutableArray alloc]init];
    int numLength = [byte readInt];
    for (int i = 0; i < numLength; i++) {
        [arr addObject:[NSNumber numberWithBool:[byte readBoolean]]];
    }
    return arr;
}
 
-(void)readFrameData:(ByteArray*)byte frameAry:(NSMutableArray<NSMutableArray<NSNumber*>*>*)frameAry;
{
    NSMutableArray<NSNumber*>*  frameTyeArr  = [self readFrameTypeData:byte];
    BOOL  isStand = [byte readBoolean];//是否为站立，这里特殊给站立的旋转设置其权重值不压缩
    float  scaleNum = [byte readFloat];
    int numLength = [byte readInt];
    for (int i = 0; i < numLength; i++) {
        int frameItemAryLength   = [byte readInt];
        NSMutableArray<NSNumber*>* frameItemAry =[[NSMutableArray alloc]init];
        [frameAry addObject:frameItemAry];
        for (int j = 0; j < frameItemAryLength; j++) {
            if (frameTyeArr[j].boolValue) {
                [frameItemAry addObject:[NSNumber numberWithFloat:[byte readFloatTwoByte:scaleNum] ]];
            } else {
                if (isStand) {  //注意这里的特殊，针对站立时的旋转精度用浮点
                    [frameItemAry addObject:[NSNumber numberWithFloat:[byte readFloat] ]];
                } else {
                    [frameItemAry addObject:[NSNumber numberWithFloat:[byte readShort]/32767 ]];
                }
             
            }
          
        }
    }
    
    
    
    
    
 /*
 
        for (var i: number = 0; i < numLength; i++) {
            var frameItemAryLength: number = byte.readInt();
            var frameItemAry: Array<number> = new Array;
            frameAry.push(frameItemAry);
            for (var j: number = 0; j < frameItemAryLength; j++) {
                if ($frameTyeArr[j]) {
                    frameItemAry.push(byte.readFloatTwoByte($scaleNum))
                } else {
                    if ($isStand) {  //注意这里的特殊，针对站立时的旋转精度用浮点
                        frameItemAry.push(byte.readFloat())
                    } else {
                        frameItemAry.push(byte.readShort() / 32767)
                    }
                 
                }
              
            }
        }
  */
    

}
/*
 private readFrameData(byte: ByteArray, frameAry: Array<Array<number>>): void
   {
       var $frameTyeArr: Array<boolean> = this.readFrameTypeData(byte)
       var $isStand:boolean = byte.readBoolean() //是否为站立，这里特殊给站立的旋转设置其权重值不压缩
       var $scaleNum: number = byte.readFloat();
       var numLength: number = byte.readInt();
       for (var i: number = 0; i < numLength; i++) {
           var frameItemAryLength: number = byte.readInt();
           var frameItemAry: Array<number> = new Array;
           frameAry.push(frameItemAry);
           for (var j: number = 0; j < frameItemAryLength; j++) {
               if ($frameTyeArr[j]) {
                   frameItemAry.push(byte.readFloatTwoByte($scaleNum))
               } else {
                   if ($isStand) {  //注意这里的特殊，针对站立时的旋转精度用浮点
                       frameItemAry.push(byte.readFloat())
                   } else {
                       frameItemAry.push(byte.readShort() / 32767)
                   }
                
               }
             
           }
       }

   }
 */

/*
 
    

     this.readFrameData(byte, frameAry);

     numLength = byte.readInt();
     for (var i: number = 0; i < numLength; i++) {
         animData.posAry.push(byte.readVector3D());
     }

     animData.matrixAry = this.processFrame(frameAry, hierarchyList);

    

     this._dic[$url] = animData;
     return animData;
 }
 */

@end
