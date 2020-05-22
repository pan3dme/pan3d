class BaseDataVo {
  int selectIdx = 0;
  String tabName = '1';
  List<String> menuLists = [
    "空",
  ];
  BaseDataVo(str) {
    this.tabName = str;
  }
}

class BaseDataItem {
  int tabIdx = 0;
  List<BaseDataVo> pageList;
  BaseDataItem() {
    this.pageList = new List();
    this.pageList.add(makeTab0());
    this.pageList.add(makeTab1());
    this.pageList.add(makeTab2());
    this.pageList.add(new BaseDataVo('云闪付'));
  }
  makeTab0() {
    BaseDataVo one = new BaseDataVo('支付宝');
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
    BaseDataVo one = new BaseDataVo('微信');
    one.menuLists = new List();
    one.menuLists.add("微信0");
    one.menuLists.add("微信1");
    one.menuLists.add("微信2");
    one.menuLists.add("微信3");

    return one;
  }

  makeTab2() {
    BaseDataVo one = new BaseDataVo('人工充值');
    one.menuLists = new List();
    one.menuLists.add("人工充值0");
    one.menuLists.add("人工充值1");
    one.menuLists.add("人工充值2");
    one.menuLists.add("人工充值3");

    return one;
  }
}
