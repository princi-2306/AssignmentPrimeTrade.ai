import { Line } from "rc-progress"
import { assets } from "../../assets/assets"

const RatingLineBar = (props) => {
    return (
        <div className="py-3 px-6 border shadow rounded-md">
            <div className="py-1 flex justify-between">
                <p className="px-4 text-gray-700 text-lg">{props.name}</p>
                <div className="flex gap-1">
                    <p className="text-xl pb-2">{props.rating}</p>
                    <img className="text-lg pb-3" src={assets.StarsFilled} alt="" />
                </div>
            </div>
            <div className="">
                <Line className="w-64" percent={props.percentage} strokeWidth={3} strokeColor="#65a765" />
            </div>
        </div>
    )
}

export default RatingLineBar