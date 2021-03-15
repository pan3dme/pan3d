#import <Foundation/Foundation.h>
 
@interface Book : NSObject
 
@property (nonatomic, readwrite) NSInteger bookID;
@property (nonatomic, retain) NSString  *title;
@property (nonatomic, retain) NSString  *author;
@property (nonatomic, retain) NSString  *summary;
 
@end
 
