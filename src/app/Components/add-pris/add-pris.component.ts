import { DatePipe, formatDate } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Prizenor } from 'src/app/Models/Prisoner';
import { ApiService } from 'src/app/Services/api.service';
import Swal from 'sweetalert2'
@Component({
  selector: 'app-add-pris',
  templateUrl: './add-pris.component.html',
  providers: [DatePipe], // add DatePipe to the providers array
  styleUrls: ['./add-pris.component.scss']
})
export class AddPrisComponent {
  waiting: boolean = false
  prizoner: Prizenor = {} as Prizenor
  ImageUrl : any
  imageText:string=' صورة النزيل'
  constructor(private datePipe: DatePipe,private fb: FormBuilder, private api: ApiService) { }
  AddForm = this.fb.group({
    id: ([0]),
    name: (['', [Validators.required, Validators.pattern('[A-Za-z\u0621-\u064A ]+')]]),
    age: ([null, [ Validators.pattern('[0-9]+')]]),
    nationalNumber: (['', [Validators.minLength(14) ,  Validators.maxLength(14) ]]),
    adress: (['', [Validators.required, Validators.pattern('[0-9A-Za-z\u0621-\u064A- ]+')]]),
    nickName: (['', [ Validators.pattern('[A-Za-z\u0621-\u064A ]+')]]),
    JobTitle: (['', [ Validators.pattern('[A-Za-z\u0621-\u064A ]+')]]),
    accusation: (['', [Validators.required, Validators.pattern('[0-9A-Za-z\u0621-\u064A ]+')]]),
    judgmentTitle: (['', [ Validators.pattern('[0-9A-Za-z\u0621-\u064A ]+')]]),
    fileNumber: (['', [Validators.required, Validators.pattern('[0-9A-Za-z\u0621-\u064A ]+')]]),
    KadyaNumber: (['', [Validators.pattern('[0-9A-Za-z\u0621-\u064A ]+')]]),
    galsaDate: (['']),
    startDate: (['']),
    EndDate: (['']),
    ImageUrl: (['']),
    Notes: (['', [Validators.pattern('[0-9A-Za-z\u0621-\u064A ]+')]])
  })


  get name() {
    return this.AddForm.get('name')
  }

  get age() {
    return this.AddForm.get('age')
  }

  get nationalNumber() {
    return this.AddForm.get('nationalNumber')
  }
  get adress() {
    return this.AddForm.get('adress')
  }

  get nickName() {
    return this.AddForm.get('nickName')
  }
  get JobTitle() {
    return this.AddForm.get('JobTitle')
  }
  get accusation() {
    return this.AddForm.get('accusation')
  }
  get judgmentTitle() {
    return this.AddForm.get('judgmentTitle')
  }
  get fileNumber() {
    return this.AddForm.get('fileNumber')
  }
  get KadyaNumber() {
    return this.AddForm.get('KadyaNumber')
  }
  get galsaDate() {
    return this.AddForm.get('galsaDate')
  }
  get startDate() {
    return this.AddForm.get('startDate')
  }

  get EndDate() {
    return this.AddForm.get('EndDate')
  }

  get Notes() {
    return this.AddForm.get('startDate')
  }



  Add() {
    this.waiting = true
    let object = {...this.AddForm.value}
   const formData = new FormData()
   formData.append('id','0')
   formData.append('name',object.name??'')
   formData.append('age',object.age??'')
   formData.append('nationalNumber',object.nationalNumber??'')
   formData.append('adress',object.adress??'')
   formData.append('nickName',object.nickName??'')
   formData.append('JobTitle',object.JobTitle??'')
   formData.append('accusation',object.accusation??'')
   formData.append('judgmentTitle',object.judgmentTitle??'')
   formData.append('fileNumber',object.fileNumber??'')
   formData.append('KadyaNumber',object.KadyaNumber??'')
   formData.append('galsaDate',this.datePipe.transform(object.galsaDate, 'yyyy-MM-ddTHH:mm:ss')??'')
   formData.append('startDate',this.datePipe.transform(object.startDate || new Date(), 'yyyy-MM-ddTHH:mm:ss')??'')
   formData.append('EndDate',this.datePipe.transform(object.EndDate, 'yyyy-MM-ddTHH:mm:ss')??'')
   if(this.ImageUrl){
    formData.append('image',this.ImageUrl , this.imageText)
   }
   formData.append('Notes',object.Notes??'لا يوجد')
    this.api.AddPrizoner(formData).subscribe({
      next: (data) => {
        this.waiting=false
        Swal.fire({
          icon: 'success',
          text: 'تمت اضافة النزيل بنجاح الي قائمة النزلاء',
        })
        this.AddForm.reset()
        this.imageText=' صورة النزيل'
      },
      error: (err) => {
        Swal.fire({
          icon: 'error',
          text: err.error,
        })        
        this.waiting=false
      }
    })
  }
  UploadFile(e:any){
    this.ImageUrl = e.target.files[0];
    this.imageText = this.ImageUrl.name
  }
}