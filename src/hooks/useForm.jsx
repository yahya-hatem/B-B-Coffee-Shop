import { useState } from "react";

function useForm(initialValues) {
    const [values, setValues] = useState(initialValues);
    const [errors, setErrors] = useState({});
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [success, setSuccess] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;

        setValues((prev) => ({
            ...prev,
            [name]: value,
        }));

        setErrors((prev) => ({
            ...prev,
            [name]: "",
        }));

        setSuccess(false);
    };

    const validate = () => {
        const newErrors = {};

        if (!values.fullName?.trim()) {
            newErrors.fullName = "Full Name is required";
        }

        if (!values.email?.trim()) {
            newErrors.email = "Email is required";
        } else if (
            !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email)
        ) {
            newErrors.email = "Please enter a valid email";
        }

        if (!values.password?.trim()) {
            newErrors.password = "Password is required";
        }

        if (!values.phone?.trim()) {
            newErrors.phone = "Phone Number is required";
        }

        if (!values.message?.trim()) {
            newErrors.message = "Message is required";
        }

        setErrors(newErrors);

        return Object.keys(newErrors).length === 0;
    };

    return {
        values,
        errors,
        isSubmitting,
        setIsSubmitting,
        success,
        setSuccess,
        handleChange,
        validate,
    };
}

export default useForm;