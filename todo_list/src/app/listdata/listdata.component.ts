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


  taskname: any;
  date: any;
  status: any;

  modalRef?: BsModalRef | null;
  modalRef2?: BsModalRef;




  constructor(private fb: FormBuilder, private modalService: BsModalService, private data : DataService) {

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

    this.listData.push(this.userForm.value);
    console.log('add', this.listData)
    localStorage.setItem("infos", JSON.stringify(this.listData));

    Swal.fire({
      icon: 'success',
      title: 'Successfull...',
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
        this.listData.forEach((value: any, index: any) => {
          if (value == element) {
          }
          this.listData.splice(index, 1);
          Swal.fire('DELETED', 'Deleted successfully', 'error')
          localStorage.clear();
          localStorage.setItem("infos", JSON.stringify(this.listData));
        });
      }
    })
  }


  ngOnInit(): void {
    this.getListData();
  }

  getListData(){
    this.data.getLsitData().subscribe(res => {

      this.listData = res.map((e: any) => {
        const data = e.payload.doc.data();
        data.id = e.payload.doc.id;
        return data;
      })

    }, err => {
      alert('Error while fetching student data');
    })
  }

  createNewTask() {
    localStorage.setItem("infos", JSON.stringify(this.listData));
    console.log(localStorage.getItem('info'));
  }

  onEdit(element: any, index: number, template: any) {

    this.modalRef = this.modalService.show(template);
    this.editIndex = index;
    this.taskname = element.taskname;
    this.date = element.date;
    this.status = element.status;
  }

  updateItem() {

    if (this.editIndex >= 0) {
      this.listData[this.editIndex].taskname = this.taskname;
      this.listData[this.editIndex].date = this.date;
      this.listData[this.editIndex].status = this.status;
    }

    Swal.fire({
      icon: 'success',
      title: 'Updated Successfully',
    })

    localStorage.setItem("infos", JSON.stringify(this.listData));
    this.modalRef?.hide();

  }

  closeModal() {
    this.modalRef?.hide();
  }
  
}


