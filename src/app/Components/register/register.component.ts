import { Location } from '@angular/common';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/Models/Prisoner';
import { ApiService } from 'src/app/Services/api.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {
  constructor(private location : Location , private api : ApiService){}
  ResiterUser: User = {} as User
  

  register(){
    const phoneRegex = new RegExp('^01[0-2][0-9]{8}$')
    const EmailRegex = new RegExp('^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$')
    const PasswordRegex = new RegExp('^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[^a-zA-Z0-9]).{8,}$')

    if (this.ResiterUser.code != null && this.ResiterUser.userName != null && this.ResiterUser.password != null && this.ResiterUser.phoneNumber != null && this.ResiterUser.email != null && this.ResiterUser.code != undefined && this.ResiterUser.userName != undefined && this.ResiterUser.password != undefined && this.ResiterUser.phoneNumber != undefined && this.ResiterUser.email != undefined) {
   
      if(phoneRegex.test(this.ResiterUser.phoneNumber) &&  EmailRegex.test(this.ResiterUser.email) && PasswordRegex.test(this.ResiterUser.password)){        
        this.api.RegisterUser(this.ResiterUser).subscribe({
          next: (res:any) => {
            Swal.fire({
              icon: 'success',
              text: 'تم إنشاء المستخدم بنجاح',
            })
            this.location.back()
          },
          error: (err) => {
            Swal.fire({
              icon: 'error',
              text: err.error,
            })          }
        })
      }
   
    }
    else{

    }
  }

}
