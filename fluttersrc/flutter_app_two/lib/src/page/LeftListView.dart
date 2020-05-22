import 'dart:math';

import 'package:flutter/material.dart';
import 'package:flutterapptwo/src/base/BaseDataVo.dart';

class ListTabelView extends StatelessWidget {
  final BaseDataVo baseDataVo = new BaseDataVo();
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
//    debugPaintSizeEnabled=true;
    // TODO: implement build
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
      onTapDown: (_) => {
        this.baseDataVo.selectIdx = idx,

        //this.selectIdx=idx;
      },
      child: Container(
        child: Text(baseDataVo.menuLists[idx], textAlign: TextAlign.center),
        height: 35,
      ),
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
}
