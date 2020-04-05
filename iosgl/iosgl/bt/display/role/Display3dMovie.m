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
#import "Context3D.h"
#import "Scene3D.h"
#import "ProgrmaManager.h"
#import "MaterialAnimShader.h"
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
        
        [[ProgrmaManager default] registe:MaterialAnimShader.shaderStr shader3d: [[MaterialAnimShader alloc]init]];
        self.shader3d=  [[ProgrmaManager default] getProgram:MaterialAnimShader.shaderStr];
        
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
            [this updataBase:this.skinMesh.meshAry[i]];
        }
    }
 
}
-(void)updataBase:(MeshData*)mesh;
{
    GLuint progame= self.shader3d.program;
    glUseProgram(progame);
    [self setVc];
    [self setVaCompress:mesh];
    
}
-(void)setVaCompress:(MeshData*)mesh;
{
    [mesh upToGpu];
     Context3D *ctx=self.scene3d.context3D;
    [ctx pushVa: mesh.verticesBuffer];
    [ctx setVaOffset:self.shader3d name:"pos" dataWidth:3 stride:0 offset:0];
    [ctx pushVa: mesh.uvBuffer];
    [ctx setVaOffset:self.shader3d name:"v2Uv" dataWidth:2 stride:0 offset:0];
    [ctx pushVa: mesh.boneIdBuffer];
    [ctx setVaOffset:self.shader3d name:"boneID" dataWidth:4 stride:0 offset:0];
    [ctx pushVa: mesh.boneWeightBuffer];
    [ctx setVaOffset:self.shader3d name:"boneWeight" dataWidth:4 stride:0 offset:0];
    
    
   //  [ctx drawCall:mesh.indexBuffer  numTril:mesh.trinum ];
    
  
}
/*

 public setVaCompress($mesh: MeshData): void {
     var tf: boolean = Scene_data.context3D.pushVa($mesh.vertexBuffer);
     if (tf) {
         //console.log('cccccc')
         return;
     }

     Scene_data.context3D.setVaOffset(0, 3, $mesh.stride, 0);
     Scene_data.context3D.setVaOffset(1, 2, $mesh.stride, $mesh.uvsOffsets);
     Scene_data.context3D.setVaOffset(2, 4, $mesh.stride, $mesh.boneIDOffsets);
     Scene_data.context3D.setVaOffset(3, 4, $mesh.stride, $mesh.boneWeightOffsets);


     if ($mesh.material.usePbr) {
         Scene_data.context3D.setVaOffset(4, 3, $mesh.stride, $mesh.normalsOffsets);
         Scene_data.context3D.setVcMatrix4fv($mesh.material.shader, "rotationMatrix3D", this._rotationMatrix.m);
         if ($mesh.material.useNormal) {
             Scene_data.context3D.setVaOffset(5, 3, $mesh.stride, $mesh.tangentsOffsets);
             Scene_data.context3D.setVaOffset(6, 3, $mesh.stride, $mesh.bitangentsOffsets);
         }
     } else {
         if ($mesh.material.lightProbe || $mesh.material.directLight) {
             Scene_data.context3D.setVaOffset(4, 3, $mesh.stride, $mesh.normalsOffsets);
             Scene_data.context3D.setVcMatrix4fv($mesh.material.shader, "rotationMatrix3D", this._rotationMatrix.m);
         }
     }
 }
 */
- (void)setVc;
{
    Context3D *context3D=self.scene3d.context3D;
      [context3D setVcMatrix4fv:self.shader3d name:"viewMatrix" data:self.viewMatrix.m];
      [context3D setVcMatrix4fv:self.shader3d name:"posMatrix" data:self.posMatrix3d.m];
}
- (void)setVa;
{
    
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
