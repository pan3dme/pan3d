import 'dart:math';

import 'package:flutter/material.dart';
import 'package:flutterapptwo/src/core/mathclass.dart';
import 'package:flutterapptwo/src/shop/shop_dataVo.dart';


class ListGridPanel extends StatefulWidget {
  ZhifuLieTongDaoVo selectVo;

  ListGridPanel(ZhifuLieTongDaoVo vo) {
    selectVo = vo;
  }
  @override
  ListGridPanelState createState() {
    return new ListGridPanelState(selectVo);
  }
}

class ListGridPanelState extends State<ListGridPanel> {
  ZhifuLieTongDaoVo baseDataVo = new ZhifuLieTongDaoVo('支付宝');
  final List<Widget> aboutBoxChildren = <Widget>[
    SizedBox(height: 24),
    RichText(
      text: TextSpan(
        children: <TextSpan>[
          TextSpan(text: 'Flutter is Googleâ t '),
          TextSpan(text: 'http://www.baidu.com'),
        ],
      ),
    ),
  ];
  ListGridPanelState(ZhifuLieTongDaoVo vo) {
    baseDataVo = vo;
  }
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: makeShopGridListAndTab(baseDataVo),
    );
  }
  /*
  创建标签和支付档次列表
   */

  Widget makeShopGridListAndTab(ZhifuLieTongDaoVo item) {
    return Row(
      children: <Widget>[
        Container(
          width: 100,
          color: MathClass.getRandomColor(),
          child: leftListBox(),
        ),
        Expanded(
          child: LimitedBox(
            maxHeight: double.infinity,
            child: GridView.count(
              crossAxisCount: 3,
              childAspectRatio: 0.9,
              children: List.generate(
                  item.menuLists[item.selectIdx].playList.length,
                  (idx) => Card(
                        color: Colors.white,
                        child: ShopGridViewCell(
                            context,
                            item.menuLists[item.selectIdx],
                            item.menuLists[item.selectIdx].playList[idx]),
                      )),
            ),
          ),
        ),
      ],
    );
  }

  Widget ShopGridViewCell(context, ZhifuFanshiVo zhifuFanshiVo, String str) {
    GestureDetector ctx = new GestureDetector(
      onTapDown: (_) => {
        showAboutDialog(
          context: context,
          applicationVersion: '确认购买',
          children: aboutBoxChildren,
        ),
      },
      child: new Container(
          decoration: new BoxDecoration(
              border: new Border.all(color: Colors.red, width: 0.5), // 边色与边宽度
              color: Colors.white, // 底色
              shape: BoxShape.rectangle, // 默认值也是矩形
              borderRadius: new BorderRadius.circular((8.0))), // 圆角度
          child: new Column(children: <Widget>[
            Container(
              height: 40.0,
              child: Image.asset(
                'lib/images/shop_diamond.png',
                height: 30.0,
                width: 30.0,
                fit: BoxFit.fitWidth,
              ),
            ),
            new Text(zhifuFanshiVo.tittle,
                style: new TextStyle(
                  decoration: TextDecoration
                      .lineThrough, //none无文字装饰   lineThrough删除线   overline文字上面显示线    underline文字下面显示线
                  fontSize: 11.0,
                  color: Colors.black,
                )),
            new Text('$str',
                style: new TextStyle(
                  fontSize: 11.0,
                )),
            Expanded(
              child: bottomInfoBoxCopy(),
            ),
          ])),
    );

    return ctx;
  }

  Widget bottomInfoBoxCopy() {
    return Container(
        color: Colors.green,
        child: LayoutBuilder(builder: (context, constrains) {
          return Container(
            width: 100,
            child: new Text('BI3G', textAlign: TextAlign.center),
          );
        }));
  }

  Widget bottomInfoBox() {
    return Container(
      decoration: new BoxDecoration(
          border:
              new Border.all(color: Color(0xFFFFFF00), width: 0.5), // 边色与边宽度
          gradient: RadialGradient(
              colors: [Color(0xFFFFFF00), Color(0xFF00FF00), Color(0xFF00FFFF)],
              radius: 1,
              tileMode: TileMode.repeated)),
      child: new Text('93339元',
          style: new TextStyle(
            fontSize: 11.0,
          )),
    );
  }

  Widget leftListBox() {
    return ListView.builder(
        itemCount: baseDataVo.menuLists.length,
        itemBuilder: (context, idx) {
          return Card(
              color: baseDataVo.selectIdx == idx ? Colors.red : Colors.white38,
              child: ShopLeftViewCell(context, idx, baseDataVo));
        });
  }

  Widget ShopLeftViewCell(context, idx, ZhifuLieTongDaoVo zhifuLieTongDaoVo) {
    GestureDetector ctx = new GestureDetector(
      onTapDown: (_) => {this.baseDataVo.selectIdx = idx, setState(() {})},
      child: Container(
        child: Text(zhifuLieTongDaoVo.menuLists[idx].tittle,
            textAlign: TextAlign.center),
        height: 35,
      ),
    );

    return ctx;
  }


}
