import { Injectable } from '@angular/core';
import Swal from 'sweetalert2';
@Injectable({
  providedIn: 'root'
})
export class SwalService {

  constructor() { }

  inputList(title: string) {
    return Swal.fire({
      title: title,
      input: 'text',
      showCancelButton: true,
      confirmButtonText: 'Submit',
      cancelButtonText: 'Cancel',
    });
  }

}
