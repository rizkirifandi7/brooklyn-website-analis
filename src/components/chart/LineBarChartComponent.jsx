/* eslint-disable react/prop-types */

import { CartesianGrid, Line, LineChart, XAxis, YAxis } from "recharts";

import { Card, CardContent } from "@/components/ui/card";
import {
	ChartContainer,
	ChartTooltip,
	ChartTooltipContent,
} from "@/components/ui/chart";

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

const getDataTop5ContributingFactorByStreetByMonth = (data) => {
	const result = {};

	data.forEach((item) => {
		const date = new Date(item.date);
		const year = date.getFullYear();
		const month = date.getMonth();
		const monthYear = `${monthNames[month]} ${year}`;

		const streetName = item.street_name;
		const contributingFactor = item.contributing_factor;

		if (!result[monthYear]) {
			result[monthYear] = {};
		}
		if (!result[monthYear][streetName]) {
			result[monthYear][streetName] = {};
		}
		if (!result[monthYear][streetName][contributingFactor]) {
			result[monthYear][streetName][contributingFactor] = 0;
		}
		result[monthYear][streetName][contributingFactor] += 1;
	});

	const formattedResult = {};
	Object.entries(result).forEach(([monthYear, streets]) => {
		const top5Streets = Object.entries(streets)
			.map(([streetName, factors]) => ({
				streetName,
				factors,
				totalFactors: Object.values(factors).reduce((a, b) => a + b, 0),
				monthYear,
			}))
			.sort((a, b) => b.totalFactors - a.totalFactors)
			.slice(0, 5);

		formattedResult[monthYear] = top5Streets;
	});

	return formattedResult;
};

const processData = (data) => {
	const groupedData = getDataTop5ContributingFactorByStreetByMonth(data);
	const totalContributions = {};

	Object.values(groupedData).forEach((monthData) => {
		monthData.forEach((item) => {
			const streetName = item.streetName;
			if (!totalContributions[streetName]) {
				totalContributions[streetName] = 0;
			}
			totalContributions[streetName] += item.totalFactors;
		});
	});

	const top5Streets = Object.entries(totalContributions)
		.sort(([, a], [, b]) => b - a)
		.slice(0, 5)
		.map(([streetName]) => streetName);

	const result = Object.entries(groupedData).map(([monthYear, streets]) => {
		const entry = { monthYear };
		top5Streets.forEach((streetName) => {
			const streetData = streets.find(
				(street) => street.streetName === streetName
			);
			entry[streetName.replace(/\s+/g, "_").toLowerCase()] = streetData
				? streetData.totalFactors
				: 0;
		});
		return entry;
	});

	return { result, top5Streets };
};

const generateChartConfig = (top5Streets) => {
	const colors = [
		"hsl(var(--chart-1))",
		"hsl(var(--chart-2))",
		"hsl(var(--chart-3))",
		"hsl(var(--chart-4))",
		"hsl(var(--chart-5))",
	];

	return top5Streets.reduce((config, street, index) => {
		config[street.replace(/\s+/g, "_").toLowerCase()] = {
			label: street
				.replace(/_/g, " ")
				.replace(/\b\w/g, (char) => char.toUpperCase()),
			color: colors[index % colors.length],
		};
		return config;
	}, {});
};

export function LineBarChartComponent({ data }) {
	const { result, top5Streets } = processData(data);
	const chartConfig = generateChartConfig(top5Streets);

	return (
		<Card className="border-none shadow-none">
			<CardContent>
				<ChartContainer config={chartConfig}>
					<LineChart
						accessibilityLayer
						data={result}
						margin={{
							left: 12,
							right: 12,
						}}
					>
						<CartesianGrid vertical={false} />
						<XAxis
							dataKey="monthYear"
							tickLine={true}
							axisLine={true}
							tickMargin={8}
						/>
						<YAxis tickLine={true} axisLine={true} tickMargin={8} />
						<ChartTooltip cursor={false} content={<ChartTooltipContent />} />
						{top5Streets.map((street, index) => (
							<Line
								key={index}
								type="linear"
								dataKey={street.replace(/\s+/g, "_").toLowerCase()}
								stroke={
									chartConfig[street.replace(/\s+/g, "_").toLowerCase()].color
								}
								strokeWidth={2}
								dot={false}
							/>
						))}
					</LineChart>
				</ChartContainer>
			</CardContent>
		</Card>
	);
}
