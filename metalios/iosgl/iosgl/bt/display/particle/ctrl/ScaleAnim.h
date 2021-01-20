//
//  ScaleAnim.h
//  
//
//  Created by zhao on 31/3/2020.
//

#import "BaseAnim.h"

NS_ASSUME_NONNULL_BEGIN

@interface ScaleAnim : BaseAnim
@property(nonatomic,assign)float beginScale;
@property(nonatomic,assign)float scaleNum;
@property(nonatomic,assign)float flag;
@property(nonatomic,strong)NSMutableDictionary* currentTarget;
@property(nonatomic,strong)NSMutableArray<NSMutableDictionary*>* scaleAry;
@property(nonatomic,strong)NSMutableArray<NSNumber*>* numAry;
@end

NS_ASSUME_NONNULL_END
