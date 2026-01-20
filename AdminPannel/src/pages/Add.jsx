import { useState } from 'react';
import Title from '../Components/MultiUse/Title';
import { assets } from '../assets/assets';
import axios from 'axios';
import { backendUrl } from '../App';
import { toast } from 'react-toastify';

const Add = ({ token }) => {
    const [itemType, setItemType] = useState('Laptop');
    const [formData, setFormData] = useState({
        images: [],
        name: '',
        description: '',
        price: '',
        category: itemType,
        brand: '',
        condition: '',
        firstHand: '',
        secondHand: '',
        type: '',
        isAvailable: '',
        bestSeller: '',
        // Initialize specs as empty object to store all specification values
        specs: {}
    });
    const [errors, setErrors] = useState({});

    const validateForm = () => {
        const newErrors = {};

        // Check if at least one image is uploaded
        if (formData.images.length === 0) {
            newErrors.images = 'Please upload at least one image';
        }

        // Required field validation
        const requiredFields = {
            name: 'Name',
            description: 'Description',
            price: 'Price',
            brand: 'Brand',
            condition: 'Condition',
            type: 'Type',
            isAvailable: 'Availability',
            bestSeller: 'Best Seller status'
        };

        Object.entries(requiredFields).forEach(([field, label]) => {
            if (!formData[field] || formData[field].trim() === '') {
                newErrors[field] = `${label} is required`;
            }
        });

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleImageUpload = (e, index) => {
        const file = e.target.files[0];
        if (file) {
            const newImages = [...formData.images];
            newImages[index] = file;
            setFormData(prev => ({
                ...prev,
                images: newImages
            }));
        }
    };

    const handleInputChange = (field, value) => {
        setFormData(prev => {
            let updatedData = {
                ...prev,
                [field]: value
            };

            if (field === 'condition') {
                updatedData.firstHand = value === 'firstHand';
                updatedData.secondHand = value === 'secondHand';
            }

            return updatedData;
        });

        if (errors[field]) {
            setErrors(prev => ({
                ...prev,
                [field]: ''
            }));
        }
    };


    const handleSubmit = async (e) => {
        e.preventDefault();
        if (validateForm()) {
            const loadingToast = toast.loading('Adding product, please wait...');
            try {
                let endpoint = '';
                switch (itemType) {
                    case "Laptop":
                        {
                            const formDataToSend = new FormData();
                            // Append all non-file fields
                            formDataToSend.append('name', formData.name);
                            formDataToSend.append('description', formData.description);
                            formDataToSend.append('price', formData.price);
                            formDataToSend.append('brand', formData.brand);
                            formDataToSend.append('category', formData.category);
                            formDataToSend.append('firstHand', formData.firstHand);
                            formDataToSend.append('secondHand', formData.secondHand);
                            formDataToSend.append('type', formData.type);
                            formDataToSend.append('isAvailable', formData.isAvailable);
                            formDataToSend.append('bestSeller', formData.bestSeller || false);
                            // specs
                            formDataToSend.append('ram', formData.specs.ram);
                            formDataToSend.append('storage', formData.specs.storage);
                            formDataToSend.append('processor', formData.specs.processor);
                            formDataToSend.append('graphicsCard', formData.specs.graphicscard);
                            formDataToSend.append('display', formData.specs.display);
                            formDataToSend.append('battery', formData.specs.battery);
                            formDataToSend.append('weight', formData.specs.weight);
                            // Append images (if they exist)
                            if (formData.images[0]) formDataToSend.append('productImages1', formData.images[0]);
                            if (formData.images[1]) formDataToSend.append('productImages2', formData.images[1]);
                            if (formData.images[2]) formDataToSend.append('productImages3', formData.images[2]);
                            if (formData.images[3]) formDataToSend.append('productImages4', formData.images[3]);
                            if (formData.images[4]) formDataToSend.append('productImages5', formData.images[4]);

                            endpoint = "/productLaptops/addProductLaptop";
                            const response = await axios.post(
                                backendUrl + endpoint,
                                formDataToSend,
                                {
                                    headers: {
                                        Authorization: `Bearer ${token}`
                                    },
                                    'Content-Type': 'multipart/form-data', // Important, if dont include this thne the images are not going from this form to backend
                                }
                            );
                            console.log('Form submitted successfully:', response.data);
                        }
                        break;
                    case "Device":
                        {
                            const formDataToSend = new FormData();
                            // Append all non-file fields
                            formDataToSend.append('name', formData.name);
                            formDataToSend.append('description', formData.description);
                            formDataToSend.append('price', formData.price);
                            formDataToSend.append('brand', formData.brand);
                            formDataToSend.append('category', formData.category);
                            formDataToSend.append('firstHand', formData.firstHand);
                            formDataToSend.append('secondHand', formData.secondHand);
                            formDataToSend.append('type', formData.type);
                            formDataToSend.append('isAvailable', formData.isAvailable);
                            formDataToSend.append('bestSeller', formData.bestSeller || false);
                            // specs
                            formDataToSend.append('switchType', formData.specs.switchtype);
                            formDataToSend.append('layout', formData.specs.layout);
                            formDataToSend.append('backlight', formData.specs.backlight);
                            formDataToSend.append('pollingRate', formData.specs.pollingrate);
                            formDataToSend.append('battery', formData.specs.battery);
                            formDataToSend.append('graphicsCard', formData.specs.graphicscard);
                            formDataToSend.append('weight', formData.specs.weight);
                            formDataToSend.append('buttons', formData.specs.buttons);
                            formDataToSend.append('connectivity', formData.specs.connectivity);
                            formDataToSend.append('sensor', formData.specs.sensor);
                            formDataToSend.append('driverSize', formData.specs.driversize);
                            formDataToSend.append('noiseCancellation', formData.specs.noisecancellation);
                            formDataToSend.append('resolution', formData.specs.resolution);
                            formDataToSend.append('refreshRate', formData.specs.refreshrate);
                            formDataToSend.append('power', formData.specs.power);
                            formDataToSend.append('frequencyRange', formData.specs.frequencyrange);
                            formDataToSend.append('dataTransfer', formData.specs.datatransfer);
                            // Append images (if they exist)
                            if (formData.images[0]) formDataToSend.append('productDeviceImages1', formData.images[0]);
                            if (formData.images[1]) formDataToSend.append('productDeviceImages2', formData.images[1]);
                            if (formData.images[2]) formDataToSend.append('productDeviceImages3', formData.images[2]);
                            if (formData.images[3]) formDataToSend.append('productDeviceImages4', formData.images[3]);
                            if (formData.images[4]) formDataToSend.append('productDeviceImages5', formData.images[4]);

                            endpoint = "/productDevice/addProductDevice";
                            const response = await axios.post(
                                backendUrl + endpoint,
                                formDataToSend,
                                {
                                    headers: {
                                        Authorization: `Bearer ${token}`
                                    },
                                    'Content-Type': 'multipart/form-data', // Important, if dont include this thne the images are not going from this form to backend
                                }
                            );
                            console.log('Form submitted successfully:', response.data);
                        }
                        break;
                    case "Parts":
                        {
                            const formDataToSend = new FormData();
                            // Append all non-file fields
                            formDataToSend.append('name', formData.name);
                            formDataToSend.append('description', formData.description);
                            formDataToSend.append('price', formData.price);
                            formDataToSend.append('brand', formData.brand);
                            formDataToSend.append('category', formData.category);
                            formDataToSend.append('firstHand', formData.firstHand);
                            formDataToSend.append('secondHand', formData.secondHand);
                            formDataToSend.append('type', formData.type);
                            formDataToSend.append('isAvailable', formData.isAvailable);
                            formDataToSend.append('bestSeller', formData.bestSeller || false);
                            // specs
                            formDataToSend.append('cores', formData.specs.cores);
                            formDataToSend.append('chipset', formData.specs.chipset);
                            formDataToSend.append('threads', formData.specs.threads);
                            formDataToSend.append('baseClock', formData.specs.baseclock);
                            formDataToSend.append('maxMemory', formData.specs.maxmemory);
                            formDataToSend.append('boostClock', formData.specs.boostclock);
                            formDataToSend.append('socket', formData.specs.socket);
                            formDataToSend.append('cache', formData.specs.cache);
                            formDataToSend.append('tdp', formData.specs.tdp);
                            formDataToSend.append('vram', formData.specs.vram);
                            formDataToSend.append('coreClock', formData.specs.coreclock);
                            formDataToSend.append('powerConnectors', formData.specs.powerconnectors);
                            formDataToSend.append('interfaces', formData.specs.interfaces);
                            formDataToSend.append('speed', formData.specs.speed);
                            formDataToSend.append('readSpeed', formData.specs.readspeed);
                            formDataToSend.append('endurance', formData.specs.endurance);
                            formDataToSend.append('writeSpeed', formData.specs.writespeed);
                            formDataToSend.append('memorySlots', formData.specs.memoryslots);
                            formDataToSend.append('capacity', formData.specs.capacity);
                            formDataToSend.append('wattage', formData.specs.wattage);
                            formDataToSend.append('modular', formData.specs.modular);
                            formDataToSend.append('expansionSlots', formData.specs.expansionslots);
                            formDataToSend.append('noiseLevel', formData.specs.noiselevel);
                            formDataToSend.append('pumpSpeed', formData.specs.pumpspeed);
                            formDataToSend.append('connectors', formData.specs.connectors);
                            // Append images (if they exist)
                            if (formData.images[0]) formDataToSend.append('productPartImages1', formData.images[0]);
                            if (formData.images[1]) formDataToSend.append('productPartImages2', formData.images[1]);
                            if (formData.images[2]) formDataToSend.append('productPartImages3', formData.images[2]);
                            if (formData.images[3]) formDataToSend.append('productPartImages4', formData.images[3]);
                            if (formData.images[4]) formDataToSend.append('productPartImages5', formData.images[4]);
                        
                            endpoint = "/productPart/addProductPart";
                            const response = await axios.post(
                                backendUrl + endpoint,
                                formDataToSend,
                                {
                                    headers: {
                                        Authorization: `Bearer ${token}`
                                    },
                                    'Content-Type': 'multipart/form-data', // Important, if dont include this thne the images are not going from this form to backend
                                }
                            );
                            console.log('Form submitted successfully:', response.data);
                        }
                        break;
                    case "PrinterCCTV":
                        {
                            const formDataToSend = new FormData();
                            // Append all non-file fields
                            formDataToSend.append('name', formData.name);
                            formDataToSend.append('description', formData.description);
                            formDataToSend.append('price', formData.price);
                            formDataToSend.append('brand', formData.brand);
                            formDataToSend.append('category', formData.category);
                            formDataToSend.append('firstHand', formData.firstHand);
                            formDataToSend.append('secondHand', formData.secondHand);
                            formDataToSend.append('type', formData.type);
                            formDataToSend.append('isAvailable', formData.isAvailable);
                            formDataToSend.append('bestSeller', formData.bestSeller || false);
                            // specs
                            formDataToSend.append('printTechnology', formData.specs.printtechnology);
                            formDataToSend.append('printSpeed', formData.specs.printspeed);
                            formDataToSend.append('connectivity', formData.specs.connectivity);
                            formDataToSend.append('paperSizes', formData.specs.papersizes);
                            formDataToSend.append('duplexPrinting', formData.specs.duplexprinting);
                            formDataToSend.append('inkCapacity', formData.specs.inkcapacity);
                            formDataToSend.append('weight', formData.specs.weight);
                            formDataToSend.append('resolution', formData.specs.resolution);
                            formDataToSend.append('lens', formData.specs.lens);
                            formDataToSend.append('storage', formData.specs.storage);
                            formDataToSend.append('nightVision', formData.specs.nightvision);
                            formDataToSend.append('weatherproof', formData.specs.weatherproof);
                            formDataToSend.append('fieldOfView', formData.specs.fieldofview);
                            // Append images (if they exist)
                            if (formData.images[0]) formDataToSend.append('productPrinterCCTVImages1', formData.images[0]);
                            if (formData.images[1]) formDataToSend.append('productPrinterCCTVImages2', formData.images[1]);
                            if (formData.images[2]) formDataToSend.append('productPrinterCCTVImages3', formData.images[2]);
                            if (formData.images[3]) formDataToSend.append('productPrinterCCTVImages4', formData.images[3]);
                            if (formData.images[4]) formDataToSend.append('productPrinterCCTVImages5', formData.images[4]);
                        
                            endpoint = "/productPrinterCCTV/addProductPrinterCCTV";
                            const response = await axios.post(
                                backendUrl + endpoint,
                                formDataToSend,
                                {
                                    headers: {
                                        Authorization: `Bearer ${token}`
                                    },
                                    'Content-Type': 'multipart/form-data', // Important, if dont include this thne the images are not going from this form to backend
                                }
                            );
                            console.log('Form submitted successfully:', response.data);
                        }
                        break;
                    default:
                        throw new Error("Invalid item type");
                }
                 // Dismiss the loading toast
                toast.dismiss(loadingToast);
                // Add success handling here (e.g., reset form, show success message)
                toast.success("The Product is created successfully")
            } catch (error) {
                console.error('Error submitting form:', error);
                // Dismiss the loading toast
                toast.dismiss(loadingToast);

                toast.error("Error while creating product: please check the name of the product is not similar to the already existing product or check other things");
            }
        } else {
            // Scroll to the first error
            const firstError = document.querySelector('.error-message');
            if (firstError) {
                firstError.scrollIntoView({ behavior: 'smooth', block: 'center' });
            }
        }
    };

    const [customValues, setCustomValues] = useState({});
    const [showInputs, setShowInputs] = useState({});
    const [showTypesHelp, setShowTypesHelp] = useState(false);

    // Define specs for different item types
    const itemTypeSpecs = {
        'Laptop': {
            'Ram': ['4GB', '8GB', '16GB', '32GB'],
            'Storage': ['256GB SSD', '512GB SSD', '1TB SSD', '1TB HDD', '2TB HDD'],
            'Processor': [
                'Intel Core i3', 'Intel Core i5', 'Intel Core i7', 'Intel Core i9',
                'AMD Ryzen 3', 'AMD Ryzen 5', 'AMD Ryzen 7', 'AMD Ryzen 9'
            ],
            'Display': [
                '13.3" (1920 x 1080)', '14" (1920 x 1080)',
                '15.6" (1920 x 1080)', '15.6" (2560 x 1440)',
                '17.3" (1920 x 1080)', '17.3" (2560 x 1440)'
            ],
            'graphicsCard': [
                'Intel UHD Graphics', 'NVIDIA GTX 1650', 'NVIDIA RTX 3050',
                'NVIDIA RTX 3060', 'NVIDIA RTX 3070', 'AMD Radeon RX 6600M',
                'AMD Radeon RX 6700M'
            ],
            'Battery': ['3-cell (45Wh)', '4-cell (54Wh)', '6-cell (71Wh)', '8-cell (90Wh)'],
            'Weight': ['1.3 kg', '1.5 kg', '1.8 kg', '2.0 kg', '2.3 kg', '2.5 kg']
        },
        'Parts': {
            'Cores': ['4', '6', '8', '10', '12', '16'],
            'Chipset': ['Z690', 'B660', 'X570', 'B550'],
            'Threads': ['8', '12', '16', '20', '24', '32'],
            'baseClock': ['2.5 GHz', '3.0 GHz', '3.5 GHz', '4.0 GHz'],
            'MmxMemory': ['64GB', '128GB', '256GB'],
            'boostClock': ['4.0 GHz', '4.5 GHz', '5.0 GHz', '5.2 GHz'],
            'Socket': ['LGA 1700', 'AM4', 'AM5'],
            'Cache': ['16MB', '32MB', '64MB', '128MB'],
            'TDP': ['65W', '95W', '105W', '125W'],
            'VRAM': ['4GB', '8GB', '12GB', '16GB'],
            'coreClock': ['1500 MHz', '1750 MHz', '2000 MHz'],
            'powerConnectors': ['6-pin', '8-pin', '8-pin + 6-pin'],
            'Interfaces': ['PCIe 3.0', 'PCIe 4.0', 'PCIe 5.0'],
            'Speed': ['3200MHz', '3600MHz', '4000MHz'],
            'readSpeed': ['3500 MB/s', '7000 MB/s'],
            'writeSpeed': ['3000 MB/s', '6000 MB/s'],
            'Endurance': ['600 TBW', '1200 TBW'],
            'memorySlots': ['2', '4', '8'],
            'Capacity': ['650W', '750W', '850W', '1000W'],
            'Wattage': ['650W', '750W', '850W', '1000W'],
            'Modular': ['Full', 'Semi', 'Non-modular'],
            'expansionSlots': ['2', '3', '4'],
            'noiseLevel': ['20 dB', '25 dB', '30 dB'],
            'pumpSpeed': ['2000 RPM', '2500 RPM', '3000 RPM'],
            'Connectors': ['24-pin ATX', '8-pin EPS', 'SATA']
        },
        "Device": {
            "switchType": ["Mechanical", "Membrane", "Optical", "Scissor", "Butterfly"],
            "layout": ["Full-size", "TKL", "60%", "65%", "75%", "96%", "Ergonomic"],
            "backlight": ["RGB", "Single Color", "None", "Per-key RGB", "Zone RGB"],
            "pollingRate": [125, 250, 500, 1000, 2000, 4000, 8000],
            "weight": ["Ultra-light (<60g)", "Light (60-80g)", "Medium (81-100g)", "Heavy (101-120g)", "Ultra-heavy (>120g)"],
            "buttons": [2, 3, 4, 5, 6, 7, 8, 12],
            "connectivity": ["Wired", "Wireless 2.4GHz", "Bluetooth", "Hybrid", "USB-C", "USB-A"],
            "sensor": ["Optical", "Laser", "PWM3399", "PMW3389", "PMW3370", "TrueMove Air", "HERO 25K"],
            "battery": ["250mAh", "500mAh", "750mAh", "1000mAh", "1500mAh", "2000mAh", "3000mAh"],
            "driverSize": ["20mm", "30mm", "40mm", "50mm", "53mm", "60mm"],
            "noiseCancellation": ["None", "Passive", "Active", "Hybrid", "Adaptive"],
            "resolution": ["1920x1080", "2560x1440", "3440x1440", "3840x2160", "5120x1440", "7680x4320"],
            "refreshRate": [60, 75, 100, 120, 144, 165, 240, 360, 500],
            "panelType": ["IPS", "VA", "TN", "OLED", "Mini-LED", "QD-OLED"],
            "power": ["450W", "550W", "650W", "750W", "850W", "1000W", "1200W", "1600W"],
            "frequencyRange": ["20Hz-20kHz", "5Hz-40kHz", "4Hz-40kHz", "10Hz-35kHz", "15Hz-25kHz"],
            "dataTransfer": ["USB 2.0 (480 Mbps)", "USB 3.0 (5 Gbps)", "USB 3.1 (10 Gbps)", "USB 3.2 (20 Gbps)", "Thunderbolt 3 (40 Gbps)", "Thunderbolt 4 (40 Gbps)"]
        },
        "PrinterCCTV": {
            "printTechnology": ["Laser", "Inkjet", "Thermal", "Dot Matrix", "Dye-Sublimation", "LED", "Solid Ink"],
            "printSpeed": ["8 ppm", "15 ppm", "20 ppm", "30 ppm", "40 ppm", "50 ppm", "65 ppm", "75 ppm"],
            "connectivity": ["USB", "Ethernet", "Wi-Fi", "Bluetooth", "Wi-Fi Direct", "NFC", "Cloud Print", "AirPrint"],
            "paperSizes": ["A6", "A5", "A4", "A3", "Letter", "Legal", "Tabloid", "4x6", "5x7", "8x10"],
            "duplexPrinting": ["Manual", "Automatic", "None", "Auto (2-sided)", "Single-sided only"],
            "weight": ["Ultra-Light (< 5kg)", "Light (5-10kg)", "Medium (10-15kg)", "Heavy (15-20kg)", "Industrial (> 20kg)"],
            "inkCapacity": ["Standard (3ml)", "High Yield (10ml)", "Extra High Yield (20ml)", "Ultra High Yield (30ml)", "Tank System (70ml)"],
            "resolution": ["1200x1200 dpi", "2400x1200 dpi", "4800x1200 dpi", "5760x1440 dpi", "9600x2400 dpi"],
            "lens": ["18-55mm f/3.5-5.6", "24-70mm f/2.8", "70-200mm f/2.8", "50mm f/1.8", "35mm f/1.4", "85mm f/1.4", "16-35mm f/2.8", "100-400mm f/4.5-5.6"],
            "storage": ["32GB", "64GB", "128GB", "256GB", "512GB", "1TB", "Dual Card Slots"],
            "nightVision": ["None", "IR LED", "Starlight", "Thermal", "Digital Night Vision", "Low-Light Enhancement"],
            "weatherproof": ["Not Rated", "Weather-Resistant", "IP54", "IP65", "IP67", "IP68", "All-Weather"],
            "fieldOfView": ["60°", "90°", "120°", "150°", "170°", "180°", "360°"]
        }
    };

    const handleSelectChange = (spec, value) => {
        setShowInputs((prev) => ({ ...prev, [spec]: value === 'custom' }));
    
        // Convert the spec name to match the backend's expected format
        const formattedSpec = spec.toLowerCase().replace(/([A-Z])/g, letter => letter.toLowerCase());
    
        // Update formData.specs when a non-custom value is selected
        if (value !== 'custom') {
            setFormData(prev => ({
                ...prev,
                specs: {
                    ...prev.specs,
                    [formattedSpec]: value
                }
            }));
        }
    };

    const handleCustomValueChange = (spec, value) => {
        setCustomValues((prev) => ({ ...prev, [spec]: value }));
    
        // Convert the spec name to match the backend's expected format
        const formattedSpec = spec.toLowerCase().replace(/([A-Z])/g, letter => letter.toLowerCase());
    
        // Update formData.specs when a custom value is entered
        setFormData(prev => ({
            ...prev,
            specs: {
                ...prev.specs,
                [formattedSpec]: value
            }
        }));
    };


    // Get current specs based on itemType
    const getCurrentSpecs = () => {
        return itemTypeSpecs[itemType] || {};
    };

    return (
        <form encType='multipart/form-data' className='flex flex-col sm:flex-row justify-between gap-4 m-auto px-4 sm:px-6 lg:px-8 mb-14' onSubmit={handleSubmit}>
            <div className='flex flex-col gap-4 w-full sm:max-w-[65vw]'>
                <div className='text-xl sm:text-2xl mb-3 text-center'>
                    <Title title1="ADD" title2="ITEMS" />
                </div>
                <p className='text-center text-lg text-gray-500'>Select Type of Item</p>
                <div className='flex flex-wrap justify-center gap-2 sm:justify-evenly'>
                    {['Laptop', 'Device', 'Parts', 'PrinterCCTV'].map(type => (
                        <div
                            key={type}
                            onClick={() => setItemType(type)}
                            className={`w-32 sm:w-32 bg-black text-center text-white cursor-pointer px-4 py-1 border rounded-sm ${itemType === type ? 'bg-green-500' : 'bg-black'}`}
                        >
                            {type}
                        </div>
                    ))}
                </div>
                {itemType && (
                    <div className='flex flex-col gap-2'>
                        <div>
                            <p className='text-center text-lg text-gray-500'>Upload Images For {itemType}</p>
                            <div className='flex flex-wrap justify-center gap-2'>
                                {[...Array(5)].map((_, index) => (
                                    <div key={index} className="flex flex-col items-center">
                                        <label htmlFor={`file${index + 1}`} className="text-sm py-2 text-gray-600 hover:text-gray-800">
                                            <img
                                                className='w-20 sm:w-32 cursor-pointer'
                                                src={formData.images[index] ? URL.createObjectURL(formData.images[index]) : assets.uploadArea}
                                                alt="upload"
                                            />
                                            <input
                                                type="file"
                                                id={`file${index + 1}`}
                                                onChange={(e) => handleImageUpload(e, index)}
                                                hidden
                                                accept="image/*"
                                            />
                                        </label>
                                    </div>
                                ))}
                            </div>
                            {errors.images && <p className="error-message text-red-500 text-sm text-center mt-1">{errors.images}</p>}
                        </div>

                        <div>
                            <p className='text-gray-500 py-1 mx-2'>{itemType} Name</p>
                            <input
                                className={`border ${errors.name ? 'border-red-500' : 'border-gray-300'} rounded py-1.5 px-3.5 w-full`}
                                type="text"
                                value={formData.name}
                                onChange={(e) => handleInputChange('name', e.target.value)}
                                placeholder='Product Name'
                            />
                            {errors.name && <p className="error-message text-red-500 text-sm mt-1">{errors.name}</p>}
                        </div>

                        <div>
                            <p className='text-gray-500 py-1 mx-2'>{itemType} Description</p>
                            <textarea
                                className={`border ${errors.description ? 'border-red-500' : 'border-gray-300'} rounded py-1.5 px-3.5 w-full`}
                                value={formData.description}
                                onChange={(e) => handleInputChange('description', e.target.value)}
                                placeholder='Product Description'
                                rows={4}
                            />
                            {errors.description && <p className="error-message text-red-500 text-sm mt-1">{errors.description}</p>}
                        </div>

                        <div className='flex flex-col sm:flex-row gap-3 w-full'>
                            <div className='w-full'>
                                <p className='text-gray-500 py-1 mx-2'>$ Price</p>
                                <input
                                    className={`border ${errors.price ? 'border-red-500' : 'border-gray-300'} rounded py-1.5 px-3.5 w-full`}
                                    type="number"
                                    value={formData.price}
                                    onChange={(e) => handleInputChange('price', e.target.value)}
                                    placeholder='$ Price'
                                />
                                {errors.price && <p className="error-message text-red-500 text-sm mt-1">{errors.price}</p>}
                            </div>
                            <div className='w-full'>
                                <p className='text-gray-500 py-1 mx-2'>Brand</p>
                                <input
                                    className={`border ${errors.brand ? 'border-red-500' : 'border-gray-300'} rounded py-1.5 px-3.5 w-full`}
                                    type="text"
                                    value={formData.brand}
                                    onChange={(e) => handleInputChange('brand', e.target.value)}
                                    placeholder='Brand'
                                />
                                {errors.brand && <p className="error-message text-red-500 text-sm mt-1">{errors.brand}</p>}
                            </div>
                        </div>

                        <div className='flex flex-col sm:flex-row gap-3 w-full'>
                            <div className='w-full'>
                                <p className='text-gray-500 py-1 mx-2'>Category</p>
                                <input
                                    value={formData.category = itemType.toLowerCase()}
                                    className={`border ${errors.category ? 'border-red-500' : 'border-gray-300'} rounded py-1.5 px-3.5 w-full`}
                                    type="text"
                                    onChange={(e) => handleInputChange('category', e.target.value)}
                                    placeholder='Category'
                                />
                                {errors.category && <p className="error-message text-red-500 text-sm mt-1">{errors.category}</p>}
                            </div>
                            <div className='w-full'>
                                <p className='text-gray-500 py-1 mx-2'>Condition</p>
                                <select
                                    className={`border ${errors.condition ? 'border-red-500' : 'border-gray-300'} rounded py-1.5 px-3.5 w-full`}
                                    value={formData.condition}
                                    onChange={(e) => handleInputChange('condition', e.target.value)}
                                >
                                    <option value="">Select Condition</option>
                                    <option value="firstHand">First Hand</option>
                                    <option value="secondHand">Second Hand</option>
                                </select>
                                {errors.condition && <p className="error-message text-red-500 text-sm mt-1">{errors.condition}</p>}
                            </div>
                        </div>

                        <div className='flex flex-col sm:flex-row gap-3 w-full'>
                            <div className='w-full'>
                                <p className='text-gray-500 py-1 mx-2'>Type of {itemType}</p>
                                <input
                                    className={`border ${errors.type ? 'border-red-500' : 'border-gray-300'} rounded py-1.5 px-3.5 w-full`}
                                    type="text"
                                    value={formData.type}
                                    onChange={(e) => handleInputChange('type', e.target.value)}
                                    placeholder={`Type of ${itemType}`}
                                    onFocus={() => setShowTypesHelp(true)}
                                />
                                {errors.type && <p className="error-message text-red-500 text-sm mt-1">{errors.type}</p>}
                                {showTypesHelp && (
                                    <div
                                        className='text-gray-500 py-2 px-3 mt-1 bg-gray-50 rounded text-sm'
                                    >
                                        Available types: gaming, office, studies, coding, budget, performance,
                                        mechanical, noise-cancelling, wireless, 4k, productivity,
                                        overclocking, storage, cooling, laser, all-in-one, inkjet,
                                        supertank, photo, Outdoor, solar, ip-camera
                                    </div>
                                )}
                            </div>
                        </div>

                        <div className='flex flex-col sm:flex-row gap-3 w-full'>
                            <div className='w-full'>
                                <p className='text-gray-500 py-1 mx-2'>isAvailable</p>
                                <select
                                    className={`border ${errors.isAvailable ? 'border-red-500' : 'border-gray-300'} rounded py-1.5 px-3.5 w-full`}
                                    value={formData.isAvailable}
                                    onChange={(e) => handleInputChange('isAvailable', e.target.value)}
                                >
                                    <option value="">Select Availability</option>
                                    <option value="true">Yes</option>
                                    <option value="false">No</option>
                                </select>
                                {errors.isAvailable && <p className="error-message text-red-500 text-sm mt-1">{errors.isAvailable}</p>}
                            </div>
                            <div className='w-full'>
                                <p className='text-gray-500 py-1 mx-2'>bestSeller</p>
                                <select
                                    className={`border ${errors.bestSeller ? 'border-red-500' : 'border-gray-300'} rounded py-1.5 px-3.5 w-full`}
                                    value={formData.bestSeller}
                                    onChange={(e) => handleInputChange('bestSeller', e.target.value)}
                                >
                                    <option value="">Select Best Seller Status</option>
                                    <option value="false">No</option>
                                    <option value="true">Yes</option>
                                </select>
                                {errors.bestSeller && <p className="error-message text-red-500 text-sm mt-1">{errors.bestSeller}</p>}
                            </div>
                        </div>

                        <div>
                            {itemType && (
                                <div>
                                    <p className='text-gray-500 text-center py-1 mx-2 mt-4 text-xl'>
                                        {itemType} Specifications
                                    </p>
                                    <div className='flex flex-wrap gap-3 w-full justify-center'>
                                        {Object.entries(getCurrentSpecs()).map(([spec, options]) => (
                                            <div key={spec} className='w-full sm:w-1/4'>
                                                <p className='text-gray-500 py-1 mx-2'>{spec}</p>
                                                <select
                                                    className='border border-gray-300 rounded py-1.5 px-3.5 w-full'
                                                    onChange={(e) => handleSelectChange(spec, e.target.value)}
                                                >
                                                    <option value="">Select</option>
                                                    {options.map((option, i) => (
                                                        <option key={i} value={option}>
                                                            {option}
                                                        </option>
                                                    ))}
                                                    <option value="custom">-Custom-</option>
                                                </select>
                                                {showInputs[spec] && (
                                                    <input
                                                        type='text'
                                                        placeholder={`Enter custom ${spec}`}
                                                        className='mt-2 border border-gray-300 rounded py-1.5 px-3.5 w-full'
                                                        onChange={(e) => handleCustomValueChange(spec, e.target.value)}
                                                    />
                                                )}
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>

                        <div>
                            <button
                                type="submit"
                                className="w-full py-3 my-4 mb-10 text-white bg-green-500 rounded hover:bg-green-700 cursor-pointer transition duration-200"
                            >
                                Add {itemType}
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </form>
    );
};

export default Add;