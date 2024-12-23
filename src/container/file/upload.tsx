import { Form, Formik } from "formik";
import { fileSchema } from "@/schema";
import { iFile } from "@/interface";
import { useEffect, useState } from "react";
import { Button, Dropdown, Input } from "@/components";
import { FiUpload, FiX } from "react-icons/fi";
import { AiOutlineLoading } from "react-icons/ai";
import { CreateFile, GetUser } from "@/service";
import { getUserId, ToastNotif } from "@/util";

interface props {
	content: string;
	showModal: (val: boolean, content: string, reload: boolean) => void;
}
export const UploadFile = ({ content, showModal }: props) => {
	const [isLoading, setIsLoading] = useState<boolean>(false);
	const [userId, setUserId] = useState<string>("");
	const [listUser, setListUser] = useState<any>([]);
	const [data] = useState<iFile>({
		file: null,
		user_id: [
			{
				user_id: "",
			},
		],
	});

	useEffect(() => {
		let user_id = getUserId();
		if (user_id) {
			setUserId(user_id);
			getUser(user_id);
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	const getUser = async (id: string) => {
		try {
			const users = await GetUser(undefined, undefined, "");
			if (users.data.statusCode === 200) {
				let list: any = [];
				users.data.payload.data?.map((res: any) => {
					if (res?.role === "User" && id !== res?.id) {
						list.push({
							label: res?.employee?.name,
							value: res?.id,
						});
					}
				});
				setListUser(list);
			} else {
				setListUser([]);
			}
		} catch (e: any) {
			setListUser([]);
		}
	};

	const uploadFile = async (payload: any) => {
		setIsLoading(true);
		try {
			let formData: any = new FormData();
			let listUsers: any = [];
			listUsers.push({
				user_id: userId,
			});
			payload?.user_id?.map((res: any) => {
				if (res?.value)
					listUsers.push({
						user_id: res?.value,
					});
			});
			formData.append(`file`, payload.file);
			formData.append("user", JSON.stringify(listUsers));
			const response = await CreateFile(formData);
			if (response.data.statusCode === 200) {
				showModal(false, "add", true);
				ToastNotif("success", "Upload file Success");
			} else {
				ToastNotif("error", response.data.error.message);
			}
		} catch (error) {
			ToastNotif("error", "Upload file Failed");
		}
		setIsLoading(false);
	};

	return (
		<div className='px-5 pb-2 mt-4 overflow-auto'>
			<h1 className='text-xl font-semibold mb-4'>Upload File</h1>
			<Formik
				initialValues={data}
				validationSchema={fileSchema}
				onSubmit={(values) => {
					uploadFile(values);
				}}
			>
				{({
					handleChange,
					handleSubmit,
					setFieldValue,
					errors,
					touched,
					values,
				}) => (
					<Form>
						<div className='grid grid-cols-2 gap-2'>
							<div className='w-full'>
								<Input
									id='file'
									name='file'
									placeholder='File'
									label='File'
									type='file'
									onChange={(value: any) =>
										setFieldValue(`file`, value.target.files[0])
									}
									withLabel={true}
									className='bg-white border border-primary-300 text-gray-900 sm:text-sm rounded-lg block w-full p-2.5 outline-primary-600'
								/>
							</div>
							<div className='w-full'>
								<Dropdown
									datas={listUser}
									id='user_id'
									name='user_id'
									placeholder='User'
									label='User'
									onChange={(e: any) => {
										setFieldValue("user_id", e);
									}}
									menuPlacement='bottom'
									isMulti={true}
									required={true}
									withLabel={true}
									className='bg-white border border-primary-300 text-gray-900 sm:text-sm rounded-lg block w-full outline-primary-600'
								/>
							</div>
						</div>
						<div className='mt-8 flex justify-end space-x-2'>
							<Button
								type='button'
								className='flex bg-red-500 hover:bg-red-700 hover:scale-105 text-white rounded-md p-2'
								onClick={() => {
									showModal(false, content, false);
								}}
								disabled={isLoading}
							>
								<p className='flex mx-auto'>
									<FiX color='white' size={22} className='py-auto mr-2' />
									Cancel
								</p>
							</Button>
							<Button
								type='button'
								className='flex bg-green-500 hover:bg-green-700 hover:scale-105 text-white rounded-md p-2'
								onClick={() => handleSubmit()}
								disabled={isLoading}
							>
								{isLoading ? (
									<p className='flex mx-auto'>
										<AiOutlineLoading
											color='white'
											size={22}
											className='animate-spin h-auto mx-auto'
										/>
										Upload File
									</p>
								) : (
									<p className='flex mx-auto'>
										<FiUpload
											color='white'
											size={22}
											className='py-auto mr-2'
										/>
										Upload File
									</p>
								)}
							</Button>
						</div>
					</Form>
				)}
			</Formik>
		</div>
	);
};
