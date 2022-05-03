import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { Subject } from "rxjs";
import { map } from "rxjs/operators";

import { Situacion } from "./situacion_laboral.model";

@Injectable({providedIn: "root"})
export class SituacionService {
  private situacioneses: Situacion[] = [];
  private situacionesesUpdated = new Subject<Situacion[]>();

  constructor(private http: HttpClient, private router: Router) {}

  servidor: string = "http://localhost:3000"

  getSituaciones() {
    this.http.get<{mensaje: string, situaciones: any}>(this.servidor + "/situaciones")
      .pipe(map((situacionData) => {
        return situacionData.situaciones.map((situacion: { _id: any; nombre: any; }) => {
          return {
            id: situacion._id,
            nombre: situacion.nombre
          };
        });
      }))
      .subscribe((situacioneses) => {
        this.situacioneses = situacioneses;
        this.situacionesesUpdated.next([...this.situacioneses]);
      });
  }

  getSituacionesUpdateListener() {
    return this.situacionesesUpdated.asObservable();
  }
}
