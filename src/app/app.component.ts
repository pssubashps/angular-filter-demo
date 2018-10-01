import { Component, OnInit } from '@angular/core';
import { ApiService } from './api.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'userfilter';
  users:any;
  depts = [
    {name: 'all' ,isSelected:false},
    {name: 'product' ,isSelected:true},
    {name: 'Dept' ,isSelected:false}
  ];
  constructor(private api: ApiService){}
  ngOnInit(){
    this.getUsers();
  }
  filter (event,index) {
    console.log(event.target.value);
    console.log(event.target.checked);
    const selectedValue = event.target.value;
    if(selectedValue === 'all' ) {
      for (var i = 0; i < this.depts.length; i++) {
        this.depts[i].isSelected = event.target.checked;
      }
    }else{
      this.depts[0].isSelected = false;
      this.depts[index].isSelected = event.target.checked;
    }
    console.log(this.depts);
  }
  private getUsers() {
    this.api.getUsrsList().subscribe(
      (res) => {
        this.users = res['data'].users;
      }
    )
  }
}
