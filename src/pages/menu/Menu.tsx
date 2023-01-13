import { Button, Slider } from "@mui/material";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import Container from "@mui/material/Container";

const Menu = () => {
  const [radius, setRadius] = useState<number>(2);

  const valuetext = (value: number) => {
    return `${value}`;
  };

  return (
    <Container maxWidth="sm">
      <div>
        <label htmlFor="radius">Radius: </label>
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
      </div>
      <div>
        <Button
          variant="contained"
          component={Link}
          to={`/game?radius=${radius}`}
        >
          Play
        </Button>
      </div>
    </Container>
  );
};

export default Menu;
