class BaseDataVo {
  BaseDataVo(tabName);
  int selectIdx = 0;
  final String tabName = '微信';
  List<String> menuLists = [
    "支付宝0",
    "支付宝1",
    "支付宝2",
    "支付宝3",
  ];
}

class BaseDataItem {
  int tabIdx = 0;
  List<BaseDataVo> pageList = [
    new BaseDataVo('微信0'),
    new BaseDataVo('微信1'),
    new BaseDataVo('微信2'),
    new BaseDataVo('微信3'),
  ];
}
