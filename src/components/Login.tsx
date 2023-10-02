import { signInWithPopup } from "firebase/auth";
  import React from "react";
  //import { useNavigate } from "react-router-dom";
  import { auth, googleAuthProvider } from "../firebase";

  const Login = ({ setIsAuth }) => {
    // ログインしたらホームに飛ばす
    //const navigate = useNavigate();
    const loginWithGoogle = () => {
      // Googleでログイン
      signInWithPopup(auth, googleAuthProvider).then((result) => {
        // ログインするとコンソールにresultが表示される
         console.log(result);

        // ローカルストレージに状態を保持
//        localStorage.setItem("isAuth", true);
        setIsAuth(true); //ログインしたらtrueにする

        // homeにとばす
        //navigate("/");
      });
    };
    return (
      <div>
        <p style={{color:"white"}}>ログインして始める</p>
        <button style={{color:"white"}} onClick={loginWithGoogle}>Googleでログイン</button>
      </div>
    );
  };

  export default Login;