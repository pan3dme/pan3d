import 'dart:math';

import 'package:flutter/material.dart';
import 'package:flutterapptwo/src/base/BaseDataVo.dart';
import 'package:flutterapptwo/src/unit/ScreenUtil.dart';

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
//  List<String> gridlistData = [
//    "aaa",
//    "bbb",
//
//  ];
  ListGridPanelState(ZhifuLieTongDaoVo vo) {
    baseDataVo = vo;
  }
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: oldPanelText(baseDataVo),
    );
  }
  Widget oldPanelText(ZhifuLieTongDaoVo item)
  {
    return  Row(
      children: <Widget>[
        Container(
          width: ScreenUtil().scaleWidth * 300,
          color: Colors.white,
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
                    color: Colors.green,
                    child: ShopGridViewCellCopy(context,item.menuLists[item.selectIdx], item.menuLists[item.selectIdx].playList[idx]),
                  )),
            ),
          ),
        ),
      ],
    );

  }

  Widget ShopGridViewCellCopy(context,ZhifuFanshiVo zhifuFanshiVo,String str) {
    GestureDetector ctx = new GestureDetector(
//      color: Colors.white,
      onTapDown: (_) => {
        showAboutDialog(
          context: context,
          applicationVersion: '确认购买',
          children: aboutBoxChildren,
        ),
      },
      child: new Container(
          child: new Column(children: <Widget>[
            Icon(
              Icons.add,
              color: Colors.pink,
              size: 24.0,
              semanticLabel: 'Text to announce in accessibility modes',
            ),
            new Text(zhifuFanshiVo.tittle),
            new Text('$str')
          ])),
    );

    return ctx;
  }
  Color _getColor() {
    var random = new Random();
    int r = random.nextInt(255);
    int g = random.nextInt(255);
    int b = random.nextInt(255);
    print(r);
    print(g);
    print(b);
    return Color.fromARGB(255, r, g, b);
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

  Widget ShopLeftViewCell(context, idx,ZhifuLieTongDaoVo zhifuLieTongDaoVo) {
    GestureDetector ctx = new GestureDetector(
      onTapDown: (_) => {this.baseDataVo.selectIdx = idx, setState(() {})},
      child: Container(
        child: Text(zhifuLieTongDaoVo.menuLists[idx].tittle, textAlign: TextAlign.center),
        height: 35,
      ),
    );

    return ctx;
  }

  Color getColor() {
    return Color.fromARGB(255, Random().nextInt(255), Random().nextInt(255),
        Random().nextInt(255));
  }
}
