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
import { DeleteEmployee, GetUser } from "@/service";
import {
    FiEdit,
    FiEye,
    FiFile,
    FiTrash2,
    FiUpload,
    FiUser,
    FiUserPlus,
} from "react-icons/fi";
import { headerTabelUser } from "@/constant";
import { AiOutlineLoading } from "react-icons/ai";
import { ToastNotif } from "@/util";
import { ViewUser } from "./view";
import { AddUser } from "./create";
import { EditUser } from "./edit";

export const UserPage = () => {
    const [isModal, setIsModal] = useState<boolean>(false);
    const [loading, setLoading] = useState<boolean>(true);
    const [page, setPage] = useState<number>(1);
    const [perpage] = useState<number>(10);
    const [totalPage, setTotalPage] = useState<number>(1);
    const [count, setCount] = useState<number>(0);
    const [modalContent, setModalContent] = useState<string>("add");
    const [dataSelected, setDataSelected] = useState<any>([]);
    const [search, setSearch] = useState<string>("");
    const [data, setData] = useState<any>([]);

    useEffect(() => {
        getUser(page, perpage, search);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const showModal = (val: boolean, content: string, reload: boolean) => {
        setIsModal(val);
        setModalContent(content);
        if (reload) {
            getUser(page, perpage, search);
        }
    };

    const getUser = async (page: number, perpage: number, search: string) => {
        setLoading(true);
        try {
            const users = await GetUser(page, perpage, search);
            if (users.data.statusCode === 200) {
                setData(users.data.payload.data);
                setCount(users.data.payload.total_data);
                setTotalPage(Math.ceil(users.data.payload.total_data / perpage));
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

    const deleteUser = async (id: string) => {
        setIsModal(true);
        try {
            const response = await DeleteEmployee(id);
            if (response.data) {
                getUser(page, perpage, search);
                ToastNotif("success", "Delete user Success");
            }
        } catch (error) {
            ToastNotif("error", "Delete user Failed");
        }
        setIsModal(false);
    };

    return (
        <div className='h-full w-full'>
            <Header />
            <Title
                title='User'
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
                                getUser(page, perpage, e.target.value);
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
                                Add User
                            </p>
                        </Button>
                    </div>
                </div>
                <Table header={headerTabelUser}>
                    {loading ? (
                        <tr className='border-b transition duration-300 ease-in-out hover:bg-gray-200'>
                            <td
                                colSpan={headerTabelUser?.length}
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
                                colSpan={headerTabelUser?.length}
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
                                    <td className='p-1'>{res?.username}</td>
                                    <td className='p-1 whitespace-nowrap'>{res?.employee?.name}</td>
                                    <td className='p-1'>{res?.employee?.divisi}</td>
                                    <td className='p-1'>{res?.employee?.position}</td>
                                    <td className='p-1'>{res?.role}</td>
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
                            getUser(value, perpage, search);
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
                    onDelete={deleteUser}
                />
            ) : (
                <Modal
                    title='User'
                    isModal={isModal}
                    content={modalContent}
                    showModal={showModal}
                >
                    {modalContent === "view" ? (
                        <ViewUser dataSelected={dataSelected} />
                    ) :
                    modalContent === "add" ? (
                        <AddUser content={modalContent} showModal={showModal} />
                    ) : (
                        <EditUser content={modalContent} showModal={showModal} dataSelected={dataSelected}/>
                    )}
                </Modal>
            )}
        </div>
    );
};
