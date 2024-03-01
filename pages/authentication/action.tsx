import type { NextPage } from "next";
import Head from "next/head";
import NextLink from "next/link";
import * as Yup from "yup";
import { useFormik } from "formik";
import { useRouter } from "next/router";
import {
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  Container,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { useAuth } from "../../hooks/use-auth";
import { ArrowLeft } from "src/icons/arrow-left";
import { toast } from "react-hot-toast";

type Platform = "Amplify" | "Auth0" | "Firebase" | "JWT";

const platformIcons: { [key in Platform]: string } = {
  Amplify: "/static/icons/amplify.svg",
  Auth0: "/static/icons/auth0.svg",
  Firebase: "/static/icons/firebase.svg",
  JWT: "/static/icons/jwt.svg",
};

interface Values {
  password: string;
  passwordConfirm: string;
}

const initialValues: Values = {
  password: "",
  passwordConfirm: "",
};

const validationSchema = Yup.object({
  password: Yup.string()
    .min(7, "Must be at least 7 characters")
    .max(255)
    .required("Required"),
  passwordConfirm: Yup.string()
    .oneOf([Yup.ref("password")], "Passwords must match")
    .required("Required"),
});

const Page: NextPage = () => {
  const { handlePasswordReset, handleVerifyEmail } = useAuth();
  const router = useRouter();
  const { oobCode, mode, continueUrl } = router.query;

  if (oobCode == "verifyEmail") {
    try {
      handleVerifyEmail(oobCode).then(() => toast.success("Email Verified"));
    } catch (e) {
      toast.error("Could not verify email");
    }
  }

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: (values): void => {
      try {
        handlePasswordReset(values.password, oobCode as string);
        formik.resetForm();
        toast.success("Password updated");
      } catch (e) {
        toast.error("Unable to update password, please contact support");
      }
    },
  });

  return (
    <>
      <Head>
        <title>Login | Esox</title>
      </Head>
      <Box
        component="main"
        sx={{
          backgroundColor: "background.default",
          display: "flex",
          flexDirection: "column",
          minHeight: "100vh",
        }}
      >
        {/* <AuthBanner /> */}
        <Container
          maxWidth="sm"
          sx={{
            py: {
              xs: "60px",
              md: "120px",
            },
          }}
        >
          <NextLink href="/"
passHref>
            <Button component="a"
startIcon={<ArrowLeft fontSize="small" />}>
              Home
            </Button>
          </NextLink>
          <Box
            sx={{
              alignItems: "center",
              backgroundColor: (theme) =>
                theme.palette.mode === "dark" ? "neutral.900" : "neutral.100",
              borderColor: "divider",
              borderRadius: 1,
              borderStyle: "solid",
              borderWidth: 1,
              display: "flex",
              flexWrap: "wrap",
              justifyContent: "space-between",
              mt: 2,
              mb: 4,
              p: 2,
              "& > img": {
                height: 32,
                width: "auto",
                flexGrow: 0,
                flexShrink: 0,
              },
            }}
          >
            <Typography color="textSecondary"
variant="caption">
              The app authenticates via Firebase
            </Typography>
            <img alt="Auth platform"
src={"/static/icons/firebase.svg"} />
          </Box>
          <div>
            {(mode as string) == "resetPassword" && (
              <Card elevation={16}>
                <CardHeader sx={{ pb: 0 }}
title="Reset Password" />
                <CardContent>
                  <form noValidate
onSubmit={formik.handleSubmit}>
                    <Stack spacing={3}>
                      <TextField
                        error={
                          !!(formik.touched.password && formik.errors.password)
                        }
                        fullWidth
                        helperText={
                          formik.touched.password && formik.errors.password
                        }
                        label="Password"
                        name="password"
                        onBlur={formik.handleBlur}
                        onChange={formik.handleChange}
                        type="password"
                        value={formik.values.password}
                      />
                      <TextField
                        error={
                          !!(
                            formik.touched.passwordConfirm &&
                            formik.errors.passwordConfirm
                          )
                        }
                        fullWidth
                        helperText={
                          formik.touched.passwordConfirm &&
                          formik.errors.passwordConfirm
                        }
                        label="Password (Confirm)"
                        name="passwordConfirm"
                        onBlur={formik.handleBlur}
                        onChange={formik.handleChange}
                        type="password"
                        value={formik.values.passwordConfirm}
                      />
                    </Stack>
                    <Button
                      fullWidth
                      size="large"
                      sx={{ mt: 2 }}
                      type="submit"
                      variant="contained"
                    >
                      Reset
                    </Button>
                  </form>
                </CardContent>
              </Card>
            )}
            {(mode as string) == "verifyEmail" && (
              <Card elevation={16}>
                <CardContent>
                  <Button
                    onClick={async () => {
                      try {
                        await handleVerifyEmail(oobCode);
                        toast.success("Email verified");
                      } catch (e) {
                        console.log(e);
                        toast.error("Unable to verify email");
                      }
                    }}
                    fullWidth
                    variant="contained"
                  >
                    Verify Email
                  </Button>
                </CardContent>
              </Card>
            )}
          </div>
        </Container>
      </Box>
    </>
  );
};

Page.getLayout = (page) => <>{page}</>;

export default Page;

////
