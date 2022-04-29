import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { Subject } from "rxjs";
import { map } from "rxjs/operators";

import { Estado } from "./estado.model";

@Injectable({providedIn: "root"})
export class EstadoService {
  private estados: Estado[] = [];
  private estadosUpdated = new Subject<Estado[]>();

  constructor(private http: HttpClient, private router: Router) {}

  servidor: string = "http://www.nexus.co.cu:3000"

  getEstados() {
    this.http.get<{mensaje: string, estados: any}>(this.servidor + "/estados")
      .pipe(map((estadoData) => {
        return estadoData.estados.map((estado: { _id: any; nombre: any; }) => {
          return {
            id: estado._id,
            nombre: estado.nombre
          };
        });
      }))
      .subscribe((estados) => {
        this.estados = estados;
        this.estadosUpdated.next([...this.estados]);
      });
  }

  getEstadosUpdateListener() {
    return this.estadosUpdated.asObservable();
  }
}
