
export default {
  bootstrap: () => import('./main.server.mjs').then(m => m.default),
  inlineCriticalCss: true,
  baseHref: 'C:/Program Files/Git/',
  locale: undefined,
  routes: [
  {
    "renderMode": 2,
    "preload": [
      "chunk-MDW5RYHE.js"
    ],
    "route": "/Program%20Files/Git"
  },
  {
    "renderMode": 2,
    "preload": [
      "chunk-UFFUYNM6.js"
    ],
    "route": "/Program%20Files/Git/projects"
  },
  {
    "renderMode": 2,
    "preload": [
      "chunk-QSIALFL4.js"
    ],
    "route": "/Program%20Files/Git/about"
  },
  {
    "renderMode": 2,
    "preload": [
      "chunk-J2MO56PK.js"
    ],
    "route": "/Program%20Files/Git/contact"
  },
  {
    "renderMode": 2,
    "preload": [
      "chunk-2HAL2IRB.js"
    ],
    "route": "/Program%20Files/Git/not-found"
  },
  {
    "renderMode": 2,
    "redirectTo": "/Program%20Files/Git/not-found",
    "route": "/Program%20Files/Git/**"
  }
],
  entryPointToBrowserMapping: undefined,
  assets: {
    'index.csr.html': {size: 33651, hash: 'af18ffd7fa6fcb5bbf1e7875c612d36e340d03621616ffea7d1219dddf8cba80', text: () => import('./assets-chunks/index_csr_html.mjs').then(m => m.default)},
    'index.server.html': {size: 17397, hash: '2744b29c4f28041334d9ac5b90129010378cdd9835f5712895e224826dd17a18', text: () => import('./assets-chunks/index_server_html.mjs').then(m => m.default)},
    'styles-VB7NKBLG.css': {size: 50652, hash: 'Tp3iyolmdhQ', text: () => import('./assets-chunks/styles-VB7NKBLG_css.mjs').then(m => m.default)}
  },
};
