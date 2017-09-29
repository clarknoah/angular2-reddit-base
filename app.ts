import {
  NgModule, Component, EventEmitter
} from '@angular/core';

import { BrowserModule } from '@angular/platform-browser';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

class Life{
  species: string;

  constructor(name: string){
    this.species = name;
  }

  exist(){
    console.log(`This species of life is called: ${this.species}`);
  }

}

class Animal extends Life{

  constructor(name: string){
    super(name);
  }
  exist(){
    console.log(`I eat Plants`);
    super.exist();
  }


}

class Plant extends Life{
  c02_converted: number;
  constructor(name: string){
    super(name);
  }

  convertC02():void{
    this.c02_converted += 1;
    console.log(`Wow, you've converted ${this.c02_converted} units of C02`);
  }


}

@Component({
  selector: 'list-of-stuff',
  inputs: ['listOfStuff'],
  outputs: ['selectedItemEvent'],
  template: `
  <ul>
    <li *ngFor="let name of listOfStuff">
      <button (click)="clickedListItem(name)">{{name}}</button>
    </li>
    <p>Selected: {{selectedItem}}</p>
  </ul>
  `,
})


class ListOfStuffComponent {

  selectedItem: string;
  selectedItemEvent: EventEmitter<string>;

  constructor() {
    this.selectedItemEvent = new EventEmitter();
  }
  selectListItem($event): void {
    this.selectedItem = $event.target;
  }
  clickedListItem(name: string): void {
    this.selectedItem = name;
    this.selectedItemEvent.emit(name);
    console.log(name);
  }
}




@Component({
  selector: 'input-output',
  template: `
    <h1>Selected Name: {{selectedListItem}}</h1>
    <list-of-stuff
    [listOfStuff]="items"
    (selectedItemEvent)="selectionHasChanged($event)"
    >
    </list-of-stuff>
  `
})

class InputOutputApp {

  items: string[];
  selectedListItem: string;
  bob: Animal;

  constructor() {
    this.bob = new Animal('Horse');
    this.items = [
      'Noah',
      'Elizabeth',
      'Leah'
    ];
    this.selectedListItem = "Testing Input Output Baby!";
  }

  selectionHasChanged(name: string): void {
    console.log(`It worked baby: ${name}`);
    this.bob.exist();
    this.selectedListItem = name;
  }

}

@NgModule({
  declarations: [
    InputOutputApp,
    ListOfStuffComponent],
  imports: [BrowserModule],
  bootstrap: [InputOutputApp]
})

class InputOutputAppModule { } platformBrowserDynamic().bootstrapModule(InputOutputAppModule);
