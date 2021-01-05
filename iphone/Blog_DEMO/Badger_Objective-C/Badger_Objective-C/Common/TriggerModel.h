//
//  TriggerModel.h
//  Badger_Objective-C
//
//  Created by roctian on 2016/10/28.
//  Copyright © 2016年 roctian. All rights reserved.
//

#import <Foundation/Foundation.h>

@interface TriggerModel : NSObject

//struct Trigger {
//    let position: float3
//    let action: (ViewController) -> ()
//}
@property(nonatomic) SCNVector3 position;
@property(nonatomic) id action;

@end
