//
//  MtkScene3D.m
//  iosgl
//
//  Created by pan3dme on 2021/1/22.
//  Copyright © 2021 zhao. All rights reserved.
//

#import "MtkScene3D.h"
#import "RotationSpriteA.h"
#import "MtkBaseLine.h"
#import "MtlModelDisplaySprite.h"
#import <GLKit/GLKit.h>
#import "Matrix3D.h"
#import "Vector3D.h"
#import "TextureRes.h"
#import "BuildDisplay3DSprite.h"
#import "Scene3D.h"
#import "SceneRes.h"
#import "MathCore.h"
#import "Scene_data.h"
#import "TimeUtil.h"
#import "ParticleManager.h"
#import "MaterialManager.h"
#import "GL_Header.h"


 

@implementation MtkScene3D
- (instancetype)init:(UIView *)value
{
    self = [super init];
    if (self) {
        self.uiView=value;
        self.mtkView = [[MTKView alloc] initWithFrame:self.uiView.bounds];
        self.mtkView.device = MTLCreateSystemDefaultDevice();
        self.mtkView.depthStencilPixelFormat = MTLPixelFormatDepth32Float_Stencil8;
        self.mtkView.delegate = self;
        [self.uiView insertSubview:self.mtkView atIndex:0];
        [self initData];
    }
    return self;
}
-(void)initData
{
    [TextureManager default].mtkScene3D=self;
    self.camera3D=[[Camera3D alloc]init];
  
   [self resieSize:self.mtkView.drawableSize];
    self.context3D=[[Context3D alloc] init:self.mtkView ];
 
    self.modelList=[[NSMutableArray alloc] init];
    
 
    
    [self loadSeceneByUrl:@"2014"];
 
}

- (void)drawInMTKView:(nonnull MTKView *)view {
    [self.context3D mtkclearColor:[[Vector3D alloc]x:1 y:1 z:0.16 w:1]];
    self.camera3D.rotationX=-15;
    [self.camera3D upFrame];
    
 
    
    [self updateModelList];
   
    
 
    [self.context3D mtkpresent];
    

    
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
    MtlModelDisplaySprite* dis=[[MtlModelDisplaySprite alloc] init:self];
    
    [dis setInfo:value];
    
    [self.modelList addObject: dis];
 
}
-(void)updateModelList;
{
 
    for(int i=0;i<self.modelList.count;i++){
        [self.modelList[i] updata];
    }
}
- (void)loadSeceneByUrl:(NSString *)url
{
    NSString* webUrl=[[Scene_data default]getWorkUrlByFilePath:getMapUrl(url)];
    SceneRes *sceneRes=[[SceneRes alloc]init];
    [sceneRes load:webUrl  bfun:^(NSString *value) {
        NSDictionary* obj=sceneRes.sceneData;
        NSArray *buildItem=[obj objectForKey:@"buildItem"];
   
        for(int i=0;i<buildItem.count;i++){
       
            if( [buildItem[i][@"id"]intValue]==2){
     
            }
            [self parsingBuildItem:buildItem[i]];
            
        }
        NSLog(@"--");
    }];
}


- (void)mtkView:(nonnull MTKView *)view drawableSizeWillChange:(CGSize)size {
    [self resieSize:size];
}
-(void)resieSize:(CGSize)size
{
    self.camera3D.fovw=size.width;
    self.camera3D.fovh=size.height;
}

@end
