import * as yup from "yup";

const fileSchema = yup.object().shape({
    file: yup.string().required("file cannot be empty"),
    user_id: yup.array().nonNullable(),
});

export { fileSchema }