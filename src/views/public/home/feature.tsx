import { JSX } from "react";
import {
    AlertTriangle,
    Cloud,
    Key,
    Lock,
    MousePointer,
    Share2,
} from "lucide-react";

const features = [
    {
        name: 'Stockage sécurisé',
        description:
            'Vos mots de passe sont chiffrés de bout en bout et stockés en toute sécurité, accessibles uniquement par vous.',
        icon: Lock,
    },
    {
        name: 'Générateur de mots de passe',
        description:
            'Générez des mots de passe forts et uniques en un clic pour renforcer la sécurité de vos comptes.',
        icon: Key,
    },
    {
        name: 'Remplissage automatique',
        description:
            'Remplissez automatiquement vos identifiants sur vos sites et applications préférés en toute simplicité.',
        icon: MousePointer,
    },
    {
        name: 'Partage sécurisé',
        description:
            'Partagez des accès sans jamais révéler vos mots de passe grâce à un système de partage chiffré.',
        icon: Share2,
    },
    {
        name: 'Surveillance des fuites',
        description:
            'Recevez des alertes si l’un de vos mots de passe apparaît dans une fuite de données.',
        icon: AlertTriangle,
    },
    {
        name: 'Accès multiplateforme',
        description:
            'Retrouvez vos mots de passe sur tous vos appareils, où que vous soyez.',
        icon: Cloud,
    },
]

const Feature = (): JSX.Element => {
    return (
        <section className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="mx-auto max-w-2xl lg:text-center">
                <h2 className="text-base/7 font-semibold text-yellow-600">Deploy faster</h2>
                <p className="mt-2 text-4xl font-semibold tracking-tight text-pretty text-white sm:text-5xl lg:text-balance">
                    Tout ce dont vous avez besoin pour gérer vos mots de passe
                </p>
            </div>
            <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-none">
                <dl className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-16 lg:max-w-none lg:grid-cols-3">
                    {features.map((feature) => (
                        <div key={feature.name} className="flex flex-col">
                            <dt className="flex items-center gap-x-3 text-base/7 font-semibold text-white">
                                <feature.icon aria-hidden="true" className="size-5 flex-none text-yellow-600" />
                                {feature.name}
                            </dt>
                            <dd className="mt-4 flex flex-auto flex-col text-base/7 text-gray-300">
                                <p className="flex-auto">{feature.description}</p>
                            </dd>
                        </div>
                    ))}
                </dl>
            </div>
        </section>
    )
}

export default Feature;