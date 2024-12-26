import { useCallback, useEffect, useState } from "react";
import { LineChartComponent } from "../chart/LineChartComponent";
import MapComponent from "../chart/MapComponent";
import { PieChartComponent } from "../chart/PieChartComponent";
import InfoTotal from "./InfoTotal";
import DashboardContent from "../DashboardContent";
import Recomendation from "../Recomendation";
import HeatmapChartComponent from "../chart/HeatmapChartComponent";
import BarLine from "../chart/BarLine";

const DashboardLayout = () => {
	const [data, setData] = useState([]);

	const fetchData = useCallback(async () => {
		try {
			const response = await fetch("/data_nyc.json");
			const results = await response.json();
			const limitedResults = results.slice(0, 10000);
			setData(limitedResults);
		} catch (error) {
			console.error(error);
		}
	}, []);

	useEffect(() => {
		fetchData();
	}, [fetchData]);

	const brooklynData = data.filter((item) => item.borough === "Brooklyn");
	const totalInjury = brooklynData.reduce(
		(acc, item) =>
			acc +
			parseFloat(item.persons_injured) +
			parseFloat(item.pedestrians_injured) +
			parseFloat(item.cyclists_injured) +
			parseFloat(item.motorists_injured),
		0
	);
	const totalKilled = brooklynData.reduce(
		(acc, item) =>
			acc +
			parseInt(item.persons_killed) +
			parseInt(item.pedestrians_killed) +
			parseInt(item.cyclists_killed) +
			parseInt(item.motorists_killed),
		0
	);

	return (
		<section className="bg-white min-h-screen w-full" id="dashboard">
			<div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8 pt-40">
				<h1 className="text-3xl font-semibold text-center" data-aos="zoom-in">
					Dashboard Brooklyn Collision
				</h1>

				{/* Info Total */}
				<div className="grid grid-cols-3 gap-4 mt-8" data-aos="zoom-in">
					<InfoTotal title="Total Collision" total={brooklynData.length} />
					<InfoTotal
						title="Total Injury"
						total={totalInjury ? totalInjury : 0}
					/>
					<InfoTotal
						title="Total Killed"
						total={totalKilled ? totalKilled : 0}
					/>
				</div>

				{/* Pie Chart */}
				<DashboardContent
					title={"Collision In Newyork Boroughs"}
					description={
						"Lorem ipsum dolor sit amet consectetur adipisicing elit. Delectus perspiciatis vitae"
					}
					aos="fade-right"
				>
					<PieChartComponent data={data} />
				</DashboardContent>

				{/* Map Collision */}
				<DashboardContent
					title={"Collision Map"}
					description={
						"Lorem ipsum dolor sit amet consectetur adipisicing elit. Delectus perspiciatis vitae"
					}
					aos="fade-left"
				>
					<div className="p-4 w-full h-[600px]">
						<MapComponent data={brooklynData} />
					</div>
				</DashboardContent>

				{/* Heatmap */}
				<DashboardContent
					title={"Heatmap Collision By Hour Over The Week"}
					description={
						"Lorem ipsum dolor sit amet consectetur adipisicing elit. Delectus perspiciatis vitae"
					}
					aos="fade-right"
				>
					<div className="">
						<HeatmapChartComponent data={brooklynData} />
					</div>
				</DashboardContent>

				{/* Bar dan Line Chart */}
				<BarLine
					data={brooklynData}
					title={"Top Dangerous Street With Contributing Factors"}
					description={
						"Lorem ipsum dolor sit amet consectetur adipisicing elit. Delectus perspiciatis vitae"
					}
					aos="fade-left"
				/>

				{/* Line Chart */}
				<DashboardContent
					title={"Injuries Based On Most  Vulnrable Road Users"}
					description={
						"Lorem ipsum dolor sit amet consectetur adipisicing elit. Delectus perspiciatis vitae"
					}
					aos="fade-right"
				>
					<LineChartComponent data={brooklynData} />
				</DashboardContent>

				<Recomendation />
			</div>
		</section>
	);
};

export default DashboardLayout;
