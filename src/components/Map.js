import {Component} from "react";
import {loadModules} from "esri-loader";
import React from "react";
import styled from 'styled-components'
import {observable} from 'mobx'
import {inject, observer} from "mobx-react";
import geoJsonToEsriJson from '../modules/GeoJsonParser';
import getSvgUrl from '../modules/SvgUrlStore';

const options = {
    url: 'https://js.arcgis.com/4.6/'
};
let reloadGraphic = () => {};
let goToPoint = () => {};

@inject('store')
@observer
class Map extends Component {

    mapObjectStore = this.props.store.store;

    constructor(props) {
        super(props);

        this.state = {
            status: 'loading',
            visiblePoints: false
        }

    }

    showGraphics = () => {
    };
    reloadGraphic = () => {
    };

    @observable
    mapInfo = {
        currentLat: 0,
        currentLon: 0,
        zoom: 7
    };

    componentWillReceiveProps(nextProps) {
        this.setState({visiblePoints: nextProps.isGraphicsVisible});
    }

    componentDidMount() {
        this.props.store.getFromJson();
        loadModules(['esri/Map',
            'esri/views/MapView',
            "esri/widgets/BasemapToggle",
            "esri/Graphic",
            "esri/core/Collection",
            "esri/geometry/Point",
            "esri/layers/FeatureLayer"], options)
            .then(([Map, MapView, BasemapToggle, Graphic, Collection, Point, FeatureLayer]) => {
                const map = new Map({basemap: "topo"});
                const view = new MapView({
                    container: "viewDiv",
                    map,
                    zoom: this.mapInfo.zoom,
                    center: [42.192, 35.357]
                });
                view.ui.move("zoom", "bottom-right");
                var toggle = new BasemapToggle({
                    view: view,
                    basemaps: "hybrid"
                });
                view.ui.add(toggle, "bottom-right");
                view.then(() => {
                    this.setState({
                        map,
                        view,
                        status: 'loaded'
                    });
                });

                //    ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

                var graphicBuffer = new Collection();

                this.showGraphics = () => {
                    if (this.state.visiblePoints) {
                        view.graphics.removeAll();
                        // this.setState({visiblePoints: false});
                    } else {
                        view.graphics.addMany(graphicBuffer)
                        // this.setState({visiblePoints: true})
                        console.log(graphicBuffer);
                    }
                };
                //    ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
                view.popup.autoOpenEnabled = false;
                view.on("click", (function (event) {
                    // Get the mapInfo of the click on the view
                    var lat = Math.round(event.mapPoint.latitude * 1000) / 1000;
                    var lon = Math.round(event.mapPoint.longitude * 1000) / 1000;

                    this.mapInfo.currentLat = lat;
                    this.mapInfo.currentLon = lon;
                }).bind(this));

                view.on("double-click", (function (event) {
                    event.stopPropagation();
                    var lat = Math.round(event.mapPoint.latitude * 1000) / 1000;
                    var lon = Math.round(event.mapPoint.longitude * 1000) / 1000;

                    this.mapInfo.currentLat = lat;
                    this.mapInfo.currentLon = lon;
                    view.popup.open({
                        title: "Position",
                        content: "Longitude: " + this.mapInfo.currentLon + "\nLatitude: " + this.mapInfo.currentLat,
                        location: event.mapPoint
                    });

                }).bind(this));

                //    ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

                view.watch("zoom", () => {
                    this.mapInfo.zoom = view.zoom.toFixed(2);
                });

                // ?***************************************************************************************************
                reloadGraphic = (() => {
                    graphicBuffer.removeAll();
                    let obj, marker, attributes, objGraphic;
                    this.mapObjectStore.forEach((elem) => {
                        obj = geoJsonToEsriJson(elem.geoData);
                        obj.forEach( (place) => {
                            attributes = {
                                id: elem.id,
                                actionType: elem.actionType,
                                source: elem.source,
                                victims: elem.victims,
                                injured: elem.injured,
                                timestamp: elem.timestamp
                            };
                            switch (place.type) {
                                case 'point': {
                                    let point = geoJsonToEsriJson(elem.geoData)[0];
                                    graphicBuffer.add(new Graphic({
                                        geometry: point,
                                        symbol:  {
                                            type: "picture-marker",
                                            url: getSvgUrl(elem.source),
                                            width: 40,
                                            height: 40
                                        },
                                        attributes: {
                                            id: elem.id,
                                            actionType: elem.actionType,
                                            source: elem.source,
                                            victims: elem.victims,
                                            injured: elem.injured,
                                            timestamp: (new Date(Date.parse(elem.timestamp)).toLocaleString() + '').replace(',','')
                                        },
                                        popupTemplate: {
                                            title: "Action",
                                            content: [{
                                                type: 'fields',
                                                fieldInfos: [{
                                                    fieldName: "id"
                                                }, {
                                                    fieldName: "actionType"
                                                }, {
                                                    fieldName: "source"
                                                }, {
                                                    fieldName: "victims"
                                                }, {
                                                    fieldName: "injured"
                                                }, {
                                                    fieldName: "timestamp"
                                                }]
                                            }]
                                        }
                                    }));
                                    break;
                                }
                                case 'polyline': {
                                    marker = {
                                        type: 'simple-line',
                                        color: [50, 50, 50],
                                        width: 3
                                    };
                                    objGraphic = new Graphic({
                                        geometry: place,
                                        symbol: marker
                                    });
                                    graphicBuffer.add(objGraphic);
                                    break;
                                }
                                case 'polygon': {
                                    marker = {
                                        type: "simple-fill", // autocasts as new SimpleFillSymbol()
                                        color: [50, 50, 50, 0.8],
                                        outline: { // autocasts as new SimpleLineSymbol()
                                            color: [255, 255, 255],
                                            width: 1
                                        }
                                    };
                                    objGraphic = new Graphic({
                                        geometry: obj,
                                        symbol: marker,
                                        attributes: attributes,
                                        popupTemplate: {
                                            title: "Action",
                                            content: [{
                                                type: 'fields',
                                                fieldInfos: [{
                                                    fieldName: "id"
                                                }, {
                                                    fieldName: "actionType"
                                                }, {
                                                    fieldName: "source"
                                                }, {
                                                    fieldName: "victims"
                                                }, {
                                                    fieldName: "injured"
                                                }, {
                                                    fieldName: "timestamp"
                                                }]
                                            }]
                                        }
                                    });
                                    graphicBuffer.add(objGraphic);
                                    break;
                                }
                            }
                        })
                        this.showGraphics()
                    });
                }).bind(this);
                //    *****************************************************************************************************

                goToPoint = ((lat, lon) => {
                    view.goTo({
                        center: [lon, lat],
                        zoom: 15
                    },{
                        duration: 3000
                    });
                }).bind(this);

                //    *****************************************************************************************************
            })

    }


