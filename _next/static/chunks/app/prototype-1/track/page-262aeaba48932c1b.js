(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[4517],{187:(e,r,t)=>{"use strict";t.d(r,{default:()=>l});var s=t(5155),a=t(2115);function l(){let[e,r]=(0,a.useState)("dark"),[t,l]=(0,a.useState)("default"),[d,i]=(0,a.useState)(!1);(0,a.useEffect)(()=>{let e=localStorage.getItem("theme"),t=localStorage.getItem("colorTheme");e?r(e):r(window.matchMedia("(prefers-color-scheme: dark)").matches?"dark":"light"),t&&l(t)},[]),(0,a.useEffect)(()=>{let r=document.documentElement;"dark"===e?r.classList.add("dark"):r.classList.remove("dark"),r.classList.remove("theme-blue","theme-green","theme-purple","theme-orange"),"default"!==t&&r.classList.add("theme-".concat(t)),localStorage.setItem("theme",e),localStorage.setItem("colorTheme",t)},[e,t]);let n=e=>{l(e),i(!1)};return(0,s.jsx)("div",{className:"relative",children:(0,s.jsxs)("div",{className:"flex gap-2",children:[(0,s.jsx)("button",{onClick:()=>{r("light"===e?"dark":"light")},className:"flex items-center justify-center p-2 rounded-full bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors","aria-label":"dark"===e?"Switch to light mode":"Switch to dark mode",children:"dark"===e?(0,s.jsxs)("svg",{xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round",className:"w-5 h-5",children:[(0,s.jsx)("circle",{cx:"12",cy:"12",r:"5"}),(0,s.jsx)("line",{x1:"12",y1:"1",x2:"12",y2:"3"}),(0,s.jsx)("line",{x1:"12",y1:"21",x2:"12",y2:"23"}),(0,s.jsx)("line",{x1:"4.22",y1:"4.22",x2:"5.64",y2:"5.64"}),(0,s.jsx)("line",{x1:"18.36",y1:"18.36",x2:"19.78",y2:"19.78"}),(0,s.jsx)("line",{x1:"1",y1:"12",x2:"3",y2:"12"}),(0,s.jsx)("line",{x1:"21",y1:"12",x2:"23",y2:"12"}),(0,s.jsx)("line",{x1:"4.22",y1:"19.78",x2:"5.64",y2:"18.36"}),(0,s.jsx)("line",{x1:"18.36",y1:"5.64",x2:"19.78",y2:"4.22"})]}):(0,s.jsx)("svg",{xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round",className:"w-5 h-5",children:(0,s.jsx)("path",{d:"M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"})})}),(0,s.jsxs)("div",{className:"relative",children:[(0,s.jsx)("button",{onClick:()=>i(!d),className:"flex items-center justify-center p-2 rounded-full bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors","aria-label":"Change color theme",children:(0,s.jsxs)("svg",{xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round",className:"w-5 h-5",children:[(0,s.jsx)("circle",{cx:"12",cy:"12",r:"10"}),(0,s.jsx)("path",{d:"M16 12a4 4 0 1 1 -8 0"}),(0,s.jsx)("path",{d:"M12 16a4 4 0 1 1 0 -8"}),(0,s.jsx)("path",{d:"M12 8a4 4 0 1 1 0 8"})]})}),d&&(0,s.jsx)("div",{className:"absolute right-0 mt-2 w-40 bg-white dark:bg-gray-800 rounded-md shadow-lg py-1 z-10 border border-gray-200 dark:border-gray-700 animate-fade-in-up",children:(0,s.jsx)("ul",{children:[{id:"default",name:"Default",color:"#0070f3"},{id:"blue",name:"Blue",color:"#2563eb"},{id:"green",name:"Green",color:"#10b981"},{id:"purple",name:"Purple",color:"#8b5cf6"},{id:"orange",name:"Orange",color:"#f97316"}].map(e=>(0,s.jsx)("li",{children:(0,s.jsxs)("button",{onClick:()=>n(e.id),className:"flex items-center w-full px-4 py-2 text-sm hover:bg-gray-100 dark:hover:bg-gray-700 ".concat(t===e.id?"text-primary font-medium":"text-gray-700 dark:text-gray-200"),children:[(0,s.jsx)("span",{className:"w-3 h-3 rounded-full mr-2",style:{backgroundColor:e.color}}),e.name,t===e.id&&(0,s.jsx)("svg",{className:"w-4 h-4 ml-auto",fill:"none",stroke:"currentColor",viewBox:"0 0 24 24",children:(0,s.jsx)("path",{strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"2",d:"M5 13l4 4L19 7"})})]})},e.id))})})]})]})})}},3595:(e,r,t)=>{"use strict";t.r(r),t.d(r,{default:()=>n});var s=t(5155),a=t(2115),l=t(6874),d=t.n(l),i=t(187);function n(){let[e,r]=(0,a.useState)({orderNumber:"ORD-2025-04-10-001",quoteNumber:"QT-2025-04-10-001",status:"In Transit",placedDate:"April 10, 2025",estimatedDelivery:"May 20, 2025",customer:{company:"Acme Construction",contact:"John Smith",email:"john@acmeconstruction.com",phone:"(555) 123-4567"},project:{name:"Highway 42 Expansion",location:"Springfield, IL"},materials:[{id:1,type:"Crushed Stone",grade:"#57 Stone",quantity:2500,unit:"Tons",status:"Pending"},{id:2,type:"Sand",grade:"Fine Grain",quantity:1200,unit:"Tons",status:"In Transit"}],delivery:{address:"123 Construction Site, Springfield, IL 62701",scheduledDate:"May 20, 2025",timeWindow:"Morning (8am - 12pm)",driverName:"Michael Johnson",driverPhone:"(555) 987-6543",vehicle:"Truck #42 - Dump Truck",currentLocation:"En route - 15 miles away",eta:"30 minutes"},statusHistory:[{status:"Order Placed",date:"April 10, 2025 - 10:30 AM",notes:"Order received and confirmed"},{status:"Processing",date:"April 12, 2025 - 9:15 AM",notes:"Materials being prepared for shipment"},{status:"Partial Shipment",date:"April 15, 2025 - 2:45 PM",notes:"Sand shipment prepared and scheduled"},{status:"In Transit",date:"April 16, 2025 - 8:00 AM",notes:"Sand shipment en route to delivery location"}]}),[t,l]=(0,a.useState)(!1);(0,a.useEffect)(()=>{let e=sessionStorage.getItem("acceptedQuoteData");if(e)try{let t=JSON.parse(e);r(e=>({...e,quoteNumber:t.quoteNumber,customer:t.customer,project:{name:t.project.name,location:t.project.location},materials:t.materials.map(e=>({id:e.id,type:e.type,grade:e.grade,quantity:e.quantity,unit:e.unit,status:2===e.id?"In Transit":"Pending"})),delivery:{...e.delivery,address:t.delivery.address,scheduledDate:t.delivery.preferredDate,timeWindow:t.delivery.timeWindow}})),l(!0),setTimeout(()=>{sessionStorage.removeItem("acceptedQuoteData")},1e3)}catch(e){console.error("Error parsing quote data:",e)}},[]);let n=[{status:"Order Placed",completed:!0,current:!1},{status:"Processing",completed:!0,current:!1},{status:"Preparing Shipment",completed:!0,current:!1},{status:"In Transit",completed:!1,current:!0},{status:"Delivered",completed:!1,current:!1}],o=n.filter(e=>e.completed).length/(n.length-1)*100,c=e=>{switch(e){case"Order Placed":case"Processing":case"Preparing Shipment":case"Partial Shipment":return"text-blue-600 dark:text-blue-400";case"In Transit":return"text-yellow-600 dark:text-yellow-400";case"Delivered":return"text-green-600 dark:text-green-400";case"Delayed":return"text-red-600 dark:text-red-400";default:return"text-gray-600 dark:text-gray-400"}};return(0,s.jsxs)("div",{className:"min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800",children:[(0,s.jsx)("div",{className:"absolute top-4 right-4",children:(0,s.jsx)(i.default,{})}),(0,s.jsx)("main",{className:"container mx-auto px-4 py-12",children:(0,s.jsxs)("div",{className:"max-w-4xl mx-auto",children:[(0,s.jsx)("div",{className:"mb-8",children:(0,s.jsxs)(d(),{href:"/prototype-1",className:"text-primary hover:underline inline-flex items-center",children:[(0,s.jsx)("svg",{xmlns:"http://www.w3.org/2000/svg",className:"h-5 w-5 mr-1",viewBox:"0 0 20 20",fill:"currentColor",children:(0,s.jsx)("path",{fillRule:"evenodd",d:"M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z",clipRule:"evenodd"})}),"Back to Prototype 1"]})}),t&&(0,s.jsxs)("div",{className:"bg-green-100 dark:bg-green-900 border border-green-200 dark:border-green-800 text-green-800 dark:text-green-300 rounded-lg p-4 mb-6 flex items-center",children:[(0,s.jsx)("svg",{xmlns:"http://www.w3.org/2000/svg",className:"h-5 w-5 mr-2",fill:"none",viewBox:"0 0 24 24",stroke:"currentColor",children:(0,s.jsx)("path",{strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:2,d:"M5 13l4 4L19 7"})}),(0,s.jsxs)("div",{children:[(0,s.jsx)("span",{className:"font-medium",children:"Order placed successfully!"}),(0,s.jsx)("p",{className:"text-sm",children:"Your quote has been converted to an order and is being processed."})]})]}),(0,s.jsxs)("div",{className:"bg-white dark:bg-gray-900 rounded-xl shadow-sm p-8",children:[(0,s.jsxs)("div",{className:"flex flex-col md:flex-row justify-between items-start mb-8",children:[(0,s.jsxs)("div",{children:[(0,s.jsx)("h1",{className:"text-2xl md:text-3xl font-bold mb-2",children:"Order Tracking"}),(0,s.jsxs)("p",{className:"text-gray-600 dark:text-gray-400",children:["Order #",e.orderNumber]}),(0,s.jsxs)("p",{className:"text-gray-600 dark:text-gray-400 text-sm",children:["From Quote #",e.quoteNumber]})]}),(0,s.jsxs)("div",{className:"mt-4 md:mt-0 md:text-right",children:[(0,s.jsx)("div",{className:"inline-block px-4 py-2 rounded-full bg-yellow-100 dark:bg-yellow-900 text-yellow-800 dark:text-yellow-300 font-semibold text-sm",children:e.status}),(0,s.jsxs)("p",{className:"text-sm mt-2",children:[(0,s.jsx)("span",{className:"text-gray-600 dark:text-gray-400",children:"Order Date: "}),e.placedDate]}),(0,s.jsxs)("p",{className:"text-sm",children:[(0,s.jsx)("span",{className:"text-gray-600 dark:text-gray-400",children:"Estimated Delivery: "}),e.estimatedDelivery]})]})]}),(0,s.jsxs)("div",{className:"mb-10",children:[(0,s.jsxs)("div",{className:"relative pt-1",children:[(0,s.jsxs)("div",{className:"flex mb-2 items-center justify-between",children:[(0,s.jsx)("div",{children:(0,s.jsx)("span",{className:"text-xs font-semibold inline-block py-1 px-2 uppercase rounded-full text-primary bg-blue-200 dark:bg-blue-900",children:"Order Progress"})}),(0,s.jsx)("div",{className:"text-right",children:(0,s.jsxs)("span",{className:"text-xs font-semibold inline-block text-primary",children:[Math.round(o),"%"]})})]}),(0,s.jsx)("div",{className:"overflow-hidden h-2 mb-4 text-xs flex rounded bg-blue-200 dark:bg-gray-700",children:(0,s.jsx)("div",{style:{width:"".concat(o,"%")},className:"shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-primary"})})]}),(0,s.jsx)("div",{className:"flex justify-between",children:n.map((e,r)=>(0,s.jsxs)("div",{className:"flex flex-col items-center",children:[(0,s.jsx)("div",{className:"w-8 h-8 flex items-center justify-center rounded-full mb-1 ".concat(e.completed?"bg-primary text-white":e.current?"border-2 border-primary text-primary":"bg-gray-200 dark:bg-gray-700 text-gray-500 dark:text-gray-400"),children:e.completed?(0,s.jsx)("svg",{className:"w-5 h-5",fill:"currentColor",viewBox:"0 0 20 20",xmlns:"http://www.w3.org/2000/svg",children:(0,s.jsx)("path",{fillRule:"evenodd",d:"M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z",clipRule:"evenodd"})}):r+1}),(0,s.jsx)("span",{className:"text-xs text-center mt-1 max-w-[80px]",children:e.status})]},r))})]}),(0,s.jsxs)("div",{className:"grid md:grid-cols-2 gap-8 mb-8",children:[(0,s.jsxs)("div",{children:[(0,s.jsx)("h2",{className:"text-xl font-semibold mb-4",children:"Delivery Information"}),(0,s.jsxs)("div",{className:"bg-gray-50 dark:bg-gray-800 p-6 rounded-lg mb-4",children:[(0,s.jsx)("p",{className:"text-gray-600 dark:text-gray-400 text-sm mb-1",children:"Delivery Address:"}),(0,s.jsx)("p",{className:"font-medium mb-3",children:e.delivery.address}),(0,s.jsx)("p",{className:"text-gray-600 dark:text-gray-400 text-sm mb-1",children:"Scheduled Delivery:"}),(0,s.jsxs)("p",{className:"font-medium mb-3",children:[e.delivery.scheduledDate," | ",e.delivery.timeWindow]}),(0,s.jsxs)("div",{className:"pt-3 border-t border-gray-200 dark:border-gray-700",children:[(0,s.jsx)("p",{className:"text-gray-600 dark:text-gray-400 text-sm font-semibold mb-2",children:"Driver Information:"}),(0,s.jsx)("p",{className:"mb-1",children:e.delivery.driverName}),(0,s.jsx)("p",{className:"mb-1",children:e.delivery.driverPhone}),(0,s.jsx)("p",{className:"mb-3",children:e.delivery.vehicle}),(0,s.jsxs)("div",{className:"flex justify-between items-center",children:[(0,s.jsxs)("div",{children:[(0,s.jsx)("p",{className:"text-sm font-medium",children:e.delivery.currentLocation}),(0,s.jsxs)("p",{className:"text-sm text-gray-600 dark:text-gray-400",children:["ETA: ",e.delivery.eta]})]}),(0,s.jsx)("button",{className:"bg-primary hover:bg-blue-600 text-white text-sm font-medium py-2 px-4 rounded transition-colors",children:"Contact Driver"})]})]})]}),(0,s.jsx)("div",{className:"bg-gray-200 dark:bg-gray-800 rounded-lg overflow-hidden h-64 relative",children:(0,s.jsx)("iframe",{title:"Delivery Location Map",width:"100%",height:"100%",frameBorder:"0",scrolling:"no",marginHeight:"0",marginWidth:"0",src:"https://maps.google.com/maps?q=Springfield,IL&output=embed"})})]}),(0,s.jsxs)("div",{children:[(0,s.jsx)("h2",{className:"text-xl font-semibold mb-4",children:"Order Details"}),(0,s.jsx)("div",{className:"bg-gray-50 dark:bg-gray-800 p-6 rounded-lg mb-6",children:(0,s.jsxs)("div",{className:"grid grid-cols-2 gap-4",children:[(0,s.jsxs)("div",{children:[(0,s.jsx)("p",{className:"text-gray-600 dark:text-gray-400 text-sm",children:"Customer:"}),(0,s.jsx)("p",{className:"font-medium",children:e.customer.company}),(0,s.jsx)("p",{className:"text-sm",children:e.customer.contact})]}),(0,s.jsxs)("div",{children:[(0,s.jsx)("p",{className:"text-gray-600 dark:text-gray-400 text-sm",children:"Project:"}),(0,s.jsx)("p",{className:"font-medium",children:e.project.name}),(0,s.jsx)("p",{className:"text-sm",children:e.project.location})]})]})}),(0,s.jsxs)("div",{className:"bg-gray-50 dark:bg-gray-800 p-6 rounded-lg mb-6",children:[(0,s.jsx)("h3",{className:"font-semibold mb-3",children:"Materials Status"}),(0,s.jsx)("div",{className:"space-y-4",children:e.materials.map(e=>(0,s.jsxs)("div",{className:"flex justify-between items-center border-b border-gray-200 dark:border-gray-700 pb-3 last:border-0 last:pb-0",children:[(0,s.jsxs)("div",{children:[(0,s.jsx)("p",{className:"font-medium",children:e.type}),(0,s.jsxs)("p",{className:"text-sm text-gray-600 dark:text-gray-400",children:[e.grade," | ",e.quantity," ",e.unit]})]}),(0,s.jsx)("span",{className:"px-2 py-1 rounded-full text-xs font-medium ".concat("In Transit"===e.status?"bg-yellow-100 dark:bg-yellow-900 text-yellow-800 dark:text-yellow-300":"Delivered"===e.status?"bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-300":"bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-300"),children:e.status})]},e.id))})]}),(0,s.jsxs)("div",{className:"bg-gray-50 dark:bg-gray-800 p-6 rounded-lg",children:[(0,s.jsx)("h3",{className:"font-semibold mb-3",children:"Order History"}),(0,s.jsx)("ol",{className:"relative border-l border-gray-300 dark:border-gray-700",children:e.statusHistory.map((e,r)=>(0,s.jsxs)("li",{className:"mb-6 ml-6 last:mb-0",children:[(0,s.jsx)("span",{className:"absolute flex items-center justify-center w-6 h-6 rounded-full -left-3 ".concat(0===r?"bg-primary text-white":"bg-gray-200 dark:bg-gray-800 border border-gray-300 dark:border-gray-700"),children:0===r?(0,s.jsx)("svg",{className:"w-3 h-3",fill:"currentColor",viewBox:"0 0 20 20",xmlns:"http://www.w3.org/2000/svg",children:(0,s.jsx)("path",{fillRule:"evenodd",d:"M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z",clipRule:"evenodd"})}):(0,s.jsx)("div",{className:"w-2 h-2 rounded-full bg-gray-300 dark:bg-gray-600"})}),(0,s.jsx)("h4",{className:"font-semibold text-sm ".concat(c(e.status)),children:e.status}),(0,s.jsx)("time",{className:"block mb-1 text-xs font-normal text-gray-500 dark:text-gray-400",children:e.date}),(0,s.jsx)("p",{className:"text-sm font-normal text-gray-600 dark:text-gray-400",children:e.notes})]},r))})]})]})]}),(0,s.jsxs)("div",{className:"flex flex-col sm:flex-row gap-4 justify-end mt-8",children:[(0,s.jsx)("button",{className:"border border-gray-300 dark:border-gray-700 hover:border-primary hover:text-primary font-semibold py-2 px-6 rounded-lg transition-colors",children:"Download Details"}),(0,s.jsx)("button",{className:"border border-gray-300 dark:border-gray-700 hover:border-primary hover:text-primary font-semibold py-2 px-6 rounded-lg transition-colors",children:"Report Issue"}),(0,s.jsx)("button",{className:"bg-primary hover:bg-blue-600 text-white font-semibold py-2 px-6 rounded-lg transition-colors",children:"Get Updates via SMS"})]})]})]})})]})}},5222:(e,r,t)=>{Promise.resolve().then(t.bind(t,3595))}},e=>{var r=r=>e(e.s=r);e.O(0,[6874,8441,1684,7358],()=>r(5222)),_N_E=e.O()}]);