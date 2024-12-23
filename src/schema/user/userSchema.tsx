import * as yup from "yup";

const userSchema = yup.object().shape({
    employee_id: yup.string().required("employee cannot be empty"),
    username: yup.string().required("username cannot be empty"),
    email: yup.string().nullable(),
    password: yup.string().nullable(),
    role: yup.string().required("role cannot be empty"),
});

export { userSchema }