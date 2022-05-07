import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { Subject } from "rxjs";
import { map } from "rxjs/operators";

import { Escolaridad } from "./escolaridad.model";

@Injectable({providedIn: "root"})
export class EscolaridadService {
  private escolaridades: Escolaridad[] = [];
  private escolaridadesUpdated = new Subject<Escolaridad[]>();

  constructor(private http: HttpClient, private router: Router) {}

  servidor: string = "http://localhost:3000"

  getEscolaridades() {
    this.http.get<{mensaje: string, escolaridades: any}>(this.servidor + "/escolaridades")
      .pipe(map((escolaridadData) => {
        return escolaridadData.escolaridades.map((escolaridad: { _id: any; nombre: any; }) => {
          return {
            id: escolaridad._id,
            nombre: escolaridad.nombre
          };
        });
      }))
      .subscribe((escolaridades) => {
        this.escolaridades = escolaridades;
        this.escolaridadesUpdated.next([...this.escolaridades]);
      });
  }

  getEscolaridadesUpdateListener() {
    return this.escolaridadesUpdated.asObservable();
  }
}
