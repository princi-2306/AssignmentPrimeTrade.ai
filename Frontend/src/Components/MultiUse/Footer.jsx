import { assets } from "../../assets/assets";

const LINKS = [
    {
        title: "Company",
        items: ["Top", "Message Us", "Privacy Policy", "FAQ"],
    },
    {
        title: "Communities",
        items: ["LinkedIn", "Github", "Instagram", "Twitter"],
        Logo: [assets.LinkedInLogo, assets.GithubLogo, assets.InstagramLogo, assets.TwitterLogo]
    },
];
const currentYear = new Date().getFullYear();

function Footer() {
    return (
        <footer className="relative bg-white rounded-md shadow-md px-1">
            <div className=" w-full max-w-7xl px-8 py-6">
                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                    <h5 className="text-lg font-semibold text-gray-800 mb-6">
                        <img className="w-48 h-16" src="/MainLogo.svg" alt="" />
                        <a target='_blank' href="https://github.com/THUNDERBLD" className="my-4 relative inline-block text-md group">
                            <span className="relative z-0 block px-5 py-2 overflow-hidden font-medium leading-tight text-gray-800 transition-colors duration-300 ease-out border-2 border-gray-900 rounded-lg group-hover:text-white">
                                <span className="absolute inset-0 w-full h-full px-5 py-1 rounded-lg bg-gray-50"></span>
                                <span className="absolute left-0 w-60 h-40 -ml-2 transition-all duration-300 origin-top-right -rotate-90 -translate-x-full translate-y-12 bg-gray-900 group-hover:-rotate-180 ease"></span>
                                <span className="relative">Priyanshi Maurya</span>
                            </span>
                        </a>
                        <p className="px-1 pt-2 text-lg">
                            TeraFortress: Your Tech, Our Stronghold.
                        </p>
                    </h5>
                    <div className="grid grid-cols-2 gap-4">
                        {LINKS.map(({ title, items, Logo }) => (
                            <ul key={title}>
                                <li className="mb-3 font-medium text-gray-600 text-xl">{title}</li>
                                {items.map((link) => (
                                    <li key={link}>
                                        <a
                                            href={`#${link}`}
                                            className="block py-1.5 text-base text-gray-700 hover:text-gray-900 transition-colors"
                                        >
                                            {link}
                                        </a>
                                    </li>
                                ))}
                            </ul>
                        ))}
                    </div>
                </div>
                <div className="mt-12 flex flex-col items-center justify-center border-t w-full border-gray-200 py-4 md:flex-row md:justify-between">
                    <p className="text-sm text-gray-700 text-center mb-4 md:mb-0">
                        &copy; {currentYear} <a href="https://github.com/princi-2306" className="font-medium text-blue-600">TeraFortress</a>. All Rights Reserved.
                    </p>
                </div>
            </div>
        </footer>
    );
}
export default Footer;