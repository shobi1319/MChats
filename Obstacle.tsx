import React from 'react';
import { Animated, StyleSheet, View, ViewStyle } from 'react-native';

interface ObstacleProps {
  left: number;
  top: number;
  color: string;
  shape: string; // Shape will be a string like 'circle', 'square', or 'triangle'
}

const Obstacle: React.FC<ObstacleProps> = ({ left, top, color, shape }) => {
  const shapeStyle = getShapeStyle(shape, color);

  return (
    <Animated.View
      style={[styles.obstacle, { left, top }, shapeStyle]}
    />
  );
};

// Function to determine style based on shape
const getShapeStyle = (shape: string, color: string): ViewStyle => {
  switch (shape) {
    case 'circle':
      return {
        width: 50,
        height: 50,
        borderRadius: 25,
        backgroundColor: color,
      };
    case 'square':
      return {
        width: 50,
        height: 50,
        backgroundColor: color,
      };
    case 'triangle':
      return {
        width: 0,
        height: 0,
        borderLeftWidth: 25,
        borderRightWidth: 25,
        borderBottomWidth: 50,
        borderLeftColor: 'transparent',
        borderRightColor: 'transparent',
        borderBottomColor: color,
      };
    case 'rectangle':
      return {
        width: 100,
        height: 50,
        backgroundColor: color,
      };
    default:
      return {
        width: 50,
        height: 50,
        backgroundColor: color,
      };
  }
};

const styles = StyleSheet.create({
  obstacle: {
    position: 'absolute',
    elevation: 5,
  },
});

export default Obstacle;
