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
import { SignIn } from "@clerk/nextjs";
import Link from "next/link";

export default function SignUpPage() {
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
          Sign In
        </Typography>
        <Typography variant="body1" sx={{ mb: 4 }}>
          Access your account to start creating flashcards today.
        </Typography>
        <Box sx={{ width: "100%", maxWidth: 400 }}>
          <SignIn />
        </Box>
      </Box>
    </Container>
  );
}
