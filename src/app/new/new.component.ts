import { DataSource } from '@angular/cdk/collections';
import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { BehaviorSubject, Observable } from 'rxjs';
import { AddUserComponent } from '../add-user/add-user.component';



@Component({
  selector: 'app-new',
  templateUrl: './new.component.html',
  styleUrls: ['./new.component.scss']
})

export class NewComponent implements OnInit {

  // displayedColumns: string[] = ['name', 'phoneNumber', 'email', 'address', 'lat', 'long', 'action'];
  // @Input() set dataSource(val: any) {
  //   console.log(val)
  // }
  // @Input() dataSource:PeriodicElement[]= [];
  // _dataSource: PeriodicElement[] = [];
  // showFormDiv: boolean = false;
  // hideFormDiv: boolean = true;
  // test: string = "prove something";

  // formGroup: FormGroup;
  // titleAlert: string = 'This field is required';

  constructor(public dialog: MatDialog) { }
  @Input() arrayDatas: any = [];
  ngOnInit(): void {
  }

  onEdit(data: any, id) {
    console.log(data)

    const dialogRef = this.dialog.open(AddUserComponent, {
      height: '475px',
      width: '1200px',
      data: data
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result.id == '') {
        if (this.arrayDatas.length > 0)
          result.id = this.arrayDatas[this.arrayDatas.length - 1].id + 1
        else
          result.id = 1
        this.arrayDatas.push(result);
      } else {
        let index = this.arrayDatas.findIndex(ele => ele.id == result.id);
        this.arrayDatas[index] = result
      }
      this.arrayDatas = [...this.arrayDatas];
    })

  }
  onDelete(index) {
    this.arrayDatas.splice(index, 1)
  }



}

