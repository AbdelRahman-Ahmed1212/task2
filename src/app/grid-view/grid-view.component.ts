import { Component, Input, OnInit } from '@angular/core';
import { HeaderComponent } from './header/header.component';
import { BodyComponent } from './body/body.component';
import { Options } from '../../interfaces/Options';


@Component({
  selector: 'app-grid-view',
  standalone: true,
  imports: [HeaderComponent,BodyComponent],
  templateUrl: './grid-view.component.html',
  styleUrl: './grid-view.component.css'
})
export class GridViewComponent {
  @Input() options:Options|any;
  sort(i:number){
      this.options.data.sort(
          (d1:any , d2:any)=>d2.age - d1.age
      )
      console.log('hello from the sorting machine')
      console.log(this.options.data)
  }
 

}
