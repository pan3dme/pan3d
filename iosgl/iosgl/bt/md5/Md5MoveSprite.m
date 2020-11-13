//
//  Md5MoveSprite.m
//  iosgl
//
//  Created by pan3dme on 2020/11/12.
//  Copyright © 2020 zhao. All rights reserved.
//

#import "Md5MoveSprite.h"
#import "Scene_data.h"
#import "LoadManager.h"
#import "Md5Analysis.h"
#import "MeshToObjUtils.h"
#import "Md5MeshData.h"
#import "Quaternion.h"
#import "Vector3D.h"
#import "Matrix3D.h"
#import "Scene3D.h"
#import "Context3D.h"
#import "MeshImportSort.h"
#import "DualQuatFloat32Array.h"
#import "Md5animAnalysis.h"
#import "Md5MeshShader.h"
#import "Md5MeshShader.h"
#import "ProgrmaManager.h"
#import "TextureManager.h"

@interface Md5MoveSprite ()
@property(nonatomic,strong)Md5MeshData* md5MeshData;
@property(nonatomic,strong)NSMutableArray* frameQuestArr;

@end

@implementation Md5MoveSprite

- (instancetype)init
{
    self = [super init];
    if (self) {
        [self inidShader];
    }
    return self;
}
-(void)inidShader
{
    [[ProgrmaManager default] registe:Md5MeshShader.shaderStr shader3d: [[Md5MeshShader alloc]init]];
    self.shader3d=  [[ProgrmaManager default] getProgram:Md5MeshShader.shaderStr];
}

- (void)setMd5url:(NSString *)body_url animurl:(NSString *)anim_url picurl:(NSString *)pic_url{
    self.bodyurl=body_url;
    self.animurl=anim_url;
    self.picurl=pic_url;
    
    
        [[ TextureManager default]getTexture:[[Scene_data default]getWorkUrlByFilePath:pic_url] fun:^(NSObject * _Nonnull any) {
            self.textureRes=(TextureRes*)any;
        } wrapType:0 info:nil filteType:0 mipmapType:0];
    
    
    [self loadBodyMesh];
}

-(void)loadBodyMesh{
    
    /*
     NSString* netUrl =[[Scene_data default]getWorkUrlByFilePath:self.bodyurl];
     
     netUrl=@"https://webpan.oss-cn-shanghai.aliyuncs.com/res/pan/expmd5/txtdata/bodymd5mesh.txt";
     
     
     [[LoadManager default] loadUrl:netUrl type:LoadManager.XML_TYPE fun:^(NSString* value) {
     NSDictionary* dic=(NSDictionary*)value;
     NSString* path=  dic[@"data"];
     NSString *str=[NSString stringWithContentsOfFile: path encoding:NSASCIIStringEncoding error:nil];
     self.md5MeshData=   [[[Md5Analysis alloc]init] addMesh:str];
     [[[MeshImportSort alloc]init] processMesh:self.md5MeshData];
     [self loadAnimFrame];
     }];
     
     */
    
    NSString *path=  [[NSBundle mainBundle]pathForResource:@"bodymd5mesh" ofType:@"txt"];
    NSString *str=[NSString stringWithContentsOfFile: path encoding:NSASCIIStringEncoding error:nil];
    self.md5MeshData=   [[[Md5Analysis alloc]init] addMesh:str];
    [[[MeshImportSort alloc]init] processMesh:self.md5MeshData];
    [[[MeshToObjUtils alloc]init]getObj:self.md5MeshData];
    
   
    
    [self loadAnimFrame];
    
    
}

