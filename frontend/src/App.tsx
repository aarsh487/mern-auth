import { BrowserRouter, Route, Router, Routes } from "react-router-dom";
import { Signup } from "./Pages/Signup";
import { Login } from "./Pages/Login";
import { Homepage } from "./Pages/Homepage";
import { EmailVerifcation } from "./Pages/EmailVerifcation";


export default function App() {
  return (
    <div className="w-full h-screen bg-gradient-to-r from-orange-100 via-pink-100 to-rose-200 flex justify-center items-center">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={ <Homepage /> } />
          <Route path="/signup" element={ <Signup />} />
          <Route path="/login" element={ <Login />} />
          <Route path="/verify-email" element={ <EmailVerifcation />} />
        </Routes>
      </BrowserRouter>
    </div>
  )
}
