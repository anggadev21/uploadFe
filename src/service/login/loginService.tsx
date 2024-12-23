import { Axios } from '@/util';
import { iLogin } from '@/interface';

export const Login = (data: any) => Axios.post(process.env.BASE_URL+`/login`, data);
export const Logout = () => Axios.post(process.env.BASE_URL+`/logout`);