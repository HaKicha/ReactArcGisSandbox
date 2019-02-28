import {observable} from "mobx";
import getData from '../resources/temp'

export default class mapObjectStore {

    @observable
    store = [];

    globalStore = [];

    curExpression = null;

    addMapObject = (id, actionType, source, victims, geoData, link, timestamp) => {
        let obj = {
            id: id,
            actionType: actionType,
            source: source,
            victims: victims,
            geoData: geoData,
            link: link,
            timestamp: timestamp
        };
          this.globalStore.push(obj);
        if (this.test(obj)) {
            this.store.push(obj)}
            console.log(this.store.length);
        ;
    };

    getFromJson = () => {
        getData().then((response) => {
            return response.json();
        }).then(data => {
            data.forEach(elem => {
                this.globalStore.push(
                    {
                        id: elem.id,
                        actionType: elem.actionType,
                        source: elem.source,
                        victims: elem.victims,
                        geoData: elem.geoData,
                        link: elem.link,
                        timestamp: elem.timestamp
                    }
                )
            })
        }).then(() => {
            this.store = this.globalStore.slice();
        })

        return true;
    };

    test = (elem) => {
        if (!elem.actionType.includes(this.curExpression.eventType)) return false;
        if (!elem.source.includes(this.curExpression.sourceType)) return false;
        if ( this.curExpression.victims_min !== '')
            if (this.curExpression.victims_min-0 >= elem.victims) return false;
        if ( this.curExpression.victims_max !== '')
            if (this.curExpression.victims_max-0 <= elem.victims) return false;
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