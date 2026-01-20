/* eslint-disable react/prop-types */
import {Link} from "react-router-dom"

const DropdownFirst = (props) => {
    return (
        <div>
            <div className="absolute bg-gray-100 dropdown-menu pt-7 z-10 -translate-x-36 transition-all duration-1000 shadow-lg">
                <div className="flex flex-col gap-2 w-36 py-3 px-5 bg-slate-50 text-gray-600 rounded transition-all duration-1000">
                    <Link to={`/${props.toFirst}`} className="cursor-pointer hover:text-black hover: hover:border-b-2">
                        <p>{props.selectFirst}</p>
                    </Link>
                    <Link to={`/${props.toSecond}`} className="cursor-pointer hover:text-black hover:border-b-2">
                        <p>{props.selectSecond}</p>
                    </Link>
                    <Link to={`/${props.toThird}`} className="cursor-pointer hover:text-black hover:border-b-2">
                        <p>{props.selectThird}</p>
                    </Link>
                    <Link to={`/${props.toFourth}`} className="cursor-pointer hover:text-black hover:border-b-2">
                        <p>{props.selectFourth}</p>
                    </Link>
                    <Link to={`/${props.toFifth}`} className="cursor-pointer hover:text-black hover:border-b-2">
                        <p>{props.selectFifth}</p>
                    </Link>
                    <Link to={`/${props.toSixth}`} className="cursor-pointer hover:text-black hover:border-b-2">
                        <p>{props.selectSixth}</p>
                    </Link>
                </div>
            </div>
        </div>
    )
}

export default DropdownFirst
