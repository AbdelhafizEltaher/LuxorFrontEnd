import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { LoginData } from 'src/app/Models/Prisoner';
import { ApiService } from 'src/app/Services/api.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  loginData: LoginData = {} as LoginData
  constructor(private router: Router, private api: ApiService) {
    if(localStorage.getItem('token')){
      this.router.navigate(['/main/view'])          
    }
   }
  login() {

    if (!(this.loginData.code == null || this.loginData.userName == null || this.loginData.password == null || this.loginData.code == undefined || this.loginData.userName == undefined || this.loginData.password == undefined || this.loginData.password.length < 6 || this.loginData.userName.length == 0)) {
      this.api.LoginUser(this.loginData).subscribe({
        next: (res:any) => {
          localStorage.setItem('email',res.email)
          localStorage.setItem('role',res.role)
          localStorage.setItem('username',res.username)
          localStorage.setItem('token',res.token)
          this.router.navigate(['/main/view'])          
        },
        error: (err) => {          
          Swal.fire({
            icon: 'error',
            text: err.error,
          })
        }
      })
    }
    else{

    }
  }
  
}
