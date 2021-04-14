//
//  Md5Analysis.m
//  iosgl
//
//  Created by pan3dme on 2020/11/12.
//  Copyright © 2020 zhao. All rights reserved.
//

#import "Md5Analysis.h"
#import "ObjectTri.h"
#import "ObjectUv.h"
#import "ObjectBone.h"
#import "ObjectWeight.h"

@implementation Md5Analysis

 
-(Md5MeshData*)addMesh:(NSString*)str
{
    
    NSArray* arrBase;
    
    
    if ( [str rangeOfString:@"mesh"].location != NSNotFound) {
        Md5MeshData* meshData  =[[Md5MeshData alloc]init:self.scene3D];
        NSMutableDictionary* meshSmaple=[[NSMutableDictionary alloc]init];
        str= [str stringByReplacingOccurrencesOfString:@"\t"withString:@""];
        arrBase = [str componentsSeparatedByString:@"\n"];
        NSLog(@"abcddd");
        NSLog(str);
        
        
        bool numverts = false;
        
        int numvertsIndex = 0;
        
        int currentnumvertsIndex = 0;
        
        NSMutableArray* numvertsArray  =[[NSMutableArray alloc]init];
        
        bool numtris = false;
        
        int numtrisIndex = 0;
        
        int currentnumtrisIndex = 0;
        
        NSMutableArray* numtrisArray  =[[NSMutableArray alloc]init];
        
        bool numweights  =false;
        
        int numweightsIndex = 0;
        
        int currentnumweightsIndex  = 0;
        
        NSMutableArray* numweightsArray =[[NSMutableArray alloc]init];
        
        bool joints=false;
        
        NSMutableArray* jointAry=[[NSMutableArray alloc]init];
        
        for (int m = 0; m < arrBase.count; m++) {
            
            NSString* lineStr=arrBase[m];
            if (numverts) {
                if (currentnumvertsIndex < numvertsIndex) {
                    [numvertsArray addObject:lineStr];
                    currentnumvertsIndex++;
                    
                } else {
                    
                    [meshSmaple setValue:numvertsArray forKey:@"numverts"];
                    
                    numverts = false;
                }
            }
            
            if (numtris) {
                
                if (currentnumtrisIndex < numtrisIndex) {
                    
                    
                    [numtrisArray addObject:lineStr];
                    currentnumtrisIndex++;
                    
                } else {
                    
                    [meshSmaple setValue:numtrisArray forKey:@"numtris"];
                    numtris = false;
                }
            }
            
            if (numweights) {
                if (currentnumweightsIndex < numweightsIndex) {
                    [numweightsArray addObject:lineStr];
                    currentnumweightsIndex++;
                    
                } else {
                    
                    [meshSmaple setValue:numweightsArray forKey:@"numweights"];
                    numweights = false;
                }
            }
            
            if (joints) {
                
                [jointAry addObject:lineStr];
                
            }
            
            if ( [lineStr rangeOfString:@"numverts"].location != NSNotFound) {
                
                
                numverts = true;
                
                numvertsIndex =[self getNumByString:lineStr];
                
            }
            if ( [lineStr rangeOfString:@"numtris"].location != NSNotFound) {
                
                numtris = true;
                numtrisIndex =[self getNumByString:lineStr];
                
                
                
            }
            if ( [lineStr rangeOfString:@"numweights"].location != NSNotFound) {
                
                numweights = true;
                numweightsIndex =[self getNumByString:lineStr];
                
                
            }
            if ( [lineStr rangeOfString:@"joints"].location != NSNotFound) {
                
                
                joints = true;
                
            }
            if ( [lineStr rangeOfString:@"mesh"].location != NSNotFound) {
                
                joints = false;
                
                [meshSmaple setValue:jointAry forKey:@"joints"];
            }
            if ( [lineStr rangeOfString:@"commandline"].location != NSNotFound) {
                
            }
        }
        
        meshData.mesh = meshSmaple;
        [self joinTri:meshData];
        [self joinPoint:meshData];
        [self joinUV:meshData];
        [self joinJoints:meshData];
 
        return meshData;
    }
    
    
    return nil;
}
-(void)joinJoints:(Md5MeshData*)meshData
{
    
    
    NSArray* jointAry=[meshData.mesh objectForKey:@"joints"];
    meshData.boneItem =[[NSMutableArray alloc]init];
    for (int i = 0; i < jointAry.count; i++) {
        NSString* line = jointAry[i];
        if (line.length < 9) {
            break;
        }
        NSArray* boneArr=  [line componentsSeparatedByString:@"\""];
        NSString* boneName=  boneArr[1];
        line=boneArr[2];
        //去掉收尾空格
        NSString* finnalStr=[line stringByTrimmingCharactersInSet:[NSCharacterSet whitespaceCharacterSet]];
        NSArray* boneNameAry=  [finnalStr componentsSeparatedByString:@" "];
        
        ObjectBone* bone = [[ObjectBone alloc]init];
        bone.name = boneName;
        bone.father =[boneNameAry[0] intValue];
        bone.tx =[boneNameAry[2] floatValue];
        bone.ty =[boneNameAry[3] floatValue];
        bone.tz =[boneNameAry[4] floatValue];
        
        bone.qx =[boneNameAry[7] floatValue];
        bone.qy = [boneNameAry[8] floatValue];
        bone.qz =[boneNameAry[9] floatValue];
        [meshData.boneItem addObject:bone];
    }
}
-(void)joinUV:(Md5MeshData*)meshData
{
 
    NSArray* _meshNumverts=[meshData.mesh objectForKey:@"numverts"];
    meshData.uvItem =[[NSMutableArray alloc]init];
    for (int i = 0; i < _meshNumverts.count; i++) {
        NSString* _str = [self genewStr:_meshNumverts[i]];
        NSArray* _arr=  [_str componentsSeparatedByString:@" "];
        ObjectUv* _temp =[[ObjectUv alloc]init];
        _temp.id = [_arr[1] intValue];
        _temp.x = [_arr[2] floatValue];
        _temp.y = [_arr[3] floatValue];
        _temp.a =[_arr[4] floatValue];
        _temp.b =[_arr[5] floatValue];
        
        [meshData.uvItem addObject:_temp];
    }
}
-(void)joinPoint:(Md5MeshData*)meshData
{
 
    NSArray* _meshNumweights=[meshData.mesh objectForKey:@"numweights"];
    meshData.weightItem =[[NSMutableArray alloc]init];
         
 
           for (int i = 0; i < _meshNumweights.count; i++) {
           
               NSString* _str = [self genewStr:_meshNumweights[i]];
               NSArray* _arr=  [_str componentsSeparatedByString:@" "];
               ObjectWeight* _temp =[[ObjectWeight alloc]init];
               _temp.id = [_arr[1] intValue];
               _temp.boneId = [_arr[2] intValue];
               _temp.w =[_arr[3] floatValue];
               _temp.x =[_arr[4] floatValue];
               _temp.y =[_arr[5] floatValue];
               _temp.z =[_arr[6] floatValue];
               [meshData.weightItem addObject:_temp];
           }
 
}
-(void)joinTri:(Md5MeshData*)meshData
{
    NSArray* _meshNumtris=[meshData.mesh objectForKey:@"numtris"];
    meshData.triItem =[[NSMutableArray alloc]init];
    for (int i = 0; i < _meshNumtris.count; i++) {
        NSString* _str = [self genewStr:_meshNumtris[i]];
        NSArray* _arr=  [_str componentsSeparatedByString:@" "];
        ObjectTri* _temp = [[ObjectTri alloc]init];
        _temp.id = [_arr[1] intValue];
        _temp.t0 = [_arr[2] intValue];
        _temp.t1 = [_arr[3] intValue];
        _temp.t2 = [_arr[4] intValue];
        [meshData.triItem addObject:_temp];
    }
    
}
-(NSString*)genewStr:(NSString*)_str
{
    _str= [_str stringByReplacingOccurrencesOfString:@"("withString:@""];
    _str= [_str stringByReplacingOccurrencesOfString:@")"withString:@""];
    _str= [_str stringByReplacingOccurrencesOfString:@"\""withString:@""];
    //去掉两个空格
    NSCharacterSet *whitespaces = [NSCharacterSet whitespaceCharacterSet];
    NSPredicate *noEmptyStrings = [NSPredicate predicateWithFormat:@"SELF != ''"];
    NSArray *parts = [_str componentsSeparatedByCharactersInSet:whitespaces];
    NSArray *filteredArray = [parts filteredArrayUsingPredicate:noEmptyStrings];
    _str = [filteredArray componentsJoinedByString:@" "];
     return _str;
}
-(int)getNumByString:(NSString* )str{
    NSArray* arr = [str componentsSeparatedByString:@" "];
    for(int i=1;i<arr.count;i++){
        int num = [arr[i] intValue];
        if(num>0){
            return num;
        }
    }
    
    return 0;
}

@end
