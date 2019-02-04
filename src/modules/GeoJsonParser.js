function parseGeoJSON(GeoJSON) {
    let GeoInfoObj = JSON.parse(GeoJSON);
    if(GeoInfoObj.type === 'Point') {
        GeoInfoObj.type = 'point';
        GeoInfoObj.longitude = GeoInfoObj.coordinates[0] + '';
        GeoInfoObj.latitude = GeoInfoObj.coordinates[1] + '';
        delete GeoInfoObj.coordinates;
        return GeoInfoObj;
    } else if(GeoInfoObj.type === 'LineString') {
        GeoInfoObj.type = 'polyline';
        GeoInfoObj.paths = GeoInfoObj.coordinates;
        delete GeoInfoObj.coordinates;
        return GeoInfoObj;
    } else if(GeoInfoObj.type === 'Polygon') {
        GeoInfoObj.type = 'polygon';
        GeoInfoObj.rings = GeoInfoObj.coordinates;
        delete GeoInfoObj.coordinates;
        return GeoInfoObj;
    } else if(GeoInfoObj.type === 'MultiPoint') {
        GeoInfoObj.type = 'multipoint';
        GeoInfoObj.points = GeoInfoObj.coordinates;
        delete GeoInfoObj.coordinates;
        return GeoInfoObj;
    }
}

export default parseGeoJSON;