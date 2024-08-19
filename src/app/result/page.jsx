"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import {
  CircularProgress,
  Container,
  Typography,
  Box,
  Button,
  Paper,
} from "@mui/material";

const ResultPage = () => {
  const router = useRouter();
  const { session_id } = router.query;
  const [loading, setLoading] = useState(true);
  const [session, setSession] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCheckoutSession = async () => {
      if (!session_id) return;
      try {
        const res = await fetch(
          `/api/checkout_sessions?session_id=${session_id}`
        );
        const sessionData = await res.json();
        if (res.ok) {
          setSession(sessionData);
        } else {
          setError(sessionData.error);
        }
      } catch (err) {
        setError("An error occurred while retrieving the session.");
      } finally {
        setLoading(false);
      }
    };
    fetchCheckoutSession();
  }, [session_id]);

  if (loading) {
    return (
      <Container maxWidth="sm" sx={{ textAlign: "center", mt: 6 }}>
        <CircularProgress size={60} />
        <Typography variant="h6" sx={{ mt: 3 }}>
          Processing your payment...
        </Typography>
      </Container>
    );
  }

  if (error) {
    return (
      <Container maxWidth="sm" sx={{ textAlign: "center", mt: 6 }}>
        <Typography variant="h5" color="error">
          {error}
        </Typography>
        <Button
          variant="contained"
          color="primary"
          sx={{ mt: 3 }}
          onClick={() => router.push("/pricing")}
        >
          Return to Pricing
        </Button>
      </Container>
    );
  }

  return (
    <Container maxWidth="sm" sx={{ textAlign: "center", mt: 6 }}>
      <Paper
        elevation={4}
        sx={{
          p: 4,
          borderRadius: 3,
          backgroundColor:
            session.payment_status === "paid" ? "#e8f5e9" : "#ffebee",
        }}
      >
        {session.payment_status === "paid" ? (
          <>
            <Typography
              variant="h4"
              sx={{ fontWeight: "bold", mb: 2, color: "#388e3c" }}
            >
              Thank You for Your Purchase!
            </Typography>
            <Box sx={{ mt: 2, mb: 2 }}>
              <Typography variant="h6">Order Confirmed</Typography>
              <Typography variant="body1" sx={{ mt: 1 }}>
                We have received your payment. You will receive an email with
                the order details shortly.
              </Typography>
              <Typography variant="body2" sx={{ mt: 1, fontStyle: "italic" }}>
                Session ID: {session_id}
              </Typography>
            </Box>
            <Button
              variant="contained"
              color="primary"
              onClick={() => router.push("/dashboard")}
            >
              Go to Dashboard
            </Button>
          </>
        ) : (
          <>
            <Typography
              variant="h4"
              sx={{ fontWeight: "bold", mb: 2, color: "#d32f2f" }}
            >
              Payment Failed
            </Typography>
            <Box sx={{ mt: 2, mb: 2 }}>
              <Typography variant="body1">
                Your payment was not successful. Please try again or contact
                support.
              </Typography>
            </Box>
            <Button
              variant="contained"
              color="primary"
              onClick={() => router.push("/pricing")}
            >
              Return to Pricing
            </Button>
          </>
        )}
      </Paper>
    </Container>
  );
};

export default ResultPage;
