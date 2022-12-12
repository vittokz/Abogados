import { Injectable } from '@angular/core';
import Swal from 'sweetalert2'
import { TYPERESPUESTAS } from '../../shared/model/respuestasServicios';

@Injectable({
  providedIn: 'root'
})
export class AlertService {

  constructor() { }

  toast(typeIcon = TYPERESPUESTAS.SUCCESS, timerProgressBar: boolean = false) {
    Swal.fire({
      toast: true,
      position: 'center',
      showConfirmButton: false,
      icon: typeIcon,
      timerProgressBar,
      timer: 4000,
      title: 'Se registro correctamente'
    })
  }
}
