import 'dart:math';

import 'package:flutter/material.dart';
import 'package:flutterapptwo/src/base/BaseDataVo.dart';
 

class ListTabelView extends StatefulWidget {
  @override
  ListTabelViewState createState() {
    return new ListTabelViewState();
  }
}

class ListTabelViewState extends State<ListTabelView> {
  final BaseDataVo baseDataVo = new BaseDataVo('支付宝');
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
  @override
  Widget build(BuildContext context) {
    return Scaffold(
        body: ListView.builder(
      itemCount: baseDataVo.menuLists.length,
      itemBuilder: (context, idx) {
        print(idx);
        return Card(
            color: baseDataVo.selectIdx == idx ? Colors.red : Colors.white38,
            child: ShopLeftViewCell(context, idx, baseDataVo));
      },
    ));
  }

  Widget ShopLeftViewCell(context, idx, baseDataVo) {
    GestureDetector ctx = new GestureDetector(
      onTapDown: (_) => {this.baseDataVo.selectIdx = idx, setState(() {})},
      child: Container(
        child: Text(baseDataVo.menuLists[idx], textAlign: TextAlign.center),
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
