//
//  Md5MoveSprite.h
//  iosgl
//
//  Created by pan3dme on 2020/11/12.
//  Copyright © 2020 zhao. All rights reserved.
//

#import <Foundation/Foundation.h>
#import "Display3DSprite.h"
NS_ASSUME_NONNULL_BEGIN

@interface Md5MoveSprite : Display3DSprite
@property(nonatomic,strong)NSString* bodyurl;
@property(nonatomic,strong)NSString* animurl;
@property(nonatomic,strong)NSString* picurl;
-(void)setMd5url:(NSString*)body_url animurl:(NSString*)anim_url picurl:(NSString*)pic_url ;
@end

NS_ASSUME_NONNULL_END
