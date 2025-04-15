(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[9798],{2430:(e,t,s)=>{"use strict";s.r(t),s.d(t,{default:()=>o});var r=s(5155),a=s(2115),l=s(5695),i=s(7123),d=s(4101),n=s(3642);function c(e){let{onSelect:t,onMultiSelect:s,onClose:l,currentPlantId:i,selectedPlantIds:n=[],multiSelect:c=!1}=e,[o,m]=(0,a.useState)(""),[x,u]=(0,a.useState)(d.Py),[g,h]=(0,a.useState)("all"),[p,y]=(0,a.useState)(n.map(e=>d.Py.find(t=>t.id===e)).filter(Boolean)),b=["all",...Array.from(new Set(d.Py.map(e=>{let t=e.location.split(", ");return t[t.length-1]}))).sort()];(0,a.useEffect)(()=>{let e=[...d.Py];if("all"!==g&&(e=e.filter(e=>{let t=e.location.split(", ");return t[t.length-1]===g})),o){let t=o.toLowerCase();e=e.filter(e=>e.name.toLowerCase().includes(t)||e.location.toLowerCase().includes(t)||e.specialCapabilities&&e.specialCapabilities.some(e=>e.toLowerCase().includes(t)))}e.sort((e,t)=>e.distance-t.distance),u(e)},[o,g]);let j=e=>{p.some(t=>t.id===e.id)?y(p.filter(t=>t.id!==e.id)):y([...p,e])},f=e=>c?p.some(t=>t.id===e):i===e;return(0,r.jsx)("div",{className:"fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4",children:(0,r.jsxs)("div",{className:"bg-white dark:bg-gray-800 rounded-lg shadow-xl w-full max-w-4xl max-h-[90vh] flex flex-col",children:[(0,r.jsxs)("div",{className:"p-4 border-b border-gray-200 dark:border-gray-700 flex justify-between items-center",children:[(0,r.jsxs)("h2",{className:"text-xl font-semibold",children:[c?"Select Multiple Plants":"Select Plant",c&&p.length>0&&(0,r.jsxs)("span",{className:"ml-2 text-sm font-normal text-gray-500 dark:text-gray-400",children:["(",p.length," selected)"]})]}),(0,r.jsx)("button",{onClick:l,className:"text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200",children:(0,r.jsx)("svg",{xmlns:"http://www.w3.org/2000/svg",className:"h-6 w-6",fill:"none",viewBox:"0 0 24 24",stroke:"currentColor",children:(0,r.jsx)("path",{strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:2,d:"M6 18L18 6M6 6l12 12"})})})]}),(0,r.jsxs)("div",{className:"p-4 border-b border-gray-200 dark:border-gray-700",children:[(0,r.jsxs)("div",{className:"grid grid-cols-1 md:grid-cols-2 gap-4",children:[(0,r.jsxs)("div",{children:[(0,r.jsx)("label",{htmlFor:"plantSearch",className:"block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1",children:"Search Plants"}),(0,r.jsx)("input",{id:"plantSearch",type:"text",value:o,onChange:e=>m(e.target.value),placeholder:"Search by name, location, or capability",className:"w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"})]}),(0,r.jsxs)("div",{children:[(0,r.jsx)("label",{htmlFor:"stateFilter",className:"block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1",children:"Filter by State"}),(0,r.jsx)("select",{id:"stateFilter",value:g,onChange:e=>h(e.target.value),className:"w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white",children:b.map(e=>(0,r.jsx)("option",{value:e,children:"all"===e?"All States":e},e))})]})]}),(0,r.jsxs)("div",{className:"mt-2 text-sm text-gray-500 dark:text-gray-400",children:["Showing ",x.length," of ",d.Py.length," plants"]})]}),(0,r.jsx)("div",{className:"flex-1 overflow-y-auto p-4",children:(0,r.jsxs)("div",{className:"grid grid-cols-1 md:grid-cols-2 gap-4",children:[x.map(e=>(0,r.jsx)("div",{onClick:()=>c?j(e):t(e),className:"p-4 border ".concat(f(e.id)?"border-primary bg-blue-50 dark:bg-blue-900/20":"border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800"," rounded-lg cursor-pointer hover:border-primary transition-colors"),children:(0,r.jsxs)("div",{className:"flex justify-between items-start",children:[(0,r.jsxs)("div",{children:[(0,r.jsx)("h4",{className:"font-medium",children:e.name}),(0,r.jsx)("p",{className:"text-gray-600 dark:text-gray-400 text-sm",children:e.location}),(0,r.jsxs)("div",{className:"mt-2 text-sm",children:[(0,r.jsxs)("div",{children:[(0,r.jsx)("span",{className:"text-gray-500 dark:text-gray-400",children:"Products:"}),(0,r.jsx)("span",{className:"ml-1 font-medium",children:e.availableProducts.length})]}),(0,r.jsxs)("div",{children:[(0,r.jsx)("span",{className:"text-gray-500 dark:text-gray-400",children:"Operating Hours:"}),(0,r.jsx)("span",{className:"ml-1 font-medium",children:e.operatingHours})]}),(0,r.jsxs)("div",{children:[(0,r.jsx)("span",{className:"text-gray-500 dark:text-gray-400",children:"Daily Capacity:"}),(0,r.jsxs)("span",{className:"ml-1 font-medium",children:[e.capacity," tons"]})]})]}),e.specialCapabilities&&e.specialCapabilities.length>0&&(0,r.jsxs)("div",{className:"mt-2 flex flex-wrap gap-1",children:[e.specialCapabilities.slice(0,2).map((e,t)=>(0,r.jsx)("span",{className:"bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200 text-xs px-2 py-0.5 rounded",children:e},t)),e.specialCapabilities.length>2&&(0,r.jsxs)("span",{className:"text-xs text-gray-500 dark:text-gray-400 self-end",children:["+",e.specialCapabilities.length-2," more"]})]})]}),(0,r.jsxs)("div",{className:"text-right",children:[(0,r.jsxs)("div",{className:"text-sm text-gray-500 dark:text-gray-400",children:[e.distance.toFixed(1)," miles"]}),e.certifications&&e.certifications.length>0&&(0,r.jsx)("div",{className:"mt-1",children:(0,r.jsxs)("span",{className:"bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200 text-xs px-2 py-0.5 rounded",children:[e.certifications.length," Certifications"]})})]})]})},e.id)),0===x.length&&(0,r.jsx)("div",{className:"col-span-2 p-8 text-center text-gray-500 dark:text-gray-400",children:"No plants found matching your criteria. Try adjusting your search or filters."})]})}),(0,r.jsxs)("div",{className:"p-4 border-t border-gray-200 dark:border-gray-700 flex justify-between",children:[(0,r.jsx)("button",{onClick:l,className:"px-4 py-2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors",children:"Cancel"}),c?(0,r.jsxs)("button",{onClick:()=>{s&&p.length>0&&s(p),l()},className:"px-4 py-2 bg-primary text-white rounded-lg hover:bg-blue-600 transition-colors",children:["Confirm Selection (",p.length,")"]}):(0,r.jsx)("button",{onClick:()=>{if(i){let e=d.Py.find(e=>e.id===i);e&&t(e)}l()},className:"px-4 py-2 bg-primary text-white rounded-lg hover:bg-blue-600 transition-colors",children:"Confirm Selection"})]})]})})}function o(){let e=(0,l.useRouter)(),{quoteRequest:t,updateQuoteRequest:s,setCurrentStep:o}=(0,i.o)(),[m,x]=(0,a.useState)(t.selectedPlantId||""),[u,g]=(0,a.useState)(t.selectedPlantIds||[]),[h,p]=(0,a.useState)(!1),[y,b]=(0,a.useState)(!1),[j,f]=(0,a.useState)(t.products||[]),[v,N]=(0,a.useState)("all"),[k,w]=(0,a.useState)(""),[C,S]=(0,a.useState)(null),[P,I]=(0,a.useState)("all"),[M,q]=(0,a.useState)({productId:"",quantity:0,specialInstructions:""}),[O,F]=(0,a.useState)(t.requestsSamples||!1),[L,A]=(0,a.useState)(t.requestsConsultation||!1),[Q,B]=(0,a.useState)(t.needsInstallation||!1),[z,T]=(0,a.useState)(!1),[D,U]=(0,a.useState)(""),[_,E]=(0,a.useState)("info"),[R,W]=(0,a.useState)({}),H=["all",...Array.from(new Set(d.zv.map(e=>e.category)))],Y=()=>{let e=m?(0,d.dF)(m):d.zv;if("all"!==v&&(e=e.filter(e=>e.category===v)),"base"===P?e=e.filter(e=>!(0,d.df)(e)):"composite"===P&&(e=e.filter(e=>(0,d.df)(e))),k)if(k.length>2){let t=(0,d.zh)(k);e=e.filter(e=>t.some(t=>t.id===e.id))}else{let t=k.toLowerCase();e=e.filter(e=>e.name.toLowerCase().includes(t)||e.description.toLowerCase().includes(t))}return e},Z=C?d.zv.find(e=>e.id===C):null,$=e=>j.some(t=>t.productId===e),J=(e,t)=>{let s=j[e].productId,r=(0,d.y9)(s);if(r&&t<r.minOrderQuantity){U("Minimum order quantity for ".concat(r.name," is ").concat(r.minOrderQuantity," ").concat(r.unitOfMeasure)),E("error"),T(!0);return}let a=[...j];a[e].quantity=t,f(a)},G=e=>{f(t=>t.filter((t,s)=>s!==e)),U("Product removed from your quote"),E("info"),T(!0)},K=()=>{let e={};return 0===j.length&&(e.products="Please select at least one product"),W(e),0===Object.keys(e).length},V=e=>e.toLocaleString("en-US",{style:"currency",currency:"USD"});return(0,r.jsxs)("div",{children:[(0,r.jsx)("h2",{className:"text-2xl font-bold mb-6",children:"Materials Selection"}),(0,r.jsx)("p",{className:"text-gray-600 dark:text-gray-300 mb-8",children:"Select the materials you need for your project. You can optionally select a specific plant if you have a preference."}),(0,r.jsxs)("form",{onSubmit:t=>{if(t.preventDefault(),!K()){U("Please fix the form errors before continuing"),E("error"),T(!0);return}let r=j.map(e=>({...e,productId:"string"==typeof e.productId?e.productId:"prod-".concat(String(e.productId).padStart(3,"0"))}));s({selectedPlantId:m||void 0,selectedPlantIds:u.length>0?u:void 0,products:r,requestsSamples:O,requestsConsultation:L,needsInstallation:Q}),o(4),e.push("/prototype-11/quote-request/delivery")},children:[(0,r.jsxs)("div",{className:"space-y-8",children:[(0,r.jsxs)("div",{children:[(0,r.jsx)("h3",{className:"text-lg font-medium mb-4",children:"Plant Selection (Optional)"}),(0,r.jsx)("p",{className:"text-sm text-gray-500 dark:text-gray-400 mb-4",children:"Selecting a plant will filter materials based on availability. Leave blank to see all available materials."}),(0,r.jsxs)("div",{className:"bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-4",children:[(0,r.jsxs)("div",{className:"flex justify-between items-center mb-4",children:[(0,r.jsxs)("div",{children:[(0,r.jsx)("h4",{className:"font-medium",children:"Selected Plants"}),(0,r.jsx)("p",{className:"text-sm text-gray-500 dark:text-gray-400",children:"From over 100 plants in our network"})]}),(0,r.jsxs)("div",{className:"flex space-x-2",children:[(0,r.jsx)("button",{type:"button",onClick:()=>{b(!1),p(!0)},className:"px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors text-sm font-medium",children:m?"Change Primary Plant":"Select Primary Plant"}),(0,r.jsx)("button",{type:"button",onClick:()=>{b(!0),p(!0)},className:"px-4 py-2 bg-gray-100 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors text-sm font-medium",children:u.length>0?"Manage Multiple Plants (".concat(u.length,")"):"Select Multiple Plants"})]})]}),m?(()=>{let e=d.Py.find(e=>e.id===m);return e?(0,r.jsx)("div",{className:"border border-primary bg-blue-50 dark:bg-blue-900/20 rounded-lg p-4",children:(0,r.jsxs)("div",{className:"flex justify-between items-start",children:[(0,r.jsxs)("div",{children:[(0,r.jsx)("h5",{className:"font-medium text-primary",children:e.name}),(0,r.jsx)("p",{className:"text-gray-600 dark:text-gray-400 text-sm",children:e.location}),(0,r.jsxs)("div",{className:"mt-3 grid grid-cols-2 gap-2 text-sm",children:[(0,r.jsxs)("div",{children:[(0,r.jsx)("span",{className:"text-gray-500 dark:text-gray-400",children:"Materials: "}),(0,r.jsx)("span",{className:"font-medium",children:e.availableProducts.length})]}),(0,r.jsxs)("div",{children:[(0,r.jsx)("span",{className:"text-gray-500 dark:text-gray-400",children:"Distance: "}),(0,r.jsxs)("span",{className:"font-medium",children:[e.distance.toFixed(1)," miles"]})]}),(0,r.jsxs)("div",{children:[(0,r.jsx)("span",{className:"text-gray-500 dark:text-gray-400",children:"Hours: "}),(0,r.jsx)("span",{className:"font-medium",children:e.operatingHours})]}),(0,r.jsxs)("div",{children:[(0,r.jsx)("span",{className:"text-gray-500 dark:text-gray-400",children:"Capacity: "}),(0,r.jsxs)("span",{className:"font-medium",children:[e.capacity," tons/day"]})]})]}),e.specialCapabilities&&e.specialCapabilities.length>0&&(0,r.jsxs)("div",{className:"mt-3",children:[(0,r.jsx)("p",{className:"text-sm font-medium mb-1",children:"Special Capabilities:"}),(0,r.jsx)("div",{className:"flex flex-wrap gap-1",children:e.specialCapabilities.map((e,t)=>(0,r.jsx)("span",{className:"bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200 text-xs px-2 py-0.5 rounded",children:e},t))})]})]}),(0,r.jsxs)("div",{className:"flex flex-col items-end",children:[e.certifications&&e.certifications.length>0&&(0,r.jsx)("div",{className:"mb-2",children:e.certifications.map((e,t)=>(0,r.jsx)("div",{className:"bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200 text-xs px-2 py-0.5 rounded mt-1",children:e},t))}),(0,r.jsx)("button",{type:"button",onClick:()=>x(""),className:"text-red-500 hover:text-red-600 text-sm mt-2",children:"Clear Selection"})]})]})}):null})():(0,r.jsxs)("div",{className:"border border-dashed border-gray-300 dark:border-gray-600 rounded-lg p-6 text-center",children:[(0,r.jsx)("div",{className:"text-gray-500 dark:text-gray-400 mb-4",children:"No plant selected. Materials will be sourced from the most optimal plant based on availability and location."}),(0,r.jsx)("button",{type:"button",onClick:()=>p(!0),className:"px-4 py-2 bg-primary text-white rounded-lg hover:bg-blue-600 transition-colors text-sm",children:"Select a Plant"})]})]}),u.length>0&&(0,r.jsxs)("div",{className:"mt-4",children:[(0,r.jsxs)("h5",{className:"font-medium mb-3",children:["Additional Selected Plants (",u.length,")"]}),(0,r.jsx)("div",{className:"grid grid-cols-1 md:grid-cols-2 gap-3",children:u.map(e=>{let t=d.Py.find(t=>t.id===e);return t?(0,r.jsx)("div",{className:"border border-gray-200 dark:border-gray-700 rounded-lg p-3 bg-gray-50 dark:bg-gray-800/50",children:(0,r.jsxs)("div",{className:"flex justify-between items-start",children:[(0,r.jsxs)("div",{children:[(0,r.jsx)("h6",{className:"font-medium text-sm",children:t.name}),(0,r.jsx)("p",{className:"text-xs text-gray-500 dark:text-gray-400",children:t.location}),(0,r.jsxs)("p",{className:"text-xs mt-1",children:[(0,r.jsx)("span",{className:"text-gray-500 dark:text-gray-400",children:"Distance: "}),(0,r.jsxs)("span",{className:"font-medium",children:[t.distance.toFixed(1)," miles"]})]})]}),(0,r.jsx)("button",{type:"button",onClick:()=>g(u.filter(e=>e!==t.id)),className:"text-red-500 hover:text-red-600 text-xs",children:"Remove"})]})},t.id):null})})]}),h&&(0,r.jsx)(c,{onSelect:e=>{x(e.id),p(!1)},onMultiSelect:e=>{g(e.map(e=>e.id)),p(!1)},onClose:()=>p(!1),currentPlantId:m,selectedPlantIds:u,multiSelect:y})]}),(0,r.jsxs)("div",{children:[(0,r.jsx)("h3",{className:"text-lg font-medium mb-4",children:"Materials"}),R.products&&(0,r.jsx)("p",{className:"text-red-500 text-sm mb-2",children:R.products}),(0,r.jsxs)("div",{className:"grid grid-cols-1 md:grid-cols-3 gap-4 mb-6",children:[(0,r.jsxs)("div",{children:[(0,r.jsx)("label",{htmlFor:"productType",className:"block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1",children:"Product Type"}),(0,r.jsxs)("select",{id:"productType",value:P,onChange:e=>I(e.target.value),className:"w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white",children:[(0,r.jsx)("option",{value:"all",children:"All Products"}),(0,r.jsx)("option",{value:"base",children:"Standard Materials"}),(0,r.jsx)("option",{value:"composite",children:"Custom Mix Blends"})]})]}),(0,r.jsxs)("div",{children:[(0,r.jsx)("label",{htmlFor:"categoryFilter",className:"block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1",children:"Filter by Category"}),(0,r.jsx)("select",{id:"categoryFilter",value:v,onChange:e=>N(e.target.value),className:"w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white",children:H.map(e=>(0,r.jsx)("option",{value:e,children:"all"===e?"All Categories":e},e))})]}),(0,r.jsxs)("div",{children:[(0,r.jsx)("label",{htmlFor:"searchTerm",className:"block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1",children:"Search Materials"}),(0,r.jsx)("input",{id:"searchTerm",type:"text",value:k,onChange:e=>w(e.target.value),placeholder:"Search by name or description",className:"w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"})]})]}),"composite"===P&&(0,r.jsx)("div",{className:"bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg mb-4 text-sm",children:(0,r.jsxs)("div",{className:"flex items-start",children:[(0,r.jsx)("svg",{xmlns:"http://www.w3.org/2000/svg",className:"h-5 w-5 text-blue-500 mt-0.5 mr-2 flex-shrink-0",fill:"none",viewBox:"0 0 24 24",stroke:"currentColor",children:(0,r.jsx)("path",{strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:2,d:"M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"})}),(0,r.jsxs)("div",{children:[(0,r.jsx)("p",{className:"font-medium text-blue-800 dark:text-blue-200",children:"Custom Mix Blends"}),(0,r.jsx)("p",{className:"text-blue-700 dark:text-blue-300 mt-1",children:"These are custom-formulated mixtures of base materials optimized for specific applications. You can further customize the proportions when ordering."})]})]})}),"base"===P&&(0,r.jsx)("div",{className:"bg-green-50 dark:bg-green-900/20 p-4 rounded-lg mb-4 text-sm",children:(0,r.jsxs)("div",{className:"flex items-start",children:[(0,r.jsx)("svg",{xmlns:"http://www.w3.org/2000/svg",className:"h-5 w-5 text-green-500 mt-0.5 mr-2 flex-shrink-0",fill:"none",viewBox:"0 0 24 24",stroke:"currentColor",children:(0,r.jsx)("path",{strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:2,d:"M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"})}),(0,r.jsxs)("div",{children:[(0,r.jsx)("p",{className:"font-medium text-green-800 dark:text-green-200",children:"Standard Materials"}),(0,r.jsx)("p",{className:"text-green-700 dark:text-green-300 mt-1",children:"These are individual raw materials that can be ordered as-is. For custom blends or mixes, check out our Custom Mix Blends option."})]})]})}),(0,r.jsxs)("div",{className:"border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden",children:[(0,r.jsxs)("div",{className:"grid grid-cols-12 gap-4 p-4 bg-gray-100 dark:bg-gray-800 font-medium text-sm",children:[(0,r.jsx)("div",{className:"col-span-8 md:col-span-4",children:"Product"}),(0,r.jsx)("div",{className:"hidden md:block md:col-span-3",children:"Description"}),(0,r.jsx)("div",{className:"col-span-2",children:"Unit Price"}),(0,r.jsx)("div",{className:"col-span-2 md:col-span-1",children:"Min. Order"}),(0,r.jsx)("div",{className:"hidden md:block md:col-span-2",children:"Actions"})]}),(0,r.jsxs)("div",{className:"divide-y divide-gray-200 dark:divide-gray-700 max-h-80 overflow-y-auto",children:[Y().map(e=>(0,r.jsxs)("div",{className:"grid grid-cols-12 gap-4 p-4 hover:bg-gray-50 dark:hover:bg-gray-800/50",children:[(0,r.jsxs)("div",{className:"col-span-8 md:col-span-4",children:[(0,r.jsx)("div",{className:"font-medium",children:e.name}),(0,r.jsxs)("div",{className:"text-xs text-gray-500 dark:text-gray-400",children:[e.category," | ",e.unitOfMeasure]})]}),(0,r.jsx)("div",{className:"hidden md:block md:col-span-3 text-sm text-gray-600 dark:text-gray-300 line-clamp-2",children:e.description}),(0,r.jsxs)("div",{className:"col-span-2 text-sm",children:[V(e.basePrice),"/",e.unitOfMeasure]}),(0,r.jsxs)("div",{className:"col-span-2 md:col-span-1 text-sm",children:[e.minOrderQuantity," ",e.unitOfMeasure]}),(0,r.jsx)("div",{className:"hidden md:flex md:col-span-2 md:space-x-2",children:(0,r.jsx)("button",{type:"button",onClick:()=>{S(e.id),q({productId:e.id,quantity:e.minOrderQuantity,specialInstructions:""})},className:"text-primary hover:text-blue-600 text-sm",children:$(e.id)?"Already Added":"Add to Quote"})})]},e.id)),0===Y().length&&(0,r.jsx)("div",{className:"p-4 text-center text-gray-500 dark:text-gray-400",children:"No products found matching your criteria"})]})]}),C&&Z&&(0,r.jsxs)("div",{className:"mt-6 p-4 border border-gray-200 dark:border-gray-700 rounded-lg",children:[(0,r.jsxs)("div",{className:"flex justify-between items-start mb-4",children:[(0,r.jsxs)("div",{children:[(0,r.jsx)("h4",{className:"text-lg font-medium",children:Z.name}),(0,r.jsxs)("div",{className:"text-xs text-gray-500 dark:text-gray-400 mt-1",children:["Category: ",Z.category," | Unit: ",Z.unitOfMeasure," | Unit Price: ",V(Z.basePrice),"/",Z.unitOfMeasure]})]}),(0,d.df)(Z)&&(0,r.jsx)("span",{className:"bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200 text-xs px-2 py-1 rounded",children:"Custom Mix Blend"})]}),(0,r.jsx)("p",{className:"text-gray-600 dark:text-gray-300 mb-4",children:Z.description}),(0,d.df)(Z)&&(0,r.jsxs)("div",{className:"mb-4 bg-gray-50 dark:bg-gray-800 p-4 rounded-lg",children:[(0,r.jsx)("h5",{className:"font-medium mb-2 text-sm",children:"Blend Components"}),(0,r.jsx)("div",{className:"space-y-3",children:Z.components.map((e,t)=>{let s=(0,d.DJ)(e.baseProductId);return s?(0,r.jsxs)("div",{className:"flex items-center justify-between",children:[(0,r.jsxs)("div",{className:"flex-1",children:[(0,r.jsx)("div",{className:"font-medium text-sm",children:s.name}),(0,r.jsx)("div",{className:"text-xs text-gray-500 dark:text-gray-400",children:s.category})]}),(0,r.jsx)("div",{className:"flex-1 text-right",children:(0,r.jsxs)("div",{className:"text-sm",children:[e.proportion,"% of mix",e.isOptional&&(0,r.jsx)("span",{className:"ml-1 text-xs text-gray-500 dark:text-gray-400",children:"(Optional)"})]})})]},t):null})}),(0,r.jsx)("div",{className:"flex justify-end mt-3",children:(0,r.jsx)("button",{type:"button",className:"text-sm text-primary hover:text-blue-600",onClick:()=>{alert("In a complete implementation, this would open a modal to adjust component proportions.")},children:"Customize Mix Proportions"})})]}),!(0,d.df)(Z)&&Z.properties&&(0,r.jsxs)("div",{className:"mb-4 bg-gray-50 dark:bg-gray-800 p-4 rounded-lg",children:[(0,r.jsx)("h5",{className:"font-medium mb-2 text-sm",children:"Product Properties"}),(0,r.jsx)("div",{className:"grid grid-cols-2 gap-2 text-sm",children:Object.entries(Z.properties).map((e,t)=>{let[s,a]=e;return(0,r.jsxs)("div",{className:"flex justify-between",children:[(0,r.jsxs)("span",{className:"capitalize text-gray-600 dark:text-gray-400",children:[s.replace(/([A-Z])/g," $1").trim(),":"]}),(0,r.jsx)("span",{className:"font-medium",children:a.toString()})]},t)})})]}),(0,d.df)(Z)&&Z.mixProperties&&(0,r.jsxs)("div",{className:"mb-4 bg-gray-50 dark:bg-gray-800 p-4 rounded-lg",children:[(0,r.jsx)("h5",{className:"font-medium mb-2 text-sm",children:"Mix Properties"}),(0,r.jsx)("div",{className:"grid grid-cols-2 gap-2 text-sm",children:Object.entries(Z.mixProperties).map((e,t)=>{let[s,a]=e;return(0,r.jsxs)("div",{className:"flex justify-between",children:[(0,r.jsxs)("span",{className:"capitalize text-gray-600 dark:text-gray-400",children:[s.replace(/([A-Z])/g," $1").trim(),":"]}),(0,r.jsx)("span",{className:"font-medium",children:a.toString()})]},t)})})]}),(0,r.jsxs)("div",{className:"grid grid-cols-1 md:grid-cols-3 gap-4 mb-4",children:[(0,r.jsxs)("div",{children:[(0,r.jsxs)("label",{htmlFor:"productQuantity",className:"block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1",children:["Quantity (",Z.unitOfMeasure,")"]}),(0,r.jsx)("input",{id:"productQuantity",type:"number",min:Z.minOrderQuantity||1,value:M.quantity,onChange:e=>q({...M,quantity:Number(e.target.value)}),className:"w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"}),(0,r.jsxs)("p",{className:"mt-1 text-xs text-gray-500 dark:text-gray-400",children:["Minimum order: ",Z.minOrderQuantity," ",Z.unitOfMeasure]})]}),(0,r.jsxs)("div",{className:"md:col-span-2",children:[(0,r.jsx)("label",{htmlFor:"specialInstructions",className:"block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1",children:"Special Instructions (Optional)"}),(0,r.jsx)("textarea",{id:"specialInstructions",value:M.specialInstructions,onChange:e=>q({...M,specialInstructions:e.target.value}),rows:2,placeholder:"Any special requirements for this material?",className:"w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"})]})]}),(0,r.jsxs)("div",{className:"flex justify-end space-x-3",children:[(0,r.jsx)("button",{type:"button",onClick:()=>{S(null),q({productId:"",quantity:0,specialInstructions:""})},className:"px-4 py-2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors",children:"Cancel"}),(0,r.jsx)("button",{type:"button",onClick:()=>{let e;if(!M.productId||M.quantity<=0){U("Please select a product and specify a valid quantity"),E("error"),T(!0);return}if($(M.productId)){U("This product is already in your list. Edit it instead."),E("warning"),T(!0);return}let t=(0,d.y9)(M.productId);if(t&&M.quantity<t.minOrderQuantity){U("Minimum order quantity for ".concat(t.name," is ").concat(t.minOrderQuantity," ").concat(t.unitOfMeasure)),E("error"),T(!0);return}if(m)e=m;else if(u.length>0){let t=u.map(e=>d.Py.find(t=>t.id===e)).filter(Boolean).find(e=>e.availableProducts.includes(M.productId));t&&(e=t.id)}f(t=>[...t,{productId:M.productId,quantity:M.quantity,sourcePlantId:e,specialInstructions:M.specialInstructions||void 0}]),q({productId:"",quantity:0,specialInstructions:""}),S(null),U("Product added to your quote"),E("success"),T(!0)},className:"px-4 py-2 bg-primary text-white rounded-lg hover:bg-blue-600 transition-colors",children:"Add to Quote"})]})]}),j.length>0&&(0,r.jsxs)("div",{className:"mt-6",children:[(0,r.jsx)("h4",{className:"text-lg font-medium mb-4",children:"Selected Materials"}),(0,r.jsxs)("div",{className:"border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden",children:[(0,r.jsxs)("div",{className:"grid grid-cols-12 gap-4 p-4 bg-gray-100 dark:bg-gray-800 font-medium text-sm",children:[(0,r.jsx)("div",{className:"col-span-4",children:"Product"}),(0,r.jsx)("div",{className:"col-span-2",children:"Unit Price"}),(0,r.jsx)("div",{className:"col-span-2",children:"Quantity"}),(0,r.jsx)("div",{className:"col-span-2",children:"Total"}),(0,r.jsx)("div",{className:"col-span-2",children:"Actions"})]}),(0,r.jsx)("div",{className:"divide-y divide-gray-200 dark:divide-gray-700",children:j.map((e,t)=>{var s;let a=(0,d.y9)(e.productId);return a?(0,r.jsxs)("div",{className:"grid grid-cols-12 gap-4 p-4",children:[(0,r.jsxs)("div",{className:"col-span-4",children:[(0,r.jsx)("div",{className:"font-medium",children:a.name}),(0,r.jsxs)("div",{className:"text-xs text-gray-500 dark:text-gray-400",children:[a.category," | ",a.unitOfMeasure]}),e.sourcePlantId&&(0,r.jsxs)("div",{className:"text-xs text-blue-600 dark:text-blue-400 mt-1",children:[(0,r.jsx)("span",{className:"font-medium",children:"Source:"})," ",(null==(s=d.Py.find(t=>t.id===e.sourcePlantId))?void 0:s.name)||"Unknown Plant"]}),e.specialInstructions&&(0,r.jsxs)("div",{className:"text-xs text-gray-500 dark:text-gray-400 mt-1",children:[(0,r.jsx)("span",{className:"font-medium",children:"Note:"})," ",e.specialInstructions]})]}),(0,r.jsxs)("div",{className:"col-span-2 text-sm",children:[V(a.basePrice),"/",a.unitOfMeasure]}),(0,r.jsx)("div",{className:"col-span-2",children:(0,r.jsx)("input",{type:"number",min:a.minOrderQuantity,value:e.quantity,onChange:e=>J(t,Number(e.target.value)),className:"w-full px-2 py-1 border border-gray-300 dark:border-gray-600 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white text-sm"})}),(0,r.jsx)("div",{className:"col-span-2 text-sm font-medium",children:V(a.basePrice*e.quantity)}),(0,r.jsxs)("div",{className:"col-span-2 flex flex-col items-start space-y-1",children:[(0,r.jsx)("button",{type:"button",onClick:()=>G(t),className:"text-red-500 hover:text-red-600 text-sm",children:"Remove"}),(m||u.length>0)&&!e.sourcePlantId&&(0,r.jsx)("button",{type:"button",onClick:()=>{let e=[m,...u].filter(Boolean)[0];if(e){let s=[...j];s[t]={...s[t],sourcePlantId:e},f(s),U("Source plant assigned"),E("success"),T(!0)}},className:"text-blue-500 hover:text-blue-600 text-xs",children:"Assign Plant"})]})]},t):null})})]})]})]}),(0,r.jsxs)("div",{children:[(0,r.jsx)("h3",{className:"text-lg font-medium mb-4",children:"Additional Services"}),(0,r.jsxs)("div",{className:"space-y-3",children:[(0,r.jsxs)("div",{className:"flex items-center",children:[(0,r.jsx)("input",{id:"requestsSamples",type:"checkbox",checked:O,onChange:e=>F(e.target.checked),className:"h-5 w-5 text-primary focus:ring-blue-500 border-gray-300 rounded"}),(0,r.jsx)("label",{htmlFor:"requestsSamples",className:"ml-2 block text-sm text-gray-700 dark:text-gray-300",children:"Request material samples before final order"})]}),(0,r.jsxs)("div",{className:"flex items-center",children:[(0,r.jsx)("input",{id:"requestsConsultation",type:"checkbox",checked:L,onChange:e=>A(e.target.checked),className:"h-5 w-5 text-primary focus:ring-blue-500 border-gray-300 rounded"}),(0,r.jsx)("label",{htmlFor:"requestsConsultation",className:"ml-2 block text-sm text-gray-700 dark:text-gray-300",children:"Request consultation with a material specialist"})]}),(0,r.jsxs)("div",{className:"flex items-center",children:[(0,r.jsx)("input",{id:"needsInstallation",type:"checkbox",checked:Q,onChange:e=>B(e.target.checked),className:"h-5 w-5 text-primary focus:ring-blue-500 border-gray-300 rounded"}),(0,r.jsx)("label",{htmlFor:"needsInstallation",className:"ml-2 block text-sm text-gray-700 dark:text-gray-300",children:"Need installation or application services"})]})]})]})]}),(0,r.jsxs)("div",{className:"flex justify-between mt-8",children:[(0,r.jsxs)("button",{type:"button",onClick:()=>{o(2),e.push("/prototype-11/quote-request/sector-info")},className:"px-6 py-2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors flex items-center",children:[(0,r.jsx)("svg",{xmlns:"http://www.w3.org/2000/svg",className:"h-5 w-5 mr-2",fill:"none",viewBox:"0 0 24 24",stroke:"currentColor",children:(0,r.jsx)("path",{strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:2,d:"M15 19l-7-7 7-7"})}),"Back"]}),(0,r.jsxs)("button",{type:"submit",className:"bg-primary hover:bg-blue-600 text-white px-6 py-2 rounded-lg font-medium flex items-center",children:["Next: Delivery Information",(0,r.jsx)("svg",{xmlns:"http://www.w3.org/2000/svg",className:"h-5 w-5 ml-2",fill:"none",viewBox:"0 0 24 24",stroke:"currentColor",children:(0,r.jsx)("path",{strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:2,d:"M9 5l7 7-7 7"})})]})]})]}),z&&(0,r.jsx)(n.A,{message:D,type:_,onClose:()=>T(!1)})]})}},8647:(e,t,s)=>{Promise.resolve().then(s.bind(s,2430))}},e=>{var t=t=>e(e.s=t);e.O(0,[4658,8441,1684,7358],()=>t(8647)),_N_E=e.O()}]);