import { useState } from 'react'
import axios from 'axios'
import { backendUrl } from '../App';
import { toast } from 'react-toastify';

const Login = ({tokenHandle}) => {
  const [currentState, setCurrentState] = useState("Login")
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passKey, setPassKey] = useState('');

  const onSubmitHandler = async (e) => {
    try {
      e.preventDefault();
      const response = await axios.post(backendUrl+"/admin/login-admin", { email, password });
      if(response.data.success === true) {
        tokenHandle(response.data.data.accessToken);
        toast.success("Admin Loggedin Success");
      } else {
        toast.error('Invalid email or password');
      }
    } catch (error) {
      console.log(error);
      toast.error('Invalid email or password');
    }
  };
  return (
    <form onSubmit={onSubmitHandler} className='flex flex-col items-center w-[90%] max-w-96 m-auto mt-14 py-8 px-8 rounded-lg shadow-xl gap-4 text-gray-800'>
      <div className='inline-flex items-center gap-2 mt-10 mb-3'>
        <p className='prata-regular text-3xl '>Admin</p>
        <p className='prata-regular text-3xl '>{currentState}</p>
        <hr className='border-none h-1.5 w-8 bg-gray-800' />
      </div>
      {
        currentState === 'Sign Up' ? (
          <>
            <input type="text" className='w-full px-3 py-2 border border-gray-800' placeholder='Username' required />
            <input type="email" className='w-full px-3 py-2 border border-gray-800' placeholder='Email' required />
            <input type="password" className='w-full px-3 py-2 border border-gray-800' placeholder='Create Password' required />
            <input type="passKey" className='w-full px-3 py-2 border border-gray-800' placeholder='Enter Special Passkey' required />
            <div className='w-full flex justify-between text-base mt-[-8px]'>
              <p onClick={()=>{setCurrentState("Login")}} className='cursor-pointer'>Already a User? Login here</p>
            </div>
          </>
        ) : (
          <>
            <input type="text" onChange={(e) => setEmail(e.target.value)} value={email} className='w-full px-3 py-2 border border-gray-800' placeholder='Username' required />
            <input type="password" onChange={(e) => setPassword(e.target.value)} value={password} className='w-full px-3 py-2 border border-gray-800' placeholder='Password' required />
            <div className='w-full flex justify-between text-base mt-[-8px]'>
              <p className='cursor-pointer'>Forget Password?</p>
              <p onClick={()=>{setCurrentState("Sign Up")}} className='cursor-pointer'>Create account</p>
            </div>
          </>
        )
      }
      <button className='font-light bg-black text-white px-8 py-2 mt-4 cursor-pointer'>{currentState === "Login" ? "Sign in" : "Sign Up"}</button>
    </form>
  )
}

export default Login
