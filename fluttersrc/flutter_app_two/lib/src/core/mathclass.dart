


import 'dart:math';

import 'package:flutter/cupertino.dart';

class MathClass {


   static  Color getRandomColor() {
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