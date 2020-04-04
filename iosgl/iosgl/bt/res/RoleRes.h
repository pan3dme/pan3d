//
//  RoleRes.h
//  iosgl
//
//  Created by zhao on 2/4/2020.
//  Copyright © 2020 zhao. All rights reserved.
//

#import "BaseRes.h"
#import "GL_Header.h"

NS_ASSUME_NONNULL_BEGIN

@interface RoleRes : BaseRes
@property(nonatomic,assign)int meshBatchNum;
-(void)load:(NSString*)url  fun:(SuccessBlock)fun;
@property(nonatomic,strong)NSString* roleUrl;
@property(nonatomic,strong)NSMutableArray<NSString*>* actionAry;
@end
typedef void (^RoleResBfun)(RoleRes* roleRes);

NS_ASSUME_NONNULL_END
