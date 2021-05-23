import axios, { AxiosResponse, AxiosError } from "axios";
import { TicketInterface } from "../Ticket/TicketSlice";

export const fetchSearchId = () =>
  new Promise<string>((resolve, reject) =>
    axios
      .get("https://front-test.beta.aviasales.ru/search")
      .then((res: AxiosResponse<{ searchId: string }>) =>
        resolve(res.data.searchId)
      )
      .catch((err: AxiosError<string>) => reject(err.response?.data))
  );

export interface TicketsResponse {
  stop: boolean;
  tickets: TicketInterface[];
}

export const fetchTickets = (searchId: string) =>
  new Promise<TicketsResponse>((resolve, reject) =>
    axios
      .get("https://front-test.beta.aviasales.ru/tickets", {
        params: { searchId },
      })
      .then((res: AxiosResponse<TicketsResponse>) => resolve(res.data))
      .catch((err: AxiosError<string>) => reject(err.response?.data))
  );
