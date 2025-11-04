import { experience } from "@/Data/Experience";
import * as Yup from "yup";

export const StepOneSchema = Yup.object({
    name: Yup.string().min(3).max(25).required("The name field is required."),
    email: Yup.string().email().required("The email field is required."),
    phone_no: Yup.number()
        .typeError("Phone number is not valid.")
        .required("The phone number field is required"),
    date_of_birth: Yup.string().required("The date of birth is required"),
    cnic: Yup.number().required("Cnic is required."),
});

export const StepTwoSchema = Yup.object({
    mechanic_type_id: Yup.number().required("The mechanic type is required"),
    years_of_experience: Yup.string().required("Experience is required."),
    skills: Yup.array()
        .min(1, "Select at least one skill.")
        .required("Skills is required."),
    work_shop_name: Yup.string().required("Work shop name is required."),
    work_shop_address: Yup.string().required("Work shop address is required."),
    area: Yup.string().required("Area field is required."),
    city: Yup.string().required("City filed is required."),
});
