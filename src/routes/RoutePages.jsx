import { Route, Routes } from "react-router-dom";
import Home from "../pages/Home";
import Catalog from "../pages/Catalog";
import Detail from "../pages//details/Detail";
import Login from "../pages/Login";
import SignUp from "../pages/SignUp";
import RequireAuth from "./RequireAuth";

const RoutePages = () => {
  return (
    <Routes>
      <Route path="/" element={<RequireAuth>
          <Home/>
        </RequireAuth>}/>
     <Route path="login" element={<Login/>}/>
      <Route path="sign-up" element={<SignUp/>}/>
      <Route path=":catalog" element={<Catalog/>}/>
      <Route path=":catalog/:id" element={<Detail/>}/>
      <Route path=":catalog/search/:keyword" element={<Catalog/>}/>
    </Routes>
  )
}

export default RoutePages