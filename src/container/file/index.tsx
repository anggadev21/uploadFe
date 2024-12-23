import { useEffect, useState } from "react";
import {
	Button,
	Dropdown,
	Header,
	Modal,
	ModalDelete,
	Pagination,
	Search,
	Table,
	Title,
} from "@/components";
import { DeleteFile, GetFile, GetUser } from "@/service";
import {
	FiDownload,
	FiEdit,
	FiEye,
	FiFile,
	FiTrash2,
	FiUpload,
} from "react-icons/fi";
import { headerTabelFile } from "@/constant";
import { AiOutlineLoading } from "react-icons/ai";
import { getRole, getUserId, size, ToastNotif } from "@/util";
import moment from "moment";
import { ViewFile } from "./view";
import { UploadFile } from "./upload";
import { EditFile } from "./edit";

export const FilePage = () => {
	const [isModal, setIsModal] = useState<boolean>(false);
	const [loading, setLoading] = useState<boolean>(true);
	const [page, setPage] = useState<number>(1);
	const [perpage] = useState<number>(10);
	const [totalPage, setTotalPage] = useState<number>(1);
	const [count, setCount] = useState<number>(0);
	const [modalContent, setModalContent] = useState<string>("add");
	const [dataSelected, setDataSelected] = useState<any>([]);
	const [listUser, setListUser] = useState<any>([]);
	const [search, setSearch] = useState<string>("");
	const [userId, setUserId] = useState<string>("");
	const [role, setRole] = useState<string>("");
	const [data, setData] = useState<any>([]);

	useEffect(() => {
		let user_id = getUserId();
		let role = getRole();
		if (user_id) {
			setUserId(user_id);
		}
		if (role) {
			setRole(role);
		}
		getFile(page, perpage, search);
		getUser();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	const showModal = (val: boolean, content: string, reload: boolean) => {
		setIsModal(val);
		setModalContent(content);
		if (reload) {
			getFile(page, perpage, search);
		}
	};

	const getUser = async () => {
		try {
			const users = await GetUser(undefined, undefined, "");
			if (users.data.statusCode === 200) {
				let list: any = [
					{
						label: "All",
						value: "",
					},
				];
				users.data.payload.data?.map((res: any) => {
					list.push({
						label: res?.employee?.name,
						value: res?.employee?.name,
					});
				});
				setListUser(list);
			} else {
				setListUser([]);
			}
		} catch (e: any) {
			setListUser([]);
		}
	};

	const getFile = async (page: number, perpage: number, search: string) => {
		setLoading(true);
		try {
			const files = await GetFile(page, perpage, search);
			if (files.data.statusCode === 200) {
				setData(files.data.payload.data);
				setCount(files.data.payload.total_data);
				setTotalPage(Math.ceil(files.data.payload.total_data / perpage));
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

	const deleteFile = async (id: string, file_id: string) => {
		setIsModal(true);
		try {
			const response = await DeleteFile(id, file_id);
			if (response.data) {
				getFile(page, perpage, search);
				ToastNotif("success", "Delete file Success");
			}
		} catch (error) {
			ToastNotif("error", "Delete file Failed");
		}
		setIsModal(false);
	};

	return (
		<div className='h-full w-full'>
			<Header />
			<Title
				title='File'
				icon={<FiFile size={42} />}
				total={count}
				withCount={true}
			/>
			<div className='bg-white rounded-lg p-4'>
				<div className='md:flex md:justify-center md:space-x-1 py-2'>
					<div className='w-[70%]'>
						{role === "Admin" ? (
							<Dropdown
								datas={listUser}
								id='search'
								name='search'
								placeholder='Search'
								label='Search'
								onChange={(e: any) => {
									getFile(page, perpage, e.value);
								}}
								menuPlacement='bottom'
								isMulti={false}
								required={true}
								withLabel={false}
								className='bg-white border border-primary-300 text-gray-900 sm:text-sm rounded-lg block w-full outline-primary-600'
							/>
						) : (
							<Search
								search='Search'
								onChange={(e) => {
									setSearch(e.target.value);
									getFile(page, perpage, e.target.value);
								}}
							/>
						)}
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
								<FiUpload color='white' size={22} className='py-auto mr-2' />
								Upload File
							</p>
						</Button>
					</div>
				</div>
				<Table header={headerTabelFile}>
					{loading ? (
						<tr className='border-b transition duration-300 ease-in-out hover:bg-gray-200'>
							<td
								colSpan={headerTabelFile?.length}
								className='whitespace-nowrap px-6 py-4 text-center text-lg'
							>
								<AiOutlineLoading
									size={40}
									className='animate-spin h-auto mx-auto'
								/>
							</td>
						</tr>
					) : data.length === 0 ? (
						<tr className='border-b transition duration-300 ease-in-out hover:bg-gray-200'>
							<td
								colSpan={headerTabelFile?.length}
								className='whitespace-nowrap px-6 py-4 text-center text-lg'
							>
								No Data
							</td>
						</tr>
					) : (
						data?.map((res: any, i: number) => {
							return (
								<tr
									className='border-b transition duration-300 ease-in-out hover:bg-gray-200 text-md'
									key={i}
								>
									<td className='p-1 whitespace-nowrap'>{res?.file?.name}</td>
									<td className='p-1 whitespace-nowrap'>{res?.file?.type}</td>
									<td className='whitespace-nowrap p-1'>
										{size(res?.file?.size)}
									</td>
									<td className='whitespace-nowrap p-1'>
										{res?.file?.created_by?.employee?.name}
									</td>
									<td className='whitespace-nowrap p-1'>
										{moment(res?.file?.created_at).format("DD-MMMM-YYYY")}
									</td>
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
											className='bg-blue-500 hover:bg-blue-700 hover:scale-110 text-white p-1 rounded-md'
											onClick={() =>
												window.open(
													`https://drive.usercontent.google.com/u/0/uc?id=${res?.file?.file_id}&export=download`,
													"_blank"
												)
											}
										>
											<FiDownload color='white' size={20} />
										</Button>
										{res?.file?.user_id === userId ? (
											<>
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
											</>
										) : null}
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
							getFile(value, perpage, search);
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
					onDelete={deleteFile}
				/>
			) : (
				<Modal
					title='File'
					isModal={isModal}
					content={modalContent}
					showModal={showModal}
				>
					{modalContent === "view" ? (
						<ViewFile dataSelected={dataSelected} />
					) : modalContent === "add" ? (
						<UploadFile content={modalContent} showModal={showModal} />
					) : (
						<EditFile content={modalContent} showModal={showModal} dataSelected={dataSelected}/>
					)}
				</Modal>
			)}
		</div>
	);
};
