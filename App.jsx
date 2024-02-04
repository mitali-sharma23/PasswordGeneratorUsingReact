import { useState,useCallback,useEffect ,useRef} from 'react'
//useCallback is resonsible for optimization,memoziation when dependencies changed
//useEffect is resonsible for run a function when dependencies changed
/*UseEffect is re-run if any of the dependencies change. 
UseCallback, on the other hand, memoizes a function so that it only gets re-created when its dependencies change.*/ 
function App() {
  const [length, setLength] = useState(8);
  const [numberallow, setNumberallow] = useState(false);
  const [charallow, setCharallow] =  useState(false);
  const [password , setPassword] = useState("");
  const passwordref = useRef(null);
    const PasswordGenerator = useCallback(()=>{
        let pass= "";
        let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
        if (numberallow) str += "0123456789";
        if (charallow) str += "@#$%^*~";
        for(let i=1;i<=length;i++){
          let char = Math.floor(Math.random()*str.length+1);
          pass += str.charAt(char);
        }
        setPassword(pass);
    },[length, numberallow, charallow]);
    const copypasswordtoclipboard = useCallback(()=>{
      passwordref.current?.select();
      window.navigator.clipboard.writeText(password);
    },[password])
    useEffect(()=>{
      PasswordGenerator()
    },[length,numberallow,charallow]);
  return (
     <div className="fixed flex flex-col top-12 left-20 w-full max-w-lg mx-25 rounded px-3 py-2 bg-gray-500 text-orange-300 justify-center">
      <h1 className='text-white text-2xl text-center'> PASSWORD GENERATOR</h1>
      <br />
      <div className='flex bg-white rounded-lg max-w-lg inset-x-20 px-2 mx-20' >
        <input 
        type="text"
        value={password}
        className='outline-none w-full px-2 py-2'
        placeholder="Password"
        readOnly
        ref={passwordref}
        />
        <button 
        className=' relative outline-none rounded-lg cursor-pointer left-6  max-w-md bg-blue-700 text-white px-2 py-1.5'
        onClick={copypasswordtoclipboard}>
        Copy
      </button>
      </div>
      <br />
      <div className='w-full'>
        <input 
        type="range"
        min={8}
        max={20}
        value={length}
        className='cursor-pointer' 
        onChange={(e)=>setLength(e.target.value)}/>
        <label>  Length:({length})</label>
        <input 
        type="checkbox"
        defaultChecked={numberallow}
        className='mx-3'
        onChange={()=>setNumberallow((prev)=>!prev)} />
        <label>Numbers</label>
        <input 
        type="checkbox"
        defaultChecked={charallow}
        className='mx-3'
        onChange={()=>setCharallow((prev)=>!prev)} />
        <label>Characters</label>
      </div>
     </div>
      
  )
}

export default App
