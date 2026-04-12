import { Link } from 'react-router-dom';
import { Logo } from '@/components/icons';
import { Phone, MessageCircle, Camera, MessageSquare, Users, Mail } from 'lucide-react';

const companyLinks = [{
  name: 'Careers',
  href: '#'
}, {
  name: 'About Us',
  href: '#'
}, {
  name: 'For Partners',
  href: '#'
}, {
  name: 'Terms',
  href: '#'
}, {
  name: 'Privacy Policy',
  href: '#'
}];
const partnerSites = [{
  name: 'realestate.com.au',
  href: '#'
}, {
  name: 'realtor.com',
  href: '#'
}, {
  name: '99.co',
  href: '#'
}];
const exploreLinks = [{
  name: 'News',
  href: '#'
}, {
  name: 'Home Loans',
  href: '#'
}, {
  name: 'Sitemap',
  href: '#'
}, {
  name: 'International',
  href: '#'
}];
const socialLinks = [
  { name: 'Phone', href: '#', icon: Phone },
  { name: 'WhatsApp', href: '#', icon: MessageCircle },
  { name: 'Instagram', href: '#', icon: Camera },
  { name: 'Twitter', href: '#', icon: MessageSquare },
  { name: 'Facebook', href: '#', icon: Users },
  { name: 'Mail', href: '#', icon: Mail }
];
export function Footer() {
  return <footer className="bg-gray-900 text-gray-400">
            <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                    <div>
                        <h3 className="text-sm font-semibold text-gray-300 tracking-wider uppercase">Company</h3>
                        <ul className="mt-4 space-y-2">
                            {companyLinks.map(link => <li key={link.name}>
                                    <Link to={link.href} className="text-base hover:text-white">
                                        {link.name}
                                    </Link>
                                </li>)}
                        </ul>
                    </div>
                    <div>
                        <h3 className="text-sm font-semibold text-gray-300 tracking-wider uppercase">Partner Sites</h3>
                        <ul className="mt-4 space-y-2">
                             {partnerSites.map(link => <li key={link.name}>
                                    <Link to={link.href} className="text-base hover:text-white">
                                        {link.name}
                                    </Link>
                                </li>)}
                        </ul>
                    </div>
                    <div>
                         <h3 className="text-sm font-semibold text-gray-300 tracking-wider uppercase">Explore</h3>
                        <ul className="mt-4 space-y-2">
                            {exploreLinks.map(link => <li key={link.name}>
                                    <Link to={link.href} className="text-base hover:text-white">
                                        {link.name}
                                    </Link>
                                </li>)}
                        </ul>
                    </div>
                     <div className="mt-8 md:mt-0">
                         <h3 className="text-sm font-semibold text-gray-300 tracking-wider uppercase mb-4">Contact Us</h3>
                        <div className="flex space-x-6">
                           {socialLinks.map(social => <Link key={social.name} to={social.href} className="hover:text-white">
                                    <span className="sr-only">{social.name}</span>
                                    <social.icon className="h-6 w-6" aria-hidden="true" />
                                </Link>)}
                        </div>
                    </div>
                </div>
                <div className="mt-12 border-t border-gray-800 pt-8 flex flex-col md:flex-row items-center justify-between">
                    <div className="flex items-center justify-center md:justify-start">
                        <Logo className="h-8 w-auto text-primary" />
                        <span className="ml-3 text-lg font-bold text-white">Mana Nivas</span>
                    </div>
                    <p className="mt-4 md:mt-0 text-base text-center md:text-left">
                        &copy; {new Date().getFullYear()} Mananivas, Inc. All rights reserved.
                    </p>
                </div>
            </div>
        </footer>;
}