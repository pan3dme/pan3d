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
@property (weak, nonatomic) IBOutlet UIImageView *bannerImageView;
@property (weak, nonatomic) IBOutlet UITextField *titlelabeltxt;
@property (weak, nonatomic) IBOutlet UITextField *infolabeltxt;
@property (weak, nonatomic) IBOutlet UITextView *sceneinfoText;
@property (weak, nonatomic) IBOutlet UITextField *tagLabeText;
@property (weak, nonatomic) IBOutlet UIButton *clearImg0Btn;
@property (weak, nonatomic) IBOutlet UIButton *clearImg1Btn;
@property (weak, nonatomic) IBOutlet UIButton *clearImg2Btn;
@property (weak, nonatomic) IBOutlet UIButton *clearImg3Btn;
@property (weak, nonatomic) IBOutlet UIButton *clearBanerImgBtn;
@property (weak, nonatomic) IBOutlet UISwitch *editOrNewUISwitch;

@property (nonatomic,strong)MyActivityIndicatorView* myActivityIndicatorView;
@property (nonatomic,strong) UIImagePickerController *imagePicker;
@property (nonatomic,strong) Pan3dListVo * pan3dListVo;
@property (nonatomic,strong)NSMutableArray<UIImageView*>*  imgViewArr;
@property (nonatomic,strong)NSMutableArray* imgBaseFileArr;
@property (nonatomic,strong)AVFile* imgBanerBaseFile ;
@property (nonatomic,strong)UIImage* bannerImage;
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
  
  
    
   _imgViewArr=[[NSMutableArray alloc]init];
    [_imgViewArr addObject:_productImageView0];
    [_imgViewArr addObject:_productImageView1];
    [_imgViewArr addObject:_productImageView2];
    [_imgViewArr addObject:_productImageView3];
     
    
    for (NSUInteger i=0; i<_imgViewArr.count; i++) {
        [_imgViewArr objectAtIndex:i].userInteractionEnabled=YES;
        UITapGestureRecognizer *singleTap =[[UITapGestureRecognizer alloc]initWithTarget:self action:@selector(onClickImage)];
        [  [_imgViewArr objectAtIndex:i] addGestureRecognizer:singleTap];
    }
    _bannerImageView.userInteractionEnabled=YES;
    UITapGestureRecognizer *banersingleTap =[[UITapGestureRecognizer alloc]initWithTarget:self action:@selector(baneronClickImage)];
    [_bannerImageView addGestureRecognizer:banersingleTap];
    
    _clearbutArr=[[NSMutableArray alloc]init];
    [_clearbutArr addObject:_clearImg0Btn];
    [_clearbutArr addObject:_clearImg1Btn];
    [_clearbutArr addObject:_clearImg2Btn];
    [_clearbutArr addObject:_clearImg3Btn];
    
    _imgBaseFileArr=[[NSMutableArray alloc]init];
 
    if(_pan3dListVo!=nil){
        _titlelabeltxt.text=_pan3dListVo.title;
        _infolabeltxt.text=_pan3dListVo.text;
        _tagLabeText.text=_pan3dListVo.tag;
        _sceneinfoText.text= [[NSString alloc]initWithData:[NSJSONSerialization dataWithJSONObject:_pan3dListVo.sceneinfo options:0 error:nil] encoding:NSUTF8StringEncoding];
        [self addBaseImgFileToArr: _pan3dListVo.avFile0];
        [self addBaseImgFileToArr: _pan3dListVo.avFile1];
        [self addBaseImgFileToArr: _pan3dListVo.avFile2];
        [self addBaseImgFileToArr: _pan3dListVo.avFile3];
    
    }
    _imgBanerBaseFile=_pan3dListVo.baner;
  
    [self refrishUi];
 
    self.navigationItem.rightBarButtonItem=[[UIBarButtonItem alloc]initWithImage:[UIImage imageNamed:@"home"] style:UIBarButtonItemStylePlain target:self  action:@selector(clickRightBarButtonItem)];
    
    _editOrNewUISwitch.on=NO;
   
}
-(void)baneronClickImage
{
    _isBanerImageSelect=YES;
    [self makeUpImageViewPic];
}
-(void)onClickImage{
    _isBanerImageSelect=NO;
    [self makeUpImageViewPic];
  
}
-(void)makeUpImageViewPic
{
    self.imagePicker.delegate = self;
    self.imagePicker.allowsEditing = YES;
    self.imagePicker.sourceType = UIImagePickerControllerSourceTypePhotoLibrary;
    [self presentViewController:self.imagePicker animated:YES completion:nil];
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
    for (NSUInteger i=0; i<_imgViewArr.count; i++) {
        if(_imgBaseFileArr.count>i){
            if([_imgBaseFileArr[i] isKindOfClass: [AVFile class]] ){
                [self loadImageByInfoimg:_imgViewArr[i] avFile:_imgBaseFileArr[i]];
              
            }else{
                _imgViewArr[i].image=_imgBaseFileArr[i];
            }
            [_clearbutArr[i] setHidden:NO];
        }else{
            [_clearbutArr[i] setHidden:YES];
            _imgViewArr[i].image=[UIImage imageNamed:_emptyPicUrl];
        }
    }
    if(_bannerImage){
        _bannerImageView.image=_bannerImage;
        [_clearBanerImgBtn setHidden:NO];
    }else{
      
        if(_imgBanerBaseFile){
            [self loadImageByInfoimg:_bannerImageView avFile:_imgBanerBaseFile];
            [_clearBanerImgBtn setHidden:NO];
        }else{
            [_clearBanerImgBtn setHidden:YES];
            _bannerImageView.image=[UIImage imageNamed:_emptyPicUrl];
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
-(void)meshBaseProductInfo:(AVObject*)val
{
    AVObject *product = val;
    [product setObject:[NSNumber numberWithInt:1] forKey:@"type"];
    [product setObject: self.titlelabeltxt.text forKey:@"title"];
    [product setObject: self.infolabeltxt.text forKey:@"text"];
    [product setObject:self.sceneinfoText.text forKey:@"sceneinfo"];
    [product setObject:self.tagLabeText.text forKey:@"tag"];
    
    
  
    for (NSUInteger i=0; i<_imgViewArr.count; i++) {
        AVFile *file;
        if( [UIImage imageNamed:_emptyPicUrl]!=_imgViewArr[i].image){
            NSData * imageData= [self getAvfileByImage:_imgViewArr[i].image] ;
            file = [AVFile fileWithData:imageData];
        }
        [product setObject:file forKey:[NSString stringWithFormat:@"image%lu",i]];
    }
   
    if( [UIImage imageNamed:_emptyPicUrl]!=_bannerImageView.image){
        [product setObject:[AVFile fileWithData:[self getAvfileByImage:_bannerImageView.image] ] forKey:@"baner"];
    }else{
        [product setObject:nil forKey:@"baner"];
    }

   
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
 

#pragma mark - UIImagePickerControllerDelegate
#pragma mark - 拍照/选择图片结束
- (void)imagePickerController:(UIImagePickerController *)picker didFinishPickingMediaWithInfo:(NSDictionary *)info
{
   UIImage *image = [info objectForKey:UIImagePickerControllerEditedImage];

    
    if(_isBanerImageSelect){
        _bannerImage=image;
    }else{
        [_imgBaseFileArr addObject:image];
    }
  
    
    [self refrishUi];
    
   [self.imagePicker dismissViewControllerAnimated:YES completion:nil];
    
   
}
-(UIImageView*)getCanPushImgView
{
    for (NSUInteger i=0; i<_imgViewArr.count; i++) {
        if(_imgViewArr[i].image==[UIImage imageNamed:_emptyPicUrl]){
            return _imgViewArr[i];
        }
     
    }
    return nil;
    
}
#pragma mark - 取消拍照/选择图片
- (void)imagePickerControllerDidCancel:(UIImagePickerController *)picker
{
   [self.imagePicker dismissViewControllerAnimated:YES completion:nil];
}
#pragma mark - 选择图片
-(void)selectImageWithPickertype:(UIImagePickerControllerSourceType)sourceType {
    if ([UIImagePickerController isSourceTypeAvailable:sourceType]) {
        self.imagePicker.delegate = self;
        self.imagePicker.allowsEditing = YES;
        self.imagePicker.sourceType = sourceType;
        [self presentViewController:self.imagePicker animated:YES completion:nil];
    }
    else{
        [self alertMessage:@"图片库不可用或当前设备没有摄像头" handler:nil];
    }
}
- (IBAction)clearImg0BtnClik:(id)sender {
    
    [_imgBaseFileArr removeObjectAtIndex:0];
    [self refrishUi];
}
- (IBAction)clearImg1BtnClik:(id)sender {
    [_imgBaseFileArr removeObjectAtIndex:1];
    [self refrishUi];
}
- (IBAction)clearImg2BtnClik:(id)sender {
    [_imgBaseFileArr removeObjectAtIndex:2];
    [self refrishUi];
}
- (IBAction)clearImg3BtnClik:(id)sender {
    [_imgBaseFileArr removeObjectAtIndex:3];
    [self refrishUi];
}
- (IBAction)clearBanefrImgBtnClik:(id)sender {
    _bannerImage=nil;
    _imgBanerBaseFile=nil;
    [self refrishUi];
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
    
}
#pragma mark -  Private Methods
-(void)alertMessage:(NSString *)message handler:(void (^ __nullable)(UIAlertAction *action))handler{
    
    UIAlertController *alertController = [UIAlertController alertControllerWithTitle:@"温馨提示" message:message preferredStyle:UIAlertControllerStyleAlert];
    
    UIAlertAction *action =  [UIAlertAction actionWithTitle:@"确定" style:UIAlertActionStyleCancel handler:handler];
    [alertController addAction:action];
    [self presentViewController:alertController animated:YES completion:nil];
    
}
-(UIImagePickerController *)imagePicker{
    if (!_imagePicker) {
        _imagePicker = [[UIImagePickerController alloc]init];
    }
    return _imagePicker;
}
@end
