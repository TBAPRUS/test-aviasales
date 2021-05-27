import React from "react";
import { TicketInterface } from "../../store/types/ticketTypes";
import styles from "./TicketContentRow.module.css";

function addZero(el: number | string, len: number = 2) {
  const str = el.toString();
  if (str.length === len) return str;
  return `${"0".repeat(len - str.length)}${str}`;
}

function dateAndDurationToStr(date: string, duration: number) {
  const startDate = new Date(date);
  const endSate = new Date(startDate.getTime() + duration * 1000 * 60);
  const start = `${addZero(startDate.getHours())}:${addZero(
    startDate.getMinutes()
  )}`;
  const end = `${addZero(endSate.getHours())}:${addZero(endSate.getMinutes())}`;
  return `${start} - ${end}`;
}

function durationToStr(duration: number): string {
  const hours = Math.floor(duration / 60);
  const minutes = duration - hours * 60;
  return `${hours}ч ${minutes}м`;
}

function stopsLenToStr(len: number): string {
  if (len === 0) return "0 ПЕРЕСАДОК";
  if (len === 1) return "1 ПЕРЕСАДКА";
  return `${len} ПЕРЕСАДКИ`;
}

function stopsToStr(stops: string[]): string {
  return stops.join(", ");
}

export default function TicketContentRow(
  props: TicketInterface["segments"][0]
) {
  const path = `${props.origin} - ${props.destination}`;
  const date = dateAndDurationToStr(props.date, props.duration);
  const duration = durationToStr(props.duration);
  const stopsTitle = stopsLenToStr(props.stops.length);
  const stops = stopsToStr(props.stops);
  return (
    <div className={styles.container}>
      <div>
        <p className={styles.title}>{path}</p>
        <p className={styles.info}>{date}</p>
      </div>
      <div>
        <p className={styles.title}>В ПУТИ</p>
        <p className={styles.info}>{duration}</p>
      </div>
      <div>
        <p className={styles.title}>{stopsTitle}</p>
        <p className={styles.info}>{stops}</p>
      </div>
    </div>
  );
}
