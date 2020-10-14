//
//  SkillKeyVo.h
//  iosgl
//
//  Created by zhao on 17/4/2020.
//  Copyright © 2020 zhao. All rights reserved.
//

#import <Foundation/Foundation.h>

NS_ASSUME_NONNULL_BEGIN

@interface SkillKeyVo : NSObject

 
@property(nonatomic,assign)int frame ;
@property(nonatomic,strong)NSString* url;
-(void)setData:(NSDictionary*)data;
 
@end

NS_ASSUME_NONNULL_END
