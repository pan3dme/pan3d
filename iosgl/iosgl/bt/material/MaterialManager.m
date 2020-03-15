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
#import "TextureLoad.h"
#import "Scene_data.h"
#import "MaterialParam.h"
#import "MaterialLoad.h"
#import "TextureManager.h"
#import "ProgrmaManager.h"
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
        self.resDic[url]=dataByte;
    }
 
}
//  public getMaterialByte($url: string, $fun: Function, $info: Object = null, $autoReg: boolean = false, $regName: string = null, $shader3DCls: any = null): void {
-(void)getMaterialByte:(NSString*)url fun:(SuccessMaterial)fun info:(NSDictionary*)info autoReg:(BOOL)autoReg regName:(NSString*)regName shader3DCls:(NSObject*)shader3DCls;
{
    
 
    if(_dic[url]){
        fun(_dic[url]);
        return;
    }
    MaterialLoad* materialLoad= [[MaterialLoad alloc]init:fun info:info url:url autoReg:autoReg regName:regName shader: shader3DCls];
    if ( _loadDic[url]) {
        NSMutableArray<MaterialLoad*>* ary   =  _loadDic[url];
        [ary addObject:materialLoad];
        return;
    }
    _loadDic[url] = [[NSMutableArray alloc]init];
    [_loadDic[url] addObject:materialLoad];
  
    
    if (_resDic[url]) {
        [self meshByteMaterialByt:self.resDic[url] info:materialLoad];
        
        [_resDic removeObjectForKey:url];
        
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
    [material setByteData:byte];
    material.url = info.url;
    [self loadMaterial:material];
    if (info.autoReg) {
        material.shader=  [[ProgrmaManager default] getMaterialProgram:info.regName shaderCls:info.shader3D material:material paramAry:nil parmaByFragmet:true];
    }
    NSArray<TextureLoad*>* ary = self.loadDic[info.url];
    for (int i = 0; i < ary.count; i++) {
        if(ary[i].info){
              ary[i].funinfo(material,ary[i].info);
        }else{
              ary[i].fun(material);
        }
    }
    [self.loadDic removeObjectForKey:info.url];
    self.dic[info.url] = material;
    
}

-(void)loadDynamicTexUtil:(MaterialParam*)material;
{
    
}
/*
public loadDynamicTexUtil(material: MaterialParam): void {
      var dynamicTexList: Array<DynamicTexItem> = material.dynamicTexList;

      for (var i: number = 0; i < dynamicTexList.length; i++) {
          if (dynamicTexList[i].isParticleColor) {
              dynamicTexList[i].creatTextureByCurve();
          } else {
              TextureManager.getInstance().getTexture(Scene_data.fileRoot + dynamicTexList[i].url, ($textureVo: TextureRes, $texItem: DynamicTexItem) => {
                  $texItem.textureRes = $textureVo;
              }, 0, dynamicTexList[i], 0, 1);
          }
      }

  }
*/
-(void)loadMaterial:(Material*)material;
{
    NSMutableArray<TexItem*>* texVec = material.texList;
    for (int i = 0; i < texVec.count; i++) {
        if (texVec[i].isParticleColor || texVec[i].isDynamic || texVec[i].type != 0) {
            continue;
        }
          
        [[TextureManager default] getTexture:[[Scene_data default]getWorkUrlByFilePath:texVec[i].url]  fun:^(TextureRes *textureRes) {
      
        }];
    }
}

/*
 private loadMaterial($material: Material): void {
       var texVec: Array<TexItem> = $material.texList;
       for (var i: number = 0; i < texVec.length; i++) {
           if (texVec[i].isParticleColor || texVec[i].isDynamic || texVec[i].type != 0) {
               continue;
           }
           TextureManager.getInstance().getTexture(Scene_data.fileRoot + texVec[i].url, ($textureVo: TextureRes, $texItem: TexItem) => {
               $texItem.textureRes = $textureVo;
           }, texVec[i].wrap, texVec[i], texVec[i].filter, texVec[i].mipmap);
       }
   }
 */

                   
@end
