import { useState } from "react";
import { useRouter } from "next/router";
import { createUserWithEmailAndPassword, getAuth } from "firebase/auth";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { auth } from "@/lib/firebase";
import { Wrapper } from "@/components/Wrapper";

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
    passwordOne: Yup.string().required("Password is required"),
    passwordTwo: Yup.string()
      .oneOf([Yup.ref("passwordOne")], "Passwords must match")
      .required("Confirm Password is required"),
  });

  const onSubmit = (values: any, { setSubmitting }: any) => {
    setError(null);
    //create user in Firebase and redirect to your logged in page.
    createUserWithEmailAndPassword(auth, values.email, values.passwordOne)
      .then((authUser) => {
        console.log("Success. The user is created in Firebase");
      })
      .catch((error) => {
        // An error occurred. Set error message to be displayed to user
        setError(error.message);
      })
      .finally(() => {
        setSubmitting(false);
      });
  };

  return (
    <Wrapper>
      <div className="max-w-5xl mx-auto md:px-6 flex flex-col">
        <div className="px-6 md:px-0">
          <div className="flex flex-col md:flex-row bg-blue-50 px-6 p-6 md:p-6 mt-6 justify-between relative overflow-visible gap-4 rounded-lg">
            <div className="flex flex-col gap-2 md:w-3/5">
              <h2 className="text-l font-bold text-primary tracking-tight">
                Featured
              </h2>
              <div className="text-center">
                <div className="flex justify-center">
                  <Formik
                    initialValues={initialValues}
                    validationSchema={validationSchema}
                    onSubmit={onSubmit}
                  >
                    <Form className="w-1/2">
                      {error && <div className="text-red-500">{error}</div>}
                      <div className="mb-4">
                        <label htmlFor="signUpEmail" className="block">
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
                          className="text-red-500"
                        />
                      </div>
                      <div className="mb-4">
                        <label htmlFor="signUpPassword" className="block">
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
                          className="text-red-500"
                        />
                      </div>
                      <div className="mb-4">
                        <label htmlFor="signUpPassword2" className="block">
                          Confirm Password
                        </label>
                        <Field
                          type="password"
                          name="passwordTwo"
                          id="signUpPassword2"
                          placeholder="Password"
                          className="border border-gray-300 rounded px-2 py-1 w-full"
                        />
                        <ErrorMessage
                          name="passwordTwo"
                          component="div"
                          className="text-red-500"
                        />
                      </div>
                      <div className="mb-4">
                        <button
                          type="submit"
                          className="bg-blue-500 text-white px-4 py-2 rounded"
                        >
                          Sign Up
                        </button>
                      </div>
                    </Form>
                  </Formik>
                </div>
              </div>
              <h2 className="text-3xl font-bold tracking-tight">Seren Jaye</h2>
              <p className="text-sm mb-auto">
                &ldquo;I am such a nerd for new accessible technology and this
                was so cool!&rdquo;
              </p>
              <button
                className="text-xs border border-black rounded px-4 py-2 mr-auto"
                role="button"
              >
                Read full story
              </button>
            </div>
          </div>
        </div>
      </div>
    </Wrapper>
  );
};

export default SignUp;
