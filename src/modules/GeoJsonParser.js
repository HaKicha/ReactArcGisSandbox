function geoJsonToEsriJson(GeoJSON) {
    let result = [];
    let GeoInfoObj = JSON.parse(GeoJSON);
    switch (GeoInfoObj.type) {
        case 'Point': {
            GeoInfoObj.type = 'point';
            GeoInfoObj.longitude = GeoInfoObj.coordinates[0];
            GeoInfoObj.latitude = GeoInfoObj.coordinates[1];
            delete GeoInfoObj.coordinates;
            result.push(GeoInfoObj);
            return result;
        }
        case 'LineString': {
            GeoInfoObj.type = 'polyline';
            GeoInfoObj.paths = GeoInfoObj.coordinates;
            delete GeoInfoObj.coordinates;
            result.push(GeoInfoObj);
            return result;
        }
        case 'Polygon': {
            GeoInfoObj.type = 'polygon';
            if (typeof (GeoInfoObj.coordinates[0][0]) !== 'undefined') {
                GeoInfoObj.rings = GeoInfoObj.coordinates[0].concat(GeoInfoObj.coordinates[1]);
                delete GeoInfoObj.coordinates;
                result.push(GeoInfoObj);
                return result;
            } else {
                GeoInfoObj.rings = GeoInfoObj.coordinates;
                delete GeoInfoObj.coordinates;
                result.push(GeoInfoObj);
                return result;
            }
        }
        case 'MultiPoint': {
            GeoInfoObj.type = 'point';
            let coordinates = GeoInfoObj.coordinates;
            delete GeoInfoObj.coordinates;
            coordinates.map((point) => {
                GeoInfoObj.longitude = point[0];
                GeoInfoObj.latitude = point[1];
                return GeoInfoObj;
            });
            return result;
        }
        case 'MultiPolygon': {
            GeoInfoObj.type = 'polygon';
            let coordinates = GeoInfoObj.coordinates;
            delete GeoInfoObj.coordinates;
            return coordinates.map((c) => {
                if (typeof (c[0][0]) !== 'undefined') {
                    return GeoInfoObj.rings = c[0].concat(c[1]);
                } else {
                    return GeoInfoObj.rings = c;
                }
            });
        }
        case 'MultiLineString': {
            GeoInfoObj.type = 'polyline';
            let coordinates = GeoInfoObj.coordinates;
            delete GeoInfoObj.coordinates;
            return coordinates.map((paths) => {
                return GeoInfoObj.paths = paths;
            })
        }
    }
    return [];
}


export default geoJsonToEsriJson;