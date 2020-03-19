//
//  AddPanelController.m
//  动态
//
//  Created by zhao on 19/3/2020.
//  Copyright © 2020 zhao. All rights reserved.
//

#import "AddPanelController.h"
#import "Header.h"
#import "DynamicModel.h"
#import "AddImgVideoCell.h"

@interface AddPanelController ()
<
AddImgVideoCellDelegate,
UIImagePickerControllerDelegate,
UINavigationControllerDelegate
>

@property(nonatomic,strong)UITextField*  inputTextField;
@property(nonatomic,strong)UILabel*  totalNumLabel;
@property(nonatomic,strong)UIView*  picListView;
@property(nonatomic,strong)NSString*  oneUrl;
@property(nonatomic,strong)NSMutableArray<AddImgVideoCell*>*  cellItems;
@property(nonatomic,strong)NSMutableArray<NSString*>*  imgItems;
@end

@implementation AddPanelController

- (void)viewDidLoad {
    [super viewDidLoad];
    self.view.backgroundColor=[UIColor whiteColor];
    
    
    
    self.cellItems=[[NSMutableArray alloc]init];
    
    self.inputTextField=[[UITextField alloc]initWithFrame:CGRectMake(0, 0, 100, 20)];
    self.inputTextField.placeholder=@"分享新鲜事~";
    self.inputTextField.layer.borderWidth = 1.0;
    self.inputTextField.layer.cornerRadius = 5.0;
    self.inputTextField.layer.borderColor =[[UIColor grayColor] CGColor] ;
    self.inputTextField.font = [UIFont systemFontOfSize:16];
    [self.view addSubview: self.inputTextField];
    
    
    self.totalNumLabel=[[UILabel alloc]initWithFrame:CGRectMake(0, 0, 100, 30)];
    self.totalNumLabel.font = [UIFont systemFontOfSize:14];
    self.totalNumLabel.textAlignment=NSTextAlignmentRight;
    self.totalNumLabel.text=@"0/100";
    [self.view addSubview: self.totalNumLabel];
    
    
    self.picListView=[[UIView alloc]initWithFrame:CGRectMake(0, 0, 200, 200)];
    [self.view addSubview: self.picListView];
    
    [self makeFourImgView];
    
    
    UIBarButtonItem *rightBar=[[UIBarButtonItem alloc]initWithTitle:@"发布" style:UIBarButtonItemStylePlain target:self action:@selector(preeNext)];
         self.navigationItem.rightBarButtonItem=rightBar;
//    [rightBar setBackgroundImage:[UIImage imageNamed:@"diamond_img_diamond"] forState:(UIControlStateNormal) style:UIBarButtonItemStyleDone barMetrics:UIBarMetricsDefault];
 
    /*
    UIImage *rightImage = [[UIImage imageNamed:@"diamond_img_diamond"] imageWithRenderingMode:UIImageRenderingModeAlwaysOriginal];
        UIBarButtonItem *rightBar=[[UIBarButtonItem alloc] initWithImage:rightImage style:UIBarButtonItemStylePlain target:self action:@selector(preeNext)];
  
       self.navigationItem.rightBarButtonItem=rightBar;
     */
   
    
  //  [[UIBarButtonItem appearance] setBackButtonTitlePositionAdjustment:UIOffsetMake(0, -60) forBarMetrics:UIBarMetricsDefault];

  //  self.navigationItem.rightBarButtonItem = [[UIBarButtonItem alloc] initWithImage: [[UIImage imageNamed: @"diamond_img_diamond"] imageWithRenderingMode: UIImageRenderingModeAlwaysOriginal] style: UIBarButtonItemStylePlain target: self action: @selector(preeNext)];

    
}
-(void)preeNext
{
    NSLog(@"----");
}
-(void)makeFourImgView;
{
    for (int i=0; i<4; i++) {
        CGFloat tx=i%2*130;
        CGFloat ty=i/2*130;
        AddImgVideoCell* addImgVideoCell=[[AddImgVideoCell alloc]initWithFrame:CGRectMake(tx, ty, 120, 120 )];
        addImgVideoCell.delegate=self;
        addImgVideoCell.hidden=YES;
        [self.picListView addSubview: addImgVideoCell];
        [self.cellItems addObject:addImgVideoCell];
    }
}

-(void)setFristtUrl:(NSString*)url;
{
    self.oneUrl=url;
    self.imgItems=[[NSMutableArray alloc]init];
    [self.imgItems addObject:self.oneUrl];
    
}
-(void)refrishData;
{
    for (int i=0; i<self.cellItems.count; i++) {
        AddImgVideoCell* cell= self.cellItems[i];
        if(i<=self.imgItems.count){
            cell.hidden=NO;
            if(i<self.imgItems.count){
                [cell setImageUrl:self.imgItems[i]];
            }else{
                [cell setImageUrl:@""];
            }
        }else{
            cell.hidden=YES;
        }
    }
}

- (void)viewWillAppear:(BOOL)animated
{
    [super viewWillAppear:animated];
    self.title=@"发布动态";
    [self refrishData];
}
- (void)clikAddNextUrlEvet;
{
    UIImagePickerController *imagePicker = [[UIImagePickerController alloc] init];
    imagePicker.delegate = self;
    imagePicker.sourceType = UIImagePickerControllerSourceTypePhotoLibrary;
    imagePicker.allowsEditing = YES;
    [self presentViewController:imagePicker animated:YES completion:NULL];
}
#pragma mark - UIImagePickerControllerDelegate
- (void)imagePickerController:(UIImagePickerController *)picker didFinishPickingMediaWithInfo:(NSDictionary *)info{
    [picker dismissViewControllerAnimated:YES completion:^{
        NSString *mediaType = [info objectForKey:UIImagePickerControllerMediaType];
        if([mediaType isEqualToString:@"public.movie"]) {
            
        }else{
            [[DynamicModel default] imagePickerController:picker didFinishPickingMediaWithInfo:info bfun:^(NSString* value) {
                NSLog(@"-value-%@",value);
                [self.imgItems addObject:value];
                [self refrishData];
            }];
            [picker dismissViewControllerAnimated:YES completion:NULL];
        }
    }];
}

- (void)viewWillLayoutSubviews
{
    self.inputTextField.frame=CGRectMake(5, 30, self.view.width-10,180);
    self.totalNumLabel.frame=CGRectMake( self.view.width-150, CGRectGetMaxY(self.inputTextField.frame)+10, 100, 30);
    self.picListView.frame=CGRectMake( 30, CGRectGetMaxY(self.inputTextField.frame)+40, 300, 300);
    
}

@end
