import {observable} from "mobx";
import getData from '../resources/temp'

export default class mapObjectStore {

    @observable
    store = [];

    globalStore = [];

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
    };

    getFromJson = () => {
        JSON.parse(getData()).forEach(elem => {
            this.globalStore.push(
                {
                    id: elem.id,
                    actionType: elem.actionType,
                    source: elem.source,
                    victims: elem.victims,
                    injured: elem.injured,
                    geoData: elem.geoData,
                    link: elem.link,
                    timestamp: elem.timestamp
                }
            )
        });
    }

    test = (elem, expr) => {
        if (!elem.actionType.includes(expr.eventType)) return false;
        if (!elem.source.includes(expr.sourceType)) return false;
        if ( expr.victims_min !== '')
            if (expr.victims_min-0 >= elem.victims) return false;
        if ( expr.victims_max !== '')
            if (expr.victims_max-0 <= elem.victims) return false;
        if ( expr.injured_min !== '')
            if (expr.injured_min-0 >= elem.injured) return false;
        if ( expr.injured_max !== '')
            if (expr.injured_max-0 <= elem.injured) return false;
        if (expr.startDate !== '') {
            let date = new Date(elem.timestamp).valueOf();
            if (date > expr.endDate || date < expr.startDate) return false;
        }
        return true;
    };

    applyFilters = (expression) => {
        this.store = this.globalStore.filter((elem) => this.test(elem, expression));
    };

    clearFilters = () => {
          this.store = this.globalStore.slice();
    };
}