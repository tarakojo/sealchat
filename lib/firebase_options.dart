// File generated by FlutterFire CLI.
// ignore_for_file: lines_longer_than_80_chars, avoid_classes_with_only_static_members
import 'package:firebase_core/firebase_core.dart' show FirebaseOptions;
import 'package:flutter/foundation.dart'
    show defaultTargetPlatform, kIsWeb, TargetPlatform;

/// Default [FirebaseOptions] for use with your Firebase apps.
///
/// Example:
/// ```dart
/// import 'firebase_options.dart';
/// // ...
/// await Firebase.initializeApp(
///   options: DefaultFirebaseOptions.currentPlatform,
/// );
/// ```
class DefaultFirebaseOptions {
  static FirebaseOptions get currentPlatform {
    if (kIsWeb) {
      return web;
    }
    switch (defaultTargetPlatform) {
      case TargetPlatform.android:
        return android;
      case TargetPlatform.iOS:
        return ios;
      case TargetPlatform.macOS:
        return macos;
      case TargetPlatform.windows:
        throw UnsupportedError(
          'DefaultFirebaseOptions have not been configured for windows - '
          'you can reconfigure this by running the FlutterFire CLI again.',
        );
      case TargetPlatform.linux:
        throw UnsupportedError(
          'DefaultFirebaseOptions have not been configured for linux - '
          'you can reconfigure this by running the FlutterFire CLI again.',
        );
      default:
        throw UnsupportedError(
          'DefaultFirebaseOptions are not supported for this platform.',
        );
    }
  }

  static const FirebaseOptions web = FirebaseOptions(
    apiKey: 'AIzaSyBEB4ZgprGR0klpzm7Pbok9SuN9pa4tNmo',
    appId: '1:26446727063:web:2ac6f27fa3d39ea13ea6d2',
    messagingSenderId: '26446727063',
    projectId: 'sealchat',
    authDomain: 'sealchat.firebaseapp.com',
    storageBucket: 'sealchat.appspot.com',
    measurementId: 'G-3T204R642Y',
  );

  static const FirebaseOptions android = FirebaseOptions(
    apiKey: 'AIzaSyC-RUj2E2ue-LftT7ul-i79dhQiJhpfwNc',
    appId: '1:26446727063:android:dc1c33c4a09a91213ea6d2',
    messagingSenderId: '26446727063',
    projectId: 'sealchat',
    storageBucket: 'sealchat.appspot.com',
  );

  static const FirebaseOptions ios = FirebaseOptions(
    apiKey: 'AIzaSyD0VP7AaBy59JUgsVeOTx9fuJt437zAp5A',
    appId: '1:26446727063:ios:7c249b0db6a332dc3ea6d2',
    messagingSenderId: '26446727063',
    projectId: 'sealchat',
    storageBucket: 'sealchat.appspot.com',
    iosClientId: '26446727063-cr0u52a46ses41l64qbh4fdksmro620l.apps.googleusercontent.com',
    iosBundleId: 'com.example.sealchat',
  );

  static const FirebaseOptions macos = FirebaseOptions(
    apiKey: 'AIzaSyD0VP7AaBy59JUgsVeOTx9fuJt437zAp5A',
    appId: '1:26446727063:ios:b633e525dbc3498b3ea6d2',
    messagingSenderId: '26446727063',
    projectId: 'sealchat',
    storageBucket: 'sealchat.appspot.com',
    iosClientId: '26446727063-ac6hc9flgbpfhjl6rd6usl9tpishh9fc.apps.googleusercontent.com',
    iosBundleId: 'com.example.sealchat.RunnerTests',
  );
}