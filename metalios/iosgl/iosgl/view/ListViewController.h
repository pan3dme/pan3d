//
//  ListViewController.h
//  iosgl
//
//  Created by pan3dme on 2021/3/12.
//  Copyright © 2021 zhao. All rights reserved.
//

#import <UIKit/UIKit.h>
#import "WeiboCell.h"

NS_ASSUME_NONNULL_BEGIN

@interface ListViewController : UIViewController<UITableViewDataSource,UITableViewDelegate,NSXMLParserDelegate,MyViewDelegate>

@end

NS_ASSUME_NONNULL_END
