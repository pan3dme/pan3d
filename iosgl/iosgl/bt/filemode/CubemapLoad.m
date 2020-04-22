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
    CubemapLoad* this=self;
    
    
    this.flagNum=0;
    this.fun=fun;
    this.ary=[[NSMutableArray alloc]init];
    for (int i=0; i<6;i++){
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
        self.flagNum++;
        if(self.flagNum==6){
            self.fun(self.ary);
        }
        
        
        
        
    } info:nil progressFun:^(int pronum) {
        
    }];
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
