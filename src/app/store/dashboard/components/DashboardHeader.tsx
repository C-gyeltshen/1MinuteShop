import React, { useState } from "react";
import { Menu, Settings, Copy, Check, ExternalLink, Store } from "lucide-react";
import { DashboardHeaderProps } from "./Types";

const DashboardHeader: React.FC<DashboardHeaderProps> = ({
  storeName,
  ownerName,
  email,
  storeUrl,
  isMobileMenuOpen,
  onToggleMobileMenu,
}) => {
  const [copied, setCopied] = useState(false);
  const [urlExpanded, setUrlExpanded] = useState(false);

  const displayUrl = storeUrl || `https://mystore.com/${(storeName || "my-store").toLowerCase().replace(/\s+/g, "-")}`;

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(displayUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // fallback for older browsers
      const textarea = document.createElement("textarea");
      textarea.value = displayUrl;
      document.body.appendChild(textarea);
      textarea.select();
      document.execCommand("copy");
      document.body.removeChild(textarea);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <header className="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-40">
      <div className="px-4 sm:px-6 lg:px-8 py-3">
        <div className="flex items-center justify-between gap-4">
          {/* Left: Hamburger + Store name */}
          <div className="flex items-center gap-3 min-w-0">
            <button
              onClick={onToggleMobileMenu}
              className="md:hidden p-2 rounded-lg hover:bg-gray-100 flex-shrink-0"
              aria-label="Toggle mobile menu"
            >
              <Menu size={20} />
            </button>
            <div className="flex flex-col min-w-0">
              <h1 className="text-xl sm:text-2xl font-bold text-gray-900 truncate">
                {storeName || "My Store Portal"}
              </h1>
              {(ownerName || email) && (
                <span className="text-xs text-gray-500 font-normal truncate">
                  Welcome, {ownerName || email}
                </span>
              )}
            </div>
          </div>

          {/* Center / Right: Store URL pill */}
          <div className="flex items-center gap-2 flex-shrink-0">
            {/* Compact URL pill — hidden on very small screens, visible md+ */}
            <div className="hidden sm:flex items-center gap-1.5 bg-gray-50 border border-gray-200 rounded-lg px-3 py-1.5 max-w-xs lg:max-w-sm xl:max-w-md group transition-all">
              <Store size={13} className="text-gray-400 flex-shrink-0" />
              <span className="text-xs text-gray-600 font-mono truncate select-all" title={displayUrl}>
                {displayUrl}
              </span>
              <div className="flex items-center gap-1 ml-1 flex-shrink-0">
                <button
                  onClick={handleCopy}
                  className="p-1 rounded hover:bg-gray-200 transition-colors"
                  title={copied ? "Copied!" : "Copy store URL"}
                  aria-label="Copy store URL"
                >
                  {copied ? (
                    <Check size={13} className="text-green-500" />
                  ) : (
                    <Copy size={13} className="text-gray-400 hover:text-gray-600" />
                  )}
                </button>
                <a
                  href={displayUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-1 rounded hover:bg-gray-200 transition-colors"
                  title="Open store in new tab"
                  aria-label="Open store in new tab"
                >
                  <ExternalLink size={13} className="text-gray-400 hover:text-gray-600" />
                </a>
              </div>
            </div>

            {/* Mobile: just an icon button that expands a dropdown */}
            <div className="sm:hidden relative">
              <button
                onClick={() => setUrlExpanded((v) => !v)}
                className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
                aria-label="View store URL"
              >
                <Store size={20} className="text-gray-600" />
              </button>

              {urlExpanded && (
                <div className="absolute right-0 top-full mt-2 w-72 bg-white border border-gray-200 rounded-xl shadow-lg p-3 z-50">
                  <p className="text-xs font-medium text-gray-500 mb-1.5">Your store URL</p>
                  <div className="flex items-center gap-2 bg-gray-50 border border-gray-200 rounded-lg px-2.5 py-2">
                    <span className="text-xs text-gray-700 font-mono flex-1 break-all select-all">
                      {displayUrl}
                    </span>
                  </div>
                  <div className="flex gap-2 mt-2">
                    <button
                      onClick={handleCopy}
                      className="flex-1 flex items-center justify-center gap-1.5 text-xs font-medium bg-gray-900 text-white rounded-lg py-2 hover:bg-gray-700 transition-colors"
                    >
                      {copied ? (
                        <>
                          <Check size={13} />
                          Copied!
                        </>
                      ) : (
                        <>
                          <Copy size={13} />
                          Copy URL
                        </>
                      )}
                    </button>
                    <a
                      href={displayUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 flex items-center justify-center gap-1.5 text-xs font-medium border border-gray-200 text-gray-700 rounded-lg py-2 hover:bg-gray-50 transition-colors"
                    >
                      <ExternalLink size={13} />
                      Visit Store
                    </a>
                  </div>
                </div>
              )}
            </div>

            <button
              className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
              aria-label="Settings"
            >
              <Settings size={20} className="text-gray-600" />
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default DashboardHeader;