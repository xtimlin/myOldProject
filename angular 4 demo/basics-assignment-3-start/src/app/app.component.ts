import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  display = true;
  clickArr = [];
  toggle(){
    this.display=!this.display;
    // this.clickArr.push(this.clickArr.length + 1);
    this.clickArr.push(new Date());
  };
  
}
