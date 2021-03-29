//
//  MeshToObjUtils.m
//  iosgl
//
//  Created by pan3dme on 2020/11/12.
//  Copyright © 2020 zhao. All rights reserved.
//

#import "MeshToObjUtils.h"
#import "TimeUtil.h"
#import "ObjectUv.h"
#import "ObjectTri.h"
#import "Vector3D.h"
#import "MeshItem.h"
#import "ObjectBone.h"
#import "Quaternion.h"
#import "ObjectWeight.h"
#import "Md5MeshData.h"
#import "AnimManager.h"
 
@implementation MeshToObjUtils
 

-(NSArray*)getStorNewTargerArr:(NSArray*)targetAry
{
    NSMutableArray* newTargetAry  = [[NSMutableArray alloc] init];
    for (int i = 0; i < targetAry.count; i++) {
       NSUInteger idx= [newTargetAry indexOfObject: targetAry[i]];
        if ( idx>newTargetAry.count) {
            [newTargetAry addObject:targetAry[i]];
        }
    }
    return newTargetAry;
 
}
-(void)getObj:(Md5MeshData*)mesh;
{
    MeshData* objData  =mesh;
             objData.vertices = [[NSMutableArray alloc]init];
    objData.uvs = [[NSMutableArray alloc]init];
    objData.nrms = [[NSMutableArray alloc]init];
    objData.indexs =[[NSMutableArray alloc]init];

    NSMutableArray<Matrix3D*>*  bindPosAry  = [[NSMutableArray alloc]init];
    NSMutableArray<Matrix3D*>* invertAry = [[NSMutableArray alloc]init];
    NSMutableArray<MeshItem*>* meshItemAry = [[NSMutableArray alloc]init];
    NSArray* boneItemAry = [self processBoneNew:mesh.boneItem];
    
    for (int i = 0; i < boneItemAry.count; i++) {
        ObjectBone* objbone = boneItemAry[i];
        Quaternion* OldQ =   [[Quaternion alloc]x:objbone.qx y:objbone.qy z:objbone.qz];
        
        OldQ.w = [self.scene3D.animManager getW:OldQ.x  y:OldQ.y z:OldQ.z];
        Matrix3D* newM = [OldQ toMatrix3D];
        [newM appendTranslation:objbone.tx y:objbone.ty z:objbone.tz];
        objbone.matrix = newM;
        [bindPosAry addObject:newM];
        Matrix3D* inverMatrix = [newM clone];
         [inverMatrix Invert];;
        [invertAry addObject:inverMatrix];;
    }
    NSMutableArray* vertices=[[NSMutableArray alloc]init ];
    NSMutableArray* uvs=[[NSMutableArray alloc]init ];
    for (int i = 0; i < mesh.uvItem.count; i++) {
        ObjectUv* objuv = mesh.uvItem[i];
        Vector3D* v3d = [[Vector3D alloc] init];
        NSMutableArray* wAry  = [[NSMutableArray alloc]init];
        for (int j = 0; j < objuv.b; j++) {
            int weightID = objuv.a + j;
            ObjectWeight* objWeight = mesh.weightItem[weightID];
            Matrix3D* ma = ((ObjectBone*)( boneItemAry[objWeight.boneId])).matrix;
            Vector3D* tempV3d =[[Vector3D alloc]x:objWeight.x y:objWeight.y z:objWeight.z];
            tempV3d =[ma transformVector:tempV3d];
            [tempV3d scaleBy:objWeight.w];
            v3d= [v3d add:tempV3d];
            [wAry addObject:[NSNumber numberWithFloat:objWeight.w]];
        }
        [vertices addObject:[NSNumber numberWithFloat: v3d.x]];
        [vertices addObject:[NSNumber numberWithFloat: v3d.y]];
        [vertices addObject:[NSNumber numberWithFloat: v3d.z]];
        [uvs addObject:[NSNumber numberWithFloat: objuv.x]];
        [uvs addObject:[NSNumber numberWithFloat: objuv.y]];
   
        MeshItem* meshitem = [[MeshItem alloc]init];
        meshitem.verts = v3d;
        meshitem.uvInfo = objuv;
        [meshItemAry addObject:meshitem];
 
    }
    NSMutableArray* indexs=[[NSMutableArray alloc]init];
    for (int i = 0; i < mesh.triItem.count; i++) {
        ObjectTri* objectTri=mesh.triItem[i];
        [indexs addObject:[NSNumber numberWithInt:objectTri.t0]];
        [indexs addObject:[NSNumber numberWithInt:objectTri.t1]];
        [indexs addObject:[NSNumber numberWithInt:objectTri.t2]];
    }
    objData.vertices=vertices;
    objData.uvs=uvs;
    objData.indexs=indexs;
    objData.bindPosAry=bindPosAry;
    objData.invertAry=invertAry;
 
 
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
-(NSArray*) processBoneNew:(NSArray* ) targetAry{
    NSArray* newTargetAry=[self.scene3D.meshToObjUtils getStorNewTargerArr: targetAry ];
    NSMutableArray* mapkeyAry  =[[NSMutableArray alloc] init];//新旧ID映射关系
    for (int i = 0; i < targetAry.count; i++) {
        int index=[self indexOf:newTargetAry find:targetAry[i]];
        [mapkeyAry addObject:[NSNumber numberWithInt:index]];
    }
    NSMutableArray* resultAry   = [[NSMutableArray alloc] init];//最终更新的数据
    for (int i = 0; i < newTargetAry.count; i++) {//数据复制
        ObjectBone* objectBone = newTargetAry[i];
        [resultAry addObject:[objectBone clone] ];
    }
    for (int i = 0; i < resultAry.count; i++) {
        ObjectBone* objectBone = resultAry[i] ;
        int index = objectBone.father;
        if (index != -1) {
            objectBone.father = [mapkeyAry[index] intValue];
        }
    }
    return resultAry;
    
}
@end
