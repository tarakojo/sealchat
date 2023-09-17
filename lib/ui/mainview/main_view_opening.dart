import 'dart:math';

import 'package:awesome_dialog/awesome_dialog.dart';
import 'package:firebase_ui_auth/firebase_ui_auth.dart';
import 'package:flutter/foundation.dart';
import 'package:flutter/material.dart';
import 'package:sealchat/logger.dart';

enum _OpeningState {
  waitingForFirstTap,
  narratorGreeting,
  waitingForWakeUpTap,
  sealWakesUp,
  sealGreeting,
  waitingForNameInput,
  sealRespondingToName,
  waitingForPetting,
  sealRespondingToPetting,
  narratorIntroducingSeal,
}

//オープニング
class MainViewOpening extends StatefulWidget {
  const MainViewOpening({super.key, required this.onFinished});

  final void Function() onFinished;

  @override
  State<MainViewOpening> createState() => _MainViewOpeningState();
}

class _MainViewOpeningState extends State<MainViewOpening> {
  late _OpeningState state = _OpeningState.waitingForFirstTap;
  late DateTime stateStartTime = DateTime.now();
  late Widget Function() builder = waitingForFirstTap;

  void reset() {
    changeOpeningState(_OpeningState.waitingForFirstTap);
    setBuilder(waitingForFirstTap);
  }

  //stateを変更
  void changeOpeningState(newState) {
    state = newState;
    stateStartTime = DateTime.now();
    logger.d("opening state: $state");
  }

  //builderを変更して再描画
  void setBuilder(builder) {
    this.builder = builder;
    setState(() {});
  }

  @override
  void initState() {
    super.initState();
    //stateの初期化
    changeOpeningState(_OpeningState.waitingForFirstTap);
  }

  @override
  Widget build(BuildContext context) {
    return builder();
  }

  //stateがcurrentStateのときに、stateをnextStateに遷移する。
  //nextBuilderが指定されている場合は、nextBuilderをbuilderに設定する。
  //そうでない場合、nextStepを実行する。
  void Function() transitionToNextState(
      {required _OpeningState currentState,
      required _OpeningState nextState,
      Widget Function()? nextBuilder,
      void Function()? nextStep,
      int? delay}) {
    return () {
      if (state != currentState) return;
      changeOpeningState(nextState);
      delayed(delay ?? 0, () {
        if (nextBuilder != null)
          setBuilder(nextBuilder);
        else
          nextStep!();
      });
    };
  }

  //tickからdミリ秒後にfを実行する
  void delayed(int d, Function f) {
    final elapsedTimeMS =
        DateTime.now().difference(stateStartTime).inMilliseconds;
    final delayMS = max(0, d - elapsedTimeMS);
    Future.delayed(Duration(milliseconds: delayMS), () {
      f();
    });
  }

  Widget waitingForFirstTap() {
    return GestureDetector(
        onTap: transitionToNextState(
            currentState: _OpeningState.waitingForFirstTap,
            nextState: _OpeningState.narratorGreeting,
            nextStep: narratorGreeting,
            delay: 1000));
  }

  void narratorGreeting() {
    AwesomeDialog(
        context: context,
        dialogType: DialogType.info,
        title: 'narrator greeting',
        btnOkOnPress: transitionToNextState(
            currentState: _OpeningState.narratorGreeting,
            nextState: _OpeningState.waitingForWakeUpTap,
            nextBuilder: waitingForWakeUpTap,
            delay: 1000))
      ..show();
  }

  Widget waitingForWakeUpTap() {
    return GestureDetector(
        onTap: transitionToNextState(
            currentState: _OpeningState.waitingForWakeUpTap,
            nextState: _OpeningState.sealWakesUp,
            nextStep: sealWakesUp,
            delay: 1000));
  }

  void sealWakesUp() {
    AwesomeDialog(
      context: context,
      dialogType: DialogType.info,
      title: 'seal wakes up',
      btnOkOnPress: transitionToNextState(
          currentState: _OpeningState.sealWakesUp,
          nextState: _OpeningState.sealGreeting,
          nextStep: sealGreeting,
          delay: 1000),
    )..show();
  }

  Widget sealGreeting() {
    AwesomeDialog(
      context: context,
      dialogType: DialogType.info,
      title: 'seal greeting',
      btnOkOnPress: transitionToNextState(
          currentState: _OpeningState.sealGreeting,
          nextState: _OpeningState.waitingForNameInput,
          nextStep: waitingForNameInput,
          delay: 1000),
    )..show();
    return Container();
  }

  Widget waitingForNameInput() {
    AwesomeDialog(
      context: context,
      dialogType: DialogType.info,
      title: 'waiting for name input',
      btnOkOnPress: transitionToNextState(
          currentState: _OpeningState.waitingForNameInput,
          nextState: _OpeningState.sealRespondingToName,
          nextStep: sealRespondingToName,
          delay: 1000),
    )..show();
    return Container();
  }

  Widget sealRespondingToName() {
    AwesomeDialog(
      context: context,
      dialogType: DialogType.info,
      title: 'seal responding to name',
      btnOkOnPress: transitionToNextState(
          currentState: _OpeningState.sealRespondingToName,
          nextState: _OpeningState.waitingForPetting,
          nextBuilder: waitingForPetting,
          delay: 1000),
    )..show();
    return Container();
  }

  Widget waitingForPetting() {
    return GestureDetector(
      onTap: transitionToNextState(
          currentState: _OpeningState.waitingForPetting,
          nextState: _OpeningState.sealRespondingToPetting,
          nextStep: sealRespondingToPetting,
          delay: 1000),
    );
  }

  void sealRespondingToPetting() {
    AwesomeDialog(
      context: context,
      dialogType: DialogType.info,
      title: 'seal responding to petting',
      btnOkOnPress: transitionToNextState(
          currentState: _OpeningState.sealRespondingToPetting,
          nextState: _OpeningState.narratorIntroducingSeal,
          nextStep: narratorIntroducingSeal,
          delay: 1000),
    )..show();
  }

  void narratorIntroducingSeal() {
    AwesomeDialog(
        context: context,
        dialogType: DialogType.info,
        title: 'narrator introducing seal',
        btnOkOnPress: widget.onFinished)
      ..show();
  }
}
