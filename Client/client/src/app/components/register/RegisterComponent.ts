import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { FormGroup, FormBuilder } from '@angular/forms';
import { User } from 'src/app/models/user';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  formRegister: FormGroup = new FormGroup({});
  user!: User;

  constructor(private userService: UserService,
    private formBuilder: FormBuilder, private router: Router) { }

  ngOnInit(): void {
    this.formRegister = this.formBuilder.group({
      userName: [''],
      password: ['']
    })
  }


  register() {
    this.userService.register(this.formRegister.value).subscribe(() => {
      this.formRegister.reset();
      this.router.navigate(['login']);
    })
  }
}
