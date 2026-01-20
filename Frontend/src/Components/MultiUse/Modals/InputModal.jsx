import { useState } from "react";
import DragAndDrop from "../DragAndDrop";
import {
  Button,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
} from "@material-tailwind/react";
import { assets } from "../../../assets/assets";

export function DialogSizes({ size, handleOpen, handleReviewData }) {
  const [imagesAppear, setImagesAppear] = useState(false);
  const [images, setImages] = useState([]);
  const [storedData, setStoredData] = useState([]);
  const [reviewText, setReviewText] = useState("");

  const imgData = (value) => {
    setImages((prevImages) => [...prevImages, value]); // Append the new image data properly
    setImagesAppear(true);
  };

  const removeImages = (index) => {
    setImages((prevImages) => prevImages.filter((_, i) => i !== index));
  };

  const submitData = () => {
    const newReview = {
      review: reviewText,
      images: images.map((img) => img[0]?.path || img[0]?.relativePath), // Adjust based on your image object structure
    };
  
    const updatedData = [...storedData, newReview]; // Create the updated data array
    setStoredData(updatedData); // Update the state
    handleReviewData(updatedData); // Pass the updated data directly to the handler
    console.log("Stored Data:", updatedData);
  
    // Reset fields after submission
    setReviewText("");
    setImages([]);
    setImagesAppear(false);
    handleOpen(null);
  };
  

  return (
    <Dialog
      open={size === "md"}
      size={size || "md"}
      handler={() => handleOpen(null)}
    >
      <DialogHeader>Share your Review</DialogHeader>
      <DialogBody>
        <p className="">Share your thoughts about this product!</p>
        <textarea
          className="outline-none border rounded-md w-full my-3 px-2 py-1 font-extralight"
          rows={4}
          name="review"
          placeholder="Share the review"
          value={reviewText}
          onChange={(e) => setReviewText(e.target.value)}
        ></textarea>

        <p className="">Drop the Images</p>
        <DragAndDrop imgData={imgData} />

        {imagesAppear && images.length > 0 ? (
          <div className="flex flex-wrap gap-4 mt-4">
            {images.map((e, i) => (
              <div className="relative w-24 h-24" key={i}>
                <button
                  onClick={() => removeImages(i)}
                  className="absolute top-0 right-0 rounded-full p-1"
                >
                  <img src={assets.CrossLogo} alt="Close" />
                </button>
                <img
                  className="w-full h-full object-cover rounded"
                  src={e[0]?.path || e[0]?.relativePath}
                  alt="Uploaded"
                />
              </div>
            ))}
          </div>
        ) : (
          <div className="mt-4 text-gray-500">No images uploaded.</div>
        )}
      </DialogBody>
      <DialogFooter>
        <Button
          variant="text"
          color="red"
          onClick={() => handleOpen(null)}
          className="mr-1"
        >
          <span>Cancel</span>
        </Button>
        <Button
          variant="gradient"
          color="green"
          onClick={submitData}
        >
          <span>Submit</span>
        </Button>
      </DialogFooter>
    </Dialog>
  );
}
``