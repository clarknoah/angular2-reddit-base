import { NgModule, Component, EventEmitter
} from '@angular/core';

import { BrowserModule } from '@angular/platform-browser';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

@Component({
  selector:'list-of-stuff',
  inputs:['listOfStuff'],
  outputs:['selectedItemEvent'],
  template:`
  <ul>
    <li *ngFor="let name of listOfStuff">
      <button (click)="clickedListItem(name)">{{name}}</button>
    </li>
    <p>Selected: {{selectedItem}}</p>
  </ul>
  `,
})


class ListOfStuffComponent{

  selectedItem: string;
  selectedItemEvent: EventEmitter<string>;

  constructor(){
    this.selectedItemEvent = new EventEmitter();
  }
  selectListItem($event): void{
    this.selectedItem = $event.target;
  }
  clickedListItem(name:string): void{
    this.selectedItem = name;
    this.selectedItemEvent.emit(name);
    console.log(name);
  }
}




@Component({
  selector:'input-output',
  template:`
    <h1>Selected Name: {{title}}</h1>
    <list-of-stuff
    [listOfStuff]="items"
    (selectedItemEvent)="selectionHasChanged($event)"
    >
    </list-of-stuff>

  `

})

class InputOutputApp{

  items: string[];
  title: string;

  constructor(){
    this.items = [
      'Noah',
      'Elizabeth',
      'Leah'
    ];
    this.title = "Testing Input Output Baby!";
  }

    selectionHasChanged(name:string): void{
     console.log(`It worked baby: ${name}`);
     this.title = name;
    }

}

@NgModule({
  declarations: [
    InputOutputApp,
    ListOfStuffComponent],
    imports:[BrowserModule],
    bootstrap:[InputOutputApp]
})

class InputOutputAppModule { } platformBrowserDynamic().bootstrapModule(InputOutputAppModule);
