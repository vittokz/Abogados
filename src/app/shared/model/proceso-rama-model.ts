export interface ProcesoRama {
  tipoConsulta: string;
  procesos:     Proceso[];
  parametros:   Parametros;
  paginacion:   Paginacion;
}
export interface Proceso {
  idProceso:            number;
  idConexion:           number;
  llaveProceso:         string;
  fechaProceso:         Date;
  fechaUltimaActuacion: Date;
  despacho:             string;
  departamento:         string;
  sujetosProcesales:    string;
  esPrivado:            boolean;
  cantFilas:            number;
}

export interface Paginacion {
  cantidadRegistros: number;
  registrosPagina:   number;
  cantidadPaginas:   number;
  pagina:            number;
  paginas:           null;
}

export interface Parametros {
  numero:               string;
  nombre:               null;
  tipoPersona:          null;
  idSujeto:             null;
  ponente:              null;
  claseProceso:         null;
  codificacionDespacho: null;
  soloActivos:          boolean;
}

//detalle proceso
export interface IDetalleProceso {
  idRegProceso:        number;
  llaveProceso:        string;
  idConexion:          number;
  esPrivado:           boolean;
  fechaProceso:        Date;
  despacho:            string;
  ponente:             string;
  tipoProceso:         string;
  claseProceso:        string;
  subclaseProceso:     string;
  recurso:             string;
  ubicacion:           string;
  contenidoRadicacion: string;
  fechaConsulta:       Date;
  ultimaActualizacion: Date;
}

