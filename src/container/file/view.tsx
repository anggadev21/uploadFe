import { IframeModal } from "@/components";

interface props {
	dataSelected: any;
}

export const ViewFile = ({ dataSelected }: props) => {
	
	return (
		<div className='px-5 pb-2 mt-4 overflow-auto  h-[calc(100vh-100px)]'>
			{dataSelected ? (
				<IframeModal url={dataSelected?.file?.url_preview} />
			) : null}
		</div>
	);
};
