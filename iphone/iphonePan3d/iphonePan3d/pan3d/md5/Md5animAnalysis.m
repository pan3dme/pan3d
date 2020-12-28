//
//  Md5animAnalysis.m
//  iosgl
//
//  Created by pan3dme on 2020/11/12.
//  Copyright © 2020 zhao. All rights reserved.
//

#import "Md5animAnalysis.h"
#import "ObjectBone.h"
#import "Matrix3D.h"
#import "Quaternion.h"
@interface Md5animAnalysis ()
@property(nonatomic,strong)NSMutableArray* allFrames;
@property(nonatomic,assign)bool  framesok;
@property(nonatomic,strong)NSMutableDictionary*  _dir;
@property(nonatomic,strong)NSMutableArray*  _hierarchyitem;//: Array<ObjectBone>;
@property(nonatomic,strong)NSMutableArray*  _hierarchy;//: Array<string>;
@property(nonatomic,strong)NSMutableArray*  _baseframe;//: Array<string>;
@property(nonatomic,strong)NSMutableArray*  _bounds;//;: Array<any>;
@property(nonatomic,strong)NSMutableArray*  _frame;//: Array<Array<string>>;
@property(nonatomic,strong)NSMutableArray*  bigArr;//: Array<string>;
@property(nonatomic,strong)NSObject*  resultInfo;//: any;

@property(nonatomic,strong)NSMutableArray*  _boundFrameAry;//: Array<Vector3D>;
@property(nonatomic,strong)NSMutableArray*  _posFrameAry;//: Array<Vector3D>;
@property(nonatomic,strong)NSMutableArray*  _interAry;//: Array<any>;

@end

@implementation Md5animAnalysis


