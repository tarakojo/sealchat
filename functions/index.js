
const {onRequest} = require("firebase-functions/v2/https");
const functions = require("firebase-functions");

const admin = require('firebase-admin')
admin.initializeApp(functions.config().firebase)

//環境変数の読み込み
require("dotenv").config();
const {OPENAI_API_KEY} = process.env;



// データベースの参照を作成
var fireStore = admin.firestore()

exports.helloWorld = functions.https.onRequest((request, response) => {
  // 動作確認のため適当なデータをデータベースに保存
  var citiesRef = fireStore.collection('cities');
  citiesRef.doc('SF').set({
    name: 'San Francisco', state: 'CA', country: 'USA',
    capital: false, population: 860000 })

  var cityRef = fireStore.collection('cities').doc('SF')
  cityRef.get()
  .then(doc => {
    if (!doc.exists) {
      response.send('No such document!')
    } else {
      response.send(doc.data())
      }
    })
    .catch(err => {
      response.send('not found')
    })
})