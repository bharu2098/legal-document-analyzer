import { Scale } from "lucide-react";

function AuthHeader({ subtitle }) {
  return (
    <div className="text-center mb-12">
      <div className="mx-auto w-20 h-20 rounded-[24px] border border-blue-500/20 bg-[#0F2136]/80 flex items-center justify-center shadow-[0_0_30px_rgba(37,99,235,0.18)]">
        <Scale size={36} strokeWidth={2} className="text-blue-500" />
      </div>

      <h1 className="mt-7 text-[56px] font-extrabold tracking-[-1px] leading-[0.98]">
        <span className="text-blue-500">AI Legal</span>{" "}
        <span className="text-white">Document Analyzer</span>
      </h1>

      <p className="mt-4 max-w-[760px] mx-auto text-[20px] text-slate-400 font-normal leading-7">
        {subtitle}
      </p>
    </div>
  );
}

export default AuthHeader;