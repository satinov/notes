import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import PrimaryTemplate from "./components/PrimaryTemplate";
import store from "./store";

function App() {
  return (
    <BrowserRouter>
      <Provider store={store}>
        <PrimaryTemplate />
      </Provider>
    </BrowserRouter>
  );
}

export default App;
