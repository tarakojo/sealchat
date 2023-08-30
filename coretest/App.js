import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';

let aaaax = 1;
eval("aaaax = 2; console.log(12345);");
console.log(aaaax);
fetch("https://cubism.live2d.com/sdk-web/cubismcore/live2dcubismcore.min.js").then((r) => {
  r.text().then((s) => eval(s + " \naaaax = Live2DCubismCore;\nconsole.log(aaaax)")).then(()=>{
    console.log(aaaax);
  })
});



export default function App() {
  // XMLHttpRequestオブジェクトを作成
var xhr = new XMLHttpRequest();

// HTTP GETリクエストを作成
xhr.open("GET", "https://jsonplaceholder.typicode.com/posts/1", true);

// リクエストが完了したときのコールバックを設定
xhr.onreadystatechange = function () {
  // readyStateが4で、HTTPステータスコードが200の場合はリクエストが成功
  if (xhr.readyState === 4 && xhr.status === 200) {
    // レスポンステキストをコンソールに表示
    console.log(xhr.responseText);
  } else if (xhr.readyState === 4 && xhr.status !== 200) {
    // リクエストが失敗した場合の処理
    console.error("リクエストが失敗しました。HTTPステータスコード: " + xhr.status);
  }
};

// リクエストを送信
xhr.send();

  return (
    <View style={styles.container}>
      <Text>Open up App.js to start working on your app!</Text>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
