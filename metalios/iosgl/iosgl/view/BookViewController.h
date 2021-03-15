//
//  BookViewController.h
//  iosgl
//
//  Created by pan3dme on 2021/3/15.
//  Copyright © 2021 zhao. All rights reserved.
//

#import "ViewController.h"
#import "Book.h"

NS_ASSUME_NONNULL_BEGIN

@interface BookViewController : ViewController


@property (nonatomic ,strong)   NSMutableString *currentElementValue;  //用于存储元素标签的值
   
@property (nonatomic ,strong)   NSMutableArray *books;  //用于存储一组书籍
   
@property (nonatomic ,strong)  Book *aBook;  //书籍实例，代表一本书
   
@property (nonatomic ,assign)   BOOL storingFlag; //查询标签所对应的元素是否存在
   
@property (nonatomic ,strong)  NSArray *elementToParse;  //要存储的元素
 
@end

NS_ASSUME_NONNULL_END
