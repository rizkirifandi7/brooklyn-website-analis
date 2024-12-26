/* eslint-disable react/prop-types */
import * as React from "react";
import { Label, Pie, PieChart } from "recharts";

import { Card, CardContent } from "@/components/ui/card";
import {
	ChartContainer,
	ChartTooltip,
	ChartTooltipContent,
} from "@/components/ui/chart";

const colors = {
	bronx: "var(--color-bronx)",
	manhattan: "var(--color-manhattan)",
	brooklyn: "var(--color-brooklyn)",
	queens: "var(--color-queens)",
	staten_island: "var(--color-staten_island)",
};

const processData = (data) => {
	const boroughTotals = data.reduce((acc, curr) => {
		if (!acc[curr.borough]) {
			acc[curr.borough] = 0;
		}
		acc[curr.borough] += 1;
		return acc;
	}, {});

	return Object.keys(boroughTotals).map((borough) => ({
		borough,
		count: boroughTotals[borough],
		fill: colors[borough.toLowerCase().replace(" ", "_")],
	}));
};

const chartConfig = {
	count: {
		label: "Count",
	},
	bronx: {
		label: "Bronx",
		color: "hsl(var(--chart-1))",
	},
	manhattan: {
		label: "Manhattan",
		color: "hsl(var(--chart-2))",
	},
	brooklyn: {
		label: "Brooklyn",
		color: "hsl(var(--chart-3))",
	},
	queens: {
		label: "Queens",
		color: "hsl(var(--chart-4))",
	},
	staten_island: {
		label: "Staten Island",
		color: "hsl(var(--chart-5))",
	},
};

export const PieChartComponent = ({ data }) => {
	const chartData = React.useMemo(() => processData(data), [data]);

	const totalCount = React.useMemo(() => {
		return chartData.reduce((acc, curr) => acc + curr.count, 0);
	}, [chartData]);

	return (
		<Card className="flex flex-col border-none shadow-none p-0">
			<CardContent className="flex-1 pb-0">
				<ChartContainer config={chartConfig}>
					<PieChart>
						<ChartTooltip
							cursor={false}
							content={<ChartTooltipContent hideLabel />}
						/>
						<Pie
							data={chartData}
							dataKey="count"
							nameKey="borough"
							innerRadius={120}
							outerRadius={200}
							strokeWidth={5}
							labelLine={false}
							label={({ payload, ...props }) => {
								const label = `${payload.borough} (${payload.count})`;
								return (
									<text
										cx={props.cx}
										cy={props.cy}
										x={props.x}
										y={props.y}
										textAnchor={props.textAnchor}
										dominantBaseline={props.dominantBaseline}
										fill="hsla(var(--foreground))"
									>
										{label}
									</text>
								);
							}}
						>
							<Label
								content={({ viewBox }) => {
									if (viewBox && "cx" in viewBox && "cy" in viewBox) {
										return (
											<text
												x={viewBox.cx}
												y={viewBox.cy}
												textAnchor="middle"
												dominantBaseline="middle"
											>
												<tspan
													x={viewBox.cx}
													y={viewBox.cy}
													className="fill-foreground text-3xl font-bold"
												>
													{totalCount.toLocaleString()}
												</tspan>
												<tspan
													x={viewBox.cx}
													y={(viewBox.cy || 0) + 24}
													className="fill-muted-foreground"
												>
													Total Cases
												</tspan>
											</text>
										);
									}
								}}
							/>
						</Pie>
					</PieChart>
				</ChartContainer>
			</CardContent>
		</Card>
	);
};
