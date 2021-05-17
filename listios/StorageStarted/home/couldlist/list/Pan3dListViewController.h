//
//  Pan3dListViewController.h
//  StorageStarted
//
//  Created by pan3dme on 2021/4/14.
//  Copyright © 2021 cuiyiran. All rights reserved.
//

#import <UIKit/UIKit.h>

NS_ASSUME_NONNULL_BEGIN

@interface Pan3dListViewController : UITableViewController
@property (nonatomic,assign) NSInteger index;
@property (nonatomic,copy) NSString *titleStr;
- (instancetype)init:(NSString *)val;
@end

NS_ASSUME_NONNULL_END
