import { Card } from "../ui/card";

const teamMembers = [
	{
		name: "Nama",
		nim: "111111",
		imgSrc: "https://dummyimage.com/240x200/000/fff",
	},
	{
		name: "Nama",
		nim: "111111",
		imgSrc: "https://dummyimage.com/240x200/000/fff",
	},
	{
		name: "Nama",
		nim: "111111",
		imgSrc: "https://dummyimage.com/240x200/000/fff",
	},
	{
		name: "Nama",
		nim: "111111",
		imgSrc: "https://dummyimage.com/240x200/000/fff",
	},
	{
		name: "Nama",
		nim: "111111",
		imgSrc: "https://dummyimage.com/240x200/000/fff",
	},
];

const Team = () => {
	return (
		<section className="bg-white h-full w-full" id="team" >
			<div className="mx-auto max-w-6xl px-2 sm:px-6 lg:px-10 pt-24" data-aos="zoom-in">
				<h1 className="text-2xl font-semibold text-center uppercase">Team</h1>
				<div className="grid grid-cols-5 gap-4 mt-10">
					{teamMembers.map((member, index) => (
						<Card
							key={index}
							className="shadow-none rounded-md h-[300px] w-full"
						>
							<img
								src={member.imgSrc}
								alt=""
								className="object-cover h-[220px] rounded-md overflow-hidden"
							/>
							<div className="flex flex-col justify-center items-center h-[80px]">
								<h1 className="text-base font-semibold">{member.name}</h1>
								<p className="text-sm text-muted-foreground font-medium">
									{member.nim}
								</p>
							</div>
						</Card>
					))}
				</div>
			</div>
		</section>
	);
};

export default Team;
