import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import Ticket from "../Ticket/Ticket";
import Loading from "../Loading/Loading";
import styles from "./TicketsList.module.css";
import { TicketInterface } from "../../store/types/ticketTypes";
import { selectTransferSort } from "../../store/reducers/transferSortReducer";
import { selectTransferFilter } from "../../store/reducers/transferFilterReducer";
import {
  fetchSearchId,
  fetchTickets,
} from "../../store/actions/ticketsListActions";
import { selectTicketsList } from "../../store/reducers/ticketsListReducer";
import InfiniteScrollContainer, { InfiniteScrollContainerElement } from "../InfiniteScrollContainer/InfiniteScrollContainer";

export default function TicketsList() {
  const ticketsList = useSelector(selectTicketsList);
  const transferSort = useSelector(selectTransferSort);
  const transferFilter = useSelector(selectTransferFilter);
  const [isError, setIsError] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchSearchId());
  }, [dispatch]);

  useEffect(() => {
    if (
      !ticketsList.isAll &&
      ticketsList.status === "success" &&
      ticketsList.searchId
    ) {
      dispatch(fetchTickets(ticketsList.searchId));
    }
  }, [dispatch, ticketsList.searchId, ticketsList.isAll, ticketsList.status]);

  useEffect(() => {
    if (ticketsList.status === "failed") {
      setIsError(true);
      setTimeout(() => {
        setIsError(false);
        dispatch(fetchTickets(ticketsList.searchId));
      }, 500);
    }
  }, [dispatch, ticketsList.status, ticketsList.searchId]);


  let color: string = "";
  if (isError) {
    color = "red";
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
        <Loading color={color} size={80} />
      ) : list.length ? (
        <InfiniteScrollContainer elements={list} elementJSX={Ticket as InfiniteScrollContainerElement} />
      ) : (
        <h2>Билетов нет</h2>
      )}
    </section>
  );
}
