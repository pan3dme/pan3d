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
 
-(void)getTexture:(NSString*)url fun:(void (^)(NSObject* any))fun wrapType:(int)wrapType info:(NSObject*)info filteType:(int)filteType mipmapType:(int)mipmapType;
{
 
    if (self.dic[url]) {
        if (info) {
            fun([[NSArray alloc] initWithObjects:self.dic[url], info, nil]);
        } else {
            fun(self.dic[url]);
        }
        return;
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
        NSLog(@"有图片还没有材质");
    }else{
        [[ LoadManager default] load:url type:1 fun:^(NSObject * _Nonnull any) {
            NSDictionary* dic=(NSDictionary*)any;
            [self loadTextureCom: dic[@"data"] info:dic[@"info"]];
        } info:textureLoad progressFun:nil];
    }
}
-(void)loadTextureCom:(NSString*)imgName info:(TextureLoad*)info ;
{
    TextureRes* textureRes=   [[MaterialManager default] getMaterialByUrl:imgName];
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
 
@end
