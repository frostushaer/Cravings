import 'package:cravings/common/app_style.dart';
import 'package:cravings/common/background_container.dart';
import 'package:cravings/common/reusable_text.dart';
import 'package:cravings/constants/constants.dart';
import 'package:cravings/constants/uidata.dart';
import 'package:flutter/material.dart';
import 'package:flutter_screenutil/flutter_screenutil.dart';

import 'widgets/category_tile.dart';

class AllCategories extends StatelessWidget {
  const AllCategories({super.key});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        elevation: 0,
        backgroundColor: kOffWhite,
        title: ReusableText(text: 'All Categories', style: appStyle(12, kGray, FontWeight.w600)),
      ),

      body: BackgroundContainer(
        color: Colors.white,
        child: Container(
          padding: EdgeInsets.only(left: 12.w, top: 10.h),
          height: height,
        
          child: ListView(
            scrollDirection: Axis.vertical,
            children: List.generate(categories.length, (i) {
              var category = categories[i];
        
              return CategoryTile(category: category);
            }),
          ),
        ),
      ),
    );
  }
}
