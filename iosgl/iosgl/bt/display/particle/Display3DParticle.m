//
//  Display3DParticle.m
//  iosgl
//
//  Created by zhao on 23/2/2020.
//  Copyright © 2020 zhao. All rights reserved.
//

#import "Display3DParticle.h"
#import "ParticleData.h"
#import "DynamicTexItem.h"
#import "Context3D.h"
#import "Shader3D.h"
#import "Scene3D.h"

@implementation Display3DParticle

- (instancetype)init
{
    self = [super init];
    if (self) {
        self._time=0;
        self.visible=YES;
    }
    return self;
}
-(void)onCreated;
{
}
-(void)updateTime:(float)t;
{
    self._time=t;
}
-(void)updateMatrix;
{
 
    [self.posMatrix3d identity];
    [self.posMatrix3d prependScale:self.scaleX*0.2 y:self.scaleY*0.2 z:_scaleZ*0.2];
    
    [self.modeMatrix identity];
    [self.modeMatrix append:self.posMatrix3d];
 
    
    [self.rotationMatrix3D identity];
    [self.rotationMatrix3D appendRotation:_rotationX axis:Vector3D.X_AXIS];
    [self.rotationMatrix3D appendRotation:_rotationY axis:Vector3D.Y_AXIS];
    [self.rotationMatrix3D appendRotation:_rotationZ axis:Vector3D.Z_AXIS];
 

}
-(void)update;
{
    if(self.visible ){
        if ( self.data.materialParam){
            Context3D *ctx=self.scene3d.context3D;
            self.shader3d=self.data.materialParam.shader;
            
            glUseProgram(self.shader3d.program);
            [ctx setBlendParticleFactors:self.data._alphaMode];
            [ctx cullFaceBack:self.data.materialParam.material.backCull];
            [self updateMatrix];
            [self setMaterialTexture];
            [self setVc];
            [self setVa];
            [self resetVa];
        }
        
    }
}
/*
 设置基础透视，镜头，模型矩阵
 */
-(void)setViewCamModeMatr3d;
{
    Context3D *ctx=self.scene3d.context3D;
    Camera3D* cam3D=self.scene3d.camera3D;
    
    [ctx setVcMatrix4fv:self.shader3d name:"viewMatrix" data:cam3D.viewMatrix.m];
    [ctx setVcMatrix4fv:self.shader3d name:"camMatrix" data:cam3D.camMatrix3D.m];
    [ctx setVcMatrix4fv:self.shader3d name:"modeMatrix" data:self.modeMatrix.m];
}

-(void)setMaterialTexture;
{
    Context3D *ctx=self.scene3d.context3D;
    NSArray<TexItem*>* texVec  = self.data.materialParam.material.texList;
    for (int i   = 0; i < texVec.count; i++) {
        if (texVec[i].isDynamic) {
            continue;
        }
        [ctx setRenderTexture:self.data.materialParam.shader name:texVec[i].name texture:  texVec[i].textureRes.textTureLuint level:0];
    }
    NSArray<DynamicTexItem*>* texDynamicVec  =( NSArray<DynamicTexItem*>*) self.data.materialParam.dynamicTexList;
    for (int i   = 0; i < texDynamicVec.count; i++) {
        TexItem* texItem=texDynamicVec[i].target;
         [ctx setRenderTexture:self.data.materialParam.shader name:texDynamicVec[i].target.name  texture:texDynamicVec[i].texture level:texItem.id];
    }
 
}
//public inverBind(): void{
//      if (!this.invertBindMatrix.isIdentity){
//          //this.bindMatrix.invert();
//          this._rotationMatrix.prepend(this.invertBindMatrix);
//          //this.bindMatrix.invert();
//      }
//  }
-(void)inverBind;
{
    if(self.invertBindMatrix){
        
    }
    
}
-(void)setVc;
{
}
-(void)setVa;
{
}
-(void)resetVa;
{
}


@end
