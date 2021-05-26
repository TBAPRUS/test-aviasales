import React from "react";
import styles from "./Loading.module.css";

export interface LoadingProps {
  colors?: "default" | string | string[];
  size?: number;
}

export default function Loading(props: LoadingProps) {
  let colors: string[] = [];
  if (props.colors && props.colors !== "default") {
    colors = !Array.isArray(props.colors) ? [props.colors] : [...props.colors];
  }
  switch (colors.length) {
    case 0:
      colors[0] = "rgb(120, 84, 189)";
      colors[1] = colors[0];
      colors[2] = colors[0];
      colors[3] = colors[0];
      break;
    case 1:
      colors[1] = colors[0];
      colors[2] = colors[0];
      colors[3] = colors[0];
      break;
    case 2:
      colors[3] = colors[0];
      colors[2] = colors[1];
      break;
    case 3:
      colors[3] = colors[0];
      break;
  }

  let containerSize: number = 50;
  if (props.size) {
    containerSize = props.size;
  }
  const lineSize = containerSize / 2;
  const borderSize = lineSize / 5;

  return (
    <div
      className={styles.loading}
      style={{ width: `${containerSize}px`, height: `${containerSize}px` }}
    >
      {colors.map((color, i) => (
        <div
          key={i}
          style={{
            borderColor: color,
            width: `${lineSize}px`,
            height: `${lineSize}px`,
            borderWidth: `${borderSize}px`,
          }}
        />
      ))}
    </div>
  );
}
