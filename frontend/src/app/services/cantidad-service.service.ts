import { Injectable } from '@angular/core';

interface Servicio {
  cantidad: number;
  priceTicket: number;
  web: number;
  servicio: number;
  base: number;
  iva: number;
  totalUSD: number;
  total: number;
}


@Injectable({
  providedIn: 'root'
})
export class CantidadServiceService {

  private servicios: Servicio[] | undefined;

  constructor() { }

  setServicios(servicios: Servicio[]) {
    this.servicios = servicios;
  }

  getServicios() {
    return this.servicios;
  }
}
