function Modal({ open, title, children, onClose }) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 bg-black/60 flex justify-center items-center z-50">
      <div className="bg-slate-900 rounded-xl p-6 w-[500px] max-w-[90%]">

        <div className="flex justify-between items-center mb-4">

          <h2 className="text-white text-xl font-bold">
            {title}
          </h2>

          <button
            onClick={onClose}
            className="text-gray-400 hover:text-white text-xl"
          >
            ✕
          </button>

        </div>

        {children}

      </div>
    </div>
  );
}

export default Modal;