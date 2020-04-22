//
//  Scene_data.h
//  iosgl
//
//  Created by zhao on 1/3/2020.
//  Copyright © 2020 zhao. All rights reserved.
//

#import <Foundation/Foundation.h>

NS_ASSUME_NONNULL_BEGIN


 
@interface Scene_data : NSObject
+ (instancetype)default;
@property (nonatomic, assign) float frameTime;
@property (nonatomic, assign) float MAX_NUMBER;
@property (nonatomic, assign) BOOL supportBlob;
@property (nonatomic, assign) BOOL pubLut;
-(NSString*)getWorkUrlByFilePath:(NSString*)value; 
@end

NS_ASSUME_NONNULL_END
