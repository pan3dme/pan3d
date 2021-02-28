//
//  MeshImportSort.m
//  iosgl
//
//  Created by pan3dme on 2020/11/12.
//  Copyright © 2020 zhao. All rights reserved.
//

#import "MeshImportSort.h"
#import "ObjectWeight.h"
#import "MeshToObjUtils.h"
#import "ObjectUv.h"
#import "ObjectWeight.h"
#import "MeshData.h"
#import "ObjectTri.h"

@implementation MeshImportSort
-(void)processMesh:(Md5MeshData*)meshData
{
    
    NSMutableArray* weightAry  = [[NSMutableArray alloc]init];
    for (int i = 0; i < meshData.weightItem.count; i++) {
        [weightAry addObject:     [((ObjectWeight*)(meshData.weightItem[i])) clone]];
    }
    NSArray* mapkeyAry  = [self getMapValue:meshData.boneItem];
    for (int i = 0; i < weightAry.count; i++) {
        int boneId=[mapkeyAry[((ObjectWeight*)(weightAry[i])).boneId] intValue];
        ((ObjectWeight*) weightAry[i]).boneId=[mapkeyAry[boneId] intValue];
    }
    meshData.weightItem = weightAry;
    [self processForAgal:meshData];
    
}
-(int)indexOf:(NSArray*)arr find:(NSObject*)find
{
    NSInteger idx=[arr indexOfObject:find];
    if(idx>arr.count){
        return -1;
    }else{
        return (int)idx;
    }
}
-(void)processForAgal:(Md5MeshData*)meshData
{
    int beginKey = 1;
    NSArray* uvItem= meshData.uvItem;//: Array<ObjectUv>
    NSArray* weightItem = meshData.weightItem;// Array<ObjectWeight>
    NSArray* triItem = meshData.triItem; //Array<ObjectTri>
    NSMutableArray* uvArray  = [[NSMutableArray alloc]init];
//    NSMutableArray* ary= [[NSMutableArray alloc]init];//Array<Array<number>>
    
    NSArray *ary = @[[[NSMutableArray alloc]init], [[NSMutableArray alloc]init], [[NSMutableArray alloc]init], [[NSMutableArray alloc]init]];
    
    
    NSMutableArray* boneWeightAry=[[NSMutableArray alloc]init];
    NSMutableArray* bonetIDAry=[[NSMutableArray alloc]init];
    NSMutableArray* indexAry=[[NSMutableArray alloc]init];
    
    int skipNum;
    int beginIndex;
    int allNum;
    
    NSMutableArray* boneUseAry = [[NSMutableArray alloc]init];
    
    for (int i = 0; i < uvItem.count; i++) {
        beginIndex = ((ObjectUv*)(uvItem[i])).a;
        allNum = ((ObjectUv*)(uvItem[i])).b;
        for (skipNum = 0; skipNum < 4; skipNum++) {
            if (skipNum < allNum) {
                int boneId=((ObjectWeight*)(weightItem[beginIndex + skipNum])).boneId;
                [boneUseAry addObject: [NSNumber numberWithInt:boneId]];
            } else {
                [boneUseAry addObject:boneUseAry[0]];
            }
        }
    }
    boneUseAry = [self getboneNum:boneUseAry];
    for (int i = 0; i < uvItem.count; i++) {
        ObjectUv* objectUv=   uvItem[i];
        beginIndex = objectUv.a;
        allNum =objectUv.b;
        for (skipNum = 0; skipNum < 4; skipNum++) {
            if (skipNum < allNum) {
                ObjectWeight* objectWeight=weightItem[beginIndex + skipNum];
                [ary[skipNum] addObject:[NSNumber numberWithFloat:objectWeight.x ]];
                [ary[skipNum] addObject:[NSNumber numberWithFloat:objectWeight.y ]];
                [ary[skipNum] addObject:[NSNumber numberWithFloat:objectWeight.z ]];
                int idx=[self indexOf: boneUseAry find:[NSNumber numberWithInteger:objectWeight.boneId]];
                [bonetIDAry addObject:[NSNumber numberWithInt:idx]];
                [boneWeightAry addObject:[NSNumber numberWithFloat:objectWeight.w]];
                
            } else {
                [ary[skipNum] addObject:[NSNumber numberWithFloat:0]];
                [ary[skipNum] addObject:[NSNumber numberWithFloat:0]];
                [ary[skipNum] addObject:[NSNumber numberWithFloat:0]];
                int idx=[self indexOf: boneUseAry find:[NSNumber numberWithInteger:0]];
                [bonetIDAry addObject:[NSNumber numberWithInt: idx]];
                [boneWeightAry addObject:[NSNumber numberWithFloat:0]];
            }
        }
        [uvArray addObject:[NSNumber numberWithFloat:objectUv.x]];
        [uvArray addObject:[NSNumber numberWithFloat:objectUv.y]];
    
    }
    meshData.boneNewIDAry = boneUseAry;
    
    for (int i = 0; i < triItem.count; i++) {
        ObjectTri* objectTri =  triItem[i];
 
        [indexAry addObject:[NSNumber numberWithInt:objectTri.t0]];
        [indexAry addObject:[NSNumber numberWithInt:objectTri.t1]];
        [indexAry addObject:[NSNumber numberWithInt:objectTri.t2]];
        
    }
    meshData.faceNum = (int)(indexAry.count / 3);
    meshData.trinum = (int)indexAry.count;
    [self uplodToGpu:meshData uvArray:uvArray ary:ary boneWeightAry:boneWeightAry bonetIDAry:bonetIDAry indexAry:indexAry];
    
 
    
}
-(void)uplodToGpu:(MeshData*)meshData uvArray:(NSArray*)uvArray  ary:(NSArray*)ary  boneWeightAry:(NSArray*)boneWeightAry  bonetIDAry:(NSArray*)bonetIDAry indexAry:(NSArray*)indexAry
{
    meshData.boneWeightAry = boneWeightAry;
    NSMutableArray* arrA   = [[NSMutableArray alloc] init];
    for (int i = 0; i < bonetIDAry.count; i++) {
        [arrA addObject:[NSNumber numberWithInt:MAX([bonetIDAry[i] intValue], 0)] ];
    }
    meshData.boneIDAry = arrA;
 
}
 
-(NSMutableArray*)getboneNum:(NSArray*)ary
{
    NSMutableArray* numAry = [[NSMutableArray alloc]init];
    for (int i = 0; i < ary.count; i++) {
        if ([numAry indexOfObject:ary[i]]>numAry.count) {
            [numAry addObject:ary[i]];
        }
    }
    return numAry;
}

-(NSArray*)getMapValue:(NSArray* )targetAry{
    
    NSArray* newTargetAry=[self.scene3D.meshToObjUtils getStorNewTargerArr: targetAry ];
    NSMutableArray* mapkeyAry  = [[NSMutableArray alloc]init ];//新旧ID映射关系
    for (int i = 0; i < targetAry.count; i++) {
        NSUInteger index= [newTargetAry indexOfObject: targetAry[i]];
        [mapkeyAry addObject:[NSNumber numberWithInteger:index]];
    }
    return mapkeyAry;
    
}

@end