-(void)loadAnimFrame
{
    /*
     NSString* netUrl =[[Scene_data default]getWorkUrlByFilePath:self.animurl];
     netUrl=@"https://webpan.oss-cn-shanghai.aliyuncs.com/res/pan/expmd5/txtdata/standmd5anim.txt";
     [[LoadManager default] loadUrl:netUrl type:LoadManager.XML_TYPE fun:^(NSString* value) {
     NSDictionary* dic=(NSDictionary*)value;
     NSString* path=  dic[@"data"];
     NSString *str=[NSString stringWithContentsOfFile: path encoding:NSASCIIStringEncoding error:nil];
     NSLog(str);
     NSArray* matrixAry=  [[[Md5animAnalysis alloc]init]addAnim:str];
     }];
     */
    NSString *path=  [[NSBundle mainBundle]pathForResource:@"standmd5anim" ofType:@"txt"];
    NSString *str=[NSString stringWithContentsOfFile: path encoding:NSASCIIStringEncoding error:nil];
    NSArray* matrixAry=  [[[Md5animAnalysis alloc]init]addAnim:str];
    self.frameQuestArr=[[NSMutableArray alloc] init];
    for (int i = 0; i < matrixAry.count; i++) {
        NSArray<Matrix3D*>* frameAry  =matrixAry[i];
        for (int j = 0; j < frameAry.count; j++) {
            Matrix3D* invertAryM=self.md5MeshData.invertAry[j];
            [frameAry[j] prepend:invertAryM];
        }
        [self.frameQuestArr  addObject: [self makeDualQuatFloat32Array: matrixAry[i]]];
    }
    
}
-(DualQuatFloat32Array*) makeDualQuatFloat32Array:(NSArray<Matrix3D*>*)$frameAry {
    Md5MoveSprite* this=self;
    NSArray<NSNumber*>* newIDBoneArr = this.md5MeshData.boneNewIDAry;
    NSArray<Matrix3D*>* baseBone = $frameAry;
    DualQuatFloat32Array* $tempDq = [[DualQuatFloat32Array alloc] init];
    GLfloat quat[newIDBoneArr.count * 4];
    GLfloat pos[newIDBoneArr.count * 3];
    for (int k = 0; k < newIDBoneArr.count; k++) {
        Matrix3D* $m=  [baseBone[[newIDBoneArr[k]intValue]] clone] ;
        [$m appendScale:-1 y:1 z:1]; //特别标记，因为四元数和矩阵运算结果不一
        Quaternion* $q = [[Quaternion alloc] init];
        [$q fromMatrix:$m];
        Vector3D* $p = [$m position];
        quat[k * 4 + 0] = $q.x;
        quat[k * 4 + 1] = $q.y;
        quat[k * 4 + 2] = $q.z;
        quat[k * 4 + 3] = $q.w;
        
        pos[k * 3 + 0] = $p.x;
        pos[k * 3 + 1] = $p.y;
        pos[k * 3 + 2] = $p.z;
    }
    
    NSMutableArray<NSNumber*>* quatArr=[[NSMutableArray alloc]init];
    for(int m=0;m<newIDBoneArr.count * 4;m++){
        [quatArr addObject:[NSNumber numberWithFloat:quat[m]]];
    }
    $tempDq.quatArr=[[NSArray alloc]initWithArray:quatArr];
    
    NSMutableArray<NSNumber*>* posArr=[[NSMutableArray alloc]init];
    for(int n=0;n<newIDBoneArr.count * 3;n++){
        [posArr addObject:[NSNumber numberWithFloat:pos[n]]];
    }
    $tempDq.posArr=[[NSArray alloc]initWithArray:posArr];
    
    
    return $tempDq;
}
- (void)upFrame
{
    if(self.md5MeshData&&self.textureRes){
        [self updateMaterialMeshCopy];
    }
}
-(void)updateMaterialMeshCopy
{
    [self.md5MeshData upToGpu];
    Md5MoveSprite* this=self;
    Md5MeshData* mesh= this.md5MeshData;
    Context3D *ctx=this.scene3d.context3D;
    GLuint progame= self.shader3d.program;
    glUseProgram(progame);
    
    [self setVc];
    [ctx pushVa:mesh.verticesBuffer];
    [ctx setVaOffset:this.shader3d name:"pos" dataWidth:3 stride:0 offset:0];
    [ctx pushVa:mesh.uvBuffer];
    [ctx setVaOffset:this.shader3d name:"v2Uv" dataWidth:2 stride:0 offset:0];
    [ctx pushVa: mesh.boneIdBuffer];
    [ctx setVaOffset:this.shader3d name:"boneID" dataWidth:4 stride:0 offset:0];
    [ctx pushVa: mesh.boneWeightBuffer];
    [ctx setVaOffset:this.shader3d name:"boneWeight" dataWidth:4 stride:0 offset:0];
    
    [ctx setRenderTexture:self.shader3d name:@"fs0"  texture:self.textureRes.textTureLuint level:0];
    
    [ctx drawCall: mesh.indexBuffer  numTril:mesh.trinum];
}
- (void)setVc;
{
    Md5MoveSprite* this=self;
    Context3D *context3D=this.scene3d.context3D;
    [this.posMatrix3d identity];

    Matrix3D* viewM=this.viewMatrix;
  
    [context3D setVcMatrix4fv:this.shader3d name:"vpMatrix3D" data:viewM.m];
    [context3D setVcMatrix4fv:this.shader3d name:"posMatrix3D" data:this.posMatrix3d.m];
}

@end

 
