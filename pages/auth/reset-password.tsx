import { useState } from "react";
import { useRouter } from "next/router";
import { sendPasswordResetEmail, getAuth } from "firebase/auth";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { auth } from "@/lib/firebase";
import { Wrapper } from "@/components/Wrapper";
import Link from "next/link";
import { toast } from "react-toastify";

const ResetPassword = () => {
  const router = useRouter();
  const [error, setError] = useState(null);

  const initialValues = {
    email: "",
  };

  const validationSchema = Yup.object({
    email: Yup.string()
      .email("Invalid email address")
      .required("Email is required"),
  });

  return (
    <Wrapper>
      <div className="max-w-sm mx-auto pb-6">
        <div className="bg-blue-50 px-6 p-6 rounded-lg">
          <div className="pb-4">
            <h2 className="text-l font-bold text-primary tracking-tight">
              Reset Password
            </h2>
            <p className="text-sm text-gray-600">
              Enter your email to reset your password
            </p>
          </div>
          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={(values, { setSubmitting, resetForm }) => {
              setError(null);
              setSubmitting(true);
              // toast in loading state
              const toastId = toast.loading("Sending password reset email");
              // send password reset email with Firebase
              sendPasswordResetEmail(auth, values.email)
                .then(() => {
                  toast.update(toastId, {
                    render: "Password reset email sent",
                    type: "success",
                    isLoading: false,
                  });
                  console.log("Success. Password reset email sent");
                  setTimeout(() => {
                    router.push("/auth/login");
                  }, 1000); // Redirect to "/auth/login" after 1 second
                })
                .catch((error) => {
                  toast.update(toastId, {
                    render: "Error sending password reset email",
                    type: "error",
                    isLoading: false,
                  });
                  setError(error.message);
                })
                .finally(() => {
                  resetForm();
                  setSubmitting(false);
                  // wait 5 seconds then dismiss the toast
                  setTimeout(() => {
                    toast.dismiss(toastId);
                  }, 5000);
                });
            }}
          >
            <Form>
              {error && <div className="text-red-500 mb-4">{error}</div>}
              <div className="mb-5">
                <label
                  htmlFor="resetPasswordEmail"
                  className="block text-xs text-gray-600"
                >
                  Email
                </label>
                <Field
                  type="email"
                  name="email"
                  id="resetPasswordEmail"
                  placeholder="Email"
                  className="border border-gray-300 rounded px-2 py-1 w-full"
                />
                <ErrorMessage
                  name="email"
                  component="div"
                  className="text-xs text-red-700 absolute"
                />
              </div>
              <div className="mt-8">
                <button
                  className="text-xs border border-black rounded px-4 py-2 mr-auto w-full"
                  type="submit"
                >
                  Reset Password
                </button>
              </div>
            </Form>
          </Formik>
          <div className="border-t border-gray-900 mt-4 mb-1"></div>
          <Link href="/auth/login">
            <p className="text-gray-700 hover:underline text-xs hover:text-gray-500">
              Remember your password? Log in
            </p>
          </Link>
        </div>
      </div>
    </Wrapper>
  );
};

export default ResetPassword;
