import { User } from "./user";

export interface Reservation {
    id: string;
    turno: string;
    fecha: string;
    dia: number;
    mes: number;
    año: number;
    usuario: string;
    departamento: string;
    timestamp: string;
    observacion: string;
  }
  