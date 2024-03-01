import { useEffect } from "react";
import type { NextPage } from "next";
import Head from "next/head";
import NextLink from "next/link";
import { useRouter } from "next/router";
import {
  Box,
  Button,
  Card,
  Container,
  Divider,
  Typography,
} from "@mui/material";
import { GuestGuard } from "../../components/authentication/guest-guard";
import { AmplifyRegister } from "../../components/authentication/amplify-register";
import { Auth0Register } from "../../components/authentication/auth0-register";
import { FirebaseRegister } from "../../components/authentication/firebase-register";
import { JWTRegister } from "../../components/authentication/jwt-register";
import { GradientLogo } from "../../components/logo";
import { useAuth } from "../../hooks/use-auth";
import { gtm } from "../../lib/gtm";
import { ArrowLeft } from "src/icons/arrow-left";

type Platform = "Amplify" | "Auth0" | "Firebase" | "JWT";

const platformIcons: { [key in Platform]: string } = {
  Amplify: "/static/icons/amplify.svg",
  Auth0: "/static/icons/auth0.svg",
  Firebase: "/static/icons/firebase.svg",
  JWT: "/static/icons/jwt.svg",
};

const Register: NextPage = () => {
  const router = useRouter();
  const { platform }: { platform: Platform } = useAuth();
  const { disableGuard } = router.query;

  useEffect(() => {
    gtm.push({ event: "page_view" });
  }, []);

  return (
    <>
      <Head>
        <title>Register | Esox</title>
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
              <Typography variant="h4">Register</Typography>
              <Typography color="textSecondary"
sx={{ mt: 2 }}
variant="body2">
                Register on the internal platform
              </Typography>
            </Box>
            <Box
              sx={{
                flexGrow: 1,
                mt: 3,
              }}
            >
              {platform === "Amplify" && <AmplifyRegister />}
              {platform === "Auth0" && <Auth0Register />}
              {platform === "Firebase" && <FirebaseRegister />}
              {platform === "JWT" && <JWTRegister />}
            </Box>
            <Divider sx={{ my: 3 }} />
            <div>
              <NextLink
                href={
                  disableGuard
                    ? `/authentication/login?disableGuard=${disableGuard}`
                    : "/authentication/login"
                }
                passHref
              >
                <Button component="a">Already have a account?</Button>
              </NextLink>
            </div>
          </Card>
        </Container>
      </Box>
    </>
  );
};

Register.getLayout = (page) => <GuestGuard>{page}</GuestGuard>;

export default Register;
