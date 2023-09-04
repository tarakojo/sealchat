import 'package:dart_openai/dart_openai.dart';
import 'package:sealchat/logger.dart';

Future initChatGPT() async {
  final model = await OpenAI.instance.model.retrieve('gpt-3.5-turbo');
  final c = await OpenAI.instance.chat.create(
    model: "gpt-3.5-turbo",
    messages: [
      OpenAIChatCompletionChoiceMessageModel(
        content: "what's up?",
        role: OpenAIChatMessageRole.user,

      ),
    ],
  );
  logger.d(c.choices.first.message);
}
