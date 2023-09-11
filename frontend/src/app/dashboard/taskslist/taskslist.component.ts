import { Component, OnInit } from '@angular/core';
import { ApiServiceService } from 'src/app/services/api-service.service';
import { MatDialogConfig,MatDialog } from '@angular/material/dialog';
import { DeleteModelComponent } from 'src/app/Model/delete-model/delete-model.component';
import { EditTaskModelComponent } from 'src/app/Model/edit-task-model/edit-task-model.component';
@Component({
  selector: 'app-task-list',
  templateUrl: './taskslist.component.html',
  styleUrls: ['./taskslist.component.css']
})
export class TaskslistComponent implements OnInit {
  tasks: any[] = [];

  constructor(private api :ApiServiceService
    ,private dialog:MatDialog
    ) {
  }

  ngOnInit() {
    this.getTasks()
    console.log(this.tasks);


  }

  getTasks(){
    this.api.tasksubject.subscribe((updatedtasks) =>{
      this.tasks = updatedtasks
      console.log(this.tasks);

    })
  }

  editTask(task: any) {
    const config = new MatDialogConfig()
    config.width = '400px';
    config.data = task

    const dialogref1 = this.dialog.open(EditTaskModelComponent,config)

  }

  deleteTask(task: any) {

    const conifg = new MatDialogConfig()
    conifg.width = "300px";
    // conifg.position = {
    //   top: '50%',
    //   left: '50%',
    // };
    const dialogref = this.dialog.open(DeleteModelComponent,conifg);

    dialogref.afterClosed().subscribe(result => {
      if(result){
        this.api.delete(task).subscribe({
          next:res=> {
            if(res.success){
              this.api.getTasks()
            }else{
              console.log(res);
            }
          },error:err => {
            console.log(err);

          }
        })
      }
    })
  }
}
