//
//  MaterialManager.m
//  iosgl
//
//  Created by zhao on 8/12/2019.
//  Copyright © 2019 zhao. All rights reserved.
//
#import <GLKit/GLKit.h>
#import "TextureRes.h"
#import "MaterialManager.h"
static MaterialManager *instance = nil;
@implementation MaterialManager
+ (instancetype)default{
    if (instance == nil) {
        instance = [[MaterialManager alloc] init];
    }
    return instance;
}
-(TextureRes *) getMaterialByUrl:(NSString*)urlStr;
{
    TextureRes *textureRes=[[TextureRes alloc]init];
   // NSString *filePath = [[NSBundle mainBundle]pathForResource:@"brdf_ltu" ofType:@"jpg"];
    NSString *filePath =   [[NSBundle mainBundle]pathForAuxiliaryExecutable:urlStr];
    NSDictionary *options = [NSDictionary dictionaryWithObjectsAndKeys:@(1), GLKTextureLoaderOriginBottomLeft,NULL];
    textureRes.texture= [GLKTextureLoader textureWithContentsOfFile:filePath options:options error:NULL];
    return textureRes;
}
                   
@end
