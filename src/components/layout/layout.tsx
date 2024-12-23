import { PropsWithChildren } from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const Layout = (props: PropsWithChildren) => {
	return (
		<>
			<div className='px-2'>{props.children}</div>
			<ToastContainer />
		</>
	);
};
