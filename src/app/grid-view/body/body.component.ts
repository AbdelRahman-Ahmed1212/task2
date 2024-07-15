import { Component, Input, Output,EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormsModule} from '@angular/forms'
import { CLOSING } from '../../../../node_modules/@types/ws';
@Component({
  selector: 'app-body',
  standalone: true,
  imports: [CommonModule,FormsModule],
  templateUrl: './body.component.html',
  styleUrl: './body.component.css'
})
export class BodyComponent {
      @Input() data:any
      @Input() PageNumber:number = 1;
      @Output() DeleteAction = new EventEmitter<number>()
      @Output() EditAction = new EventEmitter<number>()

    // this function is to used to return 0 to prevent returnZeroToPreventSort from sorting our array objects
      returnZeroToPreventSort(){
        return 0;
      }
      delete(n:number){
        if(confirm("do you really want to delete this!")){
          this.DeleteAction.emit(n)
        }
      }
      edit(n:number){
        console.log(this.data)
        this.EditAction.emit(n)
      }
      ToggleCheckBox(id:number){
       const  selectedElement =  this.data.find((a:any)=>a.id == id)
       selectedElement.selected = !selectedElement.selected
      }
}
