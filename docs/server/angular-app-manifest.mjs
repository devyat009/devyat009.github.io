
export default {
  bootstrap: () => import('./main.server.mjs').then(m => m.default),
  inlineCriticalCss: true,
  baseHref: '/',
  locale: undefined,
  routes: [
  {
    "renderMode": 2,
    "preload": [
      "chunk-N4Q5H2LS.js"
    ],
    "route": "/"
  },
  {
    "renderMode": 2,
    "preload": [
      "chunk-3EDHIGA4.js"
    ],
    "route": "/projects"
  },
  {
    "renderMode": 2,
    "preload": [
      "chunk-QSIALFL4.js"
    ],
    "route": "/about"
  },
  {
    "renderMode": 2,
    "preload": [
      "chunk-J2MO56PK.js"
    ],
    "route": "/contact"
  },
  {
    "renderMode": 2,
    "preload": [
      "chunk-5QMMN4U3.js"
    ],
    "route": "/not-found"
  },
  {
    "renderMode": 2,
    "redirectTo": "/not-found",
    "route": "/**"
  }
],
  entryPointToBrowserMapping: undefined,
  assets: {
    'index.csr.html': {size: 32402, hash: 'c0af158b145fecec95ac8bd8b8e4b45a624b7b47c3b82c93efa3732010b39000', text: () => import('./assets-chunks/index_csr_html.mjs').then(m => m.default)},
    'index.server.html': {size: 17372, hash: '8df9e3e86341cbf6a0bd385692ba3dc3a86150740fbe93977a29c0ceda6e8ac6', text: () => import('./assets-chunks/index_server_html.mjs').then(m => m.default)},
    'about/index.html': {size: 74002, hash: 'dcae4b86883e9ae874f6e977296ca0ec9075ef2abe3c67d1e6fde7b8e762d87b', text: () => import('./assets-chunks/about_index_html.mjs').then(m => m.default)},
    'projects/index.html': {size: 92600, hash: 'afe9cbc17e3957fe7e9c7b9369b3da2a51796e12a801ce877143630af5b173a7', text: () => import('./assets-chunks/projects_index_html.mjs').then(m => m.default)},
    'not-found/index.html': {size: 90306, hash: 'cb27361f2953b63b8f0b1fdc31d96b44057e1262c0306863e10b30738d716d41', text: () => import('./assets-chunks/not-found_index_html.mjs').then(m => m.default)},
    'contact/index.html': {size: 74008, hash: '6d0a1f7a5151d3af9d831a42b9b2dbe89962f60fd08b1a1c15f712a30e836013', text: () => import('./assets-chunks/contact_index_html.mjs').then(m => m.default)},
    'index.html': {size: 88244, hash: 'e39a34d6e681b9214d4a389b82074bb7955c06925a8bc49b3677050f368fab39', text: () => import('./assets-chunks/index_html.mjs').then(m => m.default)},
    'styles-6DDQC354.css': {size: 47199, hash: 'p4/Reed96To', text: () => import('./assets-chunks/styles-6DDQC354_css.mjs').then(m => m.default)}
  },
};
