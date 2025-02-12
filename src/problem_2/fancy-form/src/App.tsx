import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";

function App() {
  const [count, setCount] = useState(0);

  return (
    <form>
      <h5>Swap</h5>
      <label>Amount to send</label>
      <input/>

      <label>Amount to receive</label>
      <input/>

      <button>CONFIRM SWAP</button>
    </form>
  );
}

export default App;
