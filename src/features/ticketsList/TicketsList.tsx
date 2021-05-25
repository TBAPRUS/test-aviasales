import { useCallback, useEffect, useState } from "react";
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
  const [isError, setIsError] = useState(false);
  const [ticketHeight, setTicketHeight] = useState(0);
  const [ticketSpace, setTicketSpace] = useState(0);
  const [ticketCountOnScreen, setTicketCountOnScreen] = useState(0);
  const [startTicketIndex, setStartTicketIndex] = useState(0);
  const [scrollLength, setScrollLength] = useState(0);
  const [lastPageYOffset, setLastPageYOffset] = useState(0);
  const [startList, setStartList] = useState(0);
  const dispatch = useAppDispatch();
  const ticketCountMargin = 2;

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

  useEffect(() => {
    if (
      scrollLength >
      ticketHeight +
        ticketSpace +
        startList +
        (ticketCountMargin + 1) * ticketHeight +
        ticketCountMargin * ticketSpace
    ) {
      window.scrollBy(0, -(ticketHeight + ticketSpace));
      setLastPageYOffset(window.pageYOffset);
      setStartTicketIndex((startTicketIndex) => startTicketIndex + 1);
      setScrollLength(
        (scrollLength) => scrollLength - (ticketHeight + ticketSpace)
      );
    } else if (
      scrollLength <
      startList +
        ticketCountMargin * ticketHeight +
        (ticketCountMargin - 1) * ticketSpace
    ) {
      if (startTicketIndex > 0) {
        window.scrollBy(0, ticketHeight + ticketSpace);
        setLastPageYOffset(window.pageYOffset);
        setStartTicketIndex((startTicketIndex) =>
          startTicketIndex > 0 ? startTicketIndex - 1 : 0
        );
        setScrollLength(
          (scrollLength) => scrollLength + ticketHeight + ticketSpace
        );
      }
    }
  }, [scrollLength, ticketHeight, ticketSpace, startTicketIndex, startList]);

  useEffect(() => {
    const listener = (e: Event) => {
      let newLastPageYOffset = window.pageYOffset;
      const difference = window.pageYOffset - lastPageYOffset;
      setScrollLength((scrollLength) => scrollLength + difference);
      setLastPageYOffset(newLastPageYOffset);
    };
    window.addEventListener("scroll", listener);
    return () => {
      window.removeEventListener("scroll", listener);
    };
  }, [
    ticketCountMargin,
    ticketHeight,
    ticketSpace,
    startList,
    lastPageYOffset,
    scrollLength,
  ]);

  useEffect(() => {
    setTicketCountOnScreen(window.innerHeight / ticketHeight);
  }, [ticketHeight]);

  const ticketRef = useCallback((node: HTMLElement) => {
    if (node) {
      const parent = node.parentElement;
      if (parent) {
        setStartList(parent.getBoundingClientRect().top + window.scrollY);
        setTicketSpace(
          parent.children[1].getBoundingClientRect().top -
            parent.children[0].getBoundingClientRect().bottom
        );
      }
      setTicketHeight(node.getBoundingClientRect().height);
    }
  }, []);

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
  list = list.slice(
    startTicketIndex,
    startTicketIndex + ticketCountOnScreen + (ticketCountMargin + 2) * 2
  );
  const firstTicket = list.shift();
  const tickets: JSX.Element[] = list.map((ticket) => (
    <Ticket key={ticket.id} {...ticket} />
  ));
  if (firstTicket) {
    tickets.unshift(
      <Ticket key={firstTicket.id} containerRef={ticketRef} {...firstTicket} />
    );
  }

  return (
    <section className={styles.list}>
      {!ticketsList.isAll ? (
        <Loading colors={colors} size={80} />
      ) : firstTicket ? (
        tickets
      ) : (
        <h2>Билетов нет</h2>
      )}
    </section>
  );
}
