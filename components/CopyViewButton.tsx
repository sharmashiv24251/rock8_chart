import React from "react";
import { Button } from "@/components/ui/button";

import { Copy } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export function CopyViewButton() {
  const { toast } = useToast();

  const handleCopyView = () => {
    const fullUrl = window.location.href;
    navigator.clipboard.writeText(fullUrl).then(
      () => {
        toast({
          title: "URL Copied",
          description:
            "The current view URL has been copied to your clipboard.",
        });
      },
      (err) => {
        console.error("Could not copy text: ", err);
        toast({
          title: "Copy Failed",
          description: "Failed to copy the URL. Please try again.",
          variant: "destructive",
        });
      }
    );
  };

  return (
    <Button onClick={handleCopyView} variant="secondary" size="lg">
      <Copy className="mr-2 h-4 w-4" />
      Copy View URL
    </Button>
  );
}
