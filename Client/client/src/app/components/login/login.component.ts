import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { User, UserLogin } from 'src/app/models/user';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  formLogin: FormGroup = new FormGroup({});
  constructor(private userService: UserService, private formBuilder: FormBuilder
    , private router: Router) { }

  ngOnInit(): void {
    this.formLogin = this.formBuilder.group({
      userName: [''],
      password: ['']
    })
  }

  login() {
    this.userService.login(this.formLogin.value).subscribe((login: UserLogin) => {
      this.formLogin.reset();
      localStorage.setItem("user", JSON.stringify(login.user))
      localStorage.setItem("token", JSON.stringify(login.token))
      this.router.navigate(['home'])
    })
  }
}
