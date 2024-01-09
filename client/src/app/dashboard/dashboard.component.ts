import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder  } from '@angular/forms';
import { TaskData } from './task.model';
import { ApiService } from '../api.service/api.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit 
{
  formValue!:FormGroup
  TaskModelObj : TaskData = new TaskData;
  allTaskData: any;
  showAdd!:boolean;
  showBtn!:boolean;

  constructor(private formbuilder: FormBuilder, private api:ApiService) { }

  ngOnInit(): void {
    this.formValue = this.formbuilder.group({
      task: ['']
    })
    this.getAllData();
  }

  clickAddTask()
  {
    this.formValue.reset();
    this.showAdd = true;
    this.showBtn = false;
  }
 
  addTask()
  {
    this.TaskModelObj.task = this.formValue.value.task;
    
    this.api.postTask(this.TaskModelObj).subscribe(res => {
      console.log(res);
      alert("Task Added Successfully");
      this.formValue.reset();

      let ref= document.getElementById('close');
      ref?.click();

      this.getAllData();

    }, err=>{
      console.log(err);
      alert("Task Added Failed!");
    })
  }

  getAllData()
  {
    this.api.getTask().subscribe(res => {
      this.allTaskData= res;
    }, err=>{
      console.log(err);
    })
  }

//....

  deleteTask(_id: any) {
    console.log("Deleting task with ID:", _id);
    if (!_id) {
      console.error("Invalid data object or missing _id property");
      return;
    }
  
    this.api.deleteTask(_id).subscribe(
      (res: any) => {
        console.log(res);
        if (res.success) {
          alert("Task Deleted Successfully");
          this.getAllData();
        } else {
          alert("Error deleting task: " + res.message);
        }
      },
      (err: any) => {
        console.error(err);
        alert("Error deleting task");
      }
    );
  }
    
// ...

onEditTask(data: any) {
  this.showAdd = false;
  this.showBtn = true;
  this.TaskModelObj.id = data._id; 
  this.formValue.controls['task'].setValue(data.task);
}

updateTask() {
  this.TaskModelObj.task = this.formValue.value.task;
  
  this.api.updateTask(this.TaskModelObj.id, this.TaskModelObj).subscribe((res: any) => {
    alert("Task Updated Successfully");
    this.formValue.reset();

    let ref = document.getElementById('close');
    ref?.click();

    this.getAllData();
  }, (err: any) => {
    console.error(err);
    alert("Error updating task");
  });
}}
