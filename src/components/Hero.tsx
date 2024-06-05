import TypingAnimation from './animations/typingAnimation';
import CompressFeatures from './animations/compressFeatures';
// import AnimationDevice from './AnimationDevice';
import {Vortex} from './animations/vortex';
import NumberTicker from './animations/numberTicker';
// import ShinyButton from './Button/shiny-button';
import { PhoneIcon, PlayCircleIcon } from '@heroicons/react/20/solid'
// import TypewriterEffectSmooth from './Animation/typewriter-effect';
// import { Box } from '@mui/material';
import { useTranslation } from "react-i18next";


export default function Hero() {
  const { t } = useTranslation();

    const projects = [
        {
          title: t("hero.products.analytics.name"),
          description: t("hero.products.analytics.description"),
          link: "/analytics",
        },
        {
          title: t("hero.products.engagement.name"),
          description: t("hero.products.engagement.description"),
          link: "/engagement",
        },
        {
          title: t("hero.products.security.name"),
          description: t("hero.products.security.description"),
          link: "/security",
        },
        {
          title: t("hero.products.integrations.name"),
          description: t("hero.products.integrations.description"),
          link: "/integrations",
        },
        {
          title: t("hero.products.automations.name"),
          description: t("hero.products.automations.description"),
          link: "/automations",
        },
    ];

  return (
    <div id="hero-page" className="flex items-center justify-center z-15">
      <div className="text-center p-4 px-0 bg-black pt-2.5 w-full">
        <div className="mx-auto rounded-md  h-[30rem] overflow-hidden w-full">   
            <Vortex
                backgroundColor="black"
                className="flex items-center flex-col justify-center px-2 md:px-10 py-4 w-full h-full"
            >
                {/* <TypingAnimation words="Découvrez un service innovant avec des fonctionnalités exceptionnelles pour optimiser votre activité avec HarmonyStaccvk-React." color="white"/> */}
                <div className='md:w-5/6 sm:w-full lg:w-3/5'>
                  <TypingAnimation
                    className="text-4xl font-bold text-white dark:text-black"
                    text={t("hero.title")}
                  />
                  {/* <TypewriterEffectSmooth words={words} /> */}
                </div>
                <p className="text-white text-sm md:text-2xl max-w-xl mt-6 text-center">
                  {t("hero.description")}
                </p>
                <p className="whitespace-pre-wrap text-8xl font-medium tracking-tighter text-black dark:text-white">
                  <NumberTicker value={100}/>
                </p>
                <div className="flex flex-col sm:flex-row items-center gap-4 mt-6">
                    <button className="px-4 py-2 bg-transparent hover:bg-transparent transition duration-200 rounded-lg text-white shadow-[0px_2px_0px_0px_#FFFFFF40_inset] border-2 border-white">
                        <div className='flex items-center justify-center'>
                            <PlayCircleIcon className="w-4 h-4 mr-2" />
                            {t("hero.watchDemo")}
                        </div>
                    </button>
                    {/* <ShinyButton text="Shiny Button" /> */}
                    <button className="px-4 py-2  text-white ">
                    <div className='flex items-center justify-center'>
                        <PhoneIcon className="w-4 h-4 mr-2" />
                        {t("hero.contactSales")}
                    </div>
                    </button>
                </div>
            </Vortex>
          </div>
          
          <div className="max-w-5xl mx-auto px-8 bg-black w-screen">
              <CompressFeatures items={projects} />
          </div>
        </div>
    </div>
  )
}

