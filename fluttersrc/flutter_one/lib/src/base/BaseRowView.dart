/**
 * Row
 *  使用Expanded控件，将水平方向一行的宽度分成四个等分，第一、三个child占1/4的区域，第二个child占1/2区域，由flex属性控制。
 */

import 'package:flutter/material.dart';

class BaseRowView extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    // TODO: implement build
    return new Row(
      children: <Widget>[
        new Expanded(
          flex: 1,
          child: new Container(
            color: Colors.red,
            padding: EdgeInsets.all(5.0),
          ),
        ),
        new Expanded(
          flex: 2,
          child: new Container(
            color: Colors.yellow,
            padding: EdgeInsets.all(5.0),
          ) ,
        ),
        new Expanded(
          flex: 1,
          child: new Container(
            color: Colors.blue,
            padding: EdgeInsets.all(5.0),
          ),
        )
      ],
    );
  }
}