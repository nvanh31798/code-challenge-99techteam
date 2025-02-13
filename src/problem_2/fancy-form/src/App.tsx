import { ToastContainer } from "react-toastify";
import { CryptoSwappingForm } from "./component/CryptoSwappingForm";

const TOAST_AUTO_CLOSE = 5000;

const App = () => (
  <div className="p-10">
    <CryptoSwappingForm />
    <ToastContainer autoClose={TOAST_AUTO_CLOSE} draggable={false} />
  </div>
);

export default App;
