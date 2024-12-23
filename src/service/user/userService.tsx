import { Axios } from '@/util';

export const GetUser = (page: any, perpage: any, search: string) => Axios.get(process.env.BASE_URL+`/user?${page ? `page=${page}&&perpage=${perpage}` : ''}${search ? `&&search=${search}` : ''}`);
export const CreateUser = (data: any) => Axios.post(process.env.BASE_URL+`/user`, data);
export const EditUserById = (data:any, id: string) => Axios.put(process.env.BASE_URL+`/user/${id}`, data);