import "./game.css";
import React, { useEffect, useRef, useState } from "react";
import { useSearchParams } from "react-router-dom";
import TileGenerator from "../../classes/TileGenerator";
import Canvas from "../../components/canvas/Canvas";
import Tile from "../../interfaces/Tile";

const Game: React.FC = () => {
  const [searchParams] = useSearchParams();
  const radiusParam = searchParams.get("radius");

  const [tileGenerator, setTileGenerator] = useState<TileGenerator>();
  const [mapRadius, setMapRadius] = useState<number>(1);
  const [gameTiles, setGameTiles] = useState<Tile[]>();
  const [gameActive, setGameActive] = useState<boolean>(true);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isKeyDown, setIsKeyDown] = useState<boolean>(false);
  const refCanvas = useRef<HTMLInputElement>(null);
  const refRestartButton = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    let radius = 1;
    setMapRadius(radius);
    if (radiusParam) {
      const radiusNumber = parseInt(radiusParam, 10);
      if (radiusNumber > 1 && radiusNumber < 6) {
        setMapRadius(parseInt(radiusParam, 10) - 1);
        radius = parseInt(radiusParam, 10) - 1;
      }
    }
    const generator = new TileGenerator(radius);
    setTileGenerator(new TileGenerator(radius));
    setGameTiles(generator.initMap());
    setIsLoading(false);
  }, [radiusParam]);

  useEffect(() => {
    if (refCanvas.current) {
      refCanvas.current.focus();
    }
  }, [isLoading]);

  useEffect(() => {
    if (!gameActive) {
      if (refRestartButton.current) {
        refRestartButton.current.focus();
      }
    }
  }, [gameActive]);

  const handleKeyDown = (event: React.KeyboardEvent<HTMLElement>) => {
    if (!gameActive || isKeyDown) return;

    switch (event.key.toLowerCase()) {
      case "s":
        handleSPressed();
        break;

      case "w":
        handleWPressed();
        break;

      case "d":
        handleDPressed();
        break;

      case "q":
        handleQPressed();
        break;

      case "a":
        handleAPressed();
        break;

      case "e":
        handleEPressed();
        break;

      default:
        break;
    }
    setIsKeyDown(true);
  };

  const handleKeyUp = () => {
    setIsKeyDown(false);
  };

  const handleSPressed = () => {
    if (!gameTiles || !tileGenerator) return;

    let tilesChanged = false;
    const tiles = gameTiles.sort((a, b) => a.y - b.y);

    tiles.forEach((tile) => {
      if (tile.value === 0 || tile.y === -mapRadius || tile.z === mapRadius)
        return;

      let lastTile = tile;
      let gameTile = tile;
      const tileValue = tile.value;
      while (gameTile.y > -mapRadius || gameTile.z < mapRadius) {
        const foundTileIndex = tiles.findIndex(
          (nextTile) =>
            nextTile.z === gameTile.z + 1 && nextTile.y === gameTile.y - 1
        );
        if (foundTileIndex === -1) break;

        lastTile = gameTile;
        gameTile = tiles[foundTileIndex];
        if (gameTile.value !== tileValue && gameTile.value !== 0) break;
        tilesChanged = true;

        lastTile.value = 0;
        if (gameTile.value === tileValue) {
          gameTile.value += tileValue;
          return;
        } else {
          gameTile.value += tileValue;
        }
      }
    });
    if (!tilesChanged) return;

    setGameTiles(tiles.map((tiles) => tiles));
    tileGenerator.fetchNewTiles(tiles);
    delay(100).then(() => setGameOver());
  };

  const handleWPressed = () => {
    if (!gameTiles || !tileGenerator) return;

    let tilesChanged = false;
    const tiles = gameTiles.sort((a, b) => b.y - a.y);

    tiles.forEach((tile) => {
      if (tile.value === 0 || tile.z === -mapRadius || tile.y === mapRadius)
        return;

      let lastTile = tile;
      let gameTile = tile;
      const tileValue = tile.value;
      while (gameTile.z > -mapRadius || gameTile.y < mapRadius) {
        const foundTileIndex = tiles.findIndex(
          (nextTile) =>
            nextTile.z === gameTile.z - 1 && nextTile.y === gameTile.y + 1
        );
        if (foundTileIndex === -1) break;

        lastTile = gameTile;
        gameTile = tiles[foundTileIndex];
        if (gameTile.value !== tileValue && gameTile.value !== 0) break;
        tilesChanged = true;

        lastTile.value = 0;
        if (gameTile.value === tileValue) {
          gameTile.value += tileValue;
          return;
        } else {
          gameTile.value += tileValue;
        }
      }
    });
    if (!tilesChanged) return;

    setGameTiles(tiles.map((tiles) => tiles));
    tileGenerator.fetchNewTiles(tiles);
    delay(100).then(() => setGameOver());
  };

  const handleQPressed = () => {
    if (!gameTiles || !tileGenerator) return;

    let tilesChanged = false;
    const tiles = gameTiles.sort((a, b) => b.y - a.y);

    tiles.forEach((tile) => {
      if (tile.value === 0 || tile.y === mapRadius || tile.x === -mapRadius)
        return;

      let lastTile = tile;
      let gameTile = tile;
      const tileValue = tile.value;
      while (gameTile.y < mapRadius || gameTile.x > -mapRadius) {
        const foundTileIndex = tiles.findIndex(
          (nextTile) =>
            nextTile.y === gameTile.y + 1 && nextTile.x === gameTile.x - 1
        );
        if (foundTileIndex === -1) break;

        lastTile = gameTile;
        gameTile = tiles[foundTileIndex];
        if (gameTile.value !== tileValue && gameTile.value !== 0) break;
        tilesChanged = true;

        lastTile.value = 0;
        if (gameTile.value === tileValue) {
          gameTile.value += tileValue;
          return;
        } else {
          gameTile.value += tileValue;
        }
      }
    });
    if (!tilesChanged) return;

    setGameTiles(tiles.map((tiles) => tiles));
    tileGenerator.fetchNewTiles(tiles);
    delay(100).then(() => setGameOver());
  };

  const handleEPressed = () => {
    if (!gameTiles || !tileGenerator) return;

    let tilesChanged = false;
    const tiles = gameTiles.sort((a, b) => a.z - b.z);

    tiles.forEach((tile) => {
      if (tile.value === 0 || tile.x === mapRadius || tile.z === -mapRadius)
        return;
      let lastTile = tile;
      let gameTile = tile;
      const tileValue = tile.value;
      while (gameTile.z > -mapRadius || gameTile.x < mapRadius) {
        const foundTileIndex = tiles.findIndex(
          (nextTile) =>
            nextTile.z === gameTile.z - 1 && nextTile.x === gameTile.x + 1
        );
        if (foundTileIndex === -1) break;

        lastTile = gameTile;
        gameTile = tiles[foundTileIndex];
        if (gameTile.value !== tileValue && gameTile.value !== 0) break;
        tilesChanged = true;

        lastTile.value = 0;
        if (gameTile.value === tileValue) {
          gameTile.value += tileValue;
          return;
        } else {
          gameTile.value += tileValue;
        }
      }
    });
    if (!tilesChanged) return;

    setGameTiles(tiles.map((tiles) => tiles));
    tileGenerator.fetchNewTiles(tiles);
    delay(100).then(() => setGameOver());
  };

  const handleAPressed = () => {
    if (!gameTiles || !tileGenerator) return;

    let tilesChanged = false;
    const tiles = gameTiles.sort((a, b) => b.z - a.z);

    tiles.forEach((tile) => {
      if (tile.value === 0 || tile.x === -mapRadius || tile.z === mapRadius)
        return;

      let lastTile = tile;
      let gameTile = tile;
      const tileValue = tile.value;
      while (gameTile.x > -mapRadius || gameTile.z < mapRadius) {
        const foundTileIndex = tiles.findIndex(
          (nextTile) =>
            nextTile.z === gameTile.z + 1 && nextTile.x === gameTile.x - 1
        );
        if (foundTileIndex === -1) break;

        lastTile = gameTile;
        gameTile = tiles[foundTileIndex];
        if (gameTile.value !== tileValue && gameTile.value !== 0) break;
        tilesChanged = true;

        lastTile.value = 0;
        if (gameTile.value === tileValue) {
          gameTile.value += tileValue;
          return;
        } else {
          gameTile.value += tileValue;
        }
      }
    });
    if (!tilesChanged) return;

    setGameTiles(tiles.map((tiles) => tiles));
    tileGenerator.fetchNewTiles(tiles);
    delay(100).then(() => setGameOver());
  };

  const handleDPressed = () => {
    if (!gameTiles || !tileGenerator) return;

    let tilesChanged = false;
    const tiles = gameTiles.sort((a, b) => a.y - b.y);

    tiles.forEach((tile) => {
      if (tile.value === 0 || tile.y === -mapRadius || tile.x === mapRadius)
        return;

      let lastTile = tile;
      let gameTile = tile;
      const tileValue = tile.value;
      while (gameTile.y > -mapRadius || gameTile.x < mapRadius) {
        const foundTileIndex = tiles.findIndex(
          (nextTile) =>
            nextTile.y === gameTile.y - 1 && nextTile.x === gameTile.x + 1
        );
        if (foundTileIndex === -1) break;

        lastTile = gameTile;
        gameTile = tiles[foundTileIndex];
        if (gameTile.value !== tileValue && gameTile.value !== 0) break;
        tilesChanged = true;

        lastTile.value = 0;
        if (gameTile.value === tileValue) {
          gameTile.value += tileValue;
          return;
        } else {
          gameTile.value += tileValue;
        }
      }
    });
    if (!tilesChanged) return;

    setGameTiles(tiles.map((tiles) => tiles));
    tileGenerator.fetchNewTiles(tiles);
    delay(100).then(() => setGameOver());
  };

  const setGameOver = () => {
    if (!gameTiles) return;

    const tilesWithValues = gameTiles.filter((tile) => tile.value > 0);

    if (tilesWithValues.length < gameTiles.length) {
      setGameActive(true);
      return;
    }

    let gameOver = true;

    tilesWithValues.forEach((tile) => {
      const neighbourTile1 = gameTiles.find(
        (neighbourTile) =>
          neighbourTile.x === tile.x - 1 &&
          neighbourTile.z === tile.z + 1 &&
          neighbourTile.y === tile.y
      );
      if (neighbourTile1) {
        if (neighbourTile1.value === tile.value) {
          gameOver = false;
          return;
        }
      }

      const neighbourTile2 = gameTiles.find(
        (neighbourTile) =>
          neighbourTile.x === tile.x &&
          neighbourTile.z === tile.z + 1 &&
          neighbourTile.y === tile.y - 1
      );
      if (neighbourTile2) {
        if (neighbourTile2.value === tile.value) {
          gameOver = false;
          return;
        }
      }

      const neighbourTile3 = gameTiles.find(
        (neighbourTile) =>
          neighbourTile.x === tile.x + 1 &&
          neighbourTile.z === tile.z &&
          neighbourTile.y === tile.y - 1
      );
      if (neighbourTile3) {
        if (neighbourTile3.value === tile.value) {
          gameOver = false;
          return;
        }
      }
    });

    if (gameOver) endGame();
  };

  const endGame = () => {
    setGameActive(false);
  };

  const handleRestartGame = () => {
    if (!tileGenerator) return;
    setGameTiles(tileGenerator.initMap());
    setGameActive(true);
    if (refCanvas.current) {
      refCanvas.current.focus();
    }
  };

  function delay(time: number) {
    return new Promise((resolve) => setTimeout(resolve, time));
  }

  return (
    <article>
      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <div
          ref={refCanvas}
          tabIndex={-1}
          onKeyDown={handleKeyDown}
          onKeyUp={handleKeyUp}
        >
          <Canvas tiles={gameTiles} />
          <p data-status={gameActive ? "playing" : "game-over"}>
            Game Status: {gameActive ? "playing" : "game over"}
          </p>
          {!gameActive && (
            <button ref={refRestartButton} onClick={handleRestartGame}>
              Restart
            </button>
          )}
        </div>
      )}
    </article>
  );
};

export default Game;
