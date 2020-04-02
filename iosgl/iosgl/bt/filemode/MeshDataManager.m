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
#import "Vector2D.h"
#import "MeshData.h"

#import "ResManager.h"
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
    
    [[ResManager default]loadRoleRes:url fun:^(RoleRes * _Nonnull roleRes) {
        
        
    } meshBatchNum:batchNum];
    
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
  //  NSMutableDictionary* allParticleDic=[[NSMutableDictionary alloc]init];
    
    for (int i = 0; i < meshNum; i++) {
        MeshData* meshData =[[MeshData alloc]init];
        [self readMesh2OneBuffer:byte meshData:meshData];
        

              meshData.trinum =(int) meshData.indexs.count ;
              meshData.materialUrl = [byte readUTF];
                meshData.materialParamData= [BaseRes readMaterialParamData:byte];
       
       
        /*
              meshData.materialParamData = BaseRes.readMaterialParamData(byte);

              var particleNum: number = byte.readInt();
              for (var j: number = 0; j < particleNum; j++) {

                  var bindParticle: BindParticle = new BindParticle(byte.readUTF(), byte.readUTF());
                  meshData.particleAry.push(bindParticle);
                  allParticleDic[bindParticle.url] = true;
              }

              $skinMesh.addMesh(meshData);
        */
    }
    
    
    
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
/*
 
 
  
     

 
     for (var i: number = 0; i < meshNum; i++) {
        
 



         meshData.treNum = meshData.indexs.length;

   

         meshData.materialUrl = byte.readUTF();
         meshData.materialParamData = BaseRes.readMaterialParamData(byte);

         var particleNum: number = byte.readInt();
         for (var j: number = 0; j < particleNum; j++) {

             var bindParticle: BindParticle = new BindParticle(byte.readUTF(), byte.readUTF());
             meshData.particleAry.push(bindParticle);
             allParticleDic[bindParticle.url] = true;
         }

         $skinMesh.addMesh(meshData);


     }

     for(var key in allParticleDic){
         ParticleManager.getInstance().registerUrl(key);
     }

     $skinMesh.allParticleDic = allParticleDic;

     var bindPosLength: number = byte.readInt();

     var bindPosAry: Array<Array<number>> = new Array;
     for (var j: number = 0; j < bindPosLength; j++) {
         var ary: Array<number> = new Array(byte.readFloat(), byte.readFloat(), byte.readFloat(),
             byte.readFloat(), byte.readFloat(), byte.readFloat());
         bindPosAry.push(ary);
     }

     this.getBindPosMatrix(bindPosAry, $skinMesh);

     var sokcetLenght: number = byte.readInt();

     $skinMesh.boneSocketDic = new Object();

     for (var j: number = 0; j < sokcetLenght; j++) {
         var boneData: BoneSocketData = new BoneSocketData();
         boneData.name = byte.readUTF();
         boneData.boneName = byte.readUTF();
         boneData.index = byte.readInt();
         boneData.x = byte.readFloat();
         boneData.y = byte.readFloat();
         boneData.z = byte.readFloat();
         boneData.rotationX = byte.readFloat();
         boneData.rotationY = byte.readFloat();
         boneData.rotationZ = byte.readFloat();

         $skinMesh.boneSocketDic[boneData.name] = boneData;
     }

     this._dic[$url] = $skinMesh;

     return $skinMesh;
 }
 */
@end
