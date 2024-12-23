import { Axios } from '@/util';

export const GetEmployee = (page: any, perpage: any, search: string, isUser: boolean) => Axios.get(process.env.BASE_URL+`/employee?${page ? `page=${page}&&perpage=${perpage}` : ''}${search ? `&&search=${search}` : ''}${isUser && page ? `&&isUser=true` : isUser ? `isUser=true` : ''}`);
export const CreateEmployee = (data: any) => Axios.post(process.env.BASE_URL+`/employee`, data);
export const EditEmployeeById = (data:any, id: string) => Axios.put(process.env.BASE_URL+`/employee/${id}`, data);
export const GetEmployeeById = (id:string) => Axios.get(process.env.BASE_URL+`/employee/${id}`);
export const DeleteEmployee = (id:string) => Axios.delete(process.env.BASE_URL+`/employee/${id}`);