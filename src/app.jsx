import "./app.css";
import AppRouter from "./components/Router";
import Home from "./routes/Home";

function App({ api }) {
  return <AppRouter api={api} />;
}

export default App;
