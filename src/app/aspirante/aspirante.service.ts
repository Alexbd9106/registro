import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';

import { Aspirante } from './aspirante.model';
import { FormGroup } from '@angular/forms';
import { map } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class AspiranteService {
  private aspirantes: Aspirante[] = [];
  private aspirantesUpdated = new Subject<Aspirante[]>();

  private servidor: string = 'http://localhost:3000';

  private municipios: any[] = [];

  constructor(private http: HttpClient, private router: Router) { }

  calcularEdad(form: FormGroup) {

    let edad = 0;

    const fecha = new Date();
    let anno = fecha.getFullYear().toString();
    let mes = (fecha.getMonth() + 1).toString();
    let dia = '';

    if (fecha.getMonth() < 10) {
      mes = '0' + (fecha.getMonth() + 1).toString();
    } else {
      mes = (fecha.getMonth() + 1).toString();
    }

    if (fecha.getDate() < 10) {
      dia = '0' + fecha.getDate().toString();
    } else {
      dia = fecha.getDate().toString();
    }

    let ci = form.value.ci.substring(0, 6);
    let fecha_actual = (anno + mes + dia).substring(2);

    edad = Number(fecha_actual) - Number(ci);

    if (edad % 10000 != 0) {
      edad = Math.floor(100 - (edad / 10000) * -1);
    } else if (edad % 10000 == 0) {
      edad = 100 - (edad / 10000) * -1;
    }

    return edad;
  }

  calcularSexo(form: FormGroup) {
    let sexo = '';
    let ci = form.value.ci.substring(9, 10);

    if (Number(ci) % 2 == 1) {
      sexo = 'Femenino';
    } else if (Number(ci) % 2 == 0) {
      sexo = 'Masculino';
    }

    return sexo;
  }

  selecionarMunicipio(provincia: string) {
    if (provincia == 'Pinar del Río') {
      this.municipios = [{ nombre: 'Pinar del Río' }, { nombre: 'Sandino' }, { nombre: 'Mantua' }, { nombre: 'Guane' }, { nombre: 'Minas de Matahambre' }, { nombre: 'San Juan y Martínez' }, { nombre: 'San Luis' }, { nombre: 'Viñales' }, { nombre: 'La Palma' }, { nombre: 'Consolación del Sur' }, { nombre: 'Los Palacios' }];
    } else if (provincia == 'Artemisa') {
      this.municipios = [{ nombre: 'Artemisa' }, { nombre: 'Bahía Honda' }, { nombre: 'San Cristobal' }, { nombre: 'Candelaria' }, { nombre: 'Mariel' }, { nombre: 'Guanajay' }, { nombre: 'Caimito' }, { nombre: 'Alquizar' }, { nombre: 'Bauta' }, { nombre: 'San Antonio de los Baños' }, { nombre: 'Güira de Melena' }];
    } else if (provincia == 'La Habana') {
      this.municipios = [{ nombre: 'Playa' }, { nombre: 'La Lisa' }, { nombre: 'Boyeros' }, { nombre: 'Marianao' }, { nombre: 'Plaza de la Revolución' }, { nombre: 'Cerro' }, { nombre: 'Diez de Octubre' }, { nombre: 'Arroyo Naranjo' }, { nombre: 'Centro Habana' }, { nombre: 'Habana Vieja' }, { nombre: 'Regla' }, { nombre: 'San Miguel del Padrón' }, { nombre: 'Cotorro' }, { nombre: 'Guanabacoa' }, { nombre: 'Habana del Este' }];
    } else if (provincia == 'Mayabeque') {
      this.municipios = [{ nombre: 'Bejucal' }, { nombre: 'Quivicán' }, { nombre: 'Batabanó' }, { nombre: 'San José de las Lajas' }, { nombre: 'Melena del Sur' }, { nombre: 'Güines' }, { nombre: 'Jaruco' }, { nombre: 'San Nicolás' }, { nombre: 'Santa Cruz del Norte' }, { nombre: 'Madruga' }, { nombre: 'Nueva Paz' }];
    } else if (provincia == 'Matanzas') {
      this.municipios = [{ nombre: 'Matanzas' }, { nombre: 'Limonar' }, { nombre: 'Unión de Reyaes' }, { nombre: 'Pedro Betancourt' }, { nombre: 'Cárdenas' }, { nombre: 'Jovellanos' }, { nombre: 'Jagüey Grande' }, { nombre: 'Perico' }, { nombre: 'Martí' }, { nombre: 'Colón' }, { nombre: 'Calimete' }, { nombre: 'Arabos' }, { nombre: 'Ciénaga de Zapata' }];
    } else if (provincia == 'Cienfuegos') {
      this.municipios = [{ nombre: 'Cienfuegos' }, { nombre: 'Aguada de Pasajeros' }, { nombre: 'Abreus' }, { nombre: 'Rodas' }, { nombre: 'Palmira' }, { nombre: 'Lajas' }, { nombre: 'Cruces' }, { nombre: 'Cumanayagua' }];
    } else if (provincia == 'Villa Clara') {
      this.municipios = [{ nombre: 'Santa Clara' }, { nombre: 'Corralillo' }, { nombre: 'Quemado de Güines' }, { nombre: 'Santo Domingo' }, { nombre: 'Sagua la Grande' }, { nombre: 'Cifuente' }, { nombre: 'Ranchuelo' }, { nombre: 'Encrucijada' }, { nombre: 'Camajuaní' }, { nombre: 'Manicaragua' }, { nombre: 'Placetas' }, { nombre: 'Remedios' }, { nombre: 'Caibarién' }];
    } else if (provincia == 'Sancti Spíritus') {
      this.municipios = [{ nombre: 'Sancti Spíritus' }, { nombre: 'Trinidad' }, { nombre: 'Fomento' }, { nombre: 'Cabaiguán' }, { nombre: 'Taguasco' }, { nombre: 'Yaguajay' }, { nombre: 'Jatibonico' }, { nombre: 'La Sierpe' }];
    } else if (provincia == 'Ciego de Ávila') {
      this.municipios = [{ nombre: 'Ciego de Ávila' }, { nombre: 'Chambas' }, { nombre: 'Florencia' }, { nombre: 'Majagua' }, { nombre: 'Morón' }, { nombre: 'Ciro Redondo' }, { nombre: 'Venezuela' }, { nombre: 'Baraguá' }, { nombre: 'Primero de Enero' }, { nombre: 'Bolivia' }];
    } else if (provincia == 'Camagüey') {
      this.municipios = [{ nombre: 'Camagüey' }, { nombre: 'Esmeralda' }, { nombre: 'Céspedes' }, { nombre: 'Florida' }, { nombre: 'Sierra de Cubitas' }, { nombre: 'Vertientes' }, { nombre: 'Minas' }, { nombre: 'Jimaguayú' }, { nombre: 'Najasa' }, { nombre: 'Santa Cruz del Sur' }, { nombre: 'Sibanicú' }, { nombre: 'Nuevitas' }, { nombre: 'Guáimaro' }];
    } else if (provincia == 'Las Tunas') {
      this.municipios = [{ nombre: 'Las Tunas' }, { nombre: 'Amancio Rodríguez' }, { nombre: 'Colombia' }, { nombre: 'Jobabo' }, { nombre: 'Majibacoa' }, { nombre: 'Manatí' }, { nombre: 'Puerto Padre' }, { nombre: 'Jesús Menéndez' }];
    } else if (provincia == 'Holguín') {
      this.municipios = [{ nombre: 'Holguín' }, { nombre: 'Gibara' }, { nombre: 'Calixto García' }, { nombre: 'Cacocum' }, { nombre: 'Rafael Freire' }, { nombre: 'Báguanos' }, { nombre: 'Úrbano Noris' }, { nombre: 'Banes' }, { nombre: 'Antilla' }, { nombre: 'Cueto' }, { nombre: 'Mayarí' }, { nombre: 'Frank País' }, { nombre: 'Sagua de Tánamo' }, { nombre: 'Moa' }];
    } else if (provincia == 'Granma') {
      this.municipios = [{ nombre: 'Río Cauto' }, { nombre: 'Cauto Cristo' }, { nombre: 'Bayamo' }, { nombre: 'Jiguaní' }, { nombre: 'Yara' }, { nombre: 'Guisa' }, { nombre: 'Buey Arriba' }, { nombre: 'Masó' }, { nombre: 'Manzanillo' }, { nombre: 'Campechuela' }, { nombre: 'Media Luna' }, { nombre: 'Niquero' }, { nombre: 'Pilón' }];
    } else if (provincia == 'Santiago de Cuba') {
      this.municipios = [{ nombre: 'Santiago de Cuba' }, { nombre: 'Contramaestre' }, { nombre: 'III Frente' }, { nombre: 'Guamá' }, { nombre: 'Mella' }, { nombre: 'Palma Soriano' }, { nombre: 'San Luis' }, { nombre: 'Songo la Maya' }, { nombre: 'II Frente' }];
    } else if (provincia == 'Guantánamo') {
      this.municipios = [{ nombre: 'Guantánamo' }, { nombre: 'El Salvador' }, { nombre: 'Niceto Pérez' }, { nombre: 'Caimanera' }, { nombre: 'Yateras' }, { nombre: 'Manuel Tames' }, { nombre: 'San Antonio del Sur' }, { nombre: 'Baracoa' }, { nombre: 'Imías' }, { nombre: 'Maisí' }];
    } else if (provincia == 'Isla de la Juventud') {
      this.municipios = [{ nombre: 'Isla de la Juventud' }];
    }
    return this.municipios;
  }

  selecionarSituacionLaboral(situacion_laboral: string) {
    let situaciones = [];
    let vinculo_laboral = false;
    let desvinculado = false;
    let recien_graduado = false;
    let jubilado = false;
    let desmovilizado_far = false;
    let minint = false;

    if (situacion_laboral == 'Con Vínculo Laboral') {
      situaciones.push(
        vinculo_laboral = true,
        desvinculado = false,
        recien_graduado = false,
        jubilado = false,
        desmovilizado_far = false,
        minint = false
      )
    } else if (situacion_laboral == 'Desvinculado') {
      situaciones.push(
        vinculo_laboral = false,
        desvinculado = true,
        recien_graduado = false,
        jubilado = false,
        desmovilizado_far = false,
        minint = false
      )
    } else if (situacion_laboral == 'Recien Graduado') {
      situaciones.push(
        vinculo_laboral = false,
        desvinculado = false,
        recien_graduado = true,
        jubilado = false,
        desmovilizado_far = false,
        minint = false
      )
    } else if (situacion_laboral == 'Jubilado') {
      situaciones.push(
        vinculo_laboral = false,
        desvinculado = false,
        recien_graduado = false,
        jubilado = true,
        desmovilizado_far = false,
        minint = false
      )
    } else if (situacion_laboral == 'Desmovilizado FAR') {
      situaciones.push(
        vinculo_laboral = false,
        desvinculado = false,
        recien_graduado = false,
        jubilado = false,
        desmovilizado_far = true,
        minint = false
      )
    } else if (situacion_laboral == 'MININT') {
      situaciones.push(
        vinculo_laboral = false,
        desvinculado = false,
        recien_graduado = false,
        jubilado = false,
        desmovilizado_far = false,
        minint = true
      )
    }

    return situaciones;
  }

  getAspirantes() {
    this.http.get<{mensaje: string, aspirantes: any}>(this.servidor + "/aspirantes")
      .pipe(map((aspiranteData) => {
        return aspiranteData.aspirantes.map((aspirante: any) => {
          return {
            id: aspirante._id,
            nombre: aspirante.nombre,
            apellidos: aspirante.apellidos,
            alias: aspirante.alias,
            ci: aspirante.ci,
            edad: aspirante.edad,
            sexo: aspirante.sexo,
            provincia: aspirante.provincia,
            municipio: aspirante.municipio,
            direccion: aspirante.direccion,
            correo: aspirante.correo,
            telefono: aspirante.telefono,
            color_piel: aspirante.color_piel,
            estatura: aspirante.estatura,
            peso: aspirante.peso,
            estado_civil: aspirante.estado_civil,
            hijos: aspirante.hijos,
            foto: aspirante.foto,
            licencia: aspirante.licencia,
            categoria_licencia: aspirante.categoria_licencia,
            militancia: aspirante.militancia,
            nivel_escolaridad: aspirante.nivel_escolaridad,
            titulo_graduado: aspirante.titulo_graduado,
            experiencia_laboral: aspirante.experiencia_laboral,
            otros_estudios: aspirante.otros_estudios,
            trayectoria_laboral: aspirante.trayectoria_laboral,
            situacion_laboral: aspirante.situacion_laboral,
            centro_trabajo: aspirante.centro_trabajo,
            organismo_trabajo: aspirante.organismo_trabajo,
            cargo_trabajo: aspirante.cargo_trabajo,
            categoria_trabajo: aspirante.categoria_trabajo,
            direccion_trabajo: aspirante.direccion_trabajo,
            telefono_trabajo: aspirante.telefono_trabajo,
            otros_oficios: aspirante.otros_oficios,
            estado: aspirante.estado,
            causa_eliminacion: aspirante.causa_eliminacion,
<<<<<<< HEAD
=======
<<<<<<< HEAD
>>>>>>> fe90531b6430192b00235399c82f7b0d6368aebf
            causa_no_apto: aspirante.causa_no_apto,
            preseleccion: aspirante.preseleccion,
            fecha_inicio_proceso_investigativo: aspirante.fecha_inicio_proceso_investigativo,
            fecha_fin_proceso_investigativo: aspirante.fecha_fin_proceso_investigativo,
            resultado_proceso_investigativo: aspirante.resultado_proceso_investigativo,
            curriculum_vitae: aspirante.curriculum_vitae,
            fecha_curriculum_vitae: aspirante.fecha_curriculum_vitae,
            autobiografia: aspirante.autobiografia,
            fecha_autobiografia: aspirante.fecha_autobiografia,
            titulo: aspirante.titulo,
            fecha_titulo: aspirante.fecha_titulo,
            chequeo_medico: aspirante.chequeo_medico,
            fecha_chequeo_medico: aspirante.fecha_chequeo_medico,
            avales_cdr: aspirante.avales_cdr,
            fecha_avales_cdr: aspirante.fecha_avales_cdr,
            avales_centro_trabajo: aspirante.avales_centro_trabajo,
            fecha_avales_centro_trabajo: aspirante.fecha_avales_centro_trabajo,
            fotos: aspirante.fotos,
            fecha_fotos: aspirante.fecha_fotos,
            anexo1: aspirante.anexo1,
            fecha_anexo1: aspirante.fecha_anexo1,
            antecedentes: aspirante.antecedentes,
            fecha_antecedentes: aspirante.fecha_antecedentes,
            evaluacion_psicologica: aspirante.evaluacion_psicologica,
            comite_admision: aspirante.comite_admision,
<<<<<<< HEAD
=======
            mixta: aspirante.mixta,
            cargo_mixta: aspirante.cargo_mixta,
            fecha_mixta: aspirante.fecha_mixta,
            causa_devolucion: aspirante.causa_devolucion,
            fecha_devolucion: aspirante.fecha_devolucion
=======
            causa_no_apto: aspirante.causa_no_apto
>>>>>>> 9dc826940ce7a980bb0b81e2b9385866da328c84
>>>>>>> fe90531b6430192b00235399c82f7b0d6368aebf
          };
        });
      }))
      .subscribe((aspirantes) => {
        this.aspirantes = aspirantes;
        this.aspirantesUpdated.next([...this.aspirantes]);
      });
  }

  getAspirantesUpdateListener() {
    return this.aspirantesUpdated.asObservable();
  }

  addAspirante(
    nombre: string,
    apellidos: string,
    alias: string,
    ci: string,
    edad: number,
    sexo: string,
    provincia: string,
    municipio: string,
    direccion: string,
    correo: string,
    telefono: string,
    raza: string,
    estatura: number,
    peso: number,
    estado_civil: string,
    hijos: string,
    licencia: boolean,
    categoria_licencia: string,
    militancia: string,
    nivel_escolaridad: string,
    titulo_graduado: string,
    experiencia_laboral: number,
    otros_estudios: string,
    trayectoria_laboral: string,
    situacion_laboral: string,
    centro_trabajo: string,
    organismo_trabajo: string,
    cargo_trabajo: string,
    categoria_trabajo: string,
    direccion_trabajo: string,
    telefono_trabajo: string,
    otros_oficios: string,
    estado: string,
    causa_eliminacion: string,
<<<<<<< HEAD
=======
<<<<<<< HEAD
>>>>>>> fe90531b6430192b00235399c82f7b0d6368aebf
    causa_no_apto: string,
    preseleccion: string,
    fecha_inicio_proceso_investigativo: string,
    fecha_fin_proceso_investigativo: string,
    resultado_proceso_investigativo: string,
    curriculum_vitae: boolean,
    fecha_curriculum_vitae: string,
    autobiografia: boolean,
    fecha_autobiografia: string,
    titulo: boolean,
    fecha_titulo: string,
    chequeo_medico: boolean,
    fecha_chequeo_medico: string,
    avales_cdr: boolean,
    fecha_avales_cdr: string,
    avales_centro_trabajo: boolean,
    fecha_avales_centro_trabajo: string,
    fotos: boolean,
    fecha_fotos: string,
    anexo1: boolean,
    fecha_anexo1: string,
    antecedentes: boolean,
    fecha_antecedentes: string,
    evaluacion_psicologica: string,
<<<<<<< HEAD
    comite_admision: string
=======
    comite_admision: string,
    mixta: string,
    cargo_mixta: string,
    fecha_mixta: string,
    causa_devolucion: string,
    fecha_devolucion: string,
=======
    causa_no_apto: string
>>>>>>> 9dc826940ce7a980bb0b81e2b9385866da328c84
>>>>>>> fe90531b6430192b00235399c82f7b0d6368aebf
  ) {
    const aspirante: Aspirante = {
      id: "",
      nombre: nombre,
      apellidos: apellidos,
      alias: alias,
      ci: ci,
      edad: edad,
      sexo: sexo,
      provincia: provincia,
      municipio: municipio,
      direccion: direccion,
      correo: correo,
      telefono: telefono,
      raza: raza,
      estatura: estatura,
      peso: peso,
      estado_civil: estado_civil,
      hijos: hijos,
      licencia: licencia,
      categoria_licencia: categoria_licencia,
      militancia: militancia,
      nivel_escolaridad: nivel_escolaridad,
      titulo_graduado: titulo_graduado,
      experiencia_laboral: experiencia_laboral,
      otros_estudios: otros_estudios,
      trayectoria_laboral: trayectoria_laboral,
      situacion_laboral: situacion_laboral,
      centro_trabajo: centro_trabajo,
      organismo_trabajo: organismo_trabajo,
      cargo_trabajo: cargo_trabajo,
      categoria_trabajo: categoria_trabajo,
      direccion_trabajo: direccion_trabajo,
      telefono_trabajo: telefono_trabajo,
      otros_oficios: otros_oficios,
      estado: estado,
      causa_eliminacion: causa_eliminacion,
<<<<<<< HEAD
=======
<<<<<<< HEAD
>>>>>>> fe90531b6430192b00235399c82f7b0d6368aebf
      causa_no_apto: causa_no_apto,
      preseleccion: preseleccion,
      fecha_inicio_proceso_investigativo: fecha_inicio_proceso_investigativo,
      fecha_fin_proceso_investigativo: fecha_fin_proceso_investigativo,
      resultado_proceso_investigativo: resultado_proceso_investigativo,
      curriculum_vitae: curriculum_vitae,
      fecha_curriculum_vitae: fecha_curriculum_vitae,
      autobiografia: autobiografia,
      fecha_autobiografia: fecha_autobiografia,
      titulo: titulo,
      fecha_titulo: fecha_titulo,
      chequeo_medico: chequeo_medico,
      fecha_chequeo_medico: fecha_chequeo_medico,
      avales_cdr: avales_cdr,
      fecha_avales_cdr: fecha_avales_cdr,
      avales_centro_trabajo: avales_centro_trabajo,
      fecha_avales_centro_trabajo: fecha_avales_centro_trabajo,
      fotos: fotos,
      fecha_fotos: fecha_fotos,
      anexo1: anexo1,
      fecha_anexo1: fecha_anexo1,
      antecedentes: antecedentes,
      fecha_antecedentes: fecha_antecedentes,
      evaluacion_psicologica: evaluacion_psicologica,
<<<<<<< HEAD
      comite_admision: comite_admision
=======
      comite_admision: comite_admision,
      mixta: mixta,
      cargo_mixta: cargo_mixta,
      fecha_mixta: fecha_mixta,
      causa_devolucion: causa_devolucion,
      fecha_devolucion: fecha_devolucion,
=======
      causa_no_apto: causa_no_apto
>>>>>>> 9dc826940ce7a980bb0b81e2b9385866da328c84
>>>>>>> fe90531b6430192b00235399c82f7b0d6368aebf
    }
    this.http.post<{ message: string }>(this.servidor + '/aspirantes', aspirante)
      .subscribe((responseData) => {
        console.log(responseData.message);
        this.aspirantes.push(aspirante);
        this.aspirantesUpdated.next([...this.aspirantes]);
      });
  }
}
