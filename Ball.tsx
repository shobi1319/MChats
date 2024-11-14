// Ball.tsx
import React from 'react';
import { Animated, StyleSheet, PanResponder } from 'react-native';

interface BallProps {
  position: { x: number; y: number };
  onMove: (x: number, y: number) => void;
}

const Ball: React.FC<BallProps> = ({ position, onMove }) => {
  const ballRadius = 25;

  const panResponder = PanResponder.create({
    onStartShouldSetPanResponder: () => true,
    onPanResponderMove: (_, gestureState) => {
      const newX = Math.max(0, Math.min(gestureState.moveX - ballRadius, 300));
      const newY = Math.max(0, Math.min(gestureState.moveY - ballRadius, 600));
      onMove(newX, newY); // Update ball position in parent component
    },
  });

  return (
    <Animated.View
      {...panResponder.panHandlers}
      style={[styles.ball, { left: position.x, top: position.y }]}
    />
  );
};

const styles = StyleSheet.create({
  ball: {
    position: 'absolute',
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: 'blue',
  },
});

export default Ball;
