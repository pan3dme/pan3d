//
//  MaterialManager.h
//  iosgl
//
//  Created by zhao on 8/12/2019.
//  Copyright © 2019 zhao. All rights reserved.
//

#import "ResGC.h"
#import <GLKit/GLKit.h>
#import "Material.h"
#import "TextureRes.h"
NS_ASSUME_NONNULL_BEGIN

@interface MaterialManager : ResGC
@property (nonatomic, strong)  NSMutableDictionary* dic;
+ (instancetype)default;
-(TextureRes *) getMaterialByUrl:(NSString*)urlStr;
-(void)getMaterialByte:(NSString*)url fun:(void (^)(Material* ))fun info:(NSDictionary*)info;
@end

NS_ASSUME_NONNULL_END
