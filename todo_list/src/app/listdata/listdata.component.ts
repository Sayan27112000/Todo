import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import Swal from 'sweetalert2';
import { DataService } from '../shared/data.service';

@Component({
  selector: 'app-listdata',
  templateUrl: './listdata.component.html',
  styleUrls: ['./listdata.component.scss']
})
export class ListdataComponent implements OnInit {

  title = 'todo_list';

  userForm: FormGroup;
  listData: any;
  id: any;
  showAdd: boolean;
  showUpdate: boolean;
  editIndex: number = -1; //default mode means not in edit mode
  newTaskForm: any;
  editRowID: any;


  taskname: any;
  date: any;
  status: any;

  modalRef?: BsModalRef | null;
  modalRef2?: BsModalRef;




  constructor(private fb: FormBuilder, private modalService: BsModalService, private dataService : DataService) {

    this.showAdd = true;
    this.showUpdate = false;
    this.listData = [];

    this.userForm = this.fb.group({
      taskname: ['', Validators.required],
      date: ['', Validators.required],
      status: ['', Validators.required],

    })

    const infoArr = localStorage.getItem("infos") || '';
    this.listData = infoArr && JSON.parse(infoArr) || []
  }

  get f() { return this.userForm.controls; }

  public addItem(): void {
    console.log(this.userForm.value)
    console.log('return FB',this.dataService.addItem(this.userForm.value))
    //this.listData.push(this.userForm.value);
    // console.log('add', this.listData)
    //localStorage.setItem("infos", JSON.stringify(this.listData));
    this.dataService.addItem(this.userForm.value).then(() => {

      Swal.fire({
        icon: 'success',
        title: 'Successfull...',
      })
    },
    err => {
      Swal.fire('Error', 'Error occured', 'error');
    })

    this.reset();
    this.showAdd = true;
    this.showUpdate = false;
  }

  reset() {
    this.userForm.reset();
    this.editIndex = -1;
  }

  removeItem(element: any) {

    Swal.fire({
      title: 'Are you sure?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes!'
    }).then((result) => {
      if (result.isConfirmed) {
        // this.listData.forEach((value: any, index: any) => {
        //   if (value == element) {
        //   }
        //   this.listData.splice(index, 1);
        //   Swal.fire('DELETED', 'Deleted successfully', 'error')
        //   localStorage.clear();
        //   localStorage.setItem("infos", JSON.stringify(this.listData));
        // });
        this.dataService.deleteListData(element.id).then(() => {
          Swal.fire('DELETED', 'Deleted successfully', 'error');
          this.getListData();
        })
      }
    },
    err => {
      Swal.fire('Error', 'Error occured', 'error');
    })
  }


  ngOnInit(): void {
    this.getListData();
  }

  getListData(){
    this.dataService.getListData().subscribe(res => {
      this.listData = res.map((e: any) => {
        const data = e.payload.doc.data();
        data.id = e.payload.doc.id;
        return data;
      })
      console.log('listData', this.listData);


    }, err => {
      alert('Error while fetching student data');
    })
  }

  createNewTask() {
    localStorage.setItem("infos", JSON.stringify(this.listData));
    console.log(localStorage.getItem('info'));
  }

  onEdit(element: any, index: number, template: any) {
    console.log('elem', element)
    this.modalRef = this.modalService.show(template);
    this.editIndex = index;
    this.editRowID = element.id;
    this.dataService.getListDataByID(element.id).subscribe(res => {
      let obj: any = res?.payload?.data();
      this.taskname = obj.taskname;
      this.date = obj.date;
      this.status = obj.status;
    },
    err => {
      Swal.fire('Error', 'Error occured', 'error');
    });
  }

  updateItem() {

    if (this.editIndex >= 0) {
      this.listData[this.editIndex].taskname = this.taskname;
      this.listData[this.editIndex].date = this.date;
      this.listData[this.editIndex].status = this.status;
    }

    this.dataService.updateListDataByID(this.editRowID,{...this.listData[this.editIndex]}).then(() => {
      Swal.fire({
        icon: 'success',
        title: 'Updated Successfully',
      })
    },
    err => {
      Swal.fire('Error', 'Error occured', 'error');
    })
    this.modalRef?.hide();
    this.getListData();

  }

  closeModal() {
    this.modalRef?.hide();
  }
  
}


