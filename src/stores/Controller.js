import {inject} from "mobx-react";
import geoJsonToEsriJson from '../modules/GeoJsonParser';


@inject('store')
export default class Controller {

    constructor(props) {
    }

    static mapObjStore = this.props.store;

    static parseData = (data) => {
        let cluster = {
            id: data.cluster_id,
            actionType: 'Cluster ' + data.cluster_id,
            source: '',
            victims: 0,
            geoData: geoJsonToEsriJson(data.geoData)[0],
            link: '',
            timestamp: ''
        };
        let buf = [];
        let victims = 0;
        data.objects.forEach(obj => {
            switch (obj.source) {
                case 'twitter': buf[0]++; break;
                case 'facebook': buf[1]++; break;
                case 'news': buf[2]++; break;
                case 'gichd': buf[3]++; break;
                case 'nato': buf[4]++; break;
            }
            if (typeof obj.victims+0 === 'number') victims += obj.victims;
            this.mapObjStore.addMapObject(obj.id, obj.actionType, obj.source, obj.victims, obj.geoData, obj.link, obj.timestamp);
        });
        cluster.victims = victims;
        let max = buf[0];
        cluster.source = 'twitter';
        if (max < buf[1]) {
            max  = buf[1];
            cluster.source = 'facebook';
        }
        if (max < buf[2]) {
            max  = buf[2];
            cluster.source = 'news';
        }
        if (max < buf[3]) {
            max  = buf[3];
            cluster.source = 'gichd';
        }
        if (max < buf[4]) cluster.source = 'nato';
        this.mapObjStore.push(cluster);
    };
}