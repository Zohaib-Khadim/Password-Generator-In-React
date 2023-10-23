import "./App.css";
import { useState,useEffect,useCallback,useRef } from "react";

function App() {
  const [length, setLength] = useState(8);
  const [numberAllowed, setNumberAllowed] = useState(false);
  const [charAllowed, setCharAllowed] = useState(false);
  const [password, setPassword] = useState("");

  const passwordGenerator = useCallback(() => {
    let pass = "";
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
    if (numberAllowed) str += "0123456789";
    if (charAllowed) str += "`!@#$%^&*()=-_[]{}";
    for (let i = 1; i <= length; i++) {
      let char = Math.floor(Math.random() * str.length + 1);
      pass += str.charAt(char);
    }
    setPassword(pass);
  }, [length, numberAllowed, charAllowed, setPassword]);

  const passwordRef=useRef(null);

  useEffect(()=>{
    passwordGenerator();
  },[length,numberAllowed, charAllowed,passwordGenerator])

    const copyPasswordToClipboard=useCallback(()=>{ 
      passwordRef.current?.select();
      passwordRef.current?.setSelectionRange(0,3);
      window.navigator.clipboard.writeText(password);
    },[password])
  return (
    <>
    
      <div className=" w-full max-w-md mx-auto  shadow-md rounded-lg px-4 my-20 text-orange-700 bg-gray-700 ">
      <h1 className="text-white text-center py-3">Password Generator</h1>
        <div className="flex shadow rounded-lg overflow-hidden mb-4">
          <input
            type="text"
            value={password}
            placeholder="Password"
            name=""
            id="InputPassword" 
            className="outline-none py-1 px-3 w-full"
            readOnly
            ref={passwordRef}
          />
          <button className="outline-none py-0.5 px-3 bg-blue-700 text-white shrink-0 hover:bg-green-700" onClick={copyPasswordToClipboard}>copy</button>
        </div>
        <div className="flex text-sm gap-x-2 pb-3 pt-3">
          <div className="flex item-center gap-x-1">
            <input type="range" min={6} max={100}  value={length} className="cursor-pointer" name="" onChange={(e)=>setLength(e.target.value)} id="InputValue" />
            <label >Length:{length}</label>
          </div>
          <div className="flex item-center gap-x-1">
            <input className="mt-1" type="checkbox" defaultChecked={numberAllowed} name="" id="charInput" onClick={()=>{
              setNumberAllowed((prev)=>!prev);
            }} />
            <label>Numbers</label>
          </div>
          <div className="flex item-center gap-x-1">
            <input className="mt-1" type="checkbox" defaultChecked={charAllowed} name="" id="characterInput" onClick={()=>{
              setCharAllowed((prev)=>!prev);
            }} />
             <label>Characters</label>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
