import { Dialog, Transition } from "@headlessui/react";
import { Fragment, useState, useEffect } from "react";
import { Button } from "../button/button";
import { FiTrash2, FiX } from "react-icons/fi";

interface props {
	data: any;
	isModal?: boolean;
	content: string;
	showModal: (val: boolean, content: string, reload: boolean) => void;
	onDelete: (id: string, file_id: string) => void;
}

export const ModalDelete = ({
	data,
	isModal,
	content,
	showModal,
	onDelete,
}: props) => {
	const [isLoading, setIsLoading] = useState<boolean>(false);

	useEffect(() => {
		setIsLoading(false);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [data]);

	const deleteData = (id: string, file_id: string) => {
		setIsLoading(true);
		onDelete(id, file_id);
	};

	return (
		<Transition appear show={isModal} as={Fragment}>
			<Dialog
				as='div'
				className='relative w-full'
				onClose={() => showModal(false, content, false)}
			>
				<Transition.Child
					as={Fragment}
					enter='ease-out duration-300'
					enterFrom='opacity-0'
					enterTo='opacity-100'
					leave='ease-in duration-200'
					leaveFrom='opacity-100'
					leaveTo='opacity-0'
				>
					<div className='fixed inset-0 bg-black z-20 bg-opacity-25 w-full h-screen' />
				</Transition.Child>

				<div className='fixed inset-0 z-40 overflow-y-auto'>
					<div className='flex min-h-full items-center justify-center p-4 text-center'>
						<Transition.Child
							as={Fragment}
							enter='ease-out duration-300'
							enterFrom='opacity-0 scale-95'
							enterTo='opacity-100 scale-100'
							leave='ease-in duration-200'
							leaveFrom='opacity-100 scale-100'
							leaveTo='opacity-0 scale-95'
						>
							<Dialog.Panel className='w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all'>
								<Dialog.Title
									as='h3'
									className='text-lg font-bold leading-6 text-gray-900'
								>
									{`Delete Data?`}
								</Dialog.Title>
								<div className='mt-2'>
									<p className='text-sm text-gray-500'>
										You will permanently delete this item and its components,
										attachments and all data
									</p>
									<p className='text-sm text-gray-500 mt-8'>
										if you dont want to delete it, you can finish or close it
									</p>
								</div>

								<div className='mt-8 flex justify-end'>
									<div className='flex gap-2 items-center'>
										<Button
											type='button'
											className='bg-green-500 hover:bg-green-700 hover:scale-110 text-white p-2 rounded-md'
											onClick={() => showModal(false, content, false)}
											disabled={isLoading}
										>
											<p className='flex mx-auto'>
												<FiX
													color='white'
													size={18}
													className='py-auto mr-1 mt-1'
												/>
												Cancel
											</p>
										</Button>
										<Button
											type='button'
											className='bg-red-500 hover:bg-red-700 hover:scale-110 text-white p-2 rounded-md'
											onClick={() => {
												if(data?.file){
													deleteData(data?.file?.id, data?.file?.file_id)
												}else{
													deleteData(data?.id, "")
												}
											}}
										>
											<p className='flex mx-auto'>
												<FiTrash2
													color='white'
													size={18}
													className='py-auto mr-1 mt-1'
												/>
												Delete File
											</p>
										</Button>
									</div>
								</div>
							</Dialog.Panel>
						</Transition.Child>
					</div>
				</div>
			</Dialog>
		</Transition>
	);
};
