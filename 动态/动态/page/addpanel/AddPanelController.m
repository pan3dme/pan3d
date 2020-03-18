//
//  AddPanelController.m
//  动态
//
//  Created by zhao on 19/3/2020.
//  Copyright © 2020 zhao. All rights reserved.
//

#import "AddPanelController.h"
#import "Header.h"
#import "AddImgVideoCell.h"

@interface AddPanelController ()

@property(nonatomic,strong)UITextField*  inputTextField;
@property(nonatomic,strong)UILabel*  totalNumLabel;
@property(nonatomic,strong)UIView*  picListView;
@property(nonatomic,strong)NSMutableArray<AddImgVideoCell*>*  cellItems;
@property(nonatomic,strong)NSMutableArray<NSString*>*  imgItems;
@end

@implementation AddPanelController

- (void)viewDidLoad {
    [super viewDidLoad];
     self.view.backgroundColor=[UIColor whiteColor];
    
    self.imgItems=[[NSMutableArray alloc]init];
    [self.imgItems addObject:@"http://34.87.12.20:20080//static/upload/107762834426d05fae60b594cc2a071e.jpeg"];
    
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
}
-(void)makeFourImgView;
{
    for (int i=0; i<4; i++) {
        CGFloat tx=i%2*150;
        CGFloat ty=i/2*150;
        AddImgVideoCell* cell=[[AddImgVideoCell alloc]initWithFrame:CGRectMake(tx, ty, 140, 140 )];
        cell.hidden=YES;
        [self.picListView addSubview: cell];
        [self.cellItems addObject:cell];
    }
}

- (void)viewDidAppear:(BOOL)animated
{
    [self refrishData];
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
    
    
}
 
- (void)viewWillLayoutSubviews
{
    self.inputTextField.frame=CGRectMake(5, 30, self.view.width-10,220);
    self.totalNumLabel.frame=CGRectMake( self.view.width-150, CGRectGetMaxY(self.inputTextField.frame)+10, 100, 30);
    self.picListView.frame=CGRectMake( 30, CGRectGetMaxY(self.inputTextField.frame)+40, 300, 300);
    
}

@end