-(NSArray*)addAnim:(NSString*)ini
{
    Md5animAnalysis* this =self;
    
    this._dir = [[NSMutableDictionary alloc ]init];
    this.allFrames = [[NSMutableArray alloc]init];
    this.framesok = false;
    this._hierarchyitem =  [[NSMutableArray alloc]init];
    this._hierarchy =  [[NSMutableArray alloc]init];
    this._baseframe =  [[NSMutableArray alloc]init];
    this._bounds = [[NSMutableArray alloc]init];
    this._frame = [[NSMutableArray alloc]init];
    this.bigArr =  [[NSMutableArray alloc]init];
    ini= [ini stringByReplacingOccurrencesOfString:@"\t"withString:@""];
    NSArray* arr = [ini componentsSeparatedByString:@"\n"];
    NSUInteger len = arr.count;
    NSString* tempStr = @"";
    bool isbig = false;
    for (int i = 0; i < len; i++) {
        NSString* arrIndStr=arr[i];
        int dindex =  (int) ([arrIndStr rangeOfString:@"//"].location);
        if (dindex == 0) {
            continue;
        }
        if (dindex != -1) {
            arrIndStr =     [arrIndStr substringToIndex:dindex];
        }
        if ([arrIndStr rangeOfString:@"{"].location != NSNotFound){
            isbig = true;
        }
        
        if (isbig) {
            tempStr= [tempStr stringByAppendingString:arrIndStr];
            tempStr= [tempStr stringByAppendingString:@"\n\r"];
            if ([arrIndStr rangeOfString:@"}"].location != NSNotFound){
                isbig = false;
                [this.bigArr addObject:tempStr];
                tempStr = @"";
            }
            
        } else {
            if (arrIndStr.length>0) {
                NSArray* arr2 = [arrIndStr componentsSeparatedByString:@" "];
                [this._dir setValue:arr2[1] forKey:arr2[0]];
            }
        }
    }
    for (int p = 0; p < this.bigArr.count; p++) {
        [this handleBigWord:this.bigArr[p]];
    }
    [this _pushhierarchyitem];
    
    return   [this setFrameToMatrix:this.allFrames];
    
    
}
-(float) getW:(float)x y:(float)y z:(float)z;
{
    float t = 1 - (x * x + y * y + z * z);
    if(t<0) {
        t = 0;
    }else{
        t = -sqrt(t);
    }
    return t;
}
-(NSArray*)setFrameToMatrix:(NSArray*)frameAry
{
    
    NSMutableArray* matrixAry  =[[NSMutableArray alloc] init];
    
    for (int j = 0; j < frameAry.count; j++) {
        NSArray* boneAry  = frameAry[j];
        
        Quaternion* Q0 =[[Quaternion alloc]init];
        Matrix3D* newM = [[Matrix3D alloc] init];
        
        NSMutableArray* frameMatrixAry=[[NSMutableArray alloc] init];
        [matrixAry addObject:frameMatrixAry];
        for (int i = 0; i < boneAry.count; i++) {
            ObjectBaseBone* xyzfarme0 = boneAry[i];
            Q0=  [[Quaternion alloc]x:xyzfarme0.qx y:xyzfarme0.qy z:xyzfarme0.qz];
            Q0.w =   [self getW:Q0.x y:Q0.y z:Q0.z];
            if (xyzfarme0.father == -1) {
                newM = [Q0 toMatrix3D];
                [newM appendTranslation:xyzfarme0.tx y:xyzfarme0.ty z:xyzfarme0.tz];
                [newM appendRotation:-90 axis:Vector3D.X_AXIS];
                [frameMatrixAry addObject:newM];
            } else {
                //                           ObjectBaseBone* fatherBone = boneAry[xyzfarme0.father];
                newM = [Q0 toMatrix3D];
                [newM appendTranslation:xyzfarme0.tx y:xyzfarme0.ty z:xyzfarme0.tz];
                [newM append:frameMatrixAry[xyzfarme0.father]];//注意这里叠加
                [frameMatrixAry addObject:newM];
                
            }
        }
        for (int i = 0; i < frameMatrixAry.count; i++) {
            [( (Matrix3D*)(frameMatrixAry[i])) appendScale:-1 y:1 z:1];
            
        }
        
    }
    
    return matrixAry;
    
    
}
-(void)_pushhierarchyitem
{
    Md5animAnalysis* this=self;
    for (int i = 0; i < this._hierarchy.count; i++) {
        NSString* baseStr=this._hierarchy[i];
        NSArray* arrA = [baseStr componentsSeparatedByString:@"\""];
        NSArray* arrB = [  [self getRightBastStr:arrA[2]] componentsSeparatedByString:@" "];
        ObjectBone* _temp=[[ObjectBone alloc] init];
        _temp.name=arrA[1];
        _temp.father=[arrB[0]intValue];
        _temp.changtype=[arrB[1]intValue];
        _temp.startIndex=[arrB[2]intValue];
        [this._hierarchyitem addObject:_temp];
        
    }
    
    [self _pushbasefamer];
    
}
-(void)_pushbasefamer{
    Md5animAnalysis* this=self;
    for (int i = 0; i < this._baseframe.count; i++) {
        ObjectBone* objectBone=   this._hierarchyitem[i];
        NSArray* _arr= [this._baseframe[i] componentsSeparatedByString:@" "];
        objectBone.tx = [_arr[1]floatValue];
        objectBone.ty =  [_arr[2]floatValue];
        objectBone.tz =  [_arr[3]floatValue];
        objectBone.qx = [_arr[6]floatValue];
        objectBone.qy =  [_arr[7]floatValue];
        objectBone.qz =  [_arr[8]floatValue];
    }
    [this _pushfamers];
}
-(void)_pushfamers
{
    Md5animAnalysis* this=self;
    for (int i = 0; i < this._frame.count; i++) {
        if (this._frame[i]) {
            [this.allFrames addObject:[self _getsamplefamer:this._frame[i]]];
        }
    }
    this.framesok = true;
}
-(NSArray*) _getsamplefamer:(NSArray*)_framesample
{
    
    Md5animAnalysis* this=self;
    NSMutableArray* _arr  =[[NSMutableArray alloc] init]; //ObjectBone
    NSMutableArray* _arrframesample =[[NSMutableArray alloc] init];
    for (int js = 0; js < _framesample.count; js++) {
        NSArray* addArr = [[self getRightBastStr:_framesample[js]] componentsSeparatedByString:@" "];
        for(int v=0;v<addArr.count;v++){
            [_arrframesample addObject:addArr[v]];
        }
    }
    for (int i = 0; i < this._hierarchyitem.count; i++) {
        ObjectBone* _base= this._hierarchyitem[i];
        ObjectBone* _temp = [[ObjectBone alloc]init ];
        _temp.father = _base.father;
        _temp.name =_base.name;
        _temp.tx =_base.tx;
        _temp.ty =_base.ty;
        _temp.tz = _base.tz;
        _temp.qx = _base.qx;
        _temp.qy = _base.qy;
        _temp.qz =_base.qz;
        int k = 0;
        if (_base.changtype & 1) {
            _temp.tx = [_arrframesample[_base.startIndex + k] floatValue];
            k++;
        }
        if (_base.changtype &2) {
            _temp.ty =  [_arrframesample[_base.startIndex + k] floatValue];
            k++;
        }
        if (_base.changtype & 4) {
            _temp.tz = [_arrframesample[_base.startIndex + k] floatValue];
            k++;
        }
        if (_base.changtype & 8) {
            _temp.qx =  [_arrframesample[_base.startIndex + k] floatValue];
            k++;
        }
        if (_base.changtype &16) {
            _temp.qy = [_arrframesample[_base.startIndex + k] floatValue];
            k++;
        }
        if (_base.changtype &32) {
            _temp.qz = [_arrframesample[_base.startIndex + k] floatValue];
            k++;
        }
        [_arr addObject:_temp];
    }
    return _arr;
    
}
-(NSArray<NSNumber*>*)getArrByStr:(NSString*)str;
{
    NSArray<NSString*>* item = [str componentsSeparatedByString:@","]; //分段
    NSMutableArray<NSNumber*>* arr=[[NSMutableArray alloc]init];
    for(int i=0;i<item.count;i++){
        [arr addObject:   [NSNumber numberWithFloat: [item[i]floatValue]]  ];
    }
    return arr;
}
//去掉两个空格的，去掉收尾空格
-(NSString*)getRightBastStr:(NSString*)baseStr
{
    NSString* str=[baseStr stringByTrimmingCharactersInSet:[NSCharacterSet whitespaceCharacterSet]];
    NSCharacterSet *whitespaces = [NSCharacterSet whitespaceCharacterSet];
    NSPredicate *noEmptyStrings = [NSPredicate predicateWithFormat:@"SELF != ''"];
    NSArray *parts = [str componentsSeparatedByCharactersInSet:whitespaces];
    NSArray *filteredArray = [parts filteredArrayUsingPredicate:noEmptyStrings];
    str = [filteredArray componentsJoinedByString:@" "];
    return str;
}

