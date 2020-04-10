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
#import "TextureRes.h"
#import "DualQuatFloat32Array.h"
#import "ProgrmaManager.h"
#import "MaterialAnimShader.h"
#import "MeshDataManager.h"
#import "Display3DSprite.h"
#import "TextureManager.h"

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


@property(nonatomic,strong)TextureRes*  textBaseTextureRes;

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
        [self loadTextTexture];
    } batchNum:1];
}
-(void)loadTextTexture;
{
    NSString* url=@"content/characterresource/guaiwu/duozulei/yezhu/yezhu.png";
    [[ TextureManager default]getTexture:url fun:^(NSObject * _Nonnull any) {
        self.textBaseTextureRes=(TextureRes*)any;
        NSLog(@"---");
        
    } wrapType:0 info:nil filteType:0 mipmapType:0];
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
    if(self.meshVisible&&self.textBaseTextureRes){
        for (int i = 0; i < self.skinMesh.meshAry.count; i++) {
            [this updataBase:this.skinMesh.meshAry[i]];
        }
    }
    
}
-(void)updataBase:(MeshData*)mesh;
{
    GLuint progame= self.shader3d.program;
    glUseProgram(progame);
    Context3D *ctx=self.scene3d.context3D;
    [ctx setBlendParticleFactors:0];
    [ctx cullFaceBack:YES];
    
    [ctx setRenderTexture:self.shader3d name:@"fs0" texture:self.textBaseTextureRes.textTureLuint level:0];
    [self setVc];
    [self setMeshVc:mesh];
    [self setVaCompress:mesh];
    
}
-(void)setVaCompress:(MeshData*)mesh;
{
    [mesh upToGpu];
    
    Context3D *ctx=self.scene3d.context3D;
    [ctx pushVa:mesh.verticesBuffer];
    [ctx setVaOffset:self.shader3d name:"pos" dataWidth:3 stride:0 offset:0];
    [ctx pushVa:    mesh.uvBuffer];
    [ctx setVaOffset:self.shader3d name:"v2Uv" dataWidth:2 stride:0 offset:0];
    [ctx pushVa: mesh.boneIdBuffer];
    [ctx setVaOffset:self.shader3d name:"boneID" dataWidth:4 stride:0 offset:0];
    [ctx pushVa: mesh.boneWeightBuffer];
    [ctx setVaOffset:self.shader3d name:"boneWeight" dataWidth:4 stride:0 offset:0];
    [ctx drawCall: mesh.indexBuffer  numTril:mesh.trinum];
    
}
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
    
    
    
    //    Scene_data.context3D.setVc4fv($mesh.material.shader, "boneQ", $dualQuatFrame.quat); //旋转
    //    Scene_data.context3D.setVc3fv($mesh.material.shader, "boneD", $dualQuatFrame.pos);  //所有的位移
    
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
    
    if (!mesh.material) {
        return;
    }
    NSLog(@"---");
    
    
}

