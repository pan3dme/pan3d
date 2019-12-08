//
//  SceneView.h
//  iosgl
//
//  Created by zhao on 7/12/2019.
//  Copyright © 2019 zhao. All rights reserved.
//

#import <UIKit/UIKit.h>
#import "Display3DSprite.h"
#import "Matrix3D.h"
#import "Shader3D.h"
#import "TextureRes.h"
#import "ObjData.h"
#import "Scene3D.h"

NS_ASSUME_NONNULL_BEGIN

@interface SceneView : UIView
@property (nonatomic, strong)  Matrix3D *posMatrix3d;

 
@property (nonatomic, strong) GLKBaseEffect *mEffect;
 

 
 
@property (nonatomic, assign) int skipnum;

@property (nonatomic,copy) NSString *name;///< name

 

@property (nonatomic, strong) Display3DSprite *dispOne;
@property (nonatomic, strong) Display3DSprite *dispTwo;
@property (nonatomic, strong) Scene3D *scene3D;
 
@end

NS_ASSUME_NONNULL_END
