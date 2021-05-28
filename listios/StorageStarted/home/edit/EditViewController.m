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

 

@interface EditViewController ()

 
@property (weak, nonatomic) IBOutlet UITextField *titlelabeltxt;
@property (weak, nonatomic) IBOutlet UITextField *infolabeltxt;
@property (weak, nonatomic) IBOutlet UITextView *sceneinfoText;
@property (weak, nonatomic) IBOutlet UITextField *tagLabeText;
@property (weak, nonatomic) IBOutlet UISwitch *editOrNewUISwitch;
@property (weak, nonatomic) IBOutlet UITextView *imagesText;
@property (weak, nonatomic) IBOutlet UITextView *bannerText;

@property (nonatomic,strong)MyActivityIndicatorView* myActivityIndicatorView;
@property (nonatomic,strong) UIImagePickerController *imagePicker;
@property (nonatomic,strong) Pan3dListVo * pan3dListVo;
@property (nonatomic,strong)NSMutableArray<UIButton*>* clearbutArr;

@property (nonatomic,assign)bool isBanerImageSelect;

@property (nonatomic,strong)NSString* emptyPicUrl;

@end
 

@implementation EditViewController


 
- (instancetype)init:(Pan3dListVo* __nullable)val
{
    self = [super init];
    if (self) {
        _pan3dListVo=val;
        _emptyPicUrl=@"image_downloadFailed";
     
    }
  
    return self;
}
- (void)viewDidLoad {
    [super viewDidLoad];
   
    
    _imagesText.backgroundColor=[UIColor whiteColor];
    _bannerText.backgroundColor=[UIColor whiteColor];
    _sceneinfoText.backgroundColor=[UIColor whiteColor];
     
   
 
    if(_pan3dListVo!=nil){
        _titlelabeltxt.text=_pan3dListVo.title;
        _infolabeltxt.text=_pan3dListVo.text;
        _tagLabeText.text=_pan3dListVo.tag;
        _imagesText.text=_pan3dListVo.images;
        _bannerText.text=_pan3dListVo.bannerimage;
        _sceneinfoText.text= [[NSString alloc]initWithData:[NSJSONSerialization dataWithJSONObject:_pan3dListVo.sceneinfo options:0 error:nil] encoding:NSUTF8StringEncoding];
    
    
    }
 
  
    [self refrishUi];
 
    self.navigationItem.rightBarButtonItem=[[UIBarButtonItem alloc]initWithImage:[UIImage imageNamed:@"home"] style:UIBarButtonItemStylePlain target:self  action:@selector(clickRightBarButtonItem)];
    
    _editOrNewUISwitch.on=NO;
   
}
-(void)clickRightBarButtonItem
{
    UIAlertController *alertController = [UIAlertController alertControllerWithTitle:@"提示" message:@"确定是否删除记录" preferredStyle:UIAlertControllerStyleAlert];
    [alertController addAction:[UIAlertAction actionWithTitle:@"确定" style:UIAlertActionStyleDefault handler:^(UIAlertAction * _Nonnull action) {
        AVObject *todo = [AVObject objectWithClassName:@"pan3dlist002" objectId:_pan3dListVo.objectId];
        [todo deleteInBackgroundWithBlock:^(BOOL succeeded, NSError * _Nullable error) {
                    [self.navigationController popViewControllerAnimated:true];
        }];
         
    
    }]];
    [alertController addAction:[UIAlertAction actionWithTitle:@"取消" style:UIAlertActionStyleDefault handler:nil]];
    [self presentViewController:alertController animated:true completion:nil];
}
-(void)refrishUi
{
  
   
    
   
}
-(NSData*)getAvfileByImage:(UIImage*)image
{
    NSData * imageData;
    if (UIImagePNGRepresentation(image)) {
        imageData = UIImagePNGRepresentation(image);
    }else{
        imageData = UIImageJPEGRepresentation(image, 1.0);
    }
    return imageData;
}
 
-(void)meshBaseProductInfo:(AVObject*)val
{
    AVObject *product = val;
    [product setObject:[NSNumber numberWithInt:1] forKey:@"type"];
    [product setObject: self.titlelabeltxt.text forKey:@"title"];
    [product setObject: self.infolabeltxt.text forKey:@"text"];
    [product setObject:self.sceneinfoText.text forKey:@"sceneinfo"];
    [product setObject:self.tagLabeText.text forKey:@"tag"];
    [product setObject:self.imagesText.text forKey:@"images"];
    [product setObject:self.bannerText.text forKey:@"bannerimage"];
    
}
 
- (IBAction)publishBtn:(id)sender {
    
    
    NSData *stringData = [_sceneinfoText.text dataUsingEncoding:NSUTF8StringEncoding];
    NSArray *sceneInfoArr  = [NSJSONSerialization JSONObjectWithData:stringData options:0 error:nil];
    if(sceneInfoArr==nil){
        [self alertMessage:@"场景信息不合法，需要为数组结构" handler:nil];
        return;
    }
   
    bool isNew=_editOrNewUISwitch.on;
    NSString* tipstr;
    AVObject *product;
    if(isNew){
        product = [AVObject objectWithClassName:@"pan3dlist002"];
        [product setObject: [AVUser currentUser] forKey:@"owner"];
        tipstr=@"保存新场景";
    }else{
        product= [AVObject objectWithClassName:@"pan3dlist002" objectId:_pan3dListVo.objectId];
        tipstr=@"编辑场景";
    }
    [self meshBaseProductInfo:product];
    [self playSendAnima];
    [product saveInBackgroundWithBlock:^(BOOL succeeded, NSError *error) {
        if (succeeded) {
            [self alertMessage: [NSString stringWithFormat:@"%@成功",tipstr] handler:^(UIAlertAction * _Nonnull action) {
                [self.navigationController popViewControllerAnimated:true];
                 
            }];
            //
        } else {
            NSLog(@"%@出错 %@",tipstr, error.localizedFailureReason);
        }
        [self stopSendAnima];
    }];
    
}
  
 

-(void)playSendAnima
{
    _myActivityIndicatorView = [[MyActivityIndicatorView alloc]init];
    [self.view addSubview:_myActivityIndicatorView];
    [_myActivityIndicatorView startAnimating];
}
-(void)stopSendAnima
{
    [_myActivityIndicatorView stopAnimating];
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
    [_tagLabeText resignFirstResponder];
    [_imagesText resignFirstResponder];
    [_bannerText resignFirstResponder];
 
    
}
#pragma mark -  Private Methods
-(void)alertMessage:(NSString *)message handler:(void (^ __nullable)(UIAlertAction *action))handler{
    
    UIAlertController *alertController = [UIAlertController alertControllerWithTitle:@"温馨提示" message:message preferredStyle:UIAlertControllerStyleAlert];
    
    UIAlertAction *action =  [UIAlertAction actionWithTitle:@"确定" style:UIAlertActionStyleCancel handler:handler];
    [alertController addAction:action];
    [self presentViewController:alertController animated:YES completion:nil];
    
}
 
@end
