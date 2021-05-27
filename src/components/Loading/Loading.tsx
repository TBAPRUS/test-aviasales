import React from "react";
import styles from "./Loading.module.css";

export interface LoadingProps {
  color?: string;
  size?: number;
}

export default function Loading(props: LoadingProps) {
  let color: string = "";
  if (props.color) {
    color = props.color;
  } else {
    color = "rgb(120, 84, 189)";
  }

  let containerSize: number = 50;
  if (props.size) {
    containerSize = props.size;
  }
  const lineSize = containerSize / 2;
  const borderSize = lineSize / 5;

  const containerStyle = {
    width: `${containerSize}px`,
    height: `${containerSize}px`,
  };
  const lineStyle = {
    borderColor: color,
    width: `${lineSize}px`,
    height: `${lineSize}px`,
    borderWidth: `${borderSize}px`,
  };

  return (
    <div className={styles.loading} style={containerStyle}>
      <div style={lineStyle} />
      <div style={lineStyle} />
      <div style={lineStyle} />
      <div style={lineStyle} />
    </div>
  );
}
