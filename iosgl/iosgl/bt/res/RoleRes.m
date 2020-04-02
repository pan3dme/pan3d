//
//  RoleRes.m
//  iosgl
//
//  Created by zhao on 2/4/2020.
//  Copyright © 2020 zhao. All rights reserved.
//

#import "RoleRes.h"
#import "Vector3D.h"
#import "GL_Header.h"
#import "ByteArray.h"
#import "LoadManager.h"
#import "MeshDataManager.h"

 
@interface RoleRes()
@property(nonatomic,strong)NSString* roleUrl;
@property(nonatomic,strong)NSMutableArray<NSString*>* actionAry;
@property(nonatomic,strong)SuccessBlock fun;
@property(nonatomic,strong)Vector3D* ambientLightColor;
@property(nonatomic,strong)Vector3D* sunLigthColor;
@property(nonatomic,strong)Vector3D* nrmDircet;

@property(nonatomic,assign)float ambientLightIntensity;
@property(nonatomic,assign)float sunLigthIntensity;


@end

@implementation RoleRes


-(void)load:(NSString*)url  fun:(SuccessBlock)fun;
{
    self.fun=fun;
    [[LoadManager default] loadUrl: url type:LoadManager.BYTE_TYPE fun:^(NSString* value) {
        NSDictionary* dic=(NSDictionary*)value;
        NSData* netNsData = [[NSData alloc] initWithContentsOfFile:dic[@"data"]];
       
        [self loadComplete:[[ByteArray alloc]init:netNsData]];
    }];
 
}
-(void)loadComplete:(ByteArray*)byte;
{
    self.byte=byte;
    self.version= [self.byte readInt];
    [self readMesh];
 
}
-(void)readMesh;
{
    RoleRes* this=self;
    this.roleUrl = [this.byte readUTF];
    this.ambientLightColor = [Vector3D alloc];
    this.sunLigthColor = [Vector3D alloc];
    this.nrmDircet = [Vector3D alloc];
    
    
    this.ambientLightColor.x = [this.byte readFloat];
    this.ambientLightColor.y = [this.byte readFloat];
    this.ambientLightColor.z = [this.byte readFloat];
    this.ambientLightIntensity = [this.byte readFloat];
    [this.ambientLightColor scaleBy:this.ambientLightIntensity];

    this.sunLigthColor.x = [this.byte readFloat];
    this.sunLigthColor.y = [this.byte readFloat];
    this.sunLigthColor.z = [this.byte readFloat];
    this.sunLigthIntensity = [this.byte readFloat];
    [this.sunLigthColor scaleBy:this.sunLigthIntensity];

    this.nrmDircet.x = [this.byte readFloat];
    this.nrmDircet.y = [this.byte readFloat];
    this.nrmDircet.z = [this.byte readFloat];
    
    [[MeshDataManager default] readData:self.byte batchNum:this.meshBatchNum url:this.roleUrl version:this.version];
}
 
@end
