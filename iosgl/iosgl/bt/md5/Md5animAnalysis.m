//
//  Md5animAnalysis.m
//  iosgl
//
//  Created by pan3dme on 2020/11/12.
//  Copyright © 2020 zhao. All rights reserved.
//

#import "Md5animAnalysis.h"
#import "ObjectBone.h"
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
     
    // return this.setFrameToMatrix(this.allFrames)
 
    
    return nil;
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
//    var _str: string = "";
//
//               var i: number = 0;
//               for (i = 0; i < this._baseframe.length; i++) {
//
//                   var _arr: Array<string> = TpGame.getArrByStr(this._baseframe[i])
//                   this._hierarchyitem[i].tx = Number(_arr[1]);
//                   this._hierarchyitem[i].ty = Number(_arr[2]);
//                   this._hierarchyitem[i].tz = Number(_arr[3]);
//                   this._hierarchyitem[i].qx = Number(_arr[6]);
//                   this._hierarchyitem[i].qy = Number(_arr[7]);
//                   this._hierarchyitem[i].qz = Number(_arr[8]);
//               }
//               this._pushfamers();
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
    int ddd=3;
    
}
 
@end
