import { Box, Container, Grid, Typography } from "@mui/material";
import React from "react";
import Photo from "../photo/photo";
import { styled } from "@mui/material/styles";
import SocialBar from "../social/socialbar";

const ResponsiveContainer = styled(Container)(({ theme }) => ({
  padding: theme.spacing(1),
  display: "flex",
  marginTop: "50px",
  [theme.breakpoints.down("md")]: {
    flexDirection: "column",
  },
  [theme.breakpoints.up("md")]: {
    flexDirection: "row",
  },
}));

const About = () => {
  return (
    <Box
      sx={{ backgroundColor: "black", color: "white", padding: "100px 80px" }}
    >
      <Grid container spacing={2}>
        <Grid item xs={6}>
          <Typography
            variant="h3"
            sx={{ textTransform: "uppercase", textAlign: "center" }}
          >
            This is uz
          </Typography>
        </Grid>
        <Grid item xs={6} sx={{ textAlign: "center" }}>
          <Typography variant="body1" color="primary" m="15px">
            Creemos en un mundo donde el deporte nos una haciendo una mejor
            sociedad.
          </Typography>
          <Typography variant="body1" m="15px">
            Generando disciplina, diversión, competencia y hermandad, un mundo
            donde el deporte nos haga mejores.{" "}
          </Typography>
          <ResponsiveContainer>
            <Container
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <Photo src="https://picsum.photos/200" to="/" round />
              <Typography variant="body1">Ulises</Typography>
            </Container>
            <Container
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <Photo src="https://picsum.photos/200" to="/" round responsive />
              <Typography variant="body1">Zama</Typography>
            </Container>
          </ResponsiveContainer>
          <SocialBar />
        </Grid>
      </Grid>
    </Box>
  );
};

export default About;
