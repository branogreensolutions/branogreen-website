import { NextResponse } from 'next/server';
export async function POST(request:Request){
 const form=await request.formData();
 const payload=Object.fromEntries(form.entries());
 const key=process.env.RESEND_API_KEY;
 if(key){
  const response=await fetch('https://api.resend.com/emails',{method:'POST',headers:{Authorization:`Bearer ${key}`,'Content-Type':'application/json'},body:JSON.stringify({from:process.env.QUOTE_FROM_EMAIL||'Website <onboarding@resend.dev>',to:[process.env.QUOTE_TO_EMAIL||'info@branogreen.com'],reply_to:String(payload.email||''),subject:`Website enquiry: ${payload.product||payload.division||'Brano Green'}`,text:Object.entries(payload).map(([k,v])=>`${k}: ${v}`).join('\n')})});
  if(!response.ok)return NextResponse.redirect(new URL('/contact?status=error',request.url),303);
 }
 return NextResponse.redirect(new URL('/thank-you',request.url),303);
}
