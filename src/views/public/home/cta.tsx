import { routes } from "@/data";
import { JSX } from "react";
import { Link } from "react-router";

const Cta = (): JSX.Element => {
    return (
        <section className="mx-auto max-w-7xl py-24 sm:px-6 sm:py-32 lg:px-8">
            <div className="relative isolate overflow-hidden bg-gray-900 px-6 py-24 text-center shadow-2xl sm:rounded-3xl sm:px-16">
                <h2 className="text-4xl font-semibold tracking-tight text-balance text-white sm:text-5xl">
                    Gérer vos mots de passe n’a jamais été aussi simple
                </h2>
                <p className="mx-auto mt-6 max-w-xl text-lg/8 text-pretty text-gray-300">
                    PassBeer vous permet de stocker, générer et partager vos mots de passe en toute sécurité
                </p>
                <div className="mt-10 flex items-center justify-center gap-x-6">
                    <Link
                        to={routes.publicRoutes.SIGNUP}
                        className="rounded-md bg-white px-3.5 py-2.5 text-sm font-semibold text-gray-900 shadow-xs hover:bg-gray-100 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
                    >
                        Commencer dès maintenant
                    </Link>
                </div>
                <svg
                    viewBox="0 0 1024 1024"
                    aria-hidden="true"
                    className="absolute top-1/2 left-1/2 -z-10 size-[64rem] -translate-x-1/2 [mask-image:radial-gradient(closest-side,white,transparent)]"
                >
                    <circle r={512} cx={512} cy={512} fill="url(#827591b1-ce8c-4110-b064-7cb85a0b1217)" fillOpacity="0.7" />
                    <defs>
                        <radialGradient id="827591b1-ce8c-4110-b064-7cb85a0b1217">
                            <stop stopColor="#7775D6" />
                            <stop offset={1} stopColor="#E935C1" />
                        </radialGradient>
                    </defs>
                </svg>
            </div>
        </section>
    )
}

export default Cta;