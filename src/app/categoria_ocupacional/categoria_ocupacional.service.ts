import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { Subject } from "rxjs";
import { map } from "rxjs/operators";

import { Categoria } from "./categoria_ocupacional.model";

@Injectable({providedIn: "root"})
export class CategoriaService {
  private categorias: Categoria[] = [];
  private categoriasUpdated = new Subject<Categoria[]>();

  constructor(private http: HttpClient, private router: Router) {}

  servidor: string = "http://www.nexus.co.cu:3000"

  getCategorias() {
    this.http.get<{mensaje: string, categorias: any}>(this.servidor + "/categorias")
      .pipe(map((categoriaData) => {
        return categoriaData.categorias.map((categoria: { _id: any; nombre: any; }) => {
          return {
            id: categoria._id,
            nombre: categoria.nombre
          };
        });
      }))
      .subscribe((categorias) => {
        this.categorias = categorias;
        this.categoriasUpdated.next([...this.categorias]);
      });
  }

  getCategoriasUpdateListener() {
    return this.categoriasUpdated.asObservable();
  }
}
