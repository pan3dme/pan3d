class CarouselInfo {
  String imageUrl;
  String link;

  CarouselInfo.fromJson(Map data) {
    imageUrl = data['image_url'];
    link = data['link_url'];
  }
}


class BaseDataVo{
  int selectIdx=2;
  List<String> menuLists = [
    "支付宝0",
    "支付宝1",
    "支付宝2",
    "支付宝3",
  ];


}