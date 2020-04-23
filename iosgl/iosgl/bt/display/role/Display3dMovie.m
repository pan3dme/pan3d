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
#import "GroupItem.h"
#import "TextureRes.h"
#import "BoneSocketData.h"
#import "DualQuatFloat32Array.h"
#import "ProgrmaManager.h"
#import "MaterialAnimShader.h"
#import "MeshDataManager.h"
#import "Display3DSprite.h"
#import "TextureManager.h"
#import "GroupDataManager.h"

@interface Display3dMovie()<IBind>
@property(nonatomic,strong)NSString*  meshUrl;

@property(nonatomic,strong)NSMutableDictionary*  partDic;
@property(nonatomic,strong)NSMutableDictionary*  partUrl;
@property(nonatomic,strong)NSMutableDictionary*  preLoadActionDic;
@property(nonatomic,strong)NSMutableDictionary*  waitLoadActionDic;


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
    /*
     [0]    (null)    @"attack_03" : (no summary)
     [1]    (null)    @"stand" : (no summary)
     [2]    (null)    @"walk" : (no summary)
     [3]    (null)    @"stand_mount_01" : (no summary)
     [4]    (null)    @"attack_01" : (no summary)
     [5]    (null)    @"jump" : (no summary)
     [6]    (null)    @"death" : (no summary)
     [7]    (null)    @"injured" : (no summary)
     [8]    (null)    @"attack_010" : (no summary)
     [9]    (null)    @"attack_02" : (no summary)
     [10]    (null)    @"m_attack_01" : (no summary)
     [11]    (null)    @"m_attack_02" : (no summary)
     [12]    (null)    @"walk_mount_01" : (no summary)
     [13]    (null)    @"m_attack_03" : (no summary)
     [14]    (null)    @"attack_020" : (no summary)
     [15]    (null)    @"m_attack_04" : (no summary)
     */
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
-(void)onMeshLoaded;
{
    
}
- (void)setVa;
{
    
}
-(void)clearMesh;
{
    
}
- (int)getSunType
{
    return 1;
}
- (void)getSocket:(NSString *)socketName resultMatrix:(Matrix3D *)resultMatrix
{
    Display3dMovie* this =self;
    [resultMatrix identity];
    if (!this.skinMesh) {
        [resultMatrix append:this.posMatrix3d];
        return;
    } else if (!this.skinMesh.boneSocketDic[socketName]) {
        if ( [socketName isEqualToString:@"none"]) {
            [resultMatrix appendTranslation:this.x y:this.y z:this.z];
        } else {
            [resultMatrix append:this.posMatrix3d];
        }
        return;
    }
    BoneSocketData* boneSocketData   = this.skinMesh.boneSocketDic[socketName];
    Matrix3D* testmatix  ;
    int index    = boneSocketData.index;
    testmatix = [this getFrameMatrix:index];
    [resultMatrix appendScale:1/this.scaleX y:1/this.scaleY z:1/self.scaleZ];
    [resultMatrix appendRotation:boneSocketData.rotationX axis:Vector3D.X_AXIS];
    [resultMatrix appendRotation:boneSocketData.rotationY axis:Vector3D.Y_AXIS];
    [resultMatrix appendRotation:boneSocketData.rotationZ axis:Vector3D.Z_AXIS];
    [resultMatrix appendTranslation:boneSocketData.x y:boneSocketData.y z:boneSocketData.z];
    if(testmatix){
        [resultMatrix append:self.skinMesh.bindPosInvertMatrixAry[index]];
        [resultMatrix append:testmatix];
    }
    [resultMatrix append:this.posMatrix3d];
 
  
}
-(Matrix3D*)getFrameMatrix:(int)index;
{
     Display3dMovie* this =self;
    if (this.animDic[this.curentAction]) {
        AnimData* animData   = this.animDic[this.curentAction];
        return animData.matrixAry[this.curentFrame][index];
    } else if (this.animDic[this.defaultAction]) {
        AnimData* animData  = this.animDic[this.defaultAction];
        return animData.matrixAry[this.curentFrame][index];
    }

    return nil;
}

