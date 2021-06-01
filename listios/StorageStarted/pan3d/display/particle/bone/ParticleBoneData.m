//
//  ParticleBoneData.m
//  StorageStarted
//
//  Created by pan3dme on 2021/6/1.
//  Copyright © 2021 cuiyiran. All rights reserved.
//

#import "ParticleBoneData.h"
#import "MeshData.h"
#import "AnimData.h"
#import "BaseRes.h"
#import "Display3DBonePartilce.h"

@interface ParticleBoneData ()


@property (nonatomic, strong)  MeshData*   meshData;
@property (nonatomic, strong)  AnimData*   animData;
@property (nonatomic, assign)  float objScale;


@end

@implementation ParticleBoneData





- (void)setAllByteInfo:(ByteArray *)byte
{
    ParticleBoneData* this=self;
    this.meshData = [[MeshData alloc]init:this.scene3D];
    this.animData = [[AnimData alloc]init:this.scene3D];
    this.objScale = [byte readFloat];
    
    int dataWidth = 13;
    int vLen =  [byte getInt];
    int buffStride=dataWidth * 4;
    
  
    
    NSMutableData *dataBase = [[NSMutableData alloc] initWithLength:vLen *buffStride];
    
    this.meshData.vertices=  [BaseRes readBytes2ArrayBuffer:byte nsdata:dataBase dataWidth:3 offset:0 stride:buffStride readType:0];
    this.meshData.uvs=  [BaseRes readBytes2ArrayBuffer:byte nsdata:dataBase dataWidth:2 offset:3 stride:buffStride readType:0];
 
    this.meshData.indexs=   [BaseRes readIntForTwoByte:byte nsdata:dataBase];
    
    this.meshData.boneIDAry=  [BaseRes readBytes2ArrayBuffer:byte nsdata:dataBase dataWidth:4 offset:5 stride:buffStride readType:2];
    this.meshData.boneWeightAry=  [BaseRes readBytes2ArrayBuffer:byte nsdata:dataBase dataWidth:4 offset:9 stride:buffStride readType:3];
 
    this.meshData.stride =buffStride;
    
    [this readFrameQua:byte];
    
    [super setAllByteInfo:byte];

    [this initVcData];
    /*
   
     
     this.meshData.vertexBuffer = this.scene3D.context3D.uploadBuff3DArrayBuffer(arybuff);
     this.meshData.indexBuffer = this.scene3D.context3D.uploadIndexBuff3D(this.meshData.indexs);
     this.meshData.treNum = this.meshData.indexs.length;
     */
}
-(void) initVcData {
     
}

-(void) readFrameQua:(ByteArray *)byte
{
    float tempNum = [byte readFloat];
    float RGB32767 = 32767.0;
    int  frameNum    = [byte readInt];
    
    NSMutableArray<DualQuatFloat32Array*>* frameDualQuat = [[NSMutableArray alloc]init];
    for (int i   = 0; i < frameNum; i++) {
        int len = [byte readInt];
        DualQuatFloat32Array* tempDq = [[DualQuatFloat32Array alloc] init];
        GLfloat quat[len * 4];
        GLfloat pos[len * 3];
        for (int j = 0; j < len; j++) {
            quat[j * 4 + 0] = [byte readShort]/RGB32767;
            quat[j * 4 + 1] =  [byte readShort]/RGB32767;
            quat[j * 4 + 2] =  [byte readShort]/RGB32767;
            quat[j * 4 + 3] = [byte readShort]/RGB32767;
            
            pos[j * 3 + 0] =  [byte readShort]/RGB32767* tempNum;
            pos[j * 3 + 1] =  [byte readShort]/RGB32767* tempNum;
            pos[j * 3 + 2] =  [byte readShort]/RGB32767* tempNum;
        }
        NSMutableArray<NSNumber*>* quatArr=[[NSMutableArray alloc]init];
        for(int m=0;m<len * 4;m++){
            [quatArr addObject:[NSNumber numberWithFloat:quat[m]]];
        }
        tempDq.quatArr=[[NSArray alloc]initWithArray:quatArr];
        
        NSMutableArray<NSNumber*>* posArr=[[NSMutableArray alloc]init];
        for(int n=0;n<len* 3;n++){
            [posArr addObject:[NSNumber numberWithFloat:pos[n]]];
        }
        tempDq.posArr=[[NSArray alloc]initWithArray:posArr];
        tempDq.mtkquatArr=  [self.scene3D.context3D changeDataToGupMtkfloat4: tempDq.quatArr];
        tempDq.mtkposArr=  [self.scene3D.context3D changeDataToGupMtkfloat3: tempDq.posArr];
        
        [frameDualQuat addObject:tempDq];
        
    }
    self.animData.boneQPAry = [[NSMutableArray alloc]init];
    [self.animData.boneQPAry addObject:frameDualQuat];
}
- (Display3DParticle *)getParticle
{
    return [[Display3DBonePartilce alloc]init:self.scene3D];
}

@end
