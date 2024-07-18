import { Component, Input, Output,EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormsModule} from '@angular/forms'
import { Options } from '../../../interfaces/Options';
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
      @Input() options!:Options
      @Input() PageNumber:number = 1;
      @Output() ActionEmitter = new EventEmitter<any>()
      @Output() SelectionCounterEvent = new EventEmitter<string>()

    // this function is to used to return 0 to prevent returnZeroToPreventSort from sorting our array objects
      returnZeroToPreventSort(){
        return 0;
      }
      commitAction(ActionName:string,dataId:number){
        const ObjectToCommitActionOn = this.data.find((a:any)=>a.id == dataId)
        if(confirm("do you really want to commit this!")){
            this.ActionEmitter.emit({Action:ActionName,obj:{
                ...ObjectToCommitActionOn
            }})
        }
      }
     
      ToggleCheckBox(id:number){
       const  selectedElement =  this.data.find((a:any)=>a.id == id)
       selectedElement.selected = !selectedElement.selected
       if(selectedElement.selected){
          this.SelectionCounterEvent.emit('checked')

      }else{
        this.SelectionCounterEvent.emit('unchecked')


       }
       console.log('checkbox toggled')
       

      }
      
}
