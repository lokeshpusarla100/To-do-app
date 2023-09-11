import { Component } from '@angular/core';
import { MAT_DIALOG_DATA,MatDialogRef } from '@angular/material/dialog'
@Component({
  selector: 'app-delete-model',
  templateUrl: './delete-model.component.html',
  styleUrls: ['./delete-model.component.css']
})
export class DeleteModelComponent {

  constructor(
    private dialogref:MatDialogRef<DeleteModelComponent>,
  ){}

  ngOnInit(){}

  cancel(){
    this.dialogref.close(false)
  }

  delete(){
    this.dialogref.close(true)
  }

}
