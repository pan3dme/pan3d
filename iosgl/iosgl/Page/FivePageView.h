//
//  FivePageView.h
//  iosgl
//
//  Created by zhao on 2/12/2019.
//  Copyright © 2019 zhao. All rights reserved.
//

#import "BaseUIViewController.h"

NS_ASSUME_NONNULL_BEGIN

@interface FivePageView : BaseUIViewController
@property (strong, nonatomic) IBOutlet UIScrollView *scrolView;
- (IBAction)submitClikEvent:(id)sender;

@end

NS_ASSUME_NONNULL_END
