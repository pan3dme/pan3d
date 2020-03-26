//
//  CommentsTabelVo.h
//  动态
//
//  Created by zhao on 26/3/2020.
//  Copyright © 2020 zhao. All rights reserved.
//

#import "TabelBaseNSObject.h"
#import "Header.h"
#import <Foundation/Foundation.h>

NS_ASSUME_NONNULL_BEGIN

@interface CommentsTabelVo : TabelBaseNSObject

@property(nonatomic,strong)NSString* nick_name;
@property(nonatomic,strong)NSString* content;
@property(nonatomic,strong)NSNumber* blog_id;
@property(nonatomic,strong)NSNumber* id;
@property(nonatomic,strong)NSNumber* add_time;
@property(nonatomic,strong)NSNumber* read_time;
@property(nonatomic,strong)NSNumber* username;
@property(nonatomic,strong)NSNumber* delete_time;
@property(nonatomic,strong)NSString* head;
@property(nonatomic,strong)NSNumber* likes;
@property(nonatomic,strong)NSNumber* quote;


@property (nonatomic, strong) NSString* replyContent;
@property (nonatomic, assign) CGFloat cellHeight;
@property(nonatomic,strong)NSMutableArray<CommentsTabelVo*>* sonitem;

-(void)resetreplyContent;

+(NSMutableArray<CommentsTabelVo*>*)makeListArr:(NSMutableArray*)arr;
@end

NS_ASSUME_NONNULL_END
