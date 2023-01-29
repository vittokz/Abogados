export interface IContrato{
    id?: number;
    identidadCliente?: string;
    identidadAbogado?: string;
    nombreContrato?:string;
    nombreArchivo?: string;
    fechaRegistro?: string;
    usuarioRegistro?: string;
}

export interface IContratoCompleto{
    id?: number;
    identidadCliente?: string;
    identidadAbogado?: string;
    nombreContrato?:string;
    nombreArchivo?: string;
    fechaRegistro?: string;
    nombre?: string;
    apellido?: string;
    ciudad?: string;
    departamento?: string;
    direccion?: string;
    email?: string;
    especialidad?: string;
    estado?: string;
    fechaNacimiento?: string;
    identidad?: string;
    movil?: string;
    nombreEmpresa?: string;
    telefono?: string;
    tipoDoc?: string;
    tipoPersona?: string;
    usuarioActiva?: string;
    usuarioRegistro?: string;
}

