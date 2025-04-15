(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[8358],{509:(e,r,t)=>{Promise.resolve().then(t.bind(t,9811))},9811:(e,r,t)=>{"use strict";t.r(r),t.d(r,{default:()=>x});var s=t(5155),a=t(2115),l=t(6874),i=t.n(l),d=t(3438),n=t(6881);function o(){let[e,r]=(0,a.useState)("dark"),[t,l]=(0,a.useState)("default"),[i,d]=(0,a.useState)(!1);(0,a.useEffect)(()=>{let e=localStorage.getItem("theme"),t=localStorage.getItem("colorTheme");e?r(e):r(window.matchMedia("(prefers-color-scheme: dark)").matches?"dark":"light"),t&&l(t)},[]),(0,a.useEffect)(()=>{let r=document.documentElement;"dark"===e?r.classList.add("dark"):r.classList.remove("dark"),r.classList.remove("theme-blue","theme-green","theme-purple","theme-orange"),"default"!==t&&r.classList.add("theme-".concat(t)),localStorage.setItem("theme",e),localStorage.setItem("colorTheme",t)},[e,t]);let n=e=>{l(e),d(!1)};return(0,s.jsx)("div",{className:"relative",children:(0,s.jsxs)("div",{className:"flex gap-2",children:[(0,s.jsx)("button",{onClick:()=>{r("light"===e?"dark":"light")},className:"flex items-center justify-center p-2 rounded-full bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors","aria-label":"dark"===e?"Switch to light mode":"Switch to dark mode",children:"dark"===e?(0,s.jsxs)("svg",{xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round",className:"w-5 h-5",children:[(0,s.jsx)("circle",{cx:"12",cy:"12",r:"5"}),(0,s.jsx)("line",{x1:"12",y1:"1",x2:"12",y2:"3"}),(0,s.jsx)("line",{x1:"12",y1:"21",x2:"12",y2:"23"}),(0,s.jsx)("line",{x1:"4.22",y1:"4.22",x2:"5.64",y2:"5.64"}),(0,s.jsx)("line",{x1:"18.36",y1:"18.36",x2:"19.78",y2:"19.78"}),(0,s.jsx)("line",{x1:"1",y1:"12",x2:"3",y2:"12"}),(0,s.jsx)("line",{x1:"21",y1:"12",x2:"23",y2:"12"}),(0,s.jsx)("line",{x1:"4.22",y1:"19.78",x2:"5.64",y2:"18.36"}),(0,s.jsx)("line",{x1:"18.36",y1:"5.64",x2:"19.78",y2:"4.22"})]}):(0,s.jsx)("svg",{xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round",className:"w-5 h-5",children:(0,s.jsx)("path",{d:"M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"})})}),(0,s.jsxs)("div",{className:"relative",children:[(0,s.jsx)("button",{onClick:()=>d(!i),className:"flex items-center justify-center p-2 rounded-full bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors","aria-label":"Change color theme",children:(0,s.jsxs)("svg",{xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round",className:"w-5 h-5",children:[(0,s.jsx)("circle",{cx:"12",cy:"12",r:"10"}),(0,s.jsx)("path",{d:"M16 12a4 4 0 1 1 -8 0"}),(0,s.jsx)("path",{d:"M12 16a4 4 0 1 1 0 -8"}),(0,s.jsx)("path",{d:"M12 8a4 4 0 1 1 0 8"})]})}),i&&(0,s.jsx)("div",{className:"absolute right-0 mt-2 w-40 bg-white dark:bg-gray-800 rounded-md shadow-lg py-1 z-10 border border-gray-200 dark:border-gray-700 animate-fade-in-up",children:(0,s.jsx)("ul",{children:[{id:"default",name:"Default",color:"#0070f3"},{id:"blue",name:"Blue",color:"#2563eb"},{id:"green",name:"Green",color:"#10b981"},{id:"purple",name:"Purple",color:"#8b5cf6"},{id:"orange",name:"Orange",color:"#f97316"}].map(e=>(0,s.jsx)("li",{children:(0,s.jsxs)("button",{onClick:()=>n(e.id),className:"flex items-center w-full px-4 py-2 text-sm hover:bg-gray-100 dark:hover:bg-gray-700 ".concat(t===e.id?"text-primary font-medium":"text-gray-700 dark:text-gray-200"),children:[(0,s.jsx)("span",{className:"w-3 h-3 rounded-full mr-2",style:{backgroundColor:e.color}}),e.name,t===e.id&&(0,s.jsx)("svg",{className:"w-4 h-4 ml-auto",fill:"none",stroke:"currentColor",viewBox:"0 0 24 24",children:(0,s.jsx)("path",{strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"2",d:"M5 13l4 4L19 7"})})]})},e.id))})})]})]})})}var c=t(849);let x=(0,d.PA)(()=>{var e,r,t,l,d,x,m;let h=(0,n.$)(),[g,u]=(0,a.useState)(""),[p,y]=(0,a.useState)(!1),[f,j]=(0,a.useState)(null),[w,v]=(0,a.useState)("");(0,a.useEffect)(()=>{let e=new URLSearchParams(window.location.search).get("id");e&&(u(e),setTimeout(()=>{let r=h.generatedQuotes.find(r=>r.id===e);r?j(r):v("No quote found with ID: ".concat(e)),y(!0)},100))},[h.generatedQuotes]);let[k,b]=(0,a.useState)(0),N=e=>{b(e)},D=f?(e=>{if(!e)return null;let r=new Date(e.createdAt),t=Math.floor((new Date().getTime()-r.getTime())/864e5),s=k>0?k:Math.min(100,20*t),a="Processing",l="bg-blue-600";s>=100?(a="Delivered",l="bg-green-600"):s>=80?(a="Out for Delivery",l="bg-indigo-600"):s>=60?(a="In Transit",l="bg-purple-600"):s>=40?(a="Packed",l="bg-yellow-600"):s>=20&&(a="Preparing",l="bg-orange-600");let i=new Date(r);return i.setDate(i.getDate()+5),{status:a,statusColor:l,progress:s,expectedDelivery:i.toLocaleDateString(),days:t}})(f):null,[C,M]=(0,a.useState)(!1);return(0,s.jsxs)("div",{className:"container mx-auto px-4 py-8 relative",children:[(0,s.jsx)("div",{className:"mb-8",children:(0,s.jsxs)("div",{className:"flex justify-between items-center mb-4",children:[(0,s.jsxs)("div",{children:[(0,s.jsx)("h1",{className:"text-3xl font-bold mb-2",children:"Order Tracking"}),(0,s.jsx)("p",{className:"text-gray-600 dark:text-gray-400",children:"Track the status of your material orders and quotes"})]}),(0,s.jsx)(o,{})]})}),p&&f&&(0,s.jsxs)("div",{className:"fixed bottom-6 right-6 z-50",children:[(0,s.jsx)("button",{onClick:()=>{M(!C)},className:"h-14 w-14 rounded-full bg-primary shadow-lg text-white flex items-center justify-center hover:bg-primary/90 transition-all focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary",children:C?(0,s.jsx)("svg",{xmlns:"http://www.w3.org/2000/svg",className:"h-6 w-6",fill:"none",viewBox:"0 0 24 24",stroke:"currentColor",children:(0,s.jsx)("path",{strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:2,d:"M6 18L18 6M6 6l12 12"})}):(0,s.jsx)("svg",{xmlns:"http://www.w3.org/2000/svg",className:"h-6 w-6",fill:"none",viewBox:"0 0 24 24",stroke:"currentColor",children:(0,s.jsx)("path",{strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:2,d:"M5 12h.01M12 12h.01M19 12h.01M6 12a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0z"})})}),C&&(0,s.jsx)("div",{className:"absolute bottom-16 right-0 mb-2 bg-white dark:bg-gray-800 rounded-lg shadow-xl overflow-hidden border border-gray-200 dark:border-gray-700 w-48",children:(0,s.jsxs)("div",{className:"p-2",children:[(0,s.jsxs)("button",{onClick:()=>{alert("Email sent with order details!"),M(!1)},className:"flex items-center w-full text-left px-3 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-md",children:[(0,s.jsx)("svg",{xmlns:"http://www.w3.org/2000/svg",className:"h-4 w-4 mr-2",fill:"none",viewBox:"0 0 24 24",stroke:"currentColor",children:(0,s.jsx)("path",{strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:2,d:"M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"})}),"Email Order Details"]}),(0,s.jsxs)("button",{onClick:()=>{alert("Order details PDF downloaded!"),M(!1)},className:"flex items-center w-full text-left px-3 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-md",children:[(0,s.jsx)("svg",{xmlns:"http://www.w3.org/2000/svg",className:"h-4 w-4 mr-2",fill:"none",viewBox:"0 0 24 24",stroke:"currentColor",children:(0,s.jsx)("path",{strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:2,d:"M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"})}),"Download PDF"]}),(0,s.jsxs)("button",{onClick:()=>{alert("Text message with order details has been sent!"),M(!1)},className:"flex items-center w-full text-left px-3 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-md",children:[(0,s.jsx)("svg",{xmlns:"http://www.w3.org/2000/svg",className:"h-4 w-4 mr-2",fill:"none",viewBox:"0 0 24 24",stroke:"currentColor",children:(0,s.jsx)("path",{strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:2,d:"M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z"})}),"Send to Mobile"]}),(0,s.jsxs)("button",{onClick:()=>{alert("Order copied to clipboard!"),M(!1)},className:"flex items-center w-full text-left px-3 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-md",children:[(0,s.jsx)("svg",{xmlns:"http://www.w3.org/2000/svg",className:"h-4 w-4 mr-2",fill:"none",viewBox:"0 0 24 24",stroke:"currentColor",children:(0,s.jsx)("path",{strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:2,d:"M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"})}),"Copy to Clipboard"]})]})})]}),(0,s.jsxs)("div",{className:"flex flex-col lg:flex-row gap-8",children:[(0,s.jsx)("div",{className:"flex-1",children:(0,s.jsxs)("div",{className:"p-8 bg-white dark:bg-gray-800 rounded-lg shadow-md transition-colors duration-200",children:[(0,s.jsxs)("div",{className:"mb-8",children:[(0,s.jsx)("h2",{className:"text-xl font-bold mb-4 text-gray-800 dark:text-white",children:"Track Your Order"}),(0,s.jsxs)("div",{className:"flex flex-col sm:flex-row gap-3",children:[(0,s.jsx)("input",{type:"text",className:"flex-1 px-4 py-2 border rounded-md focus:ring-2 focus:ring-primary focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:text-white",placeholder:"Enter your Quote ID (e.g., QR-123456)",value:g,onChange:e=>u(e.target.value)}),(0,s.jsx)("button",{onClick:()=>{if(!g.trim())return void v("Please enter a valid Quote ID");v(""),j(null);let e=h.generatedQuotes.find(e=>e.id===g);e?j(e):v("No quote found with ID: ".concat(g)),y(!0)},className:"px-6 py-2 bg-primary text-white rounded-md hover:bg-primary/90 transition-colors",children:"Track"})]}),w&&(0,s.jsx)("p",{className:"mt-2 text-red-600 dark:text-red-400",children:w})]}),p&&f&&D&&(0,s.jsxs)("div",{className:"border dark:border-gray-700 rounded-lg overflow-hidden",children:[(0,s.jsxs)("div",{className:"bg-gray-50 dark:bg-gray-700 border-b dark:border-gray-600 px-6 py-4",children:[(0,s.jsxs)("div",{className:"flex flex-col md:flex-row md:items-center justify-between",children:[(0,s.jsxs)("div",{children:[(0,s.jsxs)("h3",{className:"text-lg font-medium text-gray-800 dark:text-white",children:["Order: ",(0,s.jsx)("span",{className:"font-mono",children:f.id})]}),(0,s.jsxs)("p",{className:"text-sm text-gray-500 dark:text-gray-400",children:["Created: ",new Date(f.createdAt).toLocaleDateString()]}),(null==(e=f.project)?void 0:e.projectType)&&(0,s.jsxs)("p",{className:"text-sm text-gray-500 dark:text-gray-400",children:["Project Type: ",f.project.projectType]})]}),(0,s.jsx)("div",{className:"mt-2 md:mt-0 flex flex-col md:flex-row md:items-center gap-2",children:(0,s.jsx)("span",{className:"inline-block px-3 py-1 rounded-full text-white text-sm ".concat(D.statusColor),children:D.status})})]}),(0,s.jsxs)("div",{className:"flex flex-wrap gap-2 mt-4",children:[(0,s.jsxs)("button",{onClick:()=>alert("Email sent with order details!"),className:"inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md shadow-sm text-white bg-primary hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary",children:[(0,s.jsx)("svg",{xmlns:"http://www.w3.org/2000/svg",className:"h-4 w-4 mr-1",fill:"none",viewBox:"0 0 24 24",stroke:"currentColor",children:(0,s.jsx)("path",{strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:2,d:"M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"})}),"Send to Email"]}),(0,s.jsxs)("button",{onClick:()=>alert("Order details PDF downloaded!"),className:"inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md shadow-sm text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500",children:[(0,s.jsx)("svg",{xmlns:"http://www.w3.org/2000/svg",className:"h-4 w-4 mr-1",fill:"none",viewBox:"0 0 24 24",stroke:"currentColor",children:(0,s.jsx)("path",{strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:2,d:"M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"})}),"Download PDF"]}),(0,s.jsxs)("button",{onClick:()=>alert("Text message with order details has been sent!"),className:"inline-flex items-center px-3 py-2 border border-gray-300 text-sm leading-4 font-medium rounded-md shadow-sm text-gray-700 dark:text-white bg-white dark:bg-gray-600 hover:bg-gray-50 dark:hover:bg-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary",children:[(0,s.jsx)("svg",{xmlns:"http://www.w3.org/2000/svg",className:"h-4 w-4 mr-1",fill:"none",viewBox:"0 0 24 24",stroke:"currentColor",children:(0,s.jsx)("path",{strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:2,d:"M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z"})}),"Send to Mobile"]})]})]}),(0,s.jsxs)("div",{className:"p-6",children:[(0,s.jsxs)("div",{className:"mb-6",children:[(0,s.jsx)("div",{className:"w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2.5",children:(0,s.jsx)("div",{className:"h-2.5 rounded-full ".concat(D.statusColor),style:{width:"".concat(D.progress,"%")}})}),(0,s.jsxs)("div",{className:"flex justify-between text-xs text-gray-500 dark:text-gray-400 mt-2",children:[(0,s.jsx)("span",{className:"Processing"===D.status?"".concat(D.statusColor," px-1 rounded-full text-white font-medium"):"",children:"Processing"}),(0,s.jsx)("span",{className:"Preparing"===D.status?"".concat(D.statusColor," px-1 rounded-full text-white font-medium"):"",children:"Preparing"}),(0,s.jsx)("span",{className:"Packed"===D.status?"".concat(D.statusColor," px-1 rounded-full text-white font-medium"):"",children:"Packed"}),(0,s.jsx)("span",{className:"In Transit"===D.status?"".concat(D.statusColor," px-1 rounded-full text-white font-medium"):"",children:"In Transit"}),(0,s.jsx)("span",{className:"Out for Delivery"===D.status?"".concat(D.statusColor," px-1 rounded-full text-white font-medium"):"",children:"Out for Delivery"}),(0,s.jsx)("span",{className:"Delivered"===D.status?"".concat(D.statusColor," px-1 rounded-full text-white font-medium"):"",children:"Delivered"})]})]}),(0,s.jsxs)("div",{className:"border dark:border-gray-700 rounded-lg p-4 mb-6 bg-gray-50 dark:bg-gray-800",children:[(0,s.jsx)("h4",{className:"font-medium text-gray-800 dark:text-white mb-3",children:"Demo Controls"}),(0,s.jsx)("p",{className:"text-xs text-gray-500 dark:text-gray-400 mb-3",children:"For demonstration purposes, use these buttons to simulate the order's progress:"}),(0,s.jsxs)("div",{className:"flex flex-wrap gap-2",children:[(0,s.jsx)("button",{onClick:()=>N(0),className:"px-2 py-1 text-xs rounded ".concat(D.progress<20?"bg-blue-600 text-white":"bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300"),children:"Processing"}),(0,s.jsx)("button",{onClick:()=>N(20),className:"px-2 py-1 text-xs rounded ".concat(D.progress>=20&&D.progress<40?"bg-orange-600 text-white":"bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300"),children:"Preparing"}),(0,s.jsx)("button",{onClick:()=>N(40),className:"px-2 py-1 text-xs rounded ".concat(D.progress>=40&&D.progress<60?"bg-yellow-600 text-white":"bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300"),children:"Packed"}),(0,s.jsx)("button",{onClick:()=>N(60),className:"px-2 py-1 text-xs rounded ".concat(D.progress>=60&&D.progress<80?"bg-purple-600 text-white":"bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300"),children:"In Transit"}),(0,s.jsx)("button",{onClick:()=>N(80),className:"px-2 py-1 text-xs rounded ".concat(D.progress>=80&&D.progress<100?"bg-indigo-600 text-white":"bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300"),children:"Out for Delivery"}),(0,s.jsx)("button",{onClick:()=>N(100),className:"px-2 py-1 text-xs rounded ".concat(D.progress>=100?"bg-green-600 text-white":"bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300"),children:"Delivered"})]})]}),(0,s.jsxs)("div",{className:"grid grid-cols-1 md:grid-cols-2 gap-4 mb-6",children:[(0,s.jsxs)("div",{className:"bg-gray-50 dark:bg-gray-700 p-4 rounded-lg",children:[(0,s.jsx)("h4",{className:"font-medium text-gray-800 dark:text-white mb-2",children:"Delivery Information"}),(0,s.jsxs)("p",{className:"text-sm mb-1",children:[(0,s.jsx)("span",{className:"font-medium",children:"Destination:"})," ",(null==(t=f.deliveryInfo)||null==(r=t.location)?void 0:r.address)||"Not provided"]}),(0,s.jsxs)("p",{className:"text-sm mb-1",children:[(0,s.jsx)("span",{className:"font-medium",children:"Requested Date:"})," ",(null==(l=f.deliveryInfo)?void 0:l.preferredDate)||"Not specified"]}),(0,s.jsxs)("p",{className:"text-sm",children:[(0,s.jsx)("span",{className:"font-medium",children:"Expected Delivery:"})," ",D.expectedDelivery]})]}),(0,s.jsxs)("div",{className:"bg-gray-50 dark:bg-gray-700 p-4 rounded-lg",children:[(0,s.jsx)("h4",{className:"font-medium text-gray-800 dark:text-white mb-2",children:"Order Details"}),(0,s.jsxs)("p",{className:"text-sm mb-1",children:[(0,s.jsx)("span",{className:"font-medium",children:"Status:"})," ",D.status]}),(0,s.jsxs)("p",{className:"text-sm mb-1",children:[(0,s.jsx)("span",{className:"font-medium",children:"Total Materials:"})," ",(null==(d=f.materials)?void 0:d.length)||0," items"]}),f.costBreakdown&&(0,s.jsxs)(s.Fragment,{children:[f.costBreakdown.materialCosts&&f.costBreakdown.materialCosts.length>0&&(0,s.jsxs)("p",{className:"text-sm mb-1",children:[(0,s.jsx)("span",{className:"font-medium",children:"Materials Cost:"})," $",f.costBreakdown.materialCosts.reduce((e,r)=>e+r.totalCost,0).toLocaleString(void 0,{minimumFractionDigits:2,maximumFractionDigits:2})]}),(0,s.jsxs)("p",{className:"text-sm mb-1",children:[(0,s.jsx)("span",{className:"font-medium",children:"Transport Cost:"})," $",f.materials&&f.materials.length>1?"15,000.00":"5,250.00"]}),(0,s.jsxs)("p",{className:"text-sm mb-1",children:[(0,s.jsx)("span",{className:"font-medium",children:"Toll Fees:"})," $500.00"]}),(0,s.jsxs)("p",{className:"text-sm mb-1",children:[(0,s.jsx)("span",{className:"font-medium",children:"Additional Fees:"})," $250.00"]}),(0,s.jsxs)("p",{className:"text-sm font-medium text-lg mt-2",children:[(0,s.jsx)("span",{className:"font-medium",children:"Total:"})," $",(()=>{let e=f.costBreakdown.materialCosts?f.costBreakdown.materialCosts.reduce((e,r)=>e+r.totalCost,0):0;return(e+(f.materials&&f.materials.length>1?15e3:5250)+750).toLocaleString(void 0,{minimumFractionDigits:2,maximumFractionDigits:2})})()]})]})]})]}),f&&D&&D.progress>=60&&(0,s.jsxs)("div",{className:"mb-6 border dark:border-gray-700 rounded-lg p-4 bg-blue-50 dark:bg-blue-900/20",children:[(0,s.jsx)("h4",{className:"font-medium text-gray-800 dark:text-white mb-2",children:"Delivery Verification"}),(0,s.jsx)("p",{className:"text-sm text-gray-600 dark:text-gray-400 mb-3",children:"Share this Delivery Code with the truck driver upon delivery to verify receipt of materials."}),(0,s.jsxs)("div",{className:"space-y-3",children:[(0,s.jsx)("div",{className:"flex items-start",children:(0,s.jsxs)("div",{className:"bg-white dark:bg-gray-800 rounded-lg shadow-sm p-3 w-full",children:[(0,s.jsx)("div",{className:"font-medium text-gray-800 dark:text-white",children:(null==(m=f.plants)||null==(x=m[0])?void 0:x.name)||"Primary Materials Supplier"}),(0,s.jsx)("div",{className:"text-sm text-gray-600 dark:text-gray-300 mt-1",children:"Verify delivery by providing the Delivery Code to the driver when they arrive"}),(0,s.jsxs)("div",{className:"mt-2 flex items-center justify-between",children:[(0,s.jsxs)("div",{className:"text-sm text-gray-600 dark:text-gray-300",children:[(0,s.jsxs)("div",{children:[(0,s.jsx)("span",{className:"font-medium mr-1",children:"Vehicle:"})," Heavy-Duty Mixer Truck (DL-45-RT-7890)"]}),(0,s.jsxs)("div",{children:[(0,s.jsx)("span",{className:"font-medium mr-1",children:"Truck Number:"})," TRK-",Math.floor(1e3+9e3*Math.random())]}),(0,s.jsxs)("div",{children:[(0,s.jsx)("span",{className:"font-medium mr-1",children:"Driver:"})," John Morrison"]})]}),(0,s.jsxs)("div",{className:"font-mono text-lg font-bold text-primary",children:[(0,s.jsx)("span",{className:"block text-sm font-normal text-gray-600 dark:text-gray-400",children:"Delivery Code:"}),Math.floor(1e5+9e5*Math.random())]})]})]})}),f.materials&&f.materials.length>1&&(0,s.jsx)("div",{className:"flex items-start",children:(0,s.jsxs)("div",{className:"bg-white dark:bg-gray-800 rounded-lg shadow-sm p-3 w-full",children:[(0,s.jsx)("div",{className:"font-medium text-gray-800 dark:text-white",children:"Secondary Materials Delivery"}),(0,s.jsx)("div",{className:"text-sm text-gray-600 dark:text-gray-300 mt-1",children:"Verify delivery by providing the Delivery Code to the driver when they arrive"}),(0,s.jsxs)("div",{className:"mt-2 flex items-center justify-between",children:[(0,s.jsxs)("div",{className:"text-sm text-gray-600 dark:text-gray-300",children:[(0,s.jsxs)("div",{children:[(0,s.jsx)("span",{className:"font-medium mr-1",children:"Vehicle:"})," Flatbed Truck (DL-78-ST-2345)"]}),(0,s.jsxs)("div",{children:[(0,s.jsx)("span",{className:"font-medium mr-1",children:"Truck Number:"})," TRK-",Math.floor(1e3+9e3*Math.random())]}),(0,s.jsxs)("div",{children:[(0,s.jsx)("span",{className:"font-medium mr-1",children:"Driver:"})," Sarah Williams"]})]}),(0,s.jsxs)("div",{className:"font-mono text-lg font-bold text-primary",children:[(0,s.jsx)("span",{className:"block text-sm font-normal text-gray-600 dark:text-gray-400",children:"Delivery Code:"}),Math.floor(1e5+9e5*Math.random())]})]})]})})]})]}),(0,s.jsxs)("div",{className:"border-t dark:border-gray-700 pt-4",children:[(0,s.jsx)("h4",{className:"font-medium text-gray-800 dark:text-white mb-2",children:"Recent Activities"}),(0,s.jsxs)("div",{className:"space-y-3",children:[D.progress>=20&&(0,s.jsxs)("div",{className:"flex items-start",children:[(0,s.jsx)("div",{className:"h-10 w-10 rounded-full bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400 flex items-center justify-center mr-3",children:(0,s.jsx)("svg",{xmlns:"http://www.w3.org/2000/svg",className:"h-5 w-5",viewBox:"0 0 20 20",fill:"currentColor",children:(0,s.jsx)("path",{fillRule:"evenodd",d:"M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z",clipRule:"evenodd"})})}),(0,s.jsxs)("div",{children:[(0,s.jsx)("p",{className:"font-medium dark:text-white",children:"Order Confirmed"}),(0,s.jsx)("p",{className:"text-sm text-gray-500 dark:text-gray-400",children:new Date(f.createdAt).toLocaleDateString()})]})]}),D.progress>=40&&(0,s.jsxs)("div",{className:"flex items-start",children:[(0,s.jsx)("div",{className:"h-10 w-10 rounded-full bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 flex items-center justify-center mr-3",children:(0,s.jsxs)("svg",{xmlns:"http://www.w3.org/2000/svg",className:"h-5 w-5",viewBox:"0 0 20 20",fill:"currentColor",children:[(0,s.jsx)("path",{d:"M8 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM15 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0z"}),(0,s.jsx)("path",{d:"M3 4a1 1 0 00-1 1v10a1 1 0 001 1h1.05a2.5 2.5 0 014.9 0H10a1 1 0 001-1V5a1 1 0 00-1-1H3zM14 7h1a1 1 0 011 1v6.05A2.5 2.5 0 0115 17h-1.05a2.5 2.5 0 01-4.9 0H9V8a1 1 0 011-1h4z"})]})}),(0,s.jsxs)("div",{children:[(0,s.jsx)("p",{className:"font-medium dark:text-white",children:"Materials Prepared"}),(0,s.jsx)("p",{className:"text-sm text-gray-500 dark:text-gray-400",children:new Date(new Date(f.createdAt).getTime()+864e5).toLocaleDateString()})]})]}),D.progress>=60&&(0,s.jsxs)("div",{className:"flex items-start",children:[(0,s.jsx)("div",{className:"h-10 w-10 rounded-full bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400 flex items-center justify-center mr-3",children:(0,s.jsx)("svg",{xmlns:"http://www.w3.org/2000/svg",className:"h-5 w-5",viewBox:"0 0 20 20",fill:"currentColor",children:(0,s.jsx)("path",{fillRule:"evenodd",d:"M5 2a1 1 0 011 1v1h1a1 1 0 010 2H6v1a1 1 0 01-2 0V6H3a1 1 0 010-2h1V3a1 1 0 011-1zm0 10a1 1 0 011 1v1h1a1 1 0 110 2H6v1a1 1 0 11-2 0v-1H3a1 1 0 110-2h1v-1a1 1 0 011-1zM12 2a1 1 0 01.967.744L14.146 7.2 17.5 9.134a1 1 0 010 1.732l-3.354 1.935-1.18 4.455a1 1 0 01-1.933 0L9.854 12.8 6.5 10.866a1 1 0 010-1.732l3.354-1.935 1.18-4.455A1 1 0 0112 2z",clipRule:"evenodd"})})}),(0,s.jsxs)("div",{children:[(0,s.jsx)("p",{className:"font-medium dark:text-white",children:"Order Packed"}),(0,s.jsx)("p",{className:"text-sm text-gray-500 dark:text-gray-400",children:new Date(new Date(f.createdAt).getTime()+1728e5).toLocaleDateString()})]})]}),D.progress>=80&&(0,s.jsxs)("div",{className:"flex items-start",children:[(0,s.jsx)("div",{className:"h-10 w-10 rounded-full bg-indigo-100 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400 flex items-center justify-center mr-3",children:(0,s.jsxs)("svg",{xmlns:"http://www.w3.org/2000/svg",className:"h-5 w-5",viewBox:"0 0 20 20",fill:"currentColor",children:[(0,s.jsx)("path",{d:"M8 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM15 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0z"}),(0,s.jsx)("path",{d:"M3 4a1 1 0 00-1 1v10a1 1 0 001 1h1.05a2.5 2.5 0 014.9 0H10a1 1 0 001-1V5a1 1 0 00-1-1H3zM14 7h1a1 1 0 011 1v6.05A2.5 2.5 0 0115 17h-1.05a2.5 2.5 0 01-4.9 0H9V8a1 1 0 011-1h4z"})]})}),(0,s.jsxs)("div",{children:[(0,s.jsx)("p",{className:"font-medium dark:text-white",children:"Out For Delivery"}),(0,s.jsx)("p",{className:"text-sm text-gray-500 dark:text-gray-400",children:new Date(new Date(f.createdAt).getTime()+2592e5).toLocaleDateString()})]})]}),D.progress>=100&&(0,s.jsxs)("div",{className:"flex items-start",children:[(0,s.jsx)("div",{className:"h-10 w-10 rounded-full bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400 flex items-center justify-center mr-3",children:(0,s.jsx)("svg",{xmlns:"http://www.w3.org/2000/svg",className:"h-5 w-5",viewBox:"0 0 20 20",fill:"currentColor",children:(0,s.jsx)("path",{fillRule:"evenodd",d:"M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z",clipRule:"evenodd"})})}),(0,s.jsxs)("div",{children:[(0,s.jsx)("p",{className:"font-medium dark:text-white",children:"Delivered"}),(0,s.jsx)("p",{className:"text-sm text-gray-500 dark:text-gray-400",children:new Date(new Date(f.createdAt).getTime()+432e6).toLocaleDateString()})]})]})]})]})]})]}),p&&!f&&!w&&(0,s.jsxs)("div",{className:"text-center py-8",children:[(0,s.jsx)("div",{className:"w-16 h-16 bg-gray-100 dark:bg-gray-700 text-gray-400 dark:text-gray-500 rounded-full flex items-center justify-center mx-auto mb-4",children:(0,s.jsx)("svg",{xmlns:"http://www.w3.org/2000/svg",className:"h-8 w-8",fill:"none",viewBox:"0 0 24 24",stroke:"currentColor",children:(0,s.jsx)("path",{strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:2,d:"M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"})})}),(0,s.jsx)("h3",{className:"text-lg font-medium text-gray-900 dark:text-white mb-2",children:"No Results Found"}),(0,s.jsx)("p",{className:"text-gray-500 dark:text-gray-400 mb-4",children:"We couldn't find any order with the provided Quote ID."}),(0,s.jsx)("p",{className:"text-gray-500 dark:text-gray-400 text-sm",children:"Please check the ID and try again, or contact support if you need help."})]}),!p&&(0,s.jsxs)("div",{className:"mt-8 border-t dark:border-gray-700 pt-6",children:[(0,s.jsx)("h3",{className:"text-lg font-medium text-gray-800 dark:text-white mb-3",children:"How to Track Your Order"}),(0,s.jsxs)("ul",{className:"space-y-2",children:[(0,s.jsxs)("li",{className:"flex items-start",children:[(0,s.jsx)("span",{className:"h-6 w-6 rounded-full bg-primary/10 text-primary flex items-center justify-center mr-2 mt-0.5 flex-shrink-0",children:"1"}),(0,s.jsx)("p",{className:"text-gray-600 dark:text-gray-300",children:"Enter your Quote ID found in your order confirmation"})]}),(0,s.jsxs)("li",{className:"flex items-start",children:[(0,s.jsx)("span",{className:"h-6 w-6 rounded-full bg-primary/10 text-primary flex items-center justify-center mr-2 mt-0.5 flex-shrink-0",children:"2"}),(0,s.jsx)("p",{className:"text-gray-600 dark:text-gray-300",children:'Click the "Track" button to view your order status'})]}),(0,s.jsxs)("li",{className:"flex items-start",children:[(0,s.jsx)("span",{className:"h-6 w-6 rounded-full bg-primary/10 text-primary flex items-center justify-center mr-2 mt-0.5 flex-shrink-0",children:"3"}),(0,s.jsx)("p",{className:"text-gray-600 dark:text-gray-300",children:"Follow the progress of your order from processing to delivery"})]})]})]}),(0,s.jsx)("div",{className:"border-t dark:border-gray-700 mt-8 pt-6",children:(0,s.jsxs)(i(),{href:"/prototype-13",className:"text-primary hover:text-primary-dark transition-colors flex items-center",children:[(0,s.jsx)("svg",{xmlns:"http://www.w3.org/2000/svg",className:"h-5 w-5 mr-1",viewBox:"0 0 20 20",fill:"currentColor",children:(0,s.jsx)("path",{fillRule:"evenodd",d:"M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z",clipRule:"evenodd"})}),"Back to Quote Request"]})})]})}),f&&(0,s.jsx)("div",{className:"lg:w-96 w-full mt-8 lg:mt-0",children:(0,s.jsx)(c.A,{quoteRequest:f})})]})]})})}},e=>{var r=r=>e(e.s=r);e.O(0,[866,6874,3438,6881,849,8441,1684,7358],()=>r(509)),_N_E=e.O()}]);