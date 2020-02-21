//
//  TokenSceneView.h
//  iosgl
//
//  Created by zhao on 21/2/2020.
//  Copyright © 2020 zhao. All rights reserved.
//

#import "BaseUIViewController.h"

NS_ASSUME_NONNULL_BEGIN

@interface TokenSceneView : BaseUIViewController
@property (weak, nonatomic) IBOutlet UIButton *scene_but_1;
@property (weak, nonatomic) IBOutlet UIButton *scene_but_2;
- (IBAction)scene_but_1_clik:(id)sender;
- (IBAction)scene_but_2_clik:(id)sender;

@end

NS_ASSUME_NONNULL_END
