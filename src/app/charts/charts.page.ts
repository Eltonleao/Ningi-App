import { Component, OnInit } from '@angular/core';
import { Ningi, NingiService } from "../services/ningi.service";


@Component({
  selector: 'app-charts',
  templateUrl: './charts.page.html',
  styleUrls: ['./charts.page.scss'],
})
export class ChartsPage implements OnInit {

  chartOptions = {
    responsive: true
  };
  chartData = [
  ];
  chartLabels = ['dom', 'seg', 'ter', 'qua', 'quin', 'sex', 'sab'];

  constructor(
    private ningiService: NingiService
  ) { }

  ngOnInit() {
    this.loadCharts();
  }


  loadCharts() {
    const env = this;
    this.ningiService.getNingisSemanais().then(async (prevWeekNingis) => {
      // console.log(prevWeekNingis);
      var now = new Date(); now.setHours(0); now.setMinutes(0); now.setSeconds(0);
      // now.setDate(now.getDate() + 2);//n dias atras
      var diasDaSemana = ['dom', 'seg', 'ter', 'quar', 'quin', 'sex', 'sab'];
      diasDaSemana[now.getDay()] = 'hoje';

      var chartData = [];
      var chartLabels = [];

      var prevWeekDays = [];

      for (var i = 0; i <= 6; i++) {
        prevWeekDays.push({ weekday: now.getDay(), value: 0 });
        chartLabels.push(diasDaSemana[now.getDay()]);

        now.setDate(now.getDate() - 1);
      }
      // await console.log(prevWeekDays);
      prevWeekDays = await prevWeekDays.reverse();

      chartLabels = await chartLabels.reverse();
      // await console.log(prevWeekDays);
      this.chartLabels = await chartLabels;

      var carteira = JSON.parse(JSON.stringify(prevWeekDays));
      var bradesco = JSON.parse(JSON.stringify(prevWeekDays));
      var bancoDoBrasil = JSON.parse(JSON.stringify(prevWeekDays));
      var santander = JSON.parse(JSON.stringify(prevWeekDays));

      var ningis = await {
        carteira: carteira,
        bradesco: bradesco,
        santander: santander,
        banco_do_brasil: bancoDoBrasil
      };

      // await console.log(ningis);

      // return false;


      await prevWeekNingis.forEach(async ningi => {
        if (ningi.operation == 'spend') {
          var d = new Date(ningi.data_criacao);
          // console.log(d, ningis[ningi.source]);
          for (var item in ningis[ningi.source]) {
            // var index = ningis[ningi.source].findIndex((x) => x.weekday == d.getDay());
            if (ningis[ningi.source][item].weekday == d.getDay()) {
              // ningis[ningi.source][index]['value'] = await parseFloat(ningis[ningi.source][index]['value']) + parseFloat(ningi.value);
              // console.log(ningis[ningi.source][item]);
              ningis[ningi.source][item].value = parseFloat(ningis[ningi.source][item].value) + parseFloat(ningi.value);
            }
          }
          // console.log(ningis);
        }
      });

      // await console.log(ningis);


      for (var source in ningis) {
        var obj = { data: [], label: source };
        for (var index in ningis[source]) {
          obj.data.push(ningis[source][index].value);
        };
        chartData.push(obj);

        console.log(source);
        switch (source) {
          case 'carteira':
            obj['backgroundColor'] = '#2dd36f';
            obj['borderColor'] = '#2dd36f';
            obj['pointBackgroundColor'] = '#2dd36f';
            obj['pointBorderColor'] = '#2dd36f';
            obj['pointBorderColor'] = '#2dd36f';
            break;

          case 'bradesco':
            obj['backgroundColor'] = '#eb445a';
            obj['borderColor'] = '#eb445a';
            obj['pointBackgroundColor'] = '#eb445a';
            obj['pointBorderColor'] = '#eb445a';
            obj['pointBorderColor'] = '#eb445a';
            break;
          case 'santander':
            obj['backgroundColor'] = '#3880ff';
            obj['borderColor'] = '#3880ff';
            obj['pointBackgroundColor'] = '#3880ff';
            obj['pointBorderColor'] = '#3880ff';
            obj['pointBorderColor'] = '#3880ff';
            break;
          case 'banco_do_brasil':
            obj['backgroundColor'] = '#ffc409';
            obj['borderColor'] = '#ffc409';
            obj['pointBackgroundColor'] = '#ffc409';
            obj['pointBorderColor'] = '#ffc409';
            obj['pointBorderColor'] = '#ffc409';
            break;
        }
      }
      env.chartData = chartData;
      await console.log(env.chartData);
    });
  }

  ionViewDidEnter() {
    this.loadCharts();
  }

}
