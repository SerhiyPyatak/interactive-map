import { Component, ViewChild, OnInit, AfterViewInit } from '@angular/core';
import { icon, latLng, marker, tileLayer } from 'leaflet';
import { MapComponent } from './map/map.component';
import * as L from 'leaflet';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent implements AfterViewInit {
 @ViewChild(MapComponent) child; //связываем данный компонент с дочерним (картой)

  title = 'leaflet-map';

  ngAfterViewInit() {
    // ...
  }

  /*Массив объектов, каждый из которых представляет собой предопределенную
  локацию на карте Винницы*/
  private locationsRepository=[
    {
      name: "principal-hospital-1",
      latit: 49.23644575846,
      longit: 28.41398768525
    },

    {
      name: "region-oncologic-dispensary",
      latit: 49.23726862005,
      longit: 28.41680227053
    },

    {
      name: "region-children-hospital",
      latit: 49.24004258481,
      longit: 28.41031132471
    },

    {
      name: "principal-hospital-2",
      latit: 49.24942922481,
      longit: 28.47735568442
    },

    {
      name: "principal-hospital-3",
      latit: 49.21272091418,
      longit: 28.46957334979
    },

    {
      name: "region-hospital-pirogov",
      latit: 49.23006639204,
      longit: 28.45082552774
    },

    {
      name: "military-hospital",
      latit: 49.21894943649,
      longit: 28.45891507013
    },

    {
      name: "region-mental-hospital-ushch",
      latit: 49.21283826914,
      longit: 28.44395471537
    },

    {
      name: "region-tb-dispensary",
      latit: 49.19250246843,
      longit: 28.39204794068
    },

    {
      name: "region-mental-hospital-2",
      latit: 49.22412636874,
      longit: 28.34288841385
    },

    {
      name: "region-hemotransfusion station",
      latit: 49.22876479958,
      longit: 28.45076535474
    },

    {
      name: "war-veteran-hospital",
      latit: 49.21194652795,
      longit: 28.44199320944
    },

    {
      name: "region-dermatovenerologic-dispensary",
      latit: 49.23662512030,
      longit: 28.47230305400
    },

    {
      name: "region-endocrinological-dispensary",
      latit: 49.24962338716,
      longit: 28.45616709870
    },

    {
      name: "railway-hospital",
      latit: 49.23988107055,
      longit: 28.50500347224
    },

    {
      name: "tech-university",
      latit: 49.23449957322,
      longit: 28.41059460600
    },

    {
      name: "pedagogic-university",
      latit: 49.24198818589,
      longit: 28.49648839549
    },

    {
      name: "agrarian-university",
      latit: 49.20863257911,
      longit: 28.40639740347
    },

    {
      name: "medical-university",
      latit: 49.22780897981,
      longit: 28.44653748308
    },

    {
      name: "commercial-university",
      latit: 49.23375840154,
      longit: 28.46250824222
    },

    {
      name: "pirogov-museum",
      latit: 49.21604862178,
      longit: 28.40832708114
    },

    {
      name: "warriors-museum",
      latit: 49.23493704326,
      longit: 28.46960678375
    },

    {
      name: "automotoradio-museum",
      latit: 49.23356394835,
      longit: 28.47907909947
    },

    {
      name: "tram-museum",
      latit: 49.23288080966,
      longit: 28.43711421571
    },

    {
      name: "airforce-museum",
      latit: 49.25084642328,
      longit: 28.50035084388
    },

    {
      name: "local-lore-museum",
      latit: 49.23265115443,
      longit: 28.47612207785
    },

    {
      name: "region-theatre",
      latit: 49.23432814076,
      longit: 28.46370748131
    },

    {
      name: "mir-cinema",
      latit: 49.22438923497,
      longit: 28.41927301886
    },

    {
      name: "kocuba-cinema",
      latit: 49.23358513476,
      longit: 28.46618615256
    },

    {
      name: "smart-cinema",
      latit: 49.23360558586,
      longit: 28.47137804249
    },

    {
      name: "rodina-sinema",
      latit: 49.23418705369,
      longit: 28.47053046445
    },

    {
      name: "trc-megamoll",
      latit: 49.22769587357,
      longit: 28.42685156037
    },

    {
      name: "trc-anastasia",
      latit: 49.22815724417,
      longit: 28.45103877098
    },

    {
      name: "trc-magigrand",
      latit: 49.22646172909,
      longit: 28.41268305842
    },

    {
      name: "trc-sky-park",
      latit: 49.23395069701,
      longit: 28.46988089359
    },

    {
      name: "trc-october",
      latit: 49.23955827014,
      longit: 28.49779554927
    },

    {
      name: "railway-st",
      latit: 49.23936900103,
      longit: 28.51045845899
    },

    {
      name: "autost-central",
      latit: 49.23665288439,
      longit: 28.48309508560
    },

    {
      name: "autost-east",
      latit: 49.24430657094,
      longit: 28.53493938518
    },

    {
      name: "autost-west",
      latit: 49.23687867529,
      longit: 28.40394103782
    },

    {
      name: "airport",
      latit: 49.24347213230,
      longit: 28.60622075658
    },

    {
      name: "prezentor-loc",
      latit: 49.23520679237,
      longit: 28.42820779144
    }
  ];

  /*Данный метод по выбранному из списка наименованию возвращает
   соответствующий объект со значениями его координат на карте */
  getLocation(objName) {
    /*по идентификатору выбранного элемента списка определяем географические 
    координаты соотв. локации на карте*/
    const position = this.locationsRepository.filter(loc=>loc.name===objName);
    /*вызываем метод pinPoint компонента-карты и передаём туда требуемые координаты
    локации для установки маркера и центрирования карты*/
    this.child.pinPoint(position[0].latit, position[0].longit);
    //console.log(JSON.stringify(position));
   }

  /*b.t.w. Хороший сайт с точными локациями по Виннице:
    http://map.vn.ua/map
  */
}
