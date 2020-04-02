//
//  CommentsCell.h
//  动态
//
//  Created by zhao on 26/3/2020.
//  Copyright © 2020 zhao. All rights reserved.
//

#import <UIKit/UIKit.h>
#import "Dt_CommentsTabelVo.h"

NS_ASSUME_NONNULL_BEGIN

@protocol Dt_CommentsCellDelegate<NSObject>
-(void) clikCellHear:(Dt_CommentsTabelVo*)value ;
-(void) clikCellMessage:(Dt_CommentsTabelVo*)value ;
@end
 

@interface Dt_CommentsCell : UITableViewCell
+(NSString*)CELL_STR;
+(Dt_CommentsCell *)makeViewCell:(UITableView*)tableView    dataVo:(Dt_CommentsTabelVo*)dataVo;
@property(assign,nonatomic) id<Dt_CommentsCellDelegate>delegate;
@end

NS_ASSUME_NONNULL_END
