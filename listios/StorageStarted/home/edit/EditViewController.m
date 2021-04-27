//
//  EditViewController.m
//  StorageStarted
//
//  Created by pan3dme on 2021/4/27.
//  Copyright © 2021 cuiyiran. All rights reserved.
//

#import "EditViewController.h"
#import "MyActivityIndicatorView.h"

 

@interface EditViewController ()<UINavigationControllerDelegate,UIImagePickerControllerDelegate>

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

@implementation EditViewController

- (void)viewDidLoad {
    [super viewDidLoad];
    // Do any additional setup after loading the view from its nib.
}

/*
#pragma mark - Navigation

// In a storyboard-based application, you will often want to do a little preparation before navigation
- (void)prepareForSegue:(UIStoryboardSegue *)segue sender:(id)sender {
    // Get the new view controller using [segue destinationViewController].
    // Pass the selected object to the new view controller.
}
*/

@end
