//
//  CubemapLoad.m
//  iosgl
//
//  Created by zhao on 22/4/2020.
//  Copyright © 2020 zhao. All rights reserved.
//

#import "CubemapLoad.h"
#import "LoadManager.h"
#import "Scene_data.h"

@implementation CubemapLoad


-(void)loadCube:(NSString*)url fun:(SuccessMaterial)fun;
{
// itemUrl    __NSCFString *    @"http://jilioss.oss-cn-hongkong.aliyuncs.com/rb_ios/a/res/base/cube/e01.jpg"    0x000000028132cfc0
    url=@"base/cube/e0%d.jpg";
    for (int i=0; i<6;i++){
        NSString* itemUrl = [NSString stringWithFormat:url,i+1];
        itemUrl= [[Scene_data default]getWorkUrlByFilePath:itemUrl];
        [[LoadManager default] load:itemUrl type:LoadManager.IMG_TYPE fun:^(NSObject * _Nonnull any) {
            
            NSLog(@"1");
            
        } info:@{@"id":[NSNumber numberWithInt:i]} progressFun:^(int pronum) {
            
        }];

        
    }
}
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
