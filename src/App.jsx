import { useCallback, useState, useEffect, useRef } from 'react'
import './App.css'

function App() {
  const [length, setlength] = useState(8);
  const [numberallowed, setnumberallowed] = useState(false);
  const [charallowed, setcharallowed] = useState(false);
  const [password, setpassword] = useState("");

  //ref hook
  const passwordref = useRef(null);

  const passwordgenerator = useCallback(()=>{
    let pass = "";
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
    if (numberallowed) str += "1234567890";
    if (charallowed) str += "+-?/=@#$";
    for (let i = 1; i <= length; i++) {
      pass += str[Math.floor(Math.random() * str.length)+1];
    }
    setpassword(pass);
  }, [length, numberallowed, charallowed, setpassword])

  const copypasstoclip = useCallback(() => {
    passwordref.current?.select();
    passwordref.current?.setSelectionRange(0,length);
    window.navigator.clipboard.writeText(password);
  }, [password, length])

  useEffect(()=>{passwordgenerator()}, [length, charallowed, numberallowed, passwordgenerator]);

  return (
    <>
      <h1 className='text-center text-2xl text-white'>Password Generator</h1>
      <div className='w-full max-w-md  mx-auto shadow-md rounded-lg px-4 py-6 my-8 text-orange-500 bg-gray-800'>
        <div className='flex overflow-hidden mb-4'>
          <input type='text' value={password} className='outline-none w-full py-1 px-3 my-2 rounded-2xl'
          placeholder='password' readOnly ref={passwordref}/>
          <button className='outline-none bg-blue-700 text-white font-bold px-3 py-0.5 shrink-0 rounded transition transform hover:bg-slate-300 hover:text-blue-900 hover:font-bold' onClick={copypasstoclip}>COPY</button>
        </div>
        <div className='flex text-sm gap-x-2'>
          <div className='flex items-center gap-x-1'>
            <label htmlFor='length'>Length : {length}</label>
            <input type='range' min={6} max={20} value={length} className='cursor-pointer' onChange={(e)=>{setlength(e.target.value)}}/>
          </div>
          <div className='flex items-center gap-x-1'>
            <label htmlFor='numberallowed'>Numbers</label>
            <input type='checkbox' value={numberallowed} className='cursor-pointer' onChange={()=>{setnumberallowed((prev)=>!prev)}}/>
          </div>
          <div className='flex items-center gap-x-1'>
            <label htmlFor='charallowed'>Characters</label>
            <input type='checkbox' value={charallowed} className='cursor-pointer' onChange={()=>{setcharallowed((prev)=>!prev)}}/>
          </div>
        </div>
      </div>
    </>
  )
}

export default App
