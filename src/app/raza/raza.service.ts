import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { Subject } from "rxjs";
import { map } from "rxjs/operators";

import { Raza } from "./raza.model";

@Injectable({providedIn: "root"})
export class RazaService {
  private razas: Raza[] = [];
  private razasUpdated = new Subject<Raza[]>();

  constructor(private http: HttpClient, private router: Router) {}

  servidor: string = "http://localhost:3000"

  getRazas() {
    this.http.get<{mensaje: string, razas: any}>(this.servidor + "/razas")
      .pipe(map((razaData) => {
        return razaData.razas.map((raza: { _id: any; nombre: any; }) => {
          return {
            id: raza._id,
            nombre: raza.nombre
          };
        });
      }))
      .subscribe((razas) => {
        this.razas = razas;
        this.razasUpdated.next([...this.razas]);
      });
  }

  getRazasUpdateListener() {
    return this.razasUpdated.asObservable();
  }
}
