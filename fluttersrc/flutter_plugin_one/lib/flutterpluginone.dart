import 'dart:async';

import 'package:flutter/services.dart';

class Flutterpluginone {
  static const MethodChannel _channel =
      const MethodChannel('flutterpluginone');

  static Future<String> get platformVersion async {
    final String version = await _channel.invokeMethod('getPlatformVersion');
    return version;
  }
}
