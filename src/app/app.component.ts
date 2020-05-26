import { Component, ViewChild, OnInit, AfterViewInit } from '@angular/core';
import { icon, latLng, marker, tileLayer } from 'leaflet';
import { MapComponent } from './map/map.component';
import * as L from 'leaflet';
import 'leaflet-control-geocoder';

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
  private locationsDataBase = [
    {
          name: "principal-hospital-1",
          housenum: '96',
          street: 'Хмельницьке шосе'
      },

      {
          name: "region-oncologic-dispensary",
          housenum: '84',
          street: 'Хмельницьке шосе'
      },

      {
          name: "region-children-hospital",
         housenum: '108',
          street: 'Хмельницьке шосе'
      },

      {
          name: "principal-hospital-2",
          housenum: '68',
          street: 'Київська'
      },

      {
          name: "principal-hospital-3",
          housenum: '138',
          street: 'Маяковського'
      },

      {
          name: "region-hospital-pirogov",
          housenum: '52',
          street: 'Пирогова'
      },

      {
          name: "military-hospital",
          housenum: '187',
          street: 'Коріатовичів'
      },

      {
          name: "region-mental-hospital-ushch",
          housenum: '',
          street: 'психіатрична лікарня ім.Ющенка'
      },

      {
          name: "region-tb-dispensary",
          housenum: '',
          street: 'тубдиспансер'
      },

      {
          name: "region-mental-hospital-2",
          housenum: '',
          street: 'Вінницька обласна психіатрична лікарня №2'
      },

      {
          name: "region-hemotransfusion station",
          housenum: '48',
          street: 'Пирогова'
      },

      {
         name: "war-veteran-hospital",
          housenum: '',
          street: 'госпіталь ветеранів ВВВ'
      },

      {
          name: "region-dermatovenerologic-dispensary",
          housenum: '',
          street: 'шкірно-венерологічний диспансер'
      },

      {
          name: "region-endocrinological-dispensary",
          housenum: '',
          street: 'Ендокринологічний центр'
      },

      {
          name: "railway-hospital",
          housenum: '6',
          street: 'Коцюбинського'
      },

      {
          name: "tech-university",
          housenum: '95',
          street: 'Хмельницьке шосе'
      },

      {
          name: "pedagogic-university",
          housenum: '',
          street: 'ВДПУ'
      },

      {
          name: "agrarian-university",
          housenum: '',
          street: 'ВНАУ'
      },

      {
          name: "medical-university",
          housenum: '56',
          street: 'Пирогова'
      },

      {
          name: "commercial-university",
          housenum: '',
          street: 'торговельно-економічний інститут'
      },

      {
          name: "pirogov-museum",
          housenum: '',
          street: 'музей-садиба Пирогова'
      },

      {
          name: "warriors-museum",
          housenum: '20',
          street: 'Оводова'
      },

      {
          name: "automotoradio-museum",
          housenum: '',
          street: 'музей ретро-техніки'
      },

      {
          name: "tram-museum",
          housenum: '',
          street: 'музей трамваю'
      },

      {
          name: "airforce-museum",
          housenum: '',
          street: 'Музей Повітряних Сил'
      },

      {
          name: "local-lore-museum",
          housenum: '',
          street: 'обласний краєзнавчий музей'
      },

      {
          name: "region-theatre",
          housenum: '',
          street: 'театр Садовського'
      },

      {
          name: "mir-cinema",
          housenum: '',
          street: 'кінотеатр Мир'
      },

      {
          name: "kocuba-cinema",
          housenum: '66а',
          street: 'Соборна'
      },

      {
          name: "smart-cinema",
          housenum: '',
          street: 'SmartCinema'
      },

      {
          name: "rodina-sinema",
          housenum: '47',
          street: 'Оводова'
      },

      {
          name: "trc-megamoll",
          housenum: '',
          street: 'Мегамолл'
      },

      {
          name: "trc-anastasia",
          housenum: 'Анастасія',
          street: 'Пирогова'
      },

      {
          name: "trc-magigrand",
          housenum: '',
          street: 'Магігранд'
      },

      {
          name: "trc-sky-park",
          housenum: '',
          street: 'Скайпарк'
      },

      {
          name: "trc-october",
          housenum: '',
          street: 'Жовтень'
      },

      {
          name: "railway-st",
          housenum: '',
          street: 'залізничний вокзал'
      },

      {
          name: "autost-central",
          housenum: '',
          street: 'центральний автовокзал'
      },

      {
          name: "autost-east",
         housenum: '',
          street: 'східний автовокзал'
      },

      {
          name: "autost-west",
          housenum: '',
          street: 'західний автовокзал'
      },

      {
          name: "airport",
          housenum: '',
          street: 'аеропорт'
      },

      {
          name: "prezentor-loc",
          housenum: '',
          street: 'кряж'
      }
  ];

  /*Данный метод по выбранному из списка наименованию возвращает
   соответствующий объект со значениями его координат на карте */
  getLocation(objName) {
    /*по идентификатору выбранного элемента списка определяем адрес соотв. 
    локации на карте*/
    const position = this.locationsDataBase.filter(loc=>loc.name===objName);
    const halfQuery = [position[0].housenum, position[0].street, "Вінниця"];
    /*вызываем метод pinPoint компонента-карты и передаём туда требуемые адрес
    локации для нахождения координат и установки маркера и центрирования карты*/
    this.child.pinPointA(halfQuery.join(' '));
    //console.log(JSON.stringify(position));
   }

  /*b.t.w. Хороший сайт с точными локациями по Виннице:
    http://map.vn.ua/map
  */
}
