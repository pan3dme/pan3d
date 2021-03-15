#import "Weibo.h"

@implementation Weibo

//为属性设置值
-(id)initWithDict:(NSDictionary *)dict{
    if (self=[super init]) {
        [self setValuesForKeysWithDictionary:dict];
    }
    return self;
}
- (instancetype)init
{
    self = [super init];
    if (self) {
//        @property (nonatomic, copy) NSString *text;         // 内容
//        @property (nonatomic, copy) NSString *icon;         // 头像图片名称
//        @property (nonatomic, copy) NSString *name;         // 昵称图片名称
//        @property (nonatomic, copy) NSString *picture;      // 配图图片名称
        
        self.name=@"herr";
        self.text=@"herr";
    }
    return self;
}
/*  对上面的讲解：
 *  setValuesForKeysWithDictionary:方法,
 *  会为我们把和dict中的key名字相同的class proerty设置上dict中与key对应的value
 *  链接处有对该方面的相关讲解http://www.cocoachina.com/industry/20140224/7866.html
 */

+(id)weiboWithDict:(NSDictionary *)dict{
    return [[self alloc]initWithDict:dict];
}

@end
