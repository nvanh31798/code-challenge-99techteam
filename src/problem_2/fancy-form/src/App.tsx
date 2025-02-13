import { ToastContainer } from "react-toastify";
import { CryptoSwappingForm } from "./component/CryptoSwappingForm";

function App() {
  return (
    <div className="p-10">
      <CryptoSwappingForm />
      <ToastContainer autoClose={5000} draggable={false} />
    </div>
  );
}

export default App;
