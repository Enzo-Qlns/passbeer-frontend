import { JSX } from "react";
import { useNavigate } from "react-router";
import { ChevronDownIcon } from "lucide-react";

import { Button } from "@/components/ui/button";
import { ContentLayout } from "@/components/private/content-layout";

import { routes } from "@/data";

const MonComptePage = (): JSX.Element => {
    const navigate = useNavigate();
    return (
        <ContentLayout>
            <div className="divide-y divide-white/5">
                <div className="pb-8 sm:px-6 lg:px-8">
                    <div className="flex items-start md:col-span-2">
                        <Button
                            type="button"
                            variant={"outline"}
                            onClick={() => {
                                navigate(routes.privateRoutes.LOGOUT);
                            }}
                        >
                            Se déconnecter
                        </Button>
                    </div>
                </div>

                <div className="grid max-w-7xl grid-cols-1 gap-x-8 gap-y-10 px-4 py-16 sm:px-6 md:grid-cols-3 lg:px-8">
                    <div>
                        <h2 className="text-base/7 font-semibold">Personal Information</h2>
                        <p className="mt-1 text-sm/6 text-gray-400">Use a permanent address where you can receive mail.</p>
                    </div>

                    <form className="md:col-span-2">
                        <div className="grid grid-cols-1 gap-x-6 gap-y-8 sm:max-w-xl sm:grid-cols-6">
                            <div className="col-span-full flex items-center gap-x-8">
                                <img
                                    alt=""
                                    src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                                    className="size-24 flex-none rounded-lg bg-gray-800 object-cover"
                                />
                                <div>
                                    <Button
                                        type="button"
                                        variant={"outline"}
                                    >
                                        Change avatar
                                    </Button>
                                    <p className="mt-2 text-xs/5 text-gray-400">JPG, GIF or PNG. 1MB max.</p>
                                </div>
                            </div>

                            <div className="sm:col-span-3">
                                <label htmlFor="first-name" className="block text-sm/6 font-medium">
                                    First name
                                </label>
                                <div className="mt-2">
                                    <input
                                        id="first-name"
                                        name="first-name"
                                        type="text"
                                        autoComplete="given-name"
                                        className="block w-full rounded-md bg-white/5 px-3 py-1.5 text-base outline-1 -outline-offset-1 outline-white/10 placeholder:text-gray-500 focus:outline-2 focus:-outline-offset-2 focus:outline-yellow-600 sm:text-sm/6"
                                    />
                                </div>
                            </div>

                            <div className="sm:col-span-3">
                                <label htmlFor="last-name" className="block text-sm/6 font-medium">
                                    Last name
                                </label>
                                <div className="mt-2">
                                    <input
                                        id="last-name"
                                        name="last-name"
                                        type="text"
                                        autoComplete="family-name"
                                        className="block w-full rounded-md bg-white/5 px-3 py-1.5 text-base outline-1 -outline-offset-1 outline-white/10 placeholder:text-gray-500 focus:outline-2 focus:-outline-offset-2 focus:outline-yellow-600 sm:text-sm/6"
                                    />
                                </div>
                            </div>

                            <div className="col-span-full">
                                <label htmlFor="email" className="block text-sm/6 font-medium">
                                    Email address
                                </label>
                                <div className="mt-2">
                                    <input
                                        id="email"
                                        name="email"
                                        type="email"
                                        autoComplete="email"
                                        className="block w-full rounded-md bg-white/5 px-3 py-1.5 text-base outline-1 -outline-offset-1 outline-white/10 placeholder:text-gray-500 focus:outline-2 focus:-outline-offset-2 focus:outline-yellow-600 sm:text-sm/6"
                                    />
                                </div>
                            </div>

                            <div className="col-span-full">
                                <label htmlFor="username" className="block text-sm/6 font-medium">
                                    Username
                                </label>
                                <div className="mt-2">
                                    <div className="flex items-center rounded-md bg-white/5 pl-3 outline-1 -outline-offset-1 outline-white/10 focus-within:outline-2 focus-within:-outline-offset-2 focus-within:outline-yellow-600">
                                        <div className="shrink-0 text-base text-gray-500 select-none sm:text-sm/6">example.com/</div>
                                        <input
                                            id="username"
                                            name="username"
                                            type="text"
                                            placeholder="janesmith"
                                            className="block min-w-0 grow bg-transparent py-1.5 pr-3 pl-1 text-base placeholder:text-gray-500 focus:outline-none sm:text-sm/6"
                                        />
                                    </div>
                                </div>
                            </div>

                            <div className="col-span-full">
                                <label htmlFor="timezone" className="block text-sm/6 font-medium">
                                    Timezone
                                </label>
                                <div className="mt-2 grid grid-cols-1">
                                    <select
                                        id="timezone"
                                        name="timezone"
                                        className="col-start-1 row-start-1 w-full appearance-none rounded-md bg-white/5 py-1.5 pr-8 pl-3 text-base outline-1 -outline-offset-1 outline-white/10 *:bg-gray-800 focus:outline-2 focus:-outline-offset-2 focus:outline-yellow-600 sm:text-sm/6"
                                    >
                                        <option>Pacific Standard Time</option>
                                        <option>Eastern Standard Time</option>
                                        <option>Greenwich Mean Time</option>
                                    </select>
                                    <ChevronDownIcon
                                        aria-hidden="true"
                                        className="pointer-events-none col-start-1 row-start-1 mr-2 size-5 self-center justify-self-end text-gray-400 sm:size-4"
                                    />
                                </div>
                            </div>
                        </div>

                        <div className="mt-8 flex">
                            <Button
                                type="submit"
                            >
                                Save
                            </Button>
                        </div>
                    </form>
                </div>

                <div className="grid max-w-7xl grid-cols-1 gap-x-8 gap-y-10 px-4 py-16 sm:px-6 md:grid-cols-3 lg:px-8">
                    <div>
                        <h2 className="text-base/7 font-semibold">Change password</h2>
                        <p className="mt-1 text-sm/6 text-gray-400">Update your password associated with your account.</p>
                    </div>

                    <form className="md:col-span-2">
                        <div className="grid grid-cols-1 gap-x-6 gap-y-8 sm:max-w-xl sm:grid-cols-6">
                            <div className="col-span-full">
                                <label htmlFor="current-password" className="block text-sm/6 font-medium">
                                    Current password
                                </label>
                                <div className="mt-2">
                                    <input
                                        id="current-password"
                                        name="current_password"
                                        type="password"
                                        autoComplete="current-password"
                                        className="block w-full rounded-md bg-white/5 px-3 py-1.5 text-base outline-1 -outline-offset-1 outline-white/10 placeholder:text-gray-500 focus:outline-2 focus:-outline-offset-2 focus:outline-yellow-600 sm:text-sm/6"
                                    />
                                </div>
                            </div>

                            <div className="col-span-full">
                                <label htmlFor="new-password" className="block text-sm/6 font-medium">
                                    New password
                                </label>
                                <div className="mt-2">
                                    <input
                                        id="new-password"
                                        name="new_password"
                                        type="password"
                                        autoComplete="new-password"
                                        className="block w-full rounded-md bg-white/5 px-3 py-1.5 text-base outline-1 -outline-offset-1 outline-white/10 placeholder:text-gray-500 focus:outline-2 focus:-outline-offset-2 focus:outline-yellow-600 sm:text-sm/6"
                                    />
                                </div>
                            </div>

                            <div className="col-span-full">
                                <label htmlFor="confirm-password" className="block text-sm/6 font-medium">
                                    Confirm password
                                </label>
                                <div className="mt-2">
                                    <input
                                        id="confirm-password"
                                        name="confirm_password"
                                        type="password"
                                        autoComplete="new-password"
                                        className="block w-full rounded-md bg-white/5 px-3 py-1.5 text-base outline-1 -outline-offset-1 outline-white/10 placeholder:text-gray-500 focus:outline-2 focus:-outline-offset-2 focus:outline-yellow-600 sm:text-sm/6"
                                    />
                                </div>
                            </div>
                        </div>

                        <div className="mt-8 flex">
                            <Button
                                type="submit"
                            >
                                Save
                            </Button>
                        </div>
                    </form>
                </div>

                <div className="grid max-w-7xl grid-cols-1 gap-x-8 gap-y-10 px-4 py-16 sm:px-6 md:grid-cols-3 lg:px-8">
                    <div>
                        <h2 className="text-base/7 font-semibold">Log out other sessions</h2>
                        <p className="mt-1 text-sm/6 text-gray-400">
                            Please enter your password to confirm you would like to log out of your other sessions across all of
                            your devices.
                        </p>
                    </div>

                    <form className="md:col-span-2">
                        <div className="grid grid-cols-1 gap-x-6 gap-y-8 sm:max-w-xl sm:grid-cols-6">
                            <div className="col-span-full">
                                <label htmlFor="logout-password" className="block text-sm/6 font-medium">
                                    Your password
                                </label>
                                <div className="mt-2">
                                    <input
                                        id="logout-password"
                                        name="password"
                                        type="password"
                                        autoComplete="current-password"
                                        className="block w-full rounded-md bg-white/5 px-3 py-1.5 text-base outline-1 -outline-offset-1 outline-white/10 placeholder:text-gray-500 focus:outline-2 focus:-outline-offset-2 focus:outline-yellow-600 sm:text-sm/6"
                                    />
                                </div>
                            </div>
                        </div>

                        <div className="mt-8 flex">
                            <Button
                                type="submit"
                            >
                                Log out other sessions
                            </Button>
                        </div>
                    </form>
                </div>

                <div className="grid max-w-7xl grid-cols-1 gap-x-8 gap-y-10 px-4 py-16 sm:px-6 md:grid-cols-3 lg:px-8">
                    <div>
                        <h2 className="text-base/7 font-semibold">Delete account</h2>
                        <p className="mt-1 text-sm/6 text-gray-400">
                            No longer want to use our service? You can delete your account here. This action is not reversible.
                            All information related to this account will be deleted permanently.
                        </p>
                    </div>

                    <form className="flex items-start md:col-span-2">
                        <Button
                            type="submit"
                            variant={"destructive"}
                        >
                            Yes, delete my account
                        </Button>
                    </form>
                </div>
            </div>
        </ContentLayout>
    )
}

export default MonComptePage;