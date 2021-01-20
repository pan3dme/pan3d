//
//  BuildSceneVo.m
//  iosgl
//
//  Created by zhao on 24/4/2020.
//  Copyright © 2020 zhao. All rights reserved.
//

#import "BuildSceneVo.h"
#import <objc/runtime.h>
@implementation BuildSceneVo
-(void)setValueToSelf:(NSDictionary *)value;
{
    for (NSString *propertyName in [self allProperties]) {
        if([value objectForKey: propertyName]){
           [self setValue:value[propertyName] forKey:propertyName];
        }
    }
 
}
typedef struct objc_property *objc_property_t;
- (NSArray *)allProperties {
    unsigned int count;
    
    objc_property_t *properties = class_copyPropertyList([self class], &count);
    NSMutableArray *propertiesArray = [NSMutableArray arrayWithCapacity:count];
    for (NSUInteger i = 0; i < count; i++) {
        
        const char *propertyName = property_getName(properties[i]);
        NSString *name = [NSString stringWithUTF8String:propertyName];
        [propertiesArray addObject:name];
    }
    
    free(properties);
    return propertiesArray;
}
-(void)preshValue:(NSDictionary*)value;
{
    [self setValueToSelf:value];
}
@end
