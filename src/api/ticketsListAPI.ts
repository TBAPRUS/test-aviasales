import axios, { AxiosResponse, AxiosError } from "axios";
import { AviasalesTicketInterface } from "../store/types/ticketTypes";

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
  tickets: AviasalesTicketInterface[];
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
