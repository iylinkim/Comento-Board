import "./app.css";
import Home from "./routes/Home";

function App({ api }) {
  return (
    <>
      <Home api={api} />
    </>
  );
}

export default App;
