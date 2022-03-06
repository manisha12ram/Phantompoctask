import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AddUserComponent } from './add-user/add-user.component';
// export interface PeriodicElement {
//   name: string;
//   phoneNumber: number;
//   email: string;
//   address: string
//   lat: number;
//   long: number;
// }

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent {
  title = 'sample';
  datas: any=[];
  tabledata: any;
  arrayData:any=[];
  // tableData: PeriodicElement[] = [];

  // subject = new BehaviorSubject(this.tableData);
  // _dataSource = new CaseListDatasource(this.subject.asObservable());
  // dataSource = new MatTableDataSource(this.tableData);
  constructor(public dialog: MatDialog) { }
  openDialog() {
    const dialogRef = this.dialog.open(AddUserComponent, {
      height: '475px',
      width: '1200px',
      data: {}
    });

    dialogRef.afterClosed().subscribe(result => {

      // this.tabledata = {
      //   name: result.firstName +' '+result.lastName,
      //   phoneNumber : result.phoneNumber,
      //   email : result.email,
      //   address : result.street +'-'+result.address.city.city_name+'-'+result.address.state.state_name+'-'
      //   +result.address.country.country_name,
      //   lat :0,
      //   long :0,
      //   country: result.address.country.country_name,
      //   state: result.address.state.state_name,
      //   city: result.address.city.city_name
      // }
      if (result.id == '') {
        if (this.arrayData.length > 0)
          result.id = this.arrayData[this.arrayData.length - 1].id + 1
        else
          result.id = 1
        this.arrayData.push(result);
      } else {
        let index = this.arrayData.findIndex(ele => ele.id == result.id);
        this.arrayData[index] = result
      }
      this.arrayData = [...this.arrayData];
      // this.arrayData.push(result)
      // this.subject.next(this.tableData);
      // this.dataSource._updateChangeSubscription();
    });
  }
}
