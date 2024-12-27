const Recomendation = () => {
	return (
		<div className="rounded-md border w-full h-full mt-4" data-aos="fade-left">
			<div className="p-4">
				<h1 className="text-2xl font-semibold text-center py-4 uppercase">
					Recommendation
				</h1>
				<div className="p-4 border rounded-md">
					<h1 className="text-xl font-semibold mb-1">Recommendations</h1>
					<p className="text-muted-foreground text-base">
						Based on the analysis, the NYPD should consider the following
						Recommendations:
					</p>
					<ul className="list-disc list-inside mt-4 ml-4">
						<li>Increase the number of traffic police</li>
						<li>Increase the number of traffic police</li>
						<li>Increase the number of traffic police</li>
					</ul>
				</div>
			</div>
		</div>
	);
};

export default Recomendation;
