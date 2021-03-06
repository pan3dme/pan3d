//
//  EventBindVo.h
//  iosgl
//
//  Created by zhao on 27/10/2020.
//  Copyright © 2020 zhao. All rights reserved.
//

#import <Foundation/Foundation.h>
#import "BaseEvent.h"

NS_ASSUME_NONNULL_BEGIN

@interface EventBindVo : NSObject
@property (nonatomic, strong) EventCallBack  bfun;
@property(nonatomic,strong)NSObject* thisObject;
- (instancetype)init:(EventCallBack)a b:(NSObject*)b ;
@end

NS_ASSUME_NONNULL_END
