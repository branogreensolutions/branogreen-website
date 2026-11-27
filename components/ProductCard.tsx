import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
export default function ProductCard({slug,name,short,specs,image}:{slug:string,name:string,short:string,specs:string[],image:string}){
 return <Link href={`/agro-export/${slug}`} className="card overflow-hidden transition hover:-translate-y-1 hover:shadow-xl">
  <img src={image} alt={`${name} supplied by Brano Green Solutions`} className="h-52 w-full object-cover" loading="lazy"/>
  <div className="p-7"><h3 className="text-2xl font-black">{name}</h3><p className="mt-3 text-slate-600">{short}</p><ul className="mt-5 space-y-2 text-sm text-slate-600">{specs.slice(0,3).map(x=><li key={x}>✓ {x}</li>)}</ul><span className="mt-6 inline-flex items-center gap-2 font-black text-emerald-700">View specifications <ArrowRight size={16}/></span></div>
 </Link>
}
