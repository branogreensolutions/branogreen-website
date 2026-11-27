import type { Metadata } from 'next';
import './globals.css';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import JsonLd from '@/components/JsonLd';

export const metadata: Metadata = {
  metadataBase: new URL('https://branogreen.com'),
  title: { default: 'Brano Green Solutions Limited | Agriculture, Technology & Clean Energy', template: '%s | Brano Green Solutions' },
  description: 'Brano Green Solutions Limited is a Nigerian company operating across agro commodity export, information technology and renewable energy.',
  openGraph: { title: 'Brano Green Solutions Limited', description: 'Agriculture. Technology. Clean Energy.', url: 'https://branogreen.com', siteName: 'Brano Green Solutions Limited', locale: 'en_NG', type: 'website' },
  twitter: { card: 'summary_large_image', title: 'Brano Green Solutions Limited', description: 'Agriculture. Technology. Clean Energy.' },
  alternates: { canonical: '/' },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return <html lang="en"><body><JsonLd data={{'@context':'https://schema.org','@type':'Organization',name:'Brano Green Solutions Limited',url:'https://branogreen.com',email:'contact@branogreen.com',telephone:'+2348055111105',address:{'@type':'PostalAddress',addressCountry:'NG',addressRegion:'Kano'}}}/><Header />{children}<Footer /></body></html>;
}
