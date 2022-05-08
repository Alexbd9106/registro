import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';

import { Aspirante } from '../aspirante.model';
import { Categoria } from '../../categoria_ocupacional/categoria_ocupacional.model';
import { Escolaridad } from '../../escolaridad/escolaridad.model';
import { Estado } from '../../estado/estado.model';
import { Provincia } from 'src/app/provincia/provincia.model';
import { Raza } from '../../raza/raza.model';
import { Situacion } from '../../situacion_laboral/situacion_laboral.model';

import { AspiranteService } from '../aspirante.service';
import { CategoriaService } from '../../categoria_ocupacional/categoria_ocupacional.service';
import { EscolaridadService } from '../../escolaridad/escolaridad.service';
import { EstadoService } from '../../estado/estado.service';
import { ProvinciaService } from '../../provincia/provincia.service';
import { RazaService } from '../../raza/raza.service';
import { SituacionService } from '../../situacion_laboral/situacion_laboral.service';

import { Subscription } from 'rxjs';

export let trayectoria_laboral: any = [];

@Component({
  selector: 'app-crear-aspirante',
  templateUrl: './crear-aspirante.component.html',
  styleUrls: ['./crear-aspirante.component.css'],
})
export class CrearAspiranteComponent implements OnInit {
  public trayectoria_laboral = trayectoria_laboral;

  licencia = false;
  terminos = false;
  categoria_licencia: string[] = [];
  militancia: string[] = [];

  aspirantes: Aspirante[] = [];
  private aspiranrtesSub: Subscription = new Subscription;

  categorias: Categoria[] = [];
  private categoriasSub: Subscription = new Subscription;

  niveles_escolaridad: Escolaridad[] = [];
  private escolaridadSub: Subscription = new Subscription;

  estados_civiles: Estado[] = [];
  private estadoSub: Subscription = new Subscription;

  provincias: Provincia[] = [];
  private provinciaSub: Subscription = new Subscription;

  razas: Raza[] = [];
  private razaSub: Subscription = new Subscription;

  situaciones_laborales: Situacion[] = [];
  private situacionSub: Subscription = new Subscription;

  form!: FormGroup;
  imagenPrevisualizada: string = '';

  isLoading: boolean = false;

  provincia: any[] = [];
  municipios: any[] = [];

  existe = false;

  a1 = false;
  a = false;
  b = false;
  c1 = false;
  c = false;
  d1 = false;
  d = false;
  e = false;
  f = false;
  fe = false;

  pcc = false;
  ujc = false;
  ctc = false;

  situacion_laboral = "";
  vinculo_laboral = false;
  desvinculado = false;
  recien_graduado = false;
  jubilado = false;
  desmovilizado_far = false;
  minint = false;

  ciExiste = false;

  constructor(
    public aspiranteService: AspiranteService,
    public categoriaService: CategoriaService,
    public escolaridadService: EscolaridadService,
    public estadoService: EstadoService,
    public provinciaService: ProvinciaService,
    public razaService: RazaService,
    public situacionService: SituacionService,
    public dialog: MatDialog
  ) { }

  ci = new FormControl(null, [Validators.required, Validators.minLength(11), Validators.maxLength(11)] );

  getErrorMessage() {
    return "Este campo no puede estar vacío";
  }

  getErrorMessageCI(): any {
    for (let i = 0; i < this.aspirantes.length; i++) {
      if (this.form.value.ci == null || this.form.value.ci == "") {
        return "Este campo no puede estar vacío";
      } else if (this.form.value.ci.length != 11) {
        return "Este valor debe tener 11 dígitos";
      } else if (this.aspirantes[i].ci == this.form.value.ci) {
        return "Este carné de identidad ya existe en nuestro sistema";
      } else if (this.aspirantes[i].ci != this.form.value.ci) {
        return "Este carné de identidad puede ser utilizado";
      }
    }
  }

