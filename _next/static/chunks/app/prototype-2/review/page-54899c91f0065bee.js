(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[125],{1800:(e,r,t)=>{Promise.resolve().then(t.bind(t,9011))},5695:(e,r,t)=>{"use strict";var s=t(8999);t.o(s,"usePathname")&&t.d(r,{usePathname:function(){return s.usePathname}}),t.o(s,"useRouter")&&t.d(r,{useRouter:function(){return s.useRouter}})},9011:(e,r,t)=>{"use strict";t.r(r),t.d(r,{default:()=>o});var s=t(5155),a=t(2115),n=t(6874),l=t.n(n),i=t(5695);function o(){let e=(0,i.useRouter)(),[r,t]=(0,a.useState)({project:{type:"Highway expansion project for Route 42",description:"Approximately 5 miles of new road construction",location:"Springfield, IL, between markers 35 and 40"},materials:[{type:"Crushed Stone",grade:"#57 Stone",quantity:"2,500 tons"},{type:"Asphalt",grade:"Hot Mix Asphalt",quantity:"1,800 tons"},{type:"Sand",grade:"Fine Grain",quantity:"800 tons"}],delivery:{timeframe:"Starting May 15th, with deliveries over 3 weeks",schedule:"Weekly deliveries of approximately 1/3 of the total materials",specialInstructions:"Site has weight restrictions for vehicles over 30 tons"},contact:{company:"Acme Construction",name:"John Smith",phone:"(555) 123-4567",email:"john@acmeconstruction.com"}}),[n,o]=(0,a.useState)(!1),[d,c]=(0,a.useState)(null),[m,x]=(0,a.useState)({...r.project}),[u,p]=(0,a.useState)({...r.delivery}),[h,y]=(0,a.useState)({...r.contact}),g=e=>{c(e),"project"===e?x({...r.project}):"delivery"===e?p({...r.delivery}):"contact"===e&&y({...r.contact})},f=()=>{"project"===d?t(e=>({...e,project:m})):"materials"===d||("delivery"===d?t(e=>({...e,delivery:u})):"contact"===d&&t(e=>({...e,contact:h}))),c(null)},b=()=>{c(null)};return(0,a.useEffect)(()=>{let e=sessionStorage.getItem("voiceResponses");if(e)try{let d=JSON.parse(e);if(d.length>=6){var r,s,a,n,l,i;console.log("Processing voice responses:",d);let e=(null==(r=d.find(e=>1===e.id))?void 0:r.response)||"",c=(null==(s=d.find(e=>2===e.id))?void 0:s.response)||"",m=(null==(a=d.find(e=>3===e.id))?void 0:a.response)||"",x=(null==(n=d.find(e=>4===e.id))?void 0:n.response)||"",u=(null==(l=d.find(e=>5===e.id))?void 0:l.response)||"",p=(null==(i=d.find(e=>6===e.id))?void 0:i.response)||"";t(r=>({project:{type:e||r.project.type,description:function(e){if(!e)return"";for(let r of[/it'?s\s+(approximately|about|around)([^.]+)/i,/approximately([^.]+)/i,/project\s+(?:is|for)([^.]+)/i]){let t=e.match(r);if(t&&t[1])return t[1].trim()}let r=e.split(".");return r&&r.length>1?r[1].trim():""}(e)||r.project.description,location:x||r.project.location},materials:function(e){if(!e)return null;let r=[];for(let t of[{keyword:["crushed stone","gravel","aggregate"],type:"Crushed Stone",grade:"#57 Stone",pattern:/(\d+[,.]?\d*)\s*(?:tons?|cubic\s+yards?|cy|yards?)\s+(?:of\s+)?(?:crushed\s+stone|gravel|aggregate)/i},{keyword:["asphalt","hot mix"],type:"Asphalt",grade:"Hot Mix Asphalt",pattern:/(\d+[,.]?\d*)\s*(?:tons?|cubic\s+yards?|cy|yards?)\s+(?:of\s+)?(?:hot\s+mix\s+)?asphalt/i},{keyword:["sand"],type:"Sand",grade:"Fine Grain",pattern:/(\d+[,.]?\d*)\s*(?:tons?|cubic\s+yards?|cy|yards?)\s+(?:of\s+)?(?:fine\s+grain\s+)?sand/i},{keyword:["concrete"],type:"Concrete",grade:"Ready-Mix",pattern:/(\d+[,.]?\d*)\s*(?:tons?|cubic\s+yards?|cy|yards?)\s+(?:of\s+)?(?:ready\s+mix\s+)?concrete/i},{keyword:["dirt","soil","fill"],type:"Fill Dirt",grade:"Clean Fill",pattern:/(\d+[,.]?\d*)\s*(?:tons?|cubic\s+yards?|cy|yards?)\s+(?:of\s+)?(?:clean\s+)?(?:dirt|soil|fill)/i}])if(t.keyword.some(r=>e.toLowerCase().includes(r))){let s=e.match(t.pattern);s&&s[1]?r.push({type:t.type,grade:t.grade,quantity:s[1].replace(/,/g,"")+" tons"}):r.push({type:t.type,grade:t.grade,quantity:"Unknown quantity"})}if(0===r.length)for(let t of e.matchAll(/(\d+[,.]?\d*)\s*(?:tons?|cubic\s+yards?|cy|yards?)\s+(?:of\s+)?([a-zA-Z\s]+)/gi))t&&t[1]&&t[2]&&r.push({type:t[2].trim().replace(/^\w/,e=>e.toUpperCase()),grade:"Standard",quantity:t[1].replace(/,/g,"")+" tons"});return r.length>0?r:null}(c)||r.materials,delivery:{timeframe:m||r.delivery.timeframe,schedule:function(e){if(!e)return null;for(let{pattern:r,schedule:t}of[{pattern:/weekly/i,schedule:"Weekly deliveries"},{pattern:/(\d+)\s*(?:week|month)s?/i,schedule:e=>"Deliveries over ".concat(e[1]," ").concat(e[0].includes("week")?"weeks":"months")},{pattern:/spread\s+over\s+([^.]+)/i,schedule:e=>"Deliveries spread over ".concat(e[1])},{pattern:/starting\s+([^,]+),\s+([^.]+)/i,schedule:e=>"Starting ".concat(e[1],", ").concat(e[2])}]){let s=e.match(r);if(s)return"function"==typeof t?t(s):t}return null}(m)||r.delivery.schedule,specialInstructions:p||r.delivery.specialInstructions},contact:function(e){if(!e)return null;let r={company:"Unknown Company",name:"Unknown Name",phone:"Unknown Phone",email:"Unknown Email"};for(let t of[/company\s+(?:is|called|named)\s+([^,.]+)/i,/(?:at|with|for)\s+([A-Z][A-Za-z\s]+)(?:,|\.|and)/i,/([A-Z][A-Za-z\s]+)(?:\s+company|\s+construction|\s+inc\.?|\s+llc\.?)/i]){let s=e.match(t);if(s&&s[1]){r.company=s[1].trim();break}}for(let t of[/(?:I'?m|name\s+is|this\s+is)\s+([^,.]+)/i,/([A-Z][a-z]+\s+[A-Z][a-z]+)(?:,|\.|and)/i]){let s=e.match(t);if(s&&s[1]){r.name=s[1].trim();break}}let t=e.match(/([a-zA-Z0-9._-]+@[a-zA-Z0-9._-]+\.[a-zA-Z0-9_-]+)/i);for(let s of(t&&(r.email=t[1]),[/\(?\d{3}\)?[-.\s]?\d{3}[-.\s]?\d{4}/,/\d{3}[-.\s]\d{3}[-.\s]\d{4}/])){let t=e.match(s);if(t){r.phone=t[0];break}}return r}(u)||r.contact})),o(!0)}}catch(e){console.error("Error parsing voice responses:",e)}},[]),(0,s.jsx)("div",{children:(0,s.jsx)("main",{className:"container mx-auto px-4 py-12",children:(0,s.jsxs)("div",{className:"max-w-3xl mx-auto",children:[(0,s.jsx)("div",{className:"mb-8",children:(0,s.jsxs)(l(),{href:"/prototype-2",className:"text-primary hover:underline inline-flex items-center",children:[(0,s.jsx)("svg",{xmlns:"http://www.w3.org/2000/svg",className:"h-5 w-5 mr-1",viewBox:"0 0 20 20",fill:"currentColor",children:(0,s.jsx)("path",{fillRule:"evenodd",d:"M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z",clipRule:"evenodd"})}),"Back to Prototype 2"]})}),(0,s.jsxs)("div",{className:"bg-white dark:bg-gray-900 rounded-xl shadow-sm p-8",children:[(0,s.jsxs)("div",{className:"flex items-center justify-center mb-6",children:[(0,s.jsx)("div",{className:"w-12 h-12 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center mr-4",children:(0,s.jsx)("svg",{xmlns:"http://www.w3.org/2000/svg",className:"h-6 w-6 text-green-600 dark:text-green-400",fill:"none",viewBox:"0 0 24 24",stroke:"currentColor",children:(0,s.jsx)("path",{strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:2,d:"M5 13l4 4L19 7"})})}),(0,s.jsx)("h1",{className:"text-2xl font-bold",children:"Interview Complete!"})]}),n&&(0,s.jsx)("div",{className:"bg-green-100 dark:bg-green-900 border border-green-200 dark:border-green-800 text-green-800 dark:text-green-300 rounded-lg p-4 mb-6",children:(0,s.jsx)("p",{className:"font-medium",children:"Voice responses received and processed successfully!"})}),(0,s.jsx)("p",{className:"text-center mb-8 text-gray-600 dark:text-gray-300",children:"Please review the information we've captured from your voice responses"}),(0,s.jsxs)("div",{className:"space-y-8 mb-8",children:[(0,s.jsxs)("div",{className:"border border-gray-200 dark:border-gray-700 rounded-lg p-6",children:[(0,s.jsxs)("div",{className:"flex justify-between items-start mb-4",children:[(0,s.jsx)("h2",{className:"text-lg font-semibold",children:"Project Information"}),"project"!==d?(0,s.jsxs)("button",{onClick:()=>g("project"),className:"text-primary hover:text-blue-700 text-sm font-medium flex items-center",children:[(0,s.jsx)("svg",{xmlns:"http://www.w3.org/2000/svg",className:"h-4 w-4 mr-1",viewBox:"0 0 20 20",fill:"currentColor",children:(0,s.jsx)("path",{d:"M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z"})}),"Edit"]}):(0,s.jsxs)("div",{className:"flex space-x-2",children:[(0,s.jsx)("button",{onClick:b,className:"text-gray-600 hover:text-gray-800 text-sm font-medium",children:"Cancel"}),(0,s.jsx)("button",{onClick:f,className:"text-green-600 hover:text-green-800 text-sm font-medium",children:"Save"})]})]}),"project"!==d?(0,s.jsxs)("div",{className:"space-y-2",children:[(0,s.jsxs)("p",{children:[(0,s.jsx)("span",{className:"text-gray-600 dark:text-gray-400 text-sm",children:"Project Type: "}),(0,s.jsx)("span",{className:"font-medium",children:r.project.type})]}),(0,s.jsxs)("p",{children:[(0,s.jsx)("span",{className:"text-gray-600 dark:text-gray-400 text-sm",children:"Description: "}),(0,s.jsx)("span",{className:"font-medium",children:r.project.description})]}),(0,s.jsxs)("p",{children:[(0,s.jsx)("span",{className:"text-gray-600 dark:text-gray-400 text-sm",children:"Location: "}),(0,s.jsx)("span",{className:"font-medium",children:r.project.location})]})]}):(0,s.jsxs)("div",{className:"space-y-4",children:[(0,s.jsxs)("div",{children:[(0,s.jsx)("label",{className:"block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1",children:"Project Type"}),(0,s.jsx)("input",{type:"text",value:m.type,onChange:e=>x({...m,type:e.target.value}),className:"w-full p-2 border border-gray-300 dark:border-gray-700 rounded-md focus:ring-primary focus:border-primary"})]}),(0,s.jsxs)("div",{children:[(0,s.jsx)("label",{className:"block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1",children:"Description"}),(0,s.jsx)("input",{type:"text",value:m.description,onChange:e=>x({...m,description:e.target.value}),className:"w-full p-2 border border-gray-300 dark:border-gray-700 rounded-md focus:ring-primary focus:border-primary"})]}),(0,s.jsxs)("div",{children:[(0,s.jsx)("label",{className:"block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1",children:"Location"}),(0,s.jsx)("input",{type:"text",value:m.location,onChange:e=>x({...m,location:e.target.value}),className:"w-full p-2 border border-gray-300 dark:border-gray-700 rounded-md focus:ring-primary focus:border-primary"})]})]})]}),(0,s.jsxs)("div",{className:"border border-gray-200 dark:border-gray-700 rounded-lg p-6",children:[(0,s.jsxs)("div",{className:"flex justify-between items-start mb-4",children:[(0,s.jsx)("h2",{className:"text-lg font-semibold",children:"Materials Required"}),"materials"!==d?(0,s.jsxs)("button",{onClick:()=>g("materials"),className:"text-primary hover:text-blue-700 text-sm font-medium flex items-center",children:[(0,s.jsx)("svg",{xmlns:"http://www.w3.org/2000/svg",className:"h-4 w-4 mr-1",viewBox:"0 0 20 20",fill:"currentColor",children:(0,s.jsx)("path",{d:"M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z"})}),"Edit"]}):(0,s.jsxs)("div",{className:"flex space-x-2",children:[(0,s.jsx)("button",{onClick:b,className:"text-gray-600 hover:text-gray-800 text-sm font-medium",children:"Cancel"}),(0,s.jsx)("button",{onClick:f,className:"text-green-600 hover:text-green-800 text-sm font-medium",children:"Save"})]})]}),(0,s.jsx)("div",{className:"space-y-4",children:r.materials.map((e,r)=>(0,s.jsxs)("div",{className:"p-3 bg-gray-50 dark:bg-gray-800 rounded-md",children:[(0,s.jsxs)("div",{className:"flex justify-between",children:[(0,s.jsx)("div",{className:"font-medium",children:e.type}),(0,s.jsx)("div",{children:e.quantity})]}),(0,s.jsx)("div",{className:"text-sm text-gray-600 dark:text-gray-400",children:e.grade})]},r))}),"materials"===d&&(0,s.jsx)("div",{className:"mt-4 p-3 border border-gray-200 dark:border-gray-700 rounded-md",children:(0,s.jsx)("p",{className:"text-sm text-gray-600 dark:text-gray-400 mb-2",children:"Material editing is not implemented in this prototype."})})]}),(0,s.jsxs)("div",{className:"border border-gray-200 dark:border-gray-700 rounded-lg p-6",children:[(0,s.jsxs)("div",{className:"flex justify-between items-start mb-4",children:[(0,s.jsx)("h2",{className:"text-lg font-semibold",children:"Delivery Information"}),"delivery"!==d?(0,s.jsxs)("button",{onClick:()=>g("delivery"),className:"text-primary hover:text-blue-700 text-sm font-medium flex items-center",children:[(0,s.jsx)("svg",{xmlns:"http://www.w3.org/2000/svg",className:"h-4 w-4 mr-1",viewBox:"0 0 20 20",fill:"currentColor",children:(0,s.jsx)("path",{d:"M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z"})}),"Edit"]}):(0,s.jsxs)("div",{className:"flex space-x-2",children:[(0,s.jsx)("button",{onClick:b,className:"text-gray-600 hover:text-gray-800 text-sm font-medium",children:"Cancel"}),(0,s.jsx)("button",{onClick:f,className:"text-green-600 hover:text-green-800 text-sm font-medium",children:"Save"})]})]}),"delivery"!==d?(0,s.jsxs)("div",{className:"space-y-2",children:[(0,s.jsxs)("p",{children:[(0,s.jsx)("span",{className:"text-gray-600 dark:text-gray-400 text-sm",children:"Timeframe: "}),(0,s.jsx)("span",{className:"font-medium",children:r.delivery.timeframe})]}),(0,s.jsxs)("p",{children:[(0,s.jsx)("span",{className:"text-gray-600 dark:text-gray-400 text-sm",children:"Schedule: "}),(0,s.jsx)("span",{className:"font-medium",children:r.delivery.schedule})]}),(0,s.jsxs)("p",{children:[(0,s.jsx)("span",{className:"text-gray-600 dark:text-gray-400 text-sm",children:"Special Instructions: "}),(0,s.jsx)("span",{className:"font-medium",children:r.delivery.specialInstructions})]})]}):(0,s.jsxs)("div",{className:"space-y-4",children:[(0,s.jsxs)("div",{children:[(0,s.jsx)("label",{className:"block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1",children:"Timeframe"}),(0,s.jsx)("input",{type:"text",value:u.timeframe,onChange:e=>p({...u,timeframe:e.target.value}),className:"w-full p-2 border border-gray-300 dark:border-gray-700 rounded-md focus:ring-primary focus:border-primary"})]}),(0,s.jsxs)("div",{children:[(0,s.jsx)("label",{className:"block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1",children:"Schedule"}),(0,s.jsx)("input",{type:"text",value:u.schedule,onChange:e=>p({...u,schedule:e.target.value}),className:"w-full p-2 border border-gray-300 dark:border-gray-700 rounded-md focus:ring-primary focus:border-primary"})]}),(0,s.jsxs)("div",{children:[(0,s.jsx)("label",{className:"block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1",children:"Special Instructions"}),(0,s.jsx)("textarea",{value:u.specialInstructions,onChange:e=>p({...u,specialInstructions:e.target.value}),className:"w-full p-2 border border-gray-300 dark:border-gray-700 rounded-md focus:ring-primary focus:border-primary",rows:3})]})]})]}),(0,s.jsxs)("div",{className:"border border-gray-200 dark:border-gray-700 rounded-lg p-6",children:[(0,s.jsxs)("div",{className:"flex justify-between items-start mb-4",children:[(0,s.jsx)("h2",{className:"text-lg font-semibold",children:"Contact Information"}),"contact"!==d?(0,s.jsxs)("button",{onClick:()=>g("contact"),className:"text-primary hover:text-blue-700 text-sm font-medium flex items-center",children:[(0,s.jsx)("svg",{xmlns:"http://www.w3.org/2000/svg",className:"h-4 w-4 mr-1",viewBox:"0 0 20 20",fill:"currentColor",children:(0,s.jsx)("path",{d:"M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z"})}),"Edit"]}):(0,s.jsxs)("div",{className:"flex space-x-2",children:[(0,s.jsx)("button",{onClick:b,className:"text-gray-600 hover:text-gray-800 text-sm font-medium",children:"Cancel"}),(0,s.jsx)("button",{onClick:f,className:"text-green-600 hover:text-green-800 text-sm font-medium",children:"Save"})]})]}),"contact"!==d?(0,s.jsxs)("div",{className:"space-y-2",children:[(0,s.jsxs)("p",{children:[(0,s.jsx)("span",{className:"text-gray-600 dark:text-gray-400 text-sm",children:"Company: "}),(0,s.jsx)("span",{className:"font-medium",children:r.contact.company})]}),(0,s.jsxs)("p",{children:[(0,s.jsx)("span",{className:"text-gray-600 dark:text-gray-400 text-sm",children:"Contact Name: "}),(0,s.jsx)("span",{className:"font-medium",children:r.contact.name})]}),(0,s.jsxs)("p",{children:[(0,s.jsx)("span",{className:"text-gray-600 dark:text-gray-400 text-sm",children:"Phone: "}),(0,s.jsx)("span",{className:"font-medium",children:r.contact.phone})]}),(0,s.jsxs)("p",{children:[(0,s.jsx)("span",{className:"text-gray-600 dark:text-gray-400 text-sm",children:"Email: "}),(0,s.jsx)("span",{className:"font-medium",children:r.contact.email})]})]}):(0,s.jsxs)("div",{className:"space-y-4",children:[(0,s.jsxs)("div",{children:[(0,s.jsx)("label",{className:"block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1",children:"Company"}),(0,s.jsx)("input",{type:"text",value:h.company,onChange:e=>y({...h,company:e.target.value}),className:"w-full p-2 border border-gray-300 dark:border-gray-700 rounded-md focus:ring-primary focus:border-primary"})]}),(0,s.jsxs)("div",{children:[(0,s.jsx)("label",{className:"block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1",children:"Contact Name"}),(0,s.jsx)("input",{type:"text",value:h.name,onChange:e=>y({...h,name:e.target.value}),className:"w-full p-2 border border-gray-300 dark:border-gray-700 rounded-md focus:ring-primary focus:border-primary"})]}),(0,s.jsxs)("div",{children:[(0,s.jsx)("label",{className:"block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1",children:"Phone"}),(0,s.jsx)("input",{type:"tel",value:h.phone,onChange:e=>y({...h,phone:e.target.value}),className:"w-full p-2 border border-gray-300 dark:border-gray-700 rounded-md focus:ring-primary focus:border-primary"})]}),(0,s.jsxs)("div",{children:[(0,s.jsx)("label",{className:"block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1",children:"Email"}),(0,s.jsx)("input",{type:"email",value:h.email,onChange:e=>y({...h,email:e.target.value}),className:"w-full p-2 border border-gray-300 dark:border-gray-700 rounded-md focus:ring-primary focus:border-primary"})]})]})]})]}),(0,s.jsxs)("div",{className:"flex flex-col sm:flex-row gap-4 justify-end mt-10",children:[(0,s.jsx)("button",{onClick:()=>e.push("/prototype-2/voice-request"),className:"border border-gray-300 dark:border-gray-700 hover:border-primary hover:text-primary font-semibold py-3 px-6 rounded-lg transition-colors",children:"Start Over"}),(0,s.jsx)("button",{onClick:()=>{sessionStorage.setItem("finalQuoteData",JSON.stringify(r)),e.push("/prototype-2/confirm")},className:"bg-primary hover:bg-blue-600 text-white font-semibold py-3 px-6 rounded-lg transition-colors",disabled:null!==d,children:"Submit Quote Request"})]})]}),(0,s.jsx)("div",{className:"bg-blue-50 dark:bg-blue-900/20 rounded-xl border border-blue-200 dark:border-blue-800 p-6 mt-8",children:(0,s.jsxs)("div",{className:"flex items-start",children:[(0,s.jsx)("svg",{xmlns:"http://www.w3.org/2000/svg",className:"h-6 w-6 text-blue-500 mr-3 mt-0.5",fill:"none",viewBox:"0 0 24 24",stroke:"currentColor",children:(0,s.jsx)("path",{strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:2,d:"M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"})}),(0,s.jsxs)("div",{children:[(0,s.jsx)("h3",{className:"font-medium mb-2",children:"How We Process Your Information"}),(0,s.jsx)("p",{className:"text-sm text-gray-600 dark:text-gray-400",children:"Your voice responses are processed using AI to extract key information. Our system creates a structured quote request that our team can respond to quickly. You can always edit any information that wasn't captured correctly."})]})]})})]})})})}}},e=>{var r=r=>e(e.s=r);e.O(0,[6874,8441,1684,7358],()=>r(1800)),_N_E=e.O()}]);