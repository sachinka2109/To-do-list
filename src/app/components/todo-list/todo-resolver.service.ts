import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from "@angular/router";
import { Item } from "src/app/item.model";
import { DataStorageService } from '../../services/data-storage.service';
import { TodoService } from '../../services/todo.service';


@Injectable({providedIn:'root'})
export class ToDoResolverService implements Resolve<Item[]> {
    constructor(private  dataStorageService:DataStorageService,private toDoService:TodoService){}
    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        const items = this.toDoService.getItem();
        if(items.length === 0) {
            return this.dataStorageService.fetchTask();
        } else {
            return items;
        }
    }
}