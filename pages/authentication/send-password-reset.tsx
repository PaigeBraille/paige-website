import { useEffect } from "react";
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
  Container,
  Divider,
  FormHelperText,
  Link,
  TextField,
  Typography,
} from "@mui/material";
import { GuestGuard } from "../../components/authentication/guest-guard";
import { AmplifyPasswordReset } from "../../components/authentication/amplify-password-reset";
import { GradientLogo } from "../../components/logo";
import { useAuth } from "../../hooks/use-auth";
import { gtm } from "../../lib/gtm";
import { ArrowLeft } from "src/icons/arrow-left";
import { toast } from "react-hot-toast";

type Platform = "Amplify" | "Auth0" | "Firebase" | "JWT";

const platformIcons: { [key in Platform]: string } = {
  Amplify: "/static/icons/amplify.svg",
  Auth0: "/static/icons/auth0.svg",
  Firebase: "/static/icons/firebase.svg",
  JWT: "/static/icons/jwt.svg",
};

const PasswordReset: NextPage = () => {
  const router = useRouter();
  const {
    platform,
    sendPasswordReset,
  }: { platform: Platform; sendPasswordReset: any } = useAuth();
  const { disableGuard } = router.query;

  const formik = useFormik({
    initialValues: {
      email: "",
      submit: null,
    },
    validationSchema: Yup.object({
      email: Yup.string()
        .email("Must be a valid email")
        .max(255)
        .required("Email is required"),
    }),
    onSubmit: async (values, helpers): Promise<void> => {
      try {
        sendPasswordReset(values.email)
          .then(() => {
            toast.success("Password reset email sent");
          })
          .catch((error: any) => {
            toast.error("Unable to send password reset email");
            console.log(error);
          });
      } catch (err) {
        console.error(err);
      }
    },
  });

  useEffect(() => {
    gtm.push({ event: "page_view" });
  }, []);

  return (
    <>
      <Head>
        <title>Password Reset | Esox</title>
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
        <Container
          maxWidth="sm"
          sx={{
            py: {
              xs: "60px",
              md: "120px",
            },
          }}
        >
          <NextLink href="/authentication/login"
passHref>
            <Button component="a"
startIcon={<ArrowLeft fontSize="small" />}>
              Login
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
              The app authenticates via {platform}
            </Typography>
            <img alt="Auth platform"
src={platformIcons[platform]} />
          </Box>
          <Card elevation={16}
sx={{ p: 4 }}>
            <Box
              sx={{
                alignItems: "center",
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
              }}
            >
              <NextLink href="/"
passHref>
                <a>
                  <GradientLogo
                    sx={{
                      height: 50,
                      width: 79,
                    }}
                  />
                </a>
              </NextLink>
              <Typography variant="h4">Password Reset</Typography>
              <form noValidate
onSubmit={formik.handleSubmit}>
                <TextField
                  error={Boolean(formik.touched.email && formik.errors.email)}
                  fullWidth
                  helperText={formik.touched.email && formik.errors.email}
                  label="Email Address"
                  margin="normal"
                  name="email"
                  onBlur={formik.handleBlur}
                  onChange={formik.handleChange}
                  type="email"
                  value={formik.values.email}
                />
                {formik.errors.submit && (
                  <Box sx={{ mt: 3 }}>
                    <FormHelperText error>
                      {formik.errors.submit}
                    </FormHelperText>
                  </Box>
                )}
                <Box sx={{ mt: 2 }}>
                  <Button
                    disabled={formik.isSubmitting}
                    fullWidth
                    size="large"
                    type="submit"
                    variant="outlined"
                  >
                    Reset password
                  </Button>
                </Box>
              </form>
            </Box>
            <Box
              sx={{
                flexGrow: 1,
                mt: 3,
              }}
            >
              {platform === "Amplify" && <AmplifyPasswordReset />}
            </Box>
            <Divider sx={{ my: 3 }} />
            {platform === "Amplify" && (
              <div>
                <NextLink
                  href={
                    disableGuard
                      ? `/authentication/password-recovery?disableGuard=${disableGuard}`
                      : "/authentication/password-recovery"
                  }
                  passHref
                >
                  <Link color="textSecondary"
variant="body2">
                    Did you not receive the code?
                  </Link>
                </NextLink>
              </div>
            )}
          </Card>
        </Container>
      </Box>
    </>
  );
};

PasswordReset.getLayout = (page) => <GuestGuard>{page}</GuestGuard>;

export default PasswordReset;
