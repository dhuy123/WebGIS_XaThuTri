
import TileLayer from 'ol/layer/Tile';
import TileWMS from 'ol/source/TileWMS';

const GEOSERVER_URL = import.meta.env.VITE_API_GEOSERVER_URL;
const GEOSERVER_WORKSPACE = import.meta.env.VITE_API_GEOSERVER_WORKSPACE;

const createWMSLayer = ({
    layerName,
    title,
    visible ,
    opacity,
}) => {
    // console.log('Creating WMS Layer:', layerName, title, visible, opacity);
    return new TileLayer({
        source : new TileWMS({
            url :`${GEOSERVER_URL}/${GEOSERVER_WORKSPACE}/wms`,
            params:{
                'LAYERS': `${GEOSERVER_WORKSPACE}:${layerName}`,
                'TILED': true,
                FORMAT: 'image/png',
            },
            serverType: 'geoserver',
            crossOrigin: 'anonymous',
        }),
        visible,
        layerName,
        title,
        opacity,
    });
};

export { createWMSLayer };

