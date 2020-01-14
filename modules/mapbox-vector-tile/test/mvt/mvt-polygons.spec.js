/* eslint-disable */

import test from 'tape-promise/tape';
import {MapboxVectorTileLoader} from '@loaders.gl/mapbox-vector-tile';
import {fetchFile, parseSync} from '@loaders.gl/core';

import decodedGeoJSON from '../results/decoded_mvt_polygons.json';

const MVT_POLYGONS_DATA_URL = '@loaders.gl/mapbox-vector-tile/test/data/polygons_10-133-325.mvt';

test('Polygons MVT', async t => {
  const response = await fetchFile(MVT_POLYGONS_DATA_URL);
  const mvtArrayBuffer = await response.arrayBuffer();

  const loaderOptions = {
    mvt: {
      tileProperties: {
        x: 133,
        y: 325,
        z: 10
      }
    }
  };

  t.deepEqual(parseSync(mvtArrayBuffer, MapboxVectorTileLoader, loaderOptions), decodedGeoJSON);

  t.end();
});
