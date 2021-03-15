#import <UIKit/UIKit.h>
#import "WeiboFrame.h"

@interface WeiboCell : UITableViewCell

/*
 *  接收外界传进来的模型(包括数据模型和frame模型)
 */
@property (nonatomic, strong) WeiboFrame *weiboFrame;

//声明一个类方法，用于在声明cell时添加我们所需要的子控件
+(instancetype)cellWithTableView:(UITableView *)tableView;

@end
