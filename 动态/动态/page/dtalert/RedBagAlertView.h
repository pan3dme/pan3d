//
//  RedBagAlertView.h
//  RedbagApp
//
//  Created by zhao on 26/12/2019.
//  Copyright © 2019 xfg. All rights reserved.
//

#import <UIKit/UIKit.h>

typedef void (^TunnelSuccessBlock)(NSDictionary *responseJson);
 

NS_ASSUME_NONNULL_BEGIN
@interface RedBagAlertVo : NSObject
@property (nonatomic, strong) NSString *tittleStr;
@property (nonatomic, strong) NSString *infoStr;
@property (nonatomic, strong) NSString *submitStr;
@property (nonatomic, strong) NSString *cacelStr;
@property (nonatomic, assign) BOOL  bgClikExit;
@end

@interface RedBagAlertView : UIView

@property (weak, nonatomic) IBOutlet UIView *winTittleBg;
@property (weak, nonatomic) IBOutlet UIButton *submitBut;
@property (weak, nonatomic) IBOutlet UILabel *winTittle;
@property (weak, nonatomic) IBOutlet UIButton *canelBut;
@property (weak, nonatomic) IBOutlet UILabel *infoTxt;
@property (weak, nonatomic) IBOutlet UIView *alertBgView;

@property (nonatomic,strong) TunnelSuccessBlock submitBlock;
@property (nonatomic,strong) TunnelSuccessBlock canelBlock;
- (IBAction)canelButClik:(id)sender;
- (IBAction)submitButClik:(id)sender;
- (void)show;
 
@end

NS_ASSUME_NONNULL_END
