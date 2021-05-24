//
//  Pan3dListVo.h
//  StorageStarted
//
//  Created by pan3dme on 2021/4/14.
//  Copyright © 2021 cuiyiran. All rights reserved.
//

#import <Foundation/Foundation.h>
#import <UIKit/UIKit.h>
#import <AVOSCloud/AVOSCloud.h>
NS_ASSUME_NONNULL_BEGIN

@interface Pan3dListVo : NSObject
+(instancetype)initWithObject:(NSDictionary *)obj;

@property (nonatomic, copy) NSString *text;
@property (nonatomic, copy) NSString *tag;
@property (nonatomic, copy) NSString *picture;
@property (nonatomic, copy) NSString *title;
@property (nonatomic, copy) NSString *createdAt;
@property (nonatomic, copy) NSString *objectId;
@property (nonatomic, copy) NSArray *sceneinfo;
@property (nonatomic, strong) AVFile *avFile0;
@property (nonatomic, strong) AVFile *avFile1;
@property (nonatomic, strong) AVFile *avFile2;
@property (nonatomic, strong) AVFile *avFile3;
@property (nonatomic, strong) AVFile *baner;
//@property (nonatomic, copy) NSString *productImageUrl;

@property (nonatomic, assign) int  type;

/** cell 的高度 */
@property (nonatomic, assign) CGFloat cellHeight;
@end


NS_ASSUME_NONNULL_END
