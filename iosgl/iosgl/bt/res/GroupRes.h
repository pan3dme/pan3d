//
//  GroupRes.h
//  iosgl
//
//  Created by zhao on 22/2/2020.
//  Copyright © 2020 zhao. All rights reserved.
//

#import "BaseRes.h"
#import "GL_Header.h"

NS_ASSUME_NONNULL_BEGIN

@interface GroupRes : BaseRes;
@property (nonatomic, strong)  NSMutableArray *dataAry;
-(void)load:(NSString*)url Block:(SuccessBlock)block;
@end

NS_ASSUME_NONNULL_END
