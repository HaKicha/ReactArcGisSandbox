import {observable} from "mobx";
import getData from '../resources/temp'
import {parse as parseWKT} from 'wellknown'

export default class mapObjectStore {

    @observable
    store = [];

    globalStore = [];

    curExpression = null;


    getFromJson = () => {
        getData().forEach((cluster) => {
            cluster.mineActionInfos.forEach(elem => {
                this.globalStore.push(
                    {
                        id: elem.id,
                        actionType: elem.actionType,
                        source: elem.source,
                        victims: elem.victims,
                        geoData: parseWKT(elem.geoData),
                        status: elem.status,
                        timestamp: elem.timestamp,
                        name: elem.name
                    }
                );

            });

            this.globalStore.push(
                {
                    id: cluster.id,
                    actionType: '',
                    source: '',
                    victims: 0,
                    geoData: parseWKT(cluster.geoData),
                    status: '',
                    timestamp: '',
                    name: '',
                    weight: cluster.weight
                }
            );
        });
    this.store = this.globalStore.slice();
    };

    test = (elem) => {
        if (!elem.actionType.includes(this.curExpression.eventType)) return false;
        if (!elem.source.includes(this.curExpression.sourceType)) return false;
        if ( this.curExpression.victims_min !== '')
            if (this.curExpression.victims_min-0 > elem.victims) return false;
        if ( this.curExpression.victims_max !== '')
            if (this.curExpression.victims_max-0 < elem.victims) return false;
        if (this.curExpression.startDate !== '') {
            let date = new Date(elem.timestamp).valueOf();
            if (date > this.curExpression.endDate || date < this.curExpression.startDate) return false;
        }
        return true;
    };

    applyFilters = (expression) => {
        this.curExpression = expression;
        this.store = this.globalStore.filter((elem) => this.test(elem));
    };

    clearFilters = () => {
          this.store = this.globalStore.slice();
          this.curExpression = null;
    };
}