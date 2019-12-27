//
//  SceneRes.h
//  iosgl
//
//  Created by zhao on 12/12/2019.
//  Copyright © 2019 zhao. All rights reserved.
//

#import "BaseRes.h"

NS_ASSUME_NONNULL_BEGIN

@interface SceneRes : BaseRes
@property (nonatomic, strong)  NSDictionary *sceneData;
-(void)load:(NSString *)url Block:(void (^)(NSDictionary* ))block;

@end

NS_ASSUME_NONNULL_END
