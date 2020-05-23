import 'dart:math';

/*
支付方式
 */
class ZhifuFanshiVo {
  /*
  支付方式名字   「支付宝001」 「微信001」
   */
  String tittle;
  /*
  支付档次  金额 和 其它」
   */
  List<String> playList;
  ZhifuFanshiVo(String value) {
    tittle = value;
    playList = new List();
    /*
    随机生成支付金额档次
     */
    var random = new Random();
    int len=random.nextInt(10)+2;
    for(int i=1;i<len;i++){
      playList.add("$i 0元");
    }
  }
}
/*
支付通道 对应的类型
 */

class ZhifuLieTongDaoVo {
  /*
  当前选取的索引
   */
  int selectIdx = 0;
  /*
  支付通道名字    支付宝 微信 人工
   */
  String tabName;
  List<ZhifuFanshiVo> menuLists;
  ZhifuLieTongDaoVo(str) {
    this.tabName = str;
  }
}

class BaseDataItem {
  int tabIdx = 0;
  List<ZhifuLieTongDaoVo> pageList;
  BaseDataItem() {
    /*
    人工创建基础机构数据
    */
    this.pageList = new List();
    this.pageList.add(makeTab0());
    this.pageList.add(makeTab1());
    this.pageList.add(makeTab2());
    this.pageList.add(makeTab3());
  }
  makeTab0() {
    ZhifuLieTongDaoVo one = new ZhifuLieTongDaoVo('支付宝');
    one.menuLists = new List();
    one.menuLists.add(new ZhifuFanshiVo('支付宝0'));
    one.menuLists.add(new ZhifuFanshiVo('支付宝1'));
    one.menuLists.add(new ZhifuFanshiVo('支付宝2'));
    return one;
  }

  makeTab1() {
    ZhifuLieTongDaoVo one = new ZhifuLieTongDaoVo('微信');
    one.menuLists = new List();
    one.menuLists.add(new ZhifuFanshiVo('微信10'));
    one.menuLists.add(new ZhifuFanshiVo('微信11'));
    one.menuLists.add(new ZhifuFanshiVo('微信12'));
    return one;
  }

  makeTab2() {
    ZhifuLieTongDaoVo one = new ZhifuLieTongDaoVo('人工充@');
    one.menuLists = new List();
    one.menuLists.add(new ZhifuFanshiVo('人工充值0'));
    return one;
  }

  makeTab3() {
    ZhifuLieTongDaoVo one = new ZhifuLieTongDaoVo('云闪付');
    one.menuLists = new List();
    one.menuLists.add(new ZhifuFanshiVo('云闪付0'));
    return one;
  }
}
