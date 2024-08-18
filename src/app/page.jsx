"use client";

import React from "react";
import getStripe from "@/utils/get-stripe";
import { SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
import {
  Container,
  AppBar,
  Toolbar,
  Typography,
  Button,
  Box,
  Grid,
  Paper,
  Card,
  CardContent,
  Divider,
} from "@mui/material";

export default function Home() {
  const handleSubmit = async () => {
    try {
      const checkoutSession = await fetch("/api/checkout_sessions", {
        method: "POST",
        headers: { origin: "http://localhost:3000" },
      });
      const checkoutSessionJson = await checkoutSession.json();

      const stripe = await getStripe();
      const { error } = await stripe.redirectToCheckout({
        sessionId: checkoutSessionJson.id,
      });

      if (error) {
        console.warn(error.message);
      }
    } catch (error) {
      console.error("Error during the checkout process:", error);
    }
  };

  return (
    <Container maxWidth="lg">
      <header>
        <title>Flashcard SaaS</title>
        <meta
          name="description"
          content="Flashcard SaaS is a software as a service application that allows users to create and study flashcards."
        />
      </header>

      {/* App Bar */}
      <AppBar position="static" sx={{ mb: 4, backgroundColor: "#1a237e" }}>
        <Toolbar>
          <Typography variant="h5" sx={{ flexGrow: 1, fontWeight: "bold" }}>
            Flashcard SaaS
          </Typography>
          <SignedOut>
            <Button color="inherit" href="/sign-in">
              Login
            </Button>
            <Button color="inherit" href="/sign-up" sx={{ ml: 2 }}>
              Sign Up
            </Button>
          </SignedOut>
          <SignedIn>
            <UserButton />
          </SignedIn>
        </Toolbar>
      </AppBar>

      {/* Hero Section */}
      <Box
        sx={{
          textAlign: "center",
          py: 8,
          backgroundImage: "linear-gradient(135deg, #3949ab 30%, #1e88e5 100%)",
          borderRadius: 3,
          color: "#fff",
          mb: 6,
        }}
      >
        <Typography variant="h2" gutterBottom sx={{ fontWeight: "bold" }}>
          Welcome to Flashcard SaaS
        </Typography>
        <Typography
          variant="h5"
          gutterBottom
          sx={{ maxWidth: "600px", mx: "auto" }}
        >
          The easiest way to create flashcards from your text and enhance your
          learning experience.
        </Typography>
        <Button
          variant="contained"
          color="secondary"
          size="large"
          sx={{
            mt: 3,
            px: 4,
            py: 1.5,
            fontWeight: "bold",
            fontSize: "1.1rem",
          }}
          href="/generate"
        >
          Get Started
        </Button>
        <Button
          variant="contained"
          color="primary"
          size="large"
          sx={{ mt: 3, ml: 2 }}
          onClick={handleSubmit}
        >
          Purchase Now
        </Button>
      </Box>

      {/* Features Section */}
      <Box sx={{ my: 6 }}>
        <Typography
          variant="h4"
          component="h2"
          gutterBottom
          sx={{ fontWeight: "bold", textAlign: "center" }}
        >
          Features
        </Typography>
        <Divider sx={{ mb: 4, width: "20%", mx: "auto" }} />
        <Grid container spacing={4}>
          <Grid item xs={12} sm={6} md={4}>
            <Card sx={{ boxShadow: 3 }}>
              <CardContent>
                <Typography variant="h6" sx={{ fontWeight: "bold", mb: 1 }}>
                  AI-Powered Flashcards
                </Typography>
                <Typography>
                  Automatically generate flashcards based on your input text
                  using cutting-edge AI technology.
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <Card sx={{ boxShadow: 3 }}>
              <CardContent>
                <Typography variant="h6" sx={{ fontWeight: "bold", mb: 1 }}>
                  Seamless Study Experience
                </Typography>
                <Typography>
                  Study your flashcards with an intuitive and user-friendly
                  interface designed for efficient learning.
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <Card sx={{ boxShadow: 3 }}>
              <CardContent>
                <Typography variant="h6" sx={{ fontWeight: "bold", mb: 1 }}>
                  Save and Organize
                </Typography>
                <Typography>
                  Save your flashcard sets, organize them by categories, and
                  access them anytime, anywhere.
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Box>

      {/* Pricing Section */}
      <Box sx={{ my: 6, textAlign: "center" }}>
        <Typography
          variant="h4"
          component="h2"
          gutterBottom
          sx={{ fontWeight: "bold" }}
        >
          Pricing
        </Typography>
        <Divider sx={{ mb: 4, width: "20%", mx: "auto" }} />
        <Grid container spacing={4} justifyContent="center">
          <Grid item xs={12} sm={6} md={4}>
            <Paper
              sx={{
                p: 4,
                boxShadow: 4,
                backgroundColor: "#f5f5f5",
                "&:hover": { transform: "scale(1.05)", transition: "0.3s" },
              }}
            >
              <Typography variant="h6" sx={{ fontWeight: "bold", mb: 1 }}>
                Free Plan
              </Typography>
              <Typography>$0/month</Typography>
              <Typography sx={{ mt: 1, mb: 2 }}>
                Get started with basic features and limited flashcard
                generation.
              </Typography>
              <Button variant="contained" color="primary">
                Choose Plan
              </Button>
            </Paper>
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <Paper
              sx={{
                p: 4,
                boxShadow: 4,
                backgroundColor: "#f5f5f5",
                "&:hover": { transform: "scale(1.05)", transition: "0.3s" },
              }}
            >
              <Typography variant="h6" sx={{ fontWeight: "bold", mb: 1 }}>
                Pro Plan
              </Typography>
              <Typography>$9.99/month</Typography>
              <Typography sx={{ mt: 1, mb: 2 }}>
                Unlock advanced features and unlimited flashcard generation.
              </Typography>
              <Button variant="contained" color="primary">
                Choose Plan
              </Button>
            </Paper>
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
}
