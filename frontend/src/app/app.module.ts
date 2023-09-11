import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule}  from '@angular/forms'
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DashboardComponent } from './dashboard/dashboard.component';
import { TaskslistComponent } from './dashboard/taskslist/taskslist.component';
import { AddTaskComponent } from './dashboard/add-task/add-task.component';
import { SignupComponent } from './auth/signup/signup.component';
import { LoginComponent } from './auth/login/login.component';
import {  HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http'
import { AuthInterceptor } from './services/auth.interceptor';
import { DeleteModelComponent } from './Model/delete-model/delete-model.component';
import { MAT_DIALOG_DEFAULT_OPTIONS, MatDialogModule } from '@angular/material/dialog'
import { MatButtonModule } from '@angular/material/button';
import { EditTaskModelComponent } from './Model/edit-task-model/edit-task-model.component'
import { MatFormFieldModule} from '@angular/material/form-field'
import { FormsModule } from '@angular/forms';
import { MatInputModule} from '@angular/material/input'
@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    TaskslistComponent,
    AddTaskComponent,
    SignupComponent,
    LoginComponent,
    DeleteModelComponent,
    EditTaskModelComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    HttpClientModule,
    MatDialogModule,
    MatButtonModule,
    MatFormFieldModule,
    FormsModule,
    MatInputModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true,
    },
    {provide: MAT_DIALOG_DEFAULT_OPTIONS, useValue: {hasBackdrop: false}}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
