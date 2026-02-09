import GeoJSON from 'ol/format/GeoJSON.js';
import { editableLayers } from './layer_config';
import { transform } from 'ol/proj';

const GEOSERVER_URL = import.meta.env.VITE_API_GEOSERVER_URL;
const GEOSERVER_WORKSPACE = import.meta.env.VITE_API_GEOSERVER_WORKSPACE;

const getLayerConfig = (layerName) => {
  return editableLayers.find(layer => layer.layerName === layerName);
}



const builWFSInsertXML = (feature, layer) => {
  console.log('feature to insert:', feature);
  const format = new GeoJSON();

  if (!layer.workspace) {
    throw new Error(`❌ Layer ${layer.layerName} chưa khai báo workspace`)
  }

  // ✅ CLONE FEATURE
  const clone = feature.clone();

  // ✅ TRANSFORM GEOMETRY 3857 → 4326
  clone.getGeometry().transform(
    'EPSG:3857',
    'EPSG:4326'
  );

  const geojson = format.writeFeatureObject(clone, {
    dataProjection: 'EPSG:4326'
  });

  const geom = geojson.geometry;
  const props = geojson.properties;

  const hiddenFields = ['id'];

  let propertyXML = '';

  for (const key in props) {
    if (
      !hiddenFields.includes(key) &&
      props[key] !== null &&
      props[key] !== undefined
    ) {
      propertyXML += `
        <thutri:${key}>${escapeXML(props[key])}</thutri:${key}>
      `;
    }
  }

  return `
<wfs:Transaction service="WFS" version="1.1.0"
  xmlns:wfs="http://www.opengis.net/wfs"
  xmlns:gml="http://www.opengis.net/gml"
  xmlns:thutri="http://thutri.org"
  xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
  xsi:schemaLocation="
    http://www.opengis.net/wfs
    http://schemas.opengis.net/wfs/1.1.0/wfs.xsd">

  <wfs:Insert>
    <thutri:${layer.layerName}>
      <thutri:geom>
        ${geometryToGML(geom)}
      </thutri:geom>
      ${propertyXML}
    </thutri:${layer.layerName}>
  </wfs:Insert>
</wfs:Transaction>
`;
};


const geometryToGML = (geometry) => {

  const toPosList = (coords) =>
    coords.map(c => `${c[0]} ${c[1]}`).join(' ');

  switch (geometry.type) {
    case 'Polygon': {
      const ring = toPosList(geometry.coordinates[0]);

      return `
<gml:MultiPolygon srsName="EPSG:4326">
  <gml:polygonMember>
    <gml:Polygon>
      <gml:exterior>
        <gml:LinearRing>
          <gml:posList>${ring}</gml:posList>
        </gml:LinearRing>
      </gml:exterior>
    </gml:Polygon>
  </gml:polygonMember>
</gml:MultiPolygon>`;
    }

    case 'MultiPolygon': {
      const members = geometry.coordinates.map(polygon => {
        const ring = toPosList(polygon[0]);
        return `
  <gml:polygonMember>
    <gml:Polygon>
      <gml:exterior>
        <gml:LinearRing>
          <gml:posList>${ring}</gml:posList>
        </gml:LinearRing>
      </gml:exterior>
    </gml:Polygon>
  </gml:polygonMember>`;
      }).join('');

      return `
<gml:MultiPolygon srsName="EPSG:4326">
${members}
</gml:MultiPolygon>`;
    }

    default:
      console.error('❌ Unsupported geometry type:', geometry.type);
      return '';
  }
};


const escapeXML = (value) => {
  return String(value)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
}

const sendWFSInsert = async (feature, layerName) => {
  const layerConfig = getLayerConfig(layerName);

  console.log('Layer config:', layerConfig);

  if (!layerConfig) {
    throw new Error('Layer config not found');
  }

  const xml = builWFSInsertXML(feature, layerConfig);

  console.log('Insert layer:', {
    layerName: layerConfig.layerName,
    workspace: layerConfig.workspace
  })

  console.log(feature.getGeometry())
  console.log(feature.getGeometry().getType())



  const response = await fetch(
    `${GEOSERVER_URL}/${layerConfig.workspace}/ows`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'text/xml',
        // nếu GeoServer có auth
        // 'Authorization': 'Basic ' + btoa('admin:geoserver')
      },
      body: xml
    }
  );

  const text = await response.text();

  if (!response.ok) {
    console.error('❌ WFS Insert failed:', text);
    throw new Error(text);
  }

  console.log('respone:', response)

  console.log('✅ Insert success:', text);
  return text;
};

