import { useEffect } from "react";
import type { NextPage } from "next";
import Head from "next/head";
import NextLink from "next/link";
import { useRouter } from "next/router";
import { Box, Button, Card, Container, Typography } from "@mui/material";
import { FirebaseLogin } from "../../components/authentication/firebase-login";
import { useAuth } from "../../hooks/use-auth";
import { gtm } from "../../lib/gtm";
import { ArrowLeft } from "src/icons/arrow-left";

type Platform = "Firebase";

const platformIcons: { [key in Platform]: string } = {
  Firebase: "/static/icons/firebase.svg",
};

const Login: NextPage = () => {
  const router = useRouter();
  const { platform }: { platform: Platform } = useAuth();
  const { disableGuard } = router.query;

  useEffect(() => {
    gtm.push({ event: "page_view" });
  }, []);

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
          <NextLink href="/" passHref>
            <Button component="a" startIcon={<ArrowLeft fontSize="small" />}>
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
            <Typography color="textSecondary" variant="caption">
              The app authenticates via Firebase
            </Typography>
            <img alt="Auth platform" src={"/static/icons/firebase.svg"} />
          </Box>
          <Card elevation={16} sx={{ p: 4 }}>
            <Box
              sx={{
                alignItems: "center",
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
              }}
            >
              <NextLink href="/" passHref>
                <a>
                  <GradientLogo
                    sx={{
                      height: 50,
                      width: 79,
                    }}
                  />
                </a>
              </NextLink>
              <Typography variant="h4">Log In</Typography>
              <Typography color="textSecondary" sx={{ mt: 2 }} variant="body2">
                Sign in to the internal platform
              </Typography>
            </Box>
            <Box
              sx={{
                flexGrow: 1,
                mt: 3,
              }}
            >
              {platform === "Amplify" && <AmplifyLogin />}
              {platform === "Auth0" && <Auth0Login />}
              {platform === "Firebase" && <FirebaseLogin />}
              {platform === "JWT" && <JWTLogin />}
            </Box>
            {/* <Divider sx={{ my: 3 }} />
            <div>
              <NextLink
                href={
                  disableGuard
                    ? `/authentication/register?disableGuard=${disableGuard}`
                    : "/authentication/register"
                }
                passHref
              >
                <Link color="textSecondary" variant="body2">
                  Create new account
                </Link>
              </NextLink>
            </div>
            {platform === "Amplify" && (
              <Box sx={{ mt: 1 }}>
                <NextLink
                  href={
                    disableGuard
                      ? `/authentication/password-recovery?disableGuard=${disableGuard}`
                      : "/authentication/password-recovery"
                  }
                  passHref
                >
                  <Link color="textSecondary" variant="body2">
                    Forgot password
                  </Link>
                </NextLink>
              </Box>
            )} */}
          </Card>
        </Container>
      </Box>
    </>
  );
};

Login.getLayout = (page) => <GuestGuard>{page}</GuestGuard>;

export default Login;
