/* eslint-disable react/prop-types */
import { useState } from 'react'
import { Link } from 'react-router-dom'
import { assets } from '../../assets/assets'
import DropdownFirst from './DropdownFirst'

const DetailedButton = (props) => {
    const [hoverAppear, setHoverAppear] = useState(false);

    return (
        <div>
            <div
                onMouseEnter={() => setHoverAppear(true)}
                onMouseLeave={() => setHoverAppear(false)}
                className='py-5 flex items-center justify-between font-medium z-10 hover:text-black'>
                <Link
                    to={`/${props.to}`}
                    className="relative inline-block text-lg group hover:text-black">
                    <span
                        className="relative z-10 block px-5 py-2 overflow-hidden font-medium leading-tight text-gray-800 transition-colors duration-300 ease-out rounded-lg group-hover:text-black">
                        <span className="absolute inset-0 w-full h-full px-5 py-2 rounded-lg hover:text-black"></span>
                        <span className="absolute left-0 w-60 h-48 -ml-2 transition-all duration-300 origin-top-right -rotate-90 -translate-x-full translate-y-16 bg-slate-50 group-hover:-rotate-180 ease hover:text-black"></span>
                        <span className="relative flex hover:text-black">
                            <img className='text-white' src={props.icon} alt="" />
                            <p className="px-2">{props.Name}</p>
                            <img src={assets.DropdownIcon} alt="" />
                        </span>
                    </span>
                    <span className="absolute bottom-0 right-0 w-full h-10 -mb-1 -mr-1 transition-all duration-200 ease-linear rounded-lg group-hover:mb-0 group-hover:mr-0" data-rounded="rounded-lg"></span>
                </Link>
                {hoverAppear && (
                    <DropdownFirst
                        // eslint-disable-next-line react/prop-types
                        selectFirst={props.selectFirst}
                        selectSecond={props.selectSecond}
                        selectThird={props.selectThird}
                        selectFourth={props.selectFourth}
                        selectFifth={props.selectFifth}
                        selectSixth={props.selectSixth}
                        toFirst="Store"
                        toSecond="Store"
                        toThird="Store"
                        toFourth="Store"
                        toFifth="Store"
                        toSixth="Store"
                    />
                )}
            </div>
        </div>
    );
}

export default DetailedButton;
