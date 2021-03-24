#import "WeiboCell.h"
#import <SDWebImage/SDWebImage.h>
#import "Scene_data.h"
 

#define NameFont [UIFont systemFontOfSize:16]
#define TextFont [UIFont systemFontOfSize:15]
 

@interface WeiboCell ()
@property (nonatomic, weak) UILabel *tittleLabel;
@property (nonatomic, weak) UILabel *introLabel;

@property (nonatomic, strong) UIImageView *picture000;
@property (nonatomic, strong) UIImageView *picture001;
@property (nonatomic, strong) UIImageView *picture002;
@property (nonatomic, strong) UIImageView *picture003;
 

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
        
   
        
        //2.创建昵称
        UILabel *nameLabel = [[UILabel alloc] init];
        nameLabel.font = NameFont;
        [self.contentView addSubview:nameLabel];
        self.tittleLabel = nameLabel;
        
   
        
        //4.创建正文
        UILabel *introLabel = [[UILabel alloc] init];
        introLabel.font = TextFont;
        introLabel.numberOfLines = 0;
        [self.contentView addSubview:introLabel];
        self.introLabel = introLabel;
        
 
        
        [self addImgItemView];
      
    }
    return self;
}
-(void)addImgItemView
{
    self.picture000= [[UIImageView alloc] init];
    [self.contentView addSubview:self.picture000];
    self.picture001= [[UIImageView alloc] init];
    [self.contentView addSubview:self.picture001];
    self.picture002= [[UIImageView alloc] init];
    [self.contentView addSubview:self.picture002];
    self.picture003= [[UIImageView alloc] init];
    [self.contentView addSubview:self.picture003];
    
    
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
 
    [self.weiboFramedelegate myViewClik:self.weiboFrame];
    
}

//重写setting方法
-(void)setWeiboFrame:(WeiboFrameVo *)val{
    _weiboFrame = val;
    
    //1.给子控件赋值数据
    [self settingData];
    //2.设置frame
    [self settingFrame];
}

-(void)settingData{
    WeiboFrameVo *weibo = self.weiboFrame;
  
    self.tittleLabel.text = weibo.title;
    self.tittleLabel.textColor = [UIColor blackColor];
    //设置内容
    self.introLabel.text = weibo.text;
    //设置配图
    [self setImgItemInfo];
}
-(void)setImgItemInfo
{

 
    
    [self setImgUrlByViewAndId:self.picture000 rid:0];
    [self setImgUrlByViewAndId:self.picture001 rid:1];
    [self setImgUrlByViewAndId:self.picture002 rid:2];
    [self setImgUrlByViewAndId:self.picture003 rid:3];
}
-(void)setImgUrlByViewAndId:(UIImageView*)imageView rid:(int)rid
{
 
    
    if(self.weiboFrame.picitem.count>rid){
        NSString* url=   [[Scene_data default]getWorkUrlByFilePath:[self.weiboFrame.picitem objectAtIndex:rid]];
      
        [imageView sd_setImageWithURL:[NSURL URLWithString:url] placeholderImage:nil];
        imageView.hidden=NO;
    }else{
        imageView.hidden=YES;
    }
}

/*
 *  设置子控件的frame
 */
-(void)settingFrame{
 
    self.tittleLabel.frame = self.weiboFrame.nameF;
    self.introLabel.frame = self.weiboFrame.introF;
    if (self.weiboFrame.picture) {
        CGFloat ty=CGRectGetMaxY(self.weiboFrame.introF) + 10;
        self.picture000.frame=CGRectMake(0, ty, 95, 95);
        self.picture001.frame=CGRectMake(100, ty, 95, 95);
        self.picture002.frame=CGRectMake(200, ty, 95, 95);
        self.picture003.frame=CGRectMake(300, ty, 95, 95);
    }
}


- (void)setSelected:(BOOL)selected animated:(BOOL)animated {
    [super setSelected:selected animated:animated];
 
}

@end
