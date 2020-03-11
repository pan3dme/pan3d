//
//  MaterialManager.m
//  iosgl
//
//  Created by zhao on 8/12/2019.
//  Copyright © 2019 zhao. All rights reserved.
//
#import <GLKit/GLKit.h>
#import "TextureRes.h"
#import "Material.h"
#import "MaterialLoad.h"
#import "MaterialManager.h"
static MaterialManager *instance = nil;

//private _loadDic: Object;
//private _resDic: Object;
//private _regDic: Object;
@interface MaterialManager()
@property (nonatomic, strong)  NSMutableDictionary* loadDic;
@property (nonatomic, strong)  NSMutableDictionary* resDic;
@property (nonatomic, strong)  NSMutableDictionary* regDic;
@end

@implementation MaterialManager
+ (instancetype)default{
    if (instance == nil) {
        instance = [[MaterialManager alloc] init];
    }
    return instance;
}
- (instancetype)init
{
    self = [super init];
    if (self) {
        _dic=[[NSMutableDictionary alloc]init];
        _loadDic=[[NSMutableDictionary alloc]init];
        _resDic=[[NSMutableDictionary alloc]init];
        _regDic=[[NSMutableDictionary alloc]init];
    }
    return self;
}
-(TextureRes *) getMaterialByUrl:(NSString*)urlStr;
{
    TextureRes *textureRes=[[TextureRes alloc]init];
  
    textureRes.textTureLuint=[self createTextureWithImage:[UIImage imageNamed:urlStr]];
    return textureRes;
}

- (GLuint)createTextureWithImage:(UIImage *)image {
    // 将 UIImage 转换为 CGImageRef
    CGImageRef cgImageRef = [image CGImage];
    GLuint width = (GLuint)CGImageGetWidth(cgImageRef);
    GLuint height = (GLuint)CGImageGetHeight(cgImageRef);
    CGRect rect = CGRectMake(0, 0, width, height);
    
    // 绘制图片
    CGColorSpaceRef colorSpace = CGColorSpaceCreateDeviceRGB();
    void *imageData = malloc(width * height * 4);
    CGContextRef context = CGBitmapContextCreate(imageData, width, height, 8, width * 4, colorSpace, kCGImageAlphaPremultipliedLast | kCGBitmapByteOrder32Big);
    CGContextTranslateCTM(context, 0, height);
    CGContextScaleCTM(context, 1.0f, -1.0f);
    CGColorSpaceRelease(colorSpace);
    CGContextClearRect(context, rect);
    CGContextDrawImage(context, rect, cgImageRef);

    // 生成纹理
    GLuint textureID;
    glGenTextures(1, &textureID);
    glBindTexture(GL_TEXTURE_2D, textureID);
    glTexImage2D(GL_TEXTURE_2D, 0, GL_RGBA, width, height, 0, GL_RGBA, GL_UNSIGNED_BYTE, imageData); // 将图片数据写入纹理缓存
    
    // 设置如何把纹素映射成像素
    glTexParameteri(GL_TEXTURE_2D, GL_TEXTURE_WRAP_S, GL_CLAMP_TO_EDGE);
    glTexParameteri(GL_TEXTURE_2D, GL_TEXTURE_WRAP_T, GL_CLAMP_TO_EDGE);
    glTexParameteri(GL_TEXTURE_2D, GL_TEXTURE_MIN_FILTER, GL_LINEAR);
    glTexParameteri(GL_TEXTURE_2D, GL_TEXTURE_MAG_FILTER, GL_LINEAR);
    
    // 解绑
    glBindTexture(GL_TEXTURE_2D, 0);
    
    // 释放内存
    CGContextRelease(context);
    free(imageData);
    
    return textureID;
}
-(void)addResByte:(NSString*)url dataByte:(ByteArray*)dataByte;
{
    
    if(! self.dic[url]&&! self.resDic[url]){
        self.dic[url]=dataByte;
    }
 
}
-(void)getMaterialByte:(NSString*)url fun:(MaterialBlock)fun info:(NSDictionary*)info;
{
    if(_dic[url]){
        fun(_dic[url]);
        return;
    }
    MaterialLoad* materialLoad= [[MaterialLoad alloc]init:fun info:info url:url autoReg:YES regName:@"d" shader: nil];
    if ( _loadDic[url]) {
        NSMutableArray<MaterialLoad*>* ary   =  _loadDic[url];
        [ary addObject:materialLoad];
        return;
    }
    _loadDic[url] = [[NSMutableArray alloc]init];
    [_loadDic[url] addObject:materialLoad];
    if (_resDic[url]) {
        [self meshByteMaterialByt:self.resDic[url] info:materialLoad];
    }else{
        
    }
    /*
     

     this._loadDic[$url] = new Array;
     this._loadDic[$url].push(materialLoad);

     if (this._resDic[$url]) {

         this.meshByteMaterialByt(this._resDic[$url], materialLoad);

         if(this._regDic[$url]){
             this._dic[$url].useNum += this._regDic[$url];
             delete this._regDic[$url];
         }

         delete this._resDic[$url];
     } else {
         LoadManager.getInstance().load($url, LoadManager.BYTE_TYPE, ($data: ArrayBuffer, _info: MaterialLoad) => { this.loadMaterialByteCom($data, _info) }, materialLoad);
     }
     */
  
    
}
-(void)meshByteMaterialByt:(ByteArray*)byte info:(MaterialLoad*)info;
{
    Material* material=[[Material alloc]init];
   // [material setByteData:byte];
    /*
     var material: Material = new Material()
            material.setByteData(byte)
            material.url = _info.url;


            this.loadMaterial(material);

            if (_info.autoReg) {
                material.shader = ProgrmaManager.getInstance().getMaterialProgram(_info.regName, _info.shader3D, material, null, true);
                material.program = material.shader.program;
            }


            var ary: Array<TextureLoad> = this._loadDic[_info.url];
            for (var i: number = 0; i < ary.length; i++) {
                if (ary[i].info) {
                    ary[i].fun(material, ary[i].info);
                } else {
                    ary[i].fun(material);
                }
                material.useNum++;

                // if (_info.url.indexOf("m_ef_ver_byte.txt") != -1) {
                //     console.log("aaaaaaaaaaaaaaaa", material.useNum)
                // }

            }

            delete this._loadDic[_info.url];

            this._dic[_info.url] = material;
     */
}
                   
@end
