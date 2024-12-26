import { useEffect } from "react";
import DashboardLayout from "./components/main-layout/DashboardLayout";
import Footer from "./components/main-layout/Footer";
import Home from "./components/main-layout/Home";
import Navbar from "./components/main-layout/Navbar";
import Team from "./components/main-layout/Team";
import Aos from "aos";
import "aos/dist/aos.css";

function App() {
	useEffect(() => {
		Aos.init();
		Aos.refresh();
	}, []);

	return (
		<>
			<Navbar />
			<Home />
			<Team />
			<DashboardLayout />
			<Footer />
		</>
	);
}

export default App;

