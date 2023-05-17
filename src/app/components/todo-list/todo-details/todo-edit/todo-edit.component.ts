import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { Subscription } from 'rxjs';
import { TodoService } from 'src/app/services/todo.service';

@Component({
  selector: 'app-todo-edit',
  templateUrl: './todo-edit.component.html',
  styleUrls: ['./todo-edit.component.css']
})
export class TodoEditComponent implements OnInit,OnDestroy{
  id:number;
  editMode = false;
  subscription : Subscription;
  itemForm: FormGroup;
  constructor(private todoService: TodoService,private route:ActivatedRoute,private router:Router){}

  ngOnInit(): void {
    this.subscription = this.route.params.subscribe(params => {
      this.id = params['id'];
      this.editMode = params['id'] != null;
      this.initForm();
      console.log(this.id);
      console.log(this.editMode);
    })
  }

  onSubmit() {
    if (this.editMode) {
      this.todoService.updateItem(this.id, this.itemForm.value);
    }
    this.onCancel();
  }

  onCancel(){
    this.router.navigate(['/details',this.id])
  }

  private initForm(){
    let itemTitle = '';
    let itemNote = '';
    let modifiedDate = new Date();

    if(this.editMode){
      const item = this.todoService.detailItem(this.id);
      itemTitle = item.title;
      itemNote = item.note;
      // console.log(item);
    }
    this.itemForm = new FormGroup({
      'title': new FormControl(itemTitle,Validators.required),
      'date': new FormControl(modifiedDate),
      'note': new FormControl(itemNote,Validators.required),
      'isCompleted': new FormControl(false),
    }) 
  }

  ngOnDestroy(): void {
      this.subscription.unsubscribe();
  }
}
