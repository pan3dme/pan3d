//
//  DynamicBaseCell.m
//  动态
//
//  Created by zhao on 16/3/2020.
//  Copyright © 2020 zhao. All rights reserved.
//

#import <UIKit/UIKit.h>
#import "Dt_DynamicBaseCell.h"
#import "UIImageView+WebCache.h"
#import "Header.h"
#import "UIView+XBZKeyBoard.h"
#import "Dt_DynamicModel.h"
#import "Dt_AlertView.h"
#import "Dt_ButlabelIconView.h"




@interface Dt_DynamicBaseCell()
@property(nonatomic,strong)UIImageView* userHeadImagView;
@property(nonatomic,strong)UILabel * usenameLabel;
@property(nonatomic,strong)UILabel * timeLabel;
@property(nonatomic,strong)UILabel * infoLabel;
@property(nonatomic,strong)UIButton * followBut;
@property(nonatomic,strong)Dt_ButlabelIconView * heartBut;
@property(nonatomic,strong)Dt_ButlabelIconView * diamondBut;
@property(nonatomic,strong)Dt_ButlabelIconView * messageBut;
@property(nonatomic,strong)Dt_ButlabelIconView * shareBut;


@property(nonatomic,strong)UIButton * deleBut;
@property(nonatomic,strong)UIView * bttomView;
@property(nonatomic,strong)UIView * bttomlineView;

@property(nonatomic,strong)NSMutableArray<Dt_ButlabelIconView*> * showButArr;
@end

@implementation Dt_DynamicBaseCell

- (void)awakeFromNib {
    [super awakeFromNib];
    
}

- (instancetype)initWithStyle:(UITableViewCellStyle)style reuseIdentifier:(NSString *)reuseIdentifier
{
    if (self = [super initWithStyle:style reuseIdentifier:reuseIdentifier]) {
        [self initBaseUi];
        self.selectionStyle = UITableViewCellSelectionStyleNone;
    }
    return self;
    
}
-(UIButton*)makeLabelBut:(NSString*)tittleStr perentUi:(UIView*)perentUi;
{
    UIButton *btn =[UIButton buttonWithType:UIButtonTypeRoundedRect];
    btn.frame = CGRectMake(0, 0, 100, 30);
    [btn setTitle:tittleStr forState:UIControlStateNormal];//正常状态
    [btn setTitle:tittleStr forState:UIControlStateHighlighted];//正常状态高亮控制
    btn .titleLabel.font = [UIFont systemFontOfSize:16];
    [perentUi addSubview:btn];
    return btn;
}
-(UIImageView*)makeImageView;
{
    UIImageView* temp=[[UIImageView alloc]initWithFrame:CGRectMake(0, 0, 89, 89)];
    temp.userInteractionEnabled = YES;
    [self.infoBg addSubview:temp];
    return temp;
    
}
-(Dt_UIImageViewLock*)makeImageLockView;
{
    Dt_UIImageViewLock* temp=[[Dt_UIImageViewLock alloc]initWithFrame:CGRectMake(0, 0, 89, 89)];
    temp.userInteractionEnabled = YES;
    [self.infoBg addSubview:temp];
    return temp;
    
}
-(UIButton*)makeImagesBut:(NSString*)picStr perentUi:(UIView*)perentUi;
{
    UIButton *btn =[[UIButton alloc]initWithFrame: CGRectMake(0, 0, 40, 40)] ;
    [btn setImage:[UIImage imageNamed:picStr] forState:UIControlStateNormal];
    [btn setImageEdgeInsets:UIEdgeInsetsMake(0, 0, 0, 0)];
    btn.imageView.contentMode = UIViewContentModeScaleAspectFit;
    [perentUi addSubview:btn];
    return btn;
}
-(Dt_ButlabelIconView*)makButlabelIconView:(NSString*)picStr perentUi:(UIView*)perentUi;
{
    Dt_ButlabelIconView *btn =[[Dt_ButlabelIconView alloc]initWithFrame: CGRectMake(0, 0, 60, 30)] ;
    [btn setImageName:picStr];
    
    btn.userInteractionEnabled=YES;
    [perentUi addSubview:btn];
    return btn;
}

