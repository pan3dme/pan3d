//
//  TextureManager.m
//  iosgl
//
//  Created by zhao on 14/3/2020.
//  Copyright © 2020 zhao. All rights reserved.
//

#import "TextureManager.h"
#import "MaterialManager.h"
static TextureManager *instance = nil;
@implementation TextureManager
+ (instancetype)default{
    if (instance == nil) {
        instance = [[TextureManager alloc] init];
    }
    return instance;
}
-(void)getTexture:(NSString*)url fun:(void (^)(TextureRes*))fun;
{
    TextureRes* textureRes=   [[MaterialManager default] getMaterialByUrl:@"tu001.jpg"];
    fun(textureRes);
}
-(void)getTexture:(NSString*)url fun:(void (^)(TextureRes*,DynamicTexListVo*))fun texListVo:(DynamicTexListVo*)texListVo;
{
    TextureRes* textureRes=   [[MaterialManager default] getMaterialByUrl:@"tu001.jpg"];
    fun(textureRes,texListVo);
}
@end
