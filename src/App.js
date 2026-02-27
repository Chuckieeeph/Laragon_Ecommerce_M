import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Categories from "./components/Categories";
import Products from "./components/Products";
import Promo from "./components/Promo";
import Footer from "./components/Footer";
import "./App.css";

function App() {
  return (
    <>
      <Navbar />
      <Hero />
      <Categories />
      <Products />
      <Promo />
      <Footer />
    </>
  );
}

export default App;