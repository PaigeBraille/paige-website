import { useState } from "react";
import { useRouter } from "next/router";
import { createUserWithEmailAndPassword, getAuth } from "firebase/auth";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { auth } from "@/lib/firebase";
import { Wrapper } from "@/components/Wrapper";
import Link from "next/link";
import { toast } from "react-toastify";

const SignUp = () => {
  const router = useRouter();
  const [error, setError] = useState(null);

  const initialValues = {
    email: "",
    passwordOne: "",
    passwordTwo: "",
  };

  const validationSchema = Yup.object({
    email: Yup.string()
      .email("Invalid email address")
      .required("Email is required"),
    passwordOne: Yup.string()
      .required("Password is required")
      .min(6, "Password must be at least 6 characters"),
    passwordTwo: Yup.string()
      .oneOf([Yup.ref("passwordOne")], "Passwords must match")
      .required("Confirm Password is required"),
  });

  return (
    <Wrapper>
      <div className="max-w-sm mx-auto pb-6">
        <div className="bg-blue-50 px-6 p-6 rounded-lg">
          <div className="pb-4">
            <h2 className="text-l font-bold text-primary tracking-tight">
              Sign up
            </h2>
            <p className="text-sm text-gray-600">
              Sign up to store your progress through the learn tab
            </p>
          </div>
          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={(values, { setSubmitting, resetForm }) => {
              setError(null);
              setSubmitting(true);
              // toast in loading state
              const toastId = toast.loading("Submitting account details");
              //create user in Firebase and redirect to your logged in page.
              createUserWithEmailAndPassword(
                auth,
                values.email,
                values.passwordOne,
              )
                .then((authUser) => {
                  toast.update(toastId, {
                    render: "Account created successfully",
                    type: "success",
                    isLoading: false,
                  });
                  console.log("Success. The user is created in Firebase");
                  setTimeout(() => {
                    router.push("/learn");
                  }, 1000); // Redirect to "/learn" after 1 second
                })
                .catch((error) => {
                  toast.update(toastId, {
                    render: "Error creating account",
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
                  htmlFor="signUpEmail"
                  className="block text-xs text-gray-600"
                >
                  Email
                </label>
                <Field
                  type="email"
                  name="email"
                  id="signUpEmail"
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
                  htmlFor="signUpPassword"
                  className="block text-xs text-gray-600"
                >
                  Password
                </label>
                <Field
                  type="password"
                  name="passwordOne"
                  id="signUpPassword"
                  placeholder="Password"
                  className="border border-gray-300 rounded px-2 py-1 w-full"
                />
                <ErrorMessage
                  name="passwordOne"
                  component="div"
                  className="text-xs text-red-700 absolute"
                />
              </div>
              <div className="mb-5">
                <label
                  htmlFor="signUpPassword2"
                  className="block text-xs text-gray-600"
                >
                  Confirm Password
                </label>
                <Field
                  type="password"
                  name="passwordTwo"
                  id="signUpPassword2"
                  placeholder="Confirm Password"
                  className="border border-gray-300 rounded px-2 py-1 w-full"
                />
                <ErrorMessage
                  name="passwordTwo"
                  component="div"
                  className="text-xs text-red-700 absolute"
                />
              </div>
              <div className="mt-8">
                <button
                  className="text-xs border border-black rounded px-4 py-2 mr-auto w-full"
                  type="submit"
                >
                  Sign up
                </button>
              </div>
            </Form>
          </Formik>
          <div className="border-t border-gray-900 mt-4 mb-1"></div>
          <Link href="/auth/login">
            <p className="text-gray-700 hover:underline text-xs hover:text-gray-500">
              Already have an account?
            </p>
          </Link>
        </div>
      </div>
    </Wrapper>
  );
};

export default SignUp;
