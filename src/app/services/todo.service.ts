import { Injectable, OnInit} from '@angular/core';
import { Item } from '../item.model';
import { Subject, Subscription } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class TodoService implements OnInit{
  itemChanged = new Subject<Item[]>();
  subscription: Subscription;
  private items:Item[] = [];
  constructor() { }

  ngOnInit(): void {

  }

  // All List Functions

  setItem(items:Item[]){
    this.items = items;
    this.itemChanged.next(this.items.slice())
    // console.log(this.items)
  }

  getItem(){
    return this.items.slice();
  }

  addItem(item:Item){
    this.items.push(item);
    this.itemChanged.next(this.items.slice())
  }

  detailItem(id:number){
    return this.items[id];
  }

  markCompleted(id:number){
    this.items[id].isCompleted = !this.items[id].isCompleted;
    if(this.items[id].isCompleted){
      this.items[id].date = new Date();
    }
    this.itemChanged.next(this.items.slice());
  }

  updateItem(id: number, newItem: Item) {
    this.items[id] = newItem;
    this.itemChanged.next(this.items.slice());
  }

  deleteItem(index:number){
    this.items.splice(index,1);
    this.itemChanged.next(this.items.slice());
  }

}
