import 'dart:math';

import 'package:flutter/material.dart';
import 'package:flutterapptwo/src/base/BaseDataVo.dart';

class ListGridPanel extends StatefulWidget {
  BaseDataVo selectVo;
  ListGridPanel(BaseDataVo vo) {
    selectVo = vo;
  }
  @override
  ListGridPanelState createState() {
    return new ListGridPanelState(selectVo);
  }
}

class ListGridPanelState extends State<ListGridPanel> {
  BaseDataVo baseDataVo = new BaseDataVo('支付宝');
  ListGridPanelState(BaseDataVo vo) {
    baseDataVo = vo;
  }
  @override
  Widget build(BuildContext context) {
    return Scaffold(
        body: leftListBox(),
    );
  }
  Widget leftListBox()
  {
  return  ListView.builder(
        itemCount: baseDataVo.menuLists.length,
        itemBuilder: (context, idx) {
      return Card(
          color: baseDataVo.selectIdx == idx ? Colors.red : Colors.white38,
          child: ShopLeftViewCell(context, idx, baseDataVo));
    });
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
