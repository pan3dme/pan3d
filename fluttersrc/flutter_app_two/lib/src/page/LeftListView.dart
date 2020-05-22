
import 'package:flutter/material.dart';
class ListTabelView extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
//    debugPaintSizeEnabled=true;

    // TODO: implement build
    return Scaffold(

        body: ListView.builder(
          itemCount: 4,
          itemBuilder: (context, idx) {
            print(idx);
            return Card(
                child: Container(
                  child: Text('支付宝$idx' ,textAlign:TextAlign.center),
                  height: 35,
                ));
          },
        ));
  }
}