  ngOnInit(): void {
    this.form = new FormGroup({
      nombre: new FormControl(null, { validators: [Validators.required] }),
      apellidos: new FormControl(null, { validators: [Validators.required] }),
      alias: new FormControl(""),
      ci: new FormControl(null, [Validators.required, Validators.minLength(11), Validators.maxLength(11)] ),
      provincia: new FormControl(null, { validators: [Validators.required] }),
      municipio: new FormControl(null, { validators: [Validators.required] }),
      direccion: new FormControl(null, { validators: [Validators.required] }),
      correo: new FormControl(null, { validators: [Validators.email] }),
      telefono: new FormControl(null, { validators: [Validators.required] }),
      raza: new FormControl(null, { validators: [Validators.required] }),
      estatura: new FormControl(null, { validators: [Validators.required] }),
      peso: new FormControl(null, { validators: [Validators.required] }),
      estado_civil: new FormControl(null, { validators: [Validators.required] }),
      hijos: new FormControl(""),
      licencia: new FormControl(false),
      categoria_licencia: new FormControl(""),
      militancia: new FormControl(""),
      nivel_escolaridad: new FormControl(null, { validators: [Validators.required] }),
      titulo_graduado: new FormControl(null, { validators: [Validators.required] }),
      experiencia_laboral: new FormControl(null, { validators: [Validators.required] }),
      otros_estudios: new FormControl(""),
      trayectoria_laboral: new FormControl(""),
      situacion_laboral: new FormControl(null, { validators: [Validators.required] }),
      centro_trabajo: new FormControl(""),
      organismo_trabajo: new FormControl(""),
      cargo_trabajo: new FormControl(""),
      categoria_trabajo: new FormControl(""),
      direccion_trabajo: new FormControl(""),
      telefono_trabajo: new FormControl(""),
      otros_oficios: new FormControl("")
    });

    this.aspiranteService.getAspirantes();
    this.aspiranrtesSub = this.aspiranteService
      .getAspirantesUpdateListener()
      .subscribe((aspirantes: Aspirante[]) => {
        this.aspirantes = aspirantes;
      });

    this.categoriaService.getCategorias();
    this.categoriasSub = this.categoriaService
      .getCategoriasUpdateListener()
      .subscribe((categorias: Categoria[]) => {
        this.categorias = categorias;
      });

    this.escolaridadService.getEscolaridades();
    this.escolaridadSub = this.escolaridadService
      .getEscolaridadesUpdateListener()
      .subscribe((escolaridades: Escolaridad[]) => {
        this.niveles_escolaridad = escolaridades;
      });

    this.estadoService.getEstados();
    this.estadoSub = this.estadoService
      .getEstadosUpdateListener()
      .subscribe((estados: Estado[]) => {
        this.estados_civiles = estados;
      });

    this.provinciaService.getProvincias();
    this.provinciaSub = this.provinciaService
      .getProvinciasUpdateListener()
      .subscribe((provincias: Provincia[]) => {
        this.provincias = provincias;
      });

    this.razaService.getRazas();
    this.razaSub = this.razaService
      .getRazasUpdateListener()
      .subscribe((razas: Raza[]) => {
        this.razas = razas;
      });

    this.situacionService.getSituaciones();
    this.situacionSub = this.situacionService
      .getSituacionesUpdateListener()
      .subscribe((situaciones: Situacion[]) => {
        this.situaciones_laborales = situaciones;
      });
  }

  selectMunicipio(provincia: string) {
    this.provincia.push(provincia);
    let unicos = Array.from(new Set(this.provincia));
    let lastItem = unicos.pop();
    this.municipios = this.aspiranteService.selecionarMunicipio(lastItem);
  }

  selectSituacionLaboral(situacion_laboral: string) {
    this.situacion_laboral = situacion_laboral;
    this.vinculo_laboral = this.aspiranteService.selecionarSituacionLaboral(situacion_laboral)[0];
    this.desvinculado = this.aspiranteService.selecionarSituacionLaboral(situacion_laboral)[1];
    this.recien_graduado = this.aspiranteService.selecionarSituacionLaboral(situacion_laboral)[2];
    this.jubilado = this.aspiranteService.selecionarSituacionLaboral(situacion_laboral)[3];
    this.desmovilizado_far = this.aspiranteService.selecionarSituacionLaboral(situacion_laboral)[4];
    this.minint = this.aspiranteService.selecionarSituacionLaboral(situacion_laboral)[5];
  }

  onCreateAspirante() {

    if (this.a1 == true) {
      this.categoria_licencia.push('A-1 Ciclomotor');
    }
    if (this.a == true) {
      this.categoria_licencia.push('A Motocicleta');
    }
    if (this.b == true) {
      this.categoria_licencia.push('B Automóvil');
    }
    if (this.c1 == true) {
      this.categoria_licencia.push('C-1 Camión (Hasta 7500 Kg)');
    }
    if (this.c == true) {
      this.categoria_licencia.push('C Camión (Más de 7500 Kg)');
    }
    if (this.d1 == true) {
      this.categoria_licencia.push('D-1 Microbus');
    }
    if (this.d == true) {
      this.categoria_licencia.push('D Ómnibus');
    }
    if (this.e == true) {
      this.categoria_licencia.push('E Articulado');
    }
    if (this.f == true) {
      this.categoria_licencia.push('F Agro Industrial y de la Construcción');
    }
    if (this.fe == true) {
      this.categoria_licencia.push('FE Tractor con Remolques');
    }

    if (this.pcc == true) {
      this.militancia.push('PCC');
    }
    if (this.ujc == true) {
      this.militancia.push('UJC');
    }
    if (this.ctc == true) {
      this.militancia.push('CTC');
    }

    let jsonStringTrayectoriaCreate = JSON.stringify(
      Object.assign([], trayectoria_laboral)
    );

    if(this.form.value.situacion_laboral == null || this.form.value.situacion_laboral == "") {
      this.form.value.situacion_laboral == "Desvinculado";
    }

    if (this.form.value.situacion_laboral == "Desvinculado" || this.form.value.situacion_laboral == "Recien Graduado" || this.form.value.situacion_laboral == "Jubilado") {
      this.form.value.centro_trabajo = "";
      this.form.value.organismo_trabajo = "";
      this.form.value.cargo_trabajo = "";
      this.form.value.categoria_trabajo = "";
      this.form.value.direccion_trabajo = "";
      this.form.value.telefono_trabajo = "";
      this.form.value.otros_oficios = "";
    }

    if(this.form.value.otros_estudios == null) {
      this.form.value.otros_estudios = "";
    }

    this.form.value.licencia = this.licencia;
    this.form.value.categoria_licencia = this.categoria_licencia.toString();
    this.form.value.militancia = this.militancia.toString();
    this.form.value.situacion_laboral = this.situacion_laboral;

    if (this.form.value.nombre !== null && this.form.value.apellidos !== null && this.form.value.ci !== null && this.form.value.provincia !== null && this.form.value.municipio !== null && this.form.value.direccion !== null && this.form.value.email !== null && this.form.value.telefono !== null && this.form.value.raza !== null && this.form.value.estatura !== null && this.form.value.peso !== null && this.form.value.estado_civil !== null && this.form.value.nivel_escolaridad !==null && this.form.value.titulo_graduado !== null && this.form.value.experiencia_laboral  !== null) {

      for (let i = 0; i < this.aspirantes.length; i++) {
        if (this.aspirantes[i].ci == this.form.value.ci) {
          this.ciExiste = true;
          return;
        } else {
          this.ciExiste = false;
        }
      }

      this.isLoading = true;

      this.aspiranteService.addAspirante(
        this.form.value.nombre,
        this.form.value.apellidos,
        this.form.value.alias,
        this.form.value.ci,
        this.aspiranteService.calcularEdad(this.form),
        this.aspiranteService.calcularSexo(this.form),
        this.form.value.provincia,
        this.form.value.municipio,
        this.form.value.direccion,
        this.form.value.correo,
        this.form.value.telefono,
        this.form.value.raza,
        this.form.value.estatura,
        this.form.value.peso,
        this.form.value.estado_civil,
        this.form.value.hijos,
        this.form.value.licencia,
        this.form.value.categoria_licencia,
        this.form.value.militancia,
        this.form.value.nivel_escolaridad,
        this.form.value.titulo_graduado,
        this.form.value.experiencia_laboral,
        this.form.value.otros_estudios,
        trayectoria_laboral,
        this.form.value.situacion_laboral,
        this.form.value.centro_trabajo,
        this.form.value.organismo_trabajo,
        this.form.value.cargo_trabajo,
        this.form.value.categoria_trabajo,
        this.form.value.direccion_trabajo,
        this.form.value.telefono_trabajo,
        this.form.value.otros_oficios,
        "Candidato sin Procesar",
        "",
        ""
      );
    }
  }

  openDialogTrayectoria() {
    const dialogRef = this.dialog.open(Trayectoria);
  }

  openTermsAndConditions() {
    const dialogRef = this.dialog.open(Terminos);
  }

  deleteTrayectoria(trayectoria: any) {
    trayectoria_laboral.forEach(function (trayect: any, i: any, object: any) {
      if (trayect[0] === trayectoria[0]) {
        object.splice(i, 1);
      }
    });
  }
}

@Component({
  selector: 'trayectoria',
  templateUrl: './trayectoria.html',
  styleUrls: ['./crear-aspirante.component.css'],
})
export class Trayectoria {

  error = new FormControl('', [Validators.required]);
  form!: FormGroup;

  validDates(){
    if (this.form.value.desde >= this.form.value.hasta) {
      return true;
    } else {
      return false;
    }
  }

  ngOnInit() {
    this.form = new FormGroup({
      actividad_desempennada: new FormControl(null, { validators: [Validators.required] }),
      centro_trabajo: new FormControl(null, { validators: [Validators.required] }),
      desde: new FormControl(null, { validators: [Validators.required] }),
      hasta: new FormControl(null, { validators: [Validators.required] }),
    });
  }

  onSaveTrayectoria() {
    if (this.form.invalid) {
      return;
    }

    let trayectoria = new Array();
    trayectoria.push(this.form.value.actividad_desempennada);
    trayectoria.push(this.form.value.centro_trabajo);
    trayectoria.push(this.form.value.desde);
    trayectoria.push(this.form.value.hasta);
    trayectoria_laboral.push(trayectoria);

    this.form.reset();
  }
}

@Component({
  selector: 'terminos',
  templateUrl: './terminos.html',
  styleUrls: ['./crear-aspirante.component.css'],
})
export class Terminos { }
