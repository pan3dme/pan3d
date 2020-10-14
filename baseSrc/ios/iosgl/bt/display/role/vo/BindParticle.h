//
//  BindParticle.h
//  iosgl
//
//  Created by zhao on 3/4/2020.
//  Copyright © 2020 zhao. All rights reserved.
//

#import <Foundation/Foundation.h>

NS_ASSUME_NONNULL_BEGIN

@interface BindParticle : NSObject
@property(nonatomic,strong)NSString* url;
@property(nonatomic,strong)NSString* socketName;

- (instancetype)init:(NSString*)url socketName:(NSString*)socketName;
@end

NS_ASSUME_NONNULL_END