-(void)initBaseUi;
{
    self.showButArr=[[NSMutableArray alloc]init];
    
    self.bttomlineView =[[UIView alloc]initWithFrame:self.bounds];
    self.bttomlineView.backgroundColor=RGBOF(0xe4e4e4);
    [self addSubview:self.bttomlineView];
    
    self.bttomView=[[UIView alloc]initWithFrame:self.bounds];
    [self addSubview:self.bttomView];
    
    self.infoBg=[[UIView alloc]initWithFrame:self.bounds];
    [self addSubview:self.infoBg];
    
    
    self.userHeadImagView=[[UIImageView alloc]initWithFrame:CGRectMake(10, 10, 54, 54)];
    [self addSubview:self.userHeadImagView];
    self.userHeadImagView.layer.cornerRadius = 27; // 圆角的弧度
    self.userHeadImagView.clipsToBounds=YES;
    
    CGFloat tx=100;
    
    self.usenameLabel=[[UILabel alloc]initWithFrame:CGRectMake(tx, 5, 60, 24)];
    self.usenameLabel.font =[UIFont systemFontOfSize:16];
    [self addSubview:self.usenameLabel];
    
    self.timeLabel=[[UILabel alloc]initWithFrame:CGRectMake(tx, 30, 60, 20)];
    self.timeLabel.font =[UIFont systemFontOfSize:14];
    self.timeLabel.textColor=RGBOF(0xbfbfbf);
    [self addSubview:self.timeLabel];
    
    self.infoLabel=[[UILabel alloc]initWithFrame:CGRectMake(tx, 55, 60, 20)];
    self.timeLabel.font =[UIFont systemFontOfSize:15];
    [self addSubview:self.infoLabel];
    
    
    self.followBut=[self makeLabelBut:@"关注" perentUi:self];
    self.followBut.layer.borderWidth=1.0;
    self.followBut.frame = CGRectMake(0, 0, 100, 28);
    self.followBut .titleLabel.font = [UIFont systemFontOfSize:16];
    self.followBut.layer.cornerRadius = self.followBut.height/2; // 圆角的弧度
  
    
    
    self.diamondBut=[self makButlabelIconView:@"diamond_img_diamond" perentUi:self.bttomView];
    self.heartBut=[self makButlabelIconView:@"dt_xihuan_bai" perentUi:self.bttomView];
    self.messageBut=[self makButlabelIconView:@"dt_liaotian" perentUi:self.bttomView];
    self.shareBut=[self makButlabelIconView:@"dt_zhuanfa" perentUi:self.bttomView];
    
    
    self.deleBut=[self makeLabelBut:@"删除" perentUi:self.bttomView];
     self.deleBut.backgroundColor = [UIColor clearColor];
    [self.deleBut setTitleColor:RGBOF(0x666666) forState:UIControlStateNormal];
    
    self.diamondBut.frame=CGRectMake(0, 0, 25, 20);
    self.heartBut.frame=CGRectMake(50, 0, 25, 20);
    self.shareBut.frame=CGRectMake(150, 0,  25, 20);
    self.deleBut.frame=CGRectMake(200, 0, 60, 20);
    
    
    [self.heartBut addGestureRecognizer:[[UITapGestureRecognizer alloc]initWithTarget:self action:@selector(heartButClikEvent:)]];
    [self.followBut addGestureRecognizer:[[UITapGestureRecognizer alloc]initWithTarget:self action:@selector(followButClikEvent:)]];
    [self.deleBut addGestureRecognizer:[[UITapGestureRecognizer alloc]initWithTarget:self action:@selector(deleButClikEvent:)]];
    [self.messageBut addGestureRecognizer:[[UITapGestureRecognizer alloc]initWithTarget:self action:@selector(messageButClikEvent:)]];
}
 
-(void)heartButClikEvent:(UITapGestureRecognizer *)sender;
{
    if([[ Dt_DynamicModel default] heartByKey:self.heartKey]==0){
        self.datavo.tabelVo.likes+=1;
    }
 
    if([[ Dt_DynamicModel default] heartByKey:self.heartKey]==1){
        [[ Dt_DynamicModel default] setHdeartByKey:self.heartKey num:@2];
    }else{
        [[ Dt_DynamicModel default] setHdeartByKey:self.heartKey num:@1];
    }
    
    [self refrishUi];
 
}
-(NSString*)heartKey;
{
    NSString* key=[NSString stringWithFormat:@"%@_%d",@"blog",(int)self.datavo.tabelVo.id ];
    
    return key;
}
-(void)messageButClikEvent:(UITapGestureRecognizer *)sender;
{
 
    [_delegate clikOpenMsgPanel:self.datavo];
    
}
-(void)followButClikEvent:(UITapGestureRecognizer *)sender;
{
    BOOL isFollow=[[Dt_DynamicModel default] isfollowByUserName:self.datavo.tabelVo.username];
  [[Dt_DynamicModel default]  addFollowByUserId:self.datavo.tabelVo.username  data:!isFollow];

 
    [_delegate listReloadData];
}
-(void)deleButClikEvent:(UITapGestureRecognizer *)sender;
{
    
    Dt_DynamicBaseCell* that=self;
    Dt_AlertView *dtAlertView=   [[Dt_AlertView alloc]init] ;
    Dt_AlertVo* redBagAlertVo= [[Dt_AlertVo alloc]init];
    redBagAlertVo.tittleStr=@"提示";
    redBagAlertVo.cacelStr=@"取消";
    redBagAlertVo.submitStr=@"确定";
    NSString* tipStr=@"确定是否删除";
    redBagAlertVo.butedStr=[[NSMutableAttributedString alloc] initWithString:tipStr];
    [dtAlertView showAlert:redBagAlertVo submitFun:^(int submitCode) {
        NSMutableDictionary* dic=[[NSMutableDictionary alloc]init];
        [dic setObject:[NSString stringWithFormat:@"%ld",self.datavo.tabelVo.id] forKey:@"id"];
        [[ Dt_DynamicModel default] basePostToUrl:PLATFORM_GAME_BLOG_DELETE paramDict:dic  PostSuccess:^(NSDictionary *responseJson) {
 
            [that.delegate deleSelectCell:self.datavo];
            
        }];
    } canalFun:^(int canelCode) {
        
    }];
}
-(void)layoutSubviews;
{
    
    CGFloat tx=kScreenW/4.3;
     
     self.usenameLabel.frame=CGRectMake(tx, 5, 60, 24);
     self.timeLabel.frame=CGRectMake(tx, 30, 60, 20);
     self.infoLabel.frame=CGRectMake(tx, 55, 60, 20);
    
    
    self.followBut.frame=CGRectMake(self.width-90, 10, 80, 28);
    self.bttomView.frame=CGRectMake(tx, self.height-40, self.width-100, 30);
    self.bttomlineView.frame=CGRectMake(0, self.height-1, self.width, 1);
    self.infoLabel.frame=CGRectMake(tx, 55, self.width-200, 20);
    if(self.datavo.content.length){
        self.infoBg.frame=CGRectMake(tx, 80, self.width-tx, self.height-100-25);
    }else{
        self.infoBg.frame=CGRectMake(tx, 55, self.width-tx, self.height-100);
    }
 
 for (int i=0; i<self.showButArr.count; i++) {
      self.showButArr[i].frame=CGRectMake(i*60, 0, 60, 20);
     
     
  }
    
 
}
-(BOOL)showAlertLock;
{
    if(self.datavo.tabelVo.is_lock>0){
        BOOL enoughMoney=YES;
        Dt_AlertView *dtAlertView=   [[Dt_AlertView alloc]init] ;
        Dt_AlertVo* redBagAlertVo= [[Dt_AlertVo alloc]init];
        redBagAlertVo.tittleStr=@"提示";
        redBagAlertVo.cacelStr=@"取消";
        NSString* tipStr=[NSString stringWithFormat:@"解锁需要%ld钻石！",self.datavo.tabelVo.is_lock];
        NSMutableAttributedString  * butedStr = [[NSMutableAttributedString alloc] initWithString:tipStr];
        [butedStr addAttribute:NSForegroundColorAttributeName value:[UIColor redColor] range:NSMakeRange(4,  tipStr.length-7)];
        if(enoughMoney){
            redBagAlertVo.submitStr=@"确定";
        }else{
            redBagAlertVo.submitStr=@"充值";
        }
        redBagAlertVo.butedStr=butedStr;
        [dtAlertView showAlert:redBagAlertVo submitFun:^(int submitCode) {
            if(enoughMoney){ //够钱解锁
                NSMutableDictionary* dic=[[NSMutableDictionary alloc]init];
                [dic setObject: [NSString stringWithFormat:@"%d",(int)self.datavo.tabelVo.id] forKey:@"id"];
                [[ Dt_DynamicModel default] basePostToUrl:PLATFORM_BLOG_UNLOCK_BLOG paramDict:dic  PostSuccess:^(NSDictionary *responseJson) {
                    int codeNum=   [[responseJson valueForKey:@"code"]intValue];
                    if(codeNum==0){
                        [self refrishUi];
                    }else{
                        NSLog(@"发送失败");
                    }
                }];
            }else
            {
                NSLog(@"前去充值");
            }
        } canalFun:^(int canelCode) {
            
        }];
        return YES;
    }else{
        return NO;
    }

}


