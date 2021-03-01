//
//  SceneMenager.m
//  iosgl
//
//  Created by pan3dme on 2021/3/1.
//  Copyright © 2021 zhao. All rights reserved.
//

#import "SceneMenager.h"
#import "Scene_data.h"
#import "SceneRes.h"
#import "BuildDisplay3DSprite.h"

@implementation SceneMenager
- (void)loadSeceneByUrl:(NSString *)url
{
    NSString* webUrl=[[Scene_data default]getWorkUrlByFilePath:getMapUrl(url)];
    SceneRes *sceneRes=[[SceneRes alloc]init:self.scene3D];
    [sceneRes load:webUrl  bfun:^(NSString *value) {
        NSDictionary* obj=sceneRes.sceneData;
        NSArray *buildItem=[obj objectForKey:@"buildItem"];
        for(int i=0;i<buildItem.count;i++){
            if( [buildItem[i][@"id"]intValue]==2){
            }
            [self parsingBuildItem:buildItem[i]];
        }
    }];
}
-(void)parsingBuildItem:(NSDictionary*)value;
{
    int type=   [value[@"type"]intValue];
    switch (type) {
        case PREFAB_TYPE:
            [self addBuildDisplay3DSprite:value];
            break;
        case SCENE_PARTICLE_TYPE:
            break;
        default:
            break;
    }
}
 
-(void)addBuildDisplay3DSprite:(NSDictionary*)value;
{
    BuildDisplay3DSprite* dis=[[BuildDisplay3DSprite alloc] init:self.scene3D];
    [dis setInfo:value];
    [self.scene3D addDisplay: dis];
}
 
@end
