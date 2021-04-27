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
-(void)addBaseImgFileToArr:(AVFile*)val {
    if(val!=nil){
        [_imgBaseFileArr addObject:val];
    }
    
}
-(void)saveChangeDataInfo
{
    AVObject *product = [AVObject objectWithClassName:@"pan3dlist002" objectId:_pan3dListVo.objectId];
    [product setObject:[NSNumber numberWithInt:1] forKey:@"type"];
    [product setObject: self.titlelabeltxt.text forKey:@"title"];
    [product setObject: self.infolabeltxt.text forKey:@"text"];
    [product setObject:self.sceneinfoText.text forKey:@"sceneinfo"];
    [self playSendAnima];
    for (NSUInteger i=0; i<_imgViewArr.count; i++) {
        NSData * imageData= [self getAvfileByImage:_imgViewArr[i].image] ;
        AVFile *file = [AVFile fileWithData:imageData];
        [product setObject:file forKey:[NSString stringWithFormat:@"image%lu",i]];
    }
 
    
    
    [product saveInBackgroundWithBlock:^(BOOL succeeded, NSError * _Nullable error) {
        [self stopSendAnima];
    }];
    
    

 
}
- (IBAction)publishBtn:(id)sender {
 

    [self saveChangeDataInfo];
   
}
-(void)saveNewData
{
    AVUser *currentUser = [AVUser currentUser];
    AVObject *product = [AVObject objectWithClassName:@"pan3dlist002"];
    [product setObject:[NSNumber numberWithInt:1] forKey:@"type"];
    [product setObject: self.titlelabeltxt.text forKey:@"title"];
    [product setObject: self.infolabeltxt.text forKey:@"text"];
    [product setObject:self.sceneinfoText.text forKey:@"sceneinfo"];
    [product setObject:currentUser forKey:@"owner"];
    
    [self playSendAnima];
    for (NSUInteger i=0; i<_imgViewArr.count; i++) {
        NSData * imageData= [self getAvfileByImage:_imgViewArr[i].image] ;
        AVFile *file = [AVFile fileWithData:imageData];
        [product setObject:file forKey:[NSString stringWithFormat:@"image%lu",i]];
    }
    [product saveInBackgroundWithBlock:^(BOOL succeeded, NSError *error) {
        if (succeeded) {
            NSLog(@"保存新场景成功");
            [self alertMessage:@"保存新场景成功"];
        } else {
            NSLog(@"保存新场景出错 %@", error.localizedFailureReason);
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
}
#pragma mark -  Private Methods
-(void)alertMessage:(NSString *)message{
    
    UIAlertController *alertController = [UIAlertController alertControllerWithTitle:@"温馨提示" message:message preferredStyle:UIAlertControllerStyleAlert];
    UIAlertAction *action = [UIAlertAction actionWithTitle:@"确定" style:UIAlertActionStyleCancel handler:nil];
    [alertController addAction:action];
    [self presentViewController:alertController animated:YES completion:nil];
    
}
@end
