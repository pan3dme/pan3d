import 'dart:math';

class ZhifuFanshiVo {
  String tittle;
  List<String> playList;
  ZhifuFanshiVo(str) {
    tittle = str;
    playList = new List();
    var random = new Random();
    int len=random.nextInt(10)+2;
    for(int i=0;i<len;i++){
      playList.add("$i 0元");
    }
  }
}

class ZhifuLieTongDaoVo {
  int selectIdx = 0;
  String tabName = '1';
  List<ZhifuFanshiVo> menuLists;
  ZhifuLieTongDaoVo(str) {
    this.tabName = str;
  }
}

class BaseDataItem {
  int tabIdx = 0;
  List<ZhifuLieTongDaoVo> pageList;
  BaseDataItem() {
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
    ZhifuLieTongDaoVo one = new ZhifuLieTongDaoVo('人工充值');
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
