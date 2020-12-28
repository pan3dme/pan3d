//
//  Frame3dRes.h
//  iosgl
//
//  Created by pan3dme on 2020/11/16.
//  Copyright © 2020 zhao. All rights reserved.
//

#import "BaseRes.h"

NS_ASSUME_NONNULL_BEGIN

@interface Frame3dRes : BaseRes

@property(nonatomic,assign)int frameSpeedNum;
@property(nonatomic,assign)int maxTime;
@property(nonatomic,assign)bool isReady;
 

@property(nonatomic,strong)NSMutableArray* frameItem;
-(void)load:(NSString*)url  fun:(SuccessBlock)fun;
@end

NS_ASSUME_NONNULL_END
