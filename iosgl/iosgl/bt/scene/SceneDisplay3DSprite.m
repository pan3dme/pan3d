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

@end
@implementation SceneDisplay3DSprite
-(void) setInof:(NSDictionary*)value;
{
    
    NSString *objsurl=[ value objectForKey:@"objsurl"];
    
    self.scaleX=[[ value objectForKey:@"scaleX"]floatValue];
    self.scaleY=[[ value objectForKey:@"scaleY"]floatValue];
    self.scaleZ=[[ value objectForKey:@"scaleZ"]floatValue];
    
    self.x=[[ value objectForKey:@"x"]floatValue];
    self.y=[[ value objectForKey:@"y"]floatValue];
    self.z=[[ value objectForKey:@"z"]floatValue];
    
    self.rotationX=[[ value objectForKey:@"rotationX"]floatValue];
    self.rotationY=[[ value objectForKey:@"rotationY"]floatValue];
    self.rotationZ=[[ value objectForKey:@"rotationZ"]floatValue];
    
    
    [[ProgrmaManager default] registe:SceneDisplay3DShader.shaderStr shader3d: [[SceneDisplay3DShader alloc]init]];
    self.shader3d=  [[ProgrmaManager default] getProgram:SceneDisplay3DShader.shaderStr];
    
    [self loadTextureResByUrl:@"tu001.jpg"];
    [self loadObjDataByUrl:objsurl];
}


-(void)upFrame{
    
    if(self.shader3d&&self.objData&&self.objData.indexs&&self.textureRes){
        
        GLuint progame= self.shader3d.program;
        glUseProgram(progame);
        
        glBindTexture(self.textureRes.texture.target,self.textureRes.texture.name);
        
        [ self.scene3d.context3D setVcMatrix4fv:self.shader3d name:"viewMatrix" data:self.viewMatrix];
        [ self.scene3d.context3D setVcMatrix4fv:self.shader3d name:"posMatrix" data:self.posMatrix3d];
        
        GLuint _uLight = glGetUniformLocation( progame, "sunDirect");
        glUniform3fv(_uLight, 1, (const GLfloat []) {1,1, 0});
     
        /*
             glBindBuffer(GL_ARRAY_BUFFER, self.objData.dataViewBuffer);
        GLuint position = glGetAttribLocation( progame, "position");
        glEnableVertexAttribArray(position);
        glVertexAttribPointer(position, 3, GL_FLOAT, GL_FALSE,self.objData.stride, (GLfloat *)NULL);
        
        GLuint v3Normal = glGetAttribLocation( progame, "v3Normal");
        glEnableVertexAttribArray(v3Normal);
        glVertexAttribPointer(v3Normal, 3, GL_FLOAT, GL_FALSE,self.objData.stride,  (GLfloat *)NULL+self.objData.normalsOffsets);
        GLuint textCoor = glGetAttribLocation( progame, "textCoordinate");
        glEnableVertexAttribArray(textCoor);
        glVertexAttribPointer(textCoor, 2, GL_FLOAT, GL_FALSE, self.objData.stride, (GLfloat *)NULL+self.objData.uvsOffsets);
       */
        
          glBindBuffer(GL_ARRAY_BUFFER, self.objData.dataViewBuffer);
        [self.scene3d.context3D setVaOffset:self.shader3d name:"position" dataWidth:3 stride:self.objData.stride offset:0];
        [self.scene3d.context3D setVaOffset:self.shader3d name:"textCoordinate" dataWidth:2 stride:self.objData.stride offset:self.objData.uvsOffsets];
        [self.scene3d.context3D setVaOffset:self.shader3d name:"v3Normal" dataWidth:3 stride:self.objData.stride offset:self.objData.normalsOffsets];
       
        
        glBindBuffer(GL_ELEMENT_ARRAY_BUFFER, self.objData.indexBuffer);
        glDrawElements(GL_TRIANGLES, (int)self.objData.indexs.count, GL_UNSIGNED_INT, 0);
        
        
    }
    
    
}
-(void)setShaderInfo
{
    float gameAngle=45;
    Vector3D *numr = [[Vector3D  alloc]x:0.5 y:0.6 z:-0.7 w:1];
    [numr normalize];
    Matrix3D *mGamA  = [[Matrix3D alloc]init];;
    [mGamA appendRotation:gameAngle axis:Vector3D.Y_AXIS];
    
    Scene3D *scene3d=self.scene3d;
    
    float32x4_t sunDirect = (float32x4_t) { 0.0f,  1.0f,  2.0f,  3.0f};
    [ scene3d.context3D setVc3fv:self.shader3d name:"sunDirect" data:sunDirect];
    
    
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
