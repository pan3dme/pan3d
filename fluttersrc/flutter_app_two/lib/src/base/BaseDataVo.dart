
class ZhifuFanshiVo {

  String tittle;
  List<String> playList   ;
  ZhifuFanshiVo(str) {
    tittle=str;
    playList=new List();
    playList.add("10元");
    playList.add("20元");
    playList.add("30元");
    playList.add("40元");
    playList.add("50元");
    playList.add("60元");

  }
}

class ZhifuLieTongDaoVo {
  int selectIdx = 0;
  String tabName = '1';
  List<String> menuLists = [
    "空",
  ];
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
    this.pageList.add(new ZhifuLieTongDaoVo('云闪付'));
  }
  makeTab0() {
    ZhifuLieTongDaoVo one = new ZhifuLieTongDaoVo('支付宝');
    one.menuLists = new List();
    one.menuLists.add("支付宝0");
    one.menuLists.add("支付宝1");
    one.menuLists.add("支付宝2");
    one.menuLists.add("支付宝3");
    one.menuLists.add("支付宝4");
    one.menuLists.add("支付宝5");
    one.menuLists.add("支付宝6");

    return one;
  }

  makeTab1() {
    ZhifuLieTongDaoVo one = new ZhifuLieTongDaoVo('微信');
    one.menuLists = new List();
    one.menuLists.add("微信0");
    one.menuLists.add("微信1");
    one.menuLists.add("微信2");
    one.menuLists.add("微信3");

    return one;
  }

  makeTab2() {
    ZhifuLieTongDaoVo one = new ZhifuLieTongDaoVo('人工充值');
    one.menuLists = new List();
    one.menuLists.add("人工充值0");
    one.menuLists.add("人工充值1");
    one.menuLists.add("人工充值2");
    one.menuLists.add("人工充值3");

    return one;
  }
}
