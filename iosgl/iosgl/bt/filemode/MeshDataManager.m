//
//  MeshDataManager.m
//  iosgl
//
//  Created by zhao on 2/4/2020.
//  Copyright © 2020 zhao. All rights reserved.
//

#import "MeshDataManager.h"
#import "GL_Header.h"
#import "ByteArray.h"
#import "SkinMesh.h"
#import "Scene_data.h"
#import "Vector2D.h"
#import "Quaternion.h"
#import "MeshData.h"
#import "BindParticle.h"
#import "ResManager.h"
#import "BoneSocketData.h"
#import "ParticleManager.h"
@interface MeshDataManager ()
@property(nonatomic,strong)NSMutableDictionary* loadDic;
@end
static MeshDataManager *instance = nil;
@implementation MeshDataManager
+ (instancetype)default;
{
    if (instance == nil) {
        instance = [[MeshDataManager alloc] init];
    }
    return instance;
}
- (instancetype)init
{
    self = [super init];
    if (self) {
        self.dic=[[NSMutableDictionary alloc]init];
        self.loadDic=[[NSMutableDictionary alloc]init];
        
    }
    return self;
}

-(void)getMeshData:(NSString*)url fun:(SkinMeshBfun)fun batchNum:(int)batchNum;
{
    MeshDataManager* this=self;
    if (this.dic[url] && this.dic[url][@"ready"]) {
        return;
    }
    if (this.loadDic[url]) {
        [this.loadDic[url] addObject:fun];
        return;
    }
    this.loadDic[url] =[[NSMutableArray alloc]init];
    [this.loadDic[url] addObject:fun];
    [[ResManager default]loadRoleRes:[[Scene_data default]getWorkUrlByFilePath:url]  fun:^(RoleRes * _Nonnull roleRes) {
        
        [self roleResCom:roleRes fun:^(NSString *localPath) {
            
        }];
    } meshBatchNum:batchNum];
    
}
-(void)roleResCom:(RoleRes*)roleRes fun:(SuccessBlock)fun;
{
    
    MeshDataManager* this=self;
    NSString* url = roleRes.roleUrl;
    SkinMesh* skinMesh = this.dic[url];
    [skinMesh loadMaterial];
    [skinMesh setAction:roleRes.actionAry roleUrl:url];
    
    NSArray* arr=  this.loadDic[url];
    for (int i = 0; i <arr.count ; i++) {
        SkinMeshBfun temp=  arr[i];
        temp(skinMesh);
    }
    skinMesh.ready = YES;
    [this.loadDic removeObjectForKey:url];
}


-(void)readData:(ByteArray*)byte batchNum:(int)batchNum url:(NSString*)url version:(int)version;
{
    SkinMesh* skinMesh  =[[SkinMesh alloc]init];
    skinMesh.fileScale = [byte readFloat];
    skinMesh.tittleHeight =[byte readFloat];
    skinMesh.hitBox=[[Vector2D alloc]init];
    skinMesh.hitBox.x = [byte readFloat];
    skinMesh.hitBox.y = [byte readFloat];
    
    [skinMesh makeHitBoxItem];
    
    int meshNum = [byte readInt];
    NSMutableDictionary* allParticleDic=[[NSMutableDictionary alloc]init];
    
    for (int i = 0; i < meshNum; i++) {
        MeshData* meshData =[[MeshData alloc]init];
        [self readMesh2OneBuffer:byte meshData:meshData];
        
        
        meshData.trinum =(int) meshData.indexs.count ;
        meshData.materialUrl = [byte readUTF];
        meshData.materialParamData= [BaseRes readMaterialParamData:byte];
        
        int particleNum = [byte readInt];
        for (int j = 0; j < particleNum; j++) {
            BindParticle* bindParticle=[[BindParticle alloc]init:[byte readUTF] socketName:[byte readUTF]];
            [meshData.particleAry  addObject:bindParticle];
            allParticleDic[bindParticle.url] = [NSNumber numberWithInt:1];
            
        }
        
        [skinMesh addMesh:meshData];
        
    }
    for (NSString* key in allParticleDic) {
        [[ParticleManager default] registerUrl: allParticleDic[key]];
    }
    skinMesh.allParticleDic = allParticleDic;
    
    int bindPosLength = [byte readInt];
    
    NSMutableArray<NSArray<NSNumber*>*>* bindPosAry=[[NSMutableArray alloc]init];
    for (int j = 0; j < bindPosLength; j++) {
        NSArray * ary = [[NSArray alloc] initWithObjects:[NSNumber numberWithFloat:[byte readFloat]],[NSNumber numberWithFloat:[byte readFloat]],[NSNumber numberWithFloat:[byte readFloat]],[NSNumber numberWithFloat:[byte readFloat]],[NSNumber numberWithFloat:[byte readFloat]],[NSNumber numberWithFloat:[byte readFloat]], nil];
        [bindPosAry addObject:ary];
    }
    [self getBindPosMatrix:bindPosAry skinMesh:skinMesh];
    
    int sokcetLenght = [byte readInt];
    
    skinMesh.boneSocketDic = [[NSMutableDictionary alloc]init];
    for (int j = 0; j < sokcetLenght; j++) {
        BoneSocketData* boneData=[[BoneSocketData alloc]init];
        boneData.name = [byte readUTF];
        boneData.boneName =[byte readUTF];
        boneData.index =[byte readInt];
        boneData.x = [byte readFloat];
        boneData.y =[byte readFloat];
        boneData.z = [byte readFloat];
        boneData.rotationX = [byte readFloat];
        boneData.rotationY = [byte readFloat];
        boneData.rotationZ = [byte readFloat];
        skinMesh.boneSocketDic[boneData.name] = boneData;
    }
    self.dic[url] = skinMesh;
    
    
    
}
-(void)getBindPosMatrix:(NSArray<NSArray<NSNumber*>*>*)bindPosAry skinMesh:(SkinMesh*)skinMesh;
{
    NSMutableArray<Matrix3D*>* ary = [[NSMutableArray alloc]init];
    NSMutableArray<Matrix3D*>* invertAry= [[NSMutableArray alloc]init];
    
    for (int i = 0; i < bindPosAry.count; i++) {
        NSArray<NSNumber*>* objbone= bindPosAry[i];
        
        Quaternion* OldQ=[[Quaternion alloc]x:objbone[0].floatValue y:objbone[1].floatValue z:objbone[2].floatValue];
        [OldQ setMd5W];
        Matrix3D* newM   = [OldQ  toMatrix3D];
        [newM appendTranslation:objbone[3].floatValue y:objbone[4].floatValue z:objbone[5].floatValue];
        
        [invertAry addObject:[newM clone]];
        [newM Invert];
        [ary addObject:[newM clone]];
        
    }
    skinMesh.bindPosMatrixAry = ary;
    skinMesh.bindPosInvertMatrixAry = invertAry;
    
    
}

