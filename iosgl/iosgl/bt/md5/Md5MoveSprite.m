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
#import "Md5MeshData.h"
#import "MeshImportSort.h"
#import "TextureManager.h"

@interface Md5MoveSprite ()
@property(nonatomic,strong)Md5MeshData* md5MeshData;
@end

@implementation Md5MoveSprite

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
  
    NSString* netUrl =[[Scene_data default]getWorkUrlByFilePath:self.bodyurl];
    netUrl=@"https://webpan.oss-cn-shanghai.aliyuncs.com/res/pan/expmd5/2/body.md5mesh";
    netUrl=@"https://webpan.oss-cn-shanghai.aliyuncs.com/res/pan/expmd5/body001.txt";
    


    [[LoadManager default] loadUrl:netUrl type:LoadManager.XML_TYPE fun:^(NSString* value) {
        NSDictionary* dic=(NSDictionary*)value;
        NSString* path=  dic[@"data"];
        NSString *str=[NSString stringWithContentsOfFile: path encoding:NSASCIIStringEncoding error:nil];
        self.md5MeshData=   [[[Md5Analysis alloc]init] addMesh:str];
        [[[MeshImportSort alloc]init] processMesh:self.md5MeshData];
 
 
    }];
}
@end
