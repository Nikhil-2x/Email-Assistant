import axios from "axios";
import React, { useState } from "react";
import toast from "react-hot-toast";
import LightRays from "./components/LightRays";
import Shuffle from "./components/Shuffle";

const App = () => {
  const [emailContent, setEmailContent] = useState("");
  const [tone, setTone] = useState("");
  const [loading, setLoading] = useState(false);
  // const [email, setEmail] = useState("");
  const [result, setResult] = useState("");

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(result);
      toast.success("Copied Successfully.");
    } catch (err) {
      console.log("Failed to copy", err);
      toast.error("Error while copying.");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!emailContent) return;
    setLoading(true);
    setResult("");
    try {
      const response = await axios.post(
        "http://localhost:8081/api/email/generate",
        { emailContent, tone }
      );

      setResult(
        typeof response.data === "string"
          ? response.data
          : JSON.stringify(response.data)
      );
    } catch (error) {
      console.error("Error generating email reply:", error);
      toast.error("Failed to generate email reply. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className=" relative min-h-screen bg-neutral-950 text-neutral-100 antialiased selection:bg-indigo-500/30 selection:text-white overflow-hidden ">
      <LightRays
        raysOrigin="top-center"
        raysColor="#00ffff"
        raysSpeed={2}
        lightSpread={0.8}
        rayLength={1.2}
        followMouse={true}
        mouseInfluence={0.8}
        noiseAmount={0.1}
        distortion={0.05}
      />

      <div className="mx-auto max-w-3xl px-4 py-10 relative z-10">
        <div className="relative rounded-2xl border border-white/10 bg-neutral-900/60 p-6 shadow-2xl backdrop-blur-md transition-all duration-500">
          <div className="pointer-events-none absolute inset-0 -z-10 rounded-2xl bg-[radial-gradient(80%_60%_at_50%_-10%,rgba(79,70,229,0.35),transparent_60%),radial-gradient(60%_60%_at_110%_10%,rgba(16,185,129,0.25),transparent_60%),radial-gradient(60%_60%_at_-10%_110%,rgba(236,72,153,0.25),transparent_60%)]" />
          {/* <h1 className="mb-6 bg-linear-to-r from-indigo-300 via-teal-200 to-pink-200 bg-clip-text text-center text-2xl font-semibold text-transparent tracking-tight">
            Email Reply Assistant
            
          </h1> */}
          <div className="mb-6 bg-linear-to-r from-indigo-300 via-teal-200 to-pink-200 bg-clip-text text-center text-sm font-semibold  tracking-tight">
            <Shuffle
              text="Email Reply Assistant"
              shuffleDirection="right"
              duration={0.35}
              animationMode="evenodd"
              shuffleTimes={1}
              ease="power3.out"
              stagger={0.03}
              threshold={0.1}
              triggerOnce={true}
              triggerOnHover={true}
              respectReducedMotion={true}
            />
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Tone + Button row */}
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
              <div className="sm:col-span-2">
                <label className="mb-2 block text-sm font-medium text-neutral-300">
                  Tone
                </label>
                <div className="relative">
                  <select
                    value={tone}
                    onChange={(e) => setTone(e.target.value)}
                    className="w-full appearance-none rounded-lg border border-white/10 bg-neutral-800/80 px-4 py-2.5 pr-10 text-neutral-100 outline-none transition focus:border-indigo-400 focus:bg-neutral-800 focus:shadow-[0_0_0_4px_rgba(99,102,241,0.15)]"
                  >
                    <option value="">None</option>
                    <option value="prof">Professional</option>
                    <option value="casual">Casual</option>
                    <option value="friendly">Friendly</option>
                  </select>
                  <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-neutral-400">
                    ▾
                  </span>
                </div>
              </div>

              <div className="flex items-end">
                <button
                  type="submit"
                  disabled={!emailContent || loading}
                  className="group cursor-pointer relative inline-flex w-full items-center justify-center gap-2 overflow-hidden rounded-lg border border-indigo-500/40 bg-linear-to-br from-indigo-600/80 via-indigo-600 to-indigo-700 px-4 py-2.5 text-sm font-medium text-white shadow-lg transition [text-shadow:0_1px_0_rgba(0,0,0,0.2)] enabled:hover:from-indigo-500 enabled:hover:to-indigo-600 enabled:active:scale-[0.99] enabled:shadow-indigo-500/30 disabled:cursor-not-allowed disabled:opacity-60"
                >
                  <span className="absolute inset-0 -z-10 animate-[pulse_2.2s_ease-in-out_infinite] bg-[radial-gradient(120px_60px_at_var(--x,50%)_var(--y,50%),rgba(255,255,255,0.14),transparent)] opacity-0 group-hover:opacity-100" />
                  {loading ? (
                    <>
                      <svg
                        className="size-4 animate-spin"
                        viewBox="0 0 24 24"
                        fill="none"
                      >
                        <circle
                          className="opacity-20"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                        />
                        <path
                          d="M22 12a10 10 0 0 1-10 10"
                          stroke="currentColor"
                          strokeWidth="4"
                          strokeLinecap="round"
                        />
                      </svg>
                      Generating...
                    </>
                  ) : (
                    <>
                      <span>Generate Reply</span>
                    </>
                  )}
                </button>
              </div>
            </div>

            {/* Content input */}
            <div className="rounded-xl border border-white/10 bg-neutral-900/70 p-4 shadow-inner">
              <label className="mb-2 block text-sm font-medium text-neutral-300">
                Email Content
              </label>
              <textarea
                value={emailContent}
                onChange={(e) => setEmailContent(e.target.value)}
                placeholder="Type or paste the email content here..."
                rows={7}
                className="w-full resize-y rounded-lg border border-white/10 bg-neutral-800/80 px-4 py-3 text-neutral-100 outline-none transition placeholder:text-neutral-500 focus:border-indigo-400 focus:bg-neutral-800 focus:shadow-[0_0_0_4px_rgba(99,102,241,0.15)]"
              />
              <div className="mt-2 text-right text-xs text-neutral-400">
                {emailContent.length} characters
              </div>
            </div>
          </form>
        </div>

        {/* Result Box */}
        <div
          className={`mt-6 transform transition-all duration-500 ${
            result ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-2"
          }`}
        >
          {result && (
            <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-neutral-900/70 p-5 shadow-xl">
              <div className="absolute inset-0 -z-10 animate-[spin_22s_linear_infinite] bg-[conic-gradient(from_0deg,rgba(79,70,229,0.15),rgba(16,185,129,0.15),rgba(236,72,153,0.15),rgba(79,70,229,0.15))]" />
              <div className="relative rounded-xl border border-white/10 bg-neutral-950/70 p-4">
                <div className="mb-2 text-xs uppercase tracking-wider text-neutral-400">
                  Generated Reply
                </div>
                <pre className="whitespace-pre-wrap wrap-break-word text-sm leading-relaxed text-neutral-100">
                  {result}
                </pre>
              </div>
              <button
                onClick={copyToClipboard}
                className="group cursor-pointer p-2 mt-4 relative flex w-1/3 align-middle items-center justify-center gap-2 overflow-hidden rounded-lg border border-indigo-500/40 bg-linear-to-br from-indigo-600/80 via-indigo-600 to-indigo-700 px-4 py-2.5 text-sm font-medium text-white shadow-lg transition [text-shadow:0_1px_0_rgba(0,0,0,0.2)] enabled:hover:from-indigo-500 enabled:hover:to-indigo-600 enabled:active:scale-[0.99] enabled:shadow-indigo-500/30 disabled:cursor-not-allowed disabled:opacity-60"
              >
                Copy To Clipboard
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default App;
