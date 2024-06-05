import { useState } from 'react'
import { Link } from 'react-router-dom';
import {
  Dialog,
  DialogPanel,
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
  Popover,
  PopoverButton,
  PopoverGroup,
  PopoverPanel,
  Transition,
  Menu,
  MenuButton,
  MenuItems,
  MenuItem,
} from '@headlessui/react'

import {
  ArrowPathIcon,
  Bars3Icon,
  ChartPieIcon,
  CursorArrowRaysIcon,
  FingerPrintIcon,
  SquaresPlusIcon,
  XMarkIcon,
} from '@heroicons/react/24/outline'

// import { Divider } from '@mui/material';

import { ChevronDownIcon, PhoneIcon, PlayCircleIcon, GlobeAltIcon } from '@heroicons/react/20/solid'

import {cn} from '../utils/cn'

import ModalCustom from '../components/modal';
import FormSignIn from '../components/forms/signIn';
import FormSignUp from '../components/forms/signUp';

import { useAuth } from '../contexts/authContext';
import { useTranslation } from "react-i18next";

export default function Header() {
    const { t } = useTranslation();
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
    const { 
        user, 
        handleChangeLanguage, 
        login, 
        logout,
    } = useAuth()!;

    const products = [
        { name: t('header.products.analytics.name'), description: t('header.products.analytics.description'), to: '/', icon: ChartPieIcon },
        { name: t('header.products.engagement.name'), description: t('header.products.engagement.description'), to: '/', icon: CursorArrowRaysIcon },
        { name: t('header.products.security.name'), description: t('header.products.security.description'), to: '/', icon: FingerPrintIcon },
        { name: t('header.products.integrations.name'), description: t('header.products.integrations.description'), to: '/', icon: SquaresPlusIcon },
        { name: t('header.products.automations.name'), description: t('header.products.automations.description'), to: '/', icon: ArrowPathIcon },
      ]
      
      const languages = [
          { name: t('header.languages.fr'), shortcut: 'fr', action: '/', icon: "flag-fr.png" },
          { name: t('header.languages.en'), shortcut: 'en', action: '/', icon: "flag-uk.png" },
      ]
      
      const callsToAction = [
        { name: t('header.callsToAction.watchDemo.name'), to: '/', icon: PlayCircleIcon },
        { name: t('header.callsToAction.contactSales.name'), to: '/', icon: PhoneIcon },
      ]
      
      const userNavigation = [
          { name: t('header.userNavigation.profile'), href: '/profile', key: 'profile' },
          { name: t('header.userNavigation.settings'), href: '/settings', key: 'settings' },
          { name: t('header.userNavigation.messages'), href: '/messages', key: 'messages' },
          { name: t('header.userNavigation.signOut'), href: '/', key: 'signOut' },
          { name: t('header.userNavigation.signIn'), href: '/', key: 'signIn' },
          { name: t('header.userNavigation.signUp'), href: '/', key: 'signUp' },
      ]

    return (
        <header className="bg-white w-full top-0 mb-100 h-[90px] sticky z-50 shadow-lg">
            <nav className="mx-auto flex max-w-7xl items-center justify-between p-6 lg:px-8" aria-label="Global">
                <div className="flex lg:flex-1">
                <Link to="/" className="-m-1.5 p-1.5">
                    <span className="sr-only">Your Company</span>
                    <img className="h-10 w-auto" src="./logo.png" alt="logo-header" />
                </Link>
                </div>
                <div className="flex lg:hidden">
                <button
                    type="button"
                    className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700"
                    onClick={() => setMobileMenuOpen(true)}
                >
                    <span className="sr-only">Open main menu</span>
                    <Bars3Icon className="h-8 w-8" aria-hidden="true" />
                </button>
                </div>
                <PopoverGroup className="hidden lg:flex lg:gap-x-12">
                    <Popover className="relative">
                        <PopoverButton className="flex items-center gap-x-1 text-sm font-semibold leading-6 text-gray-900">
                        {t('header.productsName')}
                        <ChevronDownIcon className="h-5 w-5 flex-none text-gray-400" aria-hidden="true" />
                        </PopoverButton>

                        <Transition
                        enter="transition ease-out duration-200"
                        enterFrom="opacity-0 translate-y-1"
                        enterTo="opacity-100 translate-y-0"
                        leave="transition ease-in duration-150"
                        leaveFrom="opacity-100 translate-y-0"
                        leaveTo="opacity-0 translate-y-1"
                        >
                        <PopoverPanel className="absolute -left-8 top-full z-50 mt-3 w-screen max-w-md overflow-hidden rounded-3xl bg-white shadow-lg ring-1 ring-gray-900/5">
                            <div className="p-4">
                            {products.map((item) => (
                                <div
                                key={item.name}
                                className="group relative flex items-center gap-x-6 rounded-lg p-4 text-sm leading-6 hover:bg-gray-50"
                                >
                                <div className="flex h-11 w-11 flex-none items-center justify-center rounded-lg bg-gray-50 group-hover:bg-white">
                                    {item.icon && <item.icon className="h-6 w-6 text-gray-600 group-hover:text-indigo-600" aria-hidden="true" />}
                                </div>
                                <div className="flex-auto">
                                    <Link to={item.to || '/'} className="block font-semibold text-gray-900">
                                    {item.name}
                                    <span className="absolute inset-0" />
                                    </Link>
                                    <p className="mt-1 text-gray-600">{item.description}</p>
                                </div>
                                </div>
                            ))}
                            </div>
                            <div className="grid grid-cols-2 divide-x divide-gray-900/5 bg-gray-50">
                            {callsToAction.map((item) => (
                                <Link
                                    key={item.name}
                                    to={item.to}
                                    className="flex items-center justify-center gap-x-2.5 p-3 text-sm font-semibold leading-6 text-gray-900 hover:bg-gray-100"
                                >
                                <item.icon className="h-5 w-5 flex-none text-gray-400" aria-hidden="true" />
                                    {item.name}
                                </Link>
                            ))}
                            </div>
                        </PopoverPanel>
                        </Transition>
                    </Popover>
                    
                    <Link to="/" className="text-sm font-semibold leading-6 text-gray-900">
                        {t('header.features')}
                    </Link>
                    <Link to="/" className="text-sm font-semibold leading-6 text-gray-900">
                        {t('header.account')}
                    </Link>
                    <Link to="/" className="text-sm font-semibold leading-6 text-gray-900">
                        {t('header.company')}
                    </Link>
                    <Popover className="relative">
                    {({ open, close }) => (
                        <>
                            <PopoverButton className="flex items-center gap-x-1 text-sm font-semibold leading-6 text-gray-900">
                            {t('header.lang')}
                            <GlobeAltIcon className="h-5 w-5 flex-none text-gray-400" aria-hidden="true" />
                            <ChevronDownIcon className="h-5 w-5 flex-none text-gray-400" aria-hidden="true" />
                            </PopoverButton>

                            {open && (
                                <Transition
                                    enter="transition ease-out duration-200"
                                    enterFrom="opacity-0 translate-y-1"
                                    enterTo="opacity-100 translate-y-0"
                                    leave="transition ease-in duration-150"
                                    leaveFrom="opacity-100 translate-y-0"
                                    leaveTo="opacity-0 translate-y-1"
                                >
                                        <PopoverPanel className="absolute -left-8 top-full z-50 mt-3 w-screen max-w-md overflow-hidden rounded-3xl bg-white shadow-lg ring-1 ring-gray-900/5">
                                            <div className="p-4">
                                            {languages.map((item) => (
                                                <div
                                                key={item.name}
                                                className="group relative flex items-center gap-x-6 rounded-lg p-4 text-sm leading-6 hover:bg-gray-50"
                                                onClick={() => { handleChangeLanguage(item.shortcut); close(); }}
                                                >
                                                <div className="flex h-11 w-11 flex-none items-center justify-center rounded-lg bg-gray-50 group-hover:bg-white">
                                                    {item.icon && <img src={item.icon} alt={item.name} className="h-6 w-6 text-gray-600 group-hover:text-indigo-600" aria-hidden="true" />}
                                                </div>
                                                <div className="flex-auto">
                                                    <button className="block font-semibold text-gray-900">
                                                    {item.name}
                                                    <span className="absolute inset-0" />
                                                    </button>
                                                </div>
                                                </div>
                                            ))}
                                            </div>
                                        </PopoverPanel>
                                </Transition>
                            )}
                        </>
                    )}
                    </Popover>
                </PopoverGroup>

                { !user ? (
                    <div className="hidden lg:flex lg:flex-1 lg:justify-end flex gap-x-2">
                        <ModalCustom buttonTitle={t('header.userNavigation.signIn')} component={"Link"} className="text-sm font-semibold leading-6 text-gray-900">
                            <FormSignIn formAction={login} />
                        </ModalCustom>
                        <ModalCustom buttonTitle={t('header.userNavigation.signUp')} component={"Link"} className="text-sm font-semibold leading-6 text-gray-900">
                            <FormSignUp 
                            // formAction={login} 
                            />
                        </ModalCustom>
                        {/* <button onClick={() => {console.log('sign in');
                        }} className="text-sm font-semibold leading-6 text-gray-900">
                            Sign in <span aria-hidden="true">&rarr;</span>
                        </button> */}
                    </div>
                ) : (
                    <div className="hidden lg:flex lg:flex-1 lg:justify-end">
                    {/* Profile dropdown */}
                    <Menu as="div" className="relative ml-3">
                        <div>
                            <MenuButton className="relative flex max-w-xs items-center rounded-full  text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 ">
                            <span className="absolute -inset-1.5" />
                            <span className="sr-only">Open user menu</span>
                            <img className="h-10 w-10 rounded-full" src={user && (user.imageUrl? user.imageUrl : '/defaultprofileMen.png')} alt="" />
                            </MenuButton>
                        </div>
                        <Transition
                            enter="transition ease-out duration-100"
                            enterFrom="transform opacity-0 scale-95"
                            enterTo="transform opacity-100 scale-100"
                            leave="transition ease-in duration-75"
                            leaveFrom="transform opacity-100 scale-100"
                            leaveTo="transform opacity-0 scale-95"
                        >
                            <MenuItems  className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none z-50">

                            {userNavigation.map((item) => {
                                if ((user && item.key === "signIn") || (!user && item.key === "signOut")) {
                                    return null;
                                }
                                return (
                                    <MenuItem key={item.name}>
                                        {({ focus }) => (
                                            <Link
                                                to={item.href}
                                                onClick={(item.key === "signOut" && user) ? logout : () => {}}
                                                className={cn(
                                                    focus ? 'bg-gray-100' : '',
                                                    'block px-4 py-2 text-sm text-gray-700'
                                                )}
                                            >
                                                {item.name}
                                            </Link>
                                        )}
                                    </MenuItem>
                                );
                            })}
                            </MenuItems>
                        </Transition>
                    </Menu>
                </div>                
                )}
                

            </nav>
            <Dialog className="lg:hidden" open={mobileMenuOpen} onClose={setMobileMenuOpen}>
                <div className="fixed inset-0 z-10" />
                <DialogPanel className="fixed inset-y-0 right-0 z-50 w-full overflow-y-auto bg-white px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
                <div className="flex items-center justify-between" onClick={() => setMobileMenuOpen(false)}>
                    <Link to="/" className="-m-1.5 p-1.5">
                    <span className="sr-only">Your Company</span>
                    <img
                        className="h-8 w-auto"
                        src="./logo.png"
                        alt="logo-mobile"
                    />
                    </Link>
                    <button
                        type="button"
                        className="-m-2.5 rounded-md p-2.5 text-gray-700"
                        onClick={() => setMobileMenuOpen(false)}
                    >
                    <span className="sr-only">Close menu</span>
                        <XMarkIcon className="h-8 w-8" aria-hidden="true" />
                    </button>
                </div>
                <div className="mt-6 flow-root">
                    <div className="-my-6 divide-y divide-gray-500/10">
                        <div className="space-y-2 py-6">
                        <Disclosure as="div" className="-mx-3">
                            {({ open }) => (
                                <>
                                    <DisclosureButton className="flex w-full items-center justify-between rounded-lg py-2 pl-3 pr-3.5 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50">
                                        Language
                                        {/* <img src="./logo.png" alt={""} className="h-6 w-6 text-gray-600 group-hover:text-indigo-600" aria-hidden="true" /> */}
                                        <ChevronDownIcon
                                            className={cn(open ? 'rotate-180' : '', 'h-5 w-5 flex-none')}
                                            aria-hidden="true"
                                        />
                                    </DisclosureButton>
                                    <DisclosurePanel className="mt-2 space-y-2">
                                        {[...languages].map((item) => (
                                        <div key={item.name} className="group relative flex items-center gap-x-6 rounded-lg text-sm leading-6 hover:bg-gray-50">
                                            <div className="flex h-11 w-11 flex-none items-center justify-center rounded-lg bg-gray-50 group-hover:bg-white">
                                                {item.icon && <img src={item.icon} alt={item.name} className="h-6 w-6 text-gray-600 group-hover:text-indigo-600" aria-hidden="true" />}
                                            </div>
                                            <Link
                                                key={item.name}
                                                to={item.action || '/'}
                                                onClick={() => handleChangeLanguage(item.shortcut)}
                                                className="block rounded-lg py-2 pl-6 pr-3 text-sm font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                                            >
                                                {item.name}
                                            </Link>
                                        </div>

                                        ))}
                                    </DisclosurePanel>
                                </>
                            )}
                            </Disclosure>
                            <Disclosure as="div" className="-mx-3">
                            {({ open }) => (
                                <>
                                    <DisclosureButton className="flex w-full items-center justify-between rounded-lg py-2 pl-3 pr-3.5 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50">
                                        {t('header.productsName')}
                                        <ChevronDownIcon
                                            className={cn(open ? 'rotate-180' : '', 'h-5 w-5 flex-none')}
                                            aria-hidden="true"
                                        />
                                    </DisclosureButton>
                                    <DisclosurePanel className="mt-2 space-y-2">
                                        {[...products, ...callsToAction].map((item) => (
                                        <Link
                                            key={item.name}
                                            to={item.to || '/'}
                                            onClick={() => setMobileMenuOpen(false)}
                                            className="block rounded-lg py-2 pl-6 pr-3 text-sm font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                                        >
                                            {item.name}
                                        </Link>
                                        ))}
                                    </DisclosurePanel>
                                </>
                            )}
                            </Disclosure>

                            <Link
                                to="/"
                                onClick={() => setMobileMenuOpen(false)}
                                className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                            >
                                {t('header.features')}
                            </Link>
                            <Link
                                to="/"
                                onClick={() => setMobileMenuOpen(false)}
                                className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                            >
                                {t('header.account')}
                            </Link>
                            <Link
                                to="/"
                                onClick={() => setMobileMenuOpen(false)}
                                className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                            >
                                {t('header.company')}
                            </Link>
                        </div>
                        {userNavigation.map((item, index) => {
                            // Si l'utilisateur est connecté et l'item est "signIn", ne rien retourner
                            if (user && item.key === 'signIn') {
                                return null;
                            }
                            // Si l'utilisateur n'est pas connecté et l'item est "Sign out", ne rien retourner
                            if (!user && item.key === 'signOut') {
                                return null;
                            }
                            // Si l'item est "signIn" et l'utilisateur n'est pas connecté, afficher la modal de connexion
                            if (item.key === "signIn" && !user) {
                                return (
                                    <ModalCustom key={index} buttonTitle={t('header.userNavigation.signIn')}  component={"Link"} className="-mx-3 block rounded-lg px-3 py-2.5 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50">
                                        <FormSignIn formAction={login} />
                                    </ModalCustom>
                                );
                            }
                            if(item.key === "signUp" && !user) {
                                return (
                                    <ModalCustom key={index} buttonTitle={t('header.userNavigation.signUp')}  component={"Link"} className="-mx-3 block rounded-lg px-3 py-2.5 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50">
                                        <FormSignUp 
                                        // formAction={login} 
                                        />
                                    </ModalCustom>
                                );
                            }
                            // Pour tous les autres cas, retourner un lien
                            return (
                                <Link
                                    key={index}
                                    onClick={() => { item.key === "signOut" ? logout() : setMobileMenuOpen(false); }}
                                    to={item.href}
                                    className="-mx-3 block rounded-lg px-3 py-2.5 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                                >
                                    {item.name}
                                </Link>
                            );
                        })}
                    </div>
                </div>
                </DialogPanel>
            </Dialog>
            {/* <Divider sx={{marginBottom: '3rem'}} /> */}
        </header>
    )
}
