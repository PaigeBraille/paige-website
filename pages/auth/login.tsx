import { useState } from "react";
import { useRouter } from "next/router";
import { signInWithEmailAndPassword, getAuth } from "firebase/auth";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { auth } from "@/lib/firebase";
import { Wrapper } from "@/components/Wrapper";
import Link from "next/link";
import { toast } from "react-toastify";

const Login = () => {
  const router = useRouter();
  const [error, setError] = useState(null);

  const initialValues = {
    email: "",
    password: "",
  };

  const validationSchema = Yup.object({
    email: Yup.string()
      .email("Invalid email address")
      .required("Email is required"),
    password: Yup.string()
      .required("Password is required")
      .min(6, "Password must be at least 6 characters"),
  });

  return (
    <Wrapper>
      <div className="max-w-sm mx-auto pb-6">
        <div className="bg-blue-50 px-6 p-6 rounded-lg">
          <div className="pb-4">
            <h2 className="text-l font-bold text-primary tracking-tight">
              Log in
            </h2>
            <p className="text-sm text-gray-600">
              Log in to access your account
            </p>
          </div>
          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={(values, { setSubmitting, resetForm }) => {
              setError(null);
              setSubmitting(true);
              // toast in loading state
              const toastId = toast.loading("Logging in");
              // sign in user with Firebase and redirect to the logged in page.
              signInWithEmailAndPassword(auth, values.email, values.password)
                .then((authUser) => {
                  toast.update(toastId, {
                    render: "Logged in successfully",
                    type: "success",
                    isLoading: false,
                  });
                  console.log("Success. The user is logged in with Firebase");
                  setTimeout(() => {
                    router.push("/learn");
                  }, 1000); // Redirect to "/learn" after 1 second
                })
                .catch((error) => {
                  toast.update(toastId, {
                    render: "Error logging in",
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
                  htmlFor="loginEmail"
                  className="block text-xs text-gray-600"
                >
                  Email
                </label>
                <Field
                  type="email"
                  name="email"
                  id="loginEmail"
                  placeholder="Email"
                  className="border border-gray-300 rounded px-2 py-1 w-full"
                />
                <ErrorMessage
                  name="email"
                  component="div"
                  className="text-xs text-red-700 absolute"
                />
              </div>
              <div className="mb-5">
                <label
                  htmlFor="loginPassword"
                  className="block text-xs text-gray-600"
                >
                  Password
                </label>
                <Field
                  type="password"
                  name="password"
                  id="loginPassword"
                  placeholder="Password"
                  className="border border-gray-300 rounded px-2 py-1 w-full"
                />
                <ErrorMessage
                  name="password"
                  component="div"
                  className="text-xs text-red-700 absolute"
                />
              </div>
              <div className="mt-8">
                <button
                  className="text-xs border border-black rounded px-4 py-2 mr-auto w-full"
                  type="submit"
                >
                  Log in
                </button>
              </div>
            </Form>
          </Formik>
          <div className="border-t border-gray-900 mt-4 mb-1"></div>
          <Link href="/auth/sign-up">
            <p className="text-gray-700 hover:underline text-xs hover:text-gray-500">
              Don't have an account? Sign up
            </p>
          </Link>
        </div>
      </div>
    </Wrapper>
  );
};

export default Login;
