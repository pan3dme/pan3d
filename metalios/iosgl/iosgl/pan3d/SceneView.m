//
//  SceneView.m
//  iosgl
//
//  Created by zhao on 7/12/2019.
//  Copyright © 2019 zhao. All rights reserved.
//

#import "SceneView.h"
#import <GLKit/GLKit.h>
#import "Matrix3D.h"
#import "Vector3D.h"
#import "TextureRes.h"
#import "BuildDisplay3DSprite.h"
#import "Scene3D.h"
#import "SceneRes.h"
#import "MathCore.h"
#import "Scene_data.h"
#import "ParticleManager.h"
#import "MaterialManager.h"
#import "GL_Header.h"


@interface SceneView ()

@end
@implementation SceneView

+(Class)layerClass
{
    return [CAEAGLLayer class];
}
- (instancetype)init
{
    self = [super init];
    if (self) {
        [NSTimer scheduledTimerWithTimeInterval:1.0/60.0 target:self selector:@selector(upFrame) userInfo:nil repeats:YES];
    }
    return self;
}

-(void)upFrame{
    
    if(self.scene3D){
        
   
        
        [self.scene3D upFrame];
        [self.scene3D.context3D.gl presentRenderbuffer:GL_RENDERBUFFER];
        
    }
    
}
- (void)layoutSubviews
{
    [super layoutSubviews];
    NSLog(@"--->%f--->%f" ,self.frame.size.width,self.frame.size.height);
    [MathCore traceTmNow];
    if(self.scene3D){
        self.scene3D.camera3D.fovw=self.frame.size.width;
        self.scene3D.camera3D.fovh=self.frame.size.height;
        [self.scene3D.camera3D upFrame];
    }
}
- (void)touchesMoved:(NSSet *)touches withEvent:(UIEvent *)event {
    
    if(self.scene3D){
        UITouch *touch = [touches anyObject];
        CGPoint currentPoint = [touch locationInView:self];
        CGPoint prePoint = [touch previousLocationInView:self];
        CGFloat offsetX = currentPoint.x - prePoint.x;
        CGFloat offsetY = currentPoint.y - prePoint.y;
        
        self.scene3D.camera3D.rotationX +=offsetY;
        self.scene3D.camera3D.rotationY -=offsetX;
        [self.scene3D.camera3D upFrame];
    }
}
-(void)makeEemptyScene;
{
    if(!self.scene3D){
        self.scene3D=[[Scene3D alloc]init:self];
    }
}
-(void)parsingBuildItem:(NSDictionary*)value;
{
    
    int type=   [value[@"type"]intValue];
    switch (type) {
        case PREFAB_TYPE:
            [self addBuildDisplay3DSprite:value];
            break;
        case SCENE_PARTICLE_TYPE:
            [self addParticleSprite:value];
            break;
            
        default:
            break;
    }
}
-(void)addParticleSprite:(NSDictionary*)itemObj;
{
    CombineParticle*  particle =   [self.scene3D.particleManager   getParticleByte:itemObj[@"url"]];
    [self.scene3D.particleManager addParticle:particle];
    particle.x=[itemObj[@"x"]floatValue];
    particle.y=[itemObj[@"y"]floatValue];
    particle.z=[itemObj[@"z"]floatValue];
    particle.scaleX=[itemObj[@"scaleX"]floatValue];
    particle.scaleY=[itemObj[@"scaleY"]floatValue];
    particle.scaleZ=[itemObj[@"scaleZ"]floatValue];
    particle.rotationX=[itemObj[@"rotationX"]floatValue];
    particle.rotationY=[itemObj[@"rotationY"]floatValue];
    particle.rotationZ=[itemObj[@"rotationZ"]floatValue];
    
}
-(void)addBuildDisplay3DSprite:(NSDictionary*)value;
{
    BuildDisplay3DSprite *tempDis=[[BuildDisplay3DSprite alloc]init];
    [tempDis setInfo:value];
    [self.scene3D addDisplay:tempDis];
}
- (void)loadSeceneByUrl:(NSString *)url
{
    NSString* webUrl=[[Scene_data default]getWorkUrlByFilePath:getMapUrl(url)];
    SceneRes *sceneRes=[[SceneRes alloc]init];
    [sceneRes load:webUrl  bfun:^(NSString *value) {
        NSDictionary* obj=sceneRes.sceneData;
        NSArray *buildItem=[obj objectForKey:@"buildItem"];
        
        self.scene3D.fogColor=[[Vector3D alloc]init];
        self.scene3D.fogColor.x=[(obj[@"fogColor"])[@"x"]floatValue] /255.0;
        self.scene3D.fogColor.y=[(obj[@"fogColor"])[@"y"]floatValue]  /255.0;
        self.scene3D.fogColor.z=[(obj[@"fogColor"])[@"z"]floatValue]  /255.0;
        self.scene3D.gameAngle=[obj[@"gameAngle"] floatValue] ;
        float d = [obj[@"fogDistance"] floatValue] * 1;//1000
        float s = [obj[@"fogAttenuation"] floatValue] ;  //0.5.
        self.scene3D.fogData=[[Vector2D alloc]x:d * s y:1 / ((1 - s) * d)];
 
        [self makeEemptyScene];
        for(int i=0;i<buildItem.count;i++){
       
            if( [buildItem[i][@"id"]intValue]==2){
              
            }
            [self parsingBuildItem:buildItem[i]];
            
        }
        NSLog(@"--");
    }];
}


@end