const sendWFSDelete = async (feature, layerName) => {
  const featureId = feature.getId() || feature.get('id');

  console.log('Deleting feature with ID:', featureId);
  const layerConfig = getLayerConfig(layerName);

  if (!layerConfig) {
    throw new Error('Không tìm thấy layer config');
  }
  const xml = `
<wfs:Transaction service="WFS" version="1.1.0"
  xmlns:cdf="http://www.opengis.net/cite/data"
  xmlns:ogc="http://www.opengis.net/ogc"
  xmlns:wfs="http://www.opengis.net/wfs"
  xmlns:thutri="http://thutri.org">
  <wfs:Delete typeName="thutri:${layerConfig.layerName} || ''}">
    <ogc:Filter>
      <ogc:FeatureId fid="${featureId}"/>
    </ogc:Filter>
  </wfs:Delete>
</wfs:Transaction>
`;

  const res = await fetch(
    `${GEOSERVER_URL}/${layerConfig.workspace}/ows`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'text/xml',
      },
      body: xml
    }
  );

  if (!res) {
    throw new Error('WFS Delete failed');
  }

  const text = await res.text();
  console.log('✅ WFS Delete success:', text);
  return text;

}

const fetchWFSFeatures = async (workspace, layerName, {cqlFilter} = {}) => {
  const url = `${GEOSERVER_URL}/${workspace}/ows` +
    `?service=WFS` +
    `&version=1.1.0` +
    `&request=GetFeature` +
    `&typeName=${workspace}:${layerName}` +
    `&maxFeatures=5000` +
    `&sortBy=id ASC` +
    `&outputFormat=application/json`+
    `&propertyName=${encodeURIComponent(getLayerConfig(layerName)?.propertyName || '')}`+
    (cqlFilter ? `&CQL_FILTER=${encodeURIComponent(cqlFilter)}` : '');

  console.log('fetchWFSFeatures URL:', url)


  const res = await fetch(url)
  console.log('loadFeatureByFid response:', res.url)
  if (!res) throw new Error('Fetch WFS failed')
  return await res.json()
}

const loadFeatureByFid = async (layerName, fid) => {
  const url = `
  http://localhost:8080/geoserver/${GEOSERVER_WORKSPACE}/ows?
  service= WFS &
    version=1.1.0 &
      request=GetFeature &
        typeName=${GEOSERVER_WORKSPACE}:${layerName}&
        outputFormat=application/json&
        featureID=${fid}
            `.replace(/\s+/g, '')

  const res = await fetch(url)
  if (!res) throw new Error('Fetch WFS failed')
  return await res.json()
}

const builWFSUpdateXML = (feature, layer) => {
  const format = new GeoJSON()

  const featureId = feature.getId()
  if (!featureId) {
    throw new Error('không có id của feature để update')
  }

  const clone = feature.clone()
  clone.getGeometry().transform('EPSG:3857', 'EPSG:4326')

  const geojson = format.writeFeatureObject(clone, { dataProjection: 'EPSG:4326' })
  const geom = geojson.geometry
  const props = geojson.properties || {}

  const hiddenFields = ['id', 'geom', 'geometry']

  let propsXML = ''
  for (const key in props) {
    if (
      !hiddenFields.includes(key) &&
      props[key] !== null &&
      props[key] !== undefined
    ) {
      propsXML += `
        <wfs:Property>
          <wfs:Name>${key}</wfs:Name>
          <wfs:Value>${escapeXML(props[key])}</wfs:Value>
        </wfs:Property>
      `
    }
  }

  // geometry update
  const geomXML = `
    <wfs:Property>
      <wfs:Name>geom</wfs:Name>
      <wfs:Value>
        ${geometryToGML(geom)}
      </wfs:Value>
    </wfs:Property>
  `

  return `
<wfs:Transaction service="WFS" version="1.1.0"
  xmlns:wfs="http://www.opengis.net/wfs"
  xmlns:gml="http://www.opengis.net/gml"
  xmlns:ogc="http://www.opengis.net/ogc"
  xmlns:thutri="http://thutri.org"
  xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
  xsi:schemaLocation="
    http://www.opengis.net/wfs
    http://schemas.opengis.net/wfs/1.1.0/wfs.xsd">

  <wfs:Update typeName="thutri:${layer.layerName}">
    ${geomXML}
    ${propsXML}
    <ogc:Filter>
      <ogc:FeatureId fid="${featureId}"/>
    </ogc:Filter>
  </wfs:Update>
</wfs:Transaction>
`
}

const sendWFSUpdate = async (feature, layerName) => {
  const layerConfig = getLayerConfig(layerName)
  if (!layerConfig) throw new Error('Layer config not found')

  const xml = builWFSUpdateXML(feature, layerConfig)

  const response = await fetch(
    `${GEOSERVER_URL}/${layerConfig.workspace}/ows`,
    {
      method: 'POST',
      headers: { 'Content-Type': 'text/xml' },
      body: xml
    }
  )

  const text = await response.text()

  if (!response.ok) {
    throw new Error(text)
  }

  console.log(' Update thành công:', text)
  return text
}


export {
  builWFSInsertXML,
  sendWFSInsert,
  fetchWFSFeatures,
  sendWFSDelete,
  loadFeatureByFid,
  builWFSUpdateXML,
  sendWFSUpdate
};