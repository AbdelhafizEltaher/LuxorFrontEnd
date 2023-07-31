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
  imageText:string='اختر صورة النزيل'
  constructor(private datePipe: DatePipe,private fb: FormBuilder, private api: ApiService) { }
  AddForm = this.fb.group({
    id: ([0]),
    serial: (['1']),
    name: (['', [Validators.required, Validators.pattern('[A-Za-z\u0621-\u064A ]+')]]),
    age: ([null, [Validators.required, Validators.pattern('[0-9]+')]]),
    birthDate: (['', [Validators.required]]),
    nationalNumber: (['', [Validators.required , Validators.minLength(14) ,  Validators.maxLength(14) ]]),
    adress: (['', [Validators.required, Validators.pattern('[0-9A-Za-z\u0621-\u064A- ]+')]]),
    nickName: (['', [Validators.required, Validators.pattern('[A-Za-z\u0621-\u064A ]+')]]),
    JobTitle: (['', [Validators.required, Validators.pattern('[A-Za-z\u0621-\u064A ]+')]]),
    accusation: (['', [Validators.required, Validators.pattern('[0-9A-Za-z\u0621-\u064A ]+')]]),
    judgmentTitle: (['', [Validators.required, Validators.pattern('[0-9A-Za-z\u0621-\u064A ]+')]]),
    fileNumber: (['', [Validators.required, Validators.pattern('[0-9A-Za-z\u0621-\u064A ]+')]]),
    KadyaNumber: (['', [Validators.required, Validators.pattern('[0-9A-Za-z\u0621-\u064A ]+')]]),
    galsaDate: (['', [Validators.required]]),
    galsaNumber: (['1']),
    startDate: (['', [Validators.required]]),
    EndDate: (['', [Validators.required]]),
    ImageUrl: (['', [Validators.required]]),
    Notes: (['', [Validators.pattern('[0-9A-Za-z\u0621-\u064A ]+')]])
  })


  get serial() {
    return this.AddForm.get('serial')
  }
  get name() {
    return this.AddForm.get('name')
  }

  get age() {
    return this.AddForm.get('age')
  }
  get birthDate() {
    return this.AddForm.get('birthDate')
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
  get galsaNumber() {
    return this.AddForm.get('galsaNumber')
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
   formData.append('serial',object.serial??'')
   formData.append('name',object.name??'')
   formData.append('age',object.age??'')
   formData.append('birthDate',this.datePipe.transform(object.birthDate, 'yyyy-MM-ddTHH:mm:ss')??'')
   formData.append('nationalNumber',object.nationalNumber??'')
   formData.append('adress',object.adress??'')
   formData.append('nickName',object.nickName??'')
   formData.append('JobTitle',object.JobTitle??'')
   formData.append('accusation',object.accusation??'')
   formData.append('judgmentTitle',object.judgmentTitle??'')
   formData.append('fileNumber',object.fileNumber??'')
   formData.append('KadyaNumber',object.KadyaNumber??'')
   formData.append('galsaDate',this.datePipe.transform(object.galsaDate, 'yyyy-MM-ddTHH:mm:ss')??'')
   formData.append('galsaNumber',object.galsaNumber??'')
   formData.append('startDate',this.datePipe.transform(object.startDate, 'yyyy-MM-ddTHH:mm:ss')??'')
   formData.append('EndDate',this.datePipe.transform(object.EndDate, 'yyyy-MM-ddTHH:mm:ss')??'')
   formData.append('image',this.ImageUrl , this.imageText)
   formData.append('Notes',object.Notes??'لا يوجد')
    this.api.AddPrizoner(formData).subscribe({
      next: (data) => {
        this.waiting=false
        Swal.fire({
          icon: 'success',
          text: 'تمت اضافة النزيل بنجاح الي قائمة النزلاء',
        })
        this.AddForm.reset()
        this.imageText='اختر صورة النزيل'
      },
      error: (err) => {
        console.log(err.error.errors);
        Swal.fire({
          icon: 'error',
          text: 'لقد حدث خطا ما برجاء المحاولة مرة اخرى',
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