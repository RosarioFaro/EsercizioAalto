import "./App.css";
import CustomNavbar from "./components/CustomNavbar";
import MainContent from "./components/MainContent";
import Footer from "./components/Footer";
import ScrollToTopButton from "./components/ScrollToTopButton";

function App() {
  return (
    <div className="app-container d-flex flex-column min-vh-100">
      <CustomNavbar />
      <MainContent />
      <Footer />
      <ScrollToTopButton />
    </div>
  );
}

export default App;
