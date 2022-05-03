import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { Subject } from "rxjs";
import { map } from "rxjs/operators";

import { Provincia } from "./provincia.model";

@Injectable({providedIn: "root"})
export class ProvinciaService {
  private provincias: Provincia[] = [];
  private provinciasUpdated = new Subject<Provincia[]>();

  constructor(private http: HttpClient, private router: Router) {}

  servidor: string = "http://localhost:3000"

  getProvincias() {
    this.http.get<{mensaje: string, provincias: any}>(this.servidor + "/provincias")
      .pipe(map((provinciaData) => {
        return provinciaData.provincias.map((provincia: { _id: any; nombre: any; }) => {
          return {
            id: provincia._id,
            nombre: provincia.nombre
          };
        });
      }))
      .subscribe((provincias) => {
        this.provincias = provincias;
        this.provinciasUpdated.next([...this.provincias]);
      });
  }

  getProvinciasUpdateListener() {
    return this.provinciasUpdated.asObservable();
  }
}
