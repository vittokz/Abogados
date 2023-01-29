export interface IProceso {
  id?: number;
  identidadCliente?: string;
  identidadAbogado?: string;
  idContrato?: string;
  numProceso?: string;
  demandado?: string;
  departamento?: string;
  municipio?: string;
  juzgado?: string;
  tipoProceso?: string;
  fechaRegistro?: Date;
  usuarioRegistro?: string;
}
