//
//  LoaderThread.h
//  iosgl
//
//  Created by zhao on 11/3/2020.
//  Copyright © 2020 zhao. All rights reserved.
//

#import <Foundation/Foundation.h>
#import "LoadInfo.h"
NS_ASSUME_NONNULL_BEGIN

@interface LoaderThread : NSObject
@property (nonatomic, assign) BOOL  idle;
@property (nonatomic, strong) NSString* url;
@property (nonatomic, strong) LoadInfo* loadInfo;
-(void)load:(LoadInfo*)loadInfo;
 
@end

NS_ASSUME_NONNULL_END