-(void)setRoleUrl:(NSString*)value;
{
    [[MeshDataManager default]getMeshData:value fun:^(SkinMesh * _Nonnull skinMesh) {
        self.skinMesh=skinMesh;
        self.fileScale=skinMesh.fileScale;
        self.animDic = skinMesh.animDic;
        [self onMeshLoaded];
        for (int i = 0; i < self.skinMesh.meshAry.count; i++) {
            [skinMesh.meshAry[i] upToGpu];
        }
    } batchNum:1];
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
/*
 播放动作  播放完状态  0c持续  1播完听 2 播放返回
 */
-(BOOL)play:(NSString*)action completeState:(int)completeState needFollow:(BOOL)needFollow;
{
    Display3dMovie* this=self;
    if (this.curentAction == action) {
        return YES;
    }
    this.curentAction = action;
    this.completeState = completeState;
    this.actionTime = 0;
    [this updateFrame:0];
    if ([this.animDic valueForKey:action]) {
        return YES;
    } else {
        return NO;
    }
}
 /*
  设置定点Buff
  */

-(void)setVaCompress:(MeshData*)mesh;
{
    
    
    Context3D *ctx=self.scene3d.context3D;
    [ctx pushVa:mesh.verticesBuffer];
    [ctx setVaOffset:self.shader3d name:"pos" dataWidth:3 stride:0 offset:0];
    [ctx pushVa:    mesh.uvBuffer];
    [ctx setVaOffset:self.shader3d name:"v2Uv" dataWidth:2 stride:0 offset:0];
    [ctx pushVa: mesh.boneIdBuffer];
    [ctx setVaOffset:self.shader3d name:"boneID" dataWidth:4 stride:0 offset:0];
    [ctx pushVa: mesh.boneWeightBuffer];
    [ctx setVaOffset:self.shader3d name:"boneWeight" dataWidth:4 stride:0 offset:0];
  
    
}
/*
 设置骨骼数据
 */
-(void)setMeshVc:(MeshData*)mesh;
{
    Context3D *context3D=self.scene3d.context3D;
    Display3dMovie* this=self;
    AnimData* animData;
    if (this.animDic[this.curentAction]) {
        animData = this.animDic[this.curentAction];
    } else if (this.animDic[this.defaultAction]) {
        animData = this.animDic[this.defaultAction];
    } else {
        return;
    }
    DualQuatFloat32Array* dualQuatFrame = animData.boneQPAry[mesh.uid][this.curentFrame];
    GLfloat boneQarr[dualQuatFrame.quatArr.count];
    for (int i=0; i<dualQuatFrame.quatArr.count; i++) {
        boneQarr[i]=dualQuatFrame.quatArr[i].floatValue;
    }
    GLfloat boneDarr[dualQuatFrame.posArr.count];
    for (int i=0; i<dualQuatFrame.posArr.count; i++) {
        boneDarr[i]=dualQuatFrame.posArr[i].floatValue;
    }
    [context3D setVc4fv:self.shader3d name:"boneQ" data:boneQarr len:54];
    [context3D setVc3fv:self.shader3d name:"boneD" data:boneDarr len:54];
    
}
/*
 设置镜头矩阵和模型位置矩阵
 */
- (void)setVc;
{
    Context3D *context3D=self.scene3d.context3D;
    [context3D setVcMatrix4fv:self.shader3d name:"viewMatrix" data:self.viewMatrix.m];
    [context3D setVcMatrix4fv:self.shader3d name:"posMatrix" data:self.posMatrix3d.m];
}

/*
 部分mesh对象渲染
 */
-(void)updateMaterialMesh:(MeshData*)mesh;
{
     Display3dMovie* this=self;
    if (!mesh.material) {
        return;
    }
    this.shader3d=mesh.material.shader;
    Context3D *ctx=this.scene3d.context3D;
    [ctx setProgram:this.shader3d.program];
    [ctx setBlendParticleFactors:mesh.material.blendMode];
    [ctx cullFaceBack:mesh.material.backCull];
    mesh.material.shader=this.shader3d;
    [this setMaterialTexture:mesh.material mp:mesh.materialParam];
    [this setMaterialVc:mesh.material mp:mesh.materialParam];
    [this setVc];
    [this setMeshVc:mesh];
    [this setVaCompress:mesh];
    [ctx drawCall: mesh.indexBuffer  numTril:mesh.trinum];
    
}
/*
 时间轴更新
 */
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
    this.curentFrame=(int)(this.actionTime/([Scene_data default].frameTime*1.5) );
 
    if (this.curentFrame >= animData.matrixAry.count) {
        if (this.completeState == 0) {
            this.actionTime = 0.0f;
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
/*
 部位，路径，类型 1为粒子 0为其他
 */
-(void)addPart:(NSString*)key bindSocket:(NSString*)bindSocket url:(NSString*)url;
{
    Display3dMovie* this=self;
    if([this.partUrl[key] isEqual:url]){
        return;
    }else if ( [this.partUrl valueForKey:key]){
        [this.partUrl removeObjectForKey:key];
    }
    if ( [this.partDic valueForKey:key]){
        this.partDic[key] = [[NSMutableArray alloc]init];
    }
    this.partUrl[key] = url;
    NSMutableArray* ary  = this.partDic[key];
    
    [[GroupDataManager default] getGroupData:[[Scene_data default]getWorkUrlByFilePath:url] Block:^(GroupRes *groupRes) {
        [this loadPartRes:bindSocket groupRes:groupRes ary:ary];
    }];
}
/*
 部件数据加载返回
 */
-(void)loadPartRes:(NSString*)bindSocket groupRes:(GroupRes*)groupRes ary:(NSMutableArray*)ary;
{
    for (int i = 0; i < groupRes.dataAry.count; i++) {
          GroupItem* item  = groupRes.dataAry[i];

          Vector3D* posV3d ;
          Vector3D* rotationV3d  ;
          Vector3D* scaleV3d  ;
          if (item.isGroup) {
              posV3d = [[Vector3D alloc]x:item.x y:item.y z:item.z];
              rotationV3d =[[Vector3D alloc]x:item.rotationX y:item.rotationY z:item.rotationZ];
              scaleV3d = [[Vector3D alloc]x:item.scaleX y:item.scaleY z:item.scaleZ];
          }
 
          if (item.types == SCENE_PARTICLE_TYPE) {
               CombineParticle*  particle =   [ParticleManager   getParticleByte: item.particleUrl];
              [ary addObject:particle];
              particle.bindTarget = self;
              particle.bindSocket = bindSocket;
              particle.dynamic = YES;
             [self.scene3d.particleManager addParticle:particle];
              if (item.isGroup) {
                //  particle.setGroup(posV3d, rotationV3d, scaleV3d);
              }
          } else if (item.types == PREFAB_TYPE) {
              Display3DSprite *display=[[Display3DSprite alloc]init];
              [display setObjUrl:item.objUrl];
              [display setMaterialUrl:item.materialUrl paramData:item.materialInfoArr];
              [ary addObject:display];
              [display setBind:self bindSocket:bindSocket];
              [self.scene3d addDisplay:display];
              if(item.isGroup){
                  [display setGroup:posV3d rotaion:rotationV3d scale:scaleV3d];
              }
           

          }

      }
  
}
 
@end

 
