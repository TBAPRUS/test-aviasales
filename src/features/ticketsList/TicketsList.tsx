import axios from "axios";
import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { Ticket } from "../Ticket/Ticket";
import {
  selectTicketsList,
  fetchSearchId,
  fetchTickets,
} from "./ticketsListSlice";
import { Loading } from "../loading/Loading";
import styles from "./TicketsList.module.css";
import { selectTransferSort } from "../transferSort/transferSortSlice";
import { selectTransferFilter } from "../transferFilter/transferFilterSlice";
import { TicketInterface } from "../Ticket/TicketSlice";

export function TicketsList() {
  const ticketsList = useAppSelector(selectTicketsList);
  const transferSort = useAppSelector(selectTransferSort);
  const transferFilter = useAppSelector(selectTransferFilter);
  const dispatch = useAppDispatch();
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    dispatch(fetchSearchId());
  }, []);

  useEffect(() => {
    if (
      !ticketsList.isAll &&
      ticketsList.status === "success" &&
      ticketsList.searchId
    ) {
      dispatch(fetchTickets(ticketsList.searchId));
    }
  }, [ticketsList.searchId, ticketsList.isAll, ticketsList.status]);

  useEffect(() => {
    if (ticketsList.status === "failed") {
      setIsError(true);
      setTimeout(() => {
        setIsError(false);
        dispatch(fetchTickets(ticketsList.searchId));
      }, 500);
    }
  }, [ticketsList.status]);

  let colors = "default";
  if (isError) {
    colors = "red";
  }

  let list: TicketInterface[] = [];
  if (transferSort.cheapest) {
    list = [...ticketsList.tickets].sort((a, b) => a.price - b.price);
  } else {
    list = [...ticketsList.tickets].sort(
      (a, b) =>
        a.segments[0].duration +
        a.segments[1].duration -
        (b.segments[0].duration + b.segments[1].duration)
    );
  }
  const available: number[] = [];
  if (transferFilter.noTransfers.checked) available.push(0);
  if (transferFilter.oneTransfers.checked) available.push(1);
  if (transferFilter.twoTransfers.checked) available.push(2);
  if (transferFilter.threeTransfers.checked) available.push(3);
  if (available.length !== 4) {
    list = list.filter(
      (ticket) =>
        available.includes(ticket.segments[0].stops.length) &&
        available.includes(ticket.segments[1].stops.length)
    );
  }

  return (
    <section className={styles.list}>
      {!ticketsList.isAll ? (
        <Loading colors={colors} size={80} />
      ) : (
        list
          .slice(0, 10)
          .map((ticket) => (
            <Ticket key={ticket.price + ticket.carrier} {...ticket} />
          ))
      )}
    </section>
  );
}
