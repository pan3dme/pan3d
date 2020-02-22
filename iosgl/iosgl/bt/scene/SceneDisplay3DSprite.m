//
//  SceneDisplay3DSprite.m
//  iosgl
//
//  Created by zhao on 28/12/2019.
//  Copyright © 2019 zhao. All rights reserved.
//

#import "SceneDisplay3DSprite.h"
#import "SceneDisplay3DShader.h"
#import "ProgrmaManager.h"
#import "Scene3D.h"
#import "Matrix4x4.h"
@interface SceneDisplay3DSprite()
@property (nonatomic, assign)  int skipnum  ;

@end
@implementation SceneDisplay3DSprite
-(void) setInof:(NSDictionary*)value;
{
    
    NSString *objsurl=[ value objectForKey:@"objsurl"];
    
    self.scaleX=[self getFloatByKey:value keystr:@"scaleX"];
    self.scaleY=[self getFloatByKey:value keystr:@"scaleY"];
    self.scaleZ=[self getFloatByKey:value keystr:@"scaleZ"];
    
    self.x=[self getFloatByKey:value keystr:@"x"];
    self.y=[self getFloatByKey:value keystr:@"y"];
    self.z=[self getFloatByKey:value keystr:@"z"];
    
    self.rotationX=[self getFloatByKey:value keystr:@"rotationX"];
    self.rotationY=[self getFloatByKey:value keystr:@"rotationY"];
    self.rotationZ=[self getFloatByKey:value keystr:@"rotationZ"];
    
   
    
    
    [[ProgrmaManager default] registe:SceneDisplay3DShader.shaderStr shader3d: [[SceneDisplay3DShader alloc]init]];
    self.shader3d=  [[ProgrmaManager default] getProgram:SceneDisplay3DShader.shaderStr];
    
    [self loadTextureResByUrl:@"tu001.jpg"];
    [self loadObjDataByUrl:objsurl];
}
-(float)getFloatByKey:(NSDictionary*)dic keystr:(NSString*)keystr
{
    float a=  [[ dic objectForKey:keystr ]floatValue];
    return a;
}


-(void)upFrame{
    
    if(self.shader3d&&self.objData&&self.objData.indexs&&self.textureRes){
        
        GLuint progame= self.shader3d.program;
        glUseProgram(progame);
        [self setShaderInfo];
        
        
        Context3D *context3D=self.scene3d.context3D;
        
        [context3D setRenderTexture:self.textureRes.texture ];
        [context3D setVcMatrix4fv:self.shader3d name:"viewMatrix" data:self.viewMatrix.m];
        [context3D setVcMatrix4fv:self.shader3d name:"posMatrix" data:self.posMatrix3d.m];
        [context3D setVcMatrix3fv:self.shader3d name:"rotationMat3x3" data:self.rotationMatrix3D.rotationM];
      
        [context3D pushVa:self.objData.dataViewBuffer];
        [context3D setVaOffset:self.shader3d name:"position" dataWidth:3 stride:self.objData.stride offset:0];
        [context3D setVaOffset:self.shader3d name:"textCoordinate" dataWidth:2 stride:self.objData.stride offset:self.objData.uvsOffsets];
        [context3D setVaOffset:self.shader3d name:"v3Normal" dataWidth:3 stride:self.objData.stride offset:self.objData.normalsOffsets];
   
        [context3D drawCall:self.objData.indexBuffer  numTril:(int)self.objData.indexs.count ];

    }
    
    
}
 
-(void)setShaderInfo
{
    Context3D *context3D=self.scene3d.context3D;
    if(!self.skipnum){
        self.skipnum=1;
    }
    float gameAngle=45+self.skipnum++;
    Vector3D *nrmVec3 = [[Vector3D  alloc]x:0.5 y:0.5 z:0.5 w:1];
    [nrmVec3 normalize];
    Matrix3D *rotationM  = [[Matrix3D alloc]init];;
    [rotationM appendRotation:gameAngle axis:Vector3D.Y_AXIS];
    nrmVec3=  [rotationM transformVector:nrmVec3];
    
    [context3D setVc3fv:self.shader3d name:"sunDirect" data: (  GLfloat []) {nrmVec3.x,nrmVec3.y,nrmVec3.z}];
    [context3D setVc3fv:self.shader3d name:"sunColor" data: ( GLfloat []) {0.8,0.8, 0.8}];
    [context3D setVc3fv:self.shader3d name:"ambientColor" data: ( GLfloat []) {0.2,0.2, 0.2}];
   
}
/*
 var $numr: Vector3D = new Vector3D(0.5, 0.6, -0.7);
 $numr.normalize()
 var mGamA: Matrix3D = new Matrix3D;
 mGamA.appendRotation(-game.GameDataModel.gameAngle, Vector3D.Y_AXIS);
 $numr = mGamA.transformVector($numr)
 Scene_data.context3D.setVc3fv($shader, "sunDirect", [$numr.x, $numr.y, $numr.z]);
 Scene_data.context3D.setVc3fv($shader, "sunColor", [0.8, 0.8, 0.8]);
 Scene_data.context3D.setVc3fv($shader, "ambientColor", [0.2, 0.2, 0.2]);
 
 
 Scene_data.context3D.setVcMatrix3fv($shader, "rotationMatrix3D", $dis._rotationData);
 Scene_data.context3D.setVcMatrix4fv($shader, "vpMatrix3D", Scene_data.vpMatrix.m);
 Scene_data.context3D.setVcMatrix4fv($shader, "posMatrix3D", this.posMatrix.m);
 
 Scene_data.context3D.renderContext.bindBuffer(Scene_data.context3D.renderContext.ARRAY_BUFFER, $objdata.vertexBuffer);
 
 Scene_data.context3D.setVaOffset(0, 3, $objdata.stride, 0);
 Scene_data.context3D.setVaOffset(1, 2, $objdata.stride, $objdata.uvsOffsets);
 Scene_data.context3D.setVaOffset(2, 3, $objdata.stride, $objdata.normalsOffsets);
 
 if (this.skinTexture) {
 Scene_data.context3D.setRenderTexture($shader, "fs0", this.skinTexture.texture, 0);
 } else {
 Scene_data.context3D.setRenderTexture($shader, "fs0", this._uvTextureRes.texture, 0);
 }
 if (shadow.ShadowModel.visible) {
 Scene_data.context3D.setVcMatrix4fv($shader, "shadowViewMatx3D", ShadowModel.shadowViewMatx3D.m);
 Scene_data.context3D.setRenderTexture($shader, "fs1", (<scene3d.OverrideSceneManager>this._scene).fbo.texture, 1);
 }
 */
@end
