"use client"

import { useEffect, useState } from "react";
import {
	Button,
	Header,
	Modal,
	ModalDelete,
	Pagination,
	Search,
	Table,
	Title,
} from "@/components";
import { DeleteEmployee, GetEmployee } from "@/service";
import {
	FiEdit,
	FiEye,
	FiTrash2,
    FiUser,
    FiUserPlus,
} from "react-icons/fi";
import { headerTabelEmployee } from "@/constant";
import { AiOutlineLoading } from "react-icons/ai";
import { getUserId, ToastNotif } from "@/util";
import { ViewEmployee } from "./view";
import { AddEmployee } from "./create";
import { EditEmployee } from "./edit";

export const EmployeePage = () => {
	const [isModal, setIsModal] = useState<boolean>(false);
	const [loading, setLoading] = useState<boolean>(true);
	const [page, setPage] = useState<number>(1);
	const [perpage] = useState<number>(10);
	const [totalPage, setTotalPage] = useState<number>(1);
	const [count, setCount] = useState<number>(0);
	const [modalContent, setModalContent] = useState<string>("add");
	const [dataSelected, setDataSelected] = useState<any>([]);
	const [search, setSearch] = useState<string>("");
	const [userId, setUserId] = useState<string>("");
	const [data, setData] = useState<any>([]);

	useEffect(() => {
		let user_id = getUserId();
		if (user_id) {
			setUserId(user_id);
		}
		getEmployee(page, perpage, search);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	const showModal = (val: boolean, content: string, reload: boolean) => {
		setIsModal(val);
		setModalContent(content);
		if (reload) {
			getEmployee(page, perpage, search);
		}
	};

	const getEmployee = async (page: number, perpage: number, search: string) => {
		setLoading(true);
		try {
			const employees = await GetEmployee(page, perpage, search, false);
			if (employees.data.statusCode === 200) {
				setData(employees.data.payload.data);
				setCount(employees.data.payload.total_data);
				setTotalPage(Math.ceil(employees.data.payload.total_data / perpage));
			} else {
				setData([]);
				setCount(0);
			}
		} catch (e: any) {
			setData([]);
			setCount(0);
		}
		setLoading(false);
	};

	const deleteEmployee = async (id: string) => {
		setIsModal(true);
		try {
			const response = await DeleteEmployee(id);
			if (response.data) {
				getEmployee(page, perpage, search);
				ToastNotif("success", "Delete employee Success");
			}
		} catch (error) {
			ToastNotif("error", "Delete employee Failed");
		}
		setIsModal(false);
	};

	return (
		<div className='h-full w-full'>
			<Header />
			<Title
				title='Employee'
				icon={<FiUser size={42} />}
				total={count}
				withCount={true}
			/>
			<div className='bg-white rounded-lg p-4'>
				<div className='md:flex md:justify-center md:space-x-1 py-2'>
					<div className='w-[70%]'>
						<Search
							search='Search'
							onChange={(e) => {
								setSearch(e.target.value);
								getEmployee(page, perpage, e.target.value);
							}}
						/>
					</div>
					<div className='w-[30%] flex justify-center'>
						<Button
							type='button'
							className='flex bg-blue-500 hover:bg-blue-700 hover:scale-105 text-white w-[95%] p-1 rounded-md py-2'
							onClick={() => {
								setIsModal(true);
								setModalContent("add");
							}}
						>
							<p className='flex mx-auto'>
								<FiUserPlus color='white' size={22} className='py-auto mr-2' />
								Add Employee
							</p>
						</Button>
					</div>
				</div>
				<Table header={headerTabelEmployee}>
					{loading ? (
						<tr className='border-b hover:bg-gray-200'>
							<td
								colSpan={headerTabelEmployee?.length}
								className='whitespace-nowrap px-6 py-4 text-center text-lg'
							>
								<AiOutlineLoading
									size={40}
									className='animate-spin h-auto mx-auto'
								/>
							</td>
						</tr>
					) : data.length === 0 ? (
						<tr className='border-b  hover:bg-gray-200'>
							<td
								colSpan={headerTabelEmployee?.length}
								className='whitespace-nowrap px-6 py-4 text-center text-lg'
							>
								No Data
							</td>
						</tr>
					) : (
						data?.map((res: any, i: number) => {
							return (
								<tr
									className='border-b hover:bg-gray-200 text-md'
									key={i}
								>
									<td className='p-'>{res?.name}</td>
									<td className='p-1'>{res?.nik}</td>
									<td className='p-1'>{res?.divisi}</td>
									<td className='p-1'>{res?.position}</td>
									<td className='p-1 text-center space-x-2 flex justify-center'>
										<Button
											type='button'
											className='bg-green-500 hover:bg-green-700 hover:scale-110 text-white p-1 rounded-md'
											onClick={() => {
												setIsModal(true);
												setModalContent("view");
												setDataSelected(res);
											}}
										>
											<FiEye color='white' size={20} />
										</Button>
										<Button
											type='button'
											className='bg-orange-500 hover:bg-orange-700 hover:scale-110 text-white p-1 rounded-md'
											onClick={() => {
												setIsModal(true);
												setModalContent("edit");
												setDataSelected(res);
											}}
										>
											<FiEdit color='white' size={20} />
										</Button>
										<Button
											type='button'
											className='bg-red-500 hover:bg-red-700 hover:scale-110 text-white p-1 rounded-md'
											onClick={() => {
												setDataSelected(res);
												setModalContent("delete");
												setIsModal(true);
											}}
										>
											<FiTrash2 color='white' size={20} />
										</Button>
									</td>
								</tr>
							);
						})
					)}
				</Table>
				{totalPage > 1 ? (
					<Pagination
						currentPage={page}
						pageSize={perpage}
						siblingCount={1}
						totalCount={count}
						onChangePage={(value: any) => {
							setPage(value);
							getEmployee(value, perpage, search);
						}}
					/>
				) : null}
			</div>
			{modalContent === "delete" ? (
				<ModalDelete
					data={dataSelected}
					isModal={isModal}
					content={modalContent}
					showModal={showModal}
					onDelete={deleteEmployee}
				/>
			) : (
				<Modal
					title='Employee'
					isModal={isModal}
					content={modalContent}
					showModal={showModal}
				>
					{modalContent === "view" ? (
						<ViewEmployee dataSelected={dataSelected} />
					) :
					modalContent === "add" ? (
						<AddEmployee content={modalContent} showModal={showModal} />
					) : (
						<EditEmployee content={modalContent} showModal={showModal} dataSelected={dataSelected}/>
					)}
				</Modal>
			)}
		</div>
	);
};
