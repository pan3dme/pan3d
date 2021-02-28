//
//  AnimManager.m
//  iosgl
//
//  Created by zhao on 3/4/2020.
//  Copyright © 2020 zhao. All rights reserved.
//

#import "AnimManager.h"
#import "ByteArray.h"
#import "Quaternion.h"
#import "AnimData.h"
#import "ObjectBone.h"
//static AnimManager *instance = nil;
@implementation AnimManager
//+ (instancetype)default{
//    if (instance == nil) {
//
//        instance = [[AnimManager alloc] init];
//    }
//    return instance;
//}
-(AnimData*)readData:(ByteArray*)byte url:(NSString*)url;
{
    NSMutableArray<ObjectBone*>* hierarchyList=[[NSMutableArray alloc]init];
    NSMutableArray<NSMutableArray<NSNumber*>*>* frameAry=[[NSMutableArray alloc]init];
    
    AnimData* animData=[[AnimData alloc]init:self.scene3D];
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
    self.dic[url] = animData;
    return animData;
}
-(AnimData*)getAnimDataImmediate:(NSString*)url;
{
     return self.dic[url];
}
-(NSMutableArray<NSMutableArray<Matrix3D*>*>*)processFrame:(NSMutableArray<NSMutableArray<NSNumber*>*>*)frameAry hierarchyList:(NSMutableArray<ObjectBone*>*)hierarchyList
 
{
    NSMutableArray<NSMutableArray<ObjectBaseBone*>*>* newFrameAry=[[NSMutableArray alloc]init];
    
    for (int i = 0; i < frameAry.count; i++) {
        [newFrameAry addObject:  [self frameToBone:frameAry[i] hierarchyList:hierarchyList]];
     }
    return [self setFrameToMatrix:newFrameAry];
}
-(float) getW:(float)x y:(float)y z:(float)z;
{
    float t = 1 - (x * x + y * y + z * z);
    if(t<0) {
        t = 0;
    }else{
        t = -sqrt(t);
    }
    return t;
}
-(NSMutableArray<NSMutableArray<Matrix3D*>*>*)setFrameToMatrix:(NSMutableArray<NSMutableArray<ObjectBaseBone*>*>*)frameAry;
{
    NSMutableArray<NSMutableArray<Matrix3D*>*>* matrixAry  = [[NSMutableArray alloc]init];
    for (int j = 0; j < frameAry.count; j++) {
        NSMutableArray<ObjectBaseBone*>* boneAry = frameAry[j];
        Quaternion* Q0;;
        Matrix3D* newM  = [[Matrix3D alloc]init];
        NSMutableArray<Matrix3D*>* frameMatrixAry=[[NSMutableArray alloc]init];
        [matrixAry addObject:frameMatrixAry];
        for (int i = 0; i < boneAry.count; i++) {
            ObjectBaseBone* xyzfarme0  = boneAry[i];
            Q0 = [[Quaternion alloc]x:xyzfarme0.qx y:xyzfarme0.qy z:xyzfarme0.qz];
            Q0.w = [self getW:Q0.x y:Q0.y z:Q0.z];
           
            if (xyzfarme0.father == -1) {
                newM = [Q0 toMatrix3D];
                [newM appendTranslation:xyzfarme0.tx y:xyzfarme0.ty z:xyzfarme0.tz];
                [newM appendRotation:-90 axis:Vector3D.X_AXIS];
                [frameMatrixAry addObject:newM];
            } else {
               // ObjectBaseBone* fatherBone   = boneAry[xyzfarme0.father];
                newM = [Q0 toMatrix3D];
                [newM appendTranslation:xyzfarme0.tx y:xyzfarme0.ty z:xyzfarme0.tz];
                [newM append:frameMatrixAry[xyzfarme0.father]];
                [frameMatrixAry addObject:newM];
            }
        }
        for (int i = 0; i < frameMatrixAry.count; i++) {
            [frameMatrixAry[i] appendScale:-1 y:1 z:1]; //特别标记，因为四元数和矩阵运算结果不一  先存正确的矩阵
        }
    }

    return matrixAry;
 
}
 
-(NSMutableArray<ObjectBaseBone*>*)frameToBone:(NSMutableArray<NSNumber*>*)frameData hierarchyList:(NSMutableArray<ObjectBone*>*)hierarchyList ;
{
    NSMutableArray<ObjectBaseBone*>* _arr= [[NSMutableArray alloc]init];
 
    for (int i = 0; i < hierarchyList.count; i++) {
        ObjectBaseBone* _temp = [[ObjectBaseBone alloc]init];
        _temp.father = hierarchyList[i].father;
        int k = 0;
        if (hierarchyList[i].changtype & 1) {
            _temp.tx = [frameData[hierarchyList[i].startIndex + k] floatValue];
            ++k;
        } else {
            _temp.tx = hierarchyList[i].tx;
        }

        if (hierarchyList[i].changtype & 2) {
            _temp.ty = [frameData[hierarchyList[i].startIndex + k]floatValue];
            ++k;
        } else {
            _temp.ty = hierarchyList[i].ty;
        }

        if (hierarchyList[i].changtype & 4) {
            _temp.tz = [frameData[hierarchyList[i].startIndex + k]floatValue];
            ++k;
        } else {
            _temp.tz = hierarchyList[i].tz;
        }

        if (hierarchyList[i].changtype & 8) {
            _temp.qx = [frameData[hierarchyList[i].startIndex + k]floatValue];
            ++k;
        } else {
            _temp.qx = hierarchyList[i].qx;
        }

        if (hierarchyList[i].changtype & 16) {
            _temp.qy = [frameData[hierarchyList[i].startIndex + k]floatValue];
            ++k;
        } else {
            _temp.qy = hierarchyList[i].qy;
        }

        if (hierarchyList[i].changtype & 32) {
            _temp.qz = [frameData[hierarchyList[i].startIndex + k]floatValue];
            ++k;
        } else {
            _temp.qz = hierarchyList[i].qz;
        }
 
        [_arr addObject:_temp];
    }
 
    return _arr;
}
 
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
                    [frameItemAry addObject:[NSNumber numberWithFloat:[byte readShort]/32767.0]];
                }
             
            }
          
        }
    }
    
    
    
}

@end

