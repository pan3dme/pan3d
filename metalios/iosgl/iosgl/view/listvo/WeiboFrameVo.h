#import <Foundation/Foundation.h>
#import <UIKit/UIKit.h>

@class Weibo;

@interface WeiboFrameVo : NSObject

/*
 *  数据模型提供所需要的子控件的内容，数据;frame模型计算,保存每个子控件的frame和cell行高
 */

/*
 *  1.数据模型
 */
//        [self setValuesForKeysWithDictionary:dict];
 


@property (nonatomic, copy) NSString *text;
@property (nonatomic, copy) NSString *picture;
@property (nonatomic, copy) NSString *title;
@property (nonatomic, copy) NSArray *picitem;
@property (nonatomic, copy) NSArray *sceneinfo;
@property (nonatomic, assign) int  type;
 

/*
 *  2.frame模型
 */

 
//昵称的frame
@property (nonatomic, assign) CGRect nameF;
 
//正文的frame
@property (nonatomic, assign) CGRect introF;

//行高
@property (nonatomic, assign) CGFloat cellHeight;

- (void)setWeiboInfo:(NSDictionary*)val;

@end
