import {Component} from "react";
import {loadModules} from "esri-loader";
import React from "react";
import styled from 'styled-components'
import {observable} from 'mobx'
import {observer} from "mobx-react";
import parseGeoJSON from '../modules/GeoJsonParser';

const options = {
    url: 'https://js.arcgis.com/4.6/'
};



 @observer class Map extends Component {

    constructor(props) {
        super(props);

        this.state = {
            status: 'loading',
            visiblePoints: false
        },
        this.showGraphics = () => {}
    }

     @observable
     mapInfo = {
         currentLat: 0,
         currentLon: 0,
         zoom: 15
     };

    componentDidMount() {
        loadModules(['esri/Map',
            'esri/views/MapView',
            "esri/widgets/BasemapToggle"
            ,"esri/Graphic",
            "esri/core/Collection",
            "esri/geometry/Point"], options)
            .then(([Map, MapView,BasemapToggle,Graphic,Collection,Point]) => {
                const map = new Map({ basemap: "topo" });
                const view = new MapView({
                    container: "viewDiv",
                    map,
                    zoom: this.mapInfo.zoom,
                    center: [30.545,50.43]
                });
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

                let GeoJsonExample = '{"type": "Point", "coordinates": [30, 50]}';
                let GeoJsonExamplePolyline = '{\n' +
                    '    "type": "LineString", \n' +
                    '    "coordinates": [\n' +
                    '        [30, 50], [10, 30], [40, 40], [30,50]\n' +
                    '    ]\n' +
                    '}';

                let point = parseGeoJSON(GeoJsonExample);





                var markerSymbol = {
                    type: "simple-marker",
                    color: [250,120,50],
                    outline: {
                        color: [255,255,255],
                        width: 1
                    }
                };

                var lineAtt = {
                    Name: 'Border',
                    Owner: 'Kicha'
                };

                var pointGraphic = new Graphic({
                    geometry: point,
                    symbol: markerSymbol,
                    attributes: lineAtt,
                    popupTemplate: { // autocasts as new PopupTemplate()
                        title: "{Name}",
                        content: [{
                            type: "fields",
                            fieldInfos: [{
                                fieldName: "Name"
                            }, {
                                fieldName: "Owner"
                            }]
                        }]
                    }
                });

            //    ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++


                var graphicBuffer = new Collection();
                graphicBuffer.add(pointGraphic);
                point=parseGeoJSON('{"type": "Point", "coordinates": [10, 30]}');
                graphicBuffer.add(new Graphic({
                    geometry: point,
                    symbol: markerSymbol
                }));
                graphicBuffer.add(pointGraphic);
                point=parseGeoJSON('{"type": "Point", "coordinates": [40, 40]}');
                graphicBuffer.add(new Graphic({
                    geometry: point,
                    symbol: markerSymbol
                }));
                graphicBuffer.add(pointGraphic);



                var polyline  = parseGeoJSON(GeoJsonExamplePolyline);

                var lineSymbol = {
                    type: 'simple-line',
                    color: [250,120,50],
                    width: 3
                };

                var polylineGraphic = new Graphic({
                    geometry: polyline,
                    symbol: lineSymbol,
                    attributes: lineAtt,
                    popupTemplate: { // autocasts as new PopupTemplate()
                        title: "{Name}",
                        content: [{
                            type: "fields",
                            fieldInfos: [{
                                fieldName: "Name"
                            }, {
                                fieldName: "Owner"
                            }]
                        }]
                    }
                });

                graphicBuffer.add(polylineGraphic);

                this.showGraphics = () => {
                    if (this.state.visiblePoints) {
                        view.graphics.removeAll();
                        this.setState({visiblePoints: false});
                    }
                    else {
                        view.graphics.addMany(graphicBuffer)
                        this.setState({visiblePoints: true})
                    }
                };
            //    ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
                view.popup.autoOpenEnabled = false;
                view.on("click", (function(event) {
                    // Get the mapInfo of the click on the view
                    var lat = Math.round(event.mapPoint.latitude * 1000) / 1000;
                    var lon = Math.round(event.mapPoint.longitude * 1000) / 1000;

                    this.mapInfo.currentLat = lat;
                    this.mapInfo.currentLon = lon;
                }).bind(this));

                view.on("double-click", (function(event) {
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

                view.watch("zoom",() => {
                    this.mapInfo.zoom = view.zoom.toFixed(2);
                });

                this.someDo = () => {
                    view.goTo({
                        center: [30, 50],
                        zoom: 15
                    },{
                            duration: 1000,
                            easing: "ease-in-out"
                        });
                };

            })

    }



    renderMap() {
        if(this.state.status === 'loading') {
            return <LoadingTitle><span>loading</span></LoadingTitle>;
        }
    }

    render() {

        return(
            <MapContainer>
            <div style={{height: '100%', width: '100%'}}>
                <MapDiv id='viewDiv'  >
                    {this.renderMap()}
                </MapDiv>
                <ControlPane>
                    <button onClick={this.showGraphics}>Show</button>
                    <button onClick={this.someDo}>Some Do</button>
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
    width: '100%';
    div.esri-ui-top-left.esri-ui-corner {
        display: none;
    }
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
        color: #3ec944;
        margin-top: 200px;
        margin-left: calc(50vw - 160px);
        display: block;
    }
`;

const ControlPane = styled.div`
    position: absolute;
    right: 0;
    top: 50px;
    background: rgba(102,102,102,0.5);
`;

export default  Map;