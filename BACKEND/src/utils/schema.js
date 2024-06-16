import * as yup from "yup";
export const userSchema = yup.object().shape({
    email:yup.string().email().required(),
    password:yup.string().min(6).required(),
    confirmPassword:yup.string().min(6).required(),

});
export const loginSchema = yup.object().shape({
    email:yup.string().email().required(),
    password:yup.string().min(6).required(),
})

export const employeeSchema = yup.object().shape({
    firstName:yup.string().required(),
    lastName: yup.string().required(),
    nationalId:yup.string().min(16).required(),
    telephone: yup.string().required(),
    email:yup.string().email().required(),
    department:yup.string().required(),
    position: yup.string().required(),
    laptopManufacturer:yup.string().required(),
    model:yup.string().required(),
    serialNumber:yup.string().required()

})