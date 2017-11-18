/* global document, Reveal */
import R from 'ramda';
import $ from 'jquery';

import './dev';

$(document).on(
  'keypress',
  R.cond([
    [
      R.propEq('keyCode', 109),
      () => {
        /* toc page */
        Reveal.slide(1);
      },
    ],
  ]),
);
