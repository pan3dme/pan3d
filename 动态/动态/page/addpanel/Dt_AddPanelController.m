//
//  AddPanelController.m
//  动态
//
//  Created by zhao on 19/3/2020.
//  Copyright © 2020 zhao. All rights reserved.
//

#import "Dt_AddPanelController.h"
#import "Header.h"
#import "Dt_DynamicModel.h"
#import "Dt_AddImgVideoCell.h"

@interface Dt_AddPanelController ()
<
Dt_AddImgVideoCellDelegate,
UIImagePickerControllerDelegate,
UINavigationControllerDelegate
>
 
@end
static Dt_AddPanelController *addPanelController = nil;
@implementation Dt_AddPanelController
+ (instancetype)default;
{
    if (addPanelController == nil) {
        addPanelController = [[Dt_AddPanelController alloc] init];
    }
    return addPanelController;
}
- (void)viewDidLoad {
    [super viewDidLoad];
    self.view.backgroundColor=[UIColor whiteColor];
    
    
    
    self.cellItems=[[NSMutableArray alloc]init];
    
    self.inputTextField=[[UITextField alloc]initWithFrame:CGRectMake(0, 0, 100, 50)];
    self.inputTextField.placeholder=@"分享新鲜事~";
    self.inputTextField.textAlignment = NSTextAlignmentLeft;
    self.inputTextField.contentVerticalAlignment = UIControlContentVerticalAlignmentTop;
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
    
    
    
}
-(void)preeNext
{
    if(self.imgItems.count==0){
        NSLog(@"请上传图片或视频");
        return;
    }
    NSMutableDictionary* dic=[[NSMutableDictionary alloc]init];
    [dic setObject:self.inputTextField.text forKey:@"content"];
     BOOL isOnlyMove=self.imgItems.count&& [self.imgItems[0] rangeOfString:@".mov"].location != NSNotFound;
    if(isOnlyMove){//上传的是视频
         [dic setObject:self.imgItems[0]  forKey:@"vidio_url"];
    }else{
        for(int i=0;i<self.imgItems.count;i++){
                [dic setObject:self.imgItems[i]  forKey:[NSString stringWithFormat:@"image%d",i+1]];
            
          //   NSString* tk=[NSString stringWithFormat:@"d%@",self.imgItems[i]];
          //  NSString* tk=[NSString stringWithFormat:@"d%@",self.imgItems[i]];
         
            
           // [dic setObject:tk  forKey:[NSString stringWithFormat:@"image%d",i+1]];
         }
    }
 
 
    Dt_AddPanelController* that=self;
    //GetDynamicByValue
    //basePostToUrl
  
    [[ Dt_DynamicModel default] basePostToUrl:PLATFORM_GAME_BLOG_ADD paramDict:[NSDictionary dictionaryWithDictionary:dic]  PostSuccess:^(NSDictionary *responseJson) {
         
        [that.navigationController popViewControllerAnimated:YES];
                   [[NSNotificationCenter defaultCenter]postNotificationName:@"refrishCurrentList" object:nil];
        
        
    }];
 
    
}
-(void)makeFourImgView;
{
    for (int i=0; i<4; i++) {
        CGFloat tx=i%2*130;
        CGFloat ty=i/2*130;
        Dt_AddImgVideoCell* addImgVideoCell=[[Dt_AddImgVideoCell alloc]initWithFrame:CGRectMake(tx, ty, 120, 120 )];
        addImgVideoCell.delegate=self;
        addImgVideoCell.hidden=YES;
        [self.picListView addSubview: addImgVideoCell];
        [self.cellItems addObject:addImgVideoCell];
    }
}
-(void)setFristtUrl:(NSString*)url;
{
    NSLog(@"%@",url);
   
    self.imgItems=[[NSMutableArray alloc]init];
    
    [self.imgItems addObject:url];
}
-(void)refrishData;
{
     
    for (int i=0; i<self.cellItems.count; i++) {
        Dt_AddImgVideoCell* cell= self.cellItems[i];
     
        if(i<=self.imgItems.count ){
            
               BOOL isOnlyMove=self.imgItems.count&& [self.imgItems[0] rangeOfString:@".mov"].location != NSNotFound;
            
             cell.hidden=isOnlyMove && i>0;
            
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
- (void)clearFileByUrl:(NSString *)url
{
    for(int i=0;i<self.imgItems.count;i++){
        if([self.imgItems[i] isEqualToString:url]){
            [self.imgItems removeObjectAtIndex:i];
            i=(int)self.imgItems.count;
        }
    }
    [self refrishData];
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
    if(self.imgItems.count){
         imagePicker.mediaTypes = [NSArray arrayWithObjects:@"public.image", nil];
    }else{
         imagePicker.mediaTypes = [NSArray arrayWithObjects:@"public.movie", @"public.image", nil];
    }
   
    [self presentViewController:imagePicker animated:YES completion:NULL];
}
#pragma mark - UIImagePickerControllerDelegate
- (void)imagePickerController:(UIImagePickerController *)picker didFinishPickingMediaWithInfo:(NSDictionary *)info{
    [picker dismissViewControllerAnimated:YES completion:^{
        [[Dt_DynamicModel default] imagePickerController:picker didFinishPickingMediaWithInfo:info bfun:^(NSString* value) {
            NSLog(@"-value-%@",value);
            [self.imgItems addObject:value];
            [self refrishData];
        } progressfun:^(float num) {
            NSLog(@"-num-%f",num);
            [self progressToCellLabel:num];
        }];
        [picker dismissViewControllerAnimated:YES completion:NULL];
        
    }];
}

-(void)progressToCellLabel:(float)num;
{
    [self.cellItems[ self.imgItems.count] progressToCellLabel:num];
}

- (void)viewWillLayoutSubviews
{
    self.inputTextField.frame=CGRectMake(10, 65, self.view.width-20,180);
    self.totalNumLabel.frame=CGRectMake( self.view.width-150, CGRectGetMaxY(self.inputTextField.frame)+10, 100, 30);
    self.picListView.frame=CGRectMake( 30, CGRectGetMaxY(self.inputTextField.frame)+40, 300, 300);
    
}

@end
