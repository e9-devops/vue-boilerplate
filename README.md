# vue boilerplate for multi module projects

> A full-featured Webpack setup with hot-reload, lint-on-save, commit verification & scss loader.

## Usage

This is a project template for [vue-cli](https://github.com/vuejs/vue-cli). **It is recommended to use npm 3+ for a more efficient dependency tree.**

It is recommended to install the global bridge to make vue cli 3 use the starter packs
``` bash
$ npm install -g @vue/cli-init
$ npm install -g vue-cli
$ vue init e9-devops/vue-boilerplate .
$ npm install
$ npm run serve
```

The development server will run on port 8080 by default. If that port is already in use on your machine, the next free port will be used.

You can alternatively add a .env file and add your desired port with PORT variable

```vue
PORT=5757
```

## What's Included

- `npm run dev`: first-in-class development experience.
  - Webpack + `vue-loader` for single file Vue components.
  - State preserving hot-reload
  - State preserving compilation error overlay
  - Lint-on-save with [ESLint](https://www.npmjs.com/package/@e9ine/eslint-config-vue)
  - Source maps
  - Commit verification with Yorkie
  - Auto lint-fix on commit with lint-staged

- `npm run build`: Production ready build.
  - JavaScript minified with [UglifyJS v3](https://github.com/mishoo/UglifyJS2/tree/harmony).
  - HTML minified with [html-minifier](https://github.com/kangax/html-minifier).
  - CSS across all components extracted into a single file and minified with [cssnano](https://github.com/ben-eb/cssnano).
  - Static assets compiled with version hashes for efficient long-term caching, and an auto-generated production `index.html` with proper URLs to these generated assets.
  - Use `npm run build --report`to build with bundle size analytics.
  
- `npm run lint`: To see linting errors

- `npm run lint-fix`: To fix linting errors
