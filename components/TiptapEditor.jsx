"use client";

import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { Bold, Italic, List, ListOrdered, Quote, Heading2 } from "lucide-react";
import { useEffect } from "react";

const MenuBar = ({ editor }) => {
  if (!editor) return null;

  const btnClass = (isActive) =>
    `p-2 rounded-lg transition-colors ${
      isActive
        ? "bg-emerald-600 text-white"
        : "text-slate-500 hover:bg-slate-100"
    }`;

  return (
    <div className="flex flex-wrap gap-1 pb-4 mb-4 border-b border-slate-100">
      <button
        type="button"
        onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
        className={btnClass(editor.isActive("heading", { level: 2 }))}
      >
        <Heading2 size={18} />
      </button>
      <button
        type="button"
        onClick={() => editor.chain().focus().toggleBold().run()}
        className={btnClass(editor.isActive("bold"))}
      >
        <Bold size={18} />
      </button>
      <button
        type="button"
        onClick={() => editor.chain().focus().toggleItalic().run()}
        className={btnClass(editor.isActive("italic"))}
      >
        <Italic size={18} />
      </button>
      <button
        type="button"
        onClick={() => editor.chain().focus().toggleBulletList().run()}
        className={btnClass(editor.isActive("bulletList"))}
      >
        <List size={18} />
      </button>
      <button
        type="button"
        onClick={() => editor.chain().focus().toggleOrderedList().run()}
        className={btnClass(editor.isActive("orderedList"))}
      >
        <ListOrdered size={18} />
      </button>
      <button
        type="button"
        onClick={() => editor.chain().focus().toggleBlockquote().run()}
        className={btnClass(editor.isActive("blockquote"))}
      >
        <Quote size={18} />
      </button>
    </div>
  );
};

export default function TiptapEditor({ onChange, content }) {
  const editor = useEditor({
    extensions: [StarterKit],
    immediatelyRender: false,
    content: "<p>Tulis detail kegiatan di sini...</p>",
    onUpdate: ({ editor }) => {
      onChange(editor.getHTML());
    },
    editorProps: {
      attributes: {
        class:
          "prose prose-sm sm:prose lg:prose-lg xl:prose-2xl focus:outline-none min-h-[300px] max-w-none text-slate-700",
      },
    },
  });

  // singkron konten jika ada perubahan
  useEffect(() => {
    if (editor && content !== undefined && content !== editor.getHTML()) {
      // Gunakan requestAnimationFrame agar tidak bentrok dengan siklus render React
      window.requestAnimationFrame(() => {
        editor.commands.setContent(content);
      });
    }
  }, [content, editor]);
  return (
    <div className="w-full">
      <MenuBar editor={editor} />
      <EditorContent editor={editor} />
    </div>
  );
}
