import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApiServiceService } from 'src/app/services/api-service.service';

@Component({
  selector: 'app-add-task',
  templateUrl: './add-task.component.html',
  styleUrls: ['./add-task.component.css']
})
export class AddTaskComponent implements OnInit {
  addTaskForm!: FormGroup;

  constructor(private formBuilder: FormBuilder,
              private api:ApiServiceService
    ) { }

  ngOnInit(): void {
    this.addTaskForm = this.formBuilder.group({
      title: ['', Validators.required],
      description: [''],
    });
  }

  onSubmit() {
    if (this.addTaskForm.valid) {
      console.log(this.addTaskForm.value);

      this.api.savetask(this.addTaskForm.value).subscribe({
        next :res => {
          if(res && res.success){
            this.api.getTasks();
          }else{
            console.log(res);

          }
        },error:err => {
          console.log(err);

        }
      })
    }
    this.addTaskForm.reset();
  }

  cancel(){
    this.addTaskForm.reset()
  }
}
