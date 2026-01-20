import { useState } from "react";
import { assets } from "../../assets/assets"

const CopyTextButton = (props) => {
  const [copySuccess, setCopySuccess] = useState("");

  const textToCopy = props.copyText;

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(textToCopy);
      setCopySuccess("Copied!");
    } catch (err) {
      setCopySuccess("Failed to copy!");
      console.error("Failed to copy text: ", err);
    }

    setTimeout(() => {
      setCopySuccess(""); // Clear the message after 2 seconds
    }, 2000);
  };

  return (
    <div style={{ textAlign: "center"}}>
        { copySuccess !== "Copied!" && <button onClick={handleCopy} className="">
        <img src={assets.Copy} alt="" />
      </button>
        }
      { copySuccess === "Copied!" && <p className="pt-1">
        <img src={assets.Copied} alt="" />
      </p>
      }
    </div>
  );
};

export default CopyTextButton;
