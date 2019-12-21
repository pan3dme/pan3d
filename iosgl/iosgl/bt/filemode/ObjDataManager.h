//
//  ObjDataManager.h
//  iosgl
//
//  Created by zhao on 9/12/2019.
//  Copyright © 2019 zhao. All rights reserved.
//

#import "ResGC.h"
#import "ObjData.h"
#import "ByteArray.h"
NS_ASSUME_NONNULL_BEGIN

@interface ObjDataManager : ResGC
@property (nonatomic, strong)  NSMutableDictionary *dic;
+ (instancetype)default;
 
-(void)getObjDataByUrl:(NSString*)url Block:(void (^)(ObjData * ))block;
-(void)loadObjCom:(ByteArray *)value;
@end

NS_ASSUME_NONNULL_END
