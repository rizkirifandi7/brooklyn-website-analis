/* eslint-disable react/prop-types */
const DashboardContent = ({ title, description, children, aos }) => {
	return (
		<div className="rounded-md border w-full h-full mt-4" data-aos={aos}>
			<div className="w-full mx-auto p-6">
				<h1 className="text-2xl font-semibold text-center uppercase">
					{title}
				</h1>
				<p className="text-muted-foreground text-base text-center">
					{description}
				</p>

				<div className="flex flex-col gap-4 p-4">{children}</div>
			</div>
		</div>
	);
};

export default DashboardContent;
