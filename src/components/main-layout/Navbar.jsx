import { useState } from "react";

const Navbar = () => {
	const [selected, setSelected] = useState("home");

	return (
		<nav className="bg-white border-b fixed z-50 w-full">
			<div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8 ">
				<div className="flex items-center justify-between h-16">
					<h1 className="text-lg font-semibold">NYC</h1>

					<div className="flex items-center gap-8 text-base">
						<a
							href="#home"
							className={selected === "home" ? "font-bold" : ""}
							onClick={() => setSelected("home")}
						>
							Home
						</a>
						<a
							href="#team"
							className={selected === "team" ? "font-bold" : ""}
							onClick={() => setSelected("team")}
						>
							Team
						</a>
						<a
							href="#dashboard"
							className={selected === "dashboard" ? "font-bold" : ""}
							onClick={() => setSelected("dashboard")}
						>
							Dashboard
						</a>
					</div>
				</div>
			</div>
		</nav>
	);
};

export default Navbar;
