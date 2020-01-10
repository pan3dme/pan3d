//
//  SceneDisplay3DSprite.m
//  iosgl
//
//  Created by zhao on 28/12/2019.
//  Copyright © 2019 zhao. All rights reserved.
//

#import "SceneDisplay3DSprite.h"
#import "Shader3D.h"
@interface SceneDisplay3DSprite()

@end
@implementation SceneDisplay3DSprite
-(void) setInof:(NSDictionary*)value;
{
    
    NSString *objsurl=[ value objectForKey:@"objsurl"];
    
    self.scaleX=[[ value objectForKey:@"scaleX"]floatValue];
    self.scaleY=[[ value objectForKey:@"scaleY"]floatValue]*1.0f;
    self.scaleZ=[[ value objectForKey:@"scaleZ"]floatValue];
    
    self.x=[[ value objectForKey:@"x"]floatValue];
    self.y=[[ value objectForKey:@"y"]floatValue];
    self.z=[[ value objectForKey:@"z"]floatValue];
    
    self.rotationX=[[ value objectForKey:@"rotationX"]floatValue];
    self.rotationY=[[ value objectForKey:@"rotationY"]floatValue];
    self.rotationZ=[[ value objectForKey:@"rotationZ"]floatValue];
    
 
    [self makeShader ];
    
    [self loadTextureResByUrl:@"tu001.jpg"];
    [self loadObjDataByUrl:objsurl];
}
-(void)makeShader
{
    char* vstr =
    "attribute vec3 position;\n"
    "attribute vec2 textCoordinate;\n"
    "uniform mat4 posMatrix;\n"
    "varying lowp vec2 varyTextCoord;\n"
    "void main()"
    "{"
        "varyTextCoord = textCoordinate;\n"
        "vec4 vPos = vec4(position.xyz,1.0);\n"
        "gl_Position = vPos * posMatrix;\n"
    "}";
    
    char* fstr =
    "varying lowp vec2 varyTextCoord;\n"
    "uniform sampler2D colorMap;\n"
    "void main()"
    "{"
        "gl_FragColor = vec4(1.0, 1.0, 0.0, 1.0);\n"
    "}";
    
    
    self.shader3d= [[Shader3D alloc]init];
   [self.shader3d encodeVstr:[ NSString stringWithFormat:@"%s" ,vstr] encodeFstr:[ NSString stringWithFormat:@"%s" ,fstr]];
    
    
}
-(void)upFrame{
 
   if(self.shader3d&&self.objData&&self.objData.indexs&&self.textureRes){
          
             [self upDataCamView];
              
              GLuint progame= self.shader3d.program;
              glUseProgram(progame);
              glBindTexture(self.textureRes.texture.target,self.textureRes.texture.name);
              
              GLuint rotateID = glGetUniformLocation( progame, "posMatrix");
              glUniformMatrix4fv(rotateID, 1, GL_TRUE, self.modeMatrix.m);
            
             
             
              glBindBuffer(GL_ARRAY_BUFFER, self.objData.dataViewBuffer);
              GLuint position = glGetAttribLocation( progame, "position");
              glEnableVertexAttribArray(position);
              glVertexAttribPointer(position, 3, GL_FLOAT, GL_FALSE,self.objData.stride, (GLfloat *)NULL);
              GLuint textCoor = glGetAttribLocation( progame, "textCoordinate");
              glEnableVertexAttribArray(textCoor);
              glVertexAttribPointer(textCoor, 2, GL_FLOAT, GL_FALSE, self.objData.stride, (GLfloat *)NULL+self.objData.uvsOffsets);
              
              glBindBuffer(GL_ELEMENT_ARRAY_BUFFER, self.objData.indexBuffer);
              glDrawElements(GL_TRIANGLES, (int)self.objData.indexs.count, GL_UNSIGNED_INT, 0);
        
          }
     
  
}
@end
