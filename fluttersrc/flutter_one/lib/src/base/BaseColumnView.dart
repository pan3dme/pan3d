/**
 * Column
 * 使用Expanded控件，将一行的宽度分成四个等分，第一、三个child占1/4的区域，第二个child占1/2区域，由flex属性控制。
 */


import 'package:flutter/material.dart';


class BaseColumnView extends StatelessWidget  {
  @override
  Widget build(BuildContext context) {
    // TODO: implement build
    return new Column(
      children: <Widget>[
        new Expanded(
          child: new Container(
            color: Colors.red,
            padding: EdgeInsets.all(5.0),
          ),
          flex: 1,
        ),
        new Expanded(
          child: new Container(
            color: Colors.yellow,
            padding: EdgeInsets.all(5.0),
          ),
          flex: 2,
        ),
        new Expanded(
          child: new Container(
            color: Colors.blue,
            padding: EdgeInsets.all(5.0),
          ),
          flex: 1,
        )
      ],
    );
  }
}