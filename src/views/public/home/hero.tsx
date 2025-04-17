import { JSX } from "react";
import { Link } from "react-router";

import logo from "@/assets/img/logo.png"

import { routes } from "@/data";
import { Button } from "@/components/ui/button";

const Hero = (): JSX.Element => {
    return (
        <section className="relative isolate overflow-hidden">
            <svg
                aria-hidden="true"
                className="absolute inset-0 -z-10 size-full stroke-white/10 [mask-image:radial-gradient(100%_100%_at_top_right,white,transparent)]"
            >
                <defs>
                    <pattern
                        x="50%"
                        y={-1}
                        id="983e3e4c-de6d-4c3f-8d64-b9761d1534cc"
                        width={200}
                        height={200}
                        patternUnits="userSpaceOnUse"
                    >
                        <path d="M.5 200V.5H200" fill="none" />
                    </pattern>
                </defs>
                <svg x="50%" y={-1} className="overflow-visible fill-gray-800/20">
                    <path
                        d="M-200 0h201v201h-201Z M600 0h201v201h-201Z M-400 600h201v201h-201Z M200 800h201v201h-201Z"
                        strokeWidth={0}
                    />
                </svg>
                <rect fill="url(#983e3e4c-de6d-4c3f-8d64-b9761d1534cc)" width="100%" height="100%" strokeWidth={0} />
            </svg>
            <div
                aria-hidden="true"
                className="absolute top-10 left-[calc(50%-4rem)] -z-10 transform-gpu blur-3xl sm:left-[calc(50%-18rem)] lg:top-[calc(50%-30rem)] lg:left-48 xl:left-[calc(50%-24rem)]"
            >
                <div
                    style={{
                        clipPath:
                            'polygon(73.6% 51.7%, 91.7% 11.8%, 100% 46.4%, 97.4% 82.2%, 92.5% 84.9%, 75.7% 64%, 55.3% 47.5%, 46.5% 49.4%, 45% 62.9%, 50.3% 87.2%, 21.3% 64.1%, 0.1% 100%, 5.4% 51.1%, 21.4% 63.9%, 58.9% 0.2%, 73.6% 51.7%)',
                    }}
                    className="aspect-1108/632 w-[69.25rem] bg-linear-to-r from-[#80caff] to-[#4f46e5] opacity-20"
                />
            </div>
            <div className="mx-auto max-w-7xl px-6 pt-10 lg:flex lg:px-8 lg:pt-40">
                <div className="mx-auto max-w-2xl shrink-0 lg:mx-0 lg:pt-8">
                    <img
                        src={logo}
                        alt="PassBeer"
                        className="h-20"
                    />
                    {/* <img
                        alt="Your Company"
                        src="https://tailwindui.starxg.com/plus-assets/img/logos/mark.svg?color=indigo&shade=500"
                        className="h-11"
                    /> */}
                    <div className="mt-24 sm:mt-32 lg:mt-16">
                        <a href="#" className="inline-flex space-x-6">
                            <span className="rounded-full bg-yellow-600/10 px-3 py-1 text-sm/6 font-semibold text-yellow-600 ring-1 ring-yellow-600/20 ring-inset">
                                What's new
                            </span>
                            <span className="inline-flex items-center space-x-2 text-sm/6 font-medium text-gray-300">
                                <span>La v1.0 est en ligne !</span>
                            </span>
                        </a>
                    </div>
                    <h1 className="mt-10 text-5xl font-semibold tracking-tight text-pretty text-white sm:text-7xl">
                        Découvrez PassBeer
                    </h1>
                    <p className="mt-8 text-lg font-medium text-pretty text-gray-400 sm:text-xl/8">
                        PassBeer est un gestionnaire de mots de passe sécurisé et gratuit. Il vous permet de stocker vos mots de passe en toute sécurité et de les synchroniser sur tous vos appareils.
                    </p>
                    <div className="mt-10 flex items-center gap-x-6">
                        <Link
                            to={routes.publicRoutes.SIGNIN}
                        >
                            <Button>
                                Se connecter
                            </Button>
                        </Link>
                    </div>
                </div>
                <div className="mx-auto mt-16 flex max-w-2xl sm:mt-24 lg:mt-0 lg:mr-0 lg:ml-10 lg:max-w-none lg:flex-none xl:ml-32">
                    <div className="max-w-3xl flex-none sm:max-w-5xl lg:max-w-none">
                        <img
                            alt="App screenshot"
                            src="https://tailwindui.starxg.com/plus-assets/img/component-images/dark-project-app-screenshot.png"
                            width={2432}
                            height={1442}
                            className="w-[76rem] rounded-md bg-white/5 ring-1 shadow-2xl ring-white/10"
                        />
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Hero;