    renderMap() {
        if (this.state.status === 'loading') {
            return <LoadingTitle><span>loading</span></LoadingTitle>;
        }
    }

    render() {
        this.showGraphics();
        return (
            <MapContainer>
                <div style={{height: '100%', width: '100%'}}>
                    <MapDiv id='viewDiv'>
                        {this.renderMap()}
                    </MapDiv>
                    <ControlPane>
                        <MapInfoView>
                            <p>Longitude: {this.mapInfo.currentLon}</p>
                            <p>Latitude: {this.mapInfo.currentLat}</p>
                            <p>Zoom: {this.mapInfo.zoom};</p>
                        </MapInfoView>
                    </ControlPane>
                </div>
            </MapContainer>
        )
    }
}

const MapContainer = styled.div`

`;

const MapDiv = styled.div`
    padding: 0;
    margin: 0;
    height: calc(100vh - 30px);
    width: 100%;
`;

const MapInfoView = styled.div`
    margin: 0px;
    p {
        color: #000;
        font-size: 14px;
        margin: 2px;
        font-weight: bold;
    }
`;

const LoadingTitle = styled.div`
    display: block;
    height: 700px;
    width: 100%;
    
    span {
        font-size: 100px;
        color: #46b2f8;
        margin-top: 200px;
        margin-left: calc(50vw - 160px);
        display: block;
    }
`;

const ControlPane = styled.div`
    position: absolute;
    right: 0;
    top: 50px;
    background: rgba(102,102,102,0.0);
`;

export {
    Map,
    goToPoint,
    reloadGraphic
};

