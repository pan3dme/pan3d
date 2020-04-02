//
//  Display3dMovie.m
//  iosgl
//
//  Created by zhao on 2/4/2020.
//  Copyright © 2020 zhao. All rights reserved.
//

#import "Display3dMovie.h"
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
//      @property(nonatomic,assign)float  _skinMesh: SkinMesh;
//      @property(nonatomic,assign)float  _animDic: Object;
//      @property(nonatomic,assign)float  _preLoadActionDic: Object;
//      @property(nonatomic,assign)float  _waitLoadActionDic: Object;
//      @property(nonatomic,assign)float  _completeState: number = 0;
//      @property(nonatomic,assign)float  _defaultAction: string = "stand";
//      @property(nonatomic,assign)float  _curentAction: string;
//      @property(nonatomic,assign)float  _curentFrame: number = 0;
@property(nonatomic,assign)float _actionTime;

@end
@implementation Display3dMovie

@end
