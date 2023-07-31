import { DatePipe, Location } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Prizenor } from 'src/app/Models/Prisoner';
import { ApiService } from 'src/app/Services/api.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  providers: [DatePipe], // add DatePipe to the providers array
  styleUrls: ['./edit.component.scss']
})
export class EditComponent {
  selectedPrizenoer: Prizenor = {} as Prizenor
  waiting: boolean = false
  prizoner: Prizenor = {} as Prizenor
  ImageUrl: any
  imageText: string = 'اختر صورة النزيل'
  AddForm!: FormGroup

  constructor(
    private datePipe: DatePipe,
    private fb: FormBuilder,
    private api: ApiService,
    private route: ActivatedRoute,
    private location: Location) {
    this.initForm()
  }

  initForm() {
    this.AddForm = this.fb.group({
      id: ([0]),
      serial: (['1']),
      name: (['', [Validators.required, Validators.pattern('[A-Za-z\u0621-\u064A ]+')]]),
      age: ([null, [Validators.required, Validators.pattern('[0-9]+')]]),
      birthDate: (['', [Validators.required]]),
      nationalNumber: (['', [Validators.required, Validators.minLength(14), Validators.maxLength(14)]]),
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
      Notes: (['', [Validators.pattern('[0-9A-Za-z\u0621-\u064A ]+')]]),
      outSource: (['', [Validators.pattern('[0-9A-Za-z\u0621-\u064A ]+')]])
    })
  }


  ngOnInit(): void {
    this.route.params.subscribe(params => {
      const id = params['id'];

      this.api.GetPrizonersById(id).subscribe({
        next: (res: any) => {
          this.selectedPrizenoer = res
          this.patchForm()


        }
      })
    });
  }


  patchForm() {
    this.AddForm.patchValue({
      id: this.selectedPrizenoer.id,
      serial: this.selectedPrizenoer.serial,
      name: this.selectedPrizenoer.name,
      age: this.selectedPrizenoer.age,
      birthDate: this.selectedPrizenoer.birthDate,
      nationalNumber: this.selectedPrizenoer.nationalNumber,
      adress: this.selectedPrizenoer.adress,
      nickName: this.selectedPrizenoer.nickName,
      JobTitle: this.selectedPrizenoer.jobTitle,
      accusation: this.selectedPrizenoer.accusation,
      judgmentTitle: this.selectedPrizenoer.judgmentTitle,
      fileNumber: this.selectedPrizenoer.fileNumber,
      KadyaNumber: this.selectedPrizenoer.kadyaNumber,
      galsaDate: this.selectedPrizenoer.galsaDate,
      galsaNumber: this.selectedPrizenoer.galsaNumber,
      startDate: this.selectedPrizenoer.startDate,
      EndDate: this.selectedPrizenoer.endDate,
      Notes: this.selectedPrizenoer.notes,
      outSource: this.selectedPrizenoer.outSource
    })

    console.log(this.AddForm.value);

  }

  get outSource() {
    return this.AddForm.get('outSource')
  }

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
    let object = { ...this.AddForm.value }
    const formData = new FormData()
    object.birthDate = new Date(object.birthDate)
    object.galsaDate = new Date(object.galsaDate)
    object.startDate = new Date(object.startDate)
    object.EndDate = new Date(object.EndDate)
    formData.append('id', object.id)
    formData.append('serial', object.serial ?? '')
    formData.append('name', object.name ?? '')
    formData.append('age', object.age ?? '')
    formData.append('birthDate', this.datePipe.transform(object.birthDate, 'yyyy-MM-ddTHH:mm:ss') ?? '')
    formData.append('nationalNumber', object.nationalNumber ?? '')
    formData.append('adress', object.adress ?? '')
    formData.append('nickName', object.nickName ?? '')
    formData.append('JobTitle', object.JobTitle ?? '')
    formData.append('accusation', object.accusation ?? '')
    formData.append('judgmentTitle', object.judgmentTitle ?? '')
    formData.append('fileNumber', object.fileNumber ?? '')
    formData.append('KadyaNumber', object.KadyaNumber ?? '')
    formData.append('galsaDate', this.datePipe.transform(object.galsaDate, 'yyyy-MM-ddTHH:mm:ss') ?? '')
    formData.append('galsaNumber', object.galsaNumber ?? '')
    formData.append('startDate', this.datePipe.transform(object.startDate, 'yyyy-MM-ddTHH:mm:ss') ?? '')
    formData.append('EndDate', this.datePipe.transform(object.EndDate, 'yyyy-MM-ddTHH:mm:ss') ?? '')
    if (this.ImageUrl) {
      formData.append('image', this.ImageUrl, this.imageText)
    }
    formData.append('Notes', object.Notes ?? 'لا يوجد')
    if (object.outSource?.length > 0) {
      formData.append('outSource', object.outSource)
    }


    this.api.UpdatePrizoner(formData).subscribe({
      next: (data) => {
        this.waiting = false
        Swal.fire({
          icon: 'success',
          text: 'تم تعديل البيانات بنجاح',
        })
        this.AddForm.reset()
        this.imageText = 'اختر صورة النزيل'
        this.location.back()

      },
      error: (err) => {
        console.log(err.error.errors);
        Swal.fire({
          icon: 'error',
          text: 'لقد حدث خطا ما برجاء المحاولة مرة اخرى',
        })
        this.waiting = false
      }
    })
  }

  UploadFile(e: any) {
    this.ImageUrl = e.target.files[0];
    this.imageText = this.ImageUrl.name
  }
}