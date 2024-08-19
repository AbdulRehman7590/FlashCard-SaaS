"use client";

import React from "react";
import {
  Container,
  Box,
  Typography,
  AppBar,
  Toolbar,
  Button,
  Link as MuiLink,
} from "@mui/material";
import { SignUp } from "@clerk/nextjs";
import Link from "next/link";

export default function SignInPage() {
  return (
    <Container maxWidth="sm">
      <AppBar position="static" sx={{ backgroundColor: "#3f51b5" }}>
        <Toolbar>
          <Typography variant="h6" sx={{ flexGrow: 1, fontWeight: "bold" }}>
            Flashcard SaaS
          </Typography>
          <Button color="inherit">
            <Link href="/sign-in" passHref legacyBehavior>
              <MuiLink
                underline="none"
                sx={{ color: "inherit", fontWeight: "medium" }}
              >
                Login
              </MuiLink>
            </Link>
          </Button>
          <Button color="inherit">
            <Link href="/sign-up" passHref legacyBehavior>
              <MuiLink
                underline="none"
                sx={{ color: "inherit", fontWeight: "medium" }}
              >
                Sign Up
              </MuiLink>
            </Link>
          </Button>
        </Toolbar>
      </AppBar>

      <Box
        display="flex"
        flexDirection="column"
        justifyContent="center"
        alignItems="center"
        sx={{ textAlign: "center", my: 8, px: 3 }}
      >
        <Typography
          variant="h4"
          component="h1"
          gutterBottom
          sx={{ fontWeight: "bold" }}
        >
          Sign Up
        </Typography>
        <Typography variant="body1" sx={{ mb: 4 }}>
          Create a new account to get started with Flashcard SaaS.
        </Typography>
        <Box sx={{ width: "100%", maxWidth: 400 }}>
          <SignUp />
        </Box>
      </Box>
    </Container>
  );
}
