import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/models/user';
import { ListService } from 'src/app/services/list.service';
import { SwalService } from 'src/app/services/swal.service';
import { v4 as uuidv4 } from 'uuid';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  user!: User;

  constructor(private router: Router, private listService: ListService,
    private swalService: SwalService) { }

  ngOnInit(): void {
    this.user = JSON.parse(localStorage.getItem("user")!);
  }

  logOut() {
    localStorage.clear();
    this.router.navigate(["/login"])
  }

  deleteLists() {
    this.listService.deleteLists().subscribe(() => {
      window.location.reload()
    })
  }

  addList() {
    this.swalService.inputList("Add List").then((res) => {
      const listName = res.value;
      if (listName) {
        const addList = {
          id: uuidv4(),
          name: listName,
          user: {
            id: this.user.id,
            userName: this.user.userName,
            password: this.user.password,
          }
        }
        this.listService.addList(addList).subscribe(() => {
          window.location.reload()
        })
      }
    })
  }


}
