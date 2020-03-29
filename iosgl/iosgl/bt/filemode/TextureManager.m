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
static TextureManager *instance = nil;

@interface TextureManager()
 
@property (nonatomic, strong)NSMutableDictionary* loadDic;
@property (nonatomic, strong)NSMutableDictionary* resDic;
 
@end

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
-(void)getTexture:(NSString*)url fun:(void (^)(TextureRes*))fun;
{
    TextureRes* textureRes=   [[MaterialManager default] getMaterialByUrl:@"tu001.jpg"];
    fun(textureRes);
}
 
-(void)getTextureCopy:(NSString*)url fun:(void (^)(NSObject* any))fun wrapType:(int)wrapType info:(NSObject*)info filteType:(int)filteType mipmapType:(int)mipmapType;
{
 
    if (self.dic[url]) {
        if (info) {
            fun([[NSArray alloc] initWithObjects:self.dic[url], info, nil]);
        } else {
            fun(self.dic[url]);
        }
        return;
    }
    //$fun, $info, $url, $wrapType, $filteType, $mipmapType
    TextureLoad* textureLoad= [[TextureLoad alloc]init:fun info:info url:url wrap:wrapType filter:filteType mipmap:mipmapType];

    if (self.loadDic[url]){
        NSMutableArray<TextureLoad*>*  ary  = self.loadDic[url];
        [ary addObject:textureLoad];
        return;
    }
    self.loadDic[url] =[[NSMutableArray alloc]init];
    [self.loadDic[url] addObject:textureLoad];
    
    if (self.resDic[url]) {
        NSLog(@"有图片还没有材质");
    }else{
        [[ LoadManager default] load:url type:@"IMG_TYPE" fun:^(NSObject * _Nonnull any) {
            
        } info:textureLoad progressFun:nil];
    }
    
    /*
     
            var textureLoad: TextureLoad = new TextureLoad($fun, $info, $url, $wrapType, $filteType, $mipmapType);
            if (this._loadDic[$url]){
                var ary: Array<TextureLoad> = this._loadDic[$url];
                ary.push(textureLoad);
                return;
            }

            this._loadDic[$url] = new Array;
            this._loadDic[$url].push(textureLoad);

            if (this._resDic[$url]) {
                this.loadTextureCom(this._resDic[$url], textureLoad);
                delete this._resDic[$url];
            } else {
                LoadManager.getInstance().load($url, LoadManager.IMG_TYPE, ($img: any, _info: TextureLoad) => {
                    this.loadTextureCom($img, _info);
                }, textureLoad);
            }
     */
    
    
}
-(void)getTexture:(NSString*)url fun:(void (^)(TextureRes*,DynamicTexListVo*))fun texListVo:(DynamicTexListVo*)texListVo;
{
    TextureRes* textureRes=   [[MaterialManager default] getMaterialByUrl:@"tu001.jpg"];
    
   
  
    
    fun(textureRes,texListVo);
}
@end
