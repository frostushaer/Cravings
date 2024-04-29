// ignore_for_file: prefer_final_fields

import 'package:get/get.dart';

class CategoryController extends GetxController {
  // to make it observable we use .obs
  RxString _category = ''.obs;

  String get categoryValue => _category.value;

  // ontap => string value
  set updateCategory(String value) {
    _category.value = value;
  }

  RxString _title = ''.obs;

  String get titleValue => _title.value;

  // ontap => string value
  set updateTitle(String value) {
    _title.value = value;
  }
}