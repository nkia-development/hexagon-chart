/*! For license information please see stories-Configure-mdx.34b960e4.iframe.bundle.js.LICENSE.txt */
(self.webpackChunkhexagon_chart=self.webpackChunkhexagon_chart||[]).push([[187],{"./node_modules/@mdx-js/react/lib/index.js":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{"use strict";__webpack_require__.d(__webpack_exports__,{R:()=>useMDXComponents,x:()=>MDXProvider});var react__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("./node_modules/react/index.js");const emptyComponents={},MDXContext=react__WEBPACK_IMPORTED_MODULE_0__.createContext(emptyComponents);function useMDXComponents(components){const contextComponents=react__WEBPACK_IMPORTED_MODULE_0__.useContext(MDXContext);return react__WEBPACK_IMPORTED_MODULE_0__.useMemo((function(){return"function"==typeof components?components(contextComponents):{...contextComponents,...components}}),[contextComponents,components])}function MDXProvider(properties){let allComponents;return allComponents=properties.disableParentContext?"function"==typeof properties.components?properties.components(emptyComponents):properties.components||emptyComponents:useMDXComponents(properties.components),react__WEBPACK_IMPORTED_MODULE_0__.createElement(MDXContext.Provider,{value:allComponents},properties.children)}},"./src/stories/Configure.mdx":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{"use strict";__webpack_require__.r(__webpack_exports__),__webpack_require__.d(__webpack_exports__,{default:()=>MDXContent});__webpack_require__("./node_modules/react/index.js");var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__("./node_modules/react/jsx-runtime.js"),_Users_jukangpark_Documents_nkia_hexagon_chart_node_modules_storybook_addon_docs_dist_shims_mdx_react_shim_mjs__WEBPACK_IMPORTED_MODULE_2__=__webpack_require__("./node_modules/@mdx-js/react/lib/index.js"),_storybook_blocks__WEBPACK_IMPORTED_MODULE_3__=__webpack_require__("./node_modules/@storybook/blocks/dist/index.mjs");function _createMdxContent(props){const _components={a:"a",code:"code",h1:"h1",h2:"h2",h3:"h3",img:"img",li:"li",p:"p",pre:"pre",strong:"strong",ul:"ul",...(0,_Users_jukangpark_Documents_nkia_hexagon_chart_node_modules_storybook_addon_docs_dist_shims_mdx_react_shim_mjs__WEBPACK_IMPORTED_MODULE_2__.R)(),...props.components};return(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsxs)(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.Fragment,{children:[(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_storybook_blocks__WEBPACK_IMPORTED_MODULE_3__.W8,{title:"README"}),"\n",(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsxs)("div",{className:"sb-container",children:[(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsxs)("div",{className:"sb-section-title",children:[(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_components.h1,{id:"welcom-to-hexagonchart-storybook",children:(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_components.strong,{children:"Welcom to HexagonChart Storybook"})}),(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_components.p,{children:"Because Storybook works separately from your app, you'll need to configure it for your specific stack and setup. Below, explore guides for configuring Storybook with popular frameworks and tools. If you get stuck, learn how you can ask for help from our community."})]}),(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_components.h1,{id:"hexagon-chart",children:"Hexagon-Chart"}),(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_components.p,{children:"Hexagon-Chart is a React component that renders data in a hexagon shape. It supports various options for representing data and is very easy to use."}),(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_components.h2,{id:"features",children:"Features"}),(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsxs)(_components.ul,{children:["\n",(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_components.li,{children:"Simple Integration: Easily integrate into any React project."}),"\n",(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_components.li,{children:"Customizable: Supports a wide range of customization options to fit your needs."}),"\n",(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_components.li,{children:"Responsive Design: Automatically adjusts to fit different screen sizes."}),"\n",(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_components.li,{children:"Interactive: Provides interactive features such as tooltips and hover effects."}),"\n",(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_components.li,{children:"Performance: Optimized for performance to handle large datasets efficiently."}),"\n"]}),(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_components.h2,{id:"installation",children:"Installation"}),(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_components.p,{children:"Install the package using npm or yarn:"}),(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_components.pre,{children:(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_components.code,{className:"language-bash",children:"npm install hexagon-chart\n"})}),(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_components.p,{children:"or"}),(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_components.pre,{children:(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_components.code,{className:"language-bash",children:"yarn add hexagon-chart\n"})}),(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_components.h2,{id:"examples",children:"Examples"}),(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_components.p,{children:"Live Playground"}),(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_components.p,{children:"For examples of Hexagon-Chart in action, visit https://nkia-development.github.io/hexagon-chart"}),(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_components.p,{children:"Or, run the demo storybook on your computer:"}),(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_components.pre,{children:(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_components.code,{className:"language-bash",children:"git clone https://github.com/nkia-development/hexagon-chart\nnpm install\nnpm run storybook\n"})}),(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_components.h3,{id:"hexagonchart",children:"HexagonChart"}),(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_components.p,{children:(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_components.img,{src:"image.png",alt:"alt text"})}),(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_components.pre,{children:(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_components.code,{className:"language-jsx",children:'import { HexagonChart } from "hexagon-chart";\n\nconst MyComponent = () => {\n  const data = [];\n  const option = {};\n\n  return <HexagonChart data={data} option={option} />;\n};\n'})}),(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_components.h3,{id:"piehexagonchart",children:"PieHexagonChart"}),(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_components.p,{children:(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_components.img,{src:"image-1.png",alt:"alt text"})}),(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_components.pre,{children:(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_components.code,{className:"language-jsx",children:'import { PieHexagonChart } from "hexagon-chart";\n\nconst MyComponent = () => {\n  const data = [];\n  const option = {};\n\n  return <PieHexagonChart data={data} option={option} />;\n};\n'})}),(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_components.h2,{id:"contributing",children:"Contributing"}),(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsxs)(_components.p,{children:["See ",(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_components.a,{href:"CONTRIBUTING.MD",children:"CONTRIBUTING"})," for details on submitting patches and the contribution workflow."]}),(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_components.h3,{id:"code-of-conduct",children:(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_components.a,{href:"https://github.com/nkia-development/hexagon-chart/blob/main/CODE_OF_CONDUCT.md",rel:"nofollow",children:"Code of Conduct"})}),(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_components.p,{children:"Nkia has adopted a Code of Conduct that we expect project participants to adhere to. Please read the full text so that you can understand what actions will and will not be tolerated."}),(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_components.h3,{id:"contributors",children:"Contributors"}),(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)("a",{href:"https://github.com/nkia-development/hexagon-chart/graphs/contributors",children:(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)("img",{src:"https://contrib.rocks/image?repo=nkia-development/hexagon-chart",alt:"contributors"})}),(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_components.h3,{id:"license",children:"License"}),(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsxs)(_components.p,{children:["Hexagon-chart is ",(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_components.a,{href:"./LICENSE",children:"MIT licensed"}),"."]})]}),"\n",(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)("style",{children:"\n  .sb-container {\n    margin-bottom: 48px;\n  }\n\n  .sb-section {\n    width: 100%;\n    display: flex;\n    flex-direction: row;\n    gap: 20px;\n  }\n\n  img {\n    object-fit: cover;\n  }\n\n  .sb-section-title {\n    margin-bottom: 32px;\n  }\n\n  .sb-section a:not(h1 a, h2 a, h3 a) {\n    font-size: 14px;\n  }\n\n  .sb-section-item, .sb-grid-item {\n    flex: 1;\n    display: flex;\n    flex-direction: column;\n  }\n\n  .sb-section-item-heading {\n    padding-top: 20px !important;\n    padding-bottom: 5px !important;\n    margin: 0 !important;\n  }\n  .sb-section-item-paragraph {\n    margin: 0;\n    padding-bottom: 10px;\n  }\n\n  .sb-chevron {\n    margin-left: 5px;\n  }\n\n  .sb-features-grid {\n    display: grid;\n    grid-template-columns: repeat(2, 1fr);\n    grid-gap: 32px 20px;\n  }\n\n  .sb-socials {\n    display: grid;\n    grid-template-columns: repeat(4, 1fr);\n  }\n\n  .sb-socials p {\n    margin-bottom: 10px;\n  }\n\n  .sb-explore-image {\n    max-height: 32px;\n    align-self: flex-start;\n  }\n\n  .sb-addon {\n    width: 100%;\n    display: flex;\n    align-items: center;\n    position: relative;\n    background-color: #EEF3F8;\n    border-radius: 5px;\n    border: 1px solid rgba(0, 0, 0, 0.05);\n    background: #EEF3F8;\n    height: 180px;\n    margin-bottom: 48px;\n    overflow: hidden;\n  }\n\n  .sb-addon-text {\n    padding-left: 48px;\n    max-width: 240px;\n  }\n\n  .sb-addon-text h4 {\n    padding-top: 0px;\n  }\n\n  .sb-addon-img {\n    position: absolute;\n    left: 345px;\n    top: 0;\n    height: 100%;\n    width: 200%;\n    overflow: hidden;\n  }\n\n  .sb-addon-img img {\n    width: 650px;\n    transform: rotate(-15deg);\n    margin-left: 40px;\n    margin-top: -72px;\n    box-shadow: 0 0 1px rgba(255, 255, 255, 0);\n    backface-visibility: hidden;\n  }\n\n  @media screen and (max-width: 800px) {\n    .sb-addon-img {\n      left: 300px;\n    }\n  }\n\n  @media screen and (max-width: 600px) {\n    .sb-section {\n      flex-direction: column;\n    }\n\n    .sb-features-grid {\n      grid-template-columns: repeat(1, 1fr);\n    }\n\n    .sb-socials {\n      grid-template-columns: repeat(2, 1fr);\n    }\n\n    .sb-addon {\n      height: 280px;\n      align-items: flex-start;\n      padding-top: 32px;\n      overflow: hidden;\n    }\n\n    .sb-addon-text {\n      padding-left: 24px;\n    }\n\n    .sb-addon-img {\n      right: 0;\n      left: 0;\n      top: 130px;\n      bottom: 0;\n      overflow: hidden;\n      height: auto;\n      width: 124%;\n    }\n\n    .sb-addon-img img {\n      width: 1200px;\n      transform: rotate(-12deg);\n      margin-left: 0;\n      margin-top: 48px;\n      margin-bottom: -40px;\n      margin-left: -24px;\n    }\n  }\n  "})]})}function MDXContent(props={}){const{wrapper:MDXLayout}={...(0,_Users_jukangpark_Documents_nkia_hexagon_chart_node_modules_storybook_addon_docs_dist_shims_mdx_react_shim_mjs__WEBPACK_IMPORTED_MODULE_2__.R)(),...props.components};return MDXLayout?(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(MDXLayout,{...props,children:(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_createMdxContent,{...props})}):_createMdxContent(props)}},"./node_modules/@storybook/core/dist/components sync recursive":module=>{function webpackEmptyContext(req){var e=new Error("Cannot find module '"+req+"'");throw e.code="MODULE_NOT_FOUND",e}webpackEmptyContext.keys=()=>[],webpackEmptyContext.resolve=webpackEmptyContext,webpackEmptyContext.id="./node_modules/@storybook/core/dist/components sync recursive",module.exports=webpackEmptyContext},"./node_modules/@storybook/core/dist/theming sync recursive":module=>{function webpackEmptyContext(req){var e=new Error("Cannot find module '"+req+"'");throw e.code="MODULE_NOT_FOUND",e}webpackEmptyContext.keys=()=>[],webpackEmptyContext.resolve=webpackEmptyContext,webpackEmptyContext.id="./node_modules/@storybook/core/dist/theming sync recursive",module.exports=webpackEmptyContext},"./node_modules/memoizerific sync recursive":module=>{function webpackEmptyContext(req){var e=new Error("Cannot find module '"+req+"'");throw e.code="MODULE_NOT_FOUND",e}webpackEmptyContext.keys=()=>[],webpackEmptyContext.resolve=webpackEmptyContext,webpackEmptyContext.id="./node_modules/memoizerific sync recursive",module.exports=webpackEmptyContext},"./node_modules/react/cjs/react-jsx-runtime.production.min.js":(__unused_webpack_module,exports,__webpack_require__)=>{"use strict";var f=__webpack_require__("./node_modules/react/index.js"),k=Symbol.for("react.element"),l=Symbol.for("react.fragment"),m=Object.prototype.hasOwnProperty,n=f.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactCurrentOwner,p={key:!0,ref:!0,__self:!0,__source:!0};function q(c,a,g){var b,d={},e=null,h=null;for(b in void 0!==g&&(e=""+g),void 0!==a.key&&(e=""+a.key),void 0!==a.ref&&(h=a.ref),a)m.call(a,b)&&!p.hasOwnProperty(b)&&(d[b]=a[b]);if(c&&c.defaultProps)for(b in a=c.defaultProps)void 0===d[b]&&(d[b]=a[b]);return{$$typeof:k,type:c,key:e,ref:h,props:d,_owner:n.current}}exports.Fragment=l,exports.jsx=q,exports.jsxs=q},"./node_modules/react/jsx-runtime.js":(module,__unused_webpack_exports,__webpack_require__)=>{"use strict";module.exports=__webpack_require__("./node_modules/react/cjs/react-jsx-runtime.production.min.js")}}]);