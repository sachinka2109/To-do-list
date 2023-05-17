import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { TodoService } from '../../../services/todo.service';


@Component({
  selector: 'app-todo-form',
  templateUrl: './todo-form.component.html',
  styleUrls: ['./todo-form.component.css']
})
export class TodoFormComponent implements OnInit {
  addItem:FormGroup;
  constructor(private route: ActivatedRoute, private router: Router,private todoService:TodoService){}
  
  ngOnInit(): void {
    this.addItem = new FormGroup({
      title: new FormControl('',[Validators.required]),
      note: new FormControl('',[Validators.required]),
      date: new FormControl(new Date()),
      isCompleted: new FormControl(false),
    })
  }

  Cancel(){
    this.router.navigate(['../'],{relativeTo:this.route});
  }

  onSubmit() {
    console.log(this.addItem);
    this.todoService.addItem(this.addItem.value);
  }
}

  
