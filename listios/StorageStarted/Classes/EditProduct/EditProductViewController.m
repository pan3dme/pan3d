//
//  EditProductViewController.m
//  StorageStarted
//
//  Created by XiaoXu on 2018/7/23.
//  Copyright © 2018年 cuiyiran. All rights reserved.
//

#import "EditProductViewController.h"
#import <AVOSCloud/AVOSCloud.h>
#import "MyActivityIndicatorView.h"

@interface EditProductViewController ()<UINavigationControllerDelegate,UIImagePickerControllerDelegate>

@property (weak, nonatomic) IBOutlet UITextView *sceneinfoText;
@property (weak, nonatomic) IBOutlet UIImageView *productImageView0;
@property (weak, nonatomic) IBOutlet UIImageView *productImageView1;
@property (weak, nonatomic) IBOutlet UIImageView *productImageView2;
@property (weak, nonatomic) IBOutlet UIImageView *productImageView3;
@property (weak, nonatomic) IBOutlet UITextField *titlelabeltxt;

@property (weak, nonatomic) IBOutlet UITextField *infolabeltxt;


@property (nonatomic,strong)NSMutableArray* imgViewArr;
@property (nonatomic,strong)NSMutableArray* imageArr;
@property (nonatomic,strong)MyActivityIndicatorView* myActivityIndicatorView;

@property (nonatomic,strong) UIImagePickerController *imagePicker;
//@property (nonatomic,strong) NSData * imageData;
@end

@implementation EditProductViewController

- (void)viewDidLoad {
    [super viewDidLoad];
    self.navigationItem.title = @"发布新商品";
 
    self.imgViewArr=[[NSMutableArray alloc]init];
    [self.imgViewArr addObject:self.productImageView0];
    [self.imgViewArr addObject:self.productImageView1];
    [self.imgViewArr addObject:self.productImageView2];
    [self.imgViewArr addObject:self.productImageView3];
    
  
}
- (void)touchesBegan:(NSSet<UITouch *> *)touches withEvent:(UIEvent *)event
{
    [self.sceneinfoText resignFirstResponder];
    [self.titlelabeltxt resignFirstResponder];
}
-(void)viewWillAppear:(BOOL)animated{
    [super viewWillAppear:YES];
    [AVAnalytics beginLogPageView:@"EditProduct"];
    
    self.imageArr=[[NSMutableArray alloc]init];
    [self.productImageView0 setImage:[UIImage imageNamed:@"image_downloadFailed"]];
    [self.productImageView1 setImage:[UIImage imageNamed:@"image_downloadFailed"]];
    [self.productImageView2 setImage:[UIImage imageNamed:@"image_downloadFailed"]];
    [self.productImageView3 setImage:[UIImage imageNamed:@"image_downloadFailed"]];
    
}
- (void)viewWillDisappear:(BOOL)animated {
    [super viewWillDisappear:YES];
    [AVAnalytics endLogPageView:@"EditProduct"];
}
#pragma mark -  Button Callbacks

- (IBAction)openAlbumBtn:(id)sender {
    [self selectImageWithPickertype:UIImagePickerControllerSourceTypePhotoLibrary];
}

- (IBAction)takePhotoBtn:(id)sender {
    [self selectImageWithPickertype:UIImagePickerControllerSourceTypeCamera];
}
/*
 * LeanCloud - 保存对象 https://leancloud.cn/docs/leanstorage_guide-objc.html#hash632314851
*/
- (IBAction)publishBtn:(id)sender {
    [self saveInfo];
 
}
 
-(void)saveInfo
{
    if(self.imageArr.count==0){
        [self alertMessage:@"请输入完整信息"];
        return;
    }
    
  
 
    AVUser *currentUser = [AVUser currentUser];
    AVObject *product = [AVObject objectWithClassName:@"pan3dlist002"];
    [product setObject:[NSNumber numberWithInt:1] forKey:@"type"];
   
    [product setObject: self.titlelabeltxt.text forKey:@"title"];
    [product setObject: self.infolabeltxt.text forKey:@"text"];
    [product setObject:self.sceneinfoText.text forKey:@"sceneinfo"];
    [product setObject:currentUser forKey:@"owner"];
    
 
    for(NSUInteger i=0;i<self.imageArr.count;i++){
        AVFile *file = [AVFile fileWithData:[self getAvfileByImage:[self.imageArr objectAtIndex:i]]];
        [product setObject:file forKey:[NSString stringWithFormat:@"image%lu",i]];
    }
 
    self.myActivityIndicatorView = [[MyActivityIndicatorView alloc]init];

  [self.view addSubview:_myActivityIndicatorView];

  // 动画开始

  [_myActivityIndicatorView startAnimating];
 
    [product saveInBackgroundWithBlock:^(BOOL succeeded, NSError *error) {
        if (succeeded) {
            NSLog(@"保存新场景成功");
            [self alertMessage:@"保存新场景成功"];
        } else {
            NSLog(@"保存新场景出错 %@", error.localizedFailureReason);
        }
        [_myActivityIndicatorView stopAnimating];
    }];
 
    
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
- (NSDictionary *)convert2DictionaryWithJSONString:(NSString *)jsonString{
    NSData *jsonData = [jsonString dataUsingEncoding:NSUTF8StringEncoding];
    NSError *err;
    NSDictionary *dic = [NSJSONSerialization JSONObjectWithData:jsonData
                                                        options:NSJSONReadingMutableContainers
                                                          error:&err];
    
    
    if(err)
    {
        NSLog(@"%@",err);
        return nil;
    }
    return dic;
}
 
#pragma mark - UIImagePickerControllerDelegate
#pragma mark - 拍照/选择图片结束
- (void)imagePickerController:(UIImagePickerController *)picker didFinishPickingMediaWithInfo:(NSDictionary *)info
{
    UIImage *image = [info objectForKey:UIImagePickerControllerEditedImage];
    
    if(self.imageArr.count>=4){
        return;
    }
 
    [self.imageArr addObject:image];
   
    UIImageView* uiImageView= [self.imgViewArr objectAtIndex:self.imageArr.count-1];
    uiImageView.image=image;
    
  
    [self.imagePicker dismissViewControllerAnimated:YES completion:nil];
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
        [self alertMessage:@"图片库不可用或当前设备没有摄像头"];
    }
}
#pragma mark -  Private Methods
-(void)alertMessage:(NSString *)message{
    
    UIAlertController *alertController = [UIAlertController alertControllerWithTitle:@"温馨提示" message:message preferredStyle:UIAlertControllerStyleAlert];
    UIAlertAction *action = [UIAlertAction actionWithTitle:@"确定" style:UIAlertActionStyleCancel handler:nil];
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
