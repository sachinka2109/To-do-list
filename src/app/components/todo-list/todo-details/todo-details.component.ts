import { Component, OnDestroy, OnInit } from '@angular/core';
import { TodoService } from '../../../services/todo.service';
import { ActivatedRoute,Router } from '@angular/router';
import { Item } from 'src/app/item.model';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-todo-details',
  templateUrl: './todo-details.component.html',
  styleUrls: ['./todo-details.component.css']
})
export class TodoDetailsComponent implements OnInit, OnDestroy {
  item:Item;
  id:number;
  subscription:Subscription;
  constructor(private todoService: TodoService,private route:ActivatedRoute,private router:Router) {
    
  }
  ngOnInit(): void {
    this.subscription = this.route.params.subscribe(params => {
      this.id = params['id'];
      this.item = this.todoService.detailItem(this.id);
      // console.log(this.id);
      // console.log(this.item);
    })
  }
  onMarkComplete() {
    this.todoService.markCompleted(this.id);
    this.router.navigate(['../']);
  }

  onDeleteItem(){
    if(confirm('Are You Sure you want to Delete This Item?')){
      this.todoService.deleteItem(this.id);
      this.router.navigate(['../']);
    }
  }

  ngOnDestroy(): void {
   this.subscription.unsubscribe();
  } 
}
