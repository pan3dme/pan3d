//
//  RedBagAlertView.h
//  RedbagApp
//
//  Created by zhao on 26/12/2019.
//  Copyright © 2019 xfg. All rights reserved.
//

#import <UIKit/UIKit.h>

typedef void (^AlertuccessBlock)(int code);
 

NS_ASSUME_NONNULL_BEGIN
@interface Dt_AlertVo : NSObject
@property (nonatomic, strong) NSString *tittleStr;
@property (nonatomic, strong) NSMutableAttributedString *butedStr;
@property (nonatomic, strong) NSString *submitStr;
@property (nonatomic, strong) NSString *cacelStr;
@property (nonatomic, assign) BOOL  bgClikExit;
@end

@interface Dt_AlertView : UIView

@property (weak, nonatomic) IBOutlet UIView *winTittleBg;
@property (weak, nonatomic) IBOutlet UIButton *submitBut;
@property (weak, nonatomic) IBOutlet UILabel *winTittle;
@property (weak, nonatomic) IBOutlet UIButton *canelBut;
@property (weak, nonatomic) IBOutlet UILabel *infoTxt;
@property (weak, nonatomic) IBOutlet UIView *alertBgView;

@property (nonatomic,strong) AlertuccessBlock submitBlock;
@property (nonatomic,strong) AlertuccessBlock canelBlock;
- (IBAction)canelButClik:(id)sender;
- (IBAction)submitButClik:(id)sender;
-(void)showAlert:(Dt_AlertVo *)vo submitFun:(void (^)(int ))submitFun canalFun:(void (^)(int ))canalFun;
@end

NS_ASSUME_NONNULL_END
