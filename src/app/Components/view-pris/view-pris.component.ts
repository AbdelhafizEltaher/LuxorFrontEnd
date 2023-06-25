import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Table } from 'primeng/table';
import { Prizenor } from 'src/app/Models/Prisoner';
import { ApiService } from 'src/app/Services/api.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-view-pris',
  templateUrl: './view-pris.component.html',
  providers: [DatePipe], // add DatePipe to the providers array
  styleUrls: ['./view-pris.component.scss']
})
export class ViewPrisComponent implements OnInit {
  listOfPrizoners: Prizenor[] = []
  display: boolean = false
  display2: boolean = false
  display3: boolean = false
  selectedPrizenoer: Prizenor = {} as Prizenor
  currentDate: string;

  constructor(private datePipe: DatePipe , private api: ApiService , private router: Router) { 
    this.currentDate =this.datePipe.transform(new Date(), 'yyyy-MM-ddTHH:mm:ss.SSSZ', 'Africa/Cairo') ?? ''
  }
  
  ngOnInit(): void {
    this.GetAllData()
  }
  clear(table: Table) {
    table.clear();
}

  GetAllData() {
    this.api.GetAllPrizoners().subscribe({
      next: (data: any) => {
        console.log(data);
        this.listOfPrizoners = data
      },
      error: (err) => {
        console.log(err);
        Swal.fire({
          icon: 'error',
          text: 'لقد حدث خطا ما برجاء المحاولة مرة اخرى',
        })
      }
    })
  }
  formatedFun(date: string) {
    return new Date(date).toLocaleDateString('ar', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  }
  SetRule(i: number) {
    if (i == 1) {
      this.api.DeletePrizoner(this.selectedPrizenoer.id).subscribe({
        next: (data) => {
          console.log(data);
          this.display = false
          this.ngOnInit()
          Swal.fire({
            icon: 'success',
            text: 'تمت حذف النزيل بنجاح ونقله الي قائمة المنتهى',
          })
        },
        error: (err) => {
          console.log(err);
          Swal.fire({
            icon: 'error',
            text: 'لقد حدث خطا ما برجاء المحاولة مرة اخرى',
          })
        }
      })
    }
    else if (i == 2) {
      this.display = false
      this.display2 = true
    }
    else if (i == 3) {
      this.display = false

    }
  }
  updatePlace(place: string) {
    this.api.UpdatePlace(this.selectedPrizenoer.id, place).subscribe({
      next: (data) => {
        console.log(data);
        this.display2 = false
        this.display = false
        this.ngOnInit()
        Swal.fire({
          icon: 'success',
          text: 'تمت نقل النزيل بنجاح الي قائمة الجهات الخارجية',
        })

      },
      error: (err) => {
        console.log(err);
        Swal.fire({
          icon: 'error',
          text: 'لقد حدث خطا ما برجاء المحاولة مرة اخرى',
        })
      }
    })
  }


edit(){
  const formData = new FormData()
  formData.append('id',this.selectedPrizenoer.id.toString())
  formData.append('serial',this.selectedPrizenoer.serial.toString())
  formData.append('name',this.selectedPrizenoer.name)
  formData.append('age',this.selectedPrizenoer.age.toString())
  formData.append('birthDate',this.datePipe.transform(this.selectedPrizenoer.birthDate, 'yyyy-MM-ddTHH:mm:ss')??'')
  formData.append('nationalNumber',this.selectedPrizenoer.nationalNumber.toString())
  formData.append('adress',this.selectedPrizenoer.adress??'')
  formData.append('nickName',this.selectedPrizenoer.nickName??'')
  formData.append('JobTitle',this.selectedPrizenoer.jobTitle  ??'')
  formData.append('accusation',this.selectedPrizenoer.accusation??'')
  formData.append('judgmentTitle',this.selectedPrizenoer.judgmentTitle??'')
  formData.append('fileNumber',this.selectedPrizenoer.fileNumber.toString())
  formData.append('KadyaNumber',this.selectedPrizenoer.kadyaNumber.toString())
  formData.append('galsaDate',this.datePipe.transform(this.selectedPrizenoer.galsaDate, 'yyyy-MM-ddTHH:mm:ss')??'')
  formData.append('galsaNumber',this.selectedPrizenoer.galsaNumber.toString())
  formData.append('startDate',this.datePipe.transform(this.selectedPrizenoer.startDate, 'yyyy-MM-ddTHH:mm:ss')??'')
  formData.append('EndDate',this.datePipe.transform(this.selectedPrizenoer.endDate, 'yyyy-MM-ddTHH:mm:ss')??'')
  formData.append('image' , this.selectedPrizenoer.imgUrl ??'')
  formData.append('Notes',this.selectedPrizenoer.Notes??'لا يوجد')
  this.api.UpdatePrizoner(formData).subscribe({
    next: (data) => {
      console.log(data);
      this.display3 = false
      this.ngOnInit()
      Swal.fire({
        icon: 'success',
        text: 'تم تعديل البيانات بنجاح',
      })

    },
    error: (err) => {
      console.log(err);
      Swal.fire({
        icon: 'error',
        text: 'لقد حدث خطا ما برجاء المحاولة مرة اخرى',
      })
    }
  })  
}

  Print(){
    window.open(`/printPresionData/${this.selectedPrizenoer.id}`)
  }
}
