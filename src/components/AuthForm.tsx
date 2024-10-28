import React, { useState } from "react";
import { useFormik, FormikHelpers } from "formik";
import * as Yup from "yup";
import { auth } from "../firebase";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";

interface FormValues {
    email: string;
    password: string;
}

interface AuthFormProps {
    onSuccess: () => void; // Add onSuccess prop to trigger form close on successful login/signup
}

const validationSchema = Yup.object({
    email: Yup.string().email("Invalid email format").required("Required"),
    password: Yup.string()
        .min(8, "Password must be at least 8 characters")
        .required("Required"),
});

const AuthForm: React.FC<AuthFormProps> = ({ onSuccess }) => {
    const [isSignUpMode, setIsSignUpMode] = useState<boolean>(true);

    const formik = useFormik<FormValues>({
        initialValues: {
            email: "",
            password: "",
        },
        validationSchema: validationSchema,
        onSubmit: async (values: FormValues, { setSubmitting, setErrors }: FormikHelpers<FormValues>) => {
            try {
                if (isSignUpMode) {
                    await createUserWithEmailAndPassword(auth, values.email, values.password);
                    alert("Sign-up successful!");
                } else {
                    await signInWithEmailAndPassword(auth, values.email, values.password);
                    alert("Login successful!");
                }
                onSuccess(); // Call onSuccess to close the form
            } catch (error) {
                if (error instanceof Error) {
                    setErrors({ email: error.message });
                }
            } finally {
                setSubmitting(false);
            }
        },
    });

    const toggleMode = () => {
        setIsSignUpMode(prev => !prev);
        formik.resetForm(); // Reset the form when switching modes
    };

    return (
        <div className="max-w-xs mx-auto p-2 bg-white rounded-lg">
            <h2 className="text-2xl font-bold text-center mb-4">
                {isSignUpMode ? "Sign Up" : "Login"}
            </h2>
            <form onSubmit={formik.handleSubmit} className="flex flex-col gap-4">
                <div>
                    <label htmlFor="email" className="block mb-2 text-gray-700 font-semibold">Email</label>
                    <input
                        type="email"
                        name="email"
                        id="email"
                        placeholder="Email"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.email}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm text-black"
                    />
                    {formik.touched.email && formik.errors.email && (
                        <div className="text-red-500 text-sm mt-1">{formik.errors.email}</div>
                    )}
                </div>
                <div>
                    <label htmlFor="password" className="block mb-2 text-gray-700 font-semibold">Password</label>
                    <input
                        type="password"
                        name="password"
                        id="password"
                        placeholder="Password"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.password}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm text-black"
                    />
                    {formik.touched.password && formik.errors.password && (
                        <div className="text-red-500 text-sm mt-1">{formik.errors.password}</div>
                    )}
                </div>
                <button
                    type="submit"
                    className="py-2 px-4 font-semibold rounded-lg shadow-md bg-indigo-500 text-white mt-4 hover:bg-indigo-600 transition duration-200 ease-in-out"
                    disabled={formik.isSubmitting}
                >
                    {formik.isSubmitting ? "Submitting..." : isSignUpMode ? "Sign Up" : "Login"}
                </button>
            </form>
            <button
                onClick={toggleMode}
                className="mt-4 text-indigo-500 hover:underline text-sm"
            >
                {isSignUpMode ? "Already have an account? Login" : "Don't have an account? Sign Up"}
            </button>
        </div>
    );
};

export default AuthForm;
