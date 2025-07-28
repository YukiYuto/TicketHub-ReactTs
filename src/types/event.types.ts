import type { IResponseDTO } from "./common.types";

export interface IEvent {
  eventId: string;
  eventName: string;
  eventDescription: string;
  eventDate: string;
  location: string;
  status: number;
  eventImage: string;
  categoryId: string;
}

export type IEventResponseDTO = IResponseDTO<IEvent>;
