import { useRef } from "react";

function FileUpload({
  fetchDocuments,
  setSelectedDocument,
}) {
  const fileInputRef = useRef(null);

  const handleClick = () => {
    fileInputRef.current.click();
  };

  const handleFileChange = async (e) => {
    const file = e.target.files[0];

    if (!file) return;

    // ======================================================
    // Allowed File Types
    // ======================================================

    const allowedTypes = [
      "application/pdf",
      "application/msword",
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    ];

    if (!allowedTypes.includes(file.type)) {
      alert("❌ Only PDF and DOCX files are supported.");

      e.target.value = "";
      return;
    }

    // ======================================================
    // Maximum File Size
    // ======================================================

    const MAX_FILE_SIZE = 20 * 1024 * 1024;

    if (file.size > MAX_FILE_SIZE) {
      alert("❌ File size must be less than 20 MB.");

      e.target.value = "";
      return;
    }

    const token = localStorage.getItem("token");

    if (!token) {
      alert("❌ Please login first.");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);

    try {
      // ======================================================
      // Upload Document
      // ======================================================

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

      // ======================================================
      // Upload Failed
      // ======================================================

      if (!response.ok) {
        let message =
          "❌ Upload failed. Please upload a valid legal document.";

        if (typeof data.detail === "string") {
          message = data.detail;
        } else if (
          typeof data.detail === "object" &&
          data.detail !== null
        ) {
          message =
            `❌ ${data.detail.message}\n\n` +
            `📄 Detected Document : ${data.detail.detected_document_type}\n` +
            `🎯 Confidence        : ${data.detail.confidence}%\n\n` +
            `📝 Reason:\n${data.detail.reason}`;
        }

        alert(message);

        e.target.value = "";
        return;
      }

      // ======================================================
      // Refresh Documents
      // ======================================================

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
      } else {
        alert(
          "⚠️ Document uploaded successfully, but failed to refresh the document list."
        );
      }
    } catch (error) {
      console.error(error);

      alert("❌ Unable to connect to the server.");
    } finally {
      e.target.value = "";
    }
  };
    return (
    <div className="space-y-5">

      {/* Hidden File Input */}
      <input
        ref={fileInputRef}
        type="file"
        hidden
        accept=".pdf,.doc,.docx"
        onChange={handleFileChange}
      />

      {/* Upload Button */}
      <button
        onClick={handleClick}
        className="
          w-full
          py-4
          rounded-2xl
          bg-gradient-to-r
          from-indigo-600
          via-violet-600
          to-blue-600
          hover:from-indigo-500
          hover:via-violet-500
          hover:to-blue-500
          text-white
          text-base
          font-semibold
          shadow-xl
          shadow-indigo-900/40
          transition-all
          duration-300
          hover:scale-[1.02]
          active:scale-95
        "
      >
        ⚖️ Upload Legal Document
      </button>

      {/* Supported Documents Card */}
      <div className="rounded-2xl border border-slate-700 bg-[#111827] p-5 shadow-lg">

        <h3 className="text-white font-bold text-sm uppercase tracking-wider mb-4">
          Supported Legal Documents
        </h3>

        <div className="space-y-2 text-sm text-slate-300">

          <div>📄 Employment Contract</div>

          <div>📄 Service Agreement</div>

          <div>📄 Rental Agreement</div>

          <div>📄 Lease Agreement</div>

          <div>📄 Non-Disclosure Agreement (NDA)</div>

          <div>📄 Memorandum of Understanding (MoU)</div>

          <div>📄 Court Order</div>

          <div>📄 Legal Notice</div>

          <div>📄 Insurance Policy</div>

          <div>📄 Privacy Policy</div>

          <div>📄 Terms & Conditions</div>

          <div>📄 Partnership Agreement</div>

        </div>

      </div>

      {/* Information Card */}
      <div className="rounded-2xl border border-indigo-500/30 bg-gradient-to-r from-indigo-600/10 to-violet-600/10 p-4">

        <h4 className="text-indigo-300 font-semibold mb-2">
          AI Validation
        </h4>

        <p className="text-xs text-slate-300 leading-6">
          Every uploaded document is automatically analyzed by AI.
          Only genuine legal documents such as contracts,
          agreements, court orders, legal notices, policies and
          similar legal documents are accepted.
        </p>

      </div>

      {/* Limits */}
      <div className="rounded-xl bg-[#0F172A] border border-slate-700 p-4">

        <h4 className="text-white font-semibold mb-2">
          Upload Limits
        </h4>

        <div className="space-y-2 text-xs text-slate-400">

          <p>✅ PDF & DOCX only</p>

          <p>✅ Maximum file size: 20 MB</p>

          <p>✅ AI Legal Document Validation</p>

          <p>✅ Secure cloud processing</p>

        </div>

      </div>

    </div>
  );
}

export default FileUpload;