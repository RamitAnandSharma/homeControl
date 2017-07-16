
import {Http} from '@angular/http';
import {Injectable} from '@angular/core';

import {Observable} from 'rxjs/Observable';
import 'rxjs/Rx';
import {Device} from '../entity/interface';

@Injectable()
export class DataService {

	constructor(private http: Http) {}

	handleError(error):any {
		console.error("Application error::  "+error);
		return Observable.throw(error.json().error || 'Server error');
	}

	getRoomRecentEvents(dayIndex, queryText='', excludeTracks=[], segment='all') {
		return new Promise(resolve => {
			this.http.get('assets/data/data.json').subscribe(res => {
				var data = res.json();
				resolve(data.events);
			});
		});
	}

	getRoomDevices(roomid:string): Observable<Device[]> {
		return this.http.get('assets/data/data.json')
		.map(response => response.json())
		.flatMap(response => response.devices)
		.catch(this.handleError);
	}

	getRoomList() {
		return this.http.get('assets/data/data.json')
		.map(response => response.json())
		.flatMap(response =>response.rooms)
		.catch(this.handleError);
	}

	getRecentEvents() {
    return this.http.get('assets/data/data.json')
      .map(response => response.json())
      .flatMap(response =>response.allevents)
      .catch(this.handleError);
  }

  getFiltredRecentEventList(queryText='') {
    queryText = queryText.toLowerCase().replace(/,|\.|-/g,' ');
    let queryWords = queryText.split(' ').filter((w:any) => w.trim().length);
    return  this.http.get('assets/data/data.json')
        .map(response => response.json())
        .flatMap(response => response.allevents)
        .filter((eachEvent:any) => {
          var masterString = eachEvent.location.toLowerCase();
          return masterString.indexOf(queryWords) !== -1;
        })
        .catch(this.handleError);
  }







}
