/* eslint-disable */

import test from 'tape-promise/tape';
import {MapboxVectorTileLoader} from '@loaders.gl/mapbox-vector-tile';
import {fetchFile, parseSync} from '@loaders.gl/core';

import decodedGeoJSON from '../results/decoded_mvt_points.json';

const MVT_POINTS_DATA_URL = '@loaders.gl/mapbox-vector-tile/test/data/points_4-2-6.mvt';

test('Point MVT', async t => {
  const response = await fetchFile(MVT_POINTS_DATA_URL);
  const mvtArrayBuffer = await response.arrayBuffer();

  const loaderOptions = {
    mvt: {
      tileProperties: {
        x: 2,
        y: 6,
        z: 4
      }
    }
  };

  t.deepEqual(parseSync(mvtArrayBuffer, MapboxVectorTileLoader, loaderOptions), decodedGeoJSON);

  t.end();
});
