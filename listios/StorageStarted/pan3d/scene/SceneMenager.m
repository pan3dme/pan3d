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
#import "CombineParticle.h"
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
            if([buildItem[i][@"type"]intValue]==1){
                NSLog(@"%d",[buildItem[i][@"id"]intValue]);
            }
//            SceneMenager.m:26    24
//            SceneMenager.m:26    4
//            SceneMenager.m:26    3
//            SceneMenager.m:26    8
//            SceneMenager.m:26    10
//            SceneMenager.m:26    9
//            SceneMenager.m:26    16
//            SceneMenager.m:26    48
//            SceneMenager.m:26    49
//            SceneMenager.m:26    50
//            SceneMenager.m:26    51
 
        }
        
        for(int i=0;i<buildItem.count;i++){
            if( [buildItem[i][@"id"]intValue]==24){
               
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
//            [self addBuildDisplay3DSprite:value];
            break;
        case SCENE_PARTICLE_TYPE:
            
            [self addParticleByUrl:value];
 
            break;
        default:
            break;
    }
}
-(void)addParticleByUrl:(NSDictionary* )value
{
    NSString* url=  [value objectForKey:@"url"];
    CombineParticle*  particle =   [self.scene3D.particleManager   getParticleByte:url];
//    particle.x=[[value objectForKey:@"x"] floatValue];
//    particle.y=[[value objectForKey:@"y"] floatValue];
//    particle.z=[[value objectForKey:@"z"] floatValue];
    particle.scaleX=[[value objectForKey:@"scaleX"] floatValue];
    particle.scaleY=[[value objectForKey:@"scaleY"] floatValue];
    particle.scaleZ=[[value objectForKey:@"scaleZ"] floatValue];
    particle.rotationX=[[value objectForKey:@"rotationX"] floatValue];
    particle.rotationY=[[value objectForKey:@"rotationY"] floatValue];
    particle.rotationZ=[[value objectForKey:@"rotationZ"] floatValue];
    [self.scene3D.particleManager addParticle:particle];
}
 
-(void)addBuildDisplay3DSprite:(NSDictionary*)value;
{
    BuildDisplay3DSprite* dis=[[BuildDisplay3DSprite alloc] init:self.scene3D];
    [dis setInfo:value];
    [self.scene3D addDisplay: dis];
}
 
@end
