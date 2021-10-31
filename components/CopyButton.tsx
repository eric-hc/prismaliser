import React, { useRef, useState } from "react";

import { toUrlSafeB64 } from "~/util";

const CopyButton = ({ input }: CopyButtonProps) => {
  const [showCopied, setShowCopied] = useState(false);
  const timerRef = useRef<NodeJS.Timeout>(null);

  const copy = () => {
    const params = new URLSearchParams({ code: toUrlSafeB64(input) });
    const toCopy = `${location.origin}?${params.toString()}`;

    navigator.clipboard.writeText(toCopy);

    if (timerRef.current) clearTimeout(timerRef.current);
    timerRef.current = setTimeout(() => {
      setShowCopied(false);
    }, 2000);

    setShowCopied(true);
  };

  return (
    <button
      className="button floating"
      title="Copy link"
      aria-label="Copy link"
      onClick={copy}
    >
      {showCopied ? "Copied!" : "Copy link"}
    </button>
  );
};

interface CopyButtonProps {
  input: string;
}

export default CopyButton;
