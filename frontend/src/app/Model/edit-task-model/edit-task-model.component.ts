import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ApiServiceService } from 'src/app/services/api-service.service';

@Component({
  selector: 'app-edit-task-model',
  templateUrl: './edit-task-model.component.html',
  styleUrls: ['./edit-task-model.component.css']
})
export class EditTaskModelComponent {
  edittaskmodel!:FormGroup
  task: any = {};

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private dialogRef: MatDialogRef<EditTaskModelComponent>,
    private formBuilder: FormBuilder,
    private api:ApiServiceService
  ) {
    this.edittaskmodel = this.formBuilder.group({
      title:[data.title,[Validators.required]],
      description:[data.description || '']
    })

  }

  ngOnInit(){
  }

  onSubmit(): void {
    this.data.title = this.edittaskmodel.value.title;
    this.data.description = this.edittaskmodel.value.description;
    this.api.edittask(this.data).subscribe({
      next:res => {
        if(res && res.success){
          this.api.getTasks()
          this.dialogRef.close();
        }
      }
    })
  }

  onCancelClick(): void {
    this.dialogRef.close();
  }

}
