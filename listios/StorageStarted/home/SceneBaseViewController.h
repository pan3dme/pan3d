//
//  SceneBaseViewController.h
//  iosgl
//
//  Created by pan3dme on 2021/3/1.
//  Copyright © 2021 zhao. All rights reserved.
//

#import <UIKit/UIKit.h>
#import "Scene3D.h"

NS_ASSUME_NONNULL_BEGIN

@interface SceneBaseViewController : UIViewController
@property (nonatomic, strong)Scene3D* scene3D;
@property (nonatomic, strong)UIView* sceneUiView;
@property (nonatomic, strong) NSMutableArray<UIButton*>* butItems;

-(void)addMenuList;
-(void)addButsByArr:(NSMutableArray*)arr ;
-(UIButton*)makeButtion;
- (BOOL) addMenuListClikEvent:(UIButton *) btn;
@end

NS_ASSUME_NONNULL_END
