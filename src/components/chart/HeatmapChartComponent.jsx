/* eslint-disable react/prop-types */
import React, { useState } from "react";

const xLabels = [
	"Monday",
	"Tuesday",
	"Wednesday",
	"Thursday",
	"Friday",
	"Saturday",
	"Sunday",
];
const yLabels = Array.from({ length: 24 }, (_, i) => `${i}:00`);

const getWeekCollision = (date) => {
	const startDate = new Date("2021-01-01");
	const diffInMs = date - startDate;
	const diffInWeeks = Math.ceil(diffInMs / (1000 * 60 * 60 * 24 * 7));
	return diffInWeeks;
};

const processData = (dataset, weekRange) => {
	const data = Array.from({ length: 24 }, () => Array(7).fill(0));
	let startWeek, endWeek;

	if (!weekRange) {
		startWeek = 1;
		endWeek = 105;
	} else if (weekRange.includes("-")) {
		[startWeek, endWeek] = weekRange.split("-").map(Number);
	} else {
		startWeek = endWeek = Number(weekRange);
	}

	dataset.forEach((item) => {
		const date = new Date(`${item.date}T${item.time}`);
		const weekCollision = getWeekCollision(date);
		const year = date.getFullYear();

		if (
			year >= 2021 &&
			year <= 2022 &&
			weekCollision >= startWeek &&
			weekCollision <= endWeek
		) {
			const day = date.getDay();
			const hour = date.getHours();

			const totalInjured = parseInt(item.persons_injured) || 0;
			const totalKilled = parseInt(item.persons_killed) || 0;
			const totalMotoristsInjured = parseInt(item.motorists_injured) || 0;
			const totalMotoristsKilled = parseInt(item.motorists_killed) || 0;
			const totalCyclistsInjured = parseInt(item.cyclists_injured) || 0;
			const totalCyclistsKilled = parseInt(item.cyclists_killed) || 0;
			const totalPedestriansInjured = parseInt(item.pedestrians_injured) || 0;
			const totalPedestriansKilled = parseInt(item.pedestrians_killed) || 0;

			data[hour][day === 0 ? 6 : day - 1] +=
				totalInjured +
				totalKilled +
				totalMotoristsInjured +
				totalMotoristsKilled +
				totalCyclistsInjured +
				totalCyclistsKilled +
				totalPedestriansInjured +
				totalPedestriansKilled;
		}
	});

	return data;
};

const generateLegendItems = (maxValue) => {
	const step = Math.ceil(maxValue / 5);
	return Array.from({ length: 6 }, (_, i) => {
		const value = i * step;
		return {
			color: `rgb(255, ${255 - value * 2.55}, ${255 - value * 2.55})`,
			label: i === 5 ? `${value}+` : `${value}-${value + step - 1}`,
		};
	});
};

const Legend = ({ maxValue }) => {
	const legendItems = generateLegendItems(maxValue);

	return (
		<div className="flex flex-col items-center mt-10">
			<div className="text-sm font-medium mb-2">Number of Accident</div>
			<div className="flex">
				{legendItems.map((item, index) => (
					<div key={index} className="flex items-center mr-4">
						<div
							className="w-4 h-4 mr-2 border"
							style={{ backgroundColor: item.color }}
						></div>
						<div className="text-sm">{item.label}</div>
					</div>
				))}
			</div>
		</div>
	);
};

const HeatmapChartComponent = ({ data }) => {
	const [weekRange, setWeekRange] = useState("1-105");

	const handleInputChange = (e) => {
		const value = e.target.value;
		if (/^\d*-\d*$|^\d*$/.test(value)) {
			setWeekRange(value);
		}
	};

	const datas = processData(data, weekRange);
	const maxValue = Math.max(...datas.flat());

	return (
		<div className="flex flex-col items-center justify-center mt-6">
			<div className="mb-4">
				<label className="mr-2">Week Range (e.g., 1-20 or 3):</label>
				<input
					type="text"
					value={weekRange}
					onChange={handleInputChange}
					className="border py-1 px-2 rounded-md"
					placeholder="Week range 1-105"
				/>
			</div>
			<div className="flex items-center justify-center">
				<div className="flex flex-col items-center mb-6 mr-2">
					{yLabels.map((label, i) => (
						<div
							key={i}
							className="flex items-center text-right text-sm font-medium h-6"
						>
							{label}
						</div>
					))}
				</div>
				<div className="flex flex-col items-center">
					<div className="grid grid-cols-7">
						{datas.map((row, i) => (
							<React.Fragment key={i}>
								{row.map((value, j) => (
									<div
										key={j}
										className="w-32 h-6 flex items-center cursor-pointer justify-center text-sm text-transparent hover:text-black"
										style={{
											backgroundColor: `rgb(255, ${255 - value * 2.55}, ${
												255 - value * 2.55
											})`,
										}}
									>
										{value}
									</div>
								))}
							</React.Fragment>
						))}
						{xLabels.map((label, i) => (
							<div key={i} className="text-center text-sm font-medium mt-1">
								{label}
							</div>
						))}
					</div>
				</div>
			</div>
			<Legend maxValue={maxValue} />
		</div>
	);
};

export default HeatmapChartComponent;
