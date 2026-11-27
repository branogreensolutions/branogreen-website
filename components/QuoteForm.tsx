'use client';
import { useState, type FormEvent } from 'react';
export default function QuoteForm(){
 const [division,setDivision]=useState('Agro Export');
 const [pending,setPending]=useState(false);
 const [error,setError]=useState('');
 async function submit(event:FormEvent<HTMLFormElement>){
  event.preventDefault();setPending(true);setError('');
  try {
   const response=await fetch('/api/quote',{method:'POST',body:new FormData(event.currentTarget),headers:{Accept:'application/json'}});
   if(!response.ok){const data=await response.json();setError(data.error||'Unable to send. Please email contact@branogreen.com.');return;}
   window.location.assign('/thank-you');
  }catch{setError('Unable to send. Please try again or email contact@branogreen.com.');}
  finally{setPending(false);}
 }
 return <form onSubmit={submit} action="/api/quote" method="post" className="card grid gap-4 p-6">
 <div className="grid gap-4 md:grid-cols-2"><label className="grid gap-2">Full name / company<input className="input" name="name" autoComplete="name" maxLength={150} required/></label><label className="grid gap-2">Email address<input className="input" name="email" type="email" autoComplete="email" maxLength={254} required/></label></div>
 <div className="grid gap-4 md:grid-cols-2"><label className="grid gap-2">WhatsApp / phone (optional)<input className="input" name="phone" type="tel" autoComplete="tel" maxLength={50}/></label><label className="grid gap-2">Division<select className="input" name="division" value={division} onChange={e=>setDivision(e.target.value)}><option>Agro Export</option><option>Information Technology</option><option>Green Energy</option></select></label></div>
 <div className="grid gap-4 md:grid-cols-2"><label className="grid gap-2">Product or service<input className="input" name="product" maxLength={200}/></label><label className="grid gap-2">Quantity / project size<input className="input" name="quantity" maxLength={100}/></label></div>
 {division==='Agro Export'&&<label className="grid gap-2">Shipping terms<select className="input" name="incoterm" defaultValue="Not sure"><option>Not sure</option><option>FOB</option><option>CFR</option><option>CIF</option></select></label>}
 <label className="grid gap-2">Your requirements<textarea className="input min-h-32" name="message" maxLength={5000} required placeholder="Tell us about your specifications, destination or project location, and timeline."/></label>
 <div hidden aria-hidden="true"><label>Leave empty<input name="website" tabIndex={-1} autoComplete="off"/></label></div>
 {error&&<p role="alert" className="rounded-lg bg-red-50 p-3 text-red-800">{error}</p>}
 <button className="btn-primary disabled:opacity-60" type="submit" disabled={pending}>{pending?'Sending…':'Submit Enquiry'}</button><p className="text-sm text-slate-600">We use these details to respond to your enquiry. You can also email <a className="underline" href="mailto:contact@branogreen.com">contact@branogreen.com</a>.</p></form>;
}
