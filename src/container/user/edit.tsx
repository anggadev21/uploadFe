"use client";

import { Form, Formik } from "formik";
import { userSchema } from "@/schema";
import { iUser } from "@/interface";
import { useEffect, useState } from "react";
import { Button, Dropdown, Input } from "@/components";
import { FiPlus, FiX } from "react-icons/fi";
import { AiOutlineLoading } from "react-icons/ai";
import { EditUserById, GetEmployee } from "@/service";
import { ToastNotif } from "@/util";
import { listRole } from "@/constant";
import { EmployeePage } from "../employee";

interface props {
	dataSelected: any;
	content: string;
	showModal: (val: boolean, content: string, reload: boolean) => void;
}
export const EditUser = ({ dataSelected, content, showModal }: props) => {
	const [isLoading, setIsLoading] = useState<boolean>(false);
	const [listEmployee, setListEmployee] = useState<any>([]);
	const [data, setData] = useState<iUser>({
		employee_id: "",
		username: "",
		email: "",
		password: "",
		role: "",
		selectEmployee: {},
		selectRole: {},
	});

	useEffect(() => {
		getEmployee();
		console.log(dataSelected);
		setData({
			employee_id: dataSelected?.employee_id,
			username: dataSelected?.username,
			email: dataSelected?.email,
			password: "",
			role: dataSelected?.role,
			selectEmployee: {
                value: dataSelected?.employee
            },
			selectRole: {
				label: dataSelected?.role,
			},
		});
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	const getEmployee = async () => {
		try {
			const employees = await GetEmployee(undefined, undefined, "", true);
			if (employees.data.statusCode === 200) {
				let list: any = [];
				employees.data?.payload?.data?.map((res: any) => {
					list.push({
						label: res?.name,
						value: res,
					});
				});
				setListEmployee(list);
			} else {
				setListEmployee([]);
			}
		} catch (e: any) {
			setListEmployee([]);
		}
	};

	const editUser = async (payload: any) => {
		setIsLoading(true);
		try {
			const response = await EditUserById(payload, dataSelected?.id);
			if (response.data.statusCode === 200) {
				showModal(false, "edit", true);
				ToastNotif("success", "Edit user Success");
			} else {
				ToastNotif("error", response.data.error.message);
			}
		} catch (error) {
			ToastNotif("error", "Edit user Failed");
		}
		setIsLoading(false);
	};

	return (
		<div className='px-5 pb-2 mt-4 overflow-auto'>
			<Formik
				initialValues={data}
				validationSchema={userSchema}
				onSubmit={(values) => {
					editUser(values);
				}}
				enableReinitialize
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
									id='employee_id'
									name='employee_id'
									placeholder='Employee'
									label='Employee'
									type='text'
                                    disabled={true}
									value={values.selectEmployee?.value?.name}
									onChange={handleChange}
									withLabel={true}
									className='bg-white border border-blue-300 text-gray-900 sm:text-sm rounded-lg block w-full p-2.5 outline-blue-600'
								/>
							</div>
							<div className='w-full'>
								<Input
									id='username'
									name='username'
									placeholder='Username'
									label='Username'
									type='text'
									value={values.username}
									onChange={handleChange}
									withLabel={true}
									className='bg-white border border-blue-300 text-gray-900 sm:text-sm rounded-lg block w-full p-2.5 outline-blue-600'
								/>
								{errors.username && touched.username ? (
									<span className='text-red-500 text-xs'>
										{errors.username}
									</span>
								) : null}
							</div>
							<div className='w-full'>
								<Input
									id='email'
									name='email'
									placeholder='Email'
									label='Email'
									type='text'
									value={values.email}
									onChange={handleChange}
									withLabel={true}
									className='bg-white border border-blue-300 text-gray-900 sm:text-sm rounded-lg block w-full p-2.5 outline-blue-600'
								/>
							</div>
							<div className='w-full'>
								<Dropdown
									datas={listRole}
									id='role'
									name='role'
									placeholder='Role'
									label='Role'
									value={values.selectRole}
									onChange={(input: any) => {
										setFieldValue("role", input.label);
									}}
									menuPlacement='bottom'
									isMulti={false}
									required={true}
									withLabel={true}
									className='bg-white border border-primary-300 text-gray-900 sm:text-sm rounded-lg block w-full outline-primary-600'
								/>
								{errors.role && touched.role ? (
									<span className='text-red-500 text-xs'>{errors.role}</span>
								) : null}
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
										Edit
									</p>
								) : (
									<p className='flex mx-auto'>
										<FiPlus color='white' size={22} className='py-auto mr-2' />
										Edit
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
