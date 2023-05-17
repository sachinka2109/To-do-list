import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../auth/auth.service';
import { DataStorageService } from '../../services/data-storage.service';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit,OnDestroy{
  constructor(private route: ActivatedRoute, private router: Router,public authService:AuthService,private db:DataStorageService){}
  ngOnInit(): void {

  }

  Add(){
    this.router.navigate(['add'],{relativeTo: this.route});
  }

  onSaveTask(){
    this.db.savetask();
  }

  onFetchTask(){
    this.db.fetchTask().subscribe();
  }

  Logout(){
    this.authService.Logout()
    .subscribe(()=>{
      this.router.navigate(['login']);
    })
  }

  ngOnDestroy(): void {
      
  }
}
