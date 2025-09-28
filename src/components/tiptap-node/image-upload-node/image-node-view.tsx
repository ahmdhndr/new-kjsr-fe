import Image from "next/image";
import React from "react";

import { NodeViewProps, NodeViewWrapper } from "@tiptap/react";
import { Loader2 } from "lucide-react";
import { MdDelete } from "react-icons/md";

import { Button } from "@/components/ui/button";
import { useMediaMutation } from "@/hooks/use-media-mutation";
import { blurDataURL } from "@/lib/blur-data-image-url";
import { env } from "@/lib/env/client";
import TokenManager from "@/lib/token-manager";

interface Props extends NodeViewProps {
  deleteNode: () => void;
}

export const ImageNodeView: React.FC<Props> = ({ node, deleteNode }) => {
  const { src, alt } = node.attrs;
  const token = TokenManager.getToken();

  const { mutateDeleteFileAsync, isPendingDeleteFile } = useMediaMutation(
    token!
  );

  const handleRemove = React.useCallback(async () => {
    const filePath = src.replace(`${env.NEXT_PUBLIC_MEDIA_URL}`, "");
    try {
      await mutateDeleteFileAsync({ filePath });
      deleteNode(); // baru hapus dari editor setelah server sukses
    } catch (_err) {
      // errorToast udah dihandle di hook
    }
  }, [src, deleteNode, mutateDeleteFileAsync]);

  // handle backspace/delete keyboard
  React.useEffect(() => {
    const handleKey = async (e: KeyboardEvent) => {
      if (e.key === "Backspace" || e.key === "Delete") {
        e.preventDefault();
        await handleRemove();
      }
    };

    const dom = document.getElementById(node.attrs.id);
    if (dom) {
      dom.addEventListener("keydown", handleKey);
      return () => dom.removeEventListener("keydown", handleKey);
    }
  }, [handleRemove, node.attrs.id]);

  return (
    <NodeViewWrapper
      className="group relative mt-5 inline-block"
      id={node.attrs.id}
    >
      <div className="relative w-full overflow-hidden rounded-lg">
        <Image
          src={src}
          alt={alt || "Uploaded Image"}
          className="h-auto w-full object-cover"
          width={1280}
          height={720}
          placeholder="blur"
          blurDataURL={blurDataURL}
        />
        <div className="absolute right-2.5 bottom-2.5 flex items-center">
          <Button
            variant="outline-destructive"
            onClick={handleRemove}
            disabled={isPendingDeleteFile}
          >
            {isPendingDeleteFile ? (
              <Loader2 className="animate-spin" />
            ) : (
              <MdDelete />
            )}
          </Button>
        </div>
      </div>
    </NodeViewWrapper>
  );
};
