import { Component, Input, Output,EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormsModule} from '@angular/forms'
import { Options } from '../../../interfaces/Options';
@Component({
  selector: 'app-body',
  standalone: true,
  imports: [CommonModule,FormsModule],
  templateUrl: './body.component.html',
  styleUrl: './body.component.css'
})
export class BodyComponent {
      @Input() data:any
      @Input() options!:Options
      @Input() PageNumber:number = 1;
      @Output() ActionEmitter = new EventEmitter<{Action:string,Id:number}>()
      @Output() SelectionIdenticatior = new EventEmitter<boolean>()
       

    // this function is to used to return 0 to prevent returnZeroToPreventSort from sorting our array objects
      returnZeroToPreventSort(){
        return 0;
      }
      commitAction(ActionName:string,dataId:number){
        if(confirm("do you really want to delete this!")){
            this.ActionEmitter.emit({Action:ActionName,Id:dataId})
        }
      }
     
      ToggleCheckBox(id:number){
       const  selectedElement =  this.data.find((a:any)=>a.id == id)
       selectedElement.selected = !selectedElement.selected
       if(selectedElement.selected){
         this.SelectionIdenticatior.emit(false)
       }else{
        this.SelectionIdenticatior.emit(true)

       }

      }
      
}
