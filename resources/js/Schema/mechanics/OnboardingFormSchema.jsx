import * as Yup from "yup";

export const StepOneSchema = Yup.object({
    name: Yup.string().min(3).max(25).required("The name field is required."),
    email: Yup.string().email().required("The email field is required."),
    phone_no: Yup.number()
        .typeError("Phone number is not valid.")
        .required("The phone number field is required"),
    date_of_birth: Yup.string().required("The date of birth is required"),
    address: Yup.string().required("Address filed is required"),
    area: Yup.string().required("Area field is required"),
    city: Yup.string().required("City filed is required"),
});
