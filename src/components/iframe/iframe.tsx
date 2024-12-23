import Iframe from "react-iframe";

interface props {
	url?: string;
}

export const IframeModal = ({ url }: props) => {
	return (
		<Iframe
			url={url ? url : ""}
			width='100%'
			height='100%'
			id=''
			className=''
			display='block'
			position='relative'
		/>
	);
};
