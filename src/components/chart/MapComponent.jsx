/* eslint-disable react/prop-types */
import {
	Circle,
	MapContainer,
	TileLayer,
	Tooltip,
	useMap,
} from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { Button } from "../ui/button";

const processData = (data) => {
	const coordinateMap = new Map();

	data.forEach((item) => {
		const key = `${item.latitude},${item.longitude}`;

		if (coordinateMap.has(key)) {
			const existingItem = coordinateMap.get(key);
			coordinateMap.set(key, {
				...existingItem,
				radius: existingItem.radius + 50,
			});
		} else {
			coordinateMap.set(key, {
				latitude: item.latitude,
				longitude: item.longitude,
				radius: 50,
				street_name: item.street_name,
			});
		}
	});

	return Array.from(coordinateMap.values());
};

const ResetButton = ({ center }) => {
	const map = useMap();

	const handleReset = () => {
		map.setView(center, 13);
	};

	return (
		<Button
			onClick={handleReset}
			style={{ position: "absolute", top: 10, right: 10, zIndex: 1000 }}
		>
			Reset View
		</Button>
	);
};

const MapComponent = ({ data }) => {
	const processedData = processData(data);
	const initialCenter = [40.63791, -73.97864];

	return (
		<div style={{ position: "relative", height: "100%", width: "100%" }}>
			<MapContainer
				center={initialCenter}
				zoom={13}
				scrollWheelZoom={true}
				style={{ height: "100%", width: "100%" }}
				className="z-0"
			>
				<TileLayer
					url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png"
					attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
				/>
				{processedData.map((item, index) => (
					<Circle
						key={index}
						center={[item.latitude, item.longitude]}
						radius={item.radius}
						fillColor="red"
						stroke={false}
					>
						<Tooltip>
							<p>{item.street_name}</p>
						</Tooltip>
					</Circle>
				))}
				<ResetButton center={initialCenter} />
			</MapContainer>
		</div>
	);
};

export default MapComponent;
