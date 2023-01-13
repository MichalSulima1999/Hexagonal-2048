import {
  Box,
  Button,
  List,
  ListItem,
  ListItemText,
  Paper,
  Slider,
} from "@mui/material";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import Container from "@mui/material/Container";
import NorthWestIcon from "@mui/icons-material/NorthWest";
import NorthEastIcon from "@mui/icons-material/NorthEast";
import NorthIcon from "@mui/icons-material/North";
import SouthIcon from "@mui/icons-material/South";
import SouthEastIcon from "@mui/icons-material/SouthEast";
import SouthWestIcon from "@mui/icons-material/SouthWest";

const Menu = () => {
  const [radius, setRadius] = useState<number>(2);

  const valuetext = (value: number) => {
    return `${value}`;
  };

  return (
    <Container maxWidth="sm">
      <Box mt={2}>
        <Paper elevation={3}>
          <h2>Radius: {radius}</h2>
          <Box p={2}>
            <Slider
              aria-label="Radius"
              getAriaValueText={valuetext}
              valueLabelDisplay="auto"
              value={radius}
              onChange={(_, val) => setRadius(parseInt(val.toString(), 10))}
              marks
              min={2}
              max={5}
            />
            <Button
              variant="contained"
              component={Link}
              to={`/game?radius=${radius}`}
            >
              Play
            </Button>
          </Box>
        </Paper>

        <Paper elevation={3}>
          <h2>Controls:</h2>
          <List>
            <ListItem>
              <ListItemText primary="Q - north-west" />
              <NorthWestIcon />
            </ListItem>
            <ListItem>
              <ListItemText primary="W - north" />
              <NorthIcon />
            </ListItem>
            <ListItem>
              <ListItemText primary="E - north-east" />
              <NorthEastIcon />
            </ListItem>
            <ListItem>
              <ListItemText primary="A - south-west" />
              <SouthWestIcon />
            </ListItem>
            <ListItem>
              <ListItemText primary="S - south" />
              <SouthIcon />
            </ListItem>
            <ListItem>
              <ListItemText primary="D - south-east" />
              <SouthEastIcon />
            </ListItem>
          </List>
        </Paper>
      </Box>
    </Container>
  );
};

export default Menu;
