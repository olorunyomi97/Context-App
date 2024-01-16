import React from 'react'

interface CategoryProps {
    svg?: any;
    text: string;
    heroText?: string | undefined;
    name: string;
    heroCategory: string;
    setHeroCategory: React.Dispatch<React.SetStateAction<string>>;
    setHeroText: any;
    reset?: any;
}

const HeroCategory = ({setHeroCategory, setHeroText, heroCategory, svg, text, heroText, name, reset}: CategoryProps) => {
    return (
        <div
            className={`flex items-center gap-x-2 px-6 py-4 ${heroCategory === 'ocean_freight' ? 'rounded-tl-[10px]' : ''} ${heroCategory === 'tracking' ? '' : ''}  ${heroCategory === text ? "bg-[#3AB44A]" : "bg-transparent"} pb-4 w-fit cursor-pointer border-r border-solid border-[#F6F6F6]`}
            onClick={() => {
                setHeroCategory(text);
                reset()
                setHeroText(heroText)
            }}
        >
            <div>
                {svg}
            </div>
            <p className={`text-sm font-light ${heroCategory === text ? 'text-white' : 'black-text-3 hidden sm:block'}`}>{name}</p>
        </div>
    )
}

export default HeroCategory;