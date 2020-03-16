//
//  TabelBaseNSObject.m
//  动态
//
//  Created by zhao on 17/3/2020.
//  Copyright © 2020 zhao. All rights reserved.
//

#import "TabelBaseNSObject.h"
#import <objc/runtime.h>

@implementation TabelBaseNSObject
-(void)setValueToSelf:(NSDictionary *)value;
{
    //强制字段判定
    /*
    for (NSString * key in value) {
        [self setValue:value[key] forKey:key];
    }
    */
    
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

@end
