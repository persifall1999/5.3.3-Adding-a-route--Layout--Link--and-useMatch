import type { SVGProps } from "react";

interface IconProps extends SVGProps<SVGSVGElement> {
    size?: number | string;
}

export const ProfileIcon = ({ size = 18, ...props }: IconProps) => {
    return (
        <svg 
            width={size} 
            height={size} 
            viewBox="0 0 20 20" 
            fill="none" 
            xmlns="http://www.w3.org/2000/svg"
            {...props}
        >
            <path 
                d="M3.9 16.6a4 4 0 0 1 3.9-2.85h4a4 4 0 0 1 3.8 2.86M18.8 9.8a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-6-2a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" 
                stroke="currentColor" 
                strokeWidth="1.5" 
                strokeLinecap="round" 
                strokeLinejoin="round"
            />
        </svg>
    );
};

export const GeoIcon = ({ size = 16, ...props }: IconProps) => {
    return (
        <svg 
            width={size} 
            height={size} 
            viewBox="0 0 13 15" 
            fill="none" 
            xmlns="http://www.w3.org/2000/svg"
            {...props}
        >
            <path 
                d="M6.33 8.33a2 2 0 1 0 0-4 2 2 0 0 0 0 4Z" 
                stroke="#0F0F10" 
                strokeOpacity="0.3" 
                strokeWidth="2" 
                strokeLinecap="round" 
                strokeLinejoin="round"
            />
            <path 
                d="m10.1 10.1-2.82 2.83a1.32 1.32 0 0 1-1.87 0L2.56 10.1A5.06 5.06 0 0 1 1.4 4.3 5 5 0 0 1 9.3 1.9a5.06 5.06 0 0 1 .8 8.2Z" 
                stroke="#0F0F10" 
                strokeOpacity="0.3" 
                strokeWidth="2" 
                strokeLinecap="round" 
                strokeLinejoin="round"
            />
        </svg>
    );
};

export const SearchIcon = ({ size = 16, ...props }: IconProps) => {
    return (
        <svg 
            width={size} 
            height={size} 
            viewBox="0 0 14 14" 
            fill="none" 
            xmlns="http://www.w3.org/2000/svg"
            {...props}
        >
            <path 
                d="m13 13-4-4M10.33 5.67a4.67 4.67 0 1 1-9.33 0 4.67 4.67 0 0 1 9.33 0Z" 
                stroke="#0F0F10" 
                strokeOpacity="0.3" 
                strokeWidth="2" 
                strokeLinecap="round" 
                strokeLinejoin="round"
            />
        </svg>
    );
};

export const PlusIcon = ({ size = 15, ...props }: IconProps) => {
    return (
        <svg 
            width={size} 
            height={size} 
            viewBox="0 0 15 15" 
            fill="none" 
            stroke="currentColor" 
            strokeWidth="2" 
            strokeLinecap="round" 
            strokeLinejoin="round"
            {...props}
        >

            <line x1="7.5" y1="0" x2="7.5" y2="15"></line>

            <line x1="0" y1="7.5" x2="15" y2="7.5"></line>
        </svg>
    );
};