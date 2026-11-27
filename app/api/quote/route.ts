import { NextResponse } from 'next/server';
const recipient='contact@branogreen.com';
export async function POST(request:Request){
 const json=request.headers.get('accept')?.includes('application/json');
 const fail=(error:string,status:number)=>json?NextResponse.json({error},{status}):new NextResponse(error,{status,headers:{'Content-Type':'text/plain; charset=utf-8'}});
 try{
  if(Number(request.headers.get('content-length'))>20000)return fail('Enquiry is too long.',413);
  const form=await request.formData();
  const limits:Record<string,number>={name:150,email:254,phone:50,division:40,product:200,quantity:100,incoterm:20,message:5000};
  const payload:Record<string,string>={};
  if(form.get('website'))return fail('Unable to accept this submission.',400);
  for(const [field,max] of Object.entries(limits)){
   const value=form.get(field);
   if(value!==null&&typeof value!=='string')return fail('Invalid enquiry fields.',400);
   payload[field]=String(value||'').trim();
   if(payload[field].length>max)return fail('Please shorten your enquiry fields.',400);
  }
  if(!payload.name||!payload.message||!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(payload.email)||/[\r\n]/.test(payload.email))return fail('Please enter your name, a valid email and your requirements.',400);
  if(!['Agro Export','Information Technology','Green Energy'].includes(payload.division))return fail('Please select a valid division.',400);
  const key=process.env.RESEND_API_KEY;
  const from=process.env.QUOTE_FROM_EMAIL;
  if(!key||!from)return fail('Online enquiries are temporarily unavailable. Please email contact@branogreen.com.',503);
  const response=await fetch('https://api.resend.com/emails',{method:'POST',signal:AbortSignal.timeout(10000),headers:{Authorization:`Bearer ${key}`,'Content-Type':'application/json'},body:JSON.stringify({from,to:[recipient],reply_to:payload.email,subject:`Website enquiry: ${payload.division}`,text:Object.entries(payload).map(([k,v])=>`${k}: ${v}`).join('\n')})});
  if(!response.ok)return fail('Your enquiry could not be sent. Please retry or email contact@branogreen.com.',502);
  return json?NextResponse.json({ok:true}):NextResponse.redirect(new URL('/thank-you',request.url),303);
 }catch{return fail('Unable to process your enquiry. Please retry or email contact@branogreen.com.',502);}
}
