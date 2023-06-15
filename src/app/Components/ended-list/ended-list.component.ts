import { DatePipe } from '@angular/common';
import { Component } from '@angular/core';
import { Prizenor } from 'src/app/Models/Prisoner';
import { ApiService } from 'src/app/Services/api.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-ended-list',
  templateUrl: './ended-list.component.html',
  providers: [DatePipe], // add DatePipe to the providers array
  styleUrls: ['./ended-list.component.scss']
})
export class EndedListComponent {

  listOfPrizoners: Prizenor[] = []
  display: boolean = false
  selectedPrizenoer: Prizenor = {} as Prizenor
  currentDate: string;
  constructor(private datePipe: DatePipe , private api: ApiService) { 
    this.currentDate =this.datePipe.transform(new Date(), 'yyyy-MM-ddTHH:mm:ss.SSSZ', 'Africa/Cairo') ?? ''
  }
  ngOnInit(): void {
    this.GetAllData()
  }


  GetAllData() {
    this.api.GetAllDeletedPrizoners().subscribe({
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

  SetRule() {
    this.api.DeletePrizoner(this.selectedPrizenoer.id).subscribe({
      next: (data) => {
        console.log(data);
        this.display = false
        this.ngOnInit()
        Swal.fire({
          icon: 'success',
          text: 'تمت استرجاع النزيل بنجاح ونقله الي قائمة النزلاء',
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
}
