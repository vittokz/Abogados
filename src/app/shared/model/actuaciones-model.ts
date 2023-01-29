export interface IActuaciones {
    actuaciones: IActuacion[];
    paginacion:  IPaginacion;
}

export interface IActuacion {
    idRegActuacion: number;
    llaveProceso:   string;
    consActuacion:  number;
    fechaActuacion: Date;
    actuacion:      string;
    anotacion:      string;
    fechaInicial:   Date | null;
    fechaFinal:     Date | null;
    fechaRegistro:  Date;
    codRegla:       string;
    conDocumentos:  boolean;
    cant:           number;
}

export interface IPaginacion {
    cantidadRegistros: number;
    registrosPagina:   number;
    cantidadPaginas:   number;
    pagina:            number;
    paginas:           null;
}
