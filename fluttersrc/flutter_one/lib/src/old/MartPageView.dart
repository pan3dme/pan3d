
import 'package:flutter/material.dart';



class MartPageView extends StatelessWidget {
  final String infoTabText;
  MartPageView(this.infoTabText);
  @override
  Widget build(BuildContext context) {
    // TODO: implement build
    return Scaffold(

        body: Row(
          children: <Widget>[
            Container(
              color: Colors.black,
              width: 100.0,
              height: 100.0,
            ),
            Container(
              child: Text('$infoTabText'),
            )
          ],
        ));
  }
}
