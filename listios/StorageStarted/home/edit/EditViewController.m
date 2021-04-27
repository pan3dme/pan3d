//
//  EditViewController.m
//  StorageStarted
//
//  Created by pan3dme on 2021/4/27.
//  Copyright © 2021 cuiyiran. All rights reserved.
//

#import "EditViewController.h"
#import "MyActivityIndicatorView.h"
#import <SDWebImage/UIImageView+WebCache.h>

 

@interface EditViewController ()<UINavigationControllerDelegate,UIImagePickerControllerDelegate>

@property (weak, nonatomic) IBOutlet UIImageView *productImageView0;
@property (weak, nonatomic) IBOutlet UIImageView *productImageView1;
@property (weak, nonatomic) IBOutlet UIImageView *productImageView2;
@property (weak, nonatomic) IBOutlet UIImageView *productImageView3;
@property (weak, nonatomic) IBOutlet UITextField *titlelabeltxt;
@property (weak, nonatomic) IBOutlet UITextField *infolabeltxt;
@property (weak, nonatomic) IBOutlet UITextView *sceneinfoText;


@property (nonatomic,strong)MyActivityIndicatorView* myActivityIndicatorView;
@property (nonatomic,strong) UIImagePickerController *imagePicker;
@property (nonatomic,strong) Pan3dListVo * pan3dListVo;
@property (nonatomic,strong)NSMutableArray<UIImageView*>*  imgViewArr;
@property (nonatomic,strong)NSMutableArray<AVFile*>* imgBaseFileArr;
@property (nonatomic,strong)NSMutableArray* imgBmpArr;
@end
 

@implementation EditViewController

 
 
- (instancetype)init:(Pan3dListVo*)val
{
    self = [super init];
    if (self) {
        _pan3dListVo=val;
     
    }
    return self;
}
- (void)viewDidLoad {
    [super viewDidLoad];
    _titlelabeltxt.text=_pan3dListVo.title;
    _infolabeltxt.text=_pan3dListVo.text;
    _sceneinfoText.text= [[NSString alloc]initWithData:[NSJSONSerialization dataWithJSONObject:_pan3dListVo.sceneinfo options:0 error:nil] encoding:NSUTF8StringEncoding];
    
   _imgViewArr=[[NSMutableArray alloc]init];
    [_imgViewArr addObject:self.productImageView0];
    [_imgViewArr addObject:self.productImageView1];
    [_imgViewArr addObject:self.productImageView2];
    [_imgViewArr addObject:self.productImageView3];
    
    _imgBaseFileArr=[[NSMutableArray alloc]init];
 
    [self addBaseImgFileToArr: _pan3dListVo.image0];
    [self addBaseImgFileToArr: _pan3dListVo.image1];
    [self addBaseImgFileToArr: _pan3dListVo.image2];
    [self addBaseImgFileToArr: _pan3dListVo.image3];
    
    
    for (NSUInteger i=0; i<_imgViewArr.count; i++) {
        if(_imgBaseFileArr.count>i){
            [self loadImageByInfoimg:_imgViewArr[i] avFile:_imgBaseFileArr[i]];
        }
    }
 
}
-(void)addBaseImgFileToArr:(AVFile*)val {
    if(val!=nil){
        [_imgBaseFileArr addObject:val];
    }
    
}
-(void)loadImageByInfoimg:(UIImageView*)img avFile:(AVFile*)avFile
{
    if(avFile){
        NSString* url=    [avFile.url stringByReplacingOccurrencesOfString:@"http" withString:@"https"];
        [img sd_setImageWithURL:[NSURL URLWithString:url]   placeholderImage:[UIImage imageNamed:@"downloadFailed"]];
    }
 
}
- (void)touchesBegan:(NSSet<UITouch *> *)touches withEvent:(UIEvent *)event
{
    [_sceneinfoText resignFirstResponder];
    [_titlelabeltxt resignFirstResponder];
    [_infolabeltxt resignFirstResponder];
}
@end
