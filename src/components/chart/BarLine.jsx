/* eslint-disable react/prop-types */
import { useState } from "react";
import DashboardContent from "../DashboardContent";
import {
	Bar,
	BarChart,
	CartesianGrid,
	LabelList,
	Line,
	LineChart,
	XAxis,
	YAxis,
} from "recharts";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import {
	ChartContainer,
	ChartTooltip,
	ChartTooltipContent,
} from "@/components/ui/chart";

const chartConfig = {
	desktop: {
		label: "Desktop",
		color: "var(--color-desktop)",
	},
};

const monthNames = [
	"Jan",
	"Feb",
	"Mar",
	"Apr",
	"May",
	"Jun",
	"Jul",
	"Aug",
	"Sep",
	"Oct",
	"Nov",
	"Dec",
];

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

const getDataTop5ContributingFactorByStreetByMonth = (data) => {
	const result = [];
	const dataByYearMonth = data.reduce((acc, item) => {
		const date = new Date(item.date);
		const year = date.getFullYear();
		const month = date.getMonth();
		const streetName = item.street_name;
		const contributingFactor = item.contributing_factor;

		if (!acc[year]) acc[year] = {};
		if (!acc[year][month]) acc[year][month] = {};
		if (!acc[year][month][streetName]) acc[year][month][streetName] = {};
		if (!acc[year][month][streetName][contributingFactor])
			acc[year][month][streetName][contributingFactor] = 0;
		acc[year][month][streetName][contributingFactor] += 1;

		return acc;
	}, {});

	Object.entries(dataByYearMonth).forEach(([year, months]) => {
		Object.entries(months).forEach(([month, streetData]) => {
			const monthYear = `${monthNames[month]} ${year}`;
			const monthData = { monthYear };

			Object.entries(streetData).forEach(([streetName, factors]) => {
				monthData[streetName] = Object.values(factors).reduce(
					(a, b) => a + b,
					0
				);
			});

			result.push(monthData);
		});
	});

	return result;
};

const getDataTop5ContributingFactorByStreet = (data) => {
	const street_name = data.reduce((acc, item) => {
		const streetName = item.street_name;
		const contributingFactor = item.contributing_factor;

		if (!acc[streetName]) acc[streetName] = {};
		if (!acc[streetName][contributingFactor])
			acc[streetName][contributingFactor] = 0;
		acc[streetName][contributingFactor] += 1;

		return acc;
	}, {});

	return Object.entries(street_name)
		.map(([streetName, factors]) => ({
			streetName,
			factors: Object.entries(factors).map(([factor, total]) => ({
				factor,
				total,
			})),
			totalFactors: Object.values(factors).reduce((a, b) => a + b, 0),
		}))
		.sort((a, b) => b.totalFactors - a.totalFactors)
		.slice(0, 5)
		.map(({ streetName, factors }, index) => ({
			streetName,
			factors,
			fill: colors[index % colors.length],
		}));
};

const getTotalContributingFactors = (dataBar) => {
	const totalFactors = {};

	dataBar.forEach((street) => {
		street.factors.forEach(({ factor, total }) => {
			if (!totalFactors[factor]) totalFactors[factor] = 0;
			totalFactors[factor] += total;
		});
	});

	return Object.entries(totalFactors).map(([factor, total]) => ({
		factor,
		total,
	}));
};

const ChartCard = ({ title, description, children }) => (
	<Card className="border-none shadow-none mt-10">
		<CardHeader>
			<CardTitle>{title}</CardTitle>
			<CardDescription>{description}</CardDescription>
		</CardHeader>
		<CardContent>{children}</CardContent>
	</Card>
);

const BarLine = ({ data, title, description, aos }) => {
	const [selectedStreet, setSelectedStreet] = useState("All Streets");

	const dataBar = getDataTop5ContributingFactorByStreet(data);
	const dataLine = getDataTop5ContributingFactorByStreetByMonth(data);

	const filteredDataLine =
		selectedStreet === "All Streets"
			? dataLine
			: dataLine.map((monthData) => ({
					monthYear: monthData.monthYear,
					[selectedStreet]: monthData[selectedStreet] || 0,
			  }));

	const totalFactors = getTotalContributingFactors(dataBar);

	return (
		<section className="bg-white min-h-screen w-full" id="dashboard">
			<div className="mx-auto max-w-7xl">
				<DashboardContent title={title} description={description} aos={aos}>
					<div className="flex justify-end gap-4 items-center h-full">
						<label htmlFor="">Street Name : </label>
						<select
							value={selectedStreet}
							onChange={(e) => setSelectedStreet(e.target.value)}
							className="p-2 rounded-md w-[180px] shadow-sm text-sm border"
						>
							<option value="All Streets">All Streets</option>
							{dataBar.map((street) => (
								<option key={street.streetName} value={street.streetName}>
									{street.streetName}
								</option>
							))}
						</select>
					</div>
					<ChartCard>
						<ChartContainer config={chartConfig}>
							<BarChart
								accessibilityLayer
								data={
									selectedStreet === "All Streets"
										? totalFactors
										: dataBar.find(
												(street) => street.streetName === selectedStreet
										  )?.factors || []
								}
								margin={{ top: 30 }}
							>
								<CartesianGrid vertical={true} />
								<XAxis
									dataKey="factor"
									tickLine={true}
									tickMargin={10}
									axisLine={true}
									interval={0}
									tick={({ x, y, payload, index }) => {
										const dy = index % 2 === 0 ? 0 : 14;
										return (
											<text x={x} y={y} dy={dy} textAnchor="middle" fill="#666">
												{selectedStreet === "All Streets"
													? payload.value.slice(0, 2)
													: payload.value.slice(0, 15)}
											</text>
										);
									}}
								/>
								<YAxis tickLine={true} axisLine={true} tickMargin={8} />
								<ChartTooltip cursor={true} content={<ChartTooltipContent />} />
								<Bar dataKey="total" fill="hsl(var(--chart-2))" radius={8}>
									<LabelList
										position="top"
										offset={12}
										className="fill-foreground"
										fontSize={12}
									/>
								</Bar>
							</BarChart>
						</ChartContainer>
					</ChartCard>
					<ChartCard>
						<ChartContainer config={chartConfig}>
							<LineChart
								accessibilityLayer
								data={filteredDataLine}
								margin={{ left: 12, right: 12, top: 30, bottom: 30 }}
							>
								<CartesianGrid vertical={true} />
								<XAxis
									dataKey="monthYear"
									tickLine={true}
									axisLine={true}
									tickMargin={8}
								/>
								<YAxis tickLine={true} axisLine={true} tickMargin={8} />
								<ChartTooltip cursor={true} content={<ChartTooltipContent />} />
								{selectedStreet === "All Streets" ? (
									dataBar.map((street, index) => (
										<Line
											key={index}
											dataKey={street.streetName}
											type="linear"
											stroke={colors[index % colors.length]}
											strokeWidth={3}
											dot={true}
										>
											<LabelList
												position="top"
												offset={10}
												className="fill-foreground"
												fontSize={12}
											/>
										</Line>
									))
								) : (
									<Line
										dataKey={selectedStreet}
										type="linear"
										stroke="hsl(var(--chart-2))"
										strokeWidth={3}
										dot={true}
									>
										<LabelList
											position="top"
											offset={10}
											className="fill-foreground"
											fontSize={12}
										/>
									</Line>
								)}
							</LineChart>
						</ChartContainer>
					</ChartCard>
				</DashboardContent>
			</div>
		</section>
	);
};

export default BarLine;
