import { Button } from "../ui/button";

const Home = () => {

	return (
		<section id="home">
			<div className="relative bg-[url('bg.png')] bg-cover bg-center min-h-screen w-full">
				<div className="absolute inset-0 bg-black opacity-50"></div>
				<div className="relative mx-auto max-w-6xl px-2 sm:px-6 lg:px-8">
					<div className="flex flex-col justify-center items-center min-h-screen">
						<h1 className="text-7xl font-semibold text-center text-white">
							New York City Collisions
						</h1>
						<p className="text-center mt-4 text-white">
							Explore your data, build your dashboard, brint your team together
						</p>
						<Button
							className="mt-8 bg-white text-black hover:text-white"
							asChild
						>
							<a href="https://mavenanalytics.io/data-playground?page=11&pageSize=5">
								Get Dataset Here
							</a>
						</Button>
					</div>
				</div>
			</div>
		</section>
	);
};

export default Home;
