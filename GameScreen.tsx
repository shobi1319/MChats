import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import Ball from './Ball';
import Obstacle from './Obstacle';
import GameLogic from './GameLogic';

const GameScreen = () => {
  const { ballPosition, setBallPosition, obstacles, score, bestScore, gameOver, level, restartGame } = GameLogic();

  return (
    <View style={styles.container}>
      {gameOver ? (
        <View style={styles.gameOverContainer}>
          <Text style={styles.gameOverText}>Game Over!</Text>
          <Text style={styles.scoreText}>Score: {score}</Text>
          <Text style={styles.bestScoreText}>Best Score: {bestScore}</Text>
          <TouchableOpacity onPress={restartGame} style={styles.restartButton}>
            <Text style={styles.restartButtonText}>Restart</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <>
          <Ball position={ballPosition} onMove={(x, y) => setBallPosition({ x, y })} />
          <Text style={styles.scoreText}>Score: {score}</Text>
          <Text style={styles.bestScoreText}>Best Score: {bestScore}</Text>
          <Text style={styles.levelText}>Level: {level}</Text>
          
          {obstacles.map((obstacle) => (
            <Obstacle key={obstacle.id} {...obstacle} />
          ))}
          
          {/* Bottom colored ground */}
          <View style={styles.ground} />
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
  },
  scoreText: {
    fontSize: 20,
    fontWeight: 'bold',
    position: 'absolute',
    top: 50,
  },
  bestScoreText: {
    fontSize: 18,
    fontWeight: 'bold',
    position: 'absolute',
    top: 80,
  },
  levelText: {
    fontSize: 18,
    fontWeight: 'bold',
    position: 'absolute',
    top: 110,
  },
  gameOverContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  gameOverText: {
    fontSize: 30,
    color: 'red',
  },
  restartButton: {
    marginTop: 20,
    backgroundColor: '#FF6347',
    padding: 10,
    borderRadius: 5,
  },
  restartButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  
  // Bottom "ground" where obstacles will vanish
  ground: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    width: '100%',
    height: 50, // Adjust height based on where you want the bottom portion
    backgroundColor: '#8B4513', // Ground color (can be changed to an image if needed)
  },
});

export default GameScreen;
