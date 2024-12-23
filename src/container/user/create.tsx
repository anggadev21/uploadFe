"use client";

import { Form, Formik } from "formik";
import { userSchema } from "@/schema";
import { iUser } from "@/interface";
import { useEffect, useState } from "react";
import { Button, Dropdown, Input, InputWithIcon } from "@/components";
import { FiEye, FiEyeOff, FiPlus, FiX } from "react-icons/fi";
import { AiOutlineLoading } from "react-icons/ai";
import { CreateUser, GetEmployee } from "@/service";
import { ToastNotif } from "@/util";
import { listRole } from "@/constant";

interface props {
	content: string;
	showModal: (val: boolean, content: string, reload: boolean) => void;
}
export const AddUser = ({ content, showModal }: props) => {
	const [isLoading, setIsLoading] = useState<boolean>(false);
	const [typePassword, setTypePassword] = useState<string>("password");
	const [listEmployee, setListEmployee] = useState<any>([]);
	const [data] = useState<iUser>({
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
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	const showPassword = () => {
		if (typePassword === "password") {
			setTypePassword("text");
		} else {
			setTypePassword("password");
		}
	};

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

	const createUser = async (payload: any) => {
		setIsLoading(true);
		try {
			const response = await CreateUser(payload);
			if (response.data.statusCode === 200) {
				showModal(false, "add", true);
				ToastNotif("success", "Add user Success");
			} else {
				ToastNotif("error", response.data.error.message);
			}
		} catch (error) {
			ToastNotif("error", "Add user Failed");
		}
		setIsLoading(false);
	};

	return (
		<div className='px-5 pb-2 mt-4 overflow-auto'>
			<Formik
				initialValues={data}
				validationSchema={userSchema}
				onSubmit={(values) => {
					createUser(values);
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
								<Dropdown
									datas={listEmployee}
									id='employee_id'
									name='employee_id'
									placeholder='Employee'
									label='Employee'
									onChange={(input: any) => {
										setFieldValue("employee_id", input.value.id);
									}}
									menuPlacement='bottom'
									isMulti={false}
									required={true}
									withLabel={true}
									className='bg-white border border-primary-300 text-gray-900 sm:text-sm rounded-lg block w-full outline-primary-600'
								/>
								{errors.employee_id && touched.employee_id ? (
									<span className='text-red-500 text-xs'>
										{errors.employee_id}
									</span>
								) : null}
							</div>
							<div className='w-full'>
								<Input
									id='username'
									name='username'
									placeholder='Username'
									label='Username'
									type='text'
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
							<div className='relative mt-2'>
								<InputWithIcon
									disabled={isLoading ? true : false}
									type={typePassword}
									name='password'
									id='password'
									placeholder='Password'
									label='Password'
									withLabel={true}
									onChange={handleChange}
									className={`${
										errors.password && touched.password
											? "bg-white border border-red-500 text-gray-900 sm:text-sm rounded-lg block w-full p-2.5 pr-11 outline-red-600"
											: "bg-white border border-blue-300 text-gray-900 sm:text-sm rounded-lg block w-full p-2.5 pr-11 outline-blue-600"
									}`}
									classNameIcon='absolute inset-y-0 right-0 flex items-center pr-3 cursor-pointer'
									max=''
									icon={
										typePassword === "password" ? (
											<FiEye
												color='blue'
												size={28}
												className='hover:scale-110'
											/>
										) : (
											<FiEyeOff
												color='gray'
												size={28}
												className='hover:scale-110'
											/>
										)
									}
									onAction={showPassword}
								/>
								{errors.password && touched.password ? (
									<span className='text-red-500 text-xs'>
										{errors.password}
									</span>
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
										Add
									</p>
								) : (
									<p className='flex mx-auto'>
										<FiPlus color='white' size={22} className='py-auto mr-2' />
										Add
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
