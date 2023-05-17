import { Injectable } from "@angular/core";
import { TodoService } from './todo.service';
import { HttpClient, HttpParams } from '@angular/common/http';
import { map,tap } from "rxjs";
import { Item } from "../item.model";
import { environment } from "src/environments/environment";

@Injectable({providedIn:'root'})
export class DataStorageService {
    name:string;
    constructor(private http:HttpClient,private todoService:TodoService){

    }

    savetask(){
        const items = this.todoService.getItem();
        this.http.put(environment.firebase.databaseURL + '/items.json',items)
        .subscribe(response =>{
            console.log(response)
        });
    }

    fetchTask(){
        return this.http.get<Item[]>(environment.firebase.databaseURL + '/items.json')
        .pipe(map(items => {
            return items.map(item => {
                return {...item}
            })
        }),tap(items =>{this.todoService.setItem(items)}))
    }
}