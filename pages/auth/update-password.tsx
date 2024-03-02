import { useState } from "react";
import { useRouter } from "next/router";
import { confirmPasswordReset } from "firebase/auth";
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
    password: "",
    confirmPassword: "",
  };

  const validationSchema = Yup.object({
    password: Yup.string()
      .required("Password is required")
      .min(6, "Password must be at least 6 characters long"),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref("password")], "Passwords must match")
      .required("Confirm Password is required"),
  });

  return (
    <Wrapper>
      <div className="max-w-sm mx-auto pb-6">
        <div className="bg-blue-50 px-6 p-6 rounded-lg">
          <div className="pb-4">
            <h2 className="text-l font-bold text-primary tracking-tight">
              Reset Password
            </h2>
            <p className="text-sm text-gray-600">Enter your new password</p>
          </div>
          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={async (values, { setSubmitting, resetForm }) => {
              setError(null);
              setSubmitting(true);
              // toast in loading state
              const toastId = toast.loading("Resetting password");
              // read oobCode from the URL
              const oobCode = new URLSearchParams(window.location.search).get(
                "oobCode",
              );
              try {
                if (!oobCode) {
                  throw new Error("Invalid reset link");
                }
                // confirm password reset with Firebase
                await confirmPasswordReset(auth, oobCode, values.password);
                toast.update(toastId, {
                  render: "Password reset successful",
                  type: "success",
                  isLoading: false,
                });
                console.log("Success. Password reset successful");
                setTimeout(() => {
                  router.push("/auth/login");
                }, 1000); // Redirect to "/auth/login" after 1 second
              } catch (error) {
                toast.update(toastId, {
                  render: "Error resetting password",
                  type: "error",
                  isLoading: false,
                });
              } finally {
                resetForm();
                setSubmitting(false);
                // wait 5 seconds then dismiss the toast
                setTimeout(() => {
                  toast.dismiss(toastId);
                }, 5000);
              }
            }}
          >
            <Form>
              {error && <div className="text-red-500 mb-4">{error}</div>}
              <div className="mb-5">
                <label
                  htmlFor="resetPassword"
                  className="block text-xs text-gray-600"
                >
                  New Password
                </label>
                <Field
                  type="password"
                  name="password"
                  id="resetPassword"
                  placeholder="New Password"
                  className="border border-gray-300 rounded px-2 py-1 w-full"
                />
                <ErrorMessage
                  name="password"
                  component="div"
                  className="text-xs text-red-700 absolute"
                />
              </div>
              <div className="mb-5">
                <label
                  htmlFor="confirmPassword"
                  className="block text-xs text-gray-600"
                >
                  Confirm Password
                </label>
                <Field
                  type="password"
                  name="confirmPassword"
                  id="confirmPassword"
                  placeholder="Confirm Password"
                  className="border border-gray-300 rounded px-2 py-1 w-full"
                />
                <ErrorMessage
                  name="confirmPassword"
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
