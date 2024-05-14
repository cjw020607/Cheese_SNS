import { RouterProvider, createBrowserRouter } from "react-router-dom"
import Layout from "./components/layout"
import Home from "./routes/home"
import Profile from "./routes/profile"
import Login from "./routes/login"
import CreateAccount from "./routes/create-account"
import styled, { createGlobalStyle } from "styled-components"
import reset from "styled-reset"
import { useEffect, useState } from "react"
import LoadingScreen from "./components/loading-screen"
import { auth } from "./routes/firebase"
import ProtectedRoute from "./components/protected-route"

const router = createBrowserRouter([
  {
    path: "/",
    element: <ProtectedRoute><Layout /></ProtectedRoute>,
    children: [
      {
        path: "",
        element: <Home />,
      },
      {
        path: "profile",
        element: <Profile />,
      }
    ],
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path:"/create-account",
    element:<CreateAccount/>
  }

])

const GlobalStyles=createGlobalStyle`
${reset};//reset 스타일은 모든 웹 브라우저가 기본적으로 제공하는 스타일을 초기화하여, 브라우저 간의 일관성을 확보하고 사용자 정의 스타일을 적용하기 쉽게 만드는 데 사용됨
//모든 요소
*{
  box-sizing:border-box;
}

body{
  //노랑
  background-color:#FEC746;
  // 차콜
  color:#2c3e50; 
  font-family:system-ui,-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,Oxygen,Ubuntu,Cantarell,"Open Sans","Helvetica Neue",sans-serif;
}
`;

const Wrapper=styled.div`
height:100vh;
display:flex;
justify-content:center;
`;

function App() {
  const [isLoading,setIsLoading]=useState(true);
  const init=async()=>{
    //wait for firebase
    await auth.authStateReady();
    setIsLoading(false);
  }
  useEffect(()=>{
    init();
  },[]);
  return (
    <Wrapper>
    <GlobalStyles/>
    {isLoading?<LoadingScreen/>:<RouterProvider router={router} />}
    </Wrapper>
  )
}

export default App
