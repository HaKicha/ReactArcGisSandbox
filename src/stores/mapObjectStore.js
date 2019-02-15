import {observable} from "mobx";

export default class mapObjectStore {

    @observable
    store = [];

    addMapObject = (title,priority,link,x,y,source) => {
          this.store.push(
              {
                  title: title,
                  priority: priority,
                  link: link,
                  x: x,
                  y: y,
                  source: source
              }
          );
    };

}