- (void)updateFrame:(float)t;
{
    if(!self.skinMesh){
        return;
    }
    /*
     [0]    (null)    @"attack_01" : (no summary)
     [1]    (null)    @"stand" : (no summary)
     [2]    (null)    @"walk" : (no summary)
     [3]    (null)    @"death" : (no summary)
     [4]    (null)    @"injured" : (no summary)
     */
    
    Display3dMovie* this=self;
    this.curentAction=@"injured";
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
    //   NSLog(@" this.curentFrame%d", this.curentFrame);
    
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



@end


/*
 
 NSString* qstr=   @"-0.705668032169342, 0.0015502048190683126, 0.0014888365985825658, 0.7085393667221069, -0.7069513201713562, -0.0006783951539546251, 0.002088965382426977, 0.7072587609291077, -0.711971640586853, 0.005043141543865204, 0.004772303160279989, 0.7021738886833191, -0.7119688987731934, 0.0051478613168001175, 0.004703479818999767, 0.7021763920783997, -0.7116854786872864, 0.00507725402712822, 0.004584133625030518, 0.7024649381637573, -0.7073065042495728, -0.00006479574949480593, 0.00011193022510269657, 0.7069070339202881, -0.7047916650772095, -0.0001385251380270347, 0.0016055686865001917, 0.7094125151634216, -0.7064068913459778, 0.002864603651687503, -0.004783664830029011, 0.7077839970588684, -0.7044687271118164, 0.0037642670795321465, -0.0039721643552184105, 0.7097139358520508, -0.7225785851478577, 0.0017402938101440668, 0.0033159616868942976, 0.6912786364555359, -0.7101830244064331, -0.004277620930224657, 0.0024529898073524237, 0.7039998173713684, -0.7055971622467041, -0.00025221353280358016, 0.0006513467524200678, 0.708612859249115, -0.7070940136909485, 0.00020237211720086634, -0.0014702498447149992, 0.707118034362793, -0.7071821689605713, 0.00037503388011828065, 0.0002052528434433043, 0.7070311903953552, -0.7011821866035461, 0.002216410357505083, -0.002887168899178505, 0.7129728198051453, -0.706463098526001, -0.00158476154319942, -0.0015974468551576138, 0.7077462673187256, -0.7214061617851257, -0.001112239551730454, -0.002049652859568596, 0.6925082802772522, -0.7064121961593628, 0.00044539416558109224, 0.002345234854146838, 0.7077966332435608, -0.711969256401062, 0.005148523952811956, 0.004703299142420292, 0.7021759748458862, -0.7035160660743713, -0.00016390880045946687, 0.0016760834259912372, 0.7106773853302002, -0.6935145258903503, 0.00028085176018066704, -0.006487127859145403, 0.7204133868217468, -0.7056529521942139, -0.0005823141545988619, 0.0017979544354602695, 0.7085551023483276, -0.7071167826652527, -0.000997620285488665, -0.0005131613579578698, 0.7070958614349365, -0.7070087790489197, 0.00001935356885951478, 0.0003248178691137582, 0.7072046995162964";
 
 
 NSString* pstr=   @"-0.03905847668647766, -0.04417011886835098, -16.022830963134766, 0.03882760927081108, -0.06092384085059166, -15.961396217346191, -0.2386750727891922, -0.2866630554199219, -15.646263122558594, -0.2460947483778, -0.28677770495414734, -15.646492958068848, -0.23748886585235596, -0.2601698935031891, -15.66344165802002, -0.005347229540348053, -0.0737357810139656, -15.93178653717041, 0.02153763175010681, -0.06588122993707657, -16.034334182739258, 0.04132276773452759, 0.21877749264240265, -16.032089233398438, -0.02948245033621788, 0.3785538971424103, -16.03790283203125, 0.0366889163851738, 0.4665803015232086, -15.110249519348145, -0.033220142126083374, -0.005588551517575979, -15.379670143127441, -0.0010388292139396071, -0.041849762201309204, -16.021764755249023, -0.0362117663025856, 0.010108768939971924, -16.015214920043945, -0.030863577499985695, -0.008314167149364948, -15.99866008758545, 0.04989834129810333, 0.4575684666633606, -15.966992378234863, 0.48719310760498047, 0.3217101991176605, -15.938105583190918, 0.46897655725479126, -1.2478159666061401, -15.428751945495605, 0.01766335405409336, -0.03478686511516571, -15.978245735168457, -0.24452626705169678, -0.2869241237640381, -15.64615535736084, 0.01979413814842701, -0.019689064472913742, -16.07272720336914, 0.21457605063915253, 0.9130419492721558, -15.997469902038574, 0.02410266175866127, 0.0029243596363812685, -16.026050567626953, 0.00660416204482317, 0.0018276940099895, -15.997230529785156, -0.010745225474238396, 0.01285846158862114, -16.015295028686523";
 
 
 NSArray *qItem = [qstr componentsSeparatedByString:@","]; //分段
 for (int i=0; i<qItem.count; i++) {
 boneQarr[i]= [qItem[i] floatValue];
 }
 
 NSArray *pItem = [pstr componentsSeparatedByString:@","]; //分段
 for (int i=0; i<pItem.count; i++) {
 boneDarr[i]= [pItem[i] floatValue];
 }
 */
