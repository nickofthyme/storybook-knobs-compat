import{u as i,r as u,E as c,j as e}from"./iframe-kyTJV98J.js";import"./preload-helper-C1FmrZbK.js";const{addons:V}=__STORYBOOK_MODULE_PREVIEW_API__;function p(t,...s){V.getChannel().emit(t,...s)}const h=(t,s,n,r)=>{const o=i();return u.useEffect(()=>{const a={name:t,control:{type:"object"},table:{subcategory:r,type:{summary:"array"}}};p(c.Set,t,s,a)},[]),o.state.knobs[t]},O=(t,s,n)=>{const r=i();return u.useEffect(()=>{const o={name:t,control:{type:"boolean"},table:{subcategory:n},type:{name:"boolean"}};p(c.Set,t,s,o)},[]),r.state.knobs[t]},k=(t,s,n)=>{const r=i();return u.useEffect(()=>{const o={name:t,control:{type:"color"},table:{subcategory:n,type:{summary:"string"}}};p(c.Set,t,s,o)},[]),r.state.knobs[t]},E=(t,s,n)=>{var o;const r=i();return u.useEffect(()=>{const a={name:t,control:{type:"date"},table:{subcategory:n,type:{summary:"number"}}};p(c.Set,t,s,a)},[]),(o=r.state.knobs[t])==null?void 0:o.valueOf()},N=(t,s,n,r)=>{const o=i();return u.useEffect(()=>{const a={name:t,control:{type:"file",accept:s},table:{subcategory:r}};p(c.Set,t,n,a)},[]),o.state.knobs[t]},J=(t,s,n={},r)=>{const o=i();return u.useEffect(()=>{const{min:a,max:b,step:l,range:y}=n||{},d={name:t,control:{type:y?"range":"number",min:a,max:b,step:l},table:{subcategory:r},type:{name:"number"}};p(c.Set,t,s,d)},[]),o.state.knobs[t]},A=(t,s,n)=>{const r=i();return u.useEffect(()=>{const o={name:t,control:{type:"object"},table:{subcategory:n,type:{summary:"object"}}};p(c.Set,t,s,o)},[]),r.state.knobs[t]},_=(t,s,n,r,o)=>{const a=i();return u.useEffect(()=>{const b=Array.isArray(s)?void 0:Object.fromEntries(Object.entries(s).map(([j,S])=>[S,j])),l="select",y=C.has(l)?Array.isArray(n)?n[0]:n:Array.isArray(n)?n:[n],d={name:t,control:{type:l,labels:b},options:Array.isArray(s)?s:Object.values(s),table:{subcategory:o}};p(c.Set,t,y,d)},[]),a.state.knobs[t]},C=new Set(["inline-radio","radio","select"]),B=(t,s,n,r)=>{const o=i();return u.useEffect(()=>{const a=Array.isArray(s)?void 0:Object.fromEntries(Object.entries(s).map(([l,y])=>[y,l])),b={name:t,control:{type:"radio",labels:a},options:Array.isArray(s)?s:Object.values(s),table:{subcategory:r}};p(c.Set,t,n,b)},[]),o.state.knobs[t]},D=(t,s,n,r)=>{const o=i();return u.useEffect(()=>{const a=Array.isArray(s)?void 0:Object.fromEntries(Object.entries(s).map(([l,y])=>[y,l])),b={name:t,control:{type:"select",labels:a},options:Array.isArray(s)?s:Object.values(s),table:{subcategory:r}};p(c.Set,t,n,b)},[]),o.state.knobs[t]},K=(t,s,n)=>{const r=i();return u.useEffect(()=>{const o={name:t,control:{type:"text"},table:{subcategory:n},type:{name:"string"}};p(c.Set,t,s,o)},[]),r.state.knobs[t]},{addons:I}=__STORYBOOK_MODULE_PREVIEW_API__,R=(t,s,n)=>{const r=i();u.useEffect(()=>{if(r.state.buttons[t])return;const o=I.getChannel(),a={name:t,control:{type:"text",button:!0},table:{subcategory:n}};p(c.Set,t,void 0,a);const b=l=>{l===t&&s({name:t})};return o.on(c.Call,b),r.setButton(t),()=>{r.setButton(t,!0),o.off(c.Call,b)}},[])},v={title:"Knobs",parameters:{},args:{}},f=()=>{const t=K("some text","primary"),s=O("some bool",!0),n=J("some number",10,{min:0,max:100,step:1}),r=h("some array",["a","b","c"]),o=A("some object",{a:1,b:2,c:3}),a=D("some select",{A:"a",B:"b",C:"c"},"a"),b=B("some radios",{Test:"test",test2:"test2"},"test"),l=E("some date",new Date),y=k("some color","#000000"),d=N("some files","image/*"),j=_("some options",{A:"a",B:"b",C:"c"},["a"]);return R("Handle click",()=>{console.log("button clicked")}),e.jsxs("div",{style:{padding:"1rem"},children:[e.jsxs("span",{children:[e.jsx("b",{children:"text:"})," ",JSON.stringify(t)]}),e.jsx("br",{}),e.jsxs("span",{children:[e.jsx("b",{children:"boolean:"})," ",JSON.stringify(s)]}),e.jsx("br",{}),e.jsxs("span",{children:[e.jsx("b",{children:"number:"})," ",JSON.stringify(n)]}),e.jsx("br",{}),e.jsxs("span",{children:[e.jsx("b",{children:"array:"})," ",JSON.stringify(r)]}),e.jsx("br",{}),e.jsxs("span",{children:[e.jsx("b",{children:"object:"})," ",JSON.stringify(o)]}),e.jsx("br",{}),e.jsxs("span",{children:[e.jsx("b",{children:"select:"})," ",JSON.stringify(a)]}),e.jsx("br",{}),e.jsxs("span",{children:[e.jsx("b",{children:"radios:"})," ",JSON.stringify(b)]}),e.jsx("br",{}),e.jsxs("span",{children:[e.jsx("b",{children:"date:"})," ",JSON.stringify(l)]}),e.jsx("br",{}),e.jsxs("span",{children:[e.jsx("b",{children:"color:"})," ",JSON.stringify(y)]}),e.jsx("br",{}),e.jsxs("span",{children:[e.jsx("b",{children:"files:"})," ",JSON.stringify(d)]}),e.jsx("br",{}),e.jsxs("span",{children:[e.jsx("b",{children:"options:"})," ",JSON.stringify(j)]}),e.jsx("br",{})]})};f.__docgenInfo={description:"",methods:[],displayName:"Default"};var x,g,m;f.parameters={...f.parameters,docs:{...(x=f.parameters)==null?void 0:x.docs,source:{originalSource:`() => {
  const textValue = text('some text', 'primary');
  const booleanValue = boolean('some bool', true);
  const numberValue = number('some number', 10, {
    min: 0,
    max: 100,
    step: 1
  });
  const arrayValue = array('some array', ['a', 'b', 'c']);
  const objectValue = object('some object', {
    a: 1,
    b: 2,
    c: 3
  });
  const selectValue = select('some select', {
    A: 'a',
    B: 'b',
    C: 'c'
  }, 'a');
  const radiosValue = radios('some radios', {
    Test: 'test',
    test2: 'test2'
  }, 'test');
  const dateValue = date('some date', new Date());
  const colorValue = color('some color', '#000000');
  const filesValue = files('some files', 'image/*');
  const optionsValue = optionsKnob('some options', {
    A: 'a',
    B: 'b',
    C: 'c'
  }, ['a']);
  button('Handle click', () => {
    console.log('button clicked');
  });
  return <div style={{
    padding: '1rem'
  }}>
      {/* <button onClick={handleClick}>Click me</button><br />
       <span><b>label:</b> {JSON.stringify(label)}</span><br /> */}
      <span><b>text:</b> {JSON.stringify(textValue)}</span><br />
      <span><b>boolean:</b> {JSON.stringify(booleanValue)}</span><br />
      <span><b>number:</b> {JSON.stringify(numberValue)}</span><br />
      <span><b>array:</b> {JSON.stringify(arrayValue)}</span><br />
      <span><b>object:</b> {JSON.stringify(objectValue)}</span><br />
      <span><b>select:</b> {JSON.stringify(selectValue)}</span><br />
      <span><b>radios:</b> {JSON.stringify(radiosValue)}</span><br />
      <span><b>date:</b> {JSON.stringify(dateValue)}</span><br />
      <span><b>color:</b> {JSON.stringify(colorValue)}</span><br />
      <span><b>files:</b> {JSON.stringify(filesValue)}</span><br />
      <span><b>options:</b> {JSON.stringify(optionsValue)}</span><br />
    </div>;
}`,...(m=(g=f.parameters)==null?void 0:g.docs)==null?void 0:m.source}}};const w=["Default"];export{f as Default,w as __namedExportsOrder,v as default};
