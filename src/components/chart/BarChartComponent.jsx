/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";

import {
	ChartContainer,
	ChartTooltip,
	ChartTooltipContent,
} from "@/components/ui/chart";
import {
	BarChart,
	CartesianGrid,
	XAxis,
	Bar,
	LabelList,
	YAxis,
} from "recharts";

const chartConfig = {
	contributing_factor: {
		label: "contributing_factor",
	},
};

const colors = [
	"#8884d8",
	"#82ca9d",
	"#ffc658",
	"#ff8042",
	"#8dd1e1",
	"#a4de6c",
	"#d0ed57",
	"#f8b26a",
	"#f6986a",
];

const processData = (data, selectedStreet) => {
	const filteredData = data.filter((item) => {
		const date = new Date(item.date);
		const year = date.getFullYear();
		return item.street_name === selectedStreet && year >= 2021 && year <= 2022;
	});

	const groupedData = filteredData.reduce((acc, item) => {
		const factor = item.contributing_factor;

		if (!acc[factor]) {
			acc[factor] = {
				factor,
				total: 0,
				fill: colors[Object.keys(acc).length % colors.length],
			};
		}
		acc[factor].total += 1;
		return acc;
	}, {});

	const sortedData = Object.values(groupedData).sort(
		(a, b) => b.total - a.total
	);
	return sortedData;
};

const getDataTop5ContributingFactorByStreet = (data) => {
	const street_name = data.reduce((acc, item) => {
		const streetName = item.street_name;
		const contributingFactor = item.contributing_factor;

		if (!acc[streetName]) {
			acc[streetName] = {};
		}
		if (!acc[streetName][contributingFactor]) {
			acc[streetName][contributingFactor] = 0;
		}
		acc[streetName][contributingFactor] += 1;

		return acc;
	}, {});

	const topStreets = Object.entries(street_name)
		.map(([streetName, factors]) => ({
			streetName,
			factors,
			totalFactors: Object.values(factors).reduce((a, b) => a + b, 0),
		}))
		.sort((a, b) => b.totalFactors - a.totalFactors)
		.slice(0, 5);

	return topStreets;
};

export function BarChartComponent({ data }) {
	const [selectedStreet, setSelectedStreet] = useState("");
	const topStreetsData = getDataTop5ContributingFactorByStreet(data);
	const topStreets = topStreetsData.map((item) => item.streetName);
	const processedData = processData(data, selectedStreet);

	useEffect(() => {
		if (topStreets.length > 0 && !selectedStreet) {
			setSelectedStreet(topStreets[0]);
		}
	}, [topStreets, selectedStreet]);

	return (
		<div className="p-4 h-full">
			<div className="flex justify-end items-center mb-6 h-full">
				<select
					value={selectedStreet}
					onChange={(e) => setSelectedStreet(e.target.value)}
					className="p-2 rounded-md w-[180px] shadow-sm text-sm border"
				>
					{topStreets.map((street) => (
						<option key={street} value={street}>
							{street}
						</option>
					))}
				</select>
			</div>
			<div className="p-4 h-full">
				{selectedStreet && (
					<ChartContainer
						config={chartConfig}
						className="aspect-square h-[650px] w-full"
					>
						<BarChart
							accessibilityLayer
							data={processedData}
							margin={{
								top: 20,
							}}
						>
							<CartesianGrid vertical={true} />
							<XAxis
								dataKey="factor"
								tickLine={true}
								axisLine={true}
								interval={0}
								tickMargin={5}
								accentHeight={10}
								tickFormatter={(value) => value.slice(0, 13)}
							/>
							<YAxis tickLine={true} axisLine={true} tickMargin={8} />
							<ChartTooltip cursor={false} content={<ChartTooltipContent />} />
							<Bar dataKey="total" fill="var(--color-desktop)" radius={8}>
								<LabelList
									position="top"
									offset={12}
									className="fill-foreground"
								/>
							</Bar>
						</BarChart>
					</ChartContainer>
				)}
			</div>
		</div>
	);
}
