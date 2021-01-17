import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from "@angular/router";
import { NingiService } from "../services/ningi.service";



@Component({
  selector: 'app-ningi-details',
  templateUrl: './ningi-details.page.html',
  styleUrls: ['./ningi-details.page.scss'],
})
export class NingiDetailsPage implements OnInit {

  ningi: any;

  constructor(
    private route: ActivatedRoute,
    private ningiService: NingiService
  ) {
    this.ningi = {
      user: "skdjfh"
    }
  }

  async ngOnInit() {
    var id = await  this.route.snapshot.params['id'];
    if (id) {
      this.ningiService.getNingi(id).then((data)=>{
        // console.log(data.data_criacao);
        var formatedDate = this.ningiService.formatDate(data.data_criacao);
        data.data_criacao = formatedDate;
        this.ningi = data;
      });
    }
  }


}
