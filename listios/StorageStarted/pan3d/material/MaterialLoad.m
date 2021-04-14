//
//  MaterialLoad.m
//  iosgl
//
//  Created by zhao on 9/3/2020.
//  Copyright © 2020 zhao. All rights reserved.
//

#import "MaterialLoad.h"
#import "Shader3D.h"
#import "Material.h"

@implementation MaterialLoad

- (instancetype)init:(SuccessMaterial)fun info:(NSDictionary*)info url:(NSString*)url autoReg:(BOOL)autoReg regName:(NSString*)regName shader:(Shader3D*)shader;
{
    self = [super init];
    if (self) {
        self.fun=fun;
        self.info=info;
        self.url=url;
        self.autoReg=autoReg;
        self.regName=regName;
        self.shader3D=shader;
    }
    return self;
}
//
//constructor($fun: Function, $info: any, $url: string, $autoReg: boolean, $regName: string, $shader3D: any) {
//       this.fun = $fun;
//       this.info = $info;
//       this.url = $url;
//
//       this.autoReg = $autoReg;
//       this.regName = $regName;
//       this.shader3D = $shader3D;
//   }
@end
