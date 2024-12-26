import NumberTicker from "../ui/number-ticker";

/* eslint-disable react/prop-types */
const InfoTotal = ({ title, total }) => {
	return (
		<div className="flex flex-col justify-center items-center h-40 border rounded-md">
			<p className="text-muted-foreground text-lg">{title}</p>
			<div className="text-2xl font-bold">
				<NumberTicker value={total} />
			</div>
		</div>
	);
};

export default InfoTotal;
