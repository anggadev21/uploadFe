import Cookies from 'js-cookie';
import { iSession } from '@/interface';

export const token = (data: iSession) => {
    Cookies.set('token', data.token);
    Cookies.set('role', data.role);
    Cookies.set('name', data.name);
    Cookies.set('user_id', data.id);
}

export const getToken = () => {
    const token: string | undefined = Cookies.get('token');
    return token
}

export const getRole = () => {
    const role: string | undefined = Cookies.get('role');
    return role
}

export const getUserId = () => {
    const id: string | undefined = Cookies.get('user_id');
    return id
}

export const getName = () => {
    const name: string | undefined = Cookies.get('name');
    return name
}

export const removeToken = () => {
    Cookies.remove('token');
    Cookies.remove('role');
    Cookies.remove('name');
    Cookies.remove('user_id');
}