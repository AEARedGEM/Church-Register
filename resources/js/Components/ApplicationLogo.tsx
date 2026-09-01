import { logo } from '@/images';
import { SVGAttributes } from 'react';

export default function ApplicationLogo(props: SVGAttributes<SVGElement>) {
    return (
         <div className="flex items-center space-x-2 text-center justify-center">
            <img src={logo} className="h-10 mx-auto" />
            <span className="text-xl font-bold text-stone-600 dark:text-white">APGA Worldwide</span>
        </div>
    );
}
