"use client";

import { Button, Input, InputWithIcon } from "@/components";
import { Formik, Form } from "formik";
import { iLogin } from "@/interface";
import { useState } from "react";
import { loginSchema } from "@/schema";
import { AiOutlineLoading } from "react-icons/ai";
import { FiEye, FiEyeOff } from "react-icons/fi";
import { Login } from "@/service";
import { token } from "@/util";
import { useRouter } from "next/navigation";

export const LoginPage = () => {
	const router = useRouter();

	const [isLoading, setIsLoading] = useState<boolean>(false);
	const [isError, setIsError] = useState<boolean>(false);
	const [messageError, setMessageError] = useState<string>("");
	const [typePassword, setTypePassword] = useState<string>("password");
	const [data] = useState<iLogin>({
		username: "",
		password: "",
	});

	const showPassword = () => {
		if (typePassword === "password") {
			setTypePassword("text");
		} else {
			setTypePassword("password");
		}
	};

	const login = async (payload: any) => {
		setIsLoading(true);
		try {
			const response = await Login(payload);
			if (response.data.payload) {
				token(response.data.payload.data);
				if (response.data.payload.data.role === "Admin") {
					router.push("/dashboard");
				} else {
					router.push("/file");
				}
			} else {
				setMessageError(response.data.error.message);
				setIsError(true);
			}
		} catch (error: any) {
			setMessageError(error.message);
			setIsError(true);
		}
		setIsLoading(false);
	};

	return (
		<div className='flex flex-row min-h-screen justify-center items-center bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500'>
			<div className='bg-white p-4 w-1/4 h-auto rounded-lg shadow-lg shadow-gray-700 space-y-2'>
				<h3 className='text-center text-xl font-semibold'>Login</h3>
				<Formik
					initialValues={data}
					validationSchema={loginSchema}
					onSubmit={(values) => {
						login(values);
					}}
				>
					{({ handleChange, handleSubmit, errors, touched, values }) => (
						<Form>
							{isError ? (
								<span className='text-red-500 text-lg'>{messageError}</span>
							) : null}

							<div className='relative mt-2'>
								<Input
									disabled={isLoading ? true : false}
									type='text'
									name='username'
									id='username'
									placeholder='Username'
									withLabel={false}
									value={values.username}
									onChange={handleChange}
									className={`${
										errors.username && touched.username
											? "bg-white border border-red-500 text-gray-900 sm:text-sm rounded-lg block w-full p-2.5 outline-red-600"
											: "bg-white border border-blue-300 text-gray-900 sm:text-sm rounded-lg block w-full p-2.5 outline-blue-600"
									}`}
								/>
								{errors.username && touched.username ? (
									<span className='text-red-500 text-xs'>
										{errors.username}
									</span>
								) : null}
							</div>
							<div className='relative mt-2'>
								<InputWithIcon
									disabled={isLoading ? true : false}
									type={typePassword}
									name='password'
									id='password'
									placeholder='Password'
									withLabel={false}
									value={values.password}
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

							<div className='my-2'>
								<Button
									type='submit'
									onClick={() => handleSubmit()}
									disabled={isLoading}
									className={`w-full bg-green-500 py-2 rounded text-white font-semibold ${
										isLoading
											? "cursor-not-allowed"
											: "hover:scale-105 hover:bg-green-700 cursor-pointer"
									}`}
								>
									{isLoading ? (
										<>
											<AiOutlineLoading
												size={24}
												className='animate-spin h-auto mx-auto'
											/>
										</>
									) : (
										"Login"
									)}
								</Button>
							</div>
						</Form>
					)}
				</Formik>
			</div>
		</div>
	);
};