-(void)handleBigWord:(NSString*) str
{
    Md5animAnalysis* this =self;
    bool usehierarchy=[str rangeOfString:@"hierarchy"].location != NSNotFound;
    bool usebounds=[str rangeOfString:@"bounds"].location != NSNotFound;
    bool usebaseframe=[str rangeOfString:@"baseframe"].location != NSNotFound;
    
    NSArray* arr = [str componentsSeparatedByString:@"\n\r"];
    for (int i = 0; i < arr.count; i++) {
        NSString* baseStr=arr[i];
        baseStr= [self getRightBastStr:baseStr];
        if ([baseStr rangeOfString:@"{"].location == NSNotFound&&[baseStr rangeOfString:@"}"].location == NSNotFound&&baseStr.length>0){
            if (usehierarchy){
                [this._hierarchy addObject:baseStr];
            }else if (usebounds){
                [this._bounds addObject:baseStr];
            }else if (usebaseframe){
                [this._baseframe addObject:baseStr];
            }else{
                
            }
        }
    }
    
    bool haveframe=[str rangeOfString:@"frame"].location != NSNotFound;
    bool havebaseframe=[str rangeOfString:@"baseframe"].location != NSNotFound;
    bool haveBoneScale=[str rangeOfString:@"BoneScale"].location != NSNotFound;
    if (haveframe&&!havebaseframe&&!haveBoneScale) {
        
        int arrsign=0;
        NSMutableArray* tempArray  =[[NSMutableArray alloc]init];
        for (int i = 0; i < arr.count; i++) {
            NSString* baseStr=arr[i];
            if ([baseStr rangeOfString:@"frame"].location != NSNotFound) {
                NSArray* arrNum = [str componentsSeparatedByString:@" "];
                arrsign=[arrNum[1] intValue];
            }
            if ([baseStr rangeOfString:@"{"].location == NSNotFound&&[baseStr rangeOfString:@"}"].location == NSNotFound&&baseStr.length>0){
                [tempArray addObject:baseStr];
            }
            this._frame[arrsign]=tempArray;
        }
        
    }
 
    
}

@end
