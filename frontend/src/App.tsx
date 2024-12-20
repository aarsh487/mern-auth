import { BrowserRouter, Route, Router, Routes } from "react-router-dom";
import { Signup } from "./Pages/Signup";
import { Login } from "./Pages/Login";
import { Homepage } from "./Pages/Homepage";
import { EmailVerifcation } from "./Pages/EmailVerifcation";
import { ForgotPassword } from "./Pages/ForgotPassword";
import { ResetPassword } from "./Pages/ResetPassword";
import { useStore } from "./store/useStore";


export default function App() {

  const { isAuthenticated, user } = useStore();

  return (
    <div className="w-full h-screen bg-gradient-to-r from-orange-100 via-pink-100 to-rose-200 flex justify-center items-center">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={ isAuthenticated ? <Homepage /> : <Login /> } />
          <Route path="/signup" element={ !isAuthenticated ? <Signup /> : <Homepage />} />
          <Route path="/login" element={ !isAuthenticated ? <Login /> : <Homepage /> } />
          <Route path="/verify-email" element={ !user?.isVerified ? <EmailVerifcation /> : <Homepage />} />
          <Route path="/forgot-password" element={ <ForgotPassword />} />
          <Route path="/reset-password/:token" element={ <ResetPassword />} />
        </Routes>
      </BrowserRouter>
    </div>
  )
}
