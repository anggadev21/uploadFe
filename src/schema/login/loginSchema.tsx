import * as yup from "yup";

const loginSchema = yup.object().shape({
	username: yup.string().required("username cannot be empty"),
	password: yup.string().required("password cannot be empty"),
});

export { loginSchema }