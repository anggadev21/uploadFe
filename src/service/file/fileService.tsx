import { Axios } from '@/util';

export const GetFile = (page: any, perpage: any, search: string) => Axios.get(process.env.BASE_URL+`/file?page=${page}&&perpage=${perpage}${search ? `&&search=${search}` : ''}`);
export const CreateFile = (data: any) => Axios.post(process.env.BASE_URL+`/file`, data);
export const GetFileById = (id:string) => Axios.get(process.env.BASE_URL+`/file/${id}`);
export const DeleteFile = (id:string, file_id: string) => Axios.delete(process.env.BASE_URL+`/file/${id}/${file_id}`);
export const EditFileById = (data:any, id: string) => Axios.put(process.env.BASE_URL+`/file/${id}`, data);