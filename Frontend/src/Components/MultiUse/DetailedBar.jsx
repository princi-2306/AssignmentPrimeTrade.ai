import DetailedButton from './DetailedButton'
import { assets } from '../../assets/assets'

const DetailedBar = () => {
  return (
    <>
    <div className="flex justify-evenly flex-wrap -mx-6 rounded-md -px-6 my-6 bg-gray-50 shadow-sm">
      <DetailedButton
      icon={assets.Laptop}
      Name="LAPTOPS"
      to="Store"
      selectFirst="Asus"
      selectSecond="Dell"
      selectThird="Lenovo"
      selectFourth="HP"
      selectFifth="Acer"
      selectSixth="Infinix"
      />
      <DetailedButton
      icon={assets.Devices}
      Name="DEVICES"
      to="Store"
      selectFirst="Keyboards"
      selectSecond="Mouse"
      selectThird="Headphone"
      selectFourth="Monitor"
      selectFifth="Speaker"
      selectSixth="Cables"
      />
      <DetailedButton
      icon={assets.ServicesLogo}
      Name="SERVICES"
      to="Services"
      selectFirst="Laptop Repairs"
      selectSecond="Printer Repairs"
      selectThird="Windows Uploads"
      selectFourth="CCTV Setup/Repair"
      selectFifth="SSD Insertion"
      selectSixth="Build Setup"
      />
      <DetailedButton
      icon={assets.Printer}
      Name="PRINTERS"
      to="Store"
      selectFirst="CP Plus"
      selectSecond="SONY"
      selectThird="HP"
      selectFourth="Canon"
      selectFifth="BOSCH"
      selectSixth="Epson"
      />
      <DetailedButton
      icon={assets.Parts}
      Name="PARTS"
      to="Store"
      selectFirst="Ram"
      selectSecond="Hard Disk"
      selectThird="Processor"
      selectFourth="SSD"
      selectFifth="MotherBoarder"
      selectSixth="Graphic Card"
      />
    </div>
    </>
  )
}

export default DetailedBar
