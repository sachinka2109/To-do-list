import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TodoService } from '../../services/todo.service';
import { Item } from 'src/app/item.model';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.css']
})
export class TodoListComponent implements OnInit,OnDestroy{
  id:number;
  items:Item[] = [];
  subscription : Subscription;
  constructor(private route: ActivatedRoute, private router: Router ,private todoService:TodoService){}

  ngOnInit(): void {
    this.subscription = this.todoService.itemChanged.subscribe((items:Item[])=>{
      this.items = items;
    })
    this.items = this.todoService.getItem();
    console.log(this.items);
  }

  onAdd(){
    this.router.navigate(['add'],{relativeTo:this.route});
  }

  onDeleteItem(id:number) {
    if(confirm('Are You Sure you want to Delete This Item?')){
      this.todoService.deleteItem(id);
    }
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
