import {observable} from "mobx";
import getData from '../resources/temp'
import {addGraphic} from "../components/Map";

export default class mapObjectStore {

    @observable
    store = [];

    addMapObject = (id, actionType, source, victims, injured, geoData, link, timestamp) => {
          this.store.push(
              {
                  id: id,
                  actionType: actionType,
                  source: source,
                  victims: victims,
                  injured: injured,
                  geoData: geoData,
                  link: link,
                  timestamp: timestamp
              }

          );
          addGraphic({
              id: id,
              actionType: actionType,
              source: source,
              victims: victims,
              injured: injured,
              geoData: geoData,
              link: link,
              timestamp: timestamp
          });
    };

    getFromJson = () => {
        JSON.parse(getData()).forEach(elem => {
            this.addMapObject(
                elem.id,
                elem.actionType,
                elem.source,
                elem.victims,
                elem.injured,
                elem.geoData,
                elem.link,
                elem.timestamp
            )
        });
    }

}