import { useRef, useState } from "react";

function FileUpload({
  fetchDocuments,
  setSelectedDocument,
}) {

  const fileInputRef = useRef(null);

  const [uploading, setUploading] = useState(false);
  const [dragActive, setDragActive] = useState(false);

  // ============================================
  // Open File Picker
  // ============================================

  const handleClick = () => {

    if (!uploading) {
      fileInputRef.current.click();
    }

  };

  // ============================================
  // Validate File
  // ============================================

  const validateFile = (file) => {

    const allowedTypes = [
      "application/pdf",
      "application/msword",
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    ];

    if (!allowedTypes.includes(file.type)) {

      alert("❌ Only PDF and DOCX legal documents are supported.");

      return false;

    }

    const MAX_FILE_SIZE = 20 * 1024 * 1024;

    if (file.size > MAX_FILE_SIZE) {

      alert("❌ Maximum file size is 20 MB.");

      return false;

    }

    return true;

  };

  // ============================================
  // Upload File
  // ============================================

  const uploadFile = async (file, inputElement = null) => {
        if (!validateFile(file)) {

      if (inputElement) {
        inputElement.value = "";
      }

      return;

    }

    const token = localStorage.getItem("token");

    if (!token) {

      alert("❌ Please login first.");

      return;

    }

    const formData = new FormData();

    formData.append("file", file);

    setUploading(true);

    try {

      // ============================================
      // Upload Document
      // ============================================

      const response = await fetch(
        "https://shimmering-sparkle-production-88ac.up.railway.app/documents/upload",
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
          },
          body: formData,
        }
      );

      const data = await response.json();

      // ============================================
      // Upload Failed
      // ============================================

      if (!response.ok) {

        let message =
          "❌ Upload failed. Please upload a valid legal document.";

        if (typeof data.detail === "string") {

          message = data.detail;

        }

        else if (
          typeof data.detail === "object" &&
          data.detail !== null
        ) {

          message =
            `❌ ${data.detail.message}\n\n` +
            `📄 Detected Document : ${data.detail.detected_document_type}\n` +
            `🎯 Confidence : ${data.detail.confidence}%\n\n` +
            `📝 Reason:\n${data.detail.reason}`;

        }

        alert(message);

        if (inputElement) {
          inputElement.value = "";
        }

        return;

      }

      // ============================================
      // Refresh Documents
      // ============================================

      const docsResponse = await fetch(
        "https://shimmering-sparkle-production-88ac.up.railway.app/documents/",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const docs = await docsResponse.json();

      if (docsResponse.ok) {

        fetchDocuments();

        const uploadedDoc = docs.find(
          (doc) => doc.id === data.document_id
        );

        if (uploadedDoc) {
          setSelectedDocument(uploadedDoc);
        }

        alert("✅ Legal document uploaded successfully.");

      }

      else {

        alert(
          "⚠️ Document uploaded successfully, but failed to refresh the document list."
        );

      }

    }

    catch (error) {

      console.error(error);

      alert("❌ Unable to connect to the server.");

    }

    finally {

      setUploading(false);

      if (inputElement) {
        inputElement.value = "";
      }

    }

  };

  // ============================================
  // File Input Change
  // ============================================

  const handleFileChange = async (e) => {
        const file = e.target.files[0];

    if (!file) return;

    uploadFile(file, e.target);

  };

  // ============================================
  // Drag & Drop
  // ============================================

  const handleDrop = (e) => {

    e.preventDefault();

    setDragActive(false);

    const file = e.dataTransfer.files[0];

    if (!file) return;

    uploadFile(file);

  };

  const handleDragOver = (e) => {

    e.preventDefault();

    setDragActive(true);

  };

  const handleDragLeave = () => {

    setDragActive(false);

  };

  // ============================================
  // UI
  // ============================================

  return (

    <div className="space-y-5">

      {/* Hidden Input */}

      <input
        ref={fileInputRef}
        type="file"
        hidden
        accept=".pdf,.doc,.docx"
        onChange={handleFileChange}
      />

      {/* Upload Area */}

      <div
        onClick={handleClick}
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        className={`
          cursor-pointer
          rounded-[32px]
          border-2
          border-dashed
          px-6
          py-10
          text-center
          transition-all
          duration-300
          shadow-2xl
          ${
            dragActive
              ? "border-blue-500 bg-blue-500/10 scale-[1.02]"
              : "border-slate-700 bg-[#111827] hover:border-blue-500 hover:bg-[#1B2430]"
          }
        `}
      >

        <div className="text-6xl mb-5">

          {uploading ? "⏳" : "📤"}

        </div>

        <h3 className="text-xl font-semibold text-white">

          {uploading
            ? "Uploading..."
            : "Upload Legal Document"}

        </h3>

        <p className="text-sm text-slate-400 mt-3">

          Drag & Drop your legal document here

        </p>

        <p className="text-xs text-slate-500 mt-1">

          or click to browse

        </p>

        <button
          type="button"
          disabled={uploading}
          className="
            mt-8
            px-8
            py-3
            rounded-[24px]
            bg-gradient-to-r
            from-violet-500
            via-blue-500
            to-indigo-600
            hover:from-violet-400
            hover:to-indigo-500
            text-white
            font-semibold
            transition-all
            duration-300
            disabled:opacity-60
            disabled:cursor-not-allowed
          "
        >

          {uploading
            ? "Uploading..."
            : "Choose File"}

        </button>

        <div className="flex justify-center gap-2 mt-6 flex-wrap">

          <span className="px-3 py-1 rounded-full bg-slate-800 border border-slate-700 text-slate-300 text-xs">
            PDF
          </span>

          <span className="px-3 py-1 rounded-full bg-slate-800 border border-slate-700 text-slate-300 text-xs">
            DOC
          </span>

          <span className="px-3 py-1 rounded-full bg-slate-800 border border-slate-700 text-slate-300 text-xs">
            DOCX
          </span>

          <span className="px-3 py-1 rounded-full bg-green-900/20 border border-green-600 text-green-400 text-xs">
            AI Verified
          </span>

        </div>
                {/* Footer */}

        <div className="mt-6 border-t border-slate-700 pt-5">

          <p className="text-xs text-slate-500">

            PDF • DOC • DOCX

          </p>

          <p className="text-xs text-slate-600 mt-1">

            Maximum file size: 20 MB

          </p>

        </div>

      </div>

    </div>

  );

}

export default FileUpload;