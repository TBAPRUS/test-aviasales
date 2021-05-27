import React from "react";
import TicketContentRow from "../TicketContentRow/TicketContentRow";
import styles from "./Ticket.module.css";
import { TicketInterface } from "../../store/types/ticketTypes";
import { InfiniteScrollContainerElementProps } from "../InfiniteScrollContainer/InfiniteScrollContainer";

export interface TicketProps
  extends TicketInterface,
    InfiniteScrollContainerElementProps {}

function priceToStr(price: number) {
  let priceStr: string = price.toString();
  const temp: string[] = [];
  let i = priceStr.length;
  while (true) {
    if (i - 3 < 0) {
      if (i - 3 <= -3) {
        break;
      }
      temp.unshift(priceStr.substr(0, i));
    } else {
      temp.unshift(priceStr.substr(i - 3, 3));
    }
    i -= 3;
  }
  return temp.join(" ") + " Р";
}

export default function Ticket(props: TicketProps) {
  const price = priceToStr(props.price);
  return (
    <article ref={props.containerRef} className={styles.ticket}>
      <div className={styles.header}>
        <h3 className={styles.price}>{price}</h3>
        <div></div>
        <p className={styles.carrier}>{props.carrier}</p>
      </div>
      <div className={styles.content}>
        <TicketContentRow {...props.segments[0]} />
        <TicketContentRow {...props.segments[1]} />
      </div>
    </article>
  );
}
