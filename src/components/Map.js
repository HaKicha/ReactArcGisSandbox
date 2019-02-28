import {Component} from "react";
import {loadModules} from "esri-loader";
import React from "react";
import styled from 'styled-components'
import {observable} from 'mobx'
import {inject, observer} from "mobx-react";
import geoJsonToEsriJson from '../modules/GeoJsonParser';

const options = {
    url: 'https://js.arcgis.com/4.10/'
};
let addGraphic = () => {};
let goToPoint = () => {};
let reloadGraphics = () => {};

@inject('store')
@observer
class Map extends Component {

    mapObjectStore = this.props.store;

    constructor(props) {
        super(props);

        this.state = {
            status: 'loading',
            clustersVisible: false
        }

    }

    showGraphics = () => {};
    toggleHeatMap = () => {};
    @observable
    mapInfo = {
        currentLat: 0,
        currentLon: 0,
        zoom: 7
    };

    componentWillReceiveProps(nextProps) {
        this.showGraphics(nextProps.isGraphicsVisible);
        this.toggleHeatMap(nextProps.isHeatmapVisible);
    }

    componentDidMount() {
        this.mapObjectStore.clearFilters();
        loadModules(['esri/Map',
            'esri/views/MapView',
            "esri/widgets/BasemapToggle",
            "esri/Graphic",
            "esri/core/Collection",
            "esri/layers/GraphicsLayer"], options)
            .then(([Map, MapView, BasemapToggle, Graphic, Collection, GraphicsLayer]) => {
                const map = new Map({basemap: "topo"});
                const view = new MapView({
                    container: "viewDiv",
                    map,
                    zoom: this.mapInfo.zoom,
                    center: [41.4366, 37.7203]
                });

                var toggle = new BasemapToggle({
                    view: view,
                    basemaps: "hybrid"
                });

                view.ui.add(toggle, "bottom-right");
                view.ui.move("zoom", "bottom-right");
                // view.then(() => {
                    this.setState({
                        map,
                        view,
                        status: 'loaded'
                    });
                // });

                let graphicsLayer = new GraphicsLayer();
                let clusterLayer = new GraphicsLayer()
                map.layers.add(graphicsLayer)
                //    ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++


                //***********************************************************************************************
                //*****************************************************************************************************

                var graphicBuffer = new Collection();

                this.showGraphics = (a=true) => {
                    if (a) {
                        map.layers.remove(graphicsLayer);
                    } else {
                        map.layers.add(graphicsLayer);
                    }
                };

                this.toggleHeatMap = (a) => {
                    if(a && !map.layers.includes(clusterLayer)) map.layers.add(clusterLayer);
                    if(!a) map.layers.remove(clusterLayer);
                };
                this.clearGraphics = () => {
                    graphicsLayer.graphics.removeAll();
                };
                reloadGraphics = (() => {
                    graphicsLayer.graphics.removeAll();
                    graphicBuffer.removeAll();
                    this.mapObjectStore.store.forEach(elem => {addGraphic(elem)});
                    graphicBuffer.sort((a,b) => {
                        return(a.geometry.type==='point')?1:-1;
                    });
                    graphicsLayer.graphics.addMany(graphicBuffer);
                }).bind(this);
                //    ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
                // view.popup.autoOpenEnabled = false;
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
                addGraphic = ((elem) => {
                    let obj, marker, attributes, objGraphic;
                    obj = geoJsonToEsriJson(elem.geoData);


                    obj.forEach( (place) => {
                            attributes = {
                                id: elem.id,
                                actionType: elem.actionType,
                                source: elem.source,
                                victims: elem.victims,
                                timestamp: elem.timestamp
                            };
                            switch (place.type) {
                                case 'point': {
                                    graphicBuffer.add(new Graphic({
                                        geometry: place,
                                        symbol:  {
                                            type: "simple-marker",  // autocasts as new SimpleMarkerSymbol()
                                            style: "circle",
                                            color: "#ea2600",
                                            size: "8px",  // pixels
                                            outline: {  // autocasts as new SimpleLineSymbol()
                                                color: [ 0, 0, 0 ],
                                                width: 1  // points
                                            }
                                        },
                                        attributes: {
                                            ID: elem.id,
                                            Action: elem.actionType,
                                            Source: elem.source,
                                            Victims: elem.victims,
                                            Status: elem.status,
                                            Name: elem.name,
                                            Time: (elem.timestamp)?(new Date(Date.parse(elem.timestamp)).toLocaleString() + '').replace(',',''):''
                                        },
                                        popupTemplate: {
                                            title: "Action",
                                            content: [{
                                                type: 'fields',
                                                fieldInfos: [{
                                                    fieldName: "ID"
                                                }, {
                                                    fieldName: "Action"
                                                }, {
                                                    fieldName: "Status"
                                                },{
                                                    fieldName: "Source"
                                                }, {
                                                    fieldName: "Victims"
                                                }, {
                                                    fieldName: "Name"
                                                }, {
                                                    fieldName: "Time"
                                                }]
                                            }]
                                        }
                                    }));
                                    break;
                                }
                                case 'polyline': {
                                    marker = {
                                        type: 'simple-line',
                                        color: [0, 0, 0],
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

                                    place.rings = place.rings.slice(0, place.rings.length - 1);

                                    if (elem.weight) {
                                        marker = {
                                            type: "simple-fill",
                                            color: [150, 50, 50, 0.4],
                                            outline: {
                                                color: [0, 0, 0],
                                                width: 1
                                            }
                                        };
                                        objGraphic = new Graphic({
                                            geometry: place,
                                            symbol: marker,
                                            attributes: {
                                                ID: elem.id,
                                                Weight: elem.weight
                                            },
                                            popupTemplate: {
                                                title: "Action",
                                                content: [{
                                                    type: 'fields',
                                                    fieldInfos: [{
                                                        fieldName: "ID"
                                                    }, {
                                                        fieldName: "Weight"
                                                    }]
                                                }]
                                            }
                                        });
                                        clusterLayer.graphics.add(objGraphic);
                                        break;
                                    }
                                    else {
                                        marker = {
                                            type: "simple-fill",
                                            color: [50, 50, 50, 0.4],
                                            outline: {
                                                color: [0, 0, 0],
                                                width: 1
                                            }
                                        };
                                        objGraphic = new Graphic({
                                            geometry: place,
                                            symbol: marker,
                                            attributes: {
                                                Action: elem.actionType,
                                                Source: elem.source,
                                                Victims: elem.victims,
                                                Status: elem.status,
                                                Name: elem.name,
                                                Time: (elem.timestamp) ? (new Date(Date.parse(elem.timestamp)).toLocaleString() + '').replace(',', '') : ''
                                            },
                                            popupTemplate: {
                                                title: "Action",
                                                content: [{
                                                    type: 'fields',
                                                    fieldInfos: [{
                                                        fieldName: "ID"
                                                    }, {
                                                        fieldName: "Action"
                                                    }, {
                                                        fieldName: "Status"
                                                    }, {
                                                        fieldName: "Source"
                                                    }, {
                                                        fieldName: "Victims"
                                                    }, {
                                                        fieldName: "Name"
                                                    }, {
                                                        fieldName: "Time"
                                                    }]
                                                }]
                                            }
                                        });
                                        graphicBuffer.add(objGraphic);
                                        break;
                                    }

                                }
                            }
                        });
                        this.showGraphics()
                }).bind(this);
                //    *****************************************************************************************************

                goToPoint = ((lat, lon) => {
                    view.goTo({
                        center: [lon, lat],
                        zoom: 13
                    },{
                        duration: 3000,
                        easing: 'ease-out'
                    });
                }).bind(this);


                //    *****************************************************************************************************
                   this.props.store.getFromJson();
                   this.clearGraphics();
                   this.mapObjectStore.globalStore.forEach(elem => addGraphic(elem));
                   this.mapObjectStore.clearFilters();
                   graphicsLayer.addMany(graphicBuffer);
                   this.showGraphics();

            })

    }


    render() {
        return (
            <MapContainer>
                <div style={{height: '100%', width: '100%'}}>
                    <MapDiv id='viewDiv'>
                        <LoadingTitle visible={this.state.status === 'loading'}><span>loading</span></LoadingTitle>
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
    height: calc(100vh - 50px);
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
    display: ${props => props.visible?'block':'none'};
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
    addGraphic,
    reloadGraphics
};

