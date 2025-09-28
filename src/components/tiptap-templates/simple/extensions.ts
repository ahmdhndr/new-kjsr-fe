import { Highlight } from "@tiptap/extension-highlight";
import { Image, ImageOptions } from "@tiptap/extension-image";
import { TaskItem, TaskList } from "@tiptap/extension-list";
import { Subscript } from "@tiptap/extension-subscript";
import { Superscript } from "@tiptap/extension-superscript";
import TextAlign from "@tiptap/extension-text-align";
import { Typography } from "@tiptap/extension-typography";
import { Selection } from "@tiptap/extensions";
import { NodeSelection } from "@tiptap/pm/state";
import { Extension, ReactNodeViewRenderer } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";

import HorizontalRule from "@/components/tiptap-node/horizontal-rule-node/horizontal-rule-node-extension";
import { ImageNodeView } from "@/components/tiptap-node/image-upload-node";

export interface CustomImageOptions extends ImageOptions {
  onDelete?: (src: string) => void;
}

export const CustomImage = Image.extend<CustomImageOptions>({
  name: "image",
  addOptions() {
    return {
      ...Image.options,
      onDelete: undefined, // callback custom
    };
  },

  addNodeView() {
    return ReactNodeViewRenderer(ImageNodeView);
  },
  addKeyboardShortcuts() {
    return {
      Backspace: () => {
        const { state } = this.editor.view;
        const { selection } = state;

        if (
          selection instanceof NodeSelection &&
          selection.node?.type.name === this.name
        ) {
          this.options.onDelete?.(selection.node.attrs.src);
          return this.editor.commands.deleteSelection();
        }

        return false;
      },
      Delete: () => {
        const { state } = this.editor.view;
        const { selection } = state;

        if (
          selection instanceof NodeSelection &&
          selection.node?.type.name === this.name
        ) {
          this.options.onDelete?.(selection.node.attrs.src);
          return this.editor.commands.deleteSelection();
        }

        return false;
      },
    };
  },
});

export const extensions = [
  StarterKit.configure({
    horizontalRule: false,
    link: {
      openOnClick: false,
      enableClickSelection: true,
    },
  }) as Extension,
  HorizontalRule,
  TextAlign.configure({ types: ["heading", "paragraph"] }),
  TaskList,
  TaskItem.configure({ nested: true }),
  Highlight.configure({ multicolor: true }),
  CustomImage,
  Typography,
  Superscript,
  Subscript,
  Selection,
];
