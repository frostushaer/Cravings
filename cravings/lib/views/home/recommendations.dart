import 'package:cravings/common/app_style.dart';
import 'package:cravings/common/background_container.dart';
import 'package:cravings/common/reusable_text.dart';
import 'package:cravings/constants/constants.dart';
import 'package:cravings/constants/uidata.dart';
import 'package:cravings/views/home/widgets/food_tile.dart';
import 'package:flutter/material.dart';
import 'package:flutter_screenutil/flutter_screenutil.dart';

class Recommendations extends StatelessWidget {
  const Recommendations({super.key});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: kSecondary,

      appBar: AppBar(
        elevation: 0,
        backgroundColor: kSecondary,
        title: ReusableText(text: "Recommmendations", style: appStyle(13, kLightWhite, FontWeight.w600)),
      ),

      body: BackgroundContainer(
        color: Colors.white,

        child: Padding(
          padding: EdgeInsets.all(12.h),
          child: ListView(
          children: List.generate(foods.length, (i) {
            var food = foods[i];
            return FoodTile(food: food);
          }),
                ),
        ), 
        
      ),
    );
  }
}