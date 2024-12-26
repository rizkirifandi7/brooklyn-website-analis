import { useCallback, useEffect, useState } from "react";
import { DataTableDemo } from "../DataTable";
import { BorderBeam } from "../ui/border-beam";
import { Button } from "../ui/button";

const Home = () => {
	const [data, setData] = useState([]);

	const fetchData = useCallback(async () => {
		try {
			const response = await fetch("/data_nyc.json");
			const results = await response.json();
			const brooklynData = results.filter(
				(item) => item.borough === "Brooklyn"
			);
			const limitedResults = brooklynData.slice(0, 10);
			setData(limitedResults);
		} catch (error) {
			console.error(error);
		}
	}, []);

	useEffect(() => {
		fetchData();
	}, [fetchData]);

	return (
		<section id="home">
			<div className="relative bg-[url('bg.png')] bg-cover bg-center min-h-screen w-full">
				<div className="absolute inset-0 bg-black opacity-50"></div>
				<div className="relative mx-auto max-w-7xl px-2 sm:px-6 lg:px-8 pt-40">
					<div className="flex flex-col justify-center items-center">
						<h1 className="text-6xl font-semibold text-center text-white">
							New York City Collisions
						</h1>
						<p className="text-center mt-4 text-white">
							Explore your data, build your dashboard, brint your team together
						</p>
						<Button
							className="mt-8 bg-white text-black hover:text-white"
							asChild
						>
							<a href="https://mavenanalytics.io/data-playground?page=11&pageSize=5">
								Get Dataset Here
							</a>
						</Button>
						<div className="relative flex h-[500px] w-full flex-col items-center justify-center overflow-hidden border-x border-t rounded-lg bg-background mt-20">
							<DataTableDemo data={data} />
							<BorderBeam size={250} duration={12} delay={9} />
							<div className="absolute bottom-0 left-0 right-0 h-[70%] bg-gradient-to-t from-white to-transparent"></div>
						</div>
					</div>
				</div>
			</div>
		</section>
	);
};

export default Home;
