//
//  Display3dMovie.m
//  iosgl
//
//  Created by zhao on 2/4/2020.
//  Copyright © 2020 zhao. All rights reserved.
//

#import "Display3dMovie.h"
#import "SkinMesh.h"
#import "Scene_data.h"
#import "AnimData.h"
#import "MeshDataManager.h"
 
@interface Display3dMovie()
@property(nonatomic,strong)NSString*  meshUrl;

@property(nonatomic,strong)NSMutableDictionary*  partDic;
@property(nonatomic,strong)NSMutableDictionary*  partUrl;
@property(nonatomic,strong)NSMutableDictionary*  preLoadActionDic;
@property(nonatomic,strong)NSMutableDictionary*  waitLoadActionDic;
 
@property(nonatomic,strong)NSString*  defaultAction ;
@property(nonatomic,assign)NSString*  curentAction;
@property(nonatomic,assign)int  completeState ;
@property(nonatomic,assign)int  curentFrame;
@property(nonatomic,assign)float actionTime;
@property(nonatomic,assign)float fileScale;
@property(nonatomic,assign)BOOL meshVisible;
 

@end
@implementation Display3dMovie
- (instancetype)init
{
    self = [super init];
    if (self) {
        self.meshVisible=YES;
        self.defaultAction= @"stand";
        self.partDic = [[NSMutableDictionary alloc]init];
        self.partUrl =[[NSMutableDictionary alloc]init];
        self.preLoadActionDic = [[NSMutableDictionary alloc]init];
        self.waitLoadActionDic =[[NSMutableDictionary alloc]init];
        self.actionTime=0;
    }
    return self;
}
 
-(void)setRoleUrl:(NSString*)value;
{
    [[MeshDataManager default]getMeshData:value fun:^(SkinMesh * _Nonnull skinMesh) {
   
        self.skinMesh=skinMesh;
        self.fileScale=skinMesh.fileScale;
        self.animDic = skinMesh.animDic;
        [self onMeshLoaded];
     
        
    } batchNum:1];
}
-(void)onMeshLoaded;
{
    
}
-(void)clearMesh;
{
  
}
- (void)upFrame;
{
     Display3dMovie* this=self;
    if(!this.skinMesh){
        return;
    }
    [this updateBind];
    if(self.meshVisible){
        for (int i = 0; i < self.skinMesh.meshAry.count; i++) {
            [this updateMaterialMesh:this.skinMesh.meshAry[i]];
        }
    }
 
}
-(void)updateMaterialMesh:(MeshData*)mesh;
{
     Display3dMovie* this=self;
    if (!mesh.material) {
          return;
    }
    NSLog(@"---");

    /*
           Scene_data.context3D.setProgram(mesh.material.program);

           Scene_data.context3D.cullFaceBack(mesh.material.backCull);

           Scene_data.context3D.setBlendParticleFactors(mesh.material.blendMode);
    
           this.setVcMatrix(mesh);
 
           this.setMaterialVc(mesh.material, mesh.materialParam);
 
           this.setMaterialTexture(mesh.material, mesh.materialParam);
 
           this.setVa(mesh);
 
           this.setDirectLight(mesh.material);
           this.setMeshVc(mesh);

           Scene_data.context3D.drawCall(mesh.indexBuffer, mesh.treNum);
    */
}
 
- (void)updateFrame:(float)t;
{
    if(!self.skinMesh){
        return;
    }
    Display3dMovie* this=self;
    this.actionTime+=t;
    NSString* actionKey;
    if(this.curentAction&&self.animDic[this.curentAction]){
         actionKey = this.curentAction;
    }else if ( this.animDic[this.defaultAction]){
         actionKey = this.defaultAction;
    }else{
        return;
    }
    AnimData* animData=this.animDic[actionKey];
    this.curentFrame=(int)(this.actionTime/([Scene_data default].frameTime*2.0) );
    if (this.curentFrame >= animData.matrixAry.count) {
        if (this.completeState == 0) {
            this.actionTime = 0;
            this.curentFrame = 0;
        } else if (this.completeState == 1) {
            this.curentFrame =(int) animData.matrixAry.count - 1;
        } else if (this.completeState == 2) {
            this.curentFrame = 0;
            this.completeState = 0;
            [this changeAction:this.curentAction];
        } else if (this.completeState == 3) {

        }
    }
 
  
}
-(void)changeAction:(NSString*)action;
{
      self.curentAction = self.defaultAction;
}



@end
