import { Component, AfterViewInit, OnInit } from '@angular/core';
import * as L from 'leaflet';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})

/*export class MapComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}*/

/*Блок div с идентификатором "map" должен уже присутствовать в DOM, прежде чем
  мы сможем ссылаться на него для создания карты. Поэтому используем
  lifecycle hook AfterViewInit
*/
export class MapComponent implements AfterViewInit {
  private map; 					//переменная для манипулирования объектом карты
  private myMarker;				//переменная для манипулирования маркером на карте
  private isMarkedAdded:boolean=false;	//флаг, поднимающийся при установке маркера на карту

  constructor() { }

  ngAfterViewInit(): void {
  	this.initMap(); //как только DOM загрузился - инициализируем карту
  }

/*Этот метод отвечает за инициализирование объекта-карты*/
  private initMap(): void {
   /*в переменной map инициализируем объект карты, устанавливаем начальный zoom
   и центр карты так, чтоб приблизительно вся Винница отображалась в своём div'е
	В качестве целевого HTML-компонента для отображения карты выбираем div с
	идентификатором "map", который мы создали в шаблоне данного Angular-компонента
   */
   this.map = L.map('map', {
    center: [ 49.2435, 28.5103 ],
    zoom: 12.5
  });

   /*с сервера загружаем "мозаику" с картографическими данными и изображениями*/
   const tiles = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  		maxZoom: 19,
  		attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
	});

   /*Добавляем картографическую "мозаику" к объекту-карте
   Теперь карта будет отображаться на веб-странице. Для корректного отображения
   карты нужно импортировать файл стилей "./node_modules/leaflet/dist/leaflet.css"
   в секции build и test файла angular.json либо в корневой файл styles.css*/
   tiles.addTo(this.map);
 };

 /*Данный метод отвечает за создание объекта-маркера и его добавление на карту.
 Входные параметры latid, longit являются координатами расположения маркера на
 карте*/
  private addMrkr(latid, longit) {
  	/*В переменной markr создаём объект маркера, опрелеляем его основные свойства
  	(тип и размер иконки e.t.c)*/
  	const markr = L.marker(L.latLng([latid, longit]), {
    icon: L.icon({
      iconSize: [ 25, 41 ],
      iconAnchor: [ 13, 41 ],
      iconUrl: 'leaflet/marker-icon.png',
      shadowUrl: 'leaflet/marker-shadow.png'
    })
  })
    markr.addTo(this.map); 		//добавляем маркер на карту
    this.isMarkedAdded=true;	//поднимаем флаг наличия маркера на карте
    return markr;				//возвращаем созданный объект маркера вызывающей функции
  };

  /*Этот метод является основным во взаимодействии с пользовательским вводом:
  именно этот метод в конечном счёте вызывается при выборе пользователем элемента
  списка*/
  pinPoint(latid, longit) {
  	//Если на карту ранее уже был установлен маркер...
  	if (this.isMarkedAdded) {
  		//...то перемещаем его на выбранную локацию согласно элементу списка
  		this.myMarker.setLatLng(L.latLng([ latid, longit ]));
  	}
  	else {
  		//...иначе создаём маркер и позиционируем его на карте
  		this.myMarker = this.addMrkr(latid, longit);
  	};
  	/*под финал вызываем из библиотеки leaflet метод flyTo, который реализует
  	анимированный эффект "перелёта" из одной локации на карте в другую, центрирует
  	карту на новой выбранной локации*/
  	this.map.flyTo(L.latLng([ latid, longit ]), 17);
  };
 }

