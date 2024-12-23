import * as yup from "yup";

const employeeSchema = yup.object().shape({
    name: yup.string().required("name cannot be empty"),
    nik: yup.string().nullable(),
    divisi: yup.string().nullable(),
    position: yup.string().nullable(),
});

export { employeeSchema }