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
  tableFilter = [];
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
      // check all
      const trueArray = this.depts.filter( (ele) => {
        return ele.name != 'all' && ele.isSelected === true;
      });
      if(trueArray.length === (this.depts.length - 1)) {
        this.depts[0].isSelected = true;
      }
    }
    this.getUsers();
   // console.log(this.depts);
  }
  private getUsers() {
    //skip the 0 element, because it is all,
    this.tableFilter = [];
    for (var i =1; i < this.depts.length; i++) {
      if(this.depts[i].isSelected) {
        this.tableFilter.push({
          department : this.depts[i].name
        });
      }
    }
   // console.log( this.tableFilter);
    this.api.getUsrsList(this.tableFilter).subscribe(
      (res) => {
        this.users = res['data'].users;
      }
    )
  }
}
