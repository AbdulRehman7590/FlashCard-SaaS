"use client";

import { useState } from "react";
import {
  Container,
  TextField,
  Button,
  Typography,
  Box,
  Grid,
  Card,
  CardContent,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Divider,
  Paper,
} from "@mui/material";
import { AddCircleOutline } from "@mui/icons-material";
import { collection, doc, getDoc, writeBatch } from "firebase/firestore";

export default function Generate() {
  const [setName, setSetName] = useState("");
  const [dialogOpen, setDialogOpen] = useState(false);
  const [text, setText] = useState("");
  const [flashcards, setFlashcards] = useState([]);

  const handleOpenDialog = () => setDialogOpen(true);
  const handleCloseDialog = () => setDialogOpen(false);

  const saveFlashcards = async () => {
    if (!setName.trim()) {
      alert("Please enter a name for your flashcard set.");
      return;
    }

    try {
      const userDocRef = doc(collection(db, "users"), user.id);
      const userDocSnap = await getDoc(userDocRef);

      const batch = writeBatch(db);

      if (userDocSnap.exists()) {
        const userData = userDocSnap.data();
        const updatedSets = [
          ...(userData.flashcardSets || []),
          { name: setName },
        ];
        batch.update(userDocRef, { flashcardSets: updatedSets });
      } else {
        batch.set(userDocRef, { flashcardSets: [{ name: setName }] });
      }

      const setDocRef = doc(collection(userDocRef, "flashcardSets"), setName);
      batch.set(setDocRef, { flashcards });

      await batch.commit();

      alert("Flashcards saved successfully!");
      handleCloseDialog();
      setSetName("");
    } catch (error) {
      console.error("Error saving flashcards:", error);
      alert("An error occurred while saving flashcards. Please try again.");
    }
  };

  const handleSubmit = async () => {
    if (!text.trim()) {
      alert("Please enter some text to generate flashcards.");
      return;
    }

    try {
      const response = await fetch("/api/generate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ text }),
      });

      if (!response.ok) {
        throw new Error("Failed to generate flashcards");
      }

      const data = await response.json();
      setFlashcards(data);
    } catch (error) {
      console.error("Error generating flashcards:", error);
      alert("An error occurred while generating flashcards. Please try again.");
    }
  };

  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      <Paper elevation={3} sx={{ p: 4, borderRadius: 2 }}>
        <Box sx={{ mb: 3 }}>
          <Typography
            variant="h3"
            align="center"
            gutterBottom
            sx={{ fontWeight: "bold" }}
          >
            Generate Flashcards
          </Typography>
          <Divider sx={{ mb: 3 }} />
          <Typography variant="body1" align="center" sx={{ mb: 3 }}>
            Enter some text below and generate flashcards instantly!
          </Typography>
          <TextField
            value={text}
            onChange={(e) => setText(e.target.value)}
            label="Enter text"
            fullWidth
            multiline
            rows={4}
            variant="outlined"
            sx={{ mb: 2 }}
          />
          <Button
            variant="contained"
            color="secondary"
            onClick={handleSubmit}
            fullWidth
            size="large"
            sx={{
              py: 1.5,
              fontSize: "1rem",
              fontWeight: "bold",
              mb: 2,
            }}
          >
            Generate Flashcards
          </Button>
        </Box>

        {flashcards.length > 0 && (
          <Box sx={{ mt: 4 }}>
            <Typography
              variant="h5"
              component="h2"
              gutterBottom
              sx={{ fontWeight: "bold" }}
            >
              Generated Flashcards
            </Typography>
            <Grid container spacing={3}>
              {flashcards.map((flashcard, index) => (
                <Grid item xs={12} sm={6} md={4} key={index}>
                  <Card
                    sx={{
                      boxShadow: 3,
                      borderRadius: 2,
                      backgroundColor: "#f5f5f5",
                      "&:hover": {
                        transform: "scale(1.05)",
                        transition: "0.3s",
                      },
                    }}
                  >
                    <CardContent>
                      <Typography variant="h6" sx={{ fontWeight: "bold" }}>
                        Front:
                      </Typography>
                      <Typography>{flashcard.front}</Typography>
                      <Typography
                        variant="h6"
                        sx={{ fontWeight: "bold", mt: 2 }}
                      >
                        Back:
                      </Typography>
                      <Typography>{flashcard.back}</Typography>
                    </CardContent>
                  </Card>
                </Grid>
              ))}
            </Grid>
          </Box>
        )}

        {flashcards.length > 0 && (
          <Box sx={{ mt: 4, textAlign: "center" }}>
            <Button
              variant="contained"
              color="secondary"
              startIcon={<AddCircleOutline />}
              onClick={handleOpenDialog}
              sx={{
                fontWeight: "bold",
                fontSize: "1rem",
                py: 1.5,
                px: 4,
              }}
            >
              Save Flashcards
            </Button>
          </Box>
        )}
      </Paper>

      <Dialog open={dialogOpen} onClose={handleCloseDialog}>
        <DialogTitle>Save Flashcard Set</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Please enter a name for your flashcard set.
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            label="Set Name"
            type="text"
            fullWidth
            value={setName}
            onChange={(e) => setSetName(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog} color="primary">
            Cancel
          </Button>
          <Button onClick={saveFlashcards} color="secondary">
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
}
