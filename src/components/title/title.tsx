interface props {
	icon: any;
	title: string;
	total: number;
	withCount: boolean;
}

export const Title = ({ icon, title, total }: props) => {
	return (
		<div className='grid sm:grid-cols-1 md:grid-cols-2 gap-2 p-2'>
			<div className='flex items-center w-full'>
				<div className='bg-cyan-400 p-[12px] flex justify-center items-center rounded-[23px]'>
					{icon}
				</div>

				<div className='ml-[13px]'>
					<h1 className='text-2xl font-bold'>{title}</h1>
					<p className='text-small'>
						{total} {title}
					</p>
				</div>
			</div>
		</div>
	);
};
