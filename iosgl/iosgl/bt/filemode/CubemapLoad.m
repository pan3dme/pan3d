//
//  CubemapLoad.m
//  iosgl
//
//  Created by zhao on 22/4/2020.
//  Copyright © 2020 zhao. All rights reserved.
//

#import "CubemapLoad.h"
#import "LoadManager.h"
#import "Context3D.h"
#import "Scene_data.h"

@implementation CubemapLoad


-(void)loadCube:(NSString*)url fun:(SuccessMaterial)fun;
{
    CubemapLoad* this=self;
    
    
    this.flagNum=0;
    this.fun=fun;
    this.ary=[[NSMutableArray alloc]init];
    for (int i=0; i<1;i++){
        [this.ary addObject:[[NSObject alloc]init]];
        NSString* itemUrl = [NSString stringWithFormat:url,i+1];
        itemUrl= [[Scene_data default]getWorkUrlByFilePath:itemUrl];
        [this loadImgOneByOne:itemUrl idx:i];
    }
}
-(void)loadImgOneByOne:(NSString*)url idx:(int)idx;
{
    [[LoadManager default] load:url type:LoadManager.IMG_TYPE fun:^(NSObject * _Nonnull imgName) {
        
        NSLog(@"url%@",url);
        
        self.ary[idx]=imgName;
        [self makeCubeText:[UIImage imageNamed:imgName]];
        self.flagNum++;
        if(self.flagNum==6){
            self.fun(self.ary);
        }
        
        
        
        
    } info:nil progressFun:^(int pronum) {
        
    }];
}
-(void)makeCubeText:(UIImage*)image;
{
    
    CGImageRef cgImageRef = [image CGImage];
    GLuint width = (GLuint)CGImageGetWidth(cgImageRef);
    GLuint height = (GLuint)CGImageGetHeight(cgImageRef);
    
    GLuint textureID;
    glGenTextures(1, &textureID);
    
    glBindTexture(GL_TEXTURE_CUBE_MAP, textureID);
    for(GLuint i = 0; i <6; i++)
    {
        void *imageData = [Context3D imageChangeToImageData:image];
        
        glTexImage2D(GL_TEXTURE_CUBE_MAP_POSITIVE_X + i, 0, GL_RGB, width/3, height/3, 0, GL_RGBA, GL_UNSIGNED_BYTE, imageData);
    }
    glTexParameteri(GL_TEXTURE_CUBE_MAP, GL_TEXTURE_MAG_FILTER, GL_LINEAR);
    glTexParameteri(GL_TEXTURE_CUBE_MAP, GL_TEXTURE_MIN_FILTER, GL_LINEAR);
    glTexParameteri(GL_TEXTURE_CUBE_MAP, GL_TEXTURE_WRAP_S, GL_CLAMP_TO_EDGE);
    glTexParameteri(GL_TEXTURE_CUBE_MAP, GL_TEXTURE_WRAP_T, GL_CLAMP_TO_EDGE);
    //glTexParameteri(GL_TEXTURE_CUBE_MAP, GL_TEXTURE_WRAP_R, GL_CLAMP_TO_EDGE);
    glBindTexture(GL_TEXTURE_CUBE_MAP, 0);
    
    
}
 
-(void)loadCubemap:(NSArray*)faces;
{
    GLuint textureID;
    glGenTextures(1, &textureID);
    int width, height;
    unsigned char* image;
    glBindTexture(GL_TEXTURE_CUBE_MAP, textureID);
    for(GLuint i = 0; i < faces.count; i++)
    {
        glTexImage2D(GL_TEXTURE_CUBE_MAP_POSITIVE_X + i, 0, GL_RGB, 128, 128, 0, GL_RGB, GL_UNSIGNED_BYTE, image);
       
    }
    glTexParameteri(GL_TEXTURE_CUBE_MAP, GL_TEXTURE_MAG_FILTER, GL_LINEAR);
    glTexParameteri(GL_TEXTURE_CUBE_MAP, GL_TEXTURE_MIN_FILTER, GL_LINEAR);
    glTexParameteri(GL_TEXTURE_CUBE_MAP, GL_TEXTURE_WRAP_S, GL_CLAMP_TO_EDGE);
    glTexParameteri(GL_TEXTURE_CUBE_MAP, GL_TEXTURE_WRAP_T, GL_CLAMP_TO_EDGE);
    //glTexParameteri(GL_TEXTURE_CUBE_MAP, GL_TEXTURE_WRAP_R, GL_CLAMP_TO_EDGE);
    glBindTexture(GL_TEXTURE_CUBE_MAP, 0);

}
/*
GLuint loadCubemap(vector<const GLchar*> faces)
{
    GLuint textureID;
    glGenTextures(1, &textureID);

    int width, height;
    unsigned char* image;

    glBindTexture(GL_TEXTURE_CUBE_MAP, textureID);
    for(GLuint i = 0; i < faces.size(); i++)
    {
        image = SOIL_load_image(faces[i], &width, &height, 0, SOIL_LOAD_RGB);
        glTexImage2D(GL_TEXTURE_CUBE_MAP_POSITIVE_X + i, 0, GL_RGB, width, height, 0, GL_RGB, GL_UNSIGNED_BYTE, image);
        SOIL_free_image_data(image);    //  // 释放源图像内存
    }
    glTexParameteri(GL_TEXTURE_CUBE_MAP, GL_TEXTURE_MAG_FILTER, GL_LINEAR);
    glTexParameteri(GL_TEXTURE_CUBE_MAP, GL_TEXTURE_MIN_FILTER, GL_LINEAR);
    glTexParameteri(GL_TEXTURE_CUBE_MAP, GL_TEXTURE_WRAP_S, GL_CLAMP_TO_EDGE);
    glTexParameteri(GL_TEXTURE_CUBE_MAP, GL_TEXTURE_WRAP_T, GL_CLAMP_TO_EDGE);
    glTexParameteri(GL_TEXTURE_CUBE_MAP, GL_TEXTURE_WRAP_R, GL_CLAMP_TO_EDGE);
    glBindTexture(GL_TEXTURE_CUBE_MAP, 0);

    return textureID;
}
*/
/*
 public loadCube($url: string, $fun: Function): void {
        this.fun = $fun;
        for (var i: number=0; i<6;i++){
            var itemUrl: string = $url + "0"+ (i + 1) + ".jpg";

            LoadManager.getInstance().load(itemUrl, LoadManager.IMG_TYPE, ($img: any, $info: any) => { this.loadCom($img, $info)}, {"id" : i});

        }
    }
 */
@end
