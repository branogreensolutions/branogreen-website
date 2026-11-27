const ts=require('typescript'),fs=require('fs'),Module=require('module'),assert=require('node:assert/strict');
const code=ts.transpileModule(fs.readFileSync('app/api/quote/route.ts','utf8'),{compilerOptions:{module:ts.ModuleKind.CommonJS,target:ts.ScriptTarget.ES2022}}).outputText;
const filename=process.cwd()+'/route-test.cjs';
const m=new Module(filename);m.filename=filename;m.paths=module.paths;m._compile(code,filename);
function request(fields={}){const f=new FormData();Object.entries({name:'Test Buyer',email:'buyer@example.com',message:'Please quote',division:'Agro Export',...fields}).forEach(([k,v])=>f.set(k,v));return new Request('http://localhost/api/quote',{method:'POST',body:f,headers:{Accept:'application/json'}})}
(async()=>{
 delete process.env.RESEND_API_KEY;delete process.env.QUOTE_FROM_EMAIL;
 assert.equal((await m.exports.POST(request())).status,503);
 assert.equal((await m.exports.POST(request({email:'invalid'}))).status,400);
 assert.equal((await m.exports.POST(request({website:'spam'}))).status,400);
 assert.equal((await m.exports.POST(request({message:'a'.repeat(5001)}))).status,400);
 process.env.RESEND_API_KEY='test';process.env.QUOTE_FROM_EMAIL='Website <website@branogreen.com>';
 global.fetch=async(url,options)=>{const body=JSON.parse(options.body);assert.deepEqual(body.to,['contact@branogreen.com']);assert.equal(body.reply_to,'buyer@example.com');return new Response('{}',{status:200})};
 assert.equal((await m.exports.POST(request())).status,200);
 global.fetch=async()=>new Response('{}',{status:500});assert.equal((await m.exports.POST(request())).status,502);
 global.fetch=async()=>{throw new Error('network')};assert.equal((await m.exports.POST(request())).status,502);
 console.log('PASS: configuration, validation, spam field, size limits, recipient/reply-to, provider and network failures');
})().catch(e=>{console.error(e);process.exit(1)});
