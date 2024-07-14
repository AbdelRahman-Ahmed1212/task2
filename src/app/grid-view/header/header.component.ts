import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
    @Input() data:Array<{}> = [];
    // suppose always the user passes array of object 
    // the objects should have same number of properties with the same name
    // we will take the first elemet and extract the headers of it
    @Input() headers:string[]= []
    

}