-(void)readMesh2OneBuffer:(ByteArray*)byte meshData:(MeshData*)meshData;
{
    int len    = [byte  readInt];
    NSMutableArray<NSNumber*>* typeItem =[[NSMutableArray alloc]init];
    int dataWidth = 0;
    for (int i = 0; i < 5; i++) {
        BOOL tf   = [byte  readBoolean];
        [typeItem addObject:tf?@1:@0];
        if (tf) {
            if(i == 1){
                dataWidth += 2;
            }else{
                dataWidth += 3;
            }
        }
    }
    dataWidth += 8;
    len *= dataWidth * 4;
    int verOffsets=0;
    int uvsOffsets = 3; // 1
    int normalsOffsets =  uvsOffsets + 2; // 2
    int tangentsOffsets = normalsOffsets + 3; //3
    int bitangentsOffsets = tangentsOffsets + 3; //4
    int boneIDOffsets;
    if([typeItem[2]boolValue]){//normal
        if([typeItem[4]boolValue]){
            boneIDOffsets = bitangentsOffsets + 3;
        }else{
            boneIDOffsets = normalsOffsets + 3;
        }
    }else{
        boneIDOffsets = uvsOffsets + 2;
    }
    int boneWeightOffsets = boneIDOffsets + 4;
    
    int buffStride=dataWidth * 4;
    NSMutableData *dataBase = [[NSMutableData alloc] initWithLength:len];
    
    meshData.vertices=  [BaseRes readBytes2ArrayBuffer:byte nsdata:dataBase dataWidth:3 offset:verOffsets stride:buffStride readType:0];
    meshData.uvs=  [BaseRes readBytes2ArrayBuffer:byte nsdata:dataBase dataWidth:2 offset:uvsOffsets stride:buffStride readType:0];
    meshData.nrms=  [BaseRes readBytes2ArrayBuffer:byte nsdata:dataBase dataWidth:3 offset:normalsOffsets stride:buffStride readType:0];
    meshData.tangents=  [BaseRes readBytes2ArrayBuffer:byte nsdata:dataBase dataWidth:3 offset:tangentsOffsets stride:buffStride readType:0];
    meshData.bitangents=  [BaseRes readBytes2ArrayBuffer:byte nsdata:dataBase dataWidth:3 offset:bitangentsOffsets stride:buffStride readType:0];
    meshData.boneIDAry=  [BaseRes readBytes2ArrayBuffer:byte nsdata:dataBase dataWidth:4 offset:boneIDOffsets stride:buffStride readType:2];
    meshData.boneWeightAry=  [BaseRes readBytes2ArrayBuffer:byte nsdata:dataBase dataWidth:4 offset:boneWeightOffsets stride:buffStride readType:1];
    
    NSMutableData *indexNsData = [[NSMutableData alloc]init];
    meshData.indexs=   [BaseRes readIntForTwoByte:byte nsdata:indexNsData];
    meshData.boneNewIDAry=   [BaseRes readIntForTwoByte:byte nsdata:indexNsData];
    
    
    meshData.compressBuffer = YES;
    meshData.uvsOffsets = uvsOffsets * 4;
    meshData.normalsOffsets = normalsOffsets * 4;
    meshData.tangentsOffsets = tangentsOffsets * 4;
    meshData.bitangentsOffsets = bitangentsOffsets * 4;
    meshData.boneIDOffsets = boneIDOffsets * 4;
    meshData.boneWeightOffsets = boneWeightOffsets * 4;
    meshData.stride = dataWidth * 4;
    
    
}

@end
