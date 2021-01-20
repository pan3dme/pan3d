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
#import "GL_Header.h"
#import "ByteArray.h"
#import "TextureRes.h"
#import "MaterialLoad.h"
#import "MaterialParam.h"
NS_ASSUME_NONNULL_BEGIN

@interface MaterialManager : ResGC
@property (nonatomic, strong)  NSMutableDictionary* dic;
+ (instancetype)default;
-(TextureRes *) getMaterialByUrl:(NSString*)urlStr;
-(void)addResByte:(NSString*)url dataByte:(ByteArray*)dataByte;
 
-(void)getMaterialByte:(NSString*)url fun:(SuccessMaterial)fun info:(NSDictionary*)info autoReg:(BOOL)autoReg regName:(NSString*)regName shader3DCls:(NSObject*)shader3DCls;
-(void)loadDynamicTexUtil:(MaterialParam*)material;
 
@end

NS_ASSUME_NONNULL_END
