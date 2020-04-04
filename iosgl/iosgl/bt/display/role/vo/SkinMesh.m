//
//  SkinMesh.m
//  iosgl
//
//  Created by zhao on 2/4/2020.
//  Copyright © 2020 zhao. All rights reserved.
//

#import "SkinMesh.h"
#import "Matrix3D.h"
#import "GL_Header.h"
#import "MeshData.h"
#import "Vector2D.h"
#import "MaterialAnimShader.h"
#import "MaterialManager.h"
#import "AnimManager.h"
#import "Scene_data.h"
@interface SkinMesh()


@property(nonatomic,strong)NSMutableArray<NSString*>*   animUrlAry;
@property(nonatomic,strong)NSMutableArray<NSNumber*>*   lightData;
@property(nonatomic,strong)NSMutableArray<Vector3D*>*   hitPosItem;

@property(nonatomic,assign)float  type;

@end
@implementation SkinMesh
- (instancetype)init
{
    self = [super init];
    if (self) {
        self.animDic=[[NSMutableDictionary alloc]init];
          self.meshAry=[[NSMutableArray alloc]init];
    }
    return self;
}
-(void)makeHitBoxItem;
{
    
}
-(void)addMesh:(MeshData*)mesh;
{
    mesh.uid=(int)self.meshAry.count;
    [self.meshAry addObject:mesh];
}
-(void)loadMaterial;
{
    [self loadMaterial:^(NSString *localPath) {  }];
}
-(void)loadMaterial:(SuccessBlock)fun;
{
    for (int i = 0; i < self.meshAry.count; i++){
     
         [self loadByteMeshDataMaterial:self.meshAry[i] fun:fun];
        }
}
-(void)loadByteMeshDataMaterial:(MeshData*)meshData fun:(SuccessBlock)fun;
{
 
    NSString* url =[[Scene_data default] getWorkUrlByFilePath:meshData.materialUrl];
        url= [url stringByReplacingOccurrencesOfString:@"_byte.txt" withString:@".txt"];
        url= [url stringByReplacingOccurrencesOfString:@".txt" withString:@"_byte.txt"];
    
    [[MaterialManager default] getMaterialByte:url fun:^(NSObject *obj) {
        
        
    } info:nil autoReg:YES regName:MaterialAnimShader.shaderStr shader3DCls:[[MaterialAnimShader alloc]init]];
 
}

-(void)setAction:(NSMutableArray<NSString*>*)actionAry roleUrl:(NSString*)roleUrl;
{
   self.animUrlAry =[[NSMutableArray alloc]init];
    for (int i = 0; i < actionAry.count; i++) {
        NSString* name  = actionAry[i];
        NSString* url = [roleUrl stringByAppendingString:actionAry[i]];
        AnimData* anim = [[AnimManager default] getAnimDataImmediate:url];
        [anim processMesh:self];
        self.animDic[name] = anim;
        [self.animUrlAry addObject:url];
    }
}
/*
public setAction(actionAry: Array<string>,roleUrl:string): void {
      this.animUrlAry = new Array;
      for (var i: number = 0; i < actionAry.length; i++) {
          var name: string = actionAry[i];
          var url: string = roleUrl + actionAry[i];
          var anim: AnimData = AnimManager.getInstance().getAnimDataImmediate(url);
          anim.processMesh(this);
          this.animDic[name] = anim;
          this.animUrlAry.push(url);
      }
  }
*/
@end
