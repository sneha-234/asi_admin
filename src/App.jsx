import { BrowserRouter, Routes, Route } from "react-router-dom";

import Login from "./pages/Login";
import Brands from "./pages/Brands";
import Dashboard from "./pages/Dashboard";
import Products from "./pages/Products";
import Careers from "./pages/Careers";
import Enquiries from "./pages/Enquiries";
import Leaders from "./pages/Leaders";
import Content from "./pages/Content";
import GlanceCards from "./pages/GlanceCards";
import BuildingCards from "./pages/BuildingCards";
import About from "./pages/About";
import Values from "./pages/Values";
import CustomerStats from "./pages/CustomerStats";
import WhyChooseUs from "./pages/WhyChooseUs";
import ContactUs from "./pages/ContactUs";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/brands" element={<Brands />} />
        <Route path="/products" element={<Products />}/>
        <Route path="/careers" element={<Careers />}/>
        <Route path="/enquiries" element={<Enquiries />}/>
        <Route path="/leaders" element={<Leaders/>}/>
        <Route path="/content" element={<Content />}/>
        <Route path="/glance-cards" element={<GlanceCards />}/>
        <Route path="/building-cards" element={<BuildingCards />}/>
        <Route path="/about-content" element={<About />}/>
        <Route path="/values" element={<Values />}/>
        <Route path="/customer-stats"element={<CustomerStats/>}/>
        <Route path="/why-choose-us" element={<WhyChooseUs />}/>
        <Route path="/contact-us" element={<ContactUs />}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;