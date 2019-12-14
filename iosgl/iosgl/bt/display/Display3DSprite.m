//
//  Display3DSprite.m
//  iosgl
//
//  Created by zhao on 7/12/2019.
//  Copyright © 2019 zhao. All rights reserved.
//

#import "Display3DSprite.h"
#import "MaterialManager.h"
#import "ObjDataManager.h"
#import "MetalMatrixUtilities.h"

@implementation Display3DSprite
 
- (instancetype)init
{
    self = [super init];
    if (self) {
        self.numskip=0.0;
        [self loadShaderByUrl:@"shadertwo"];
        [self loadObjDataByUrl:@"1"];
        [self loadTextureResByUrl:@"xinshoupic.png"]; 
    
        [self.posMatrix3d outString];
    }
    return self;
}
-(void)loadShaderByUrl:(NSString*)value;
{
    self.shader3d= [[Shader3D alloc]init];
    [self.shader3d encodeVstr:[[NSBundle mainBundle]pathForResource:value ofType:@"vsh"] encodeFstr:[[NSBundle mainBundle]pathForResource:value ofType:@"fsh"]];
}
-(void)loadObjDataByUrl:(NSString*)value;
{
    
    self.objData= [[ ObjDataManager default]getObjDataByUrl:value];
   
    [self.objData upToGpu];
}
-(void)loadTextureResByUrl:(NSString*)value;
{
    self.textureRes=[[MaterialManager default] getMaterialByUrl:value];
}
-(void)upFrame{
    [super upFrame];
    if(_shader3d&&_objData&&_textureRes){
        
        self.numskip+=2;
        
        Vector3D   *tempV  =[[Vector3D alloc]init];
          tempV.x=0;
          tempV.y=1;
          tempV.z=0;
      [self.posMatrix3d prependRotation:2 axis:tempV ];
        
        
        
        GLuint progame= _shader3d.program;
        glUseProgram(progame);
        glBindTexture(_textureRes.texture.target,_textureRes.texture.name);
       
      
        GLuint rotateID = glGetUniformLocation( progame, "posMatrix");
       matrix_float4x4 pv=    [self updata];
        GLfloat abc[16]={
              pv.columns[0][0],pv.columns[0][1],pv.columns[0][2],pv.columns[0][3],
              pv.columns[1][0],pv.columns[1][1],pv.columns[1][2],pv.columns[1][3],
              pv.columns[2][0],pv.columns[2][1],pv.columns[2][2],pv.columns[2][3],
              pv.columns[3][0],pv.columns[3][1],pv.columns[3][2],pv.columns[3][3],
            };
        GLfloat dt[16]={
             1,0,0,0,
             0,1,0,0,
             0,0,1.0,0,
             0,0,0,1.0,
         };
        
   
        glUniformMatrix4fv(rotateID, 1, GL_FALSE, abc);
        
        
        glBindBuffer(GL_ARRAY_BUFFER, _objData.verticesBuffer);
        GLuint position = glGetAttribLocation( progame, "position");
        glEnableVertexAttribArray(position);
        glVertexAttribPointer(position, 3, GL_FLOAT, GL_FALSE,sizeof(GLfloat)*5, (GLfloat *)NULL);
        
        
        GLuint textCoor = glGetAttribLocation( progame, "textCoordinate");
        glEnableVertexAttribArray(textCoor);
        glVertexAttribPointer(textCoor, 2, GL_FLOAT, GL_FALSE, sizeof(GLfloat)*5, (GLfloat *)NULL+3);
        
        glDrawArrays(GL_TRIANGLES, 0, 6);
    }
    

    
}
-(matrix_float4x4 )updata;
{
    static const vector_float4 cameraPosition = { 0, 0, 5, 1 };
    const CGSize size =CGSizeMake(300, 300);
    const CGFloat aspectRatio = size.width / size.height;
    const CGFloat verticalFOV = (aspectRatio > 1) ? 60 : 90;
    static const CGFloat near = 0.1;
    static const CGFloat far = 1;
    matrix_float4x4 pv = matrix_perspective_projection(aspectRatio, verticalFOV * (M_PI / 180), near, far);
     
    matrix_float4x4  modelViewProjectionMatrix = matrix_multiply(pv, pv );
    
    
    vector_float3 tx={0,1,0};
    
    matrix_float4x4 ct= matrix_translation(tx);
    return ct;
}
@end
