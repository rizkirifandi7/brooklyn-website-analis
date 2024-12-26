const Footer = () => {
	return (
		<footer className="bg-white border-t mt-10">
			<div className="mx-auto max-w-7xl p-6 md:flex md:items-center md:justify-between">
				<span className="text-sm text-gray-500 sm:text-center ">
					© 2024{" "}
					<a href="#" className="hover:underline">
						NYC Dataset
					</a>
					. All Rights Reserved.
				</span>
				<ul className="flex flex-wrap items-center mt-3 text-sm font-medium text-gray-500 sm:mt-0">
					<li>
						<a href="#home" className="hover:underline me-4 md:me-6">
							Home
						</a>
					</li>
					<li>
						<a href="#team" className="hover:underline me-4 md:me-6">
							Team
						</a>
					</li>
					<li>
						<a href="#dashboard" className="hover:underline me-4 md:me-6">
							Dashboard
						</a>
					</li>
				</ul>
			</div>
		</footer>
	);
};

export default Footer;
