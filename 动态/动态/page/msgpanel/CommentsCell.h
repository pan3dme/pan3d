//
//  CommentsCell.h
//  动态
//
//  Created by zhao on 26/3/2020.
//  Copyright © 2020 zhao. All rights reserved.
//

#import <UIKit/UIKit.h>
#import "CommentsTabelVo.h"

NS_ASSUME_NONNULL_BEGIN

@protocol CommentsCellDelegate<NSObject>
-(void) clikCellHear:(CommentsTabelVo*)value ;
-(void) clikCellMessage:(CommentsTabelVo*)value ;
@end
 

@interface CommentsCell : UITableViewCell
+(NSString*)CELL_STR;
+(CommentsCell *)makeViewCell:(UITableView*)tableView    dataVo:(CommentsTabelVo*)dataVo;
@property(assign,nonatomic) id<CommentsCellDelegate>delegate;
@end

NS_ASSUME_NONNULL_END
