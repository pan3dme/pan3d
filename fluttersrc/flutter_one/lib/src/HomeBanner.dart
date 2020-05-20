import 'package:flutter/material.dart';
import 'package:flutter_swiper/flutter_swiper.dart';

class HomeBanner extends StatelessWidget {




  @override
  Widget build(BuildContext context) {

    return Container(
      width: 300,
      height: 130.0,
      child: Swiper(
        itemBuilder: _swiperBuilder,
        itemCount:2,
        viewportFraction: 0.9,
        scale: 0.9,
        loop: true,
        scrollDirection: Axis.horizontal,
        autoplay: true,
        onTap: (index) => print('点击了第$index个'),
      ),

    );
  }

  Widget _swiperBuilder(BuildContext context, int index) {
    return ( Image.asset('lib/images/dt_xihuan_hong.png',
      height: 200.0,
      width: 200.0,
      fit: BoxFit.none ,));
  }


}
