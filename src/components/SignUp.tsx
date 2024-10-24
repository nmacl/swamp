import React, { useState } from "react";
import { useFormik, FormikHelpers } from "formik";
import * as Yup from "yup";
import { auth } from "../firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";

interface FormValues {
    email: string;
    password: string;
}

const validationSchema = Yup.object({
    email: Yup.string().email("Invalid email format").required("Required"),
    password: Yup.string()
        .min(8, "Password must be at least 8 characters")
        .required("Required"),
});

const SignUp: React.FC = () => {
    const [additionalMessage, setAdditionalMessage] = useState<string>("");

    const formik = useFormik<FormValues>({
        initialValues: {
            email: "",
            password: "",
        },
        validationSchema: validationSchema,
        onSubmit: async (values: FormValues, { setSubmitting, setErrors }: FormikHelpers<FormValues>) => {
            try {
                await createUserWithEmailAndPassword(auth, values.email, values.password);
                alert("Sign-up successful!");
            } catch (error: unknown) {
                if (error instanceof Error) {
                    setErrors({ email: error.message });
                }
            } finally {
                setSubmitting(false);
            }
        },
    });
    
    return (
        <div style={{ maxWidth: "300px", margin: "auto", textAlign: "center" }}>
            <form onSubmit={formik.handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
                <div>
                    <label htmlFor="email" style={{ display: "block", marginBottom: "8px" }}>Email</label>
                    <input
                        type="email"
                        name="email"
                        id="email"
                        placeholder="Email"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.email}
                        style={{ width: "100%", padding: "8px", borderRadius: "4px", border: "1px solid #ccc" }}
                        className="text-black"
                    />
                    {formik.touched.email && formik.errors.email && (
                        <div style={{ color: "red", fontSize: "12px", marginTop: "4px" }}>{formik.errors.email}</div>
                    )}
                </div>
                <div>
                    <label htmlFor="password" style={{ display: "block", marginBottom: "8px" }}>Password</label>
                    <input
                        type="password"
                        name="password"
                        id="password"
                        placeholder="Password"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.password}
                        style={{ width: "100%", padding: "8px", borderRadius: "4px", border: "1px solid #ccc" }}
                        className="text-black"
                    />
                    {formik.touched.password && formik.errors.password && (
                        <div style={{ color: "red", fontSize: "12px", marginTop: "4px" }}>{formik.errors.password}</div>
                    )}
                </div>
                <button type="submit" disabled={formik.isSubmitting} style={{ padding: "10px", borderRadius: "4px", border: "none", backgroundColor: "#4285f4", color: "white", fontWeight: "bold" }}>
                    {formik.isSubmitting ? "Submitting..." : "Sign Up"}
                </button>
            </form>
        </div>
    );
};

export default SignUp;
