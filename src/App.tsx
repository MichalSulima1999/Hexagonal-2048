import "./App.css";
import Footer from "./components/footer/Footer";
import Pages from "./pages/Pages";
import Header from "./components/header/Header";

function App() {
  return (
    <div className="App">
      <Header />
      <div className="content">
        <Pages />
      </div>

      <Footer />
    </div>
  );
}

export default App;
