#import "WeiboCell.h"
#import <SDWebImage/SDWebImage.h>
 

#define NameFont [UIFont systemFontOfSize:15]
#define TextFont [UIFont systemFontOfSize:16]



@interface WeiboCell ()

/**
 *  头像
 */
@property (nonatomic, weak) UIImageView *iconView;
/**
 *  vip
 */
@property (nonatomic, weak) UIImageView *vipView;
/**
 *  配图
 */
@property (nonatomic, weak) UIImageView *pictureView;
/**
 *  昵称
 */
@property (nonatomic, weak) UILabel *nameLabel;
/**
 *  正文
 */
@property (nonatomic, weak) UILabel *introLabel;

@end

@implementation WeiboCell
+(instancetype)cellWithTableView:(UITableView *)tableView{
    static NSString *identifier = @"status";
    //从缓存中取(重用机制)
    WeiboCell *cell = [tableView dequeueReusableCellWithIdentifier:identifier];
    //如果缓存中没有，就创建
    if (cell==nil) {
        cell = [[WeiboCell alloc] initWithStyle:UITableViewCellStyleDefault reuseIdentifier:identifier];
    }
    return cell;
}

/*
 * 构造方法(在初始化时会使用)
 *一般在这个方法中添加需要的空间
 */
-(id)initWithStyle:(UITableViewCellStyle)style reuseIdentifier:(NSString *)reuseIdentifier{
    //重写方法的第一步应该先继承原方法,使其原有功能不缺失
    self =[super initWithStyle:style reuseIdentifier:reuseIdentifier];
    
    if (self) {
        //让自定义的cell和系统cell一样，一创建出来就有一些控件供我们使用
        
        //1.创建头像
        UIImageView *iconView = [[UIImageView alloc] init];
        [self.contentView addSubview:iconView];
        self.iconView = iconView;
        
        //2.创建昵称
        UILabel *nameLabel = [[UILabel alloc] init];
        nameLabel.font = NameFont;
        [self.contentView addSubview:nameLabel];
        self.nameLabel = nameLabel;
        
        //3.创建vip
        UIImageView *vipView = [[UIImageView alloc] init];
        vipView.image = [UIImage imageNamed:@"vip"];
        [self.contentView addSubview:vipView];
        self.vipView = vipView;
        
        //4.创建正文
        UILabel *introLabel = [[UILabel alloc] init];
        introLabel.font = TextFont;
        introLabel.numberOfLines = 0;
        [self.contentView addSubview:introLabel];
        self.introLabel = introLabel;
        
        //5.创建配图
        UIImageView *pictureView = [[UIImageView alloc] init];
        [self.contentView addSubview:pictureView];
        self.pictureView = pictureView;
        
        [self addButs];
    }
    return self;
}
 
-(void)addButs
{
    UIButton  *photographButton = [UIButton buttonWithType:UIButtonTypeCustom];
    photographButton.frame = CGRectMake(300 , 0, 100, 100);
    [photographButton setImage:[UIImage imageNamed:@"red_tabbar_chongzhi_01"] forState:UIControlStateNormal];
    [photographButton addTarget:self action:@selector(photographButtonClicked:) forControlEvents:UIControlEventTouchUpInside];
    
    [self.contentView addSubview:photographButton];
}

- (void)photographButtonClicked:(UIButton *)sender{
   
//    [self.navigationController pushViewController:photoPicker animated:YES];
    
   
    
    [self.weiboFramedelegate myViewClik:self.weiboFrame];
    
}

//重写setting方法
-(void)setWeiboFrame:(WeiboFrameVo *)weiboFrame{
    _weiboFrame = weiboFrame;
    
    //1.给子控件赋值数据
    [self settingData];
    //2.设置frame
    [self settingFrame];
}

-(void)settingData{
    WeiboFrameVo *weibo = self.weiboFrame;
    
    //设置头像
 
    [self.iconView sd_setImageWithURL:[NSURL URLWithString:weibo.icon] placeholderImage:nil];
    
    //设置昵称
    self.nameLabel.text = weibo.name;
    //设置vip
    if (weibo.vip) {
        self.vipView.hidden = NO;
        self.nameLabel.textColor = [UIColor redColor];
    }else{
        self.vipView.hidden = YES;
        self.nameLabel.textColor = [UIColor blueColor];
    }
    //设置内容
    self.introLabel.text = weibo.text;
    //设置配图
    if (self.pictureView) {
        self.pictureView.hidden = NO;
       
        [self.pictureView sd_setImageWithURL:[NSURL URLWithString:self.weiboFrame.picture] placeholderImage:nil];
 
      
 
    }else{
        self.pictureView.hidden = YES;
    }
}

 

/*
 *  设置子控件的frame
 */
-(void)settingFrame{
    self.iconView.frame = self.weiboFrame.iconF;
    self.nameLabel.frame = self.weiboFrame.nameF;
    self.vipView.frame = self.weiboFrame.vipF;
    self.introLabel.frame = self.weiboFrame.introF;
    if (self.weiboFrame.picture) {
        self.pictureView.frame = self.weiboFrame.pictrueF;
    }
}

#pragma mark--
- (void)awakeFromNib {
    // Initialization code
}

- (void)setSelected:(BOOL)selected animated:(BOOL)animated {
    [super setSelected:selected animated:animated];
    
    // Configure the view for the selected state
}

@end
