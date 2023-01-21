import "swiper/swiper.min.css";
import "./assets/boxicons-2.0.7/css/boxicons.min.css";
import "./App.scss";

import RoutePages from "./routes/RoutePages";
import AuthProvider from "./context/authContext";

function App() {
  return (
    <>
      <RoutePages />
    </>
  );
}

export default App;
