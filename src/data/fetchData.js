const limit = 5000;

export const fetchDataPie = async () => {
	const response = await fetch("data_nyc.json");
	const data = await response.json();
	const dataLimit = data.slice(0, limit);
	return dataLimit;
};

export const fetchDataBrooklyn = async () => {
	const response = await fetch("data_nyc.json");
	const data = await response.json();
	const brooklynData = data.filter((item) => item.borough === "Brooklyn");
	const limitedResults = brooklynData.slice(0, limit);
	return limitedResults;
};
