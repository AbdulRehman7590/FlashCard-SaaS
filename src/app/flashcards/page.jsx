import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import {
  Box,
  Container,
  Grid,
  Card,
  CardActionArea,
  CardContent,
  Typography,
  Paper,
} from "@mui/material";
import { useUser } from "@clerk/nextjs";
import { collection, doc, getDocs } from "firebase/firestore";
import { db } from "@/lib/firebase"; // Adjust the import path based on your project structure

export default function Flashcard() {
  const { isLoaded, isSignedIn, user } = useUser();
  const [flashcards, setFlashcards] = useState([]);
  const [flipped, setFlipped] = useState({});
  const router = useRouter();
  const { id: search } = router.query;

  useEffect(() => {
    async function getFlashcard() {
      if (!search || !user) return;

      const colRef = collection(doc(collection(db, "users"), user.id), search);
      const docs = await getDocs(colRef);
      const flashcards = [];
      docs.forEach((doc) => {
        flashcards.push({ id: doc.id, ...doc.data() });
      });
      setFlashcards(flashcards);
    }
    getFlashcard();
  }, [search, user]);

  const handleCardClick = (id) => {
    setFlipped((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  return (
    <Container maxWidth="md">
      <Typography
        variant="h4"
        align="center"
        sx={{ mt: 4, mb: 4, fontWeight: "bold" }}
      >
        Your Flashcards
      </Typography>
      <Grid container spacing={3}>
        {flashcards.map((flashcard) => (
          <Grid item xs={12} sm={6} md={4} key={flashcard.id}>
            <Card
              sx={{
                perspective: "1000px",
                transition: "transform 0.6s",
                transformStyle: "preserve-3d",
                "&:hover": {
                  cursor: "pointer",
                },
              }}
              onClick={() => handleCardClick(flashcard.id)}
            >
              <CardActionArea>
                <CardContent
                  sx={{
                    transform: flipped[flashcard.id]
                      ? "rotateY(180deg)"
                      : "rotateY(0deg)",
                    transition: "transform 0.6s",
                    transformStyle: "preserve-3d",
                    position: "relative",
                    height: "200px",
                  }}
                >
                  <Paper
                    elevation={3}
                    sx={{
                      position: "absolute",
                      width: "100%",
                      height: "100%",
                      backfaceVisibility: "hidden",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      backgroundColor: "#fafafa",
                      padding: 2,
                      borderRadius: 1,
                    }}
                  >
                    <Typography
                      variant="h5"
                      align="center"
                      sx={{ fontWeight: "bold" }}
                    >
                      {flipped[flashcard.id] ? flashcard.back : flashcard.front}
                    </Typography>
                  </Paper>
                </CardContent>
              </CardActionArea>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
}
