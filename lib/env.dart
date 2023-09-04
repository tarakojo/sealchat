/*
ルートディレクトリに.envを用意し、
中身に以下を記述すること。

OPENAI_API_KEY='<open aiのキー>'

*/

import 'package:flutter_dotenv/flutter_dotenv.dart';
import 'package:sealchat/logger.dart';

Future initEnv() async {
  await dotenv.load(fileName: '.env');
  logger.d(dotenv.env);

  check(String key) {
    if (!dotenv.env.containsKey(key)) {
      logger.f('$key is not registered in ".env"');
      throw Error();
    }
  }

  //必要な値がすべて設定されているかチェック
  check('OPENAI_API_KEY');

  logger.d('.env is loaded');
}
