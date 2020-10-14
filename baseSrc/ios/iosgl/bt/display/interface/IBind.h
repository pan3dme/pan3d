//
//  IBind.h
//  iosgl
//
//  Created by zhao on 21/4/2020.
//  Copyright © 2020 zhao. All rights reserved.
//

#ifndef IBind_h
#define IBind_h


#endif /* IBind_h */


@protocol IBind <NSObject>
- (void)getSocket:(NSString*)socketName resultMatrix:(Matrix3D*)resultMatrix ;
- (int)getSunType;
@end


 
