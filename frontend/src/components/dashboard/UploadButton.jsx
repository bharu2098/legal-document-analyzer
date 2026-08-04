import { useRef } from "react";
import { FiPlus } from "react-icons/fi";
import { useDocument } from "../../context/DocumentContext";

function UploadButton() {
  const inputRef = useRef();

  const { upload } = useDocument();

  const handleChange = async (event) => {
    const file = event.target.files[0];

    if (!file) return;

    try {
      await upload(file);

      alert("Document uploaded successfully!");
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <>
      <button
        onClick={() => inputRef.current.click()}
        className="flex w-full items-center justify-center gap-3 rounded-xl bg-blue-600 px-5 py-3 font-semibold text-white transition hover:bg-blue-700"
      >
        <FiPlus size={18} />

        Upload New Document
      </button>

      <input
        ref={inputRef}
        type="file"
        accept=".pdf,.docx"
        hidden
        onChange={handleChange}
      />
    </>
  );
}

export default UploadButton;