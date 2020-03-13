//
//  TextureManager.h
//  iosgl
//
//  Created by zhao on 14/3/2020.
//  Copyright © 2020 zhao. All rights reserved.
//

#import <Foundation/Foundation.h>
#import "GL_Header.h"
#import "TextureRes.h"
NS_ASSUME_NONNULL_BEGIN

@interface TextureManager : NSObject
+ (instancetype)default;

-(void)getTexture:(NSString*)url fun:(void (^)(TextureRes*))fun;
//   public getTexture($url: string, $fun: Function, $wrapType: number = 0, $info: any = null, $filteType: number = 0, $mipmapType: number = 0): void {
@end

NS_ASSUME_NONNULL_END
