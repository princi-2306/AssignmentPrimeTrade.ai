import { useState } from 'react';
import Title from '../Components/MultiUse/Title';
import { assets } from '../assets/assets';
import axios from 'axios';
import { backendUrl } from '../App';
import { toast } from 'react-toastify';

const Add = ({ token }) => {
    const [itemType, setItemType] = useState('Service');
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
                    case "Service":
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
                            formDataToSend.append('diagnosis', formData.specs.diagnosis);
                            formDataToSend.append('repairTime', formData.specs.repairtime);
                            formDataToSend.append('cameraTypes', formData.specs.cameratypes);
                            formDataToSend.append('storageOptions', formData.specs.storageoptions);
                            formDataToSend.append('coverage', formData.specs.coverage);
                            formDataToSend.append('connectivity', formData.specs.connectivity);
                            formDataToSend.append('partsReplacement', formData.specs.partsreplacement);
                            formDataToSend.append('serviceType', formData.specs.servicetype);
                            formDataToSend.append('components', formData.specs.components);
                            formDataToSend.append('coolingSystem', formData.specs.coolingsystem);
                            formDataToSend.append('RGBSetup', formData.specs.rgbsetup);
                            formDataToSend.append('capacityOptions', formData.specs.capacityoptions);
                            formDataToSend.append('installationTime', formData.specs.installationtime);
                            formDataToSend.append('dataMigration', formData.specs.datamigration);
                            formDataToSend.append('warranty', formData.specs.warranty);
                            formDataToSend.append('supportedDevices', formData.specs.supporteddevices);
                            formDataToSend.append('recoveryRate', formData.specs.recoveryrate);
                            formDataToSend.append('timeFrame', formData.specs.timeframe);
                            formDataToSend.append('confidentiality', formData.specs.confidentiality);
                            // Append images (if they exist)
                            if (formData.images[0]) formDataToSend.append('ServiceImages1', formData.images[0]);
                            if (formData.images[1]) formDataToSend.append('ServiceImages2', formData.images[1]);
                            if (formData.images[2]) formDataToSend.append('ServiceImages3', formData.images[2]);
                            if (formData.images[3]) formDataToSend.append('ServiceImages4', formData.images[3]);
                            if (formData.images[4]) formDataToSend.append('ServiceImages5', formData.images[4]);

                            endpoint = "/service/addService";
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
        "Service": {
            "diagnosis": ["Hardware", "Software", "Network", "Peripheral", "System", "Comprehensive"],
            "repairTime": ["1-2 Hours", "Same Day", "24 Hours", "2-3 Days", "1 Week", "2 Weeks"],
            "cameraTypes": ["IP Camera", "CCTV", "PTZ", "Dome", "Bullet", "Thermal", "Wireless"],
            "storageOptions": ["128GB", "256GB", "512GB", "1TB", "2TB", "4TB", "8TB", "Cloud Storage"],
            "coverage": ["On-Site", "Remote", "Nationwide", "International", "24/7 Support", "Limited"],
            "connectivity": ["Wi-Fi", "Ethernet", "Bluetooth", "5G", "4G LTE", "USB", "Fiber"],
            "partsReplacement": ["Motherboard", "CPU", "GPU", "RAM", "SSD/HDD", "Power Supply", "Cooling System", "Peripherals"],
            "serviceType": ["Installation", "Maintenance", "Repair", "Upgrade", "Data Recovery", "Consultation", "Custom Build"],
            "components": ["CPU", "GPU", "Motherboard", "RAM", "Storage", "Cooling", "PSU", "Peripherals"],
            "coolingSystem": ["Air Cooling", "Liquid Cooling", "Hybrid Cooling", "Passive Cooling", "Phase Change Cooling"],
            "RGBSetup": ["Static", "Dynamic", "Per-Zone RGB", "Per-Key RGB", "Sync with Software", "None"],
            "capacityOptions": ["500VA", "1000VA", "1500VA", "2000VA", "3000VA", "5000VA", "10000VA"],
            "installationTime": ["30 Minutes", "1 Hour", "2 Hours", "Half Day", "Full Day", "2-3 Days"],
            "dataMigration": ["Manual", "Automated", "Cloud-Based", "Local Storage Transfer", "Cross-Platform", "Incremental"],
            "warranty": ["6 Months", "1 Year", "2 Years", "3 Years", "5 Years", "Lifetime"],
            "supportedDevices": ["PC", "Laptop", "Server", "NAS", "Mobile Devices", "IoT Devices", "Cameras"],
            "recoveryRate": ["70%", "80%", "85%", "90%", "95%", "98%", "99%"],
            "timeFrame": ["Immediate", "24 Hours", "2-3 Days", "1 Week", "2 Weeks", "Custom Schedule"],
            "confidentiality": ["Standard", "High", "End-to-End Encryption", "On-Site Only", "Non-Disclosure Agreement (NDA)"]
        },
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
                <p className='text-center text-lg text-gray-500'>Create Type of Service from the given Types</p>
                <div className='flex flex-wrap justify-center gap-2 sm:justify-evenly'>
                    {['Laptop', 'Device', 'Parts', 'PrinterCCTV'].map(type => (
                        <div
                            key={type}
                            className={`w-32 sm:w-32 bg-green-500 text-center text-white px-4 py-1 border rounded-sm ${itemType === type ? 'bg-green-500' : 'bg-black'}`}
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
                                        Available types: Repair, Data Recovery, Maintenance, Installation, 
                                        Upgrade, Diagnostics, Custom Build, Networking, System Optimization, 
                                        Security Setup, Backup Solutions, Cloud Integration, Software Installation, 
                                        Hardware Replacement, Consultation
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