//
//  TextureManager.m
//  iosgl
//
//  Created by zhao on 14/3/2020.
//  Copyright © 2020 zhao. All rights reserved.
//

#import "TextureManager.h"
#import "TextureLoad.h"
#import "MaterialManager.h"
#import "LoadManager.h"
#import "CubemapLoad.h"
#import "Scene_data.h"
#import "Context3D.h"
#import "MtkScene3D.h"


@interface TextureManager()
 
@property (nonatomic, strong)NSMutableDictionary* loadDic;
@property (nonatomic, strong)NSMutableDictionary* resDic;
 
@end
static TextureManager *instance = nil;
@implementation TextureManager
+ (instancetype)default{
    if (instance == nil) {
        instance = [[TextureManager alloc] init];
        
    
    }
    return instance;
}
- (instancetype)init
{
    self = [super init];
    if (self) {
        self.loadDic=[[NSMutableDictionary alloc]init];
        self.resDic=[[NSMutableDictionary alloc]init];
        
    }
    return self;
}
-(void)loadCubeTexture:(NSString*)url fun:(void (^)(GLuint  any))fun;
{
    url=[[Scene_data default]getWorkUrlByFilePath:url];
    [[LoadManager default] load:url type:1 fun:^(NSObject * _Nonnull imgName) {
         GLuint textUtile=   [Context3D makeCubeText:[UIImage imageNamed:[NSString stringWithFormat:@"%@",imgName]]];
 
        fun(textUtile);
  
     } info:nil progressFun:^(int pronum) {
         
     }];
    
}
//public loadCubeTexture($url: string, $fun: Function): void {
//       var cubeMapLoad: CubemapLoad = new CubemapLoad();
//       cubeMapLoad.loadCube($url, ($cubeList: any) => { $fun($cubeList)});
//   }
 
-(void)getTexture:(NSString*)url fun:(void (^)(NSObject* any))fun wrapType:(int)wrapType info:(NSObject*)info filteType:(int)filteType mipmapType:(int)mipmapType;
{

    if (self.dic[url]) {
           NSLog(@"资源图片   %@",url);
        if (info) {
            fun(@{@"data":self.dic[url],@"info":info});
        } else {
            fun(self.dic[url]);
        }
        return;
    }else{
         NSLog(@"网络图片   %@",url);
    }
    TextureLoad* textureLoad= [[TextureLoad alloc]init:fun info:info url:url wrap:wrapType filter:filteType mipmap:mipmapType];
    if (self.loadDic[url]){
        NSMutableArray<TextureLoad*>*  ary  = self.loadDic[url];
        [ary addObject:textureLoad];
        return;
    }
    self.loadDic[url] =[[NSMutableArray alloc]init];
    [self.loadDic[url] addObject:textureLoad];
    
    if (self.resDic[url]) {
        NSLog(@"资源   %@",url);
        [self loadTextureCom:self.resDic[url] info:textureLoad];
        [self.resDic removeObjectForKey:url];
    }else{
        [[ LoadManager default] load:url type:1 fun:^(NSObject * _Nonnull any) {
            NSDictionary* dic=(NSDictionary*)any;
            [self loadTextureCom:[UIImage imageNamed:dic[@"data"]] info:dic[@"info"]];
        } info:textureLoad progressFun:nil];
    }
}
-(void)loadTextureCom:(UIImage*)img info:(TextureLoad*)info ;
{
 
    NSLog(@" info.wrap   %d", info.wrap);
    TextureRes *textureRes=[[TextureRes alloc]init];
 
    textureRes.textTureLuint=  [Context3D getTexture:img wrap:info.wrap];
  //  textureRes=[[MaterialManager default] getMaterialByUrl:@"tu001.jpg"];
    
  
    
    NSArray<TextureLoad*>* ary  = self.loadDic[info.url];
    for (int i = 0; i < ary.count; i++){
        if (ary[i].info) {
               ary[i].fun(@{@"data":textureRes,@"info":ary[i].info});
        }else{
               ary[i].fun(textureRes);
        }
    }
    [self.loadDic removeObjectForKey:info.url];
    self.dic[info.url] = textureRes;
    
}
-(void)addRes:(NSString*)url img:(UIImage*)img;
{
    if (!self.dic[url] && !self.resDic[url]){
        self.resDic[url] = img;
    }
}


- (id<MTLTexture>)getBaseMitTexture
{
    UIImage *image = [UIImage imageNamed:@"abc"];
    MTLTextureDescriptor *textureDescriptor = [[MTLTextureDescriptor alloc] init];
    textureDescriptor.pixelFormat = MTLPixelFormatRGBA8Unorm;
    textureDescriptor.width = image.size.width;
    textureDescriptor.height = image.size.height;
    id<MTLTexture> texture = [self.mtkScene3D.mtkView.device newTextureWithDescriptor:textureDescriptor];
    
    MTLRegion region = {{ 0, 0, 0 }, {image.size.width, image.size.height, 1}};
    Byte *imageBytes = [self loadImage:image];
    if (imageBytes) {
        [texture replaceRegion:region
                        mipmapLevel:0
                          withBytes:imageBytes
                        bytesPerRow:4 * image.size.width];
        free(imageBytes);
        imageBytes = NULL;
    }
    
    return texture;
}

- (Byte *)loadImage:(UIImage *)image {
    // 1获取图片的CGImageRef
    CGImageRef spriteImage = image.CGImage;
    
    // 2 读取图片的大小
    size_t width = CGImageGetWidth(spriteImage);
    size_t height = CGImageGetHeight(spriteImage);
    
    Byte * spriteData = (Byte *) calloc(width * height * 4, sizeof(Byte)); //rgba共4个byte
    
    CGContextRef spriteContext = CGBitmapContextCreate(spriteData, width, height, 8, width*4,
                                                       CGImageGetColorSpace(spriteImage), kCGImageAlphaPremultipliedLast);
    
    // 3在CGContextRef上绘图
    CGContextDrawImage(spriteContext, CGRectMake(0, 0, width, height), spriteImage);
    
    CGContextRelease(spriteContext);
    
    return spriteData;
}
 
@end

