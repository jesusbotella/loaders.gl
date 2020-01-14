/* eslint-disable */

import test from 'tape-promise/tape';
import {MapboxVectorTileLoader} from '@loaders.gl/mapbox-vector-tile';
import {fetchFile, parseSync} from '@loaders.gl/core';

import decodedGeoJSON from '../results/decoded_mvt_lines.json';

const MVT_LINES_DATA_URL = '@loaders.gl/mapbox-vector-tile/test/data/lines_2-2-1.mvt';

test('Lines MVT', async t => {
  const response = await fetchFile(MVT_LINES_DATA_URL);
  const mvtArrayBuffer = await response.arrayBuffer();

  const loaderOptions = {
    mvt: {
      tileProperties: {
        x: 2,
        y: 1,
        z: 2
      }
    }
  };

  t.deepEqual(parseSync(mvtArrayBuffer, MapboxVectorTileLoader, loaderOptions), decodedGeoJSON);

  t.end();
});
