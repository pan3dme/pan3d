//
//  FrameFileNode.m
//  iosgl
//
//  Created by pan3dme on 2020/11/16.
//  Copyright © 2020 zhao. All rights reserved.
//

#import "FrameFileNode.h"
#import "FrameNodeVo.h"
#import "CombineParticle.h"
#import "FrameSceneChar.h"
#import "LightDisplay3DSprite.h"
#import "FrameBuildSprite.h"
#import "ShadowDisplay3DSprite.h"
#import "Scene3D.h"
#import "Display3D.h"

@interface FrameFileNode ()
 
@property (nonatomic, strong)FrameNodeVo* frameNodeVo;
@property (nonatomic, strong)CombineParticle* _particle;
@property (nonatomic, strong)FrameSceneChar* _sceneChar;
@property (nonatomic, strong)LightDisplay3DSprite* _lightSprite;
@property (nonatomic, strong)FrameBuildSprite* _frameBuildSprite;
@property (nonatomic, strong)ShadowDisplay3DSprite* _shadowDisplay3DSprite;
@property (nonatomic, strong)Display3D* sprite ;
@end

@implementation FrameFileNode
-(void)setFrameNodeVoInfo:(FrameNodeVo*)vo;
{
    FrameFileNode* this=self;
    this.frameNodeVo = vo;
    if (this.frameNodeVo.type == 1) {
        if (this.frameNodeVo.directLight) {  //有法线的对象
            this._frameBuildSprite =[[FrameBuildSprite alloc]init];
            [this._frameBuildSprite setFrameNodeUrl:this.frameNodeVo];
            [this.scene3d addDisplay:this._frameBuildSprite];
            this.sprite = this._frameBuildSprite;
        } else {
            if (this.frameNodeVo.receiveShadow) {
//                this._shadowDisplay3DSprite = new ShadowDisplay3DSprite(this.scene3d);
//                this._shadowDisplay3DSprite.setFrameNodeUrl(this.frameNodeVo);
//                this.scene3d.addDisplay(this._shadowDisplay3DSprite);
//                this.sprite = this._shadowDisplay3DSprite;
            } else {
//                this._lightSprite = new LightDisplay3DSprite(this.scene3d);
//                this._lightSprite.setFrameNodeUrl(this.frameNodeVo);
//                this.scene3d.addDisplay(this._lightSprite);
//                this.sprite = this._lightSprite;
            }
        }
    }
}
@end
