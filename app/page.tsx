"use client";
import { Box } from "@mui/material";
import map from "@/public/121.jpeg";

import * as React from "react";
import Stack from "@mui/material/Stack";
import IconButton from "@mui/material/IconButton";
import Fingerprint from "@mui/icons-material/Fingerprint";

import { useRouter } from "next/navigation";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { CardActionArea } from "@mui/material";

export default function LandingPage() {
  const router = useRouter();
  const cards = [
    {
      image:
        "https://npr.brightspotcdn.com/dims4/default/c6d8038/2147483647/strip/true/crop/1500x1064+0+0/resize/1760x1248!/format/webp/quality/90/?url=http%3A%2F%2Fnpr-brightspot.s3.amazonaws.com%2Flegacy%2Fsites%2Fvpr%2Ffiles%2F201701%2FMap-countries-istock-ZarkoCvijovic-20170104.jpg",
      title: "Countries",
      description:
        "There are 195 countries in the world. Canada has the most lakes in the world.",
    },
    {
      image:
        "https://studyfinds.org/wp-content/uploads/2023/03/World-population-surrounding-the-Earth-604x385.jpeg",
      title: "People",
      description:
        "There are over 8 billion people in this world. Each person has a unique fingerprint that is never repeated.",
    },
    {
      image:
        "https://www.worldatlas.com/r/w1300/upload/61/f3/02/adobestock-189171905.jpg",
      title: "Continents",
      description: "There are 7 continents in the world. ",
    },
    {
      image:
        "https://i0.wp.com/epthinktank.eu/wp-content/uploads/2017/09/eprs-aag-608700-celebrating-european-day-of-languages-final.jpg?fit=1000%2C750&ssl=1",
      title: "Languages",
      description: "There are over 7000 spoken languages around the world. ",
    },
  ];

  const handleLogin = async () => {
    router.push("/login");
  };

  const handleSignup = async () => {
    router.push("/signup");
  };

  return (
    <Box
      sx={{
        backgroundImage: `url(${map.src})`,
        backgroundPosition: "center",
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        minHeight: "100vh",
        minWidth: "100vw",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        transition: "background-image 0.5s ease",
      }}
    >
      <h1
        style={{
          fontSize: "50px",
          fontFamily: "sans-serif",
          paddingBottom: "100px",
          color: "black",
          fontWeight:"700"
        }}
      >
        Welcome to the World!
      </h1>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: "50px",
          paddingBottom: "100px",
          flexWrap: "wrap",
        }}
      >
        {cards.map((card, index) => (
          <Card
            key={index}
            sx={{
              borderRadius:"20px",
              maxWidth: 345,
              marginBottom: "20px",
              maxHeight: 354,
              transition: "transform 0.3s",
              boxShadow: "0px 5px 15px rgba(0, 0, 0, 0.3)",
              "&:hover": {
                transform: "scale(1.05)",
              },
            }}
          >
            <CardActionArea>
              <CardMedia component="img" image={card.image} alt={card.title} />
              <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                  {card.title}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {card.description}
                </Typography>
              </CardContent>
            </CardActionArea>
          </Card>
        ))}
      </div>
      <Stack direction="row" spacing={5} columnGap={20}>
        <IconButton
          aria-label="fingerprint"
          color="primary"
          onClick={handleLogin}
        >
          Login
          <Fingerprint sx={{ width: "50px", height: "50px" }} />
        </IconButton>
        <IconButton
          aria-label="fingerprint"
          color="secondary"
          onClick={handleSignup}
        >
          Sign Up
          <Fingerprint sx={{ width: "50px", height: "50px" }} />
        </IconButton>
      </Stack>
    </Box>
  );
}