-(void)imgLoadByUrl:(NSString*)url imgView:(UIImageView*)imgView;
{
    //imgView.image = [UIImage imageWithData:[NSData dataWithContentsOfURL:[NSURL URLWithString:url]]];
    
    [imgView sd_setImageWithURL:[NSURL URLWithString:url] ];
    
    
}
-(void)imgLockLoadByUrl:(NSString*)url imgView:(UIImageView*)imgView blurum:(CGFloat)blurum;
{
    [imgView sd_setImageWithURL:[NSURL URLWithString:url] completed:^(UIImage * _Nullable image, NSError * _Nullable error, SDImageCacheType cacheType, NSURL * _Nullable imageURL) {
        if(!error&&blurum>0){
            imgView.image=[self coreBlurImage:image withBlurNumber:blurum];
        }
    }];
    
}
-(UIImage *)coreBlurImage:(UIImage *)image
           withBlurNumber:(CGFloat)blur {
    //博客园-FlyElephant
    CIContext *context = [CIContext contextWithOptions:nil];
    CIImage  *inputImage=[CIImage imageWithCGImage:image.CGImage];
    //设置filter
    CIFilter *filter = [CIFilter filterWithName:@"CIGaussianBlur"];
    [filter setValue:inputImage forKey:kCIInputImageKey];
    [filter setValue:@(blur) forKey: @"inputRadius"];
    //模糊图片
    CIImage *result=[filter valueForKey:kCIOutputImageKey];
    CGImageRef outImage=[context createCGImage:result fromRect:[result extent]];
    UIImage *blurImage=[UIImage imageWithCGImage:outImage];
    CGImageRelease(outImage);
    return blurImage;
}
 
 
-(void)refrishUi;
{
    
    //  DynamicTabelVo* dynamicTabelVo= self.datavo.tabelVo;
    
    self.usenameLabel.text=self.datavo.nick_name;
    self.timeLabel.text=[[Dt_DynamicModel default] getTimeStr: [self.datavo.tabelVo.add_time doubleValue]];
 
    self.infoLabel.text=self.datavo.content;
    [self imgLoadByUrl:@"http://34.87.12.20:20080//static/upload/dt/20191118/0aabf400d747b6955ce73bd97836fa9b_mini.jpg" imgView:self.userHeadImagView];
    
    
    self.followBut.hidden=self.datavo.isSelf;
   
    BOOL isFollow=[[Dt_DynamicModel default] isfollowByUserName:self.datavo.tabelVo.username];
    if(isFollow){
        self.followBut.backgroundColor =[UIColor whiteColor];
        self.followBut.layer.borderColor=RGBOF(0xff5549).CGColor;
        [self.followBut setTitleColor:RGBOF(0xff5549) forState:UIControlStateNormal];
    }else{
        self.followBut.backgroundColor =[UIColor whiteColor];
        self.followBut.layer.borderColor=RGBOF(0x9ccc65).CGColor;
        [self.followBut setTitleColor:RGBOF(0x9ccc65) forState:UIControlStateNormal];
    }
    
    self.deleBut.hidden=!self.datavo.isSelf;
    
    if([[ Dt_DynamicModel default] heartByKey:self.heartKey]){
           [self.heartBut setImageName:@"dt_xihuan_hong"];
    }else{
        [self.heartBut setImageName:@"dt_xihuan_bai"];
    }
    
    [self.showButArr removeAllObjects];
    if(self.datavo.tabelVo.is_lock>0){
        self.diamondBut.hidden=NO;
        [self.showButArr addObject: self.diamondBut];
    }else{
        self.diamondBut.hidden=YES;
    }
    [self.showButArr addObject: self.heartBut];
    [self.showButArr addObject: self.messageBut];
    [self.showButArr addObject: self.shareBut];
    
    
    [self.diamondBut setNumValue:(int)self.datavo.tabelVo.gift_total];
    
    if([[ Dt_DynamicModel default] heartByKey:self.heartKey]==2){
         [self.heartBut setNumValue:(int)self.datavo.tabelVo.likes-1];
    }else{
         [self.heartBut setNumValue:(int)self.datavo.tabelVo.likes];
    }
    
     [self.messageBut setNumValue:(int)self.datavo.tabelVo.comments];

   
    
    [self layoutSubviews];
    
}
-(void)setCellData:(DynamicBaseVo*)value;
{
    if(value){
        self.datavo=value;
        [self refrishUi];
        // self.backgroundColor=[UIColor redColor];
    }
    
}
- (void)setSelected:(BOOL)selected animated:(BOOL)animated {
    [super setSelected:selected animated:animated];
    
}

@end

