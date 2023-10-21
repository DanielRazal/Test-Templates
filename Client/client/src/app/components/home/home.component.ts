import { Component, Input, OnInit } from '@angular/core';
import { List } from 'src/app/models/list';
import { ListService } from 'src/app/services/list.service';
import { SwalService } from 'src/app/services/swal.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  lists: Array<List> = [];
  displayedColumns: string[] = ['id', 'name', 'userId', 'userName', 'delete', 'edit'];

  word: string = "sfdfdsdfsdfs  , fdsffdf";

  constructor(private listService: ListService,
    private swalService: SwalService) { }

  ngOnInit(): void {
    this.getLists();
  }

  getLists() {
    this.listService.getLists().subscribe((lists) => {
      this.lists = lists;
    })
  }

  deleteList(id: string) {
    this.listService.deleteList(id).subscribe((msg) => {
      alert(JSON.stringify(msg))
      this.getLists();
    })
  }

  editList(id: string, list: List) {
    this.swalService.inputList("Edit List").then((res) => {
      const listName = res.value
      const updatedList = {
        id: list.id,
        name: listName,
        user: list.user
      }
      this.listService.editList(updatedList, id).subscribe(() => {
        this.getLists();
      })
    })
  }
}
