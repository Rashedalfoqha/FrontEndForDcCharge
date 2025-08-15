import React, { lazy } from "react";
import { Routes, Route } from "react-router-dom";
import { ThemeProvider } from "./componetes/context/ThemeProvider";

const Main = lazy(() => import("./componetes/mainPage/Main"));
const About = lazy(() => import("./componetes/about/About"));
const Consulting = lazy(() =>
  import("./componetes/expConsultingServicesForChargingStations/Consulting")
);
const ProductsServices = lazy(() => import("./componetes/products/Product"));
const Partner = lazy(() => import("./componetes/Partner/Partner"));
const AcCharge = lazy(() => import("./componetes/acCharge/AcCharge"));
const DcCharge = lazy(() => import("./componetes/dcCharge/DcCharge"));
const ProfessionalServices = lazy(() =>
  import("./componetes/professionalServices/ProfessionalServices")
);
const ChargersRepairingServices = lazy(() =>
  import("./componetes/chargersRepairingServices/ChargersRepairingServices")
);
const Nesw = lazy(() => import("./componetes/news/Nesw"));
const ContactUS = lazy(() => import("./componetes/contactUs/ContactUS"));
const NewsDetailsPage = lazy(() => import("./componetes/news/NewsDetailsPage"));
const EVLandingPage = lazy(() =>
  import("./componetes/landingPage/LandingPage")
);

function App() {
  return (
    <ThemeProvider>
      <Routes>
        <Route path="/landing" element={<EVLandingPage />} />
        <Route path="/" element={<Main />} />
        <Route path="/about" element={<About />} />
        <Route
          path="/exp-consulting-services-for-charging-stations"
          element={<Consulting />}
        />
        <Route path="/products-and-services" element={<ProductsServices />} />
        <Route path="/partners-customers" element={<Partner />} />
        <Route path="/ac-chargers" element={<AcCharge />} />
        <Route path="/dc-chargers" element={<DcCharge />} />
        <Route
          path="/professional-services"
          element={<ProfessionalServices />}
        />
        <Route
          path="/chargers-repairing-services"
          element={<ChargersRepairingServices />}
        />
        <Route path="/news" element={<Nesw />} />
        <Route path="/contact" element={<ContactUS />} />
        <Route path="/post/:id" element={<NewsDetailsPage />} />
      </Routes>
    </ThemeProvider>
  );
}

export default App;
