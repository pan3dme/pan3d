"use strict";
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////以下代码为自动生成，请勿手工改动//////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
var SharedDef = /** @class */ (function () {
    function SharedDef() {
    }
    SharedDef.MAX_MONEY = 2e+015; // 最大金额数，超过下线再上就白瞎
    SharedDef.MAX_MONEY_TRUE = 4e+015; // 最大金额数.真。超过就不再往上加
    SharedDef.MAX_BUFF_DURATION = 65535; // 无限BUFF时间
    SharedDef.INIT_QUEST_ID = 1;
    SharedDef.ZHUCHENG_DITU_ID = 1; // 主城地图ID
    SharedDef.ZHUCHENG_FUHUO_X = 141; // 主城复活点
    SharedDef.ZHUCHENG_FUHUO_Y = 163; // 主城复活点
    SharedDef.BORN_MAP = 1001; // 出生地图
    SharedDef.BORN_X = 143; // 出生坐标x 
    SharedDef.BORN_Y = 113; // 出生坐标y
    SharedDef.BORN_OR = 2; // 出生朝向
    SharedDef.BORN_LV = 1; // 出生等级
    SharedDef.VIP_MAX_LEVEL = 10; // vip最大等级
    SharedDef.MAX_RMB_PLAYER_LEVEL = 6; // 最大的RMB等级
    // 服务器类型枚举
    SharedDef.WORLD_SERVER_TYPE_GAME = 0; // 游戏服
    SharedDef.WORLD_SERVER_TYPE_PK = 1; // pk服
    // 跨服类型枚举
    SharedDef.KUAFU_TYPE_NONE = 0;
    SharedDef.KUAFU_TYPE_FENGLIUZHEN = 1; //  跨服风流镇
    SharedDef.KUAFU_TYPE_XIANFU = 2; //  跨服仙府夺宝
    SharedDef.KUAFU_TYPE_PLUNDER = 3; //  跨服家族掠夺
    SharedDef.KUAFU_TYPE_GROUP_INSTANCE = 4; //  跨服组队副本
    SharedDef.MATCH_TYPE_LOCAL_SINGLE_PVP = 5; //  本地单人PVP匹配
    SharedDef.MAX_KUAFU_TYPE = 6;
    // 合服协议带的类型
    SharedDef.MERGE_TYPE_MERGE = 0; // 从服迁移连接到主服
    SharedDef.MERGE_TYPE_GAME_TO_PK = 1; // 游戏服到Pk服
    SharedDef.MERGE_TYPE_PK_TO_GAME = 2; // pk服到游戏服
    // 会话类型
    SharedDef.CONTEXT_TYPE_YEYOU = 0; // 页游
    SharedDef.CONTEXT_TYPE_PHONE = 1; // 手游
    SharedDef.MAX_CONTEXT_TYPE = 2;
    // 性别
    SharedDef.CHAR_GENDER_MALE = 0; // 男性
    SharedDef.CHAR_GENDER_FEMALE = 1; // 女性
    SharedDef.CHAR_GENDER_NONE = 2; // 未知
    SharedDef.MAX_CHAR_GENDER = 3; // 长度		
    // 形象
    SharedDef.RACE_NONE = 0; // 无
    SharedDef.RACE_STRONG = 1; // 壮男
    SharedDef.RACE_HANDSOME = 2; // 俊男 
    SharedDef.RACE_LAURIE = 3; // 萝莉
    SharedDef.RACE_BEAUTY = 4; // 美人
    // 头像
    SharedDef.HEAD_NONE = 0; // 无
    SharedDef.HEAD_STRONG = 1; // 壮男
    SharedDef.HEAD_HANDSOME = 2; // 俊男 
    SharedDef.HEAD_LAURIE = 3; // 萝莉
    SharedDef.HEAD_BEAUTY = 4; // 美人	
    SharedDef.HEAD_TOTAL = 4;
    // 复活类型
    SharedDef.RESURRECTION_IN_SITU = 0; // 原地复活
    SharedDef.RESURRECTION_SPAWNPOINT = 1; // 复活点复活
    SharedDef.RESURRPCTION_FREE = 2; // 免费复活
    SharedDef.RESURRPCTION_MONEY = 3; // 元宝复活
    SharedDef.RESURRPCTION_TIME = 4; // 超时复活
    SharedDef.RESURRPCTION_HUANHUNDAN = 5; // 还魂丹复活
    SharedDef.MAX_RESURRECTION_TYPE = 6;
    // GM等级
    SharedDef.GM_LEVEL_0 = 0; // 普通玩家
    SharedDef.GM_LEVEL_1 = 1; // 普通GM
    SharedDef.GM_LEVEL_2 = 2; // 高级GM
    SharedDef.GM_LEVEL_3 = 3; // 终极GM
    // 游戏对象标志
    SharedDef.GO_FLAG_DYNAMIC = 0; // 是否动态对象,由不是由地图刷出来的
    SharedDef.GO_FLAG_TELE = 1; // 是否传送点对象
    SharedDef.GO_FLAG_QUEST = 2; // 是否任务对象
    SharedDef.GO_FLAG_LOOT = 3; // 是否战利品	
    SharedDef.GO_FLAG_GEAR = 10; // 是否机关，如箱子，门等
    SharedDef.GO_FLAG_UNUSE = 4; // 不可被使用
    SharedDef.GO_FLAG_FOREVER = 5; // 可永久使用
    SharedDef.GO_FLAG_USEMODE = 8; // 使用方式,需要进度条
    SharedDef.GO_FLAG_CARTON = 9; // 客户端模拟消失
    SharedDef.GO_FLAG_REBORN = 11; // 是否会重生 (如果有这项, GO_FLAG_FOREVER将不管用)
    SharedDef.GO_FLAG_SCRIPT = 12; // 是否使用脚本
    SharedDef.GO_FLAG_GET_ITEM_NOTICE = 13; // 拾起物品是否需要公告
    // 世界地图状态
    SharedDef.WORLD_MAP_DEFAULT = 0; // 新手村
    // 类枚举
    SharedDef.TYPEID_OBJECT = 0; // 本来0都是没用的
    SharedDef.TYPEID_UNIT = 1; // 生物精灵，如怪物，NPC，宝宝等。。。
    SharedDef.TYPEID_PLAYER = 2; // 玩家精灵
    SharedDef.TYPEID_GAMEOBJECT = 3; // 游戏对象精灵
    SharedDef.MAX_CLIENT_OBJECT_TYPES = 4;
    // 物品品质
    SharedDef.ITEM_QUAL_WHITE = 0; // 白装
    SharedDef.ITEM_QUAL_GREEN = 1; // 绿装
    SharedDef.ITEM_QUAL_BLUE = 2; // 蓝装
    SharedDef.ITEM_QUAL_PURPLE = 3; // 紫装
    SharedDef.ITEM_QUAL_ORANGE = 4; // 橙装
    SharedDef.ITEM_QUAL_RED = 5; // 红装
    SharedDef.MAX_QUAL = 6;
    // 攻击模式
    SharedDef.ATTACK_MODE_PEACE = 0; // 和平，不用说，你懂的
    SharedDef.ATTACK_MODE_TEAM = 1; // 组队，可以砍队伍以外的玩家
    SharedDef.ATTACK_MODE_RED = 2; // 红名，可以砍红名
    SharedDef.ATTACK_MODE_ALL = 3; // 全体，除了自己，谁都可以砍
    SharedDef.ATTACK_MODE_FACTION = 4; // 帮派模式
    SharedDef.ATTACK_MODE_BANG = 5; // 结义模式
    SharedDef.MAX_ATTACK_MODE = 6;
    // 仇恨计算类型
    SharedDef.REACT_PASSIVE = 0; // 被动攻击
    SharedDef.REACT_DEFENSIVE = 1; // 防御
    SharedDef.REACT_AGGRESSIVE = 2; // 主动攻击,
    SharedDef.REACT_AGGRESSIVE_UNIT = 3; // 主动攻击怪物
    SharedDef.REACT_AGGRESSIVE_PLAYER = 4; // 主动攻击玩家
    SharedDef.MAX_REACT_STATES = 5;
    // 合服操作类型
    SharedDef.MERGE_OPT_TYPE_INIT = 0; // 初始状态
    SharedDef.MERGE_OPT_TYPE_SAVE_DB = 1; // 数据保存完成
    SharedDef.MERGE_OPT_TYPE_TARGET_SERVER_OK = 2; // 目标服务器准备完成
    SharedDef.MERGE_OPT_TYPE_END = 3; // 操作结束
    SharedDef.MERGE_OPT_TYPE_SAVE_ING = 4; // 数据保存中
    // 合服服务器类型
    SharedDef.MERGE_SERVER_TYPE_ORIGINAL = 1; // 原始服务器
    SharedDef.MERGE_SERVER_TYPE_TARGAT = 2; // 目标服务器
    // 回档操作类型
    SharedDef.BACK_OPT_TYPE_INIT = 0; // 初始状态
    SharedDef.BACK_OPT_TYPE_SUCCESS = 1; // 成功
    // 物品绑定类型
    SharedDef.ITEM_BIND_NONE = 0; // 非绑定
    SharedDef.ITEM_BIND_USE = 1; // 使用绑定
    SharedDef.ITEM_BIND_GET = 2; // 获得绑定
    // 场景服给的东西获得类型
    SharedDef.ITEM_GIFT_GET_NONE = 0; // 非必须
    SharedDef.ITEM_GIFT_GET_MUST = 1; // 必须获得的
    // 玩家在线状态
    SharedDef.PLAYER_ONLINE_STATE_OUTLINE = 0; // 离线
    SharedDef.PLAYER_ONLINE_STATE_ONLINE = 1; // 在线
    // 生物移动模式
    SharedDef.DISAPPEAR_MOTION_TYPE = 9999; // 消失
    SharedDef.IDLE_MOTION_TYPE = 0; // 空闲
    SharedDef.RANDOM_MOTION_TYPE = 1; // 随机
    SharedDef.WAYPOINT_MOTION_TYPE = 2; // 沿路行走
    SharedDef.TARGET_MOTION_TYPE = 3; // 目标行走
    SharedDef.HOME_MOTION_TYPE = 4; // 回家
    SharedDef.CONFUSED_MOTION_TYPE = 5; // 困惑
    SharedDef.FLEEING_MOTION_TYPE = 6; // 逃避
    SharedDef.FOLLOW_MOTION_TYPE = 7; // 跟随
    SharedDef.FOLLOW_INLINE_MOTION_TYPE = 8; // 直线跟随
    SharedDef.WAYFINDING_MOTION_TYPE = 9; // 寻路行走
    SharedDef.WAYFINDING_ATTACK_MOTION_TYPE = 10; // 寻路追杀
    SharedDef.MERCENARY_MOTION_TYPE = 11; // 佣兵
    SharedDef.WAYFINDDST_MOTION_TYPE = 12; // 目的地行走
    SharedDef.DEADLINE_MOTION_TYPE = 13; // 过期消失
    SharedDef.MAX_MOTION_TYPE = 14;
    // 技能目标类型 自己,友方,敌方,全体
    SharedDef.TARGET_TYPE_ONESELF = 0;
    SharedDef.TARGET_TYPE_FRIENDLY = 1;
    SharedDef.TARGET_TYPE_ENEMY = 2;
    SharedDef.TARGET_TYPE_ALL = 3;
    SharedDef.TARGET_TYPE_POINT = 4; // 对点释放技能 
    SharedDef.TARGET_TYPE_SELFPOINT = 5; // 对自己的点释放
    SharedDef.TARGET_TYPE_CREATURE = 6; // 对怪物有效（不包括宠物等）
    SharedDef.TARGET_TYPE_PLAYER = 7; // 对玩家有效
    // 交易状态
    SharedDef.TRADE_STATE_TYPE_FREE = 0; // 空闲状态
    SharedDef.TRADE_STATE_TYPE_APPLY = 1; // 申请状态
    SharedDef.TRADE_STATE_TYPE_EXECUTION = 2; // 执行状态
    SharedDef.TRADE_STATE_TYPE_PUT_ITEM_END = 3; // 确认物品完成
    SharedDef.TRADE_STATE_TYPE_WAIT_FINISH = 4; // 等待完成状态
    // 交易的类型
    SharedDef.TRADE_TYPE_TRADE = 0; // 交易
    SharedDef.TRADE_TYPE_STALL = 1; // 摆摊
    // 通过模板id移动物品到指定的包裹（相应的位置上），结果
    SharedDef.MOVE_ITEM_FAIL = 0; // 失败
    SharedDef.MOVE_ITEM_SUC = 1; // 成功
    SharedDef.MOVE_ITEM_HAVE_BIND = 2; // 包含绑定的
    SharedDef.MOVE_ITEM_NOT_BIND = 3; // 不包含绑定的
    // 删除物品结果
    SharedDef.SUB_ITEM_FAIL = 0; // 失败
    SharedDef.SUB_ITEM_HAVE_BIND = 1; // 包含绑定的
    SharedDef.SUB_ITEM_NOT_BIND = 2; // 不包含绑定的
    SharedDef.SUB_ITEM_HAVE_FAILTIME = 3; // 包含限时
    // 物品数据处理状态
    SharedDef.ITEM_SAVE_MODE_INSERT = 0; // 插入
    SharedDef.ITEM_SAVE_MODE_UPDATE = 1; // 更新
    // 元宝充值类型
    SharedDef.GOLD_INGOT_RECHARGE_NORMAL = 1; // 正常模式
    SharedDef.GOLD_INGOT_RECHARGE_HANDSEL = 2; // 赠送模式
    SharedDef.GOLD_INGOT_RECHARGE_SUB = 3; // 扣费模式
    SharedDef.GOLD_INGOT_RECHARGE_HAND = 4; // 手动模式
    SharedDef.MAX_GOLD_INGOT_RECHARGE_TYPE = 5;
    // 充值状态类型
    SharedDef.RECHARGE_STATUS_TYPE_START = 0; // 初始化
    SharedDef.RECHARGE_STATUS_TYPE_RUNMING = 1; // 发放中
    SharedDef.RECHARGE_STATUS_TYPE_END = 2; // 结束
    // 踢人的状态类型
    SharedDef.KICKING_STATUS_START = 0; // 初始化
    SharedDef.KICKING_STATUS_END = 1; // 已踢
    // 封号的状态类型
    SharedDef.LOCKING_STATUS_START = 0; // 初始化
    SharedDef.LOCKING_STATUS_RUNNING = 1; // 封号中
    SharedDef.LOCKING_STATUS_END = 2; // 结束
    // 公告的状态类型
    SharedDef.SYSTEM_NOTICE_STATUS_START = 0; // 初始状态
    SharedDef.SYSTEM_NOTICE_STATUS_RUNNING = 1; // 运行中
    SharedDef.SYSTEM_NOTICE_STATUS_END = 2; // 结束
    SharedDef.SYSTEM_NOTICE_STATUS_DELETE = 3; // 将删除
    SharedDef.SYSTEM_NOTICE_STATUS_GARBAGE = 4; // 已删除
    // 礼包的状态类型
    SharedDef.GIFT_PACKS_STATUS_START = 0; // 初始
    SharedDef.GIFT_PACKS_STATUS_SENDING = 1; // 发放中
    SharedDef.GIFT_PACKS_STATUS_OK = 2; // 已发放
    SharedDef.GIFT_PACKS_STATUS_END = 3; // 已结束
    // 礼包发放类型
    SharedDef.GIFT_PACKS_AUDIENCE_TYPE_ONE = 1; // 个人礼包，如补偿礼包等
    SharedDef.GIFT_PACKS_AUDIENCE_TYPE_ALL = 2; // 全体同志的礼包
    SharedDef.GIFT_PACKS_AUDIENCE_TYPE_ALL_ONLINE = 3; // 全服在线玩家
    // 礼包操作类型
    SharedDef.GIFT_PACKS_OPER_TYPE_RECEIVE = 0; // 领取
    SharedDef.GIFT_PACKS_OPER_TYPE_READ = 1; // 已读
    SharedDef.GIFT_PACKS_OPER_TYPE_DELETE = 2; // 删除
    // 禁言状态
    SharedDef.GAG_STATUS_START = 0; // 初始化
    SharedDef.GAG_STATUS_OFFLINE = 1; // GAG_STATUS_OFFLINE		= 1,		//玩家离线
    SharedDef.GAG_STATUS_END = 1; // 已禁言
    // 设置GM表的状态
    SharedDef.GM_LEVEL_TABLE_START = 0; // 初始化
    SharedDef.GM_LEVEL_TABLE_END = 1; // 已执行
    // 公告类型
    SharedDef.NOTICE_TYPE_SCROLL = 1; // 滚动公告
    SharedDef.NOTICE_TYPE_PROMPT = 2; // 固定和世界聊天提示
    SharedDef.NOTICE_TYPE_FIXED = 3; // 固定提示
    SharedDef.MAX_NOTICE_TYPE = 10; // 预留10种
    // 聊天类型
    SharedDef.CHAT_TYPE_SYSTEM = 0; // 系统
    SharedDef.CHAT_TYPE_WORLD = 1; // 世界
    SharedDef.CHAT_TYPE_FACTION = 2; // 帮派
    SharedDef.CHAT_TYPE_CURRENT = 3; // 当前(场景)
    SharedDef.CHAT_TYPE_HORM = 4; // 喇叭
    SharedDef.CHAT_TYPE_GROUP = 5; // 队伍
    SharedDef.CHAT_TYPE_WHISPER = 6; // 私聊
    SharedDef.MAX_CHAT_TYPE = 7;
    // 平台枚举
    SharedDef.PLATFORM_GAME2 = "2"; // 哥们网
    SharedDef.PLATFORM_QQ = "360"; // 腾讯QQ
    SharedDef.PLATFORM_NULL = "9999"; // 不需要post的平台
    // post的动作类型
    SharedDef.POST_TYPE_NONE = 0;
    SharedDef.POST_TYPE_CHAT = 1; // 聊天
    SharedDef.POST_TYPE_UPGRADE = 2; // 用户升级
    SharedDef.MAX_POST_TYPE = 3;
    // 记录到文件的日志类型
    SharedDef.LOG_FILE_TYPE_GAME_BUY = 0; // 记录用户在游戏内购买行为
    SharedDef.LOG_FILE_TYPE_GAME_SELL = 1; // 记录用户在游戏内出售行为
    SharedDef.LOG_FILE_TYPE_RECHARGE = 2; // 记录用户充值行为
    SharedDef.LOG_FILE_TYPE_SHOP_BUY = 3; // 记录用户在商城的购买行为
    SharedDef.LOG_FILE_TYPE_ITEM_USE = 4; // 记录用户使用商城物品行为
    SharedDef.LOG_FILE_TYPE_DEAL = 5; // 记录用户的交易行为
    SharedDef.LOG_FILE_TYPE_YB_INCOME = 6; // 记录额外元宝收入
    SharedDef.LOG_FILE_TYPE_ITEM_INCOME = 7; // 记录额外道具收入
    SharedDef.LOG_FILE_TYPE_YB_EXPEND = 8; // 记录额外元宝消费
    SharedDef.LOG_FILE_TYPE_LOGIN = 9; // 记录用户登录行为
    SharedDef.LOG_FILE_TYPE_LOGOUT = 10; // 记录用户登出行为
    SharedDef.LOG_FILE_TYPE_CREATE_ROLE = 11; // 记录用户创建角色行为
    SharedDef.LOG_FILE_TYPE_DEATH = 12; // 记录用户角色死亡事件
    SharedDef.LOG_FILE_TYPE_ACCEPT_TASK = 13; // 记录用户接收任务的行为
    SharedDef.LOG_FILE_TYPE_TASK = 14; // 记录用户完成任务的行为
    SharedDef.LOG_FILE_TYPE_UPGRADE = 15; // 记录用户升级事件
    SharedDef.LOG_FILE_TYPE_GOLD = 16; // 记录用户金币所得行为
    SharedDef.LOG_FILE_TYPE_MAP = 17; // 记录用户切换地图的行为
    SharedDef.LOG_FILE_TYPE_LONGER = 18; // 记录用户的挂机行为
    SharedDef.LOG_FILE_TYPE_MONSTER = 19; // 记录用户打怪的行为
    SharedDef.LOG_FILE_TYPE_TRANSCRIPT = 20; // 记录用户打副本的行为
    SharedDef.LOG_FILE_TYPE_ONLINE = 21; // 记录在线人数
    SharedDef.LOG_FILE_TYPE_GAME_ENTER = 22; // 记录用户进入游戏主界面
    SharedDef.LOG_FILE_TYPE_ITEM_LOG = 23; // 记录道具的所有行为
    SharedDef.LOG_FILE_TYPE_CHAT = 24; // 记录玩家聊天记录
    SharedDef.LOG_FILE_TYPE_RELIVE = 25; // 记录玩家复活
    SharedDef.LOG_FILE_TYPE_BIND_GOLD = 26; // 记录玩家的绑定元宝行为
    SharedDef.LOG_FILE_TYPE_NEW_CARD_RECEIVE = 27; // 记录用户领取新手卡的行为
    SharedDef.LOG_FILE_TYPE_STALL = 28; // 记录摆摊行为
    SharedDef.LOG_FILE_TYPE_WANTED_PACKET = 29; // 记录被通缉的玩家的所有包记录
    SharedDef.LOG_FILE_TYPE_ERROR_PACKET = 30; // 记录读取用户信息出错的包
    SharedDef.LOG_FILE_TYPE_CHOOSE_FACTION = 31; // 记录玩家选择阵营的情况
    SharedDef.LOG_FILE_TYPE_ACTIVITY_INFO = 32; // 记录运营活动奖励信息
    SharedDef.LOG_FILE_TYPE_ABNORMAL_PACKETS = 33; // 记录因为异常包而踢掉玩家的行为
    SharedDef.LOG_FILE_TYPE_CLIENT_INFO = 34; // 记录玩家客户端信息
    SharedDef.LOG_FILE_TYPE_GIFTMONEY_BUY = 35; // 记录玩家礼金消耗的行为
    SharedDef.LOG_FILE_TYPE_GIFTMONEY_INCOME = 36; // 记录用户礼金获得的行为
    SharedDef.LOG_FILE_TYPE_ATTACK_PACKET = 37; // 记录攻击包
    SharedDef.LOG_FILE_TYPE_FORMAT_LOG = 38; // 记录乱七八糟的自定义日志
    SharedDef.LOG_FILE_TYPE_CLIENT_LOG = 39; // 记录客户端日志
    SharedDef.LOG_FILE_TYPE_FORGE_LOG = 40; // 记录锻造日志
    SharedDef.LOG_FILE_TYPE_OBJECT_LOSS = 41; // 1001日志
    SharedDef.MAX_LOG_FILE_TYPE = 42;
    SharedDef.SKILL_EFFECT_TYPE_NORMAL = 0; // 普通效果类型
    SharedDef.SKILL_EFFECT_TYPE_HUIXUE1 = 1; // 敌方扣血, 自己加血
    SharedDef.SKILL_EFFECT_TYPE_ROAR = 2; // 战吼
    SharedDef.SKILL_EFFECT_TYPE_BLADE_STORM = 3; // 剑刃风暴 (每多少秒扣血还是怎么的?)
    SharedDef.SKILL_EFFECT_TYPE_HEAL = 4; // 治疗之泉
    SharedDef.SKILL_EFFECT_TYPE_SNOW_STORM = 5; // 暴风雪
    SharedDef.SKILL_EFFECT_TYPE_LOADED = 99; // 蓄力时间到释放技能
    // 记录腾讯文件的日志类型
    SharedDef.LOG_FILE_TENCENT_USER = 0; // 用户表
    SharedDef.LOG_FILE_TENCENT_PLAYER = 1; // 角色表
    SharedDef.LOG_FILE_TENCENT_RECHAGRE = 2; // 充值表
    SharedDef.LOG_FILE_TENCENT_UPGRADELOG = 3; // 升级日志
    SharedDef.LOG_FILE_TENCENT_NEWTASK = 4; // 新手日志
    SharedDef.LOG_FILE_TENCENT_LOGIN = 5; // 登陆日志
    SharedDef.LOG_FILE_TENCENT_OFFLINE = 6; // 离线日志
    SharedDef.LOG_FILE_TENCENT_ONLINE = 7; // 在线统计日志
    SharedDef.LOG_FILE_TENCENT_MONEYLOG = 8; // 金币流量
    SharedDef.MAX_LOG_FILE_TENCENT_TYPE = 9;
    //  死亡地类型
    SharedDef.DEAD_PLACE_TYPE_FIELD = 1; //  野外死亡
    SharedDef.DEAD_PLACE_TYPE_XIANFU = 2; //  仙府夺宝死亡
    SharedDef.DEAD_PLACE_TYPE_GROUP_INSTANCE = 3; //  组队副本死亡
    // 攻击包异常类型
    SharedDef.ACCACK_PACKET_TYPE_UNPACK = 0; // 解包失败
    SharedDef.ACCACK_PACKET_TYPE_DATA = 1; // 数据异常
    SharedDef.ACCACK_PACKET_TYPE_ORDER = 2; // 包顺序异常
    SharedDef.ACCACK_PACKET_TYPE_DISCARD = 3; // 废弃的包号
    SharedDef.MAX_ACCACK_PACKET_TYPE = 4;
    // 交易物品
    // 装备ID
    // 模版ID
    // 类型
    // 数量
    // 额外元宝获得类型
    SharedDef.LOG_YB_INCOME_TYPE_ACTIVITY = 0; // 活动赠送
    SharedDef.LOG_YB_INCOME_TYPE_RECHARGE = 1; // 充值赠送
    SharedDef.LOG_YB_INCOME_TYPE_USE_ITEM = 2; // 使用道具
    SharedDef.LOG_YB_INCOME_TYPE_GIFT_PACKS = 3; // 补偿礼包
    // 道具操作类型
    // NOTICE 这个用于自定义道具的来源及客户端的提示reason是对应的
    // 获得
    SharedDef.LOG_ITEM_OPER_TYPE_ACTIVITY = 0; // 活动奖励获得
    SharedDef.LOG_ITEM_OPER_TYPE_RECHARGE = 1; // 充值赠送获得
    SharedDef.LOG_ITEM_OPER_TYPE_GIFT_PACKS = 2; // 补偿礼包获得
    SharedDef.LOG_ITEM_OPER_TYPE_QUEST = 3; // 任务完成奖励获得
    SharedDef.LOG_ITEM_OPER_TYPE_NEWPLAYER = 4; // 新手礼包获得
    SharedDef.LOG_ITEM_OPER_TYPE_OPEN_ITEM = 5; // 使用道具获得
    SharedDef.LOG_ITEM_OPER_TYPE_LOOT = 6; // 战利品
    SharedDef.LOG_ITEM_OPER_TYPE_GM_COMMAND = 7; // GM命令获得
    SharedDef.LOG_ITEM_OPER_TYPE_ITEM_BLEND = 8; // 物品合成获得
    SharedDef.LOG_ITEM_OPER_TYPE_SEVEN_DAY_GIFT = 9; // 连登礼包	
    SharedDef.LOG_ITEM_OPER_TYPE_JHM_GIFT = 10; // 激活码礼包
    SharedDef.LOG_ITEM_OPER_TYPE_OPEN_BOX = 11; // 开宝箱获得
    SharedDef.LOG_ITEM_OPER_TYPE_FUBEN_EWAIJINAGLI = 12; // 副本额外奖励
    SharedDef.LOG_ITEM_OPER_TYPE_CAPTURE_YAOHUN = 13; // 扑捉妖魂获得
    SharedDef.LOG_ITEM_OPER_TYPE_FSZL_EWAIJINAGLI = 14; // 飞升之路奖励
    SharedDef.LOG_ITEM_OPER_TYPE_PRESTIGE = 15; // 活跃度领取获得
    SharedDef.LOG_ITEM_OPER_TYPE_TIANDILINGKUANG = 16; // 天地灵矿领取获得
    SharedDef.LOG_ITEM_OPER_TYPE_PANTAOYUAN = 17; // 蟠桃园奖励
    SharedDef.LOG_ITEM_OPER_TYPE_WABAO = 18; // 挖宝获得
    SharedDef.LOG_ITEM_OPER_TYPE_HONGYAN = 19; // 红颜事件获得
    SharedDef.LOG_ITEM_OPER_TYPE_FORGE_DECOMPOSE = 20; // 锻造分解获得
    SharedDef.LOG_ITEM_OPER_TYPE_WORLD_BOSS_ROLL = 21; // 世界BOSSroll点
    SharedDef.LOG_ITEM_OPER_TYPE_VIP_INSTANCE_REWARD = 22; // vip副本奖励
    SharedDef.LOG_ITEM_OPER_TYPE_TRIAL_INSTANCE_REWARD = 23; // 试炼塔奖励
    SharedDef.LOG_ITEM_OPER_TYPE_ACHIEVE = 24; // 成就奖励
    SharedDef.LOG_ITEM_OPER_TYPE_SHOUCHONG = 25; // 首充奖励
    SharedDef.LOG_ITEM_OPER_TYPE_CHECKIN = 26; // 每日签到奖励
    SharedDef.LOG_ITEM_OPER_TYPE_GETBACK = 27; // 找回次数奖励
    SharedDef.LOG_ITEM_OPER_TYPE_TOTAL_CHECKIN = 28; // 每日累积签到奖励
    SharedDef.LOG_ITEM_OPER_TYPE_WELFARE_LEVEL = 29; // 福利等级奖励
    SharedDef.LOG_ITEM_OPER_TYPE_3V3_KUAFU = 30; // 3v3跨服奖励
    SharedDef.LOG_ITEM_OPER_TYPE_INSTANCE_SWEEP = 31; // 副本奖励扫荡奖励
    SharedDef.LOG_ITEM_OPER_TYPE_XIANFU = 32; // 仙府夺宝跨服奖励
    SharedDef.LOG_ITEM_OPER_TYPE_DOUJIAN_FIRST_REWARD = 33; // 斗剑台首胜奖励
    SharedDef.LOG_ITEM_OPER_TYPE_DOUJIAN_COMBAT_REWARD = 34; // 斗剑台连胜奖励
    SharedDef.LOG_ITEM_OPER_TYPE_CULTIVATION_REWARD = 35; // 修炼场奖励
    SharedDef.LOG_ITEM_OPER_TYPE_CULTIVATION_PLUNDER_REWARD = 36; // 修炼场掠夺奖励
    SharedDef.LOG_ITEM_OPER_TYPE_LOGIN_ACTIVITY_REWARD = 37; // 登录大礼奖励
    SharedDef.LOG_ITEM_OPER_TYPE_GROUP_INSTANCE = 38; // 组队副本跨服奖励
    SharedDef.LOG_ITEM_OPER_TYPE_XIANFU_PRACTISE = 40; // 仙府夺宝体验奖励
    SharedDef.LOG_ITEM_OPER_TYPE_FACTION_BOSS = 41; // 帮派boss奖励
    SharedDef.LOG_ITEM_OPER_TYPE_OFFLINE = 42; // 离线奖励
    SharedDef.LOG_ITEM_OPER_TYPE_STOREHOUSE = 43; // 帮派宝库
    SharedDef.LOG_ITEM_OPER_TYPE_MASS_BOSS = 44; // 全民BOSS
    // 购买
    SharedDef.LOG_ITEM_OPER_TYPE_SHOP_BUY = 45; // 从商场购买获得
    SharedDef.LOG_ITEM_OPER_TYPE_FACTION_BOSSDEFENSE = 46; // 家族首领挑战击杀奖励
    SharedDef.LOG_ITEM_OPER_TYPE_FACTION_TOWER = 47; // 家族无尽远征奖励
    SharedDef.LOG_ITEM_OPER_TYPE_SINGLE_PVP = 48; // 单人PVP
    SharedDef.LOG_ITEM_OPER_TYPE_ACT_LOTTERY = 49; // 抽奖活动
    SharedDef.LOG_ITEM_OPER_TYPE_ACT_DAILYGIFT = 50; // 每日礼包活动
    SharedDef.LOG_ITEM_OPER_TYPE_ACT_RANK = 51; // 每日排行活动
    SharedDef.LOG_ITEM_OPER_TYPE_ACT_LIMITGIFT = 52; // 限定礼包活动
    SharedDef.LOG_ITEM_OPER_TYPE_RECHARGE_REWARD = 53; // 充值返利
    SharedDef.LOG_ITEM_OPER_TYPE_CONSUME_REWARD = 54; // 消费返利
    SharedDef.LOG_ITEM_OPER_TYPE_PRIVATE_BOSS = 55; // 个人Boss
    SharedDef.LOG_ITEM_OPER_TYPE_ESCORT = 56; // 运镖
    SharedDef.LOG_ITEM_OPER_TYPE_ESCORT_ROB = 57; // 劫镖
    SharedDef.LOG_ITEM_OPER_TYPE_NPC_BUY = 102; // 从NPC购买获得
    SharedDef.LOG_ITEM_OPER_TYPE_BIND_SHOP_BUY = 103; // 从绑定商城购买获得
    SharedDef.LOG_ITEM_OPER_TYPE_REPURCHASE = 104; // 从NPC回购物品获得
    SharedDef.LOG_ITEM_OPER_TYPE_ACTI_BUY = 105; // 活动购买
    SharedDef.LOG_ITEM_OPER_TYPE_XIANFU_BUY = 106; // 购买仙府进入券
    // 消耗
    SharedDef.LOG_ITEM_OPER_TYPE_NPC_SELL = 200; // 出售给NPC
    SharedDef.LOG_ITEM_OPER_TYPE_DEL_FAILTIME = 201; // 清理限时物品
    SharedDef.LOG_ITEM_OPER_TYPE_USE = 202; // 使用物品
    SharedDef.LOG_ITEM_OPER_TYPE_DISPOSE = 203; // 销毁物品
    SharedDef.LOG_ITEM_OPER_TYPE_HEAL = 204; // 吃药
    // 交易
    SharedDef.LOG_ITEM_OPER_TYPE_TRADE_GET = 301; // 交易获得
    SharedDef.LOG_ITEM_OPER_TYPE_TRADE_PAY = 302; // 交易付出
    SharedDef.LOG_ITEM_OPER_TYPE_STALL_OPEN = 303; // 摆摊
    SharedDef.LOG_ITEM_OPER_TYPE_STALL_CLOSE = 304; // 收摊
    SharedDef.LOG_ITEM_OPER_TYPE_STALL_BUY = 305; // 摊位购买
    SharedDef.LOG_ITEM_OPER_TYPE_LINGDI_XUANSHANG = 306; // 领地悬赏
    SharedDef.LOG_ITEM_OPER_TYPE_LINGDI_MIJING = 307; // 领地秘境
    SharedDef.LOG_ITEM_OPER_TYPE_WUJIANG_ZHENGZHAN = 308; // 武将征战
    SharedDef.LOG_ITEM_OPER_TYPE_KAOZHUANGYUAN = 309; // 考状元
    SharedDef.LOG_ITEM_OPER_TYPE_MONEYTREE_GIFT = 310; // 摇钱树礼包
    // 后台货币变化种类枚举
    SharedDef.HT_MONEY_CHANGE_TYPE_RECHARGE = 1; // 充值
    SharedDef.HT_MONEY_CHANGE_TYPE_CONSUMPTION = 2; // 消费
    SharedDef.HT_MONEY_CHANGE_TYPE_SUB = 3; // 管理员扣除
    SharedDef.HT_MONEY_CHANGE_TYPE_REWARD = 4; // 奖励
    SharedDef.HT_MONEY_CHANGE_TYPE_REBATE = 5; // 返利
    SharedDef.HT_MONEY_CHANGE_TYPE_TRADING = 6; // 交易
    // 货币变化原因类型
    SharedDef.MONEY_CHANGE_TYPE_CHARGE = 0; // 玩家充值
    SharedDef.MONEY_CHANGE_TYPE_STORE_BUY = 1; // 商店购买
    SharedDef.MONEY_CHANGE_TYPE_MALL_BUY = 2; // 商城购买
    SharedDef.MONEY_CHANGE_TYPE_STALL_SALE = 3; // 摊位卖出
    SharedDef.MONEY_CHANGE_TYPE_TRADE = 4; // 玩家交易
    SharedDef.MONEY_CHANGE_MAIL = 5; // 邮件
    SharedDef.MONEY_CHANGE_QUEST = 6; // 任务奖励
    SharedDef.MONEY_CHANGE_DEAD = 7; // 死亡掉落
    SharedDef.MONEY_CHANGE_RIHUAN = 8; // 日环
    SharedDef.MONEY_CHANGE_USE_ITEM = 9; // 使用物品消耗
    SharedDef.MONEY_CHANGE_GIFT_PACKS = 10; // 系统礼包赠送
    SharedDef.MONEY_CHANGE_NPC_SELL = 11; // NPC出售
    SharedDef.MONEY_CHANGE_ITEM_REPAIR = 12; // 预留
    SharedDef.MONEY_CHANGE_ITEM_APPRAISAL = 13; // 预留
    SharedDef.MONEY_CHANGE_NPC_REPURCHASE = 14; // NPC回购
    SharedDef.MONEY_CHANGE_GM_COMMAND = 15; // GM招财命令
    SharedDef.MONEY_CHANGE_CREATE_FACTION = 16; // 创建帮派
    SharedDef.MONEY_CHANGE_WAREHOUSE_HANLD = 17; // 仓库操作
    SharedDef.MONEY_CHANGE_SELECT_LOOT = 18; // 战利品
    SharedDef.MONEY_CHANGE_ACTIVITY = 19; // 活动奖励
    SharedDef.MONEY_CHANGE_TYPE_CHARGE_2 = 20; // 充值额外赠送
    SharedDef.MONEY_CHANGE_TYPE_CHARGE_3 = 21; // 管理员扣除
    SharedDef.MONEY_CHANGE_TYPE_CHARGE_4 = 22; // 手动赠送
    SharedDef.MONEY_CHANGE_USE_LABA = 23; // 使用喇叭
    SharedDef.MONEY_CHANGE_BAG_EXTENSION = 24; // 背包扩展
    SharedDef.MONEY_CHANGE_ITEM_BLEND = 25; // 物品合成消耗铜钱
    SharedDef.MONEY_CHANGE_SEVEN_DAY_GIFT = 26; // 连登礼包
    SharedDef.MONEY_CHANGE_CLEAR_PK_VALUE = 27; // 使用元宝洗白
    SharedDef.MONEY_CHANGE_JHM_REWARD = 28; // 激活码奖励
    SharedDef.MONEY_CHANGE_ONLINE_GIFT = 29; // 每日在线奖励
    SharedDef.MONEY_CHANGE_SPELL_UP = 30; // 技能升阶
    SharedDef.MONEY_CHANGE_USE_BOX = 31; // 使用宝箱消耗
    SharedDef.MONEY_CHANGE_BOX_OPEN = 32; // 开宝箱获得
    SharedDef.MONEY_CHANGE_BOX_RANDOM = 33; // 开宝箱随机奖励
    SharedDef.MONEY_CHANGE_JINGJIE = 34; // 升级境界消耗
    SharedDef.MONEY_CHANGE_SHENBING_BUY = 35; // 神兵购买
    SharedDef.MONEY_CHANGE_ATUO_GOLD_RESPAWN = 36; // 元宝复活
    SharedDef.MONEY_CHANGE_FUBEN_KILLALL = 37; // 副本全图秒杀消耗
    SharedDef.MONEY_CHANGE_FUBEN_EWAI = 38; // 副本额外奖励
    SharedDef.MONEY_CHANGE_FUBEN_BUY = 39; // 购买副本次数消耗
    SharedDef.MONEY_CHANGE_FSZL_REWARD = 40; // 飞升之路奖励
    SharedDef.MONEY_CHANGE_PRESTIGE = 41; // 活跃度
    SharedDef.MONEY_CHANGE_PANTAO_CAIJI = 42; // 采集蟠桃获得
    SharedDef.MONEY_CHANGE_LINGKUANG_CAIJI = 43; // 采集灵矿获得	
    SharedDef.MONEY_CHANGE_QIYU_ZHUOYAO = 44; // 扑捉妖魂消耗
    SharedDef.MONEY_CHANGE_RESET_FORGE_ADD = 45; // 重置锻造加成时间
    SharedDef.MONEY_CHANGE_WABAO = 46; // 挖宝获得
    SharedDef.MONEY_CHANGE_HONGYAN_BUY_HUOLI = 47; // 红颜购买活力
    SharedDef.MONEY_CHANGE_HONGYAN_SHIJIAN = 48; // 红颜事件获得
    SharedDef.MONEY_CHANGE_HONGYAN_BUY_FASHION = 49; // 红颜购买时装
    SharedDef.MONEY_CHANGE_FORGE_STRENG = 50; // 锻造强化
    SharedDef.MONEY_CHANGE_FORGE_GEM = 51; // 宝石
    SharedDef.MONEY_CHANGE_LINGDI_ZHAOMU = 52; // 领地招募
    SharedDef.MONEY_CHANGE_LINGDI_XUANSHANG = 53; // 领地悬赏
    SharedDef.MONEY_CHANGE_LINGDI_MIJING = 54; // 领地秘境
    SharedDef.MONEY_CHANGE_WUJIANG_REFRESH_PUB = 55; // 元宝刷新酒馆武将
    SharedDef.MONEY_CHANGE_FENGLIUZHEN_PUB_AUCTION = 56; // 风流镇酒馆竞拍
    SharedDef.MONEY_CHANGE_WUJIANG_QINGJIU = 55; // 元宝清酒武将
    SharedDef.MONEY_CHANGE_LINGDI_ZHENGBING = 56; // 领地征兵
    SharedDef.MONEY_CHANGE_FENGLIUZHEN_ZHUANPAN_ENTER = 57; // 风流镇转盘进去房间
    SharedDef.MONEY_CHANGE_USE_SPELL = 58; // 使用技能
    SharedDef.MONEY_CHANGE_UP_ASSISTSPELL = 59; // 升级辅助技能
    SharedDef.MONEY_CHANGE_LINGDI_BUY_BINGLI = 60; // 领地征兵购买兵力
    SharedDef.MONEY_CHANGE_WUJIANG_ZHENGZHAN = 61; // 武将征战
    SharedDef.MONEY_CHANGE_BUY_JUNLLING = 62; // 购买军令
    SharedDef.MONEY_CHANGE_SELL_WUJIANG_EQUIP = 63; // 出售武将装备
    SharedDef.MONEY_CHANGE_FENGLIUZHEN_KAOZHUANGYUAN = 64; // 考状元奖励
    SharedDef.MONEY_CHANGE_ZHUBO_SEND_GIFTS = 65; // 主播送礼消耗
    SharedDef.MONEY_CHANGE_ZHUBO_GRAB_SOFA = 66; // 主播抢沙发
    SharedDef.MONEY_CHANGE_RAISE_MOUNT = 67; // 升级坐骑
    SharedDef.MONEY_CHANGE_ILLUSION = 68; // 坐骑幻化
    SharedDef.MONEY_CHANGE_BIND_INGOT_NOT_ENOUGH = 69; // 购买道具绑银不足消耗元宝
    SharedDef.MONEY_CHANGE_ACTIVE_SPELL = 70; // 激活技能
    SharedDef.MONEY_CHANGE_BUY_VIP_INSTANCE = 71; // 购买VIP副本进入次数
    SharedDef.MONEY_CHANGE_BUY_HP_ITEM = 72; // 购买回血药品
    SharedDef.MONEY_CHANGE_RESET_TRIAL = 73; // 重置试炼塔
    SharedDef.MONEY_CHANGE_SOCIAL_GIFT = 74; // 好友赠送礼物
    SharedDef.MONEY_CHANGE_FACTION_DONATION = 75; // 帮派捐献
    SharedDef.MONEY_CHANGE_FACTION_SHOP = 76; // 帮派商店
    SharedDef.MONEY_CHANGE_WORLD_BOSS_ROLL = 77; // 世界BOSSroll点
    SharedDef.MONEY_CHANGE_VIP_INSTANCE_REWARD = 78; // VIP副本奖励
    SharedDef.MONEY_CHANGE_TRIAL_INSTANCE_REWARD = 79; // 试炼塔奖励
    SharedDef.MONEY_CHANGE_WELF_ACTIVE_GETBACK = 80; // 福利活动找回奖励
    SharedDef.MONEY_CHANGE_SHOUCHONG = 81; // 首冲奖励
    SharedDef.MONEY_CHANGE_CHECKIN = 82; // 每日签到奖励
    SharedDef.MONEY_CHANGE_TOTAL_CHECKIN = 83; // 每日累积签到奖励
    SharedDef.MONEY_CHANGE_WELFARE_LEVEL = 84; // 等级福利奖励
    SharedDef.MONEY_CHANGE_ACHIEVE = 85; // 成就奖励
    SharedDef.MONEY_CHANGE_3V3KUAFU = 86; // 3v3跨服奖励
    SharedDef.MONEY_CHANGE_VIP_INSTANCE_SWEEP = 87; // 副本扫荡
    SharedDef.MONEY_CHANGE_GIFT_PACKET = 88; // 礼包
    SharedDef.MONEY_CHANGE_KUAFU_WORLD_3V3 = 89; // 跨服3v3
    SharedDef.MONEY_CHANGE_KUAFU_WORLD_XIANFU = 90; // 跨服仙府夺宝
    SharedDef.MONEY_CHANGE_BUY_XIANFU_TICKET = 91; // 购买仙府进入券
    SharedDef.MONEY_CHANGE_DOUJIAN_BUY_TIMES = 92; // 斗剑台购买次数
    SharedDef.MONEY_CHANGE_DOUJIAN_CLEARCD = 93; // 斗剑台清理CD
    SharedDef.MONEY_CHANGE_DOUJIAN_FIRST_REWARD = 94; // 斗剑台首胜奖励
    SharedDef.MONEY_CHANGE_DOUJIAN_COMBATWIN_REWARD = 95; // 斗剑台连胜奖励
    SharedDef.MONEY_CHANGE_CULTIVATION_PURCHASE = 96; // 修炼场购买次数
    SharedDef.MONEY_CHANGE_CULTIVATION_REWARD = 97; // 修练场奖励
    SharedDef.MONEY_CHANGE_CULTIVATION_PLUNDER_REWARD = 98; // 修练场掠夺奖励
    SharedDef.MONEY_CHANGE_LOGIN_ACTIVITY_REWARD = 99; // 登陆大礼奖励
    SharedDef.MONEY_CHANGE_FACTION_BOSS = 100; // 帮派boss奖励
    SharedDef.MONEY_CHANGE_OFFLINE = 101; // 离线奖励
    SharedDef.MONEY_CHANGE_STOREHOUSE = 102; // 帮派宝库
    SharedDef.MONEY_CHANGE_MASS_BOSS = 103; // 全民BOSS
    SharedDef.MONEY_CHANGE_MASS_BOSS_BUY_TIMES = 104; // 全民BOSS挑战次数
    SharedDef.MONEY_CHANGE_GROUP_INSTANCE_BUY_TIMES = 105; // 组队副本挑战次数
    SharedDef.MONEY_CHANGE_KUAFU_GROUP_INSTANCE = 106; // 跨服组队副本
    SharedDef.MONEY_CHANGE_MERIDIAN = 107; // 经脉修炼
    SharedDef.MONEY_CHANGE_FACTION_BOSSDEFENSE = 108; // 家族首领挑战 击杀奖励
    SharedDef.MONEY_CHANGE_FACTION_TOWER = 109; // 家族无尽远征 击杀奖励
    SharedDef.MONEY_CHANGE_SINGLE_PVP = 110; // 单人PVP
    SharedDef.MONEY_CHANGE_EQUIPDEVELOP = 111; // 装备养成消耗
    SharedDef.MONEY_CHANGE_APPEARANCE = 112; // 外观
    SharedDef.MONEY_CHANGE_FACTIONSKILL = 113; // 家族技能消耗
    SharedDef.MONEY_CHANGE_UNLOCKTITLE = 114; // 家族技能消耗
    SharedDef.MONEY_CHANGE_RENAME = 115; // 改名
    SharedDef.MONEY_CHANGE_RANK_LIKE = 116; // 排行榜点赞
    SharedDef.MONEY_CHANGE_ACT_LOTTERY = 117; // 抽奖活动
    SharedDef.MONEY_CHANGE_ACT_DAILYGIFT = 118; // 每日礼包
    SharedDef.MONEY_CHANGE_ACT_RANK = 119; // 开服排行
    SharedDef.MONEY_CHANGE_ACT_LIMITGIFT = 120; // 限定礼包
    SharedDef.MONEY_CHANGE_RECHARGE_REWARD = 121; // 充值返利
    SharedDef.MONEY_CHANGE_CONSUME_REWARD = 122; // 消费返利
    SharedDef.MONEY_CHANGE_MONEYTREE_USE = 123; // 摇动摇钱树
    SharedDef.MONEY_CHANGE_PRIVATE_BOSS = 124; // 个人Boss
    SharedDef.MONEY_CHANGE_ADVANTURE_KILL_BY_PLAYER = 125; // 死亡掉落令牌
    SharedDef.MONEY_CHANGE_ESCORT = 126; // 运镖
    SharedDef.MONEY_CHANGE_ESCORT_ROB = 127; // 劫镖
    SharedDef.MAX_MONEY_CHANGE_TYPE = 128;
    // 特殊包裹类型
    SharedDef.BAG_VIRTUAL_TYPE_STALL = -1; // 摆摊
    SharedDef.BAG_VIRTUAL_TYPE_UNKNOWN = -2; // 未知
    SharedDef.SPECIALL_BAG_TYPE_MAIL = -3; // 邮件
    // 物品类型
    SharedDef.ITEM_TYPE_NONE = 0; // 无
    SharedDef.ITEM_TYPE_EQUIP = 1; // 装备
    SharedDef.ITEM_TYPE_BOX = 15; // 宝箱类（使用获得道具类型的物品）
    SharedDef.ITEM_TYPE_MATERIAL = 3; // 材料
    SharedDef.ITEM_TYPE_MEDICINE = 12; // 药品
    SharedDef.ITEM_TYPE_FASHION = 5; // 时装
    SharedDef.ITEM_TYPE_BUFF = 25; // 获得buff型
    SharedDef.ITEM_TYPE_SHELI = 6; // 舍利
    SharedDef.ITEM_TYPE_PK_MEDICINE = 7; // PK药品
    SharedDef.ITEM_TYPE_PET_MEDICINE = 8; // 宠物药
    SharedDef.ITEM_TYPE_NUMBER = 9; // 数值类型
    //  获得道具以后的记录
    SharedDef.ITEM_RECORD_BROADCAST = 1; //  全服广播
    SharedDef.ITEM_RECORD_XIANFU = 2; //  仙府夺宝记录
    SharedDef.ITEM_RECORD_MAP = 3; //  地图通知
    //  masks for ITEM_INT_FIELD_FLAGS field
    SharedDef.ITEM_FLAGS_QUEST = 0; //  是否任务物品
    SharedDef.ITEM_FLAGS_RMB = 1; // 是否RMB物品
    SharedDef.ITEM_FLAGS_APPRAISAL = 2; // 是否鉴定
    SharedDef.ITEM_FLAGS_BROKEN = 3; //  是否损坏的,耐久0
    SharedDef.ITEM_FLAGS_USABLE = 4; //  是否可用的
    SharedDef.ITEM_FLAGS_LOCKED = 5; //  物品锁定标志
    SharedDef.ITEM_FLAGS_REFUNDABLE = 6; //  可回购的
    SharedDef.ITEM_FLAGS_UNIQUE_EQUIPPED = 7; // 是否独特装备
    SharedDef.ITEM_FLAGS_SPECIALUSE = 8; //  特殊用途
    SharedDef.ITEM_FLAGS_BOP_TRADEABLE = 9; // 是否可交易的
    SharedDef.ITEM_FLAGS_IS_BINDED = 10; // 是否绑定
    SharedDef.ITEM_FLAGS_IS_JIPIN = 11; // 是否极品装备
    // 物品使用对象类型
    SharedDef.ITEM_USE_SELF = 0; // 自己
    SharedDef.ITEM_USE_TARGET = 1; // 目标
    SharedDef.ITEM_USE_NULL = 2; // 不可使用
    // 物物品使用结果类型
    SharedDef.ITEM_USE_RESULT_DISAPPEAR = 0; // 消失
    SharedDef.ITEM_USE_RESULT_NOT_DISAPPEAR = 1; // 不消失
    SharedDef.ITEM_USE_RESULT_SUB_DURABLE = 2; // 减少耐久
    SharedDef.ITEM_USE_RESULT_UN_USE = 3; // 不可使用
    // 道具返还类型
    SharedDef.LOG_ITEM_RETURN_TYPE_HAVE = 0; // 返还背包得到
    SharedDef.LOG_ITEM_RETURN_TYPE_LOSE = 1; // 返还背包失去
    SharedDef.LOG_ITEM_RETURN_TYPE_CLEAR = 2; // 返还背包清理
    SharedDef.LOG_ITEM_RETURN_TYPE_GOLD = 3; // 材料不足自动购买
    // 坐骑状态
    SharedDef.MOUNT_STATE_FREE = 0; // 空闲
    SharedDef.MOUNT_STATE_WAS_RIDING = 1; // 骑乘
    // 任务状态
    SharedDef.QUEST_STATUS_NONE = 0; //  
    SharedDef.QUEST_STATUS_COMPLETE = 1; // 完成
    SharedDef.QUEST_STATUS_UNAVAILABLE = 2; // 得不到的，没空的，不能利用的???
    SharedDef.QUEST_STATUS_INCOMPLETE = 3; // 不完全,未完成
    SharedDef.QUEST_STATUS_AVAILABLE = 4; // 有效，可接受
    SharedDef.QUEST_STATUS_FAILED = 5; // 失败
    SharedDef.QUEST_STATUS_END = 6; // 任务结束,已领奖
    SharedDef.QUEST_STATUS_SHOW_INCOMPLETE = 13; // 任务未完成显示用
    SharedDef.QUEST_STATUS_SHOW_END = 16; // 任务整个完成了, 显示用
    SharedDef.MAX_QUEST_STATUS = 17;
    SharedDef.BOOK_STATUS_NONE = 0;
    SharedDef.BOOK_STATUS_COMPLETE = 1; // 完成未领奖
    SharedDef.BOOK_STATUS_UNAVAILABLE = 2; // 得不到的，没空的，不能利用的
    SharedDef.BOOK_STATUS_INCOMPLETE = 3; // 不完全,未完成
    SharedDef.BOOK_STATUS_AVAILABLE = 4; // 有效，可接受
    SharedDef.BOOK_STATUS_FAILED = 5; // 失败
    SharedDef.BOOK_STATUS_REWARDED = 6; // 已领奖
    // 任务给予者状态
    SharedDef.DIALOG_STATUS_NONE = 0;
    SharedDef.DIALOG_STATUS_UNAVAILABLE = 1; //  任务给予者状态,忙碌
    SharedDef.DIALOG_STATUS_CHAT = 2; //  对话,3.1 - may be changed
    SharedDef.DIALOG_STATUS_INCOMPLETE = 5; //   未完成
    SharedDef.DIALOG_STATUS_REWARD_REP = 6; //  可重复领取奖励
    SharedDef.DIALOG_STATUS_AVAILABLE_REP = 7; //  可重复接受任务
    SharedDef.DIALOG_STATUS_AVAILABLE = 8; //  有可接任务
    SharedDef.DIALOG_STATUS_REWARD2 = 9; //  no yellow dot on minimap
    SharedDef.DIALOG_STATUS_REWARD = 10; //  报酬，报答，赏金,yellow dot on minimap
    SharedDef.MAX_DIALOG_STATUS = 11;
    // 任务标志
    //  Flags used at server and sent to client	
    SharedDef.QUEST_FLAGS_COMMIT_NOT_NEED_NPC = 256; //  提交任务是否校验npc
    SharedDef.QUEST_FLAGS_ACCEPT_NOT_NEED_NPC = 512; //  接受任务是否校验npc
    SharedDef.QUEST_FLAGS_DAILY = 1024; // 日常任务 Used to know quest is Daily one
    SharedDef.QUEST_FLAGS_AUTO_FAIL_OFF = 1; // 离线或者死亡或者跨系列图传送后直接任务失败
    SharedDef.QUEST_FLAGS_AUTO_COMPLETE = 16; // auto complete	
    SharedDef.QUEST_FLAGS_AUTO_REWARDED = 32; // 自动奖励 These quests are automatically rewarded on quest complete and they will never appear in quest log client side.
    SharedDef.QUEST_FLAGS_AUTO_ACCEPT = 64; // quests in starting areas
    SharedDef.QUEST_FLAGS_MANUAL = 128; // 手动完成	
    SharedDef.QUEST_FLAGS_CANREMOVE = 4096; // 允许放弃
    //  Mangos flags for set SpecialFlags in DB if required but used only at server
    SharedDef.QUEST_FLAGS_FLAGS_REPEATABLE = 65536; // 可重复接受的 Set by 1 in SpecialFlags from DB
    SharedDef.QUEST_FLAGS_FLAGS_EXPLORATION_OR_EVENT = 131072; // Set by 2 in SpecialFlags from DB (if required area explore, spell SPELL_EFFECT_QUEST_COMPLETE casting, table `*_script` command SCRIPT_COMMAND_QUEST_EXPLORED use, set from script DLL)
    SharedDef.QUEST_FLAGS_FLAGS_DB_ALLOWED = 65535;
    //  Mangos flags for internal use only
    SharedDef.QUEST_FLAGS_FLAGS_DELIVER = 262144; // Internal flag computed only,需要收集物品的
    SharedDef.QUEST_FLAGS_FLAGS_SPEAKTO = 524288; // Internal flag computed only,需要与NPC对话的
    SharedDef.QUEST_FLAGS_FLAGS_KILL_OR_CAST = 1048576; // Internal flag computed only,杀死怪物或者使用任务物品的
    SharedDef.QUEST_FLAGS_FLAGS_TIMED = 2097152; // 定时?Internal flag computed only
    SharedDef.QUEST_FLAGS_FLAGS_BUY_ITEM = 4194304; // 购买物品的任务
    SharedDef.QUEST_FLAGS_FLAGS_OPT_SYS = 8388608; // 操作系统的任务
    SharedDef.QUEST_FLAGS_FLAGS_LEVEL_CREATURE = 16777216; // 杀等级怪
    SharedDef.QUEST_FLAGS_FLAGS_LEVEL_PLAYER = 33554432; // 杀等级玩家
    SharedDef.QUEST_RELATION_TYPE_START = 0; // 待接任务
    SharedDef.QUEST_RELATION_TYPE_END = 1; // 待交任务
    // 任务更新操作
    SharedDef.QUEST_UNCHANGED = 0; // 未变化
    SharedDef.QUEST_CHANGED = 1; // 变化
    SharedDef.QUEST_NEW = 2;
    SharedDef.MAX_ACHIEVE_COUNT = 100;
    SharedDef.ACHIEVE_FIELD_REWARD = 0; // 0 是否已达成 1 是否已领奖 2 预留 3 预留
    SharedDef.ACHIEVE_FIELD_CURRENT = 1; // 成就进度
    SharedDef.MAX_ACHIEVE_FIELD = 2;
    //  最多可领取任务个数
    SharedDef.MAX_QUEST_COUNT = 50;
    //  最多可领取日常任务个数
    SharedDef.MAX_DAILY2_QUEST_COUNT = 10;
    //  最多可领取冒险任务个数
    SharedDef.MAX_ADVENTURE_QUEST_COUNT = 20;
    //  任务最多目标
    SharedDef.MAX_QUEST_TARGET_COUNT = 5;
    SharedDef.QUEST_TARGET_INFO_SHORT0 = 0; // 0:状态, 1:目标值
    SharedDef.QUEST_TARGET_INFO_PROCESS = 1; // 进度
    SharedDef.MAX_QUEST_TARGET_INFO_COUNT = 2;
    SharedDef.QUEST_INFO_ID = 0; // 任务id, 任务状态
    SharedDef.QUEST_INFO_STEP_START = 1; // 任务目标开始
    SharedDef.QUEST_INFO_STEP_END = 11; // 任务目标结束
    SharedDef.MAX_QUEST_INFO_COUNT = 11;
    SharedDef.MAX_TITLE_COUNT = 100;
    SharedDef.TITLE_FIELD_INFO = 0; // 0 ID 1 保留 16位
    SharedDef.TITLE_FIELD_TIME = 1; // 称号失效时间
    SharedDef.MAX_TITLE_FIELD = 2;
    SharedDef.WELFA_BACK_TYPE_COUNT = 10;
    SharedDef.WELFA_BACK_ITEM = 0;
    SharedDef.WELFA_BACK_ITEM_END = 8;
    SharedDef.WELFA_BACK_ITEM_NUM = 9;
    SharedDef.MAX_WELFA_BACK_ITEM = 10;
    // 运镖状态
    SharedDef.QUEST_ESCORT_STATE_NONE = 0; // 未开始运镖
    SharedDef.QUEST_ESCORT_STATE_NORMAL = 1; // 正常运镖
    SharedDef.QUEST_ESCORT_STATE_ROB = 2; // 已被劫镖
    // 任务 成就 称号 福利 相关字段
    SharedDef.QUEST_FIELD_ACHIEVE_START = 0; // 成就开始
    SharedDef.QUEST_FIELD_ACHIEVE_END = 200; // 成就结束
    SharedDef.QUEST_FIELD_ACHIEVE_ALL = 200; // 总成就点
    SharedDef.QUEST_FIELD_ACHIEVE_REWARD = 201; // 成就点奖励ID
    SharedDef.QUEST_FIELD_QUEST_START = 202; // 任务开始
    SharedDef.QUEST_FIELD_QUEST_END = 752; // 任务结束
    SharedDef.QUEST_FIELD_TITLE_START = 752; // 称号开始
    SharedDef.QUEST_FIELD_TITLE_END = 952; // 称号结束
    SharedDef.QUEST_FIELD_WELFARE_SHOUCHONG = 952; // 是否领取首冲奖励
    SharedDef.QUEST_FIELD_WELFARE_CHECKIN = 953; // 每日签到奖励领取标记 用位表示
    SharedDef.QUEST_FIELD_WELFARE_CHECKIN_ALL = 954; // 累积签到奖励领取标记 用位表示
    SharedDef.QUEST_FIELD_WELFARE_LEVEL = 955; // 升级福利奖励
    SharedDef.QUEST_FIELD_WELFARE_BACK_START = 956;
    SharedDef.QUEST_FIELD_WELFARE_BACK_END = 1056;
    SharedDef.QUEST_FIELD_DAILY2_FINISHED = 1056; //  日常任务完成个数
    SharedDef.QUEST_FIELD_DAILY2_SUBMIT = 1057; //  日常任务是否提交
    SharedDef.QUEST_FIELD_DAILY2_QUEST_START = 1058; //  日常任务开始
    SharedDef.QUEST_FIELD_DAILY2_QUEST_END = 1168; // 日常任务结束
    SharedDef.QUEST_FIELD_WELFARE_RECHARGE_REWARD_FLAG = 1168; // 累计充值奖励领取标记
    SharedDef.QUEST_FIELD_WELFARE_CONSUME_REWARD_FLAG = 1169; // 累计充值奖励领取标记
    SharedDef.QUEST_FIELD_WELFARE_SEVEN_DAY_PROCESS = 1170; // 七日大礼 进度
    SharedDef.QUEST_FIELD_WELFARE_SEVEN_DAY_FLAG = 1171; // 七日大礼 领取状态
    SharedDef.QUEST_FIELD_COUNT_TYPE_START = 1172; // 任务计数开始
    SharedDef.QUEST_FIELD_COUNT_TYPE_END = 1177; // 任务计数结束
    SharedDef.QUEST_FIELD_ADVENTURE_QUEST_START = 1178; //  冒险任务开始
    SharedDef.QUEST_FIELD_ADVENTURE_QUEST_END = 1398; // 冒险任务结束
    SharedDef.QUEST_FIELD_ESCORT_QUEST_START = 1399; //  押镖任务开始
    SharedDef.QUEST_FIELD_ESCORT_QUEST_END = 1410; // 押镖任务结束
    SharedDef.QUEST_FIELD_ESCORT_QUEST_FINISH_TIME = 1411; // 押镖任务结束时间
    // 战斗状态
    SharedDef.COMBAT_STATE_LEAVE = 0; // 脱离战斗
    SharedDef.COMBAT_STATE_ENTER = 1; // 进入战斗
    // 战斗状态
    SharedDef.UNIT_STAT_DIED = 1;
    SharedDef.UNIT_STAT_MELEE_ATTACKING = 2; //  player is melee attacking someone
    SharedDef.UNIT_STAT_CAST_SPELL = 4; //  引导技能
    SharedDef.UNIT_STAT_SPELL_PROCESS = 8; // 持续施法
    SharedDef.UNIT_STAT_ROAMING = 16; // 漫游
    SharedDef.UNIT_STAT_CHASE = 32; // 追逐
    SharedDef.UNIT_STAT_SEARCHING = 64; // 搜索
    SharedDef.UNIT_STAT_FLEEING = 128; // 逃避
    SharedDef.UNIT_STAT_IN_FLIGHT = 256; //  player is in flight mode
    SharedDef.UNIT_STAT_FOLLOW = 512; // 跟随
    SharedDef.UNIT_STAT_ROOT = 1024; // 缠绕???
    SharedDef.UNIT_STAT_CONFUSED = 2048; // 使困惑
    SharedDef.UNIT_STAT_DISTRACTED = 4096; // 转移,使分心
    SharedDef.UNIT_STAT_ISOLATED = 8192; //  隔离,光环无法影响其他玩家 area auras do not affect other players
    SharedDef.UNIT_STAT_ATTACK_PLAYER = 16384; //  攻击
    SharedDef.UNIT_STAT_ALL_STATE = 65535; // (UNIT_STAT_STOPPED | UNIT_STAT_MOVING | UNIT_STAT_IN_COMBAT | UNIT_STAT_IN_FLIGHT)
    // 生存状态
    SharedDef.DEATH_STATE_ALIVE = 0; // 活着
    SharedDef.DEATH_STATE_CORPSE = 1; // 尸体，在客户端可见尸体
    SharedDef.DEATH_STATE_DEAD = 2; // 死亡，在客户端尸体消失
    // 击打信息，例如吸收，致命一击等等
    SharedDef.HITINFO_NORMALSWING = 1; // 普通
    SharedDef.HITINFO_CRITHIT = 2; // 暴击
    SharedDef.HITINFO_MISS = 3; // 躲避
    SharedDef.HITINFO_GEDANG = 4; // 格挡
    SharedDef.HITINFO_CRITICALHIT = 5; // 会心一击
    SharedDef.HITINFO_BLOWFLY = 6; // 击飞
    SharedDef.HITINFO_LIUXUE = 7; // 流血
    SharedDef.HITINFO_CURE = 8; // 治疗
    SharedDef.HITINFO_JUMP_EVA = 9; // 跳闪
    SharedDef.HITINFO_POISON = 10; // 毒
    SharedDef.HITINFO_ICE = 11; // 冰
    SharedDef.HITINFO_FANTANSHANGHAI = 12; // 反弹伤害
    // 移动状态
    SharedDef.MOVE_STATUS_STOP = 0;
    SharedDef.MOVE_STATUS_RUN = 1;
    // NPC标识
    // / Non Player Character flags
    SharedDef.UNIT_NPC_FLAG_NONE = -1;
    SharedDef.UNIT_NPC_FLAG_GOSSIP = 0; //  100%闲聊NPC
    SharedDef.UNIT_NPC_FLAG_QUESTGIVER = 1; //  任务发布PCguessed, probably ok
    SharedDef.UNIT_NPC_FLAG_UNK1 = 2; // 预留
    SharedDef.UNIT_NPC_FLAG_UNK2 = 3;
    SharedDef.UNIT_NPC_FLAG_TRAINER = 4; //  100%  训练师
    SharedDef.UNIT_NPC_FLAG_TRAINER_CLASS = 5; //  100%  职业训练师
    SharedDef.UNIT_NPC_FLAG_TRAINER_PROFESSION = 6; //  100%  自由职业训练师？
    SharedDef.UNIT_NPC_FLAG_VENDOR = 7; //  100%  买卖商人
    SharedDef.UNIT_NPC_FLAG_VENDOR_PROP = 8; //  100%, 道具
    SharedDef.UNIT_NPC_FLAG_VENDOR_WEAPON = 9; //  100%  武器
    SharedDef.UNIT_NPC_FLAG_VENDOR_POISON = 10; //  药品
    SharedDef.UNIT_NPC_FLAG_VENDOR_REAGENT = 11; //  100%  饰品
    SharedDef.UNIT_NPC_FLAG_VENDOR_EQUIPMENT = 12; //  100%  装备
    SharedDef.UNIT_NPC_FLAG_FLIGHTMASTER = 13; //  100% 飞行点管理员
    SharedDef.UNIT_NPC_FLAG_SPIRITHEALER = 14; //  guessed 复活Npc
    SharedDef.UNIT_NPC_FLAG_SPIRITGUIDE = 15; //  guessed 灵魂向导
    SharedDef.UNIT_NPC_FLAG_INNKEEPER = 16; //  100% 旅店老板
    SharedDef.UNIT_NPC_FLAG_WAREHOUSE = 17; //  100% 仓库
    SharedDef.UNIT_NPC_FLAG_PETITIONER = 18; //  100% 竞技场
    SharedDef.UNIT_NPC_FLAG_TABARDDESIGNER = 19; //  100%工会徽章设计NPC
    SharedDef.UNIT_NPC_FLAG_BATTLEMASTER = 20; //  100%战场管理员
    SharedDef.UNIT_NPC_FLAG_AUCTIONEER = 21; //  100%拍卖商
    SharedDef.UNIT_NPC_FLAG_STABLEMASTER = 22; //  100%马夫
    SharedDef.UNIT_NPC_FLAG_GUILD_BANKER = 23; //  公会银行cause client to send 997 opcode
    SharedDef.UNIT_NPC_FLAG_CHALLENGE = 24; //  神奇的挑战怪要变大变粗,UNIT_NPC_FLAG_GUARD
    SharedDef.UNIT_NPC_FLAG_ONE_ONE = 25; //  是否光棍怪,没钱，没精验，没装备，没次数
    // 所有固定的BUFF => buff id要与表buff_template的id对应
    SharedDef.BUFF_ONEPOINTFIVE_JINGYAN = 101; // 1.5倍经验丹
    SharedDef.BUFF_TOW_JINGYAN = 102; // 2倍经验丹
    SharedDef.BUFF_THREE_JINGYAN = 103; // 3倍经验丹
    SharedDef.BUFF_FIVE_JINGYAN = 104; // 5倍经验丹
    SharedDef.BUFF_FANTAN = 105; // 反弹
    SharedDef.BUFF_LIANJIE = 106; // 连接
    SharedDef.BUFF_BEILIANJIE = 107; // 被连接
    SharedDef.BUFF_GANGCI = 108; // 钢刺
    SharedDef.BUFF_DINGSHEN = 109; // 定身
    SharedDef.BUFF_YUNXUAN = 110; // 晕眩
    SharedDef.BUFF_YUNMIE_ELING = 111; // 陨灭（恶灵）
    SharedDef.BUFF_HUIFU_HUDUN = 112; // 恢复护盾
    SharedDef.BUFF_FANJI_HUDUN = 113; // 反击护盾
    SharedDef.BUFF_LINGXUE = 114; // 流血
    SharedDef.BUFF_ZHUOSHAO = 115; // 灼烧
    SharedDef.BUFF_JUDU = 116; // 剧毒
    SharedDef.BUFF_ZHONGDU = 117; // 中毒
    SharedDef.BUFF_BINGJIA = 118; // 冰甲
    SharedDef.BUFF_BINGDONG = 119; // 冰冻
    SharedDef.BUFF_BAOZHA_DILEI = 120; // 爆炸（地雷）
    SharedDef.BUFF_SHOUWEI_ZHAOHUAN = 121; // 守卫（召唤）
    SharedDef.BUFF_BIAOJI = 122; // 标记
    SharedDef.BUFF_KUANGBAO = 123; // 狂暴
    SharedDef.BUFF_JIANSU = 124; // 减速
    SharedDef.BUFF_CHENMO = 125; // 沉默
    SharedDef.BUFF_XUECHI = 126; // 血池
    SharedDef.BUFF_WAIGONGMIANYI = 127; // 外攻免疫
    SharedDef.BUFF_NEIGONGMIAN = 128; // 内攻免疫
    SharedDef.BUFF_WUDI = 129; // 无敌
    SharedDef.BUFF_ZHANSHEN_FUTI = 130; // 战神附体
    SharedDef.BUFF_JINGANG_BUHUAITI = 131; // 金刚不坏体
    SharedDef.BUFF_KUANGBEN = 132; // 狂奔
    SharedDef.BUFF_HUOBA = 133; // 火把
    SharedDef.BUFF_LINGTI = 134; // 灵体
    SharedDef.BUFF_HUANHUA_ZHU = 135; // 幻化成猪
    SharedDef.BUFF_HUANHUA_REN = 136; // 幻化成人
    SharedDef.BUFF_HUANHUA_GUI = 137; // 幻化成鬼
    SharedDef.BUFF_HUANHUA_XIAN = 138; // 幻化成仙
    SharedDef.BUFF_HUANHUA_XIULUO = 139; // 幻化成修罗
    SharedDef.BUFF_XIULUOLI = 140; // 修罗力
    SharedDef.BUFF_ZHENYING = 141; // 阵营
    SharedDef.BUFF_ZHANDOU_STATE = 142; // 战斗状态
    SharedDef.BUFF_JUMP_DOWN = 144; // 身轻
    SharedDef.BUFF_ANXIANG_SHUYING = 145; // 暗香疏影
    SharedDef.BUFF_ZHIKONG = 146; // 滞空
    SharedDef.BUFF_FUKONG = 147; // 浮空
    SharedDef.BUFF_JUMP_JUMP = 143; // 跳跃
    SharedDef.BUFF_NEW_PLAYER_PROTECTED = 148; // 新手保护
    SharedDef.BUFF_DEATH_PROTECTED = 149; // 死亡保护
    SharedDef.BUFF_INVINCIBLE = 150; // 无敌
    SharedDef.BUFF_INVISIBLE = 151; // 隐身
    SharedDef.BUFF_YINCHANG = 152; // 吟唱
    SharedDef.BUFF_ROAR = 153; // 狂吼
    SharedDef.BUFF_HEAL = 200; // 百分比回血
    SharedDef.BUFF_ATTACK = 201; // 攻击增强
    SharedDef.BUFF_ARMOR = 202; // 防御增强
    SharedDef.BUFF_CRIT = 203; // 暴击增强
    SharedDef.BUFF_ALLATTR = 204; // 全属性增强
    SharedDef.BUFF_DEFAULT_EFFECT_ID_JUMP_JUMP = 1; // 默认的跳跃buff的效果id
    SharedDef.BUFF_DEFAULT_EFFECT_ID_NEW_PLAYER_PROTECTED = 2; // 默认的新手保护buff的效果id
    SharedDef.BUFF_DEFAULT_EFFECT_ID_DEATH_PROTECTED = 3; // 默认的死亡保护buff的效果id
    SharedDef.MAX_2JI_SHIJIAN_UINT32 = 20; // 红颜2级事件uint32
    SharedDef.MAX_HONGYAN_DATI_COUNT = 10; // 红颜最大答题次数
    // 红颜系统操作枚举
    SharedDef.HONGYAN_JIESHI_MEIREN = 0; // --结识美人
    SharedDef.HONGYAN_DIANZAN = 1; // --点赞
    SharedDef.HONGYAN_PINGJIA = 2; // --评价
    SharedDef.HONGYAN_SHIZHUANG_JIHUO = 3; // --时装激活
    SharedDef.HONGYAN_SHIZHUANG_CHUANDAI = 4; // --时装穿戴
    SharedDef.HONGYAN_XIANGCE_JIHUO = 5; // --相册激活
    SharedDef.HONGYAN_SHIJIAN_CHULI = 6; // --事件处理
    SharedDef.HONGYAN_CHUYOU = 7; // --出游
    SharedDef.HONGYAN_HUIFU_HUOLI = 8; // --恢复活力值
    SharedDef.HONGYAN_ADD_NEIWU_SHIJIAN = 9; // --增加内务事件
    // 红颜系统玩家属性
    SharedDef.HONGYAN_PLAYER_ATTRS_XIAYI = 0; // --侠义值
    SharedDef.HONGYAN_PLAYER_ATTRS_FENGLIU = 1; // --风流
    SharedDef.HONGYAN_PLAYER_ATTRS_MINGSHENG = 2; // --名声
    SharedDef.HONGYAN_PLAYER_ATTRS_WENTAO = 3; // --文韬
    SharedDef.HONGYAN_PLAYER_ATTRS_WULUE = 4; // --武略
    SharedDef.HONGYAN_PLAYER_ATTRS_CAIYI = 5; // --才艺
    SharedDef.HONGYAN_PLAYER_ATTRS_QINHE = 6; // --亲和
    SharedDef.HONGYAN_PLAYER_ATTRS_LIYI = 7; // --礼仪
    SharedDef.HONGYAN_PLAYER_ATTRS_XIANGMAO = 8; // --相貌
    SharedDef.HONGYAN_PLAYER_ATTRS_HUOLI = 9; // --活力
    SharedDef.MAX_PLAYER_ATTRS = 10;
    // 红颜系统美人属性
    SharedDef.HONGYAN_MEIREN_ATTRS_JIESHI_BIT = 0; // 0:是否结识  1~31：结识条件
    SharedDef.HONGYAN_MEIREN_ATTRS_XINGGE_BIT = 1; // 性格
    SharedDef.HONGYAN_MEIREN_ATTRS_AIHAO_BIT = 2; // 爱好
    SharedDef.HONGYAN_MEIREN_ATTRS_CHANGJING_BIT = 3; // 场景
    SharedDef.HONGYAN_MEIREN_ATTRS_SHIZHUANG_BIT = 4; // 时装
    SharedDef.HONGYAN_MEIREN_QINMIDU_UINT16 = 5; // 0：亲密度 1:当前穿戴的时装ID
    SharedDef.HONGYAN_MEIREN_XIANGCE_BIT = 6; // 美人激活的相册
    SharedDef.MAX_MEIREN_ATTRS_TYPE = 7;
    // 红颜系统美人人气值
    SharedDef.HONGYAN_MEIREN_DIANZAN = 0; // 点赞
    SharedDef.HONGYAN_MEIREN_MEIHAO = 1; // 美貌
    SharedDef.HONGYAN_MEIREN_JIESHI_COUNT = 2; // 美人结识的玩家数量
    SharedDef.MAX_MEIREN_RENQI_TYPE = 3;
    // 红颜系统美人表
    SharedDef.HONGYAN_CAIXUE = 0; // 采雪
    SharedDef.HONGYAN_ZHENFEI = 1; // 珍妃
    SharedDef.HONGYAN_YANLIN = 2; // 燕琳
    SharedDef.HONGYAN_MURONGYANYAN = 3; // 慕容嫣嫣
    SharedDef.HONGYAN_YAORU = 4; // 瑶如
    SharedDef.HONGYAN_XIANGJING = 5; // 项晶
    SharedDef.HONGYAN_HENGXIAOZHUO = 6; // 桓小卓
    SharedDef.HONGYAN_LIJI = 7; // 俪姬
    SharedDef.HONGYAN_SIQI = 8; // 思绮
    SharedDef.HONGYAN_YOUYOU = 9; // 幽幽
    SharedDef.HONGYAN_LINCHUER = 10; // 林楚儿
    SharedDef.HONGYAN_WANYAN_YUNNA = 11; // 完颜云娜
    SharedDef.HONGYAN_QUANHUIQIAO = 12; // 全慧乔
    SharedDef.HONGYAN_TUOBALVZHU = 13; // 拓跋绿珠
    SharedDef.HONGYAN_QINGYAN = 14; // 轻颜
    SharedDef.HONGYAN_SUOMOER = 15; // 索沫儿
    SharedDef.HONGYAN_GUQIANQIAN = 16; // 谷纤纤
    SharedDef.HONGYAN_AYIGULI = 17; // 阿依古丽
    SharedDef.HONGYAN_ZUOYUYI = 18; // 左玉怡
    SharedDef.HONGYAN_ZILUO = 19; // 紫罗
    SharedDef.HONGYAN_QUNUO = 20; // 曲诺
    SharedDef.HONGYAN_XUANYING = 21; // 玄樱
    SharedDef.MAX_MEIREN = 32;
    // 所有GM命令的定义
    SharedDef.GM_COMMAND_NULL = 0; // 空命令
    SharedDef.GM_COMMAND_JIULONGCHAO = 1; // @天书世界
    SharedDef.GM_COMMAND_SUCAI = 2; // @素材
    SharedDef.GM_COMMAND_JIAOBEN = 3; // @脚本
    SharedDef.GM_COMMAND_TI = 4; // @踢
    SharedDef.GM_COMMAND_ZAIXIAN = 5; // @在线
    SharedDef.GM_COMMAND_DITURENSHU = 6; // @地图人数
    SharedDef.GM_COMMAND_ZHAOCAI = 7; // @招财
    SharedDef.GM_COMMAND_ZHIZAO = 8; // @制造
    SharedDef.GM_COMMAND_QINGLI = 9; // @清理
    SharedDef.GM_COMMAND_ZHUANGBEI = 10; // @装备
    SharedDef.GM_COMMAND_PAIHANGBANG = 12; // @排行榜
    SharedDef.GM_COMMAND_YOUJIAN = 13; // @邮件
    SharedDef.GM_COMMAND_BENGDIAO = 15; // @崩掉
    SharedDef.GM_COMMAND_BANGZHU = 16; // @帮助
    SharedDef.GM_COMMAND_GONGGAO = 17; // @公告
    SharedDef.GM_COMMAND_SHIJIETISHI = 18; // @世界提示
    SharedDef.GM_COMMAND_PAIDUI = 19; // @排队
    SharedDef.GM_COMMAND_PINGBICI = 20; // @屏蔽词
    SharedDef.GM_COMMAND_GUANBIFUWUQI = 21; // @关闭服务器
    SharedDef.GM_COMMAND_CHONGZHI = 22; // @充值
    SharedDef.GM_COMMAND_GUANBIDITU = 23; // @关闭地图
    SharedDef.GM_COMMAND_DENGJI = 24; // @等级
    SharedDef.GM_COMMAND_QINGLIRENWUWUPIN = 25; // @清理任务物品
    SharedDef.GM_COMMAND_QINGLIRENWU = 26; // @清理任务
    SharedDef.GM_COMMAND_WANCHENGRENWU = 27; // @完成任务
    SharedDef.GM_COMMAND_JIESHOURENWU = 28; // @接受任务
    SharedDef.GM_COMMAND_GANDIAO = 29; // @干掉
    SharedDef.GM_COMMAND_SHUAGUAI = 30; // @刷怪
    SharedDef.GM_COMMAND_CHUANSONG = 31; // @传送
    SharedDef.GM_COMMAND_XIAZOU = 32; // @瞎走
    SharedDef.GM_COMMAND_SUICIDE = 33; // @自爆
    SharedDef.GM_COMMAND_SERVER_INFO = 34; // @服务器
    SharedDef.GM_COMMAND_DB = 35; // @数据库
    SharedDef.GM_COMMAND_KAIFUSHIJIAN = 36; // @开服时间
    SharedDef.GM_COMMAND_TEST_SHUJU = 37; // @测试数据
    SharedDef.GM_COMMAND_UPDATE_SERVER = 38; // @更新服务器
    SharedDef.GM_COMMAND_RESESSION_OPTS = 39; // @协议注册
    SharedDef.GM_COMMAND_RENWUTIAOZHUAN = 40; // @任务跳转
    SharedDef.GM_COMMAND_BACKUP_DATA = 41; // @备份数据
    SharedDef.GM_COMMAND_RETURN_DATA = 42; // @回档数据
    SharedDef.GM_COMMAND_PRINT_OBJECT = 43; // @打印对象
    SharedDef.GM_COMMAND_TEST_HEFU = 44; // @测试合服
    SharedDef.GM_COMMAND_CLEAR_PAIHANGBANG = 45; // @清空排行榜
    SharedDef.GM_COMMAND_MEMORY_RECOVERY = 46; // @内存回收
    SharedDef.GM_COMMAND_PRINT_MAP = 47; // @打印地图
    SharedDef.GM_COMMAND_DEL_MAP_INFO = 48; // @清空地图信息
    SharedDef.GM_COMMAND_RESTORE_SYSTEM = 49; // @后台命令
    SharedDef.GM_COMMAND_CALL_REMOVE_ITEM = 50; // @清空物品监听
    SharedDef.GM_COMMAND_SUBLINE = 51; // @分线
    SharedDef.GM_COMMAND_CUSTOM = 52; // @CUSTOM
    SharedDef.GM_COMMAND_VIP = 53; // @VIP
    SharedDef.GM_COMMAND_SELF_KILL = 54; // @自杀
    // 查询玩家信息的时候，需要附带的信息
    SharedDef.QUERY_PLAYER_FLAG_BASE = 0; // 玩家基础信息
    SharedDef.QUERY_PLAYER_FLAG_NAME = 1; // 玩家姓名
    SharedDef.QUERY_PLAYER_FLAG_EQUIP = 2; // 玩家装备形象
    SharedDef.QUERY_PLAYER_FLAG_PIFENG = 3; // 披风信息
    SharedDef.QUERY_PLAYER_FLAG_FORCE = 4; // 玩家战斗力
    SharedDef.QUERY_PLAYER_FLAG_OTHER = 5; // 其它信息
    // 下面是非玩家下标的东西
    SharedDef.QUERY_PLAYER_FLAG_MOUNT = 20; // 所有坐骑
    SharedDef.QUERY_PLAYER_FLAG_EQUIP_BAG = 21; // 装备包裹
    SharedDef.QUERY_PLAYER_FLAG_MAIN_BAG = 22; // 背包包裹
    SharedDef.QUERY_PLAYER_FLAG_STORAGE_BAG = 23; // 仓库包裹
    SharedDef.QUERY_PLAYER_FLAG_STALL_BAG = 24; // 摊位包裹	
    // 任务类型定义
    SharedDef.QUEST_TYPE_MAIN = 0; // 主线任务
    SharedDef.QUEST_TYPE_EXTENSIONS = 1; // 支线任务
    SharedDef.QUEST_TYPE_ACTIVITY = 2; // 活动任务
    SharedDef.QUEST_TYPE_QIYU = 3; // 奇遇任务
    SharedDef.QUEST_TYPE_DAILY = 4; // 每日环任务
    SharedDef.QUEST_TYPE_DAILY2 = 5; // 日常任务
    SharedDef.QUEST_TYPE_ADVENTURE = 6; // 冒险任务
    SharedDef.QUEST_TYPE_ESCORT = 7; // 押镖任务
    //  任务目标类型定义
    SharedDef.QUEST_TARGET_TYPE_PLAYER_LEVEL = 1; // 人物等级
    SharedDef.QUEST_TARGET_TYPE_PLAYER_FORCE = 2; // 人物战力
    SharedDef.QUEST_TARGET_TYPE_FACTION = 3; // 加入或创建家族
    SharedDef.QUEST_TARGET_TYPE_FACTION_DONATION = 4; // 捐赠
    SharedDef.QUEST_TARGET_TYPE_FACTION_ACTIVITY = 5; // 家族活动
    SharedDef.QUEST_TARGET_TYPE_FIELD_BOSS = 6; // 参加野外BOSS
    SharedDef.QUEST_TARGET_TYPE_WORLD_BOSS = 7; // 参加世界BOSS
    SharedDef.QUEST_TARGET_TYPE_RESOURCE_INSTANCE = 8; // 挑战资源副本
    SharedDef.QUEST_TARGET_TYPE_TRIAL_INSTANCE = 9; // 挑战试练副本
    SharedDef.QUEST_TARGET_TYPE_OWN_DIVINE = 10; // 获得任意神兵
    SharedDef.QUEST_TARGET_TYPE_EQUIP_DIVINE = 11; // 装备任意神兵
    SharedDef.QUEST_TARGET_TYPE_STRENGTH_DIVINE = 12; // 强化任意神兵
    SharedDef.QUEST_TARGET_TYPE_RAISE_SKILL = 13; // 升级技能
    SharedDef.QUEST_TARGET_TYPE_TRAIN_MOUNT = 14; // 培养坐骑
    SharedDef.QUEST_TARGET_TYPE_RAISE_MOUNT_SKILL = 15; // 升级坐骑任意技能
    SharedDef.QUEST_TARGET_TYPE_FRIEND_DONATION = 16; // 赠送好友礼物
    SharedDef.QUEST_TARGET_TYPE_STRENGTH_SUIT = 17; // 强化装备
    SharedDef.QUEST_TARGET_TYPE_STRENGTH_GEM = 18; // 强化宝石
    SharedDef.QUEST_TARGET_TYPE_TALK = 19; // 对话
    SharedDef.QUEST_TARGET_TYPE_PICK_GAME_OBJECT = 20; // 采集
    SharedDef.QUEST_TARGET_TYPE_CHECK_GAME_OBJECT = 21; // 检查
    SharedDef.QUEST_TARGET_TYPE_KILL_MONSTER = 22; // 击杀怪物
    SharedDef.QUEST_TARGET_TYPE_USE_ITEM = 23; // 使用物品
    SharedDef.QUEST_TARGET_TYPE_SUIT = 24; // 进行穿戴装备
    SharedDef.QUEST_TARGET_TYPE_MOUNT_LEVEL = 25; // 坐骑达到x
    SharedDef.QUEST_TARGET_TYPE_FRIEND_NUM = 26; // 拥有好友x
    SharedDef.QUEST_TARGET_TYPE_KILL_MONSTER_NUM = 27; // 击杀怪物x
    SharedDef.QUEST_TARGET_TYPE_DIVINE_NUM = 28; // 拥有神兵x
    SharedDef.QUEST_TARGET_TYPE_DIVINE_LEV = 29; // 神兵等级x
    SharedDef.QUEST_TARGET_TYPE_DOUJIANTAI = 30; // 斗剑台胜利x
    SharedDef.QUEST_TARGET_TYPE_TITLE_NUMBER = 31; // 称号数量达到x个
    SharedDef.QUEST_TARGET_TYPE_FASHION_NUMBER = 32; // 时装数量达到x个
    SharedDef.QUEST_TARGET_TYPE_ACHIEVE = 40; // 成就点数达到X点
    SharedDef.QUEST_TARGET_TYPE_SUIT_TITLE = 41; // 佩戴X称号
    SharedDef.QUEST_TARGET_TYPE_SUIT_FASHION = 42; // 穿上时装X
    SharedDef.QUEST_TARGET_TYPE_JOIN_DOUJIANTAI = 43; // 参与X次斗剑台
    SharedDef.QUEST_TARGET_TYPE_JOIN_KUAFU_3V3 = 44; // 参与X次3V3
    SharedDef.QUEST_TARGET_TYPE_WIN_KUAFU_3V3 = 45; // 3v3获胜x次
    SharedDef.QUEST_TARGET_TYPE_JOIN_XIANFU = 46; // 参与X次仙府夺宝
    SharedDef.QUEST_TARGET_TYPE_WIN_XIANFU = 47; // 仙府夺宝获胜X次
    SharedDef.QUEST_TARGET_TYPE_KILL_MONSTER_COLLECT = 48; // 杀怪收集物品
    SharedDef.QUEST_TARGET_TYPE_TURN_ITEM_IN = 49; // 上交物品
    SharedDef.QUEST_TARGET_TYPE_PASS_WORLD_RISK = 50; // 世界冒险通关
    SharedDef.QUEST_TARGET_TYPE_SMELT = 51; // 熔炼装备
    SharedDef.QUEST_TARGET_TYPE_CONTRIBUTE_TIMES = 52; // 为女王贡献次数
    SharedDef.QUEST_TARGET_TYPE_CONTRIBUTE_TOTAL_TIMES = 53; // 为女王贡献总次数
    SharedDef.QUEST_TARGET_TYPE_CONTRIBUTE_CHARM = 54; // 为女王贡献魅力值
    SharedDef.QUEST_TARGET_TYPE_CONTRIBUTE_ITEM = 55; // 为女王贡献道具
    SharedDef.QUEST_TARGET_TYPE_LOOT_ITEM = 56; // 收集某些道具
    SharedDef.QUEST_TARGET_TYPE_SINGLE_THX_TIMES = 57; // 女王单任务感谢次数
    SharedDef.QUEST_TARGET_TYPE_TOTAL_THX_TIMES = 58; // 女王累计感谢次数
    SharedDef.QUEST_TARGET_TYPE_WINGS_UPGRADE_LEVEL = 59; // 翅膀进阶等级达到X
    SharedDef.QUEST_TARGET_TYPE_WINGS_UPDRADE_TIMES = 60; // 翅膀进阶升级X次
    SharedDef.QUEST_TARGET_TYPE_WINGS_STRENGTH_LEVEL = 61; // 翅膀强化等级达到X
    SharedDef.QUEST_TARGET_TYPE_WINGS_STRENGTH_TIMES = 62; // 翅膀强化升级X次
    SharedDef.QUEST_TARGET_TYPE_TALISMAN_LEVEL = 63; // 升级任意法宝到X级
    SharedDef.QUEST_TARGET_TYPE_MOUNT_STRENGTH_LEVEL = 64; // 坐骑强化等级达到X
    SharedDef.QUEST_TARGET_TYPE_REFINE_SUIT = 65; // 指定槽位装备精炼x次
    SharedDef.QUEST_TARGET_TYPE_WASH_SUIT = 66; // 指定槽位装备洗炼x次
    SharedDef.QUEST_TARGET_TYPE_MERIDIAN_LEVEL = 67; // 经脉升到X级
    SharedDef.QUEST_TARGET_TYPE_JOIN_SINGLE_PVP = 68; // 参加排位赛X次
    SharedDef.QUEST_TARGET_TYPE_SINGLE_PVP_WINS = 69; // 排位赛胜利X次
    SharedDef.QUEST_TARGET_TYPE_ACTIVE_TASK = 70; // 完成X个活跃任务
    SharedDef.QUEST_TARGET_TYPE_DAILY_TASK = 71; // 完成X轮日常任务
    SharedDef.QUEST_TARGET_TYPE_GEM_TOTAL_LEVEL = 72; // 所有宝石总等级升到X级
    SharedDef.QUEST_TARGET_TYPE_WINGS_BLESS_TIMES = 73; // 翅膀祝福X次
    SharedDef.QUEST_TARGET_TYPE_MONEYTREE_TIMES = 74; // 使用摇钱树X次
    SharedDef.QUEST_TARGET_TYPE_JOIN_MASS_BOSS_TIMES = 75; // 参与X次全民Boss
    SharedDef.QUEST_TARGET_TYPE_MAIN_SKILL_UPGRADE_LEVEL = 76; // 升级X个主动技能到Y级
    SharedDef.QUEST_TARGET_TYPE_SUB_SKILL_UPGRADE_LEVEL = 77; // 升级X个被动技能到Y级
    SharedDef.QUEST_TARGET_TYPE_FINISH_QUEST_COUNT_TYPE_TIMES = 78; // 完成某计数类型任务总记达到X次
    SharedDef.QUEST_TARGET_TYPE_ADVENTURE_SKILL_UPGRADE_LEVEL = 79; // 将N个神器技能升级到X级
    SharedDef.QUEST_TARGET_TYPE_ADVENTURE_QUEST_FINISH_TIMES = 80; // 完成N个历练任务
    SharedDef.QUEST_TARGET_TYPE_EQUIPS_FIT_REQUIRE = 81; // 身上穿X级以上，Y品质以上的装备大于等于N件
    SharedDef.QUEST_TARGET_TYPE_ADVENTURE_QUEST_FINISH_TODAY = 82; // 完成1次历练任务X
    // 货币处理类型
    SharedDef.CURRENCY_HANDLE_TYPE_ADD = 0; // 增加
    SharedDef.CURRENCY_HANDLE_TYPE_SUB = 1; // 减少
    // 技能有效时间技能ID枚举
    SharedDef.SPELL_VALID_TIME_POTIAN_2 = 0; // 破天二式
    SharedDef.SPELL_VALID_TIME_POTIAN_3 = 1; // 破天三式
    SharedDef.SPELL_VALID_TIME_YUNFEI_2 = 2; // 云飞玉皇·二段
    SharedDef.SPELL_VALID_TIME_YUNFEI_3 = 3; // 云飞玉皇·三段
    SharedDef.SPELL_VALID_TIME_FENGFAN_2 = 4; // 风翻云变·二段
    SharedDef.SPELL_VALID_TIME_ZHUXIAN_2 = 5; // 诛仙剑阵·二段
    SharedDef.SPELL_VALID_TIME_ZHUXIAN_3 = 6; // 诛仙剑阵·三段
    SharedDef.MAX_SPELL_VALID = 15;
    SharedDef.MAX_SPELL_SLOT = 6;
    SharedDef.NOMAL_ATTACK_TIME = 1300;
    SharedDef.NOMAL_MOVE_SPEED = 130;
    SharedDef.MAX_ITEM_SPELL = 3;
    SharedDef.MAX_BASE_ATTR_FIELD_COUNT = 15; // 附加属性最大条数
    SharedDef.MAX_BUFF = 50; // 玩家身上最大buff数
    SharedDef.MAX_UNIT_BUFF = 16; // 精灵身上最大buff数
    // 装备类型包括时装 从头到脚
    // 普通装备
    SharedDef.EQUIPMENT_TYPE_OTHER = 0; // 其他
    SharedDef.EQUIPMENT_TYPE_MAIN_WEAPON = 1; // 武器
    SharedDef.EQUIPMENT_TYPE_COAT = 2; // 衣服
    SharedDef.EQUIPMENT_TYPE_LEG = 3; // 护腕
    SharedDef.EQUIPMENT_TYPE_BELT = 4; // 腰带
    SharedDef.EQUIPMENT_TYPE_SHOES = 5; // 鞋子
    SharedDef.EQUIPMENT_TYPE_HELMET = 6; // 头盔
    SharedDef.EQUIPMENT_TYPE_NECKLACE = 7; // 项链
    SharedDef.EQUIPMENT_TYPE_PANTS = 8; // 裤子
    SharedDef.EQUIPMENT_TYPE_LRING = 9; // 左戒指
    SharedDef.EQUIPMENT_TYPE_BRACELET = 10; // 玉佩
    SharedDef.EQUIPMENT_TYPE_CLOAK = 11; // 披风
    SharedDef.EQUIPMENT_TYPE_RRING = 12; // 右戒指
    SharedDef.EQUIPMENT_TYPE_FASHION = 13; // 时装
    SharedDef.EQUIPMENT_TYPE_RESERVE3 = 14; // 预留
    SharedDef.EQUIPMENT_TYPE_RESERVE4 = 15; // 预留
    SharedDef.EQUIPMENT_TYPE_RESERVE5 = 16; // 预留
    SharedDef.EQUIPMENT_TYPE_RESERVE6 = 17; // 预留
    SharedDef.EQUIPMENT_TYPE_RESERVE7 = 18; // 预留
    SharedDef.EQUIPMENT_TYPE_RESERVE8 = 19; // 预留
    SharedDef.EQUIPMENT_TYPE_MAX_POS = 20; // 最大位置
    // 时装类型接在普通装备后面 从头到脚
    SharedDef.FASHION_TYPE_MAIN_WEAPON = 20; // 头盔 预留
    SharedDef.FASHION_TYPE_HELMET = 21; // 耳坠
    SharedDef.FASHION_TYPE_COAT = 22; // 项链
    SharedDef.FASHION_TYPE_BELT = 23; // 披风
    SharedDef.FASHION_TYPE_LEG = 24; // 护肩 预留
    SharedDef.FASHION_TYPE_PANTS = 25; // 衣服
    SharedDef.FASHION_TYPE_SHOES = 26; // 主手武器
    SharedDef.FASHION_TYPE_BRACELET = 27; // 副手武器
    SharedDef.FASHION_TYPE_NECKLACE = 28; // 手镯 
    SharedDef.FASHION_TYPE_RING = 29; // 腰带
    SharedDef.FASHION_TYPE_CLOAK = 30; // 护手
    SharedDef.FASHION_TYPE_RESERVE1 = 31; // 裤子 预留
    SharedDef.FASHION_TYPE_RESERVE2 = 32; // 鞋子 预留
    SharedDef.FASHION_TYPE_RESERVE3 = 33; // 特殊武器时装,现作为无双方天戟下标
    SharedDef.FASHION_TYPE_RESERVE4 = 34; // 指环
    SharedDef.FASHION_TYPE_RESERVE5 = 35; // 玉玺
    SharedDef.FASHION_TYPE_RESERVE6 = 36; // 结婚戒指
    SharedDef.FASHION_TYPE_RESERVE7 = 37; // 护符左
    SharedDef.FASHION_TYPE_RESERVE8 = 38; // 护符右
    SharedDef.FASHION_TYPE_RESERVE9 = 39; // 预留
    SharedDef.MAX_EQUIPMENT_TYPE = 40; // 最多可装备位置
    // 武器类型
    SharedDef.WEAPON_POS_MAIN = 0; // 主手
    SharedDef.WEAPON_POS_OFF = 1; // 副手
    SharedDef.WEAPON_POS_SINGLE_HAND = 2; // 单手
    SharedDef.WEAPON_POS_BOTH_HANDS = 3; // 双手
    SharedDef.MAX_WEAPON_POS = 4; // 不是武器
    // 能量类型,用于消耗
    SharedDef.POWER_MANA = 0; // 蓝,内力	
    SharedDef.POWER_ENERGY = 1; // 能量,体力	
    SharedDef.MAX_POWERS = 2;
    // 战斗计算过程中的各种百分比
    SharedDef.COMBAT_RATE_CRIT = 0; // 暴击率
    SharedDef.COMBAT_RATE_EVA = 1; // 闪避率
    SharedDef.MAX_COMBAT_RATE = 2;
    // 包裹类型
    SharedDef.BAG_TYPE_MAIN_BAG = 0; // 主包裹
    SharedDef.BAG_TYPE_EQUIP = 1; // 穿戴的装备包裹
    SharedDef.BAG_TYPE_EQUIP_BAG = 2; // 放装备的包裹
    SharedDef.BAG_TYPE_GEM = 3; // 消耗品的包裹
    SharedDef.BAG_TYPE_GEM_BAG = 4; // 放宝石的包裹
    SharedDef.MAX_BAG = 20; // 预留20个
    // 背包扩展类型
    SharedDef.BAG_EXTENSION_TYPE_AUTO = 0; // 自动开启
    SharedDef.BAG_EXTENSION_TYPE_GOLD = 1; // 元宝开启
    // 安全码修改类型
    SharedDef.SAFETY_CODE_MODIFY_TYPE_CODE = 0; // 密码修改
    SharedDef.SAFETY_CODE_MODIFY_TYPE_QUESTION = 1; // 安全问题修改
    //  资源类道具
    SharedDef.Item_Loot_Gold_Ingot = 1; // 元宝
    SharedDef.Item_Loot_Bind_Gold = 2; // 绑定元宝
    SharedDef.Item_Loot_Silver = 3; // 银币
    SharedDef.Item_Loot_Renown = 5; // 声望
    SharedDef.Item_Loot_Honor = 6; // 荣誉
    SharedDef.Item_Loot_Exploit = 7; // 功勋
    SharedDef.Item_Loot_Contrib = 8; // 家族贡献
    SharedDef.Item_Loot_Exp = 104; // 经验
    SharedDef.Item_Loot_Mount_Exp = 10; // 坐骑经验
    SharedDef.Item_Loot_QI = 13; // 真气
    SharedDef.Item_Loot_BEAST = 14; // 兽灵
    SharedDef.Item_Loot_GEM = 15; // 宝石精华
    // 货币类型
    SharedDef.MONEY_TYPE_GOLD_INGOT = 1; // 元宝
    SharedDef.MONEY_TYPE_BIND_GOLD = 2; // 绑定元宝
    SharedDef.MONEY_TYPE_SILVER = 3; // 身上的银子
    SharedDef.MONEY_TYPE_SILVER_WAREHOUSE = 4; // 仓库的银子
    SharedDef.MAX_MONEY_TYPE = 22;
    // 基本属性
    SharedDef.BASE_ATTR_HP = 0; // 生命
    SharedDef.BASE_ATTR_DAMAGE = 1; // 攻击
    SharedDef.BASE_ATTR_ARMOR = 2; // 防御
    SharedDef.BASE_ATTR_HIT = 3; // 命中
    SharedDef.BASE_ATTR_DODGE = 4; // 闪避
    SharedDef.BASE_ATTR_CRIT = 5; // 暴击
    SharedDef.BASE_ATTR_CRIT_RESIST = 6; // 坚韧
    SharedDef.BASE_MOVE_SPEED = 7; // 移速
    SharedDef.BASE_ATTACK_SPEED = 8; // 攻速
    SharedDef.MAX_BASE_ATTR = 9;
    // 应用服计算出来的属性枚举
    // 0用来当做无属性 约定基本属性放在枚举的最后面
    SharedDef.EQUIP_ATTR_NONE = 0; // 空属性
    SharedDef.EQUIP_ATTR_MAX_HEALTH = 1; // 最大生命
    SharedDef.EQUIP_ATTR_DAMAGE = 2; // 攻击力
    SharedDef.EQUIP_ATTR_ARMOR = 3; // 防御力
    SharedDef.EQUIP_ATTR_HIT = 4; // 命中
    SharedDef.EQUIP_ATTR_MISS = 5; // 闪避
    SharedDef.EQUIP_ATTR_CRIT = 6; // 暴击
    SharedDef.EQUIP_ATTR_TOUGH = 7; // 坚韧
    SharedDef.EQUIP_ATTR_ATTACK_SPEED = 8; // 攻击速度
    SharedDef.EQUIP_ATTR_MOVE_SPEED = 9; // 移动速度
    SharedDef.EQUIP_ATTR_IGNORE_ARMOR = 10; // 忽视防御
    SharedDef.EQUIP_ATTR_IGNORE_MISS = 11; // 忽视闪避
    SharedDef.EQUIP_ATTR_RECOVERY = 12; // 生命值回复
    SharedDef.EQUIP_ATTR_DAMAGE_AMPLIFY_RATE = 13; // 伤害加深(万分比)
    SharedDef.EQUIP_ATTR_DAMAGE_RESIST_RATE = 14; // 伤害减免(万分比)
    SharedDef.EQUIP_ATTR_DAMAGE_RETURN_RATE = 15; // 反弹伤害(万分比)
    SharedDef.EQUIP_ATTR_VAMPIRIC_RATE = 16; // 吸血光环(万分比)
    SharedDef.EQUIP_ATTR_RECOVERY_RATE = 17; // 回复效率(万分比)
    SharedDef.EQUIP_ATTR_CRIT_RATE = 18; // 暴击率(万分比)
    SharedDef.EQUIP_ATTR_CRIT_RESIST_RATE = 19; // 抗暴率(万分比)
    SharedDef.EQUIP_ATTR_CRIT_DAM_RATE = 20; // 暴击伤害倍数(万分比)
    SharedDef.EQUIP_ATTR_CRIT_RESIST_DAM_RATE = 21; // 降暴伤害倍数(万分比)
    SharedDef.EQUIP_ATTR_HIT_RATE = 22; // 命中率(万分比)
    SharedDef.EQUIP_ATTR_MISS_RATE = 23; // 闪避率(万分比)
    SharedDef.EQUIP_ATTR_STUN_RATE = 24; // 眩晕
    SharedDef.EQUIP_ATTR_ROOTS_RATE = 25; // 定身
    SharedDef.EQUIP_ATTR_SILENCE_RATE = 26; // 沉默
    SharedDef.EQUIP_ATTR_CHAOS_RATE = 27; // 混乱
    SharedDef.EQUIP_ATTR_CHARM_RATE = 28; // 魅惑
    SharedDef.EQUIP_ATTR_CONTROL_ENHANCE_RATE = 29; // 控制增强
    SharedDef.EQUIP_ATTR_CONTROL_RESIST_RATE = 30; // 控制减免
    SharedDef.EQUIP_ATTR_STRENGTH_ARMOR = 31; // 强化护甲
    SharedDef.MAX_EQUIP_ATTR = 32;
    // 物品其他属性枚举（物品特殊属性接在MAX_EQUIP_ATTR后面）
    SharedDef.ITEM_OTHER_ATTR_FAIL_TIME = 32; // 失效时间
    SharedDef.ITEM_OTHER_ATTR_STRONG_LV = 33; // 强化等级
    SharedDef.ITEM_OTHER_ATTR_STRONG_FAIL_COUNT = 34; // 强化失败次数
    SharedDef.ITEM_OTHER_ATTR_FORCE = 35; // 战斗力
    // 技能族公共CD类型
    SharedDef.SPELL_CD_BASE = 0;
    SharedDef.SPELL_CD_SPECIAL = 1;
    SharedDef.MAX_SPELL_CD_TYPE = 2;
    // 任务槽 偏移量
    SharedDef.QUEST_ID_OFFSET = 0;
    SharedDef.QUEST_STATE_OFFSET = 1;
    SharedDef.QUEST_COUNTS_OFFSET = 2;
    SharedDef.QUEST_COUNTS_OFFSET_1 = 3;
    SharedDef.QUEST_COUNTS_OFFSET_2 = 4;
    SharedDef.QUEST_COUNTS_OFFSET_3 = 5;
    SharedDef.QUEST_TIME_OFFSET = 6;
    SharedDef.QUEST_FLAG_OFFSET = 7; // bit标志位 看定义QuestSlotFlags
    SharedDef.MAX_QUEST_OFFSET = 8;
    SharedDef.QUEST_SLOT_FLAGS_REWARD = 0; // 是否领取过任务奖励
    SharedDef.QUEST_SLOT_FLAGS_EXPLORE = 1; // 是否已探索
    SharedDef.MAX_QUEST_LOG_SIZE = 32; // 任务槽的上限
    SharedDef.QUEST_OBJECTIVES_COUNT = 8; // 物品数量或杀死生物的数量上限
    SharedDef.QUEST_REWARD_CHOICES_COUNT = 6;
    SharedDef.QUEST_REWARDS_COUNT = 4;
    SharedDef.QUEST_LOW_LEVEL_HIDE_DIFF = 4;
    SharedDef.QUEST_ITEMS_COUNTS = 10; // 任务物品最大容量
    SharedDef.QUEST_COMPLETE_LIST = 200; // 任务已完成列表的长度
    SharedDef.BINLOG_STRING_FIELD_GUID = 0; // 所有binlog的guid位置
    SharedDef.BINLOG_STRING_FIELD_NAME = 1; // 所有binlog的name位置
    SharedDef.BINLOG_STRING_FIELD_VERSION = 2; // 所有binlog的版本信息位置
    SharedDef.BINLOG_STRING_FIELD_OWNER = 3; // 所有binlog的owner位置
    // 战利品下标
    SharedDef.LOOT_PUBLIC_INT_START_POS = 0; // grid开始坐标
    SharedDef.LOOT_PUBLIC_INT_END_POS = 1; // grid结束坐标
    SharedDef.LOOT_PUBLIC_INT_BEGIN = 2; // 战利品真正开始的下标
    SharedDef.LOOT_PUBLIC_INT_ENTRY = 0; // 战利品模板
    SharedDef.LOOT_PUBLIC_INT_MONEY_SUM = 1; // 金钱数量
    SharedDef.MAX_LOOT_PUBLIC_INT_FIELD = 2;
    SharedDef.LOOT_PUBLIC_STR_OWNER = 0;
    SharedDef.MAX_LOOT_PUBLIC_STR_FIELD = 1;
    SharedDef.LOOT_PRIVATE_INT_FAIL_TIME = 0; // 拾取以后的物品失效时间
    SharedDef.LOOT_PRIVATE_INT_EXIST_TIME = 1; // 战利品存活时间
    SharedDef.LOOT_PRIVATE_INT_OWNER_TIME = 2; // 战利品拥有者保护时间
    SharedDef.LOOT_PRIVATE_INT_FLAG = 3; // 标志位
    SharedDef.MAX_LOOT_PRIVATE_INT_FIELD = 4;
    SharedDef.LOOT_PRIVATE_STRING_CREATE_BY = 0; // 战利品掉落怪GUID
    SharedDef.LOOT_PRIVATE_STRING_CREATE_NAME = 1; // 战利品掉落怪名称
    SharedDef.MAX_LOOT_PRIVATE_STRING = 2;
    SharedDef.LOOT_STR_FIELD_BEGIN = 4; // 战利品字符串开始下标
    // 战利品标志位
    SharedDef.LOOT_FLAG_GET_ITEM_NOTICE = 0; // 拾起物品是否需要公告
    SharedDef.LOOT_FLAG_ITEM_BIND = 1; // 战利品是否绑定
    SharedDef.PLAYER_PASSIVE_SPELL_MAX_COUNT = 100; //  被动技能个数
    // 玩家能否做某事的flag偏移定义
    SharedDef.UNIT_CANDO_OFFSET_TYPE_CANT_CAST = 0; // 限制施法
    SharedDef.UNIT_CANDO_OFFSET_TYPE_CANT_MOVE = 1; // 限制移动
    SharedDef.UNIT_FIELD_BYTE_0 = 0; // 0:类型ID，1：死亡状态，2：移动速度，3：八卦阵等级
    SharedDef.UNIT_FIELD_BYTE_1 = 1; // 0：角色类型，1：阵营，2：种族，3：职业
    SharedDef.UNIT_FIELD_BYTE_2 = 2; // 0：灰名时间，1：付费等级，2：免费复活，3：玩家称号
    SharedDef.UNIT_FIELD_BYTE_3 = 3; // 0: 头像，1：发型，2：GM等级，3：下次复活是否有保护buff
    SharedDef.UNIT_FIELD_BYTE_4 = 4; // 0：预留，1：当前坐骑模板id，2：皮肤类型 3：预留
    SharedDef.UNIT_FIELD_MOUNT_LEVEL = 5; // 4个bytes(0:当前坐骑阶数 1:当前坐骑星级,2:当前坐骑是否骑乘，3:当前幻化id)
    SharedDef.UNIT_FIELD_DIVINE_ID = 6; // 神兵id
    SharedDef.UNIT_FIELD_UINT16_0 = 7; // 0：精灵模板，1：精灵等级
    SharedDef.UNIT_FIELD_UINT16_1 = 8; // 0：地图ID，1：跨服1v1连胜次数
    SharedDef.UNIT_FIELD_UINT16_2 = 9; // 0:玩家报名跨服时收到匹配信息中给的编号 1:身上宝物采集阵营编号
    SharedDef.UNIT_FIELD_SELF_DEFENSE_GUID = 10; // 自卫模式下可以攻击的玩家intguid
    SharedDef.UNIT_FIELD_FLAGS = 11; // 精灵身上的标志位
    SharedDef.GO_FIELD_FLAGS = 12; // 游戏对象的一些标识位
    SharedDef.GO_FIELD_DATA = 13; // 动态数据字段,目前保留为4个int
    SharedDef.UNIT_FIELD_NPC_FLAG = 17; // NPC标识
    SharedDef.UNIT_FIELD_INSTANCE_ID = 18; // 地图实例ID
    SharedDef.UNIT_FIELD_EQUIPMENT_COAT = 19; // 上衣模板
    SharedDef.UNIT_FIELD_EQUIPMENT_MAIN_WEAPON = 20; // 主手武器
    SharedDef.UNIT_FIELD_BUFF = 21; // BUFFID
    // 注意了：创建包需要下发的下标放在 UNIT_FIELD_BUFF前面,UNIT_FIELD_BUFF_TM后面的下标走订阅
    SharedDef.UNIT_FIELD_BUFF_TM = 29; // BUFF时间（掩码从这开始）
    SharedDef.UNIT_FIELD_BUFF_RESERVE = 37; // BUFF预留值
    SharedDef.UNIT_FIELD_BUFF_EFFECT_ID = 53; // BUFF效果id
    SharedDef.UNIT_FIELD_BUFF_CASTER_GUID = 69; // buff施法者guid
    SharedDef.UNIT_FIELD_FORCE = 85; // 战斗力
    SharedDef.UNIT_FIELD_HEALTH = 87; // 当前生命	
    SharedDef.UNIT_FIELD_MAX_HEALTH = 88; // 最大生命
    SharedDef.UNIT_FIELD_DAMAGE = 89; // 攻击力
    SharedDef.UNIT_FIELD_ARMOR = 90; // 防御力
    SharedDef.UNIT_FIELD_HIT = 91; // 命中
    SharedDef.UNIT_FIELD_MISS = 92; // 闪避
    SharedDef.UNIT_FIELD_CRIT = 93; // 暴击
    SharedDef.UNIT_FIELD_TOUGH = 94; // 坚韧
    SharedDef.UNIT_FIELD_ATTACK_SPEED = 95; // 攻击速度
    SharedDef.UNIT_FIELD_MOVE_SPEED = 96; // 移动速度
    SharedDef.UNIT_FIELD_IGNORE_ARMOR = 97; // 忽视防御
    SharedDef.UNIT_FIELD_IGNORE_MISS = 98; // 忽视闪避
    SharedDef.UNIT_FIELD_RECOVERY = 99; // 生命值回复
    SharedDef.UNIT_FIELD_DAMAGE_AMPLIFY_RATE = 100; // 伤害加深(万分比)
    SharedDef.UNIT_FIELD_DAMAGE_RESIST_RATE = 101; // 伤害减免(万分比)
    SharedDef.UNIT_FIELD_DAMAGE_RETURN_RATE = 102; // 反弹伤害(万分比)
    SharedDef.UNIT_FIELD_VAMPIRIC_RATE = 103; // 吸血光环(万分比)
    SharedDef.UNIT_FIELD_RECOVERY_RATE = 104; // 回复效率(万分比)
    SharedDef.UNIT_FIELD_CRIT_RATE = 105; // 暴击率(万分比)
    SharedDef.UNIT_FIELD_CRIT_RESIST_RATE = 106; // 抗暴率(万分比)
    SharedDef.UNIT_FIELD_CRIT_DAM_RATE = 107; // 暴击伤害倍数(万分比)
    SharedDef.UNIT_FIELD_CRIT_RESIST_DAM_RATE = 108; // 降暴伤害倍数(万分比)
    SharedDef.UNIT_FIELD_HIT_RATE = 109; // 命中率(万分比)
    SharedDef.UNIT_FIELD_MISS_RATE = 110; // 闪避率(万分比)
    SharedDef.UNIT_FIELD_STUN_RATE = 111; // 眩晕
    SharedDef.UNIT_FIELD_ROOTS_RATE = 112; // 定身
    SharedDef.UNIT_FIELD_SILENCE_RATE = 113; // 沉默
    SharedDef.UNIT_FIELD_CHAOS_RATE = 114; // 混乱
    SharedDef.UNIT_FIELD_CHARM_RATE = 115; // 魅惑
    SharedDef.UNIT_FIELD_CONTROL_ENHANCE_RATE = 116; // 控制增强
    SharedDef.UNIT_FIELD_CONTROL_RESIST_RATE = 117; // 控制减免
    SharedDef.UNIT_FIELD_STRENGTH_ARMOR = 118; // 强化护甲
    SharedDef.UNIT_FIELD_ATTRIBUTE_END = 119; //  属性结束
    SharedDef.UNIT_FIELD_MAX_HEALTH_BASE = 119; // 最大生命
    SharedDef.UNIT_FIELD_DAMAGE_BASE = 120; // 攻击力
    SharedDef.UNIT_FIELD_ARMOR_BASE = 121; // 防御力
    SharedDef.UNIT_FIELD_HIT_BASE = 122; // 命中
    SharedDef.UNIT_FIELD_MISS_BASE = 123; // 闪避
    SharedDef.UNIT_FIELD_CRIT_BASE = 124; // 暴击
    SharedDef.UNIT_FIELD_TOUGH_BASE = 125; // 坚韧
    SharedDef.UNIT_FIELD_ATTACK_SPEED_BASE = 126; // 攻击速度
    SharedDef.UNIT_FIELD_MOVE_SPEED_BASE = 127; // 移动速度
    SharedDef.UNIT_FIELD_IGNORE_ARMOR_BASE = 128; // 忽视防御
    SharedDef.UNIT_FIELD_IGNORE_MISS_BASE = 129; // 忽视闪避
    SharedDef.UNIT_FIELD_RECOVERY_BASE = 130; // 生命值回复
    SharedDef.UNIT_FIELD_DAMAGE_AMPLIFY_RATE_BASE = 131; // 伤害加深(万分比)
    SharedDef.UNIT_FIELD_DAMAGE_RESIST_RATE_BASE = 132; // 伤害减免(万分比)
    SharedDef.UNIT_FIELD_DAMAGE_RETURN_RATE_BASE = 133; // 反弹伤害(万分比)
    SharedDef.UNIT_FIELD_VAMPIRIC_RATE_BASE = 134; // 吸血光环(万分比)
    SharedDef.UNIT_FIELD_RECOVERY_RATE_BASE = 135; // 回复效率(万分比)
    SharedDef.UNIT_FIELD_CRIT_RATE_BASE = 136; // 暴击率(万分比)
    SharedDef.UNIT_FIELD_CRIT_RESIST_RATE_BASE = 137; // 抗暴率(万分比)
    SharedDef.UNIT_FIELD_CRIT_DAM_RATE_BASE = 138; // 暴击伤害倍数(万分比)
    SharedDef.UNIT_FIELD_CRIT_RESIST_DAM_RATE_BASE = 139; // 降暴伤害倍数(万分比)
    SharedDef.UNIT_FIELD_HIT_RATE_BASE = 140; // 命中率(万分比)
    SharedDef.UNIT_FIELD_MISS_RATE_BASE = 141; // 闪避率(万分比)
    SharedDef.UNIT_FIELD_STUN_RATE_BASE = 142; // 眩晕
    SharedDef.UNIT_FIELD_ROOTS_RATE_BASE = 143; // 定身
    SharedDef.UNIT_FIELD_SILENCE_RATE_BASE = 144; // 沉默
    SharedDef.UNIT_FIELD_CHAOS_RATE_BASE = 145; // 混乱
    SharedDef.UNIT_FIELD_CHARM_RATE_BASE = 146; // 魅惑
    SharedDef.UNIT_FIELD_CONTROL_ENHANCE_RATE_BASE = 147; // 控制增强
    SharedDef.UNIT_FIELD_CONTROL_RESIST_RATE_BASE = 148; // 控制减免
    SharedDef.UNIT_FIELD_STRENGTH_ARMOR_BASE = 149; // 强化护甲
    SharedDef.UNIT_FIELD_ATTRIBUTE_BASE_END = 150; //  属性结束
    SharedDef.UNIT_FIELD_ANGER = 150; // 愤怒值
    SharedDef.UNIT_FIELD_USE_RESPAWN_MAPID = 151; // 使用复活丹的地图id
    SharedDef.UNIT_FIELD_PROCESS_TIME = 152; //  进度条读完的时间戳
    SharedDef.UNIT_FIELD_PROCESS_SECONDS = 153; //  读条总共需要时间	
    SharedDef.UINT_FIELD_BOSS_DATA = 154; // boss数据byte 0:boss状态 1:boss前一状态 2:boss索引(云游的是这个用途)
    SharedDef.UINT_FIELD_BOSS_DATA1 = 155; // boss数据byte 0:当前坐标x 1:当前坐标y 2:下一坐标x 3:下一坐标y(云游的是这个用途)
    SharedDef.UINT_FIELD_VIEW_MODE = 155; // 是否是观看模式
    SharedDef.UINT_FIELD_VIRTUAL_CAMP = 156; // 虚拟阵营
    SharedDef.UINT_FIELD_XIANFU_INFO = 157; // 跨服仙府的信息4bytes (0:宝箱数量, 1:死亡次数)
    SharedDef.UINT_FIELD_VIP_LEVEL = 158; // VIP等级
    SharedDef.UINT_FIELD_VIP_TIME_OUT = 159; // VIP超时时间
    SharedDef.UINT_FIELD_VAMPIRIC = 160; // 当前战斗的吸血值
    SharedDef.UINT_INT_FIELD_ILLUSION = 162; // 角色幻化
    SharedDef.UINT_FIELD_BOOS_CUR_SPELLID = 163; // 当前正在释放的蓄力技能idUNIT_INT_FIELD_APPEARANCE
    SharedDef.UINT_FIELD_BOOS_CUR_SPELL_TIME = 164; // 前一个技能结束的时间戳
    SharedDef.UINT_FIELD_BOOS_CUR_SPELL_LAST_COUNT = 165; //  持续技能数量
    SharedDef.UINT_INT_FIELD_PASSIVE_SPELL_START = 166; // 被动技能开始
    SharedDef.UINT_INT_FIELD_PASSIVE_SPELL_END = 266; // 被动技能结束
    SharedDef.UINT_INT_FIELD_WINGS_RANK = 266; // 神羽阶数
    SharedDef.UNIT_INT_FIELD_APPEARANCE = 267; //  外观
    SharedDef.UNIT_INT_FIELD_RISK_CREATURE_ID = 268; //  世界冒险怪物对应的序号
    SharedDef.MAX_UNIT_FIELD = 269;
    SharedDef.GO_STRING_FIELD_CREATED_BY = 4;
    SharedDef.UNIT_STRING_FIELD_ALIAS_NAME = 5;
    SharedDef.UNIT_STRING_FIELD_PICK_NAME = 6; // 正在采集的玩家
    SharedDef.UNIT_STRING_FIELD_GROUP_PEACE_ID = 7; //  组队id
    SharedDef.UNIT_STRING_FIELD_FACTION_GUID = 8; //  帮派id
    SharedDef.MAX_UNIT_STRING_FIELD = 9;
    // 游戏对象类型
    SharedDef.GO_ENTRY_TELETEPORT = 1; // 传送点
    SharedDef.GO_ENTRY_LOOT = 9; // 战利品游戏对象
    // 游戏对象数据
    // 传送点专用
    SharedDef.GO_TELETEPORTER_TO_MAPID = 13;
    SharedDef.GO_TELETEPORTER_TO_X = 14;
    SharedDef.GO_TELETEPORTER_TO_Y = 15;
    // 任务相关游戏对象
    SharedDef.GO_QUEST_ID_0 = 13; // 相关任务0
    SharedDef.GO_QUEST_ID_1 = 14; // 相关任务1
    SharedDef.GO_QUEST_ID_2 = 15; // 相关任务2
    SharedDef.GO_QUEST_ID_3 = 16; // 相关任务3
    SharedDef.GO_STRING_FIELD_CREATED_NAME = 5; // 战利品创建者Name
    // 机关类相关的
    SharedDef.GO_GEAR_STATUS = 13; // 机关状态
    SharedDef.GO_GEAR_KILLER = 14; // 机关破坏者
    // 机关状态枚举
    SharedDef.GO_GEAR_STATUS_START = 1; // 机关初始状态
    SharedDef.GO_GEAR_STATUS_OPEN = 2; // 机关打开
    SharedDef.GO_GEAR_STATUS_CLOSE = 3; // 机关关闭
    SharedDef.GO_GEAR_STATUS_END = 4; // 机关即将消失
    // 精灵身上标识下标枚举
    SharedDef.UNIT_FIELD_FLAGS_CANT_CAST = 0; // 标识是否可以施法
    SharedDef.UNIT_FIELD_FLAGS_CANT_MOVE = 1; // 标识是否可以移动
    SharedDef.UNIT_FIELD_FLAGS_BUFF_DAZUO = 2; // 标识是否打坐buff
    SharedDef.UNIT_FIELD_FLAGS_GUAJIBAOHU = 3; // 标识是否是挂机保护
    SharedDef.UNIT_FIELD_FLAGS_FACTION_LINGXIU = 4; // 帮派领袖BUFF
    SharedDef.UNIT_FIELD_FLAGS_FACTION_GUWU = 5; // 帮派鼓舞BUFF
    SharedDef.UNIT_FIELD_FLAGS_IS_BOSS_CREATURE = 6; // 标识是否是副本boss怪
    SharedDef.UNIT_FIELD_FLAGS_USE_GAMEOBJECT = 7; // 标识是否使用游戏对象
    SharedDef.UNIT_FIELD_FLAGS_IS_FLZ_PUB_CREATURE = 8; // 标识是否风流镇酒馆怪
    SharedDef.UNIT_FIELD_FLAGS_QUEST_FOLLOW_CREATUR = 9; // 做任务刷出来的跟谁宠物，任务完成时删掉
    SharedDef.UNIT_FIELD_FLAGS_IS_PVP = 10; // 是否是PVP
    SharedDef.UNIT_FIELD_FLAGS_IS_FIELD_BOSS_CREATURE = 11; // 标识是否是野外boss怪
    SharedDef.UNIT_FIELD_FLAGS_IS_INVISIBLE_SPELL = 12; // 隐藏的技能NPC
    // 场景服专用的玩家状态下标枚举
    SharedDef.PLAYER_SCENED_FLAS_HUNG_UP = 0; // 挂机状态
    SharedDef.PLAYER_SCENED_FLAS_PVP_STATE = 1; // PVP状态
    SharedDef.PLAYER_SCENED_FLAGS_FUBEN_HUNG_UP = 2; // 标识是否副本连续挂机状态
    // 玩家应用服标志位，玩家选项
    SharedDef.PLAYER_APPD_INT_FIELD_FLAGS_IS_ZIBAO = 0; // 玩家是否自爆
    SharedDef.PLAYER_APPD_INT_FIELD_FLAGS_YEYOU_ONLINE = 1; // 页游是否在线，客户端用的
    SharedDef.PLAYER_APPD_INT_FIELD_FLAGS_PHONE_ONLINE = 2; // 手游是否在线，客户端用的
    SharedDef.PLAYER_APPD_INT_FIELD_FLAGS_FROM_KUAFU = 3; // 玩家是否从pk回到游戏服
    SharedDef.PLAYER_APPD_INT_FIELD_FLAGS_GIFT_CREATE = 4; // 礼包是否已创建
    SharedDef.PLAYER_APPD_INT_FIELD_FLAGS_LIMIT_CREATE = 5; // 限时活动是否已创建
    SharedDef.PLAYER_APPD_INT_FIELD_FLAGS_IS_FIRST_RECHARGE = 6; // 是否已经首充
    SharedDef.PLAYER_APPD_INT_FIELD_FLAGS_NEW_PLAYER = 7; // 是否新玩家，是新玩家则发放礼包等等。。
    SharedDef.PLAYER_APPD_INT_FIELD_FLAGS_SAFETY_CODE_CHECK = 8; // 标识安全码验证是否通过
    SharedDef.PLAYER_APPD_INT_FIELD_FLAGS_AUTO_GROUP = 9; // 玩家是否自动接受组队
    SharedDef.PLAYER_APPD_INT_FIELD_FLAGS_IS_HOSTING_LOGIN = 10; // 是否是托管登录
    SharedDef.PLAYER_APPD_INT_FIELD_FLAGS_IS_HOSTING_APPLY = 11; // 是否托管申请中
    SharedDef.PLAYER_APPD_INT_FIELD_FLAGS_SOCIAL_CREATE = 12; // 社交系统是否以创建	
    SharedDef.PLAYER_APPD_INT_FIELD_FLAGS_ITEM_CREATE = 13; // 物品binlog是否创建
    SharedDef.PLAYER_APPD_INT_FIELD_FLAGS_LOGICAL_CREATE = 14; // 业务逻辑binlog是否创建
    SharedDef.PLAYER_APPD_INT_FIELD_FLAGS_SPELL_CREATE = 15; // 技能binlog是否创建
    SharedDef.PLAYER_APPD_INT_FIELD_FLAGS_INSTANCE_CREATE = 16; // 副本binlog是否创建
    SharedDef.PLAYER_APPD_INT_FIELD_FLAGS_QUEST_CREATE = 17; // 任务binlog是否创建
    // 基本潜力点属性
    SharedDef.QIANLI_TYPE_LILIANG = 0; // 力量
    SharedDef.QIANLI_TYPE_TIZHI = 1; // 体质
    SharedDef.QIANLI_TYPE_SHENFA = 2; // 身法
    SharedDef.QIANLI_TYPE_FANGYU = 3; // 狂暴
    SharedDef.MAX_QIANLI_TYPE = 4;
    // 客户端使用的数字下标数量
    SharedDef.MAX_CLIENT_UINT32_COUNT = 100;
    // 客户端使用的字符串下标数量
    SharedDef.MAX_CLIENT_STRING_COUNT = 20;
    SharedDef.MAX_ITEMS_CD_COUNT = 20; // 物品大cd最大数量(20个保存时间戳)
    SharedDef.MAX_ITEM_USED_COUNT = 5; // 物品大cd使用次数(5个byte保存次数)
    SharedDef.MAX_SPELL_CAPACITY = 20; // 最多拥有的技能数
    // 技能
    SharedDef.SPELL_BASE_LEVEL = 0; // 技能等级
    SharedDef.SPELL_BASE_FORCE = 1; // 技能等级对应的战斗力
    SharedDef.SPELL_BASE_ID = 2; // 技能ID
    SharedDef.MAX_SPELLBASE = 3;
    SharedDef.FUNCTIONAL_QING_GONG = 1; // 轻功
    SharedDef.FUNCTIONAL_TI_YUN_ZONG = 2; // 梯云纵
    SharedDef.FUNCTIONAL_RIDE = 3; // 骑乘
    SharedDef.FUNCTIONAL_DA_ZUO = 4; // 打坐
    SharedDef.PLAYER_SLOT_SPELL_MAX_COUNT = 12; //  玩家技能槽信息上限
    SharedDef.PLAYER_IMPORTANT_CD_COUNT = 20; //  玩家重要技能的CD
    //  玩家技能槽的技能信息
    SharedDef.SHORT_SLOT_SPELL_ID = 0; // 技能槽中的技能id	占一个short
    SharedDef.BYTE_SLOT_SPELL_LV = 2; // 技能槽中的技能lv	占一个byte
    SharedDef.BYTE_SLOT = 3; // 技能槽的位置		占一个byte
    //  技能激活方式
    SharedDef.SPELL_ACTIVE_BY_LEVEL = 0; // 等级激活
    SharedDef.SPELL_ACTIVE_BY_QUEST = 1; // 任务激活
    SharedDef.SPELL_ACTIVE_BY_ITEM = 2; // 道具激活
    //  要在binlog中存CD的重要技能CD信息
    SharedDef.IMPORTANT_SPELL_ID = 0; // 技能id
    SharedDef.IMPORTANT_SPELL_CD = 1; // 技能CD
    SharedDef.MAX_IMPORTANT_SPELL_ATTR_COUNT = 2;
    //  要在binlog中存开启功能的信息
    SharedDef.OPEN_MENU_MAIN_ID = 0; // 主菜单id
    SharedDef.OPEN_MENU_SUB_FLAG = 1; // 子菜单flag
    SharedDef.MAX_OPEN_MENU_ATTR_COUNT = 2;
    SharedDef.GIFT_PACKS_TYPE_ITEM_GIVE = 0; // 用GM命令生成
    SharedDef.GIFT_PACKS_TYPE_SYSTEM_COMPENSATION = 1; // 系统补偿
    SharedDef.GIFT_PACKS_TYPE_BAG_FULL = 2; // 背包满了
    SharedDef.GIFT_PACKS_TYPE_LEVEL_RANK = 3; // 排行榜
    SharedDef.GIFT_PACKS_TYPE_WORLD_BOSS = 4; // 世界BOSS
    SharedDef.GIFT_PACKS_TYPE_3V3_WEEK = 5; // 3v3周奖励
    SharedDef.GIFT_PACKS_TYPE_3V3_MONTH = 6; // 3v3月奖励（段位奖励）
    SharedDef.GIFT_PACKS_TYPE_DOUJIAN_DAY = 7; // 斗剑台每日奖励
    SharedDef.GIFT_PACKS_TYPE_FACTION_BOSS = 8; // 家族boss奖励
    SharedDef.GIFT_PACKS_TYPE_FACTION_GIFT_RANK = 9; // 家族魅力排行奖励
    SharedDef.GIFT_PACKS_TYPE_ACT_RANK = 10; // 开服排行奖励
    SharedDef.GIFT_PACKS_TYPE_MASS_BOSS = 11; //  全民boss
    SharedDef.GIFT_PACKS_TYPE_ESCORT_ROB = 12; //  劫镖奖励
    SharedDef.SCENED_APPD_ENTER_DAILY_INSTANCE = 1; // 进入日常副本
    SharedDef.SCENED_APPD_ENTER_VIP_INSTANCE = 2; // 进入VIP副本
    SharedDef.SCENED_APPD_USE_ITEM = 3; // 使用血瓶
    SharedDef.SCENED_APPD_USE_RESPAWN_ITEM = 4; // 使用复活丹
    SharedDef.SCENED_APPD_ENTER_TRIAL_INSTANCE = 5; // 进入试炼塔副本
    SharedDef.SCENED_APPD_PASS_TRIAL_INSTANCE = 6; // 通关试炼塔副本
    SharedDef.SCENED_APPD_PASS_VIP_INSTANCE = 7; // 通关VIP副本
    SharedDef.SCENED_APPD_ADD_ENEMY = 8; // 增加仇人
    SharedDef.SCENED_APPD_ENTER_RES_INSTANCE = 9; // 进入资源副本
    SharedDef.SCENED_APPD_ADD_MAIL = 10; // 增加邮件
    SharedDef.SCENED_APPD_PASS_RES_INSTANCE = 11; // 通关资源副本
    SharedDef.SCENED_APPD_KILL_MONSTER = 12; // 杀怪
    SharedDef.SCENED_APPD_JOIN_FIELD_BOSS = 13; // 参加野外BOSS
    SharedDef.SCENED_APPD_GAMEOBJECT = 14; // 采集物品
    SharedDef.SCENED_APPD_TALK = 15; // 对话
    SharedDef.SCENED_APPD_RIDE = 16; // 骑乘
    SharedDef.SCENED_APPD_GOLD_RESPAWN = 17; // 元宝复活
    SharedDef.SCENED_APPD_DOUJIANTAI = 18; // 斗剑台结果
    SharedDef.SCENED_APPD_KILL_MONSTER_COLLECT = 19; // 杀怪收集物品
    SharedDef.SCENED_APPD_XIULIANCHANG = 20; // 修练场掠夺结果
    SharedDef.SCENED_APPD_XIANFU_PRACTISE = 21; // 仙府体验
    SharedDef.SCENED_APPD_ADD_OFFLINE_RISK_REWARD = 22; // 离线冒险世界奖励
    SharedDef.SCENED_APPD_PASS_WORLD_RISK = 23; // 通关冒险世界
    SharedDef.SCENED_APPD_ENTER_MASS_BOSS_INSTANCE = 24; // 进入全民boss副本
    SharedDef.SCENED_APPD_FACTION_TOWER_WIN = 25; // 无尽远征 胜利
    SharedDef.SCENED_APPD_SINGLE_PVP_RESULT = 26; //  排位赛结果
    SharedDef.SCENED_APPD_ENTER_QUALIFY_INSTANCE = 27; // 进入排位赛
    SharedDef.SCENED_APPD_ENTER_FACTION_TOWER_INSTANCE = 28; // 进入家族远征
    SharedDef.SCENED_APPD_PRIVATE_BOSS_WIN = 29; // 个人Boss胜利
    SharedDef.SCENED_APPD_ENTER_DOUJIANTAI_INSTANCE = 30; // 进入斗剑台副本
    SharedDef.SCENED_APPD_WORLD_BOSS_ENROLL = 31; // 世界boss报名
    SharedDef.SCENED_APPD_ENTER_FACTION_BOSSDEFENSE_INSTANCE = 32; // 进入家族Boss
    SharedDef.SCENED_APPD_ENTER_PRIVATE_BOSS_INSTANCE = 33; // 进入个人Boss
    SharedDef.SCENED_APPD_PLAYER_DEAD_PROCESS = 34; // 玩家死亡处理
    SharedDef.APPD_SCENED_SWEEP_TRIAL_INSTANCE = 1; // 扫荡试炼塔副本
    SharedDef.APPD_SCENED_SWEEP_VIP_INSTANCE = 2; // 扫荡VIP副本
    SharedDef.APPD_SCENED_RESPAWN = 3; // 元宝复活
    SharedDef.APPD_SCENED_NEAR_BY_CHAT = 4; // 附近聊天
    SharedDef.APPD_SCENED_ADD_EXP = 5; // 场景服加经验
    SharedDef.APPD_SCENED_CLEAR_FIELD_BOSS = 6; // 场景服清理野外BOSS
    SharedDef.APPD_SCENED_REBORN_FIELD_BOSS = 7; // 场景服刷新野外
    SharedDef.APPD_SCENED_WORLD_BOSS_WAITING = 8; // 进入世界BOSS等待房间
    SharedDef.APPD_SCENED_FIGHT_WORLD_BOSS = 9; // 可挑战开始世界BOSS
    SharedDef.APPD_SCENED_WORLD_BOSS_END = 10; // 世界BOSS结束
    SharedDef.APPD_SCENED_WORLD_BOSS_ENTER = 11; // 进入世界BOSS房间
    SharedDef.APPD_SCENED_REMIND_INSTANCE_ENTER = 12; // 进入原地副本房间
    SharedDef.APPD_SCENED_MASS_BOSS_REBORN = 13; // 全民boss重生
    SharedDef.APPD_SCENED_TELEPORT = 14; // 传送
    SharedDef.APPD_SCENED_CHECK_ENTER_FACTION_BOSSDEFENSE = 15; // 检测进入家族boss
    SharedDef.APPD_SCENED_CHECK_ENTER_FACTION_TOWER = 16; // 检测进入家族远征
    SharedDef.APPD_SCENED_USE_RESTORE_POTION = 17; // 使用回复药
    SharedDef.INSTANCE_SUB_TYPE_VIP = 1; // vip副本
    SharedDef.INSTANCE_SUB_TYPE_TRIAL = 2; // 试炼塔副本
    SharedDef.INSTANCE_SUB_TYPE_WORLD_BOSS = 3; // 世界BOSS
    SharedDef.INSTANCE_SUB_TYPE_RES = 4; // 资源副本
    SharedDef.INSTANCE_SUB_TYPE_KUAFU_3V3 = 5; // 跨服3v3
    SharedDef.INSTANCE_SUB_TYPE_XIANFU = 6; // 仙府夺宝
    SharedDef.INSTANCE_SUB_TYPE_DOUJIANTAI = 7; // 斗剑台
    SharedDef.INSTANCE_SUB_TYPE_XIANFU_EXPERIENCE = 8; // 仙府体验
    SharedDef.INSTANCE_SUB_TYPE_XIULIAN = 9; // 修炼房
    SharedDef.INSTANCE_SUB_TYPE_PLOT = 10; // 原地剧情副本
    SharedDef.INSTANCE_SUB_TYPE_MASS_BOSS = 11; // 全民boss
    SharedDef.INSTANCE_SUB_TYPE_KUAFU_GROUP = 12; // 跨服组队副本
    SharedDef.INSTANCE_SUB_TYPE_FACTION_BOSSDEFENSE = 13; // 家族首领挑战
    SharedDef.INSTANCE_SUB_TYPE_FACTION_TOWER = 14; // 家族无尽远征
    SharedDef.INSTANCE_SUB_TYPE_QUALIFY = 15; // 排位赛
    SharedDef.INSTANCE_SUB_TYPE_RISK = 16; // 世界冒险
    SharedDef.INSTANCE_SUB_TYPE_PRIVATE_BOSS = 17; // 个人BOSS
    //  聊天频道
    SharedDef.CHAT_CHANNEL_SYSTEM = 0; // 系统频道
    SharedDef.CHAT_CHANNEL_WORLD = 1; // 世界频道
    SharedDef.CHAT_CHANNEL_NEARBY = 2; // 附近频道
    SharedDef.CHAT_CHANNEL_FAMILY = 3; // 家族频道
    SharedDef.CHAT_CHANNEL_GROUP = 4; // 队伍频道
    // ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    SharedDef.MAX_CHAT_BLOCK_COUNT = 30;
    SharedDef.MAX_RANK_LIKE = 10;
    SharedDef.MAX_SHOP_LIMIT = 20;
    SharedDef.MAX_WORLD_3V3_COUNT = 3;
    SharedDef.MAX_BUYED_FACTION_SHOP = 8;
    SharedDef.MAX_PLAYER_OPEN_MENU_COUNT = 50;
    SharedDef.MAX_OPTIONAL_GUIDE_COUNT = 30;
    SharedDef.MAX_PLAYER_CULTIVATION_RIVAL_COUNT = 4;
    SharedDef.MAX_PLAYER_CULTIVATION_PLUNDER_RECORD_COUNT = 10;
    SharedDef.MAX_PLAYER_FACTION_SKILL_COUNT = 20;
    // 帮派成员礼物的INT信息
    SharedDef.FACTION_DATA_INT_GIFT_ID = 0; // 礼物ID
    SharedDef.FACTION_DATA_INT_GIFT_POINT = 1; // 本次礼物总魅力值
    SharedDef.FACTION_DATA_INT_GIFT_FLAG_THANK = 2; // 感谢标识信息
    SharedDef.FACTION_DATA_INT_GIFT_TIME = 3; // 赠送时间
    SharedDef.FACTION_DATA_INT_GIFT_COUNT_ID = 4; // 玩家生成的礼物序号
    SharedDef.MAX_FACTION_DATA_INT_GIFT = 5;
    // 帮派成员礼物的STRING信息
    SharedDef.FACTION_DATA_STRING_GIFT_GUID = 0; // 赠送者guid
    SharedDef.FACTION_DATA_STRING_GIFT_MSG = 1; // 赠送者留言
    SharedDef.FACTION_DATA_STRING_GIFT_ITEM_LIST = 2; // 礼物列表详情	物品1 \2 数量1 \1 物品2 \2 数量2
    SharedDef.FACTION_DATA_STRING_GIFT_REPLY_LIST = 3; // 回复信息列表		玩家guid \2 信息 \2 回复类型 \2 时间 \1 玩家guid \2 信息 \2 回复类型 \2 时间
    SharedDef.MAX_FACTION_DATA_STRING_GIFT = 4;
    // 帮派成员礼物回复类型枚举
    SharedDef.FACTION_DATA_REPLY_TYPE_TEXT = 0; // 文本回复
    SharedDef.FACTION_DATA_REPLY_TYPE_VOICE = 1; // 语音回复
    SharedDef.MAX_FACTION_DATA_GIFT_COUNT = 150; // 每人送礼上限
    SharedDef.MAX_FACTION_DATA_GIFT_REPLY_COUNT = 200; // 回复上限
    SharedDef.MAX_FACTION_DATA_GIFT_CACHE_COUNT = 1000; // 离线感谢记录上限
    // 玩家下标
    // //////////////////////////////////////////////////////////////////////////////////////////////////
    // int 部分
    // ////////////////////////////////////////////////////////////////////////
    // 公共部分
    SharedDef.PLAYER_FIELD_FD = 0; // 所在场景服的网络连接号
    SharedDef.PLAYER_FIELD_MERGE_DATA_INDEX = 1; // 玩家合并数据时用来多服务器交互的下标，0.预留，1.回档，2.传送验证数据
    SharedDef.PLAYER_FIELD_ENTRY = 2; // 模板
    SharedDef.PLAYER_FIELD_MAP_ID = 3; // 地图
    SharedDef.PLAYER_FIELD_INSTANCE_ID = 4; // 地图实例
    SharedDef.PLAYER_FIELD_LINE_NO = 5; // 地图分线号
    SharedDef.PLAYER_FIELD_POS_X = 6; // X坐标
    SharedDef.PLAYER_FIELD_POS_Y = 7; // Y坐标
    SharedDef.PLAYER_FIELD_ORIENTATION = 8; // 朝向
    SharedDef.PLAYER_FIELD_MOVESPEED = 9; // 不用了
    SharedDef.PLAYER_FIELD_LEVEL = 11; // 等级
    SharedDef.PLAYER_FIELD_BYTES_0 = 12; // 四个字节,分别存放 0角色id,[1阵营2种族3职业]
    SharedDef.PLAYER_FIELD_NPC_FLAG = 13; // NPC标识
    SharedDef.PLAYER_FIELD_DEATH_STATE = 14; // 生存状态
    SharedDef.PLAYER_FIELD_HEALTH = 15; // 当前生命
    SharedDef.PLAYER_FIELD_MAX_HEALTH = 17; // 最大生命
    SharedDef.PLAYER_FIELD_DAMAGE = 19; // 攻击力
    SharedDef.PLAYER_FIELD_ARMOR = 21; // 防御力
    SharedDef.PLAYER_FIELD_HIT = 23; // 命中
    SharedDef.PLAYER_FIELD_MISS = 25; // 闪避
    SharedDef.PLAYER_FIELD_CRIT = 27; // 暴击
    SharedDef.PLAYER_FIELD_TOUGH = 29; // 坚韧
    SharedDef.PLAYER_FIELD_ATTACK_SPEED = 31; // 攻击速度
    SharedDef.PLAYER_FIELD_MOVE_SPEED = 33; // 移动速度
    SharedDef.PLAYER_FIELD_IGNORE_ARMOR = 35; // 忽视防御
    SharedDef.PLAYER_FIELD_IGNORE_MISS = 37; // 忽视闪避
    SharedDef.PLAYER_FIELD_RECOVERY = 39; // 生命值回复
    SharedDef.PLAYER_FIELD_DAMAGE_AMPLIFY_RATE = 41; // 伤害加深(万分比)
    SharedDef.PLAYER_FIELD_DAMAGE_RESIST_RATE = 43; // 伤害减免(万分比)
    SharedDef.PLAYER_FIELD_DAMAGE_RETURN_RATE = 45; // 反弹伤害(万分比)
    SharedDef.PLAYER_FIELD_VAMPIRIC_RATE = 47; // 吸血光环(万分比)
    SharedDef.PLAYER_FIELD_RECOVERY_RATE = 49; // 回复效率(万分比)
    SharedDef.PLAYER_FIELD_CRIT_RATE = 51; // 暴击率(万分比)
    SharedDef.PLAYER_FIELD_CRIT_RESIST_RATE = 53; // 抗暴率(万分比)
    SharedDef.PLAYER_FIELD_CRIT_DAM_RATE = 55; // 暴击伤害倍数(万分比)
    SharedDef.PLAYER_FIELD_CRIT_RESIST_DAM_RATE = 57; // 降暴伤害倍数(万分比)
    SharedDef.PLAYER_FIELD_HIT_RATE = 59; // 命中率(万分比)
    SharedDef.PLAYER_FIELD_MISS_RATE = 61; // 闪避率(万分比)
    SharedDef.PLAYER_FIELD_STUN_RATE = 63; // 眩晕
    SharedDef.PLAYER_FIELD_ROOTS_RATE = 65; // 定身
    SharedDef.PLAYER_FIELD_SILENCE_RATE = 67; // 沉默
    SharedDef.PLAYER_FIELD_CHAOS_RATE = 69; // 混乱
    SharedDef.PLAYER_FIELD_CHARM_RATE = 71; // 魅惑
    SharedDef.PLAYER_FIELD_CONTROL_ENHANCE_RATE = 73; // 控制增强
    SharedDef.PLAYER_FIELD_CONTROL_RESIST_RATE = 75; // 控制减免
    SharedDef.PLAYER_FIELD_STRENGTH_ARMOR = 77; // 强化护甲
    SharedDef.PLAYER_FIELD_ATTR_RESERVE0 = 79; // 预留属性0
    SharedDef.PLAYER_FIELD_ATTR_RESERVE1 = 81; // 预留属性1
    SharedDef.PLAYER_FIELD_ATTR_RESERVE2 = 83; // 预留属性2
    SharedDef.PLAYER_FIELD_ATTR_RESERVE3 = 85; // 预留属性3
    SharedDef.PLAYER_FIELD_ATTR_RESERVE4 = 87; // 预留属性4
    SharedDef.PLAYER_FIELD_ATTR_RESERVE5 = 89; // 预留属性5
    SharedDef.PLAYER_FIELD_ATTR_RESERVE6 = 91; // 预留属性6
    SharedDef.PLAYER_FIELD_ATTR_RESERVE7 = 93; // 预留属性7
    SharedDef.PLAYER_FIELD_BUFF = 95; // BUFF
    SharedDef.PLAYER_FIELD_BUFF_RESERVE = 145; // BUFF保留参数	
    SharedDef.PLAYER_INT_FIELD_BUFF_GIVER_UINT_GUID = 195; // buff giver的uintGuid
    SharedDef.PLAYER_INT_FIELD_BUFF_EFFECT_ID_START = 245; // buff等级 (byte)
    SharedDef.PLAYER_INT_FIELD_BUFF_EFFECT_ID_END = 295;
    SharedDef.PLAYER_FIELD_SKIN = 295; // 生物变身
    SharedDef.PLAYER_FIELD_BYTES_1 = 296; // 四个字节,分别存放 0怪物分类
    SharedDef.PLAYER_FIELD_FORCE = 297; // 战斗力
    SharedDef.PLAYER_FIELD_EQUIPMENT = 299; // 装备列表，12个32位预留三个
    SharedDef.PLAYER_FIELD_CUR_MOUNT = 319; // 当前坐骑模板id
    SharedDef.PLAYER_FIELD_PEACE_MODE_CD = 320; // 和平模式CD
    SharedDef.PLAYER_FIELD_NOTORIETY = 321; // 2个short(0:战斗模式, 1:恶名值)
    SharedDef.PLAYER_FIELD_BYTES_2 = 322; // 玩家标识,存4个byte[0灰名时间 1付费等级 2免费复活 3玩家称号]
    SharedDef.PLAYER_FIELD_BYTES_3 = 323; // 四个字节,分别存放 0头像,[1发型2可用技能槽数量3下次复活是否有保护buff]
    SharedDef.PLAYER_FIELD_BYTES_4 = 324; // 四个字节,分别存放 (0:频道屏蔽列表,1:预留,2:预留,3:预留)
    SharedDef.PLAYER_FIELD_BYTES_5 = 325; // 0 GM权限, 1, 2 
    SharedDef.PLAYER_FIELD_AUTO_HP = 326; // 大红
    SharedDef.PLAYER_FIELD_AUTO_MP = 328; // 大蓝
    SharedDef.PLAYER_FIELD_VIP_LEVEL = 330; // VIP 等级
    SharedDef.PLAYER_FIELD_VIP_TIME_OUT = 331; // VIP 超时时间
    //  挂机设置
    SharedDef.PLAYER_FIELD_HOOK = 332; // 挂机状态
    SharedDef.PLAYER_FIELD_HOOK_BYTE0 = 333; // 0:槽1技能,1:槽2技能,2:槽3技能,3:槽4技能
    SharedDef.PLAYER_FIELD_HOOK_BYTE1 = 334; // 0:神兵技能,1:怒气技能2:使用银两买药,3:银两不足用元宝买药
    SharedDef.PLAYER_FIELD_HOOK_SHORT = 335; // 0:自动吃药百分比,1:自动使用道具id
    SharedDef.PLAYER_FIELD_HOOK_BYTE3 = 336; // 0:回程复活/原地复活,1:自动使用绑银购买复活丹,2:绑银不足用元宝,3:自动出售某种平直及以下装备
    SharedDef.PLAYER_FIELD_FLAGS = 337; // 主玩家下标flags
    SharedDef.PLAYER_FIELD_FLAGS_END = 345; // 预留8个32位flags
    SharedDef.PLAYER_FIELD_ONLINE_TIME = 345; // 总在线时长(分钟为单位)
    SharedDef.PLAYER_FIELD_ANGER = 346; // 怒气改变
    SharedDef.PLAYER_FIELD_TRIAL_LAYERS = 347;
    SharedDef.PLAYER_INT_FIELD_TRIAL_FINISHED_SECTIONID = 348; // (已经通关的关卡id)
    SharedDef.PLAYER_INT_FIELD_TRIAL_PROCESS = 349; // (0:已经杀的怪,1:总共需要杀的怪)
    SharedDef.PLAYER_FIELD_DECLINE_CHANNEL_BYTE0 = 350; // 拒绝频道A(0系统，1帮派，2组队，3世界)
    SharedDef.PLAYER_FIELD_DECLINE_CHANNEL_BYTE1 = 351; // 拒绝频道B(0:附近)
    SharedDef.PLAYER_SCENED_INT_FIELD_PLAYER_JUMP_CD = 352; // 跳跃CD
    SharedDef.PLAYER_INT_FIELD_SYSTEM_MAIL_ID = 353; // 当前领取的系统邮件的id
    SharedDef.PLAYER_FIELD_DIVINE_NUM = 354; // 神兵数量
    SharedDef.PLAYER_FIELD_DIVINE_FORCE = 355; // 神兵总战斗力
    SharedDef.PLAYER_FIELD_MOUNT_FORCE = 356; // 坐骑总战力
    SharedDef.PLAYER_FIELD_SKILL_FORCE = 357; // 技能战力
    SharedDef.PLAYER_FILED_GEM_FORCE = 358; // 宝石战力
    SharedDef.PLAYER_FIELD_STRENGTH_FORCE = 359; // 强化战力
    SharedDef.PLAYER_FIELD_RANK_LIKE = 360;
    SharedDef.PLAYER_FIELD_USE_RANK_LIKE = 361;
    SharedDef.PLAYER_FIELD_SHOP_LIMIT_START = 362;
    SharedDef.PLAYER_FIELD_SHOP_LIMIT_END = 382;
    SharedDef.PLAYER_EXPAND_INT_FCM_LOGIN_TIME = 382; // 防沉迷，单位：分钟	-1是非防沉迷玩家
    SharedDef.PLAYER_EXPAND_INT_FCM_LOGOUT_TIME = 383; // 防沉迷离线时间
    SharedDef.PLAYER_EXPAND_INT_CREATE_TIME = 384; // 角色创建时间
    SharedDef.PLAYER_EXPAND_INT_LAST_LOGIN_TIME = 385; // 最后登录时间
    SharedDef.PLAYER_EXPAND_INT_LAST_LOGOUT_TIME = 386; // 最后离线时间
    SharedDef.PLAYER_EXPAND_INT_NUMBER_OF_LOGINS = 387; // 累积登录次数
    SharedDef.PLAYER_EXPAND_INT_MONEY = 388; // 各种货币
    SharedDef.PLAYER_EXPAND_INT_MONEY_END = 432;
    SharedDef.PLAYER_EXPAND_INT_USE_FASHION = 432; // 是否启用时装,目前用到20个pos
    SharedDef.PLAYER_EXPAND_INT_XP = 433; // 当前经验，64位
    SharedDef.PLAYER_EXPAND_INT_NEXT_LEVEL_XP = 435; // 下一级经验，64位
    SharedDef.PLAYER_EXPAND_INT_XP_ADDED = 437; //  应用服增加的经验
    SharedDef.PLAYER_EXPAND_INT_XP_PICKED = 439; //  场景服已经领取的应用服增加的经验
    SharedDef.PLAYER_EXPAND_INT_MAP_STATUS = 441; //  地图开启进度
    SharedDef.PLAYER_EXPAND_INT_GAG_END_TIME = 442; // 禁言结束时间
    SharedDef.PLAYER_EXPAND_INT_TO_MAP = 443; // 玩家要传送到的地图
    SharedDef.PLAYER_EXPAND_INT_TO_INSTANCE_ID = 444; // 玩家要传送到的地图实例ID
    SharedDef.PLAYER_EXPAND_INT_TO_POS_X = 445; // 玩家药传送到的坐标
    SharedDef.PLAYER_EXPAND_INT_TO_POS_Y = 446;
    SharedDef.PLAYER_EXPAND_INT_TO_LINE_NO = 447; // 传送线号
    SharedDef.PLAYER_EXPAND_INT_DB_MAP = 448; // 玩家最后一次进入副本前的地图	
    SharedDef.PLAYER_EXPAND_INT_DB_POS_X = 449; // 玩家最后一次进入副本前的坐标
    SharedDef.PLAYER_EXPAND_INT_DB_POS_Y = 450;
    SharedDef.PLAYER_EXPAND_INT_CLIENT_DATA = 451; // 远程存储
    // ////////////////////////////////////////////////////////////////////////
    // 应用服部分	
    SharedDef.PLAYER_APPD_INT_FIELD_FLAG = 551; // 玩家标志位
    SharedDef.PLAYER_APPD_INT_FIELD_FLAG_END = 558; // 结束下标
    SharedDef.PLAYER_APPD_INT_FIELD_DAILY_TIME = 558; //  每天在线时长（min）
    SharedDef.PLAYER_APPD_INT_FIELD_RESET_WEEK = 559; //  每周重置时间
    SharedDef.PLAYER_APPD_INT_FIELD_RESET_DALIY = 560; // 重置的时间点每小时一次
    SharedDef.PLAYER_APPD_INT_FIELD_RECHARGE_SUM = 584; // 累计充值总数
    SharedDef.PLAYER_APPD_INT_FIELD_LAST_RECHARGE_TIME = 585; // 最后一笔充值时间
    SharedDef.PLAYER_APPD_INT_FLELD_JHM_FLAGS = 586; // 激活码flags
    SharedDef.PLAYER_APPD_INT_FLELD_JHM_FLAGS_END = 594; // 激活码flags_end
    // 主背包扩展时间戳
    SharedDef.PLAYER_APPD_INT_FIELD_EXTENSION_END_TIME = 595; // 主包裹扩展结束时间戳
    SharedDef.PLAYER_APPD_INT_FIELD_EXTENSION_REMAIN_TIME = 596; // 主包裹扩展剩余多少时间
    SharedDef.PLAYER_INT_FIELD_BLOCK_COUNT = 598; // 屏蔽列表个数
    SharedDef.PLAYER_INT_FIELD_WORLD_BOSS_JOIN_ID = 599; // 最后一次参加的世界BOSS id
    SharedDef.PLAYER_INT_FIELD_WORLD_BOSS_JOIN_STATE = 600; // 0:最后一次参加的世界BOSS状态, 1:进入的线数,2:死亡次数,3:预留
    // 场景服扩展下标开始了
    SharedDef.PLAYER_SCENED_INT_FLAGS = 601; // 玩家场景服标志位
    //  只显示装备的主动技能
    SharedDef.PLAYER_INT_FIELD_SPELL_START = 609;
    SharedDef.PLAYER_INT_FIELD_SPELL_END = 621;
    // 重要技能的CD
    SharedDef.PLAYER_INT_FIELD_IMPORTANT_SPELL_CD_START = 621;
    SharedDef.PLAYER_INT_FIELD_IMPORTANT_SPELL_CD_END = 661;
    SharedDef.PLAYER_EXPAND_KILL_MONSTER = 661; // 杀怪数
    // 跨服
    SharedDef.PLAYER_APPD_INT_FIELD_KUAFU_WARID = 662; // 跨服场次id
    SharedDef.PLAYER_INT_FIELD_KUAFU_NUMBER = 663; // 0:玩家报名跨服时收到匹配信息中给的编号 1:跨服类型（值参照枚举：EKUAFU_TYPE）
    SharedDef.PLAYER_INT_FIELD_MAIN_QUEST_ID = 664; // 当前主线任务
    SharedDef.PLAYER_INT_FIELD_QUEST_CHAPTER = 665; // 任务章节奖励领取情况
    SharedDef.PLAYER_INT_FIELD_MOUNT_LEVEL = 666; // 4个bytes(0:当前坐骑阶数 1:当前坐骑星级,2:当前坐骑是否骑乘，3:当前幻化id)
    SharedDef.PLAYER_INT_FIELD_DIVINE_ID = 667; // 当前装备的神兵id
    SharedDef.PLAYER_INT_FIELD_PASSIVE_SPELL_START = 668; // 被动技能开始
    SharedDef.PLAYER_INT_FIELD_PASSIVE_SPELL_END = 768; // 被动技能个数
    SharedDef.PLAYER_INT_FIELD_VIRTUAL_CAMP = 768; // 虚拟阵营
    SharedDef.PLAYER_INT_FIELD_WORLD_3V3_SCORE = 769; // 跨服3v3积分
    SharedDef.PLAYER_INT_FIELD_WORLD_3V3_TOTAL_SCORE = 770; // 跨服3v3积分
    SharedDef.PLAYER_INT_FIELD_WORLD_3V3_TREND_INFO = 771; // 胜负走势
    SharedDef.PLAYER_INT_FIELD_DOUJIANTAI_RANK = 772; // 斗剑台排名
    SharedDef.PLAYER_INT_FIELD_DOUJIANTAI_REFRESH_TIME = 773; // 最后一次刷新对手时间戳
    SharedDef.PLAYER_INT_FIELD_ARREARS = 774; // 欠费
    SharedDef.PLAYER_INT_FIELD_DAILY_QUEST_FINISHED = 776; //  每日任务完成数
    SharedDef.PLAYER_INT_FIELD_BAG_SORT_TIME = 777; // 整理背包时间戳
    // 已开启功能的记录
    SharedDef.PLAYER_INT_FIELD_OPEN_MENU_INDEX = 778;
    SharedDef.PLAYER_INT_FIELD_OPEN_MENU_START = 779;
    SharedDef.PLAYER_INT_FIELD_OPEN_MENU_END = 879;
    // 已购家族商店物品的记录
    SharedDef.PLAYER_INT_FIELD_BUYED_FACTION_SHOP = 880; // 已购家族商店物品开始
    SharedDef.PLAYER_INT_FIELD_BUYED_FACTION_SHOP_END = 888; // 已购家族商店物品结束
    // 记录强制引导ID 
    SharedDef.PLAYER_INT_FIELD_GUIDE_ID_LAST = 889; // 上次完成的引导
    SharedDef.PLAYER_INT_FIELD_GUIDE_ID_NOW = 890; // 当前进行中的引导
    // 修炼场相关
    SharedDef.PLAYER_INT_FIELD_CULTIVATION_LAST_PLUNDER_TIME = 891; // 上次挑战时间戳
    SharedDef.PLAYER_INT_FIELD_CULTIVATION_LAST_REFRESH_TIME = 892; // 上次刷新对手时间戳
    SharedDef.PLAYER_INT_FIELD_CULTIVATION_TODAY_PLUNDER_EXP = 893; // 当日累计掠夺经验
    SharedDef.PLAYER_INT_FIELD_CULTIVATION_TODAY_PLUNDER_CHEST = 894; // 当日累计掠夺宝箱数
    SharedDef.PLAYER_INT_FIELD_CULTIVATION_TODAY_PURCHASE_COUNT = 895; // 当日购买次数
    SharedDef.PLAYER_INT_FIELD_CULTIVATION_LEFT_PLUNDER_COUNT = 896; // 当前剩余挑战次数
    SharedDef.PLAYER_INT_FIELD_CULTIVATION_PLUNDER_RECORD_INDEX = 897; // 修练场修炼记录下标
    SharedDef.PLAYER_INT_FIELD_CULTIVATION_TOTAL_BEEN_PLUNDER_COUNT = 898; // 本轮被掠夺成功次数
    SharedDef.PLAYER_INT_FIELD_CULTIVATION_TODAY_TOTAL_PLUNDER_COUNT = 899; // 本日总掠夺次数
    SharedDef.PLAYER_INT_FIELD_CULTIVATION_START_TIME = 900; // 修炼开始时间
    SharedDef.PLAYER_INT_FIELD_CULTIVATION_LOST_INFO = 901; // 修炼宝箱丢失信息
    // 登陆大礼相关
    SharedDef.PLAYER_INT_FIELD_LOGIN_ACTIVITY_TOTAL_DAYS = 902; // 登陆总天数
    SharedDef.PLAYER_INT_FIELD_LOGIN_ACTIVITY_REWARD_STATUS_START = 903; // 领取状态开始
    SharedDef.PLAYER_INT_FIELD_LOGIN_ACTIVITY_REWARD_STATUS_END = 905; // 领取状态结束
    //  非强制引导ID
    SharedDef.PLAYER_INT_FIELD_OPTIONAL_GUIDE_START = 906; // 非强制引导开始
    SharedDef.PLAYER_INT_FIELD_OPTIONAL_GUIDE_END = 966; //  非强制引导结束
    SharedDef.PLAYER_INT_FILED_LEAVE_RISK_TIME = 966; // 离开冒险世界的时间戳
    SharedDef.PLAYER_INT_FILED_LEAVE_RISK_SUIT_SCORE = 967; // 是否已经领取不在冒险世界的挂机奖励
    SharedDef.PLAYER_INT_FILED_FACTION_BUILDING_SPEEDUP_DAILY_COUNT = 968; // 家族建筑升级加速每日次数
    SharedDef.PLAYER_INT_FILED_FACTION_DONATE_GIFT_EXCHANGE_DAILY_COUNT = 969; // 家族宝库贡献礼物兑换每日次数
    SharedDef.PLAYER_INT_FILED_CHARM_POINT = 970; // 魅力值
    SharedDef.PLAYER_INT_FILED_FACTION_GIFT_NEXT_COUNT_ID = 972; // 玩家礼物历史记录下一个count_id
    SharedDef.PLAYER_INT_FILED_FACTION_GIFT_START = 973; // 玩家礼物历史记录开始
    SharedDef.PLAYER_INT_FILED_FACTION_GIFT_END = 1723;
    SharedDef.PLAYER_INT_FIELD_CREATE_ICON = 1723; // 待创建的帮派icon
    SharedDef.PLAYER_INT_FIELD_FACTION_GIFT_POINT_COUNT = 1724; // 帮派魅力赠送总记数
    SharedDef.PLAYER_INT_FIELD_FACTION_GIFT_SEND_COUNT = 1726; // 帮派礼物赠送总记数
    SharedDef.PLAYER_INT_FIELD_FACTION_GIFT_BEEN_THANK_COUNT = 1727; // 帮派礼物赠送被女王感谢记数
    SharedDef.PLAYER_INT_FIELD_MASS_BOSS_BUYED_TIMES = 1728; // 已经购买次数
    SharedDef.PLAYER_INT_FIELD_MASS_BOSS_TIMES = 1729; // 全民boss次数
    SharedDef.PLAYER_INT_FIELD_MASS_BOSS_CD = 1730; // 全民boss回复cd(0:表示已满了, 只有次数不满的情况才有cd)
    SharedDef.PLAYER_INT_FIELD_TALISMAN_FORCE = 1731; // 法宝总战力
    SharedDef.PLAYER_INT_FIELD_WINGS_FORCE = 1732; // 神羽总战力
    SharedDef.PLAYER_INT_FIELD_GROUP_INSTANCE_CLEAR_FLAG = 1733; // 组队副本首次通关flag
    SharedDef.PLAYER_INT_FIELD_MERIDIAN_FORCE = 1734; // 经脉修炼战力
    SharedDef.PLAYER_INT_FIELD_WINGS_RANK = 1735; // 神羽阶数
    SharedDef.PLAYER_INT_FIELD_FACTION_BOSSDEFENSE_TICKETS = 1736; // 家族首领挑战剩余次数
    SharedDef.PLAYER_INT_FIELD_FACTION_TOWER_CLEAR_FLOOR = 1737; // 家族无尽远征 历史挑战层数
    SharedDef.PLAYER_INT_FIELD_FACTION_TOWER_FLAG = 1738; // 0 扫荡状态 1~15 宝箱领取状态
    SharedDef.PLAYER_INT_FIELD_QUALIFY_SCORE = 1739; //  排位赛积分
    SharedDef.PLAYER_INT_FIELD_FACTION_SKILL_LV_START = 1740; // 家族技能等级开始 0:已学习等级 uint16 1:当前生效等级
    SharedDef.PLAYER_INT_FIELD_FACTION_SKILL_LV_END = 1760; // 家族技能等级结束
    SharedDef.PLAYER_INT_FIELD_APPEARANCE = 1760; //  外观(0:武器,1:衣服)
    SharedDef.PLAYER_INT_FIELD_WEAPON_FORCE = 1761; //  武器外观战力
    SharedDef.PLAYER_INT_FIELD_CLOTH_FORCE = 1762; //  衣服外观战力
    SharedDef.PLAYER_INT_FIELD_POKEDEX_FORCE = 1763; //  图鉴战力
    SharedDef.PLAYER_INT_FIELD_TITLE_FORCE = 1764; //  称号战力
    SharedDef.PLAYER_INT_FIELD_RENAME_TIMES = 1765; //  改名次数
    SharedDef.PLAYER_INT_FIELD_REVENGE_TIMES = 1766; // 当日剩余复仇次数
    SharedDef.PLAYER_INT_FIELD_REVENGE_BUY_TIMES = 1767; // 当日复仇购买次数
    SharedDef.PLAYER_INT_FIELD_WINGS_STAR = 1768; // 神羽星数
    SharedDef.PLAYER_INT_FIELD_VIPGIFT_FLAG = 1769; // vip礼包购买状态
    SharedDef.PLAYER_APPD_INT_FIELD_CONSUME_SUM = 1770; // 累计消费元宝
    SharedDef.PLAYER_APPD_INT_FIELD_MONEYTREE_COUNT = 1771; // 摇钱树摇钱次数
    SharedDef.PLAYER_APPD_INT_FIELD_MONEYTREE_GIFT_FLAG = 1772; // 摇钱树礼包领取状态
    SharedDef.PLAYER_INT_FIELD_WORLD_RISK_LAST_ID = 1773; // 最后一次进入的幻境地图id
    SharedDef.PLAYER_INT_FIELD_LAST_INSTANCE_TYPE = 1774; // 上次副本子类型
    SharedDef.PLAYER_INT_FIELD_LAST_INSTANCE_PARAM = 1775; // 上次副本额外参数
    SharedDef.PLAYER_EXPAND_INT_LAST_IS_RISK = 1776; // 最后一次进的是幻境
    SharedDef.PLAYER_INT_FIELD_RESTORE_POTION_CD = 1777; // 回复药功能CD
    SharedDef.PLAYER_INT_FIELD_ESCORT_ROB_COUNT = 1778; // 劫镖次数
    SharedDef.PLAYER_INT_FIELD_ADVENTURE_ROBOT_KILL_COUNT = 1779; // 冒险击杀机器人计数
    // ////////////////////////////////////////////////////////////////////////////////////////////////////////
    // 字符串部分
    SharedDef.PLAYER_STRING_FIELD_ACCOUNT = 4; // 账号
    SharedDef.PLAYER_STRING_FIELD_TELEPORT_GUID = 5; // 传送GUID
    SharedDef.PLAYER_APPD_STRING_FIELD_CLIENT_DATA = 6; // 远程存储
    SharedDef.PLAYER_STRING_FIELD_LAST_LOGIN_IP = 26; // 玩家最后登录的IP
    SharedDef.PLAYER_STRING_FIELD_RECHARGE_ID = 27; // 最后充值ID
    SharedDef.PLAYER_STRING_FIELD_CREATE_LOGIN_IP = 28; // 玩家创建IP
    SharedDef.PLAYER_APPD_STRING_FIELD_PINGTAI_INFO = 29; // 平台信息
    SharedDef.PLAYER_STRING_FIELD_DB_KUAFU_INFO = 30; // 玩家跨服信息,是否为跨服玩家依据这个下标是不是空串
    SharedDef.PLAYER_STRING_FIELD_FACTION_GUID = 31; // 帮派guid
    SharedDef.PLAYER_STRING_FIELD_FACTION_NAME = 32; // 帮派名字
    // -----------------------------------
    SharedDef.PLAYER_STRING_FIELD_BLOCK_START = 33; // 聊天屏蔽列表开始
    SharedDef.PLAYER_STRING_FIELD_BLOCK_END = 63; // 聊天屏蔽列表开始
    SharedDef.PLAYER_STRING_FIELD_RANKLIKE_START = 63; // 排行榜点赞列表开始
    SharedDef.PLAYER_STRING_FIELD_RANKLIKE_ENE = 73; // 排行榜点赞列表结束
    // 修炼场相关
    SharedDef.PLAYER_STRING_INT_FIELD_CULTIVATION_RIVAL_GUID_START = 74; // 修练场对手guid开始
    SharedDef.PLAYER_STRING_INT_FIELD_CULTIVATION_RIVAL_GUID_END = 78; // 修练场对手guid结束
    SharedDef.PLAYER_STRING_INT_FIELD_CULTIVATION_PLUNDER_RECORD_START = 79; // 修练场修炼记录开始
    SharedDef.PLAYER_STRING_INT_FIELD_CULTIVATION_PLUNDER_RECORD_END = 89; // 修练场修炼记录结束
    SharedDef.PLAYER_STRING_FIELD_INVITE_FACTION_GUID = 89; // 邀请的帮派guid
    SharedDef.PLAYER_STRING_FIELD_CREATE_FACTION_NAME = 90; // 待创建的帮派名称
    SharedDef.PLAYER_STRING_FILED_FACTION_GIFT_START = 91; // 玩家礼物历史记录开始
    SharedDef.PLAYER_STRING_FILED_FACTION_GIFT_END = 691;
    SharedDef.PLAYER_STRING_FIELD_GROUP_PEACE_ID = 691; // 组队模式下的组队id
    SharedDef.PLAYER_BASIC_SPELL_CAPACITY = 30; // 玩家基础技能的上限
    SharedDef.PLAYER_DIVINE_SPELL_CAPACITY = 15; // 玩家神兵个数的上限
    SharedDef.PLAYER_TALISMAN_SPELL_CAPACITY = 15; // 玩家法宝个数的上限
    //  玩家拥有的基本技能属性信息
    SharedDef.SHORT_SPELL_ID = 0; // 技能id short
    SharedDef.SHORT_SPELL_LV = 1; // 技能等级 short
    //  技能槽对应技属性
    SharedDef.SLOT_COMBO = 1; // 连招技能槽
    SharedDef.SLOT_DIVINE = 5; // 神兵技能槽
    SharedDef.SLOT_ANGER = 6; // 愤怒技能槽
    SharedDef.SPELL_SLOT_COUNT = 6; // 技能槽的数量
    //  技能类型
    SharedDef.SKILL_TYPE_DIVINE = 4; // 神兵技能
    SharedDef.MOUNT_UPGRADE_SKILL_COUNT = 10;
    SharedDef.MOUNT_ILLUSION_COUNT = 30;
    SharedDef.EQUIPMENT_COUNT = 10;
    SharedDef.DIVINE_PASSIVE_SKILL_COUNT = 3;
    SharedDef.EQUIPDEVELOP_GEM_COUNT = 10;
    //  幻化属性
    SharedDef.ILLUSION_ATTR_ID = 0; // 幻化id
    SharedDef.ILLUSION_ATTR_SPELL_START = 1; // 幻化技能开始
    SharedDef.ILLUSION_ATTR_SPELL_END = 3; // 幻化技能结束
    SharedDef.ILLUSION_ATTR_EXPIRE = 3; // 过期时间
    SharedDef.MAX_ILLUSION_ATTR_COUNT = 4;
    SharedDef.EXPIRE_TYPE_ILLUSION = 0; // 幻化过期
    SharedDef.EXPIRE_TYPE_DIVINE = 1; // 神兵过期
    SharedDef.STRENGTHEN_LEV_BLESS = 0; // 强化等级 祝福值
    SharedDef.MAX_STRENGTHEN_COUNT = 1;
    SharedDef.GEM_LEV = 0; // 宝石等级
    SharedDef.GEM_CURID_BLESS = 3; // 当前宝石  1short 宝石祝福值 0short 
    SharedDef.MAX_GEM_COUNT = 4;
    SharedDef.DIVINE_ID_LEV_BLESS = 0; // 神兵 id_8 等级lev_8 祝福值bless_16
    SharedDef.DIVINE_TIME = 1; // 神兵到期时间
    SharedDef.DIVINE_SKILL = 2;
    SharedDef.DIVINE_PASSIVE_SKILL = 3;
    SharedDef.DIVINE_IMPROVE = 6; // 神兵培养 铸造 forge 0; 进阶 advance 1; 铸魂 spirit 2
    SharedDef.MAX_DIVINE_COUNT = 7;
    SharedDef.TALISMAN_ID_LV = 0; // 法宝 id_8 等级 lev_8
    SharedDef.TALISMAN_FORCE = 1; // 法宝 战力
    SharedDef.MAX_TALISMAN_COUNT = 2;
    SharedDef.EQUIPDEVELOP_STRENGTH_LV = 0; // 0 int16 强化等级
    SharedDef.EQUIPDEVELOP_REFINE_LV = 1; // 0 int16 阶数 1 int16 星数
    SharedDef.EQUIPDEVELOP_GEM_LV_START = 2; // 宝石等级开始 int16 int16
    SharedDef.EQUIPDEVELOP_GEM_LV_END = 7; // 宝石等级结束
    SharedDef.MAX_EQUIPDEVELOP_COUNT = 8;
    //  升级技能类型
    SharedDef.RAISE_BASE_SKILL = 1; // 基础技能
    SharedDef.RAISE_MOUNT_SKILL = 2; // 坐骑技能
    SharedDef.RAISE_ILLUSION_SKILL = 3; // 幻化技能
    SharedDef.RAISE_DIVINE_SKILL = 4; // 幻化技能
    // 装备养成操作类型
    SharedDef.EQUIPDEVELOP_TYPE_STRENGTH_LVUP = 1;
    SharedDef.EQUIPDEVELOP_TYPE_REFINE_STAR_LVUP = 2;
    SharedDef.EQUIPDEVELOP_TYPE_REFINE_RANK_LVUP = 3;
    SharedDef.EQUIPDEVELOP_TYPE_GEM_ACTIVE = 4;
    SharedDef.EQUIPDEVELOP_TYPE_GEM_LVUP = 5;
    SharedDef.EQUIPDEVELOP_TYPE_WASHATTRS_WASH = 6;
    SharedDef.EQUIPDEVELOP_TYPE_WASHATTRS_SAVE = 7;
    SharedDef.EQUIPDEVELOP_TYPE_WASHATTRS_DEL = 8;
    SharedDef.EQUIPDEVELOP_TYPE_STRENGTH_ALL = 9;
    SharedDef.MAX_EXTERIOR_COUNT = 200; //  最大外观数量
    // 活动数据int
    SharedDef.PLAYER_ACTIVITTY_DATA_INT_0 = 0;
    SharedDef.PLAYER_ACTIVITTY_DATA_INT_1 = 1;
    SharedDef.PLAYER_ACTIVITTY_DATA_INT_2 = 2;
    SharedDef.PLAYER_ACTIVITTY_DATA_INT_3 = 3;
    SharedDef.MAX_PLAYERACTIVITTYDATAINT_COUNT = 4;
    // 活动数据string
    SharedDef.PLAYER_ACTIVITTY_DATA_STRING_0 = 0;
    SharedDef.MAX_PLAYERACTIVITTYDATASTRING_COUNT = 1;
    SharedDef.MAX_PLAYERDACTIVITTYDATA_COUNT = 100; // 最大活动数据数量
    // 玩家技能信息
    SharedDef.SPELL_BASE_COUNT = 0; // 基础技能个数
    SharedDef.SPELL_INT_FIELD_BASE_SPELL_START = 1; // 基础技能开始
    SharedDef.SPELL_INT_FIELD_BASE_SPELL_END = 31;
    SharedDef.SPELL_INT_FIELD_MOUNT_LEVEL = 31; // 2个short (0阶数, 1星级)
    SharedDef.SPELL_INT_FIELD_MOUNT_TRAIN_EXP = 32; // 当前培养经验
    SharedDef.SPELL_INT_FIELD_MOUNT_LEVEL_BASE = 33; // 坐骑等级
    SharedDef.SPELL_INT_FIELD_MOUNT_SPELL_START = 34; // 进阶技能开始
    SharedDef.SPELL_INT_FIELD_MOUNT_SPELL_END = 44; // 进阶技能结束
    SharedDef.SPELL_INT_FIELD_MOUNT_BLESS_EXP = 44; // 进阶祝福值
    SharedDef.SPELL_INT_FIELD_MOUNT_ILLUSION_START = 45; // 幻化开始
    SharedDef.SPELL_INT_FIELD_MOUNT_ILLUSION_END = 165; // 幻化结束
    SharedDef.SPELL_STRENGTHEN_START = 166; // 强化开始
    SharedDef.SPELL_STRENGTHEN_END = 176; // 强化结束
    SharedDef.SPELL_STRENGTHEN_ALLMUL = 177; // 全身强化标记
    SharedDef.SPELL_GEM_START = 178; // 宝石开始
    SharedDef.SPELL_GEM_END = 218; // 宝石结束
    SharedDef.SPELL_GEM_ALLMUL = 219; // 全身宝石标记
    SharedDef.SPELL_DIVINE_COUNT = 220; // 神兵个数
    SharedDef.SPELL_DIVINE_START = 221; // 神兵开始
    SharedDef.SPELL_DIVINE_END = 326; // 神兵结束
    SharedDef.SPELL_TALISMAN_START = 326; // 法宝开始
    SharedDef.SPELL_TALISMAN_END = 356; // 法宝结束
    SharedDef.SPELL_WINGS_ID = 356; // 翅膀id  阶数*100 + 星数
    SharedDef.SPELL_WINGS_LEVEL = 357; // 翅膀强化等级
    SharedDef.SPELL_WINGS_BLESS_EXP = 358; // 翅膀当前祝福经验
    SharedDef.SPELL_INT_FIELD_MERIDIAN_LEVEL = 359; //  2shorts(0:经脉等级, 1:是否需要突破)
    SharedDef.SPELL_INT_FIELD_MERIDIAN_EXP = 360; //  经脉经验
    SharedDef.SPELL_INT_FIELD_MERIDIAN_CNT_START = 361; //  每天完成次数开始
    SharedDef.SPELL_INT_FIELD_MERIDIAN_CNT_END = 374; //  每天完成次数结束
    SharedDef.SPELL_INT_FIELD_EQUIPDEVELOP_START = 374; //  装备培养开始
    SharedDef.SPELL_INT_FIELD_EQUIPDEVELOP_END = 454; // 装备培养结束
    SharedDef.SPELL_INT_FIELD_EQUIPDEVELOP_BONUS_LV = 454; //  装备培养奖励等级 0 强化 1 精炼 2 镶嵌
    SharedDef.SPELL_INT_FIELD_APPEARANCE_START = 455; //  外观开始
    SharedDef.SPELL_INT_FIELD_APPEARANCE_END = 655; //  外观结束
    SharedDef.SPELL_INT_FIELD_PLAYER_ACTIVITY_DATA_START = 655; // 活动玩家数据开始
    SharedDef.SPELL_INT_FIELD_PLAYER_ACTIVITY_DATA_END = 1055; // 活动玩家数据结束
    SharedDef.SPELL_STRING_FIELD_EQUIPDEVELOP_WASHATTRS_INFO = 4; // 洗点结果缓存
    SharedDef.SPELL_STRING_FIELD_PLAYER_ACTIVITY_DATA_START = 5; // 活动玩家数据开始
    SharedDef.SPELL_STRING_FIELD_PLAYER_ACTIVITY_DATA_END = 105; // 活动玩家数据结束
    SharedDef.SOCIAL_FRIEND_MAX_NUM = 60; // 好友数
    SharedDef.SOCIAL_APPLY_MAX_NUM = 10; //  申请数
    SharedDef.SOCIAL_ENEMY_MAX_NUM = 20; // 仇人数
    SharedDef.SOCIAL_START = 4;
    SharedDef.SOCIAL_ICON_VIP_LEV = 0; // 图标 vip 等级
    SharedDef.SOCIAL_FAMILIAR_LEV_EXP = 1; // 亲密度等级 亲密度经验
    SharedDef.SOCIAL_FAMILIAR_FORCE = 2; // 战力
    SharedDef.MAX_FRIENT_COUNT = 4;
    SharedDef.SOCIAL_BASE_COUNT = 0; // SOCIAL_BASE_COUNT = 0,//好友个数
    SharedDef.SOCIAL_REVENGE_NUM = 4; // 复仇次数
    SharedDef.SOCIAL_REVENGE_CD = 5; // 复仇CD
    SharedDef.SOCIAL_FRIEND_START = 6; // 好友开始
    SharedDef.SOCIAL_FRIEND_END = 246; // 好友结束
    SharedDef.SOCIAL_ENEMY_START = 246; // 仇人开始
    SharedDef.SOCIAL_ENEMY_END = 326; // 仇人结束
    SharedDef.SOCIAL_APPLY_START = 326; // 申请开始
    SharedDef.SOCIAL_APPLY_END = 366; // 申请结束
    SharedDef.SOCIAL_APPLY_CLEAR_FLAG = 366; // 申请清除标记
    SharedDef.SOCIAL_ENEMY_TIME_START = 367; // 仇人时间戳开始
    SharedDef.SOCIAL_ENEMY_TIME_END = 387; // 仇人时间戳结束
    // ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    // 帮派下标
    // 帮派事件
    SharedDef.FACTION_EVENT_TYPE_NULL = 0; // 预留
    SharedDef.FACTION_EVENT_TYPE_ADD_MEMBER = 1; // 添加成员
    SharedDef.FACTION_EVENT_TYPE_SUB_MEMBER = 2; // 成员离开
    SharedDef.FACTION_EVENT_TYPE_APPOINT = 3; // 任免
    SharedDef.FACTION_EVENT_TYPE_KICK_MEMBER = 4; // 踢出成员
    SharedDef.FACTION_EVENT_TYPE_JUANXIAN = 5; // 捐献
    SharedDef.FACTION_EVENT_TYPE_HONGBAO = 6; // 发红包
    SharedDef.FACTION_EVENT_TYPE_SHANGXIANG = 7; // 上香
    // 帮派管理类型
    SharedDef.FACTION_MANAGER_TYPE_AGREE_JOIN = 0; // 同意加入帮派
    SharedDef.FACTION_MANAGER_TYPE_REFUSE_JOIN = 1; // 拒绝加入帮派
    SharedDef.FACTION_MANAGER_TYPE_KICK = 2; // 踢出帮派
    SharedDef.FACTION_MANAGER_TYPE_APPOINT = 3; // 职位任免
    SharedDef.FACTION_MANAGER_TYPE_RECRUIT = 4; // 招募设置
    SharedDef.FACTION_MANAGER_TYPE_LEVEL_UP = 5; // 帮派升级
    SharedDef.FACTION_MANAGER_TYPE_CHANGE_FLAGS = 6; // 替换帮旗
    SharedDef.FACTION_MANAGER_TYPE_NOTICE = 7; // 帮会公告
    SharedDef.FACTION_MANAGER_TYPE_AGREE_JOIN_ALL = 8; // 全部同意加入帮派
    SharedDef.FACTION_MANAGER_TYPE_REFUSE_JOIN_ALL = 9; // 全部拒绝加入帮派
    SharedDef.FACTION_MANAGER_TYPE_QUIT = 10; // 退出帮派
    // 帮众操作类型
    SharedDef.FACTION_MANAGER_TYPE_JUANXIAN = 0; // 捐献
    SharedDef.FACTION_MANAGER_TYPE_FULI = 1; // 领取福利
    SharedDef.FACTION_MANAGER_TYPE_FA_HONGBAO = 2; // 发红包
    SharedDef.FACTION_MANAGER_TYPE_LQ_HONGBAO = 3; // 领取红包
    SharedDef.FACTION_MANAGER_TYPE_SHANGXIANG = 4; // 上香
    SharedDef.FACTION_MANAGER_TYPE_SHOP = 5; // 购买
    SharedDef.FACTION_MANAGER_TYPE_BUY_TOKEN = 6; // 购买令牌
    SharedDef.FACTION_MANAGER_TYPE_CHALLENGE_BOSS = 7; // 挑战家族Boss
    SharedDef.FACTION_MANAGER_TYPE_BUILDING_UPGRADE = 8; // 建筑升级
    SharedDef.FACTION_MANAGER_TYPE_BUILDING_UPGRADE_SPEEDUP = 9; // 建筑升级加速
    SharedDef.FACTION_MANAGER_TYPE_DONATE_GIFT_EXCHANGE = 10; // 贡献礼包兑换
    SharedDef.FACTION_MANAGER_TYPE_GIFT_SHOW_PAGE = 11; // 查看礼物列表
    SharedDef.FACTION_MANAGER_TYPE_GIFT_SHOW_INFO = 12; // 查看礼物信息
    SharedDef.FACTION_MANAGER_TYPE_GIFT_SHOW_UNTHANK_PAGE = 13; // 女王查看未感谢礼物
    SharedDef.FACTION_MANAGER_TYPE_GIFT_SHOW_HISTORY_PAGE = 14; // 女王查看历史记录
    SharedDef.FACTION_MANAGER_TYPE_GIFT_THANK = 15; // 女王感谢
    SharedDef.FACTION_MANAGER_TYPE_GIFT_THANK_ALL = 16; // 女王全部感谢
    SharedDef.FACTION_MANAGER_TYPE_GIFT_THANK_AND_REPLY = 17; // 女王感谢并回复
    SharedDef.FACTION_MANAGER_TYPE_GIFT_REPLY = 18; // 所有人回复
    SharedDef.FACTION_MANAGER_TYPE_BOSSDEFENSE_CHALLENGE = 19; // 进行首领挑战
    SharedDef.FACTION_MANAGER_TYPE_BOSSDEFENSE_DAMAGE_LIST = 20; // 查看首领挑战输出前10
    SharedDef.FACTION_MANAGER_TYPE_TOWER_CHALLENGE = 21; // 无尽远征 挑战下一关
    SharedDef.FACTION_MANAGER_TYPE_TOWER_SWEEP = 22; // 无尽远征 扫荡
    SharedDef.FACTION_MANAGER_TYPE_TOWER_CHEST = 23; // 无尽远征 开宝箱
    SharedDef.FACTION_MANAGER_TYPE_SKILL_LVUP = 24; // 升级家族技能
    // 帮众建筑类型
    SharedDef.FACTION_BUILDING_TYPE_MAINHALL = 1; // 主殿
    SharedDef.FACTION_BUILDING_TYPE_STOREHOUSE = 2; // 宝库房
    SharedDef.FACTION_BUILDING_TYPE_BANK = 3; // 金库
    SharedDef.FACTION_BUILDING_TYPE_EVENT = 4; // 活动大厅
    SharedDef.FACTION_BUILDING_TYPE_SKILL = 5; // 技能坊
    SharedDef.FACTION_BUILDING_TYPE_SHOP = 6; // 家族商店
    // 帮派成员最多拥有的buff数
    SharedDef.MAX_FACTION_MENBER_BUFF_NUM = 6;
    // 帮派最多拥有的buff数
    SharedDef.MAX_FACTION_BUFF_NUM = 6;
    // 当前屏幕最大buff数
    SharedDef.MAX_CUR_SCREEN_BUFF_NUM = 6;
    // 帮派申请列表最大玩家数
    SharedDef.MAX_FACTION_APLLY_MAMBER_COUNT = 3;
    // 帮派最大成员数
    SharedDef.MAX_FACTION_MAMBER_COUNT = 50;
    // 帮派捐献记录
    SharedDef.MAX_FACTION_EVENT_COUNT = 10;
    SharedDef.MAX_FACTION_SHOP = 8;
    // 帮派最大红包数
    SharedDef.MAX_FACTION_HONGBAO_COUNT = 10;
    // 帮派最大BOSS数
    SharedDef.MAX_FACTION_BOSS_COUNT = 10;
    // 帮派最大建筑数量
    SharedDef.MAX_FACTION_BUILDING_COUNT = 10;
    // 帮派成员的INT信息
    SharedDef.FACTION_INT_MEMBER_FORCE = 0; // 成员战斗力
    SharedDef.FACTION_INT_MEMBER_UINT16 = 2; // 0.成员等级,1.今日贡献
    SharedDef.FACTION_INT_MEMBER_BYTE = 3; // 0.是否在线,1.身份, 2,是否VIP，3,今日活跃度
    SharedDef.FACTION_INT_MEMBER_LOGOUT_TIME = 4; // 最后离线时间
    SharedDef.FACTION_INT_MEMBER_FLAGS = 5; // 成员标志位
    SharedDef.FACTION_INT_MEMBER_TOTAL_CONTRIBUTION = 6; // 历史贡献 - 申请时间
    SharedDef.FACTION_INT_MEMBER_CHARM = 7; // 个人的魅力值
    SharedDef.FACTION_INT_MEMBER_TOTAL_SEND_CHARM = 9; // (魅力总贡献) 
    SharedDef.FACTION_INT_MEMBER_TOWER_TODAY_FLOOR = 10; // 无尽远征今日通关层数
    SharedDef.MAX_FACTION_INT_MEMBER = 11;
    // 帮派成员的STRING信息
    SharedDef.FACTION_STRING_MEMBER_GUID = 0; // 成员 ID
    SharedDef.FACTION_STRING_MEMBER_NAME = 1; // 成员名称
    SharedDef.MAX_FACTION_STRING_MEMBER = 2;
    SharedDef.FACTION_INT_EVENT_TYPE_VALUE = 0; // 类型，数值
    SharedDef.FACTION_INT_EVENT_RESERVE = 1; // 保留字段
    SharedDef.MAX_FACTION_INT_EVENT = 2;
    // 帮派成员身份枚举
    SharedDef.FACTION_MEMBER_IDENTITY_NULL = 0; // 空，预留
    SharedDef.FACTION_MEMBER_IDENTITY_BANGZHU = 1; // 帮主
    SharedDef.FACTION_MEMBER_IDENTITY_FU_BANGZHU = 2; // 副帮主
    SharedDef.FACTION_MEMBER_IDENTITY_TANGZHU = 3; // 堂主
    SharedDef.FACTION_MEMBER_IDENTITY_JINGYING = 4; // 精英
    SharedDef.FACTION_MEMBER_IDENTITY_QUNZHONG = 5; // 群众
    // 帮派标志位
    SharedDef.FACTION_FLAGS_AUTO = 0; // 帮派是否自动接受申请
    SharedDef.FACTION_FLAGS_IS_BOSS_ADD = 1; // 帮派是否有人通关了boss副本
    // 帮派buff信息枚举
    SharedDef.FACTION_BUFF_ID = 0; // 0：buff类型，1：预留
    SharedDef.FACTION_BUFF_END_TM = 1; // buff结束时间
    SharedDef.MAX_FACTION_BUFF = 2;
    SharedDef.MAX_FACTION_STOREHOUSE_COUNT = 100;
    SharedDef.MAX_FACTION_STOREHOUSE_RECORD_COUNT = 10;
    // 帮派成员的INT信息
    SharedDef.FACTION_INT_BOSSDEFENSE_POOL_ID = 0; // 怪物池id
    SharedDef.FACTION_INT_BOSSDEFENSE_HP = 1; // 剩余hp
    SharedDef.FACTION_INT_BOSSDEFENSE_MAX_HP = 2; // 最大hp
    SharedDef.FACTION_INT_BOSSDEFENSE_STATUS = 3; // 怪物状态	0:空闲 1:战斗 2:死亡
    SharedDef.MAX_FACTION_BOSSDEFENSE = 4;
    SharedDef.MAX_FACTION_BOSSDEFENSE_COUNT = 6;
    // 帮派下标
    // UINT32 部分
    SharedDef.FACTION_INT_FIELD_PLAYER_NOW_INDEX = 0; // 帮派成员空位置索引
    SharedDef.FACTION_INT_FIELD_FLAG = 1; // 帮派FLAG
    SharedDef.FACTION_INT_FIELD_PLAYER = 2; // 帮派成员开始下标
    SharedDef.FACTION_INT_FIELD_PLAYER_END = 552; // 帮派申请索引
    SharedDef.FACTION_INT_FIELD_APPLY_PLAYER_COUNT_INDEX = 552;
    SharedDef.FACTION_INT_FIELD_APPLY_PLAYER = 553; // 玩家申请加入帮派列表
    SharedDef.FACTION_INT_FIELD_APPLY_PLAYER_END = 586; // 帮派申请玩家列表
    SharedDef.FACTION_INT_FIELD_EVENT = 586; // 帮派记录开始
    SharedDef.FACTION_INT_FIELD_EVENT_END = 606; // 帮派记录结束
    SharedDef.FACTION_INT_FIELD_EVENT_FALG = 606; // 帮派记录标志位
    SharedDef.FACTION_INT_FIELD_SHOP = 607; // 商店开始
    SharedDef.FACTION_INT_FIELD_SHOP_END = 615; // 商店结束
    SharedDef.FACTION_INT_FIELD_FORCE = 615; // 帮派战斗力
    SharedDef.FACTION_INT_FIELD_MONEY = 617; // 帮派资产
    SharedDef.FACTION_INT_FIELD_LEVEL = 619; // 帮派等级
    SharedDef.FACTION_INT_FIELD_ACTIVITY = 620; // 帮派活跃度
    SharedDef.FACTION_INT_FIELD_RANK = 621; // 帮派排名
    SharedDef.FACTION_INT_FIELD_FLAGS_ID = 622; // (byte)0:帮派当前选择的旗帜ID (byte)1:神明等级 (uint16)1:灵气
    SharedDef.FACTION_INT_FIELD_MINLEV = 623; // 加入帮派最小等级
    SharedDef.FACTION_INT_FIELD_TOKEN_NUM = 624; // 令牌数量
    SharedDef.FACTION_INT_FIELD_TOKEN_POINTS = 625; // 令牌今日积分进度
    SharedDef.FACTION_INT_FIELD_TOKEN_POINTS_COUNT = 626; // 令牌今日积分完成次数
    SharedDef.FACTION_INT_FIELD_TOKEN_TODAY_BUY_COUNT = 627; // 今日令牌购买次数
    SharedDef.FACTION_INT_FIELD_CHALLENGE_BOSS_ID_MAX = 628; // 已挑战最大boss id
    SharedDef.FACTION_INT_FIELD_CHALLENGE_BOSS_ID = 629; // 当前挑战boss id
    SharedDef.FACTION_INT_FIELD_CHALLENGE_BOSS_START_TIME = 630; // 当前挑战开始时间
    SharedDef.FACTION_INT_FIELD_CHALLENGE_BOSS_HP_RATE = 631; // 当前boss血量万分比
    SharedDef.FACTION_INT_FIELD_CHALLENGE_BOSS_POS = 632; // 当前boss位置 x,y
    SharedDef.FACTION_INT_FIELD_PROTECT_TARGET_HP_RATE = 633; // 当前守护目标血量万分比
    SharedDef.FACTION_INT_FIELD_PROTECT_TARGET_POS = 634; // 当前守护目标位置 x,y
    SharedDef.FACTION_INT_FIELD_CHALLENGE_BOSS_DAMAGE_RANK_START = 635; // 当前boss输出榜开始 int 输出值
    SharedDef.FACTION_INT_FIELD_CHALLENGE_BOSS_DAMAGE_RANK_END = 685; // 当前boss输出榜结束
    SharedDef.FACTION_INT_FIELD_CHALLENGE_BOSS_TOTAL_RANK_START = 685; // 总输出榜开始
    SharedDef.FACTION_INT_FIELD_CHALLENGE_BOSS_TOTAL_RANK_END = 735; // 总输出榜结束
    SharedDef.FACTION_INT_FIELD_STOREHOUSE_ITEM_COUNT = 735; // 宝库道具数量
    SharedDef.FACTION_INT_FIELD_STOREHOUSE_RECORD_CURSOR = 736; // 宝库记录游标
    SharedDef.FACTION_INT_FIELD_BUILDING_ID_START = 737; // 已有建筑id开始
    SharedDef.FACTION_INT_FIELD_BUILDING_ID_END = 747; // 已有建筑id结束
    SharedDef.FACTION_INT_FIELD_BUILDING_LVUP_ID = 747; // 当前正在升级的建筑id
    SharedDef.FACTION_INT_FIELD_BUILDING_LVUP_FINISH_TIME = 748; // 当前升级建筑完成时间戳
    SharedDef.FACTION_INT_FIELD_IS_DISSOLVED = 749; // 是否解散
    SharedDef.FACTION_INT_FIELD_GIFT_WEEK_POINT_START = 750; // 礼物周榜魅力值计数开始
    SharedDef.FACTION_INT_FIELD_GIFT_WEEK_POINT_END = 800; // 礼物周榜魅力值计数结束
    SharedDef.FACTION_INT_FIELD_GIFT_UNCHECK_COUNT_START = 800; // 未处理礼物计数开始 女王未感谢 成员为领取
    SharedDef.FACTION_INT_FIELD_GIFT_UNCHECK_COUNT_END = 850; // 未处理礼物计数结束
    SharedDef.FACTION_INT_FIELD_CHARM_POINT = 851; // 帮派女王魅力值 double
    SharedDef.FACTION_INT_FIELD_GIFT_SEND_COUNT_START = 853; // 今日赠送礼物次数开始
    SharedDef.FACTION_INT_FIELD_GIFT_SEND_COUNT_END = 903; // 今日赠送礼物次数结束
    SharedDef.FACTION_INT_FIELD_GIFT_LAST_SEND_TIME = 903; // 最后赠送的时间
    SharedDef.FACTION_INT_FIELD_GIFT_QUEEN_UNCHECK_COUNT = 905; // 女王未处理礼包数
    SharedDef.FACTION_INT_FIELD_BOSSDENFENSE_START = 906; // 家族首领挑战信息开始
    SharedDef.FACTION_INT_FIELD_BOSSDENFENSE_END = 930; // 家族首领挑战信息结束
    SharedDef.FACTION_INT_FIELD_TOWER_TODAY_TOP_FLOOR = 930; // 无尽远征 每日最高者 层数 int32
    SharedDef.FACTION_INT_FIELD_TOWER_TODAY_TOP_ICON = 931; // 无尽远征 每日最高者 头像 int32
    SharedDef.FACTION_INT_FIELD_TOWER_TODAY_TOP_FORCE = 932; // 无尽远征 每日最高者 战力 double
    SharedDef.FACTION_INT_FIELD_TOTAL_FORCE = 934; //  double 帮派成员总战力
    SharedDef.FACTION_INT_FIELD_MANGER_COAT = 936; // 帮主衣服
    SharedDef.FACTION_INT_FIELD_MANGER_WEAPON = 937; // 帮主武器
    SharedDef.FACTION_INT_FIELD_MANGER_VIP = 938; // 帮主vip
    SharedDef.FACTION_INT_FIELD_MANGER_GENDER = 939; // 帮主gender
    SharedDef.FACTION_INT_FIELD_MANGER_TITLE = 940; // 帮主title
    SharedDef.FACTION_INT_FIELD_MANGER_LIKE = 941; // 帮主点赞
    SharedDef.FACTION_INT_FIELD_MANGER_WING = 942; // 帮主神羽
    SharedDef.FACTION_STRING_FIELD_MANGER_NAME = 4; // 帮主名字
    SharedDef.FACTION_STRING_FIELD_MANGER_GUID = 5; // 帮主GUID
    SharedDef.FACTION_STRING_FIELD_PLAYER = 6; // 帮派成员列表		
    SharedDef.FACTION_STRING_FIELD_PLAYER_END = 106; // 帮派成员列表结束
    SharedDef.FACTION_STRING_FIELD_APPLY_PLAYER = 106; // 帮派申请玩家列表
    SharedDef.FACTION_STRING_FIELD_APPLY_PLAYER_END = 112; // 帮派申请玩家列表结束
    SharedDef.FACTION_STRING_FIELD_EVENT = 112; // 帮派记录开始
    SharedDef.FACTION_STRING_FIELD_EVENT_END = 122; // 帮派记录结束
    SharedDef.FACTION_STRING_FIELD_GONGGAO = 122; // 帮派公告
    SharedDef.FACTION_STRING_FIELD_ZHAOMU_GONGGAO = 123; // 招募公告
    SharedDef.FACTION_STRING_FIELD_CHALLENGE_BOSS_DAMAGE_RANK_START = 124; // 当前boss输出榜开始 string guid
    SharedDef.FACTION_STRING_FIELD_CHALLENGE_BOSS_DAMAGE_RANK_END = 174; // 当前boss输出榜结束
    SharedDef.FACTION_STRING_FIELD_CHALLENGE_BOSS_TOTAL_RANK_START = 174; // 总输出榜开始
    SharedDef.FACTION_STRING_FIELD_CHALLENGE_BOSS_TOTAL_RANK_END = 224; // 总输出榜结束
    SharedDef.FACTION_STRING_FIELD_STOREHOUSE_START = 224; // 家族宝库开始
    SharedDef.FACTION_STRING_FIELD_STOREHOUSE_END = 324; // 家族宝库结束
    SharedDef.FACTION_STRING_FIELD_STOREHOUSE_RECORD_START = 324; // 宝库记录开始
    SharedDef.FACTION_STRING_FIELD_STOREHOUSE_RECORD_END = 334; // 宝库记录结束
    SharedDef.FACTION_STRING_FIELD_GIFT_PLAYER_GUID_START = 334; // 礼物对应玩家guid开始
    SharedDef.FACTION_STRING_FIELD_GIFT_PLAYER_GUID_END = 384; // 礼物对应玩家guid结束
    SharedDef.FACTION_STRING_FIELD_TOWER_TODAY_TOP_NAME = 384; // 无尽远征 每日最高者 名称
    SharedDef.FACTION_DATA_INT_FIELD_BOSSDEFENSE_DAMAGE_START = 0; // 首领挑战伤害开始
    SharedDef.FACTION_DATA_INT_FIELD_BOSSDEFENSE_DAMAGE_END = 300; // 首领挑战伤害结束
    SharedDef.FACTION_DATA_INT_FIELD_GIFT_START = 300; // 礼物记录int开始
    SharedDef.FACTION_DATA_INT_FIELD_GIFT_TMP1 = 7500; // 临时
    SharedDef.FACTION_DATA_INT_FIELD_GIFT_TOTAL_LEN = 37500; // 临时
    SharedDef.FACTION_DATA_INT_FIELD_GIFT_TOTAL_CACHE_LEN = 5000; // 临时
    SharedDef.FACTION_DATA_INT_FIELD_GIFT_TMP2 = 37800; // 临时
    SharedDef.FACTION_DATA_INT_FIELD_GIFT_END = 42800; // 礼物记录结束
    SharedDef.FACTION_DATA_INT_FIELD_GIFT_RANK_START = 42800; // 记录排行礼物id开始
    SharedDef.FACTION_DATA_INT_FIELD_GIFT_RANK_END = 50300; // 记录排行礼物id结束
    SharedDef.FACTION_DATA_STRING_FIELD_GIFT_START = 4; // 礼物记录string开始
    SharedDef.FACTION_DATA_STRING_FIELD_GIFT_TEMP1 = 7500; // 临时
    SharedDef.FACTION_DATA_STRING_FIELD_GIFT_TEMP2 = 30000; // 临时
    SharedDef.FACTION_DATA_STRING_FIELD_GIFT_TEMP3 = 4000; // 临时
    SharedDef.FACTION_DATA_STRING_FIELD_GIFT_TEMP4 = 34000; // 临时
    SharedDef.FACTION_DATA_STRING_FIELD_GIFT_END = 34004; // 礼物记录结束
    // int
    // 记录2000条记录  魅力 家族图标
    // 记录排名信息 1~2000 记录index
    // 上周记录
    // string  女王guid  女王名称 家族guid 家族名 骑士名
    // 上周记录
    SharedDef.MAX_TRIAL_LAYER_COUNT = 256;
    //  试炼塔状态系数
    SharedDef.TRIAL_STATE_FACTOR_ACTIVE = 1; // 激活状态系数
    SharedDef.TRIAL_STATE_FACTOR_PASS = 10; // 通关状态系数
    SharedDef.TRIAL_STATE_FACTOR_F_PASS = 100; // 首通状态系数
    SharedDef.MAX_ACTIVE_COUNT = 50;
    SharedDef.MAX_ACTIVT_REWARD_COUNT = 6;
    SharedDef.MAX_DOUJIANTAI_RECORD_COUNT = 10;
    SharedDef.MAX_QUALIFY_RECORD_COUNT = 30;
    SharedDef.MAX_PRIVATE_BOSS_COUNT = 20;
    //  玩家副本信息
    SharedDef.INSTANCE_INT_FIELD_VIP_START = 0; // vip副本开始	每个信息4个byte[0:预留,1:可扫荡难度,2:挑战次数,3:购买次数]
    SharedDef.INSTANCE_INT_FIELD_VIP_END = 3; // vip副本结束
    SharedDef.INSTANCE_INT_FIELD_TRIAL_PASSED_SHORT = 3; // (0:今日可扫荡层数,1:历史通关层数)
    SharedDef.INSTANCE_INT_FIELD_TRIAL_SWEEP_SHORT = 4; // (0:扫荡次数,1:可购买扫荡次数)--]]
    SharedDef.INSTANCE_INT_FIELD_RES_START = 5; // 资源副本开始 每个信息4个byte[0:挑战次数,1:是否通关,2:预留,3:预留]
    SharedDef.INSTANCE_INT_FIELD_RES_END = 10; // 资源副本结束
    SharedDef.INSTANCE_INT_FIELD_ACTIVE_START = 10; // 活动开始
    SharedDef.INSTANCE_INT_FIELD_ACTIVE_END = 60; // 活动结束
    SharedDef.INSTANCE_INT_FIELD_ACTIVE = 60; // 活动-活跃度
    SharedDef.INSTANCE_INT_FIELD_ACTIVE_REWARD = 61; // 奖励领取状态
    SharedDef.INSTANCE_INT_FIELD_3V3_TIMES = 62; // 3v3次数 已参加次数 购买次数
    SharedDef.INSTANCE_INT_FIELD_3V3_DAY_REWARD = 63; // 3v3每日次数奖励 4个byte
    SharedDef.INSTANCE_INT_FIELD_3V3_SEGMENT_TIME = 64; // 3v3段位 发放时间
    SharedDef.INSTANCE_INT_FIELD_XIANFU_DAY_TIMES = 65; // 每日挑战次数
    SharedDef.INSTANCE_INT_FIELD_DOUJIANTAI_CURSOR = 66; // 斗剑台信息游标
    SharedDef.INSTANCE_INT_FIELD_DOUJIANTAI_ENEMY_S = 67; // 对手名次开始
    SharedDef.INSTANCE_INT_FIELD_DOUJIANTAI_ENEMY_E = 70; // 对手名次结束
    SharedDef.INSTANCE_INT_FIELD_DOUJIAN_TIMES = 71; // 斗剑次数 已挑战次数 购买次数
    SharedDef.INSTANCE_INT_FIELD_DOUJIAN_FIGHT_CD = 72; // 斗剑台挑战CD时间戳
    SharedDef.INSTANCE_INT_FIELD_DOUJIAN_FIRST_GET = 73; // 首胜奖励标记
    SharedDef.INSTANCE_INT_FIELD_DOUJIAN_FIRST_REWARD = 74; // 首胜奖励领取标记
    SharedDef.INSTANCE_INT_FIELD_DOUJIAN_COMBATWIN = 75; // 连胜纪录 纪录 当前
    SharedDef.INSTANCE_INT_FIELD_DOUJIAN_COMBATWIN_REWARD = 76; // 连胜奖励记录
    SharedDef.INSTANCE_INT_FIELD_DOUJIAN_MAX_RANK = 77; // 历史最高纪录
    SharedDef.INSTANCE_INT_FIELD_GROUP_INSTANCE_CLEAR_FLAG = 78; // 每bit记录对应组队副本id首次通关状态 false:未完成 true:已完成
    SharedDef.INSTANCE_INT_FIELD_GROUP_INSTANCE_CHALLENGE_COUNT = 79; // 组队副本剩余挑战次数
    SharedDef.INSTANCE_INT_FIELD_GROUP_INSTANCE_BUY_COUNT = 80; // 当日组队副本挑战次数购买次数
    SharedDef.INSTANCE_INT_FIELD_QUALIFY_EXTRA = 81; //  排位赛胜利额外可领取奖励标志
    SharedDef.INSTANCE_INT_FIELD_QUALIFY_WINS = 82; //  排位赛赢得场次		
    SharedDef.INSTANCE_INT_FIELD_QUALIFY_EXTRA_PICKED = 83; //  排位赛胜利额外已领取奖励标志
    SharedDef.INSTANCE_INT_FIELD_QUALIFY_DAILY_TIMES = 84; //  排位赛每天次数
    SharedDef.INSTANCE_INT_FIELD_QUALIFY_BUY_TIMES = 85; //  排位赛购买次数
    SharedDef.INSTANCE_INT_FIELD_QUALIFY_CURSOR = 86; //  排位赛记录游标
    SharedDef.INSTANCE_INT_FIELD_PRIVATE_BOSS_RECOVER_TIME_START = 87; // 个人BOSS挑战次数回复时间戳开始
    SharedDef.INSTANCE_INT_FIELD_PRIVATE_BOSS_RECOVER_TIME_END = 107; // 个人BOSS挑战次数回复时间戳结束
    SharedDef.INSTANCE_STR_FIELD_DOUJIANTAI_RECORD_START = 4; // 斗剑台战斗信息开始
    SharedDef.INSTANCE_STR_FIELD_DOUJIANTAI_RECORD_END = 14; // 斗剑台战斗信息结束
    SharedDef.INSTANCE_STR_FIELD_QUALIFY_RECORD_START = 14; // 排位赛战斗信息开始
    SharedDef.INSTANCE_STR_FIELD_QUALIFY_RECORD_END = 44; // 排位赛战斗信息结束
    //  战斗模式
    SharedDef.PEACE_MODE = 0; // 和平模式
    SharedDef.FAMILY_MODE = 1; // 家族模式
    SharedDef.GROUP_MODE = 2; // 组队模式
    SharedDef.MAX_BATTLE_MODE = 3;
    // 需要发内部消息同步到场景服的技能类型
    SharedDef.TYPE_SPELL_SLOT = 0; // 更新装备槽中的技能
    SharedDef.TYPE_SPELL_PASSIVE = 1; // 更新基础被动技能
    //  玩家主动/被动/辅助技能分类
    SharedDef.SPELL_SUPPORT = 0; //  辅助
    SharedDef.SPELL_INITIATIVE_DAMAGE = 1; //  主动（伤害）
    SharedDef.SPELL_INITIATIVE_PROTECT = 2; //  主动（防护）
    SharedDef.SPELL_INITIATIVE_CONTROL = 3; //  主动（控制）
    SharedDef.SPELL_INITIATIVE_CURE = 4; //  主动（回复）
    SharedDef.SPELL_INITIATIVE_BUFF = 5; //  主动（增益）
    SharedDef.SPELL_PASSIVE_DAMAGE = 6; //  被动（伤害）
    SharedDef.SPELL_PASSIVE_PROTECT = 7; //  被动（防护）
    SharedDef.SPELL_PASSIVE_CONTROL = 8; //  被动（控制）
    SharedDef.SPELL_PASSIVE_CURE = 9; //  被动（回复）
    SharedDef.SPELL_PASSIVE_BUFF = 10; //  被动（增益）
    // 游戏配置专用的状态下标枚举
    SharedDef.GAME_CONFIG_FIELD_FLAGS_SHOW_PLATFORM_NAME = 0; // 是否显示平台名
    SharedDef.GAME_CONFIG_FIELD_FLAGS_SHOW_SERVER_ID = 1; // 是否显示服务器ID
    SharedDef.GAME_CONFIG_FIELD_FLAGS_SHOW_POST = 2; // 聊天是否post
    // /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    // 游戏配置
    SharedDef.GAME_CONFIG_INT_FIELD_KAIFUSHIJIAN = 0; // 开服时间
    SharedDef.GAME_CONFIG_INT_FIELD_FLAGS = 1; // 游戏配置标志位
    SharedDef.GAME_CONFIG_INT_FIELD_ADDTIME = 9; // 合服时间
    SharedDef.GAME_CONFIG_INT_FIELD_WORLD_SVR_TYPE = 10; // 服务器类型(见枚举: ESERVER_TYPE)
    SharedDef.GAME_CONFIG_STRING_FIELD_PLATFORM_ID = 4; // 平台ID
    SharedDef.GAME_CONFIG_STRING_FIELD_GM_QQ = 5; // GM和QQ
    SharedDef.GAME_CONFIG_STRING_FIELD_DB_CONN = 6; // 数据库连接串
    SharedDef.GAME_CONFIG_STRING_FIELD_LOGIN_KEY = 7; // 登录秘钥
    SharedDef.GAME_CONFIG_STRING_FIELD_LOG_DB_CONN = 8; // 日志数据库连接串
    SharedDef.GAME_CONFIG_STRING_LOCAL_HDD_PATH = 9; // 本地硬盘数据保存地址
    SharedDef.GAME_CONFIG_STRING_EXT_WEB_INTERFACE = 10; // web接口配置
    SharedDef.GAME_CONFIG_STRING_CONF_SVR_URL = 11; // 配置服url地址
    SharedDef.GAME_CONFIG_STRING_WORLD_SERVER_URL = 12; // 世界服url地址
    SharedDef.GAME_CONFIG_STRING_FIELD_SERVER = 200; // 原始服务器
    SharedDef.GAME_CONFIG_STRING_FIELD_SERVER_LIST_BEGIN = 201; // 服务器列表
    // 客户端模块枚举
    SharedDef.CLIENT_MODULE_CENTER = 0; // 中心模块
    SharedDef.CLIENT_MODULE_CREATE = 1; // 创建角色模块
    SharedDef.CLIENT_MODULE_SCENE = 2; // 场景模块
    SharedDef.CLIENT_MODULE_UI = 3; // UI模块
    SharedDef.CLIENT_MODULE_SH = 4; // 梭哈模块
    SharedDef.MAX_CLIENT_MODULE = 5;
    // 客户端模块版本信息
    SharedDef.CLIENT_VERSION_INT_CREATE_TIME = 0; // 版本创建时间
    SharedDef.MAX_CLIENT_VERSION_INT = 1;
    SharedDef.CLIENT_VERSION_STRING_VERSIONS = 0; // 模块版本号
    SharedDef.CLIENT_VERSION_STRING_COMMENT = 1; // 模块版本说明
    SharedDef.MAX_CLIENT_VERSION_STRING = 2;
    // ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    // 客户端配置信息
    SharedDef.CLIENT_CONFIG_INT_FIELD_MODULE_INFO_BEGIN = 0;
    SharedDef.CLIENT_CONFIG_INT_FIELD_MODULE_INFO_END = 5;
    SharedDef.CLIENT_CONFIG_STRING_FIELD_MODULE_INFO_BEGIN = 4;
    SharedDef.CLIENT_CONFIG_STRING_FIELD_MODULE_INFO_END = 14;
    // ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    SharedDef.MAX_DEFAULT_LINE_COUNT = 4; //  最大默认分线数量
    SharedDef.MAX_FIELD_BOSS_COUNT = 40; //  最大默认野外BOSS数量
    //  野外BOSS进度类型
    SharedDef.FIELD_BOSS_PROCESS_TYPE_FINISH = 0; // 已结束
    SharedDef.FIELD_BOSS_PROCESS_START_COUNTDOWN = 1; // 开始倒计时
    SharedDef.FIELD_BOSS_PROCESS_BORN = 2; // BOSS刷新
    SharedDef.FIELD_BOSS_PROCESS_TREASURE = 3; // 宝箱出现
    //  野外BOSS int数据
    SharedDef.FIELD_BOSS_DATA_NEXT_BORN_TIME = 0; // 下一次刷新时间
    SharedDef.FIELD_BOSS_DATA_CURR_HP = 1; // 当前血量百分比
    SharedDef.FIELD_BOSS_DATA_PROCESS_TYPE = 3; // 进度类型
    SharedDef.FIELD_BOSS_DATA_PRIORITY_TIME = 4; // 优先拾取时间戳
    SharedDef.FIELD_BOSS_DATA_KILLED = 5; // 击杀次数
    SharedDef.MAX_FIELD_BOSS_INT_DATA_COUNT = 6;
    //  野外BOSS str数据
    SharedDef.FIELD_BOSS_DATA_MAX_DAMAGE_GUID = 0; // 最大伤害guid
    SharedDef.FIELD_BOSS_DATA_NAME = 1; // 当前正在采集的玩家名字
    SharedDef.MAX_FIELD_BOSS_STR_DATA_COUNT = 2;
    //  世界BOSS进度
    SharedDef.WORLD_BOSS_PROCESS_TYPE_FINISH = 0; // 已结束
    SharedDef.WORLD_BOSS_PROCESS_ENROLL = 1; // 报名
    SharedDef.WORLD_BOSS_PROCESS_BORN = 2; // BOSS刷新
    //  人物关于世界BOSS的状态
    SharedDef.PLAYER_WORLD_BOSS_NONE = 0; // 什么都没有
    SharedDef.PLAYER_WORLD_BOSS_ENROLLED = 1; // 报过名
    SharedDef.PLAYER_WORLD_BOSS_ENTERED = 2; // 进入过场景
    SharedDef.MASS_BOSS_STATE = 0; // 全民boss状态
    SharedDef.MASS_BOSS_TIME = 1; // 全民boss刷新时间
    SharedDef.MAX_MASS_BOSS_INT_FIELD_COUNT = 2;
    SharedDef.MAX_XIANFU_RECORD_COUNT = 10;
    SharedDef.MAX_MASS_BOSS_COUNT = 30;
    SharedDef.MAX_LOTTERY_COUNT = 10;
    SharedDef.MAX_LOTTERY_RECORD_COUNT = 10;
    SharedDef.MAX_ACT_RANK_COUNT = 10; // 榜单数量
    SharedDef.MAX_ACT_RANK_INFO_COUNT = 10; // 最大名次信息数量
    // 世界变量
    SharedDef.GLOBALVALUE_INT_FIELD_FLAGS = 0; // 世界变量标志位
    SharedDef.GLOBALVALUE_INT_FIELD_LIMIT_ACTIVITY_VERSION = 8; // 活动版本号
    SharedDef.GLOBALVALUE_INT_FIELD_LIMIT_ACTIVITY_END_TIME = 9; // 活动结束时间
    SharedDef.GLOBALVALUE_INT_FIELD_LIMIT_ACTIVITY_ITEM = 10; // 活动物品配置
    SharedDef.GLOBALVALUE_INT_FIELD_LIMIT_ACTIVITY_ITEM_END = 40; // 最多10个道具掉落
    SharedDef.GLOBALVALUE_INT_FIELD_ONLINE_PLAYER_NUM = 40; // 计录全服在线玩家数
    SharedDef.GLOBALVALUE_INT_FIELD_WORLD_CONNECTION_STATUS = 41; // 世界服连接状态
    //  野外BOSS数据
    SharedDef.GLOBALVALUE_INT_FIELD_FIELD_BOSS_START = 42; //  野外boss数据开始
    SharedDef.GLOBALVALUE_INT_FIELD_FIELD_BOSS_END = 282; //  野外boss数据结束
    SharedDef.GLOBALVALUE_INT_FIELD_WORLD_BOSS_LEVEL = 282; // 世界BOSS等级
    SharedDef.GLOBALVALUE_INT_FIELD_WORLD_BOSS_STATE = 283; // 世界BOSS总状态
    SharedDef.GLOBALVALUE_INT_FIELD_WORLD_BOSS_LINE_STATE = 284; // 世界BOSS每个房间的状态
    SharedDef.GLOBALVALUE_INT_FIELD_WORLD_BOSS_LAST_ENROLL_TIME = 285; //  最近一次报名时间
    SharedDef.GLOBALVALUE_INT_FIELD_WORLD_BOSS_TIMES = 286; // 世界BOSS次数
    SharedDef.GLOBALVALUE_INT_FIELD_WORLD_BOSS_ID = 287; // 0:世界BOSS类型1, 1:世界BOSS类型2,2:当前选定的类型,3:房间个数
    SharedDef.GLOBALVALUE_INT_FIELD_XIANFU_RECORD_CURSOR = 288; // 仙府开启宝箱的记录游标
    SharedDef.GLOBALVALUE_INT_FIELD_GIFT_RANK_WINER_FACTION_FLAG = 289; // 上周魅力排行第一家族旗子
    SharedDef.GLOBALVALUE_INT_FIELD_GIFT_RANK_NEXT_UPDATE_TIME = 290; // 魅力排行下次更新时间
    SharedDef.GLOBALVALUE_INT_FIELD_GIFT_RANK_CUR_ROUND = 291; // /魅力排行当前轮数
    SharedDef.GLOBALVALUE_INT_FIELD_MASS_BOSS_START = 292; // 全民boss开始
    SharedDef.GLOBALVALUE_INT_FIELD_MASS_BOSS_END = 352;
    SharedDef.GLOBALVALUE_INT_FIELD_LOTTERY_RECORD_CURSOR_START = 352; //  抽奖记录游标
    SharedDef.GLOBALVALUE_INT_FIELD_LOTTERY_RECORD_CURSOR_END = 362;
    SharedDef.GLOBALVALUE_INT_FIELD_ACTIVITIES_RUNNING_START = 362; //  活动运行id 开始
    SharedDef.GLOBALVALUE_INT_FIELD_ACTIVITIES_RUNNING_END = 392; //  活动运行id 结束
    SharedDef.GLOBALVALUE_STRING_FIELD_LIMIT_ACTIVITY_SCRIPT = 4; // 限时活动类名
    SharedDef.GLOBALVALUE_STRING_FIELD_FIELD_BOSS_START = 5; //  野外boss优先开启宝箱的人物guid开始
    SharedDef.GLOBALVALUE_STRING_FIELD_FIELD_BOSS_END = 85; //  野外boss优先开启宝箱的人物guid结束
    SharedDef.GLOBALVALUE_STRING_FIELD_XIANFU_RECORD_START = 85; // 仙府开箱子记录开始
    SharedDef.GLOBALVALUE_STRING_FIELD_XIANFU_RECORD_END = 95; //  仙府开箱子记录结束
    SharedDef.GLOBALVALUE_STRING_FIELD_GIFT_RANK_WINER_QUEEN_NAME = 95; // 上周魅力排行第一女王名称
    SharedDef.GLOBALVALUE_STRING_FIELD_GIFT_RANK_WINER_FACTION_NAME = 96; // 上周魅力排行第一家族名称
    SharedDef.GLOBALVALUE_STRING_FIELD_GIFT_RANK_WINER_GUARD_NAME = 97; // 上周魅力排行第一骑士名称
    SharedDef.GLOBALVALUE_STRING_FIELD_LOTTERY_RECORD_START = 98; //  抽奖记录数据开始
    SharedDef.GLOBALVALUE_STRING_FIELD_LOTTERY_RECORD_END = 198;
    SharedDef.MAX_DOUJIANTAI_RANK_COUNT = 1000;
    SharedDef.MAX_RISK_RANK_COUNT = 10; // 世界冒险榜单数量
    SharedDef.MAX_RISK_RANK_SWAPED_COUNT = 11; // 世界冒险带交换的榜单数量
    SharedDef.RISK_RANK_INFO_SECTION_ID = 0;
    SharedDef.RISK_RANK_INFO_TIME = 1;
    SharedDef.MAX_RISK_RANK_INFO_COUNT = 2;
    SharedDef.GLOBALCOUNTER_INT_FIELD_DOUJIANTAI_FLAG_START = 0; // 挑战中的标记位
    SharedDef.GLOBALCOUNTER_INT_FIELD_DOUJIANTAI_FLAG_END = 40;
    SharedDef.GLOBALCOUNTER_INT_FIELD_ACTIVITIES_FINISH_START = 40; //  活动结束id flag开始
    SharedDef.GLOBALCOUNTER_INT_FIELD_ACTIVITIES_FINISH_END = 240; //  活动结束id flag结束
    SharedDef.GLOBALCOUNTER_INT_FIELD_ACT_RANK_INFO_START = 240; // 活动排行数据开始
    SharedDef.GLOBALCOUNTER_INT_FIELD_ACT_RANK_INFO_END = 340; // 活动排行数据结束
    SharedDef.GLOBALCOUNTER_INT_FIELD_RISK_RANK_INFO_START = 340;
    SharedDef.GLOBALCOUNTER_INT_FIELD_RISK_RANK_INFO_END = 362;
    SharedDef.GLOBALCOUNTER_STRING_FIELD_DOUJIANTAI_START = 4; // 斗剑台排名开始
    SharedDef.GLOBALCOUNTER_STRING_FIELD_DOUJIANTAI_END = 1004; // 斗剑台排名结束
    SharedDef.GLOBALCOUNTER_STRING_FIELD_DOUJIANTAI_RECORD_START = 1004; // 战斗信息记录开始
    SharedDef.GLOBALCOUNTER_STRING_FIELD_DOUJIANTAI_RECORD_END = 11004; // 战斗信息记录结束
    SharedDef.GLOBALCOUNTER_STRING_FIELD_ACT_RANK_INFO_START = 11004; // 活动排行数据开始
    SharedDef.GLOBALCOUNTER_STRING_FIELD_ACT_RANK_INFO_END = 11104; // 活动排行数据结束
    SharedDef.GLOBALCOUNTER_STRING_FIELD_RISK_RANK_NAME_START = 11104;
    SharedDef.GLOBALCOUNTER_STRING_FIELD_RISK_RANK_NAME_END = 11115;
    // 计时器世界变量计数器
    SharedDef.GLOBALCOUNTER_INT_FIELD_ONLINE_AWARD_COUNT = 0; // 全服银子数量
    SharedDef.GLOBALCOUNTER_INT_FIELD_DAILY_ADD_BIND_GOLD = 2; // 每日新增绑定元宝数量
    SharedDef.GLOBALCOUNTER_INT_FIELD_DAILY_SUB_BIND_GOLD = 4; // 每日消耗绑定元宝数量
    SharedDef.GLOBALCOUNTER_INT_FIELD_DAILY_ADD_GOLD_INGOT = 6; // 每日新增元宝数量
    SharedDef.GLOBALCOUNTER_INT_FIELD_DAILY_SUB_GOLD_INGOT = 8; // 每日消耗元宝数量
    SharedDef.GLOBALCOUNTER_INT_FIELD_DAILY_ADD_SILVER = 10; // 每日新增银子数量
    SharedDef.GLOBALCOUNTER_INT_FIELD_DAILY_SUB_SILVER = 12; // 每日消耗银子数量
    SharedDef.MAX_GLOBALCOUNTER_INT_FIELD = 13;
    //  不同步客户端的计数器
    //  地图类型
    SharedDef.MAP_TYPE_MAIN = 0; // 主城
    SharedDef.MAP_TYPE_FIELD = 1; // 野外
    SharedDef.MAP_TYPE_INSTANCE = 2; // 副本
    SharedDef.MAP_TYPE_ACTIVITY = 3; // 活动
    SharedDef.MAP_TYPE_PVP = 4; // PVP
    //  副本人物类型
    SharedDef.INSTANCE_QUEST_TYPE_KILL_MONSTER = 1; // 击杀怪物(creatureId, num)
    SharedDef.INSTANCE_QUEST_TYPE_PICK_ITEM = 2; // 收集物品
    SharedDef.INSTANCE_QUEST_TYPE_ACTIVE_MACHINE = 3; // 激活机关
    SharedDef.INSTANCE_QUEST_TYPE_PROTECT_NPC = 4; // 守护NPC
    SharedDef.INSTANCE_QUEST_TYPE_ESCORT_NPC = 5; // 护送NPC
    SharedDef.INSTANCE_QUEST_TYPE_DEFENSE = 6; // 防守
    SharedDef.INSTANCE_QUEST_TYPE_BREAK_THROUGH = 7; // 闯关
    SharedDef.MAX_INSTANCE_QUEST_COUNT = 12;
    // //////////////////////////////////////////////////////////////////////////////////////////////////////////////
    // 地图
    SharedDef.MAP_INT_FIELD_MAP_ID = 0; // 地图模板ID
    SharedDef.MAP_INT_FIELD_INSTANCE_ID = 1; // 实例ID
    SharedDef.MAP_INT_FIELD_LINE_NO = 2; // 分线ID
    SharedDef.MAP_INT_FIELD_WARID = 2; // 场次id
    SharedDef.MAP_INT_FIELD_KUAFU_TYPE = 3; // 跨服类型
    SharedDef.MAP_INT_FIELD_STATE = 4; // 0.地图大状态,1.地图小状态,2.地图自动复活时间,3预留状态
    SharedDef.MAP_INT_FIELD_KILL_NUM = 5; // 杀怪数
    SharedDef.MAP_INT_FIELD_RESERVE1 = 6; // 保留字段1
    SharedDef.MAP_INT_FIELD_RESERVE2 = 7; // 保留字段2
    SharedDef.MAP_INT_FIELD_RESERVE3 = 8; // 保留字段3 当前层数
    SharedDef.MAP_INT_FIELD_RESERVE4 = 9; // 保留字段4 判断副本是否初始化
    SharedDef.MAP_INT_FIELD_INSTANCE_WAVE = 10; // 波数2shorts(0:当前波数,1:总波数)
    SharedDef.MAP_INT_FIELD_QUESTS_START = 11; // 副本任务开始
    SharedDef.MAP_INT_FIELD_QUESTS_END = 35; // 副本任务结束
    SharedDef.MAP_INT_FIELD_QUESTS_PROCESS_START = 35; // 进度开始
    SharedDef.MAP_INT_FIELD_QUESTS_PROCESS_END = 38; // 进度结束
    SharedDef.MAP_INT_FIELD_CREATE_TM = 38; // 副本创建时间
    SharedDef.MAP_INT_FIELD_START_TM = 39; // 副本开始时间
    SharedDef.MAP_INT_FIELD_QUEST_END_TM = 40; // 副本任务结束时间
    SharedDef.MAP_INT_FIELD_END_TM = 41; // 副本结束时间
    SharedDef.MAP_INT_FIELD_INSTANCE_TYPE = 42; // 副本类型
    // 地图字符串部分
    SharedDef.MAP_STR_GENERAL_ID = 4;
    SharedDef.MAP_STR_REWARD = 5; // 副本奖励物品字符串
    // 小怪陆续刷
    SharedDef.REFRESH_MONSTER_FIELD_ID = 46; // 2个short(0:当前已经刷的,1:总共需要刷多少怪)
    SharedDef.REFRESH_MONSTER_FIELD_INFO_START = 47; // 怪物信息开始2个short(0:entry,1:level)
    SharedDef.KUAFU_3V3_PLAYER_DAMAGE = 0; //  伤害
    SharedDef.KUAFU_3V3_PLAYER_SHOW_INFO = 2; //  2个byte, 1short(byte0:gender, byte1:hprate, short1:level)
    SharedDef.KUAFU_3V3_PLAYER_SETTLEMENT = 3; //  计算信息, 4bytes(0:击杀数量,1:死亡状态,2:所属阵营,3:积分)
    SharedDef.KUAFU_3V3_PLAYER_HONOR = 4; //  荣誉及全场最佳, 4bytes(0:获得荣誉, 1:全场最佳,2:保留,3:保留)
    SharedDef.MAX_KUAFU_3V3_INT_COUNT = 5; //  kuafu属性数量
    SharedDef.KUAFU_3V3_PLAYER_NAME = 0; // 玩家名称
    SharedDef.KUAFU_3V3_PLAYER_GUID = 1; // 玩家guid
    SharedDef.MAX_KUAFU_3V3_STR_COUNT = 2;
    SharedDef.MAX_KUAFU_3V3_COUNT = 6;
    //  跨服3v3匹配
    SharedDef.KUAFU_3V3_FIELDS_INT_INFO_START = 43; //  跨服数据开始
    SharedDef.KUAFU_3V3_FIELDS_INT_INFO_END = 73; //  3v3总共6个人
    SharedDef.KUAFU_3V3_FIELDS_STR_INFO_START = 6; //  字符串数据开始
    SharedDef.KUAFU_3V3_FIELDS_STR_INFO_END = 18; //  字符串数据结束
    //  仙府夺宝 玩家信息
    SharedDef.KUAFU_XIANFU_PLAYER_SETTLEMENT = 0; //  玩家战力
    SharedDef.KUAFU_XIANFU_PLAYER_MONEY = 2; //  元宝数据
    SharedDef.KUAFU_XIANFU_PLAYER_MONEY_CHANGED = 4; //  元宝改变值
    SharedDef.KUAFU_XIANFU_PLAYER_SHOW_INFO = 6; //  4个byte(byte0:宝箱数量, byte1:击杀人数, byte2:击杀BOSS数量,byte3:连杀次数)
    SharedDef.MAX_KUAFU_XIANFU_INT_COUNT = 7; //  kuafu属性数量
    SharedDef.KUAFU_XIANFU_PLAYER_NAME = 0; // 玩家名称
    SharedDef.KUAFU_XIANFU_PLAYER_GUID = 1; // 玩家guid
    SharedDef.MAX_KUAFU_XIANFU_STR_COUNT = 2;
    SharedDef.KUAFU_XIANFU_BOSS_SHOW_INFO = 0; //  2 shorts(0:entry, 1:死亡状态)
    SharedDef.KUAFU_XIANFU_BOSS_BORN_INFO = 1; //  是否刷新
    SharedDef.KUAFU_XIANFU_BOSS_BORN_TIME = 2; //  刷新时间戳
    SharedDef.MAX_KUAFU_XIANFU_BOSS_INT_COUNT = 3;
    SharedDef.MAX_KUAFU_XIANFU_COUNT = 10;
    SharedDef.MAX_KUAFU_XIANFU_BOSS_COUNT = 5;
    //  跨服仙府夺宝匹配
    SharedDef.KUAFU_XIANFU_FIELDS_INT_INFO_START = 43; //  跨服数据开始
    SharedDef.KUAFU_XIANFU_FIELDS_INT_INFO_END = 113; //  3v3总共6个人
    SharedDef.KUAFU_XIANFU_FIELDS_INT_BOSS_INDX = 113; // 当前的bossid
    SharedDef.KUAFU_XIANFU_FIELDS_INT_BOSS_INFO_START = 114; // BOSS信息开始
    SharedDef.KUAFU_XIANFU_FIELDS_INT_BOSS_INFO_END = 129;
    SharedDef.KUAFU_XIANFU_FIELDS_HARD = 129; // 副本难度
    SharedDef.XIANFU_TEST_DUMMY_COUNT = 130; // 假人数量
    SharedDef.KUAFU_XIANFU_FIELDS_STR_INFO_START = 6; //  字符串数据开始
    SharedDef.KUAFU_XIANFU_FIELDS_STR_INFO_END = 26; //  字符串数据结束
    //  跨服组队玩家信息
    SharedDef.KUAFU_GROUP_INSTANCE_PLAYER_DAED_TIMES = 0; //  玩家信息(0:死亡次数)
    SharedDef.KUAFU_GROUP_INSTANCE_PLAYER_REBRON_CD = 1; // 原地复活cd
    SharedDef.MAX_KUAFU_GROUP_INSTANCE_PLAYER_INT_COUNT = 2; //  kuafu属性数量
    SharedDef.KUAFU_GROUP_INSTANCE_PLAYER_NAME = 0; // 玩家名称
    SharedDef.KUAFU_GROUP_INSTANCE_PLAYER_GUID = 1; // 玩家guid
    SharedDef.KUAFU_GROUP_INSTANCE_PLAYER_REWARDS = 2; // 玩家奖励
    SharedDef.MAX_KUAFU_GROUP_INSTANCE_PLAYER_STR_COUNT = 3;
    SharedDef.MAX_GROUP_INSTANCE_PLAYER_COUNT = 3;
    // 跨服组队
    SharedDef.KUAFU_GROUP_INSTANCE_FIELDS_HARD = 43; //  难度
    SharedDef.KUAFU_GROUP_INSTANCE_FIELDS_PART = 44; //  组队副本的第几部分
    SharedDef.KUAFU_GROUP_INSTANCE_INT_FIELDS_PLAYER_INFO_START = 45;
    SharedDef.KUAFU_GROUP_INSTANCE_INT_FIELDS_PLAYER_INFO_END = 51;
    SharedDef.KUAFU_GROUP_INSTANCE_STR_FIELDS_PLAYER_INFO_START = 45;
    SharedDef.KUAFU_GROUP_INSTANCE_STR_FIELDS_PLAYER_INFO_END = 54;
    SharedDef.DOUJIANTAI_FIELDS_INT_RANK = 43; //  2 shorts (0:自己的排名, 1:对手的排名)
    SharedDef.DOUJIANTAI_FIELDS_INT_COMBAT_WIN_INFO = 44; //  2 shorts (0:历史最大连胜, 1:当前连胜)
    SharedDef.XIULIANCHANG_FIELDS_INT_RANK = 43; //  敌人斗剑台排行
    SharedDef.XIULIANCHANG_FIELDS_INT_ROBOT_ID = 44; //  敌人机器人序号
    SharedDef.XIULIANCHANG_FIELDS_INT_LEVEL = 45; // 敌人等级 结算经验用
    SharedDef.XIULIANCHANG_FIELDS_STR_INFO_GUID = 6; // 敌人guid
    SharedDef.XIULIANCHANG_FIELDS_STR_INFO_CONTENT = 7; // 敌人属性content  
    SharedDef.XIULIANCHANG_FIELDS_STR_INFO_NAME = 8; // 敌人名称
    // VIP BOSS
    SharedDef.VIP_INSTANCE_FIELD_ID = 43; //  0:VIP副本序号,1:副本难度
    SharedDef.MAP_MASS_BOSS_INT_FIELD_ID = 43; // 全民bossid
    SharedDef.MAP_MASS_BOSS_INT_FIELD_MAX_HP = 44;
    SharedDef.MAP_PRIVATE_BOSS_INT_FIELD_ID = 43; // 个人bossid
    SharedDef.MAP_PRIVATE_BOSS_INT_FIELD_BUFFEFFECT_ID = 44; // buff效果id
    SharedDef.WORLDBOSS_FIELDS_WAIT_TIME = 43; // 报名等待时间戳
    SharedDef.WORLDBOSS_FIELDS_BORN_TIME = 44; // 刷新等待时间戳
    SharedDef.RES_INSTANCE_FIELD_ID = 43; // 资源副本的索引
    // 世界冒险
    SharedDef.TRIAL_INSTANCE_FIELD_CURSOR = 43; // 当前已经刷了多少波了
    SharedDef.TRIAL_INSTANCE_FIELD_SECTION_ID = 44; // 关卡id
    SharedDef.TRIAL_INSTANCE_FIELD_ORDER = 45; // 刷怪优先级序号(1个byte存一个数据)
    SharedDef.TRIAL_INSTANCE_FIELD_BOSS_REFRESHED = 47; // 是否已经刷怪
    SharedDef.TRIAL_INSTANCE_FIELD_LAST_RANDOM_TIMESTAMP = 48; // 最近随机刷怪时间戳
    // 家族场景
    SharedDef.FACTION_INSTANCE_FIELD_GUID = 6; //  家族GUID string
    // 家族首领挑战场景
    SharedDef.FACTION_BOSSDEFENSE_INSTANCE_FIELD_BUILDING_LV = 43; // 家族建筑等级
    SharedDef.FACTION_BOSSDEFENSE_INSTANCE_FIELD_INDEX = 44; // boss点 index
    SharedDef.FACTION_BOSSDEFENSE_INSTANCE_FIELD_POOL_ID = 45; // 怪物池 id
    SharedDef.FACTION_BOSSDEFENSE_INSTANCE_FIELD_HP = 46; // 怪物剩余hp
    SharedDef.FACTION_BOSSDEFENSE_INSTANCE_FIELD_PLAYER_GUID = 6; //  玩家GUID string
    SharedDef.FACTION_BOSSDEFENSE_INSTANCE_FIELD_FACTION_GUID = 7; //  家族GUID string
    // 家族无尽远征场景
    SharedDef.FACTION_TOWER_INSTANCE_FIELD_FLOOR = 43; //  当前层数
    SharedDef.FACTION_TOWER_INSTANCE_FIELD_BUFF = 44; //  玩家获得的buffeffect_id
    SharedDef.FACTION_TOWER_INSTANCE_FIELD_DEBUFF = 45; // 玩家获得的debuffeffect_id
    SharedDef.FACTION_TOWER_INSTANCE_FIELD_MONSTER_NUM = 46; // 当前怪物数量
    // 试炼塔
    SharedDef.TRIAL_INSTANCE_FIELD_ID = 43; //  当前层数
    //  桃花迷阵最大刷新次数
    SharedDef.TAOHUA_REFRESH_TIMES = 10;
    // 桃花迷阵地图数据
    SharedDef.TAOHUA_INT_FIELD_REFRESH_TIMES = 43; // 桃花迷阵已经刷新次数
    SharedDef.TAOHUA_INT_FIELD_BOSS_CURR_HP = 44; // BOSS当前血量
    SharedDef.TAOHUA_STR_FIELD_REAL_BOSS_GUID = 5; // BOSS真身GUID
    // 塔的最大层数
    SharedDef.TOWER_MAX_FLOOR = 2;
    // 塔怪每层击杀数量
    SharedDef.TAGUAI_INT_FIELD_FIRST_FLOOR = 43; // 第一层的信息
    // 战斗信息整形字符型枚举
    // 貌似没必要,随便留一个吧
    SharedDef.FIGHTING_INFO_STRING_CASTER = 0; // 施法者
    SharedDef.FIGHTING_INFO_STRING_TARGET = 1; // 目标
    SharedDef.MAX_FIGHTING_INFO_STRING = 2;
    // 战斗信息最大数量
    SharedDef.MAX_FIGHTING_INFO_COUNT = 100;
    // 战斗信息整形字段枚举
    SharedDef.FIGHTING_INFO_INT_VALUES = 0; // 伤害或者治疗 治疗发负数
    SharedDef.FIGHTING_INFO_INT_UINT8 = 2; // 0:是否被杀 1:施法者生物类型（玩家还是生物）2:目标生物类型（玩家还是生物） 3:伤害类型(暴击、闪避之类的)
    SharedDef.FIGHTING_INFO_INT_SPELL_ID = 3; // 技能id
    SharedDef.FIGHTING_INFO_INT_HP = 4; // 技能计算完以后，生物剩余血量
    SharedDef.FIGHTING_INFO_INT_RESERVE_0 = 5; // 预留
    SharedDef.FIGHTING_INFO_INT_RESERVE_1 = 6; // 预留	
    SharedDef.FIGHTING_INFO_INT_RESERVE_2 = 7; // 预留
    SharedDef.FIGHTING_INFO_INT_RESERVE_3 = 8; // 预留	
    SharedDef.MAX_FIGHTING_INFO_INT = 9;
    // 战斗信息字段
    SharedDef.MAX_FIGHTING_INFO_INT_NOW_INDEX = 0; // 当前战斗力信息下标用到第几个战斗信息了
    SharedDef.MAX_FIGHTING_INFO_INT_START = 1;
    SharedDef.MAX_FIGHTING_INFO_INT_FIELD = 901;
    SharedDef.FIGHTING_INFO_STRING_FIELD_START = 4;
    SharedDef.MAX_FIGHTING_INFO_STRING_FIELD = 204;
    // 查询用的玩家信息binlog
    SharedDef.QUERY_PLAYER_INT_UINT16 = 0; // 0 等级，1 宝石等级
    SharedDef.QUERY_PLAYER_INT_BYTE1 = 1; // 0 头像，1 发型，2 种族，3 性别
    SharedDef.QUERY_PLAYER_INT_BYTE2 = 2; // 0 阵营，1 是否在线，2 称号,3 vip
    //  基础属性
    SharedDef.QUERY_PLAYER_INT_BASE_ATTR_START = 3; // 玩家基本属性开始
    SharedDef.QUERY_PLAYER_INT_BASE_ATTR_END = 21; // 玩家基本属性结束
    SharedDef.QUERY_PLAYER_INT_FIXED_ATTR_START = 21; // 玩家固定属性开始
    SharedDef.QUERY_PLAYER_INT_FIXED_ATTR_END = 39; // 玩家固定属性结束	
    SharedDef.QUERY_PLAYER_INT_LUCKY = 39; // 幸运
    SharedDef.QUERY_PLAYER_INT_MEILI = 41; // 魅力
    SharedDef.QUERY_PLAYER_INT_BEAR = 43; // 负重
    SharedDef.QUERY_PLAYER_INT_POISON = 45; // 毒
    SharedDef.QUERY_PLAYER_INT_ICE = 47; // 冰
    SharedDef.QUERY_PLAYER_MOVESPEED = 49; // 移动速度
    SharedDef.QUERY_PLAYER_PHYSICAL = 51; // 体力
    SharedDef.QUERY_PLAYER_INT_FORCE = 53; // 战斗力
    SharedDef.QUERY_PLAYER_ONLINE_TIME = 55; // 总在线时长
    //  身上的装备
    SharedDef.QUERY_PLAYER_INT_EQUIPMENT = 56;
    SharedDef.QUERY_PLAYER_INT_EQUIPMENT_END = 76;
    SharedDef.QUERY_PLAYER_INT_FLAG = 76; // 查询某些标志位
    SharedDef.QUERY_PLAYER_INT_FORCE_LEVEL = 77; // 等级战斗力PLAYER_INT_PIFENG_ZIZHI_FORCE
    SharedDef.QUERY_PLAYER_INT_FORCE_ITEM = 79; // 装备战斗力
    SharedDef.QUERY_PLAYER_INT_FORCE_FACTION = 81; // 帮派战斗力
    SharedDef.QUERY_PLAYER_INT_FLAG_TYPE = 83; // 当前玩家查询类型标志
    SharedDef.QUERY_PLAYER_INT_FORGING_STRENG = 84; // 0 查询玩家强化等级，1 预留 16位
    SharedDef.QUERY_PLAYER_STRING_GUID = 4; // 不要直接放到guid去，怕混乱
    SharedDef.QUERY_PLAYER_STRING_NAME = 5; // 玩家名字
    SharedDef.QUERY_PLAYER_STRING_FACTION_ID = 6; // 帮派ID
    SharedDef.QUERY_PLAYER_STRING_FACTION_NAME = 7; // 帮派名称
    SharedDef.MAX_QUERY_PLAYER_STRING_FIELD = 8;
    // ///////////////////////////////////查看物品//////////////////////////////////////////////////////////////////////////
    // 查看物品下标
    // //////////////////int部分///////////////////////////////////////
    SharedDef.ITEM_QUERY_INT_FIELD_COUNT = 0;
    // //////////////////string部分///////////////////////////////////////
    SharedDef.ITEM_QUERY_STR_FIELD_START = 4;
    // 礼包信息记录类型枚举
    SharedDef.GIFTPACKS_INFO_INT_ID = 0; // 礼包ID
    SharedDef.GIFTPACKS_INFO_INT_START_TIME = 1; // 发放时间
    SharedDef.GIFTPACKS_INFO_INT_END_TIME = 2; // 结束时间
    SharedDef.GIFTPACKS_INFO_INT_BYTE = 3; // 0,礼包类型，1，领取状态,2 已阅读,3是否删除
    SharedDef.MAX_GIFTPACKS_INFO_INT = 4;
    SharedDef.GIFTPACKS_INFO_STRING_GIFT_NAME = 0; // 礼包名称
    SharedDef.GIFTPACKS_INFO_STRING_GIFT_DESC = 1; // 礼包说明
    SharedDef.GIFTPACKS_INFO_STRING_GIFT_FROM = 2; // 礼包出处，当玩家赠送时填写玩家名字，默认为空，系统赠送
    SharedDef.GIFTPACKS_INFO_STRING_GIFT_ITEM = 3; // 礼包物品集合
    SharedDef.MAX_GIFTPACKS_INFO_STRING = 4;
    // 礼包信息最多条数
    SharedDef.MAX_GIFTPACKS_INFO_COUNT = 100;
    // 礼包信息binlog
    SharedDef.MAX_GIFTPACKS_INFO_INT_NOW_INDEX = 0; // 当前礼包信息下标索引
    SharedDef.GIFTPACKS_INT_FIELD_BEGIN = 1;
    SharedDef.MAX_GIFTPACKS_INT_FIELD = 401;
    SharedDef.GIFTPACKS_STRING_FIELD_BEGIN = 4;
    SharedDef.MAX_GIFTPACKS_STRING_FIELD = 404;
    // 排行类型
    SharedDef.RANK_TYPE_POWER = 0; // 战斗力排行
    SharedDef.RANK_TYPE_LEVEL = 1; // 等级排行
    SharedDef.RANK_TYPE_MONEY = 2; // 财富排行
    SharedDef.RANK_TYPE_ONLINE_TIME = 3; // 在线时长排行
    SharedDef.RANK_TYPE_TRIAL = 4; // 试炼塔排行
    SharedDef.RANK_TYPE_FACTION = 5; // 家族排行
    SharedDef.RANK_TYPE_DIVINE = 6; // 神兵排行
    SharedDef.RANK_TYPE_MOUNT = 7; // 坐骑排行
    SharedDef.RANK_TYPE_SINGLE_PVP = 8; // 单人PVP排行
    SharedDef.RANK_TYPE_WINGS = 9; // 翅膀排行
    SharedDef.MAX_RANK_TYPE = 10;
    // 特殊类型排行榜
    SharedDef.RANK_TYPE_DOUJIANTAI = 11; // 斗剑台排行
    // 单个排行榜最大排名个数
    SharedDef.RANK_LIST_MAX_VALUES = 100;
    SharedDef.RANK_LIST_MAX_SHOW = 4;
    // 排行榜个体binlog下标
    SharedDef.RANK_LIST_CURRENT_OBJ_INT_FIELD_TYPE = 0; // 排行榜类型
    SharedDef.RANK_LIST_CURRENT_OBJ_INT_FIELD_RANKING = 1; // 名次
    SharedDef.RANK_LIST_CURRENT_OBJ_INT_FIELD_BYTE = 2; // byte 0，性别，数量
    SharedDef.RANK_LIST_CURRENT_OBJ_INT_FIELD_BYTE2 = 3; // 通用字段
    SharedDef.RANK_LIST_CURRENT_OBJ_INT_FIELD_TITLE = 4; // 称号
    // 排行榜
    SharedDef.RANK_LIST_CURRENT_OBJ_INT_FIELD_FORCE = 5; // 战斗力
    SharedDef.RANK_LIST_CURRENT_OBJ_INT_FIELD_LEVEL = 7; // 等级
    SharedDef.RANK_LIST_CURRENT_OBJ_INT_FIELD_MONEY = 8; // 铜钱
    SharedDef.RANK_LIST_CURRENT_OBJ_INT_FIELD_ONLINE_TIME = 10; // 在线时长
    SharedDef.RANK_LIST_CURRENT_OBJ_INT_FIELD_TRIAL = 11; // 试炼塔层数
    SharedDef.RANK_LIST_CURRENT_OBJ_INT_FIELD_SHOW = 12; // 外观列表开始
    SharedDef.RANK_LIST_CURRENT_OBJ_INT_FIELD_SHOW_END = 16; // 外观结束
    SharedDef.RANK_LIST_CURRENT_OBJ_INT_FIELD_LIKE = 17; // 点赞数
    SharedDef.RANK_LIST_CURRENT_OBJ_INT_FIELD_WING = 18; // 翅膀id
    SharedDef.RANK_LIST_CURRENT_OBJ_STR_FIELD_GUID = 4;
    SharedDef.RANK_LIST_CURRENT_OBJ_STR_FIELD_PLAYER_GUID = 5; // 玩家guid
    SharedDef.RANK_LIST_CURRENT_OBJ_STR_FIELD_PLAYER_NAME = 6; // 玩家名字
    SharedDef.RANK_LIST_CURRENT_OBJ_STR_FIELD_FACTION_NAME = 7; // 帮派名字
    SharedDef.RANK_LIST_INT_FIELD_FACTION_LEV = 2; // byte 0，性别
    SharedDef.RANK_LIST_INT_FIELD_FACTION_COUNT = 3;
    SharedDef.RANK_LIST_INT_FIELD_FACTION_BYTE = 4; // icon minlev
    SharedDef.RANK_LIST_STR_FIELD_FACTION_GUID = 4; // 帮派GUID
    SharedDef.RANK_LIST_STR_FIELD_FACTION_NAME = 5; // 帮派名字
    SharedDef.RANK_LIST_STR_FIELD_FACTION_SQGG = 6; // 帮派申请公告
    SharedDef.ITEM_SHOW_TYPE_DEFAULT = 0; // 默认显示
    SharedDef.ITEM_SHOW_TYPE_MINI_QUEST_BAR = 1; // 小任务面板
    SharedDef.ITEM_SHOW_TYPE_MINI_QUEST_DAILY2 = 2; // 日常任务面板
    // 弹窗公告记录类型枚举
    SharedDef.RIGHTFLOAT_INFO_INT_ID = 0; // 公告ID
    SharedDef.RIGHTFLOAT_INFO_INT_START_TIME = 1; // 起始时间
    SharedDef.RIGHTFLOAT_INFO_INT_END_TIME = 2; // 结束时间
    SharedDef.RIGHTFLOAT_INFO_INT_ZONE_1 = 3; // 0-7点
    SharedDef.RIGHTFLOAT_INFO_INT_ZONE_2 = 4; // 8-13点
    SharedDef.RIGHTFLOAT_INFO_INT_ZONE_3 = 5; // 14-23点
    SharedDef.RIGHTFLOAT_INFO_INT_BYTE = 6; // 0 弹窗设置,1 公告状态,2 预留,3 预留
    SharedDef.RIGHTFLOAT_INFO_INT_ADD_TIME = 7; // 添加时间
    SharedDef.MAX_RIGHTFLOAT_INFO_INT = 8;
    SharedDef.RIGHTFLOAT_INFO_STRING_SUBJECT = 0; // 标题
    SharedDef.RIGHTFLOAT_INFO_STRING_CONTENT = 1; // 内容
    SharedDef.RIGHTFLOAT_INFO_STRING_LINK = 2; // 链接地址
    SharedDef.MAX_RIGHTFLOAT_INFO_STRING = 3;
    // 弹窗信息最多条数
    SharedDef.MAX_RIGHTFLOAT_INFO_COUNT = 100;
    // 弹窗公告信息binlog
    SharedDef.MAX_RIGHTFLOAT_INFO_INT_NOW_INDEX = 0; // 当前弹窗公告信息下标索引
    SharedDef.RIGHTFLOAT_INT_FIELD_START = 1;
    SharedDef.MAX_RIGHTFLOAT_INT_FIELD = 801;
    SharedDef.RIGHTFLOAT_STRING_FIELD_START = 4;
    SharedDef.MAX_RIGHTFLOAT_STRING_FIELD = 304;
    // 限时活动binlog
    SharedDef.LIMIT_ACTIVITY_INT_FIELD_VERSION = 0; // 活动版本号
    SharedDef.LIMIT_ACTIVITY_INT_FIELD_START_TIME = 1; // 活动开始时间
    SharedDef.LIMIT_ACTIVITY_INT_FIELD_END_TIME = 2; // 活动结束时间
    SharedDef.LIMIT_ACTIVITY_INT_FIELD_RECHARGE_SUM = 3; // 充值总数
    SharedDef.LIMIT_ACTIVITY_INT_FIELD_RECHARGE_TIME = 4; // 最后充值时间
    SharedDef.LIMIT_ACTIVITY_INT_FIELD_REWARD_COUNT = 100; // 活动领取计数开始
    SharedDef.LIMIT_ACTIVITY_INT_FIELD_REWARD_COUNT_END = 500; // 活动领取计数结束
    SharedDef.LIMIT_ACTIVITY_STRING_FIELD_RECHARGE_ID = 4; // 最后充值ID
    SharedDef.LIMIT_ACTIVITY_STRING_FIELD_CLIENT_CONFIG = 5; // 客户端配置
    // 公告信息最多条数
    SharedDef.MAX_NOTICE_MESSAGE_NUMBER = 100;
    // 公告信息类型
    SharedDef.NOTICE_MESSAGE_INFO_TYPE_FISHING = 0; // 钓鱼公告
    SharedDef.NOTICE_MESSAGE_INFO_TYPE_MINING = 1; // 矿洞公告
    SharedDef.NOTICE_MESSAGE_INFO_TYPE_WORLD_BOSS = 2; // 世界boss掉落
    SharedDef.NOTICE_MESSAGE_INFO_TYPE_KAIFUJIJIN = 3; // 开服基金公告
    SharedDef.MAX_MESSAGE_INFO_TYPE = 4;
    // 公告信息binlog
    SharedDef.NOTICE_MESSAGE_INT_FIELD_INDEX = 0; // 公告位置索引
    SharedDef.NOTICE_MESSAGE_INT_FIELD_INDEX_END = 4; // 公告索引位置结束
    SharedDef.NOTICE_MESSAGE_STRING_FIELD_START = 4; // 公告信息内容开始
    SharedDef.NOTICH_MESSAGE_STRING_FIELD_END = 404; // 公告信息内容结束
    // 系统邮件信息记录类型枚举
    SharedDef.SYSTEM_MAIL_INFO_INT_ID = 0; // 礼包ID
    SharedDef.SYSTEM_MAIL_INFO_INT_START_TIME = 1; // 发放时间
    SharedDef.SYSTEM_MAIL_INFO_INT_END_TIME = 2; // 结束时间
    SharedDef.SYSTEM_MAIL_INFO_INT_TYPE = 3; // 礼包类型
    SharedDef.MAX_SYSTEM_MAIL_INFO_INT = 4;
    SharedDef.SYSTEM_MAIL_INFO_STRING_NAME = 0; // 系统邮件名称
    SharedDef.SYSTEM_MAIL_INFO_STRING_DESC = 1; // 系统邮件说明
    SharedDef.SYSTEM_MAIL_INFO_STRING_FROM = 2; // 系统邮件出处，当玩家赠送时填写玩家名字，默认为空，系统赠送
    SharedDef.SYSTEM_MAIL_INFO_STRING_ITEM = 3; // 礼包物品集合
    SharedDef.MAX_SYSTEM_MAIL_INFO_STRING = 4;
    // 系统邮件信息最多条数
    SharedDef.MAX_SYSTEM_MAIL_INFO_COUNT = 8192;
    //  系统邮件(对全服都有效的)
    SharedDef.SYSTEM_MAIL_COUNT = 0; // 系统邮件个数
    SharedDef.MAX_SYSTEM_MAIL_INFO_INT_NOW_INDEX = 1; // 当前系统邮件信息下标索引
    SharedDef.SYSTEM_MAIL_INT_FIELD_BEGIN = 2;
    SharedDef.SYSTEM_MAIL_INT_FIELD_END = 32770;
    SharedDef.SYSTEM_MAIL_STRING_FIELD_BEGIN = 4;
    SharedDef.SYSTEM_MAIL_STRING_FIELD_END = 32772;
    // 离线邮件最多条数
    SharedDef.MAX_OFFLINE_MAIL_INFO_COUNT = 16384;
    //  离线邮件存储地方
    SharedDef.OFFLINE_MAIL_STORE_RANK_LEVEL = 0; // 等级排行榜离线邮件存储
    SharedDef.MAX_OFFLINE_MAIL_STORE_COUNT = 1;
    // 托管操作
    SharedDef.HOSTING_OPT_TYPE_APPLY = 0; // 托管申请
    SharedDef.HOSTING_OPT_TYPE_AGREED = 1; // 托管同意
    SharedDef.HOSTING_OPT_TYPE_CANCEL = 2; // 托管取消
    SharedDef.HOSTING_OPT_TYPE_LOGIN = 3; // 托管登录
    SharedDef.HOSTING_OPT_TYPE_REFUSE = 4; // 托管拒绝
    SharedDef.HOSTING_OPT_TYPE_DUE_TO = 5; // 托管到期
    SharedDef.HOSTING_OPT_TYPE_APPLY_DUE_TO = 6; // 托管申请到期
    // 部位信息个数
    SharedDef.MAX_EQUIP_PART_NUMBER = 10;
    // 一个部位的宝石个数
    SharedDef.ONE_EQUIP_PART_GEM_NUMBER = 6;
    //  一个装备部位信息类型
    SharedDef.EQUIP_PART_OPT_TYPE_STRENGTH_LEVEL_OFFSET = 0; // 强化等级偏移值
    SharedDef.EQUIP_PART_OPT_TYPE_GEM_INFO_OFFSET = 1; // 宝石信息偏移值
    SharedDef.EQUIP_PART_OPT_TYPE_GEM_LEVEL_OFFSET = 0; // 宝石信息中宝石等级偏移值
    SharedDef.EQUIP_PART_OPT_TYPE_GEM_EXP_OFFSET = 1; // 宝石信息中宝石经验偏移值
    SharedDef.EQUIP_PART_OPT_TYPE_ONE_GEM_INFO_LENGTH = 2; // 一个宝石信息的长度
    SharedDef.EQUIP_PART_OPT_TYPE_ONE_PART_INFO_LENGTH = 13; // 一个装备部位的信息长度
    SharedDef.EQUIP_PART_OPT_TYPE_PARTS_INFO_LENGTH = 130; // 所有装备部位总信息长度 
    //  业务BinLog
    SharedDef.APPD_LOGICAL_INFO_INT_FIELD_STRENGTH_START = 0; // 部位信息的起始位置
    SharedDef.APPD_LOGICAL_INFO_INT_FIELD_STRENGTH_END_EXCLUDE = 130; // 装备部位的边界
    // 文本解析类型
    SharedDef.TEXT_TYPE_POSITION = 1; // 坐标
    SharedDef.TEXT_TYPE_SUIT = 2; // 装备
    SharedDef.TEXT_TYPE_GROUP = 3; // 加入队伍
    SharedDef.TEXT_TYPE_INSTANCE = 4; // 加入副本
    //  被动技能效果类型
    SharedDef.PASSIVE_EFFECT_TYPE_SPELL_AMPLIFY = 1; // 增强技能效果
    SharedDef.PASSIVE_EFFECT_TYPE_ADD_BUFF = 2; // 增加buff效果
    SharedDef.PASSIVE_EFFECT_TYPE_CHANGE_SPELL = 3; // 替换技能效果
    SharedDef.PASSIVE_EFFECT_TYPE_PLAYER_ATTR = 4; // 提高人物属性
    SharedDef.PASSIVE_EFFECT_TYPE_ADDITIONAL_SPELL = 5; // 释放额外技能
    SharedDef.PASSIVE_EFFECT_TYPE_PLAYER_LOOT_ATTR = 6; // 获得属性战利品
    //  被动技能触发类型
    SharedDef.PASSIVE_DISPATCH_TYPE_FOREVER = 0; // 永久
    SharedDef.PASSIVE_DISPATCH_TYPE_ATTR_CHANGE = 1; // 属性改变
    SharedDef.PASSIVE_DISPATCH_TYPE_HIT = 2; // 攻击命中敌人
    SharedDef.PASSIVE_DISPATCH_TYPE_HURT = 3; // 受到攻击
    SharedDef.PASSIVE_DISPATCH_TYPE_DEAD = 4; // 死亡时触发
    SharedDef.PASSIVE_DISPATCH_TYPE_ENEMY_DEAD = 5; // 敌方死亡
    SharedDef.PASSIVE_DISPATCH_TYPE_ON_BUFF = 6; // 受到buff的时候触发
    SharedDef.PASSIVE_DISPATCH_TYPE_ENEMY_ON_BUFF = 7; // 敌方拥有某个buff的时候触发
    // 系统模块
    SharedDef.MODULE_SETTING = 101; // 设置
    SharedDef.MODULE_BAG = 102; // 背包
    SharedDef.MODULE_RONGLIAN = 103; // 熔炼
    SharedDef.MODULE_QUEST = 104; // 任务
    SharedDef.MODULE_DAILY_TASKS = 105; // 日常任务
    SharedDef.MODULE_CHAT = 106; // 聊天
    SharedDef.MODULE_MAIL = 107; // 邮件
    SharedDef.MODULE_MAP = 108; // 地图
    SharedDef.MODULE_STRENGTH = 109; // 我要变强
    SharedDef.MODULE_CHATPERSON = 110; // 私聊
    SharedDef.MODULE_ACTIVE = 111; // 活跃
    SharedDef.MODULE_MONEYTREE = 112; // 摇钱树
    SharedDef.MODULE_FISH = 113; // 我要变弱
    SharedDef.MODULE_ROLE = 201; // 角色
    SharedDef.MODULE_SPELL = 202; // 技能
    SharedDef.MODULE_DIVINE = 203; // 法宝
    SharedDef.MODULE_FASHION = 204; // 时装
    SharedDef.MODULE_MOUNT = 205; // 坐骑
    SharedDef.MODULE_MIX = 206; // 炼器
    SharedDef.MODULE_WING = 207; // 翅膀
    SharedDef.MODULE_TCM = 208; // 经脉
    SharedDef.MODULE_GW = 209; // 神器
    SharedDef.MODULE_SOCIAL = 301; // 社交
    SharedDef.MODULE_FACTION = 302; // 家族
    SharedDef.MODULE_RANK = 303; // 排行榜
    SharedDef.MODULE_FACTIONMAIN = 304; // 家族-家族主殿
    SharedDef.MODULE_FACTIONSKILL = 305; // 家族-技能大厅
    SharedDef.MODULE_FACTIONACTIVE = 306; // 家族-活动大厅
    SharedDef.MODULE_FACTIONBOX = 307; // 家族-家族宝库
    SharedDef.MODULE_MALL = 401; // 商城
    SharedDef.MODULE_VIP = 402; // VIP特权
    SharedDef.MODULE_INSTANCE = 501; // 副本
    SharedDef.MODULE_WORLD_RISK = 502; // 世界冒险
    SharedDef.MODULE_ARENA = 503; // 竞技
    SharedDef.MODULE_BOSS = 504; // BOSS
    SharedDef.MODULE_EXP = 505; // 历练任务
    SharedDef.MODULE_WELFARE = 601; // 福利
    SharedDef.MODULE_OPENSERVICE = 701; // 开服活动
    SharedDef.MODULE_FIRST_RECHARGE = 801; // 首冲
    SharedDef.MODULE_TEST = 1001; // 测试
    SharedDef.MODULE_SETTING_SYSTEM = 1; // 设置
    SharedDef.MODULE_BAG_ITEM = 1; // 背包
    SharedDef.MODULE_RONGLIAN_ALL = 1; // 熔炼
    SharedDef.MODULE_QUEST_MAIN = 1; // 主线
    SharedDef.MODULE_QUEST_EXTENSION = 2; // 支线
    SharedDef.MODULE_QUEST_ACTIVITY = 3; // 活动
    SharedDef.MODULE_DAILY_TASKS_ALL = 1; // 日常任务
    SharedDef.MODULE_CHAT_ALL = 1; // 聊天
    SharedDef.MODULE_MAIL_ALL = 1; // 邮件
    SharedDef.MODULE_MAP_REGION = 1; // 区域
    SharedDef.MODULE_MAP_WORLD = 2; // 世界
    SharedDef.MODULE_STRENGTH_ALL = 1; // 我要变强
    SharedDef.MODULE_CHATPERSON_ALL = 1; // 聊天
    SharedDef.MODULE_ACTIVE_ALL = 1; // 活跃
    SharedDef.MODULE_MONEYTREE_ALL = 1; // 摇钱树
    SharedDef.MODULE_FISH_ALL = 1; // 我要变弱
    SharedDef.MODULE_ROLE_ATTR = 1; // 角色属性
    SharedDef.MODULE_ROLE_ACHIEVE = 2; // 角色成就
    SharedDef.MODULE_ROLE_TITLE = 3; // 角色称号
    SharedDef.MODULE_SPELL_ALL = 1; // 技能
    SharedDef.MODULE_DIVINE_ALL = 1; // 法宝
    SharedDef.MODULE_FASHION_CLOTHES = 1; // 衣服
    SharedDef.MODULE_FASHION_WEAPON = 2; // 武器
    SharedDef.MODULE_MOUNT_UPGRADE = 1; // 升阶
    SharedDef.MODULE_MOUNT_LEVEL = 2; // 升级
    SharedDef.MODULE_MOUNT_SKILL = 3; // 技能
    SharedDef.MODULE_MOUNT_ILLUSION = 4; // 幻化
    SharedDef.MODULE_MIX_STRENGTH = 1; // 强化
    SharedDef.MODULE_MIX_POLISHED = 2; // 精炼
    SharedDef.MODULE_MIX_GEM = 3; // 宝石
    SharedDef.MODULE_MIX_WASH = 4; // 洗练
    SharedDef.MODULE_WING_UPGRADE = 1; // 翅膀进阶
    SharedDef.MODULE_WING_STRENGTH = 2; // 翅膀强化
    SharedDef.MODULE_TCM_ALL = 1; // 角色经脉
    SharedDef.MODULE_GW_ALL = 1; // 神器
    SharedDef.MODULE_SOCIAL_FRIEND = 1; // 好友
    SharedDef.MODULE_SOCIAL_ENEMY = 2; // 仇人
    SharedDef.MODULE_FACTION_RECRUIT = 1; // 家族招募
    SharedDef.MODULE_FACTION_CREATE = 2; // 创建家族
    SharedDef.MODULE_FACTION_MEMBER = 3; // 家族成员
    SharedDef.MODULE_FACTION_FUNCTION = 4; // 家族功能
    SharedDef.MODULE_RANK_LOCAL = 1; // 本服排行
    SharedDef.MODULE_RANK_KUAFU = 2; // 跨服排行
    SharedDef.MODULE_FACTIONMAIN_ALL = 1; // 家族主殿
    SharedDef.MODULE_FACTIONSKILL_ALL = 1; // 技能大厅
    SharedDef.MODULE_FACTIONACTIVE_TRIAL = 1; // 家族远征
    SharedDef.MODULE_FACTIONACTIVE_BOSS = 2; // 家族boss
    SharedDef.MODULE_FACTIONBOX_DEVOTE = 1; // 家族宝库
    SharedDef.MODULE_FACTIONBOX_ITEM = 2; // 家族仓库
    SharedDef.MODULE_MALL_GOLD = 1; // 元宝商城
    SharedDef.MODULE_MALL_SCORE = 2; // 积分商店
    SharedDef.MODULE_MALL_RECHARGE = 3; // 充值
    SharedDef.MODULE_VIP_ALL = 1; // VIP特权
    SharedDef.MODULE_INSTANCE_PLOT = 1; // 剧情副本
    SharedDef.MODULE_INSTANCE_RES = 2; // 资源副本
    SharedDef.MODULE_INSTANCE_TRIAL = 3; // 试炼塔
    SharedDef.MODULE_INSTANCE_TEAM = 4; // 多人副本
    SharedDef.MODULE_WORLD_RISK_MAIN = 1; // 世界冒险
    SharedDef.MODULE_ARENA_DOUJIANTAI = 1; // 斗剑台(1V1)
    SharedDef.MODULE_ARENA_XIANMO = 2; // 仙魔道(3V3)
    SharedDef.MODULE_ARENA_XIANFU = 3; // 仙府夺宝
    SharedDef.MODULE_ARENA_RANK = 4; // 排位赛
    SharedDef.MODULE_BOSS_PERSON_BOSS = 1; // 个人boss
    SharedDef.MODULE_BOSS_RISK_BOSS = 2; // BOSS挑战
    SharedDef.MODULE_BOSS_WORLD_BOSS = 3; // 世界BOSS
    SharedDef.MODULE_EXP_QUEST = 1; // 历练任务
    SharedDef.MODULE_EXP_ARTIFACT = 2; // 神器铸造
    SharedDef.MODULE_WELFARE_MONTH = 1; // 月签到
    SharedDef.MODULE_WELFARE_LEVEL = 2; // 升级奖励
    SharedDef.MODULE_WELFARE_SEVEN = 3; // 七日大礼
    SharedDef.MODULE_WELFARE_RECHARGE = 4; // 充值返利
    SharedDef.MODULE_WELFARE_CONSUME = 5; // 消费有奖
    SharedDef.MODULE_OPENSERVICE_SEVEN = 1; // 七日目标
    SharedDef.MODULE_OPENSERVICE_DRAW = 2; // 开服寻宝
    SharedDef.MODULE_OPENSERVICE_EVERYDAY = 3; // 每日礼包
    SharedDef.MODULE_OPENSERVICE_NEW = 4; // 新手礼包
    SharedDef.MODULE_FIRST_RECHARGE_ALL = 1; // 首冲
    SharedDef.MODULE_TEST_WORLD = 1; // 世界
    SharedDef.MODULE_TEST_REGION = 2; // 区域
    SharedDef.MODULE_TEST_RISK = 3; // 世界冒险
    SharedDef.MERIDIAN_EXP_SOURCE_GROUP_INSTANCE = 1; // 	跨服副本
    SharedDef.MERIDIAN_EXP_SOURCE_TALISMAN_ZHULING = 2; // 	法宝注灵
    SharedDef.MERIDIAN_EXP_SOURCE_WINGS_STRENGTH = 3; // 	翅膀强化
    //  活跃度类型
    SharedDef.VITALITY_TYPE_SMELT_EQUIP = 1; // 熔炼
    SharedDef.VITALITY_TYPE_RES_INSTANCE = 2; // 资源副本
    SharedDef.VITALITY_TYPE_TRIAL_INSTANCE = 3; // 试炼塔
    SharedDef.VITALITY_TYPE_GROUP_INSTANCE = 4; // 多人副本
    SharedDef.VITALITY_TYPE_MASS_BOSS = 5; // BOSS挑战
    SharedDef.VITALITY_TYPE_WORLD_BOSS = 6; // 世界BOSS
    SharedDef.VITALITY_TYPE_FACTION_BOSS = 7; // 家族BOSS
    SharedDef.VITALITY_TYPE_FACTION_TOWER = 8; // 家族远征
    SharedDef.VITALITY_TYPE_FACTION_DONATE = 9; // 家族贡献
    SharedDef.VITALITY_TYPE_DOUJIANTAI = 10; // 斗剑台
    SharedDef.VITALITY_TYPE_SINGLE_PVP = 11; // 排位赛
    SharedDef.VITALITY_TYPE_PRIVATE_BOSS = 12; // 个人boss
    SharedDef.VITALITY_TYPE_SHOP_BUY = 13; // 商城购买
    SharedDef.VITALITY_TYPE_RANK_LIKE = 14; // 膜拜高手
    SharedDef.VITALITY_TYPE_DAILY_QUEST = 15; // 日常任务
    //  神剑解锁类型
    SharedDef.ADVENTURE_UNLOCK_LIMIT_WORLDRISK = 1; // 通关挂机第N关
    SharedDef.ADVENTURE_UNLOCK_LIMIT_KILLMONSTER = 2; // 击杀某个怪物
    SharedDef.ADVENTURE_UNLOCK_LIMIT_FORCE = 3; // 战力达到N
    SharedDef.ADVENTURE_UNLOCK_LIMIT_LEVEL = 4; // 人物等级到N
    SharedDef.ADVENTURE_UNLOCK_LIMIT_WING = 5; // 翅膀到几星几阶
    SharedDef.ADVENTURE_UNLOCK_LIMIT_MOUNT = 6; // 坐骑到几星几阶
    return SharedDef;
}());
