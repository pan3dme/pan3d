//
//  Display3dMovie.m
//  iosgl
//
//  Created by zhao on 2/4/2020.
//  Copyright © 2020 zhao. All rights reserved.
//

#import "Display3dMovie.h"
#import "SkinMesh.h"
/*


    protected _partDic: Object;

    protected _partUrl: Object;

    private _capsule: CapsuleVo;
    public showCapsule: boolean;
    protected _enablePhysics: boolean;
    protected _shadow: Shadow;

    protected _fileScale: number = 1;
    private _roleRes: RoleRes;
 
    public _isSinging: boolean = false;
 */
@interface Display3dMovie()
@property(nonatomic,strong)NSString*  meshUrl;
@property(nonatomic,strong)SkinMesh*  skinMesh;
@property(nonatomic,strong)NSMutableDictionary*  animDic;
@property(nonatomic,strong)NSMutableDictionary*  _preLoadActionDic;
@property(nonatomic,strong)NSMutableDictionary*  _waitLoadActionDic;
@property(nonatomic,strong)NSString*  defaultAction ;
@property(nonatomic,assign)NSString*  curentAction;
@property(nonatomic,assign)int  completeState ;
@property(nonatomic,assign)int  curentFrame;
@property(nonatomic,assign)float actionTime;
@end
@implementation Display3dMovie

@end
