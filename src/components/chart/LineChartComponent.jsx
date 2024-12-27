/* eslint-disable react/prop-types */
import {
	CartesianGrid,
	LabelList,
	Line,
	LineChart,
	XAxis,
	YAxis,
} from "recharts";

import { Card, CardContent } from "@/components/ui/card";
import {
	ChartContainer,
	ChartTooltip,
	ChartTooltipContent,
} from "@/components/ui/chart";

const chartConfig = {
	cyclists_injured: {
		label: "cyclists injured",
		color: "hsl(var(--chart-2))",
	},
	motorists_injured: {
		label: "motorists injured",
		color: "hsl(var(--chart-4))",
	},
	pedestrians_injured: {
		label: "pedestrians injured",
		color: "hsl(var(--chart-1))",
	},
};

const processData = (data) => {
	const groupedData = data.reduce((acc, item) => {
		const date = new Date(item.date);
		const month = date.toLocaleString("default", { month: "short" });
		const year = date.getFullYear();
		const key = `${month}-${year}`;

		if (!acc[key]) {
			acc[key] = {
				key,
				month,
				year,
				motorists_injured: 0,
				pedestrians_injured: 0,
				cyclists_injured: 0,
			};
		}
		acc[key].motorists_injured += parseFloat(item.motorists_injured);
		acc[key].pedestrians_injured += parseFloat(item.pedestrians_injured);
		acc[key].cyclists_injured += parseFloat(item.cyclists_injured);
		return acc;
	}, {});

	return Object.values(groupedData);
};

export function LineChartComponent({ data }) {
	const processedData = processData(data);

	return (
		<Card className="border-none shadow-none mt-10">
			<CardContent>
				<ChartContainer config={chartConfig}>
					<LineChart
						accessibilityLayer
						data={processedData}
						margin={{
							left: 12,
							right: 12,
							top: 30,
							bottom: 30,
						}}
					>
						<CartesianGrid vertical={false} />
						<XAxis
							dataKey="key"
							tickLine={true}
							axisLine={true}
							tickMargin={8}
						/>
						<YAxis tickLine={true} axisLine={true} tickMargin={8} />
						<ChartTooltip cursor={true} content={<ChartTooltipContent />} />
						<Line
							dataKey="cyclists_injured"
							type="linear"
							stroke="var(--color-cyclists_injured)"
							strokeWidth={3}
							dot={true}
						>
							<LabelList
								position="top"
								offset={12}
								className="fill-foreground"
								fontSize={12}
							/>
						</Line>
						<Line
							dataKey="motorists_injured"
							type="linear"
							stroke="var(--color-motorists_injured)"
							strokeWidth={3}
							dot={true}
						>
							<LabelList
								position="top"
								offset={12}
								className="fill-foreground"
								fontSize={12}
							/>
						</Line>
						<Line
							dataKey="pedestrians_injured"
							type="linear"
							stroke="var(--color-pedestrians_injured)"
							strokeWidth={3}
							dot={true}
						>
							<LabelList
								position="top"
								offset={12}
								className="fill-foreground"
								fontSize={12}
							/>
						</Line>
					</LineChart>
				</ChartContainer>
				<div className="flex flex-col items-center mt-4">
					<div className="flex items-center gap-4">
						<div className="flex items-center mr-4">
							<div className="w-4 h-4 mr-2 border bg-green-700"></div>
							<div className="text-sm">Motorists Injuried</div>
						</div>
						<div className="flex items-center mr-4 ">
							<div className="w-4 h-4 mr-2 border bg-yellow-500"></div>
							<div className="text-sm">Cyclists Injuried</div>
						</div>
						<div className="flex items-center mr-4 ">
							<div className="w-4 h-4 mr-2 border bg-orange-500"></div>
							<div className="text-sm">Pedestrians Injuried</div>
						</div>
					</div>
				</div>
			</CardContent>
		</Card>
	);
}
