import React, { useState, useRef, useCallback, useEffect } from 'react';
import { 
  Bold, 
  Italic, 
  Underline, 
  AlignLeft, 
  AlignCenter, 
  AlignRight,
  List,
  ListOrdered,
  Quote,
  Code,
  Link,
  Image,
  Heading1,
  Heading2,
  Heading3,
  Type,
  Undo,
  Redo
} from 'lucide-react';
import { cn } from '../../lib/utils';

const RichTextEditor = ({ 
  content = '', 
  onChange, 
  placeholder = 'Start writing...', 
  className = '',
  readOnly = false 
}) => {
  const editorRef = useRef(null);
  const [selectedText, setSelectedText] = useState('');
  const [showLinkDialog, setShowLinkDialog] = useState(false);
  const [linkUrl, setLinkUrl] = useState('');

  const execCommand = useCallback((command, value = null) => {
    document.execCommand(command, false, value);
    if (editorRef.current) {
      editorRef.current.focus();
      handleContentChange();
    }
  }, []);

  const handleContentChange = useCallback(() => {
    if (editorRef.current && onChange) {
      const content = editorRef.current.innerHTML;
      onChange(content);
    }
  }, [onChange]);

  const handleSelectionChange = useCallback(() => {
    const selection = window.getSelection();
    if (selection.rangeCount > 0) {
      setSelectedText(selection.toString());
    }
  }, []);

  const insertLink = useCallback(() => {
    if (linkUrl.trim()) {
      execCommand('createLink', linkUrl);
      setShowLinkDialog(false);
      setLinkUrl('');
    }
  }, [linkUrl, execCommand]);

  const insertImage = useCallback(() => {
    const url = prompt('Enter image URL:');
    if (url) {
      execCommand('insertImage', url);
    }
  }, [execCommand]);

  const formatBlock = useCallback((tag) => {
    execCommand('formatBlock', `<${tag}>`);
  }, [execCommand]);

  const handleKeyDown = useCallback((e) => {
    // Handle common shortcuts
    if (e.ctrlKey || e.metaKey) {
      switch (e.key) {
        case 'b':
          e.preventDefault();
          execCommand('bold');
          break;
        case 'i':
          e.preventDefault();
          execCommand('italic');
          break;
        case 'u':
          e.preventDefault();
          execCommand('underline');
          break;
        case 'z':
          e.preventDefault();
          if (e.shiftKey) {
            execCommand('redo');
          } else {
            execCommand('undo');
          }
          break;
      }
    }

    // Handle Enter key for better formatting
    if (e.key === 'Enter') {
      const selection = window.getSelection();
      const range = selection.getRangeAt(0);
      const container = range.commonAncestorContainer;
      
      // Check if we're in a heading and convert to paragraph
      const heading = container.nodeType === Node.TEXT_NODE 
        ? container.parentElement.closest('h1, h2, h3, h4, h5, h6')
        : container.closest('h1, h2, h3, h4, h5, h6');
      
      if (heading && range.collapsed && range.endOffset === container.textContent?.length) {
        e.preventDefault();
        document.execCommand('insertHTML', false, '<br><p><br></p>');
      }
    }
  }, [execCommand]);

  const handlePaste = useCallback((e) => {
    e.preventDefault();
    const text = e.clipboardData.getData('text/plain');
    document.execCommand('insertText', false, text);
  }, []);

  useEffect(() => {
    document.addEventListener('selectionchange', handleSelectionChange);
    return () => {
      document.removeEventListener('selectionchange', handleSelectionChange);
    };
  }, [handleSelectionChange]);

  useEffect(() => {
    if (editorRef.current && content !== editorRef.current.innerHTML) {
      editorRef.current.innerHTML = content;
    }
  }, [content]);

  const ToolbarButton = ({ onClick, active = false, disabled = false, children, title }) => (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      title={title}
      className={cn(
        "p-2 rounded-md transition-colors duration-200 hover:bg-gray-100 dark:hover:bg-gray-800",
        "focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50",
        active && "bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300",
        disabled && "opacity-50 cursor-not-allowed"
      )}
    >
      {children}
    </button>
  );

  const ToolbarSeparator = () => (
    <div className="w-px h-6 bg-gray-300 dark:bg-gray-600 mx-1" />
  );

  return (
    <div className={cn("border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden", className)}>
      {!readOnly && (
        <div className="flex items-center gap-1 p-2 border-b border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800">
          <ToolbarButton
            onClick={() => execCommand('undo')}
            title="Undo (Ctrl+Z)"
          >
            <Undo size={16} />
          </ToolbarButton>
          <ToolbarButton
            onClick={() => execCommand('redo')}
            title="Redo (Ctrl+Shift+Z)"
          >
            <Redo size={16} />
          </ToolbarButton>
          
          <ToolbarSeparator />
          
          <ToolbarButton
            onClick={() => formatBlock('h1')}
            title="Heading 1"
          >
            <Heading1 size={16} />
          </ToolbarButton>
          <ToolbarButton
            onClick={() => formatBlock('h2')}
            title="Heading 2"
          >
            <Heading2 size={16} />
          </ToolbarButton>
          <ToolbarButton
            onClick={() => formatBlock('h3')}
            title="Heading 3"
          >
            <Heading3 size={16} />
          </ToolbarButton>
          <ToolbarButton
            onClick={() => formatBlock('p')}
            title="Paragraph"
          >
            <Type size={16} />
          </ToolbarButton>

          <ToolbarSeparator />

          <ToolbarButton
            onClick={() => execCommand('bold')}
            title="Bold (Ctrl+B)"
          >
            <Bold size={16} />
          </ToolbarButton>
          <ToolbarButton
            onClick={() => execCommand('italic')}
            title="Italic (Ctrl+I)"
          >
            <Italic size={16} />
          </ToolbarButton>
          <ToolbarButton
            onClick={() => execCommand('underline')}
            title="Underline (Ctrl+U)"
          >
            <Underline size={16} />
          </ToolbarButton>
          <ToolbarButton
            onClick={() => execCommand('strikeThrough')}
            title="Strikethrough"
          >
            <Code size={16} />
          </ToolbarButton>

          <ToolbarSeparator />

          <ToolbarButton
            onClick={() => execCommand('justifyLeft')}
            title="Align Left"
          >
            <AlignLeft size={16} />
          </ToolbarButton>
          <ToolbarButton
            onClick={() => execCommand('justifyCenter')}
            title="Align Center"
          >
            <AlignCenter size={16} />
          </ToolbarButton>
          <ToolbarButton
            onClick={() => execCommand('justifyRight')}
            title="Align Right"
          >
            <AlignRight size={16} />
          </ToolbarButton>

          <ToolbarSeparator />

          <ToolbarButton
            onClick={() => execCommand('insertUnorderedList')}
            title="Bullet List"
          >
            <List size={16} />
          </ToolbarButton>
          <ToolbarButton
            onClick={() => execCommand('insertOrderedList')}
            title="Numbered List"
          >
            <ListOrdered size={16} />
          </ToolbarButton>
          <ToolbarButton
            onClick={() => formatBlock('blockquote')}
            title="Quote"
          >
            <Quote size={16} />
          </ToolbarButton>

          <ToolbarSeparator />

          <ToolbarButton
            onClick={() => setShowLinkDialog(true)}
            disabled={!selectedText}
            title="Insert Link"
          >
            <Link size={16} />
          </ToolbarButton>
          <ToolbarButton
            onClick={insertImage}
            title="Insert Image"
          >
            <Image size={16} />
          </ToolbarButton>
        </div>
      )}

      <div
        ref={editorRef}
        contentEditable={!readOnly}
        suppressContentEditableWarning={true}
        onInput={handleContentChange}
        onKeyDown={handleKeyDown}
        onPaste={handlePaste}
        className={cn(
          "min-h-[400px] p-6 focus:outline-none prose prose-gray dark:prose-invert max-w-none",
          "prose-headings:font-semibold prose-headings:tracking-tight",
          "prose-h1:text-3xl prose-h1:mb-4 prose-h1:mt-6",
          "prose-h2:text-2xl prose-h2:mb-3 prose-h2:mt-5",
          "prose-h3:text-xl prose-h3:mb-2 prose-h3:mt-4",
          "prose-p:mb-4 prose-p:leading-7",
          "prose-blockquote:border-l-4 prose-blockquote:border-gray-300 prose-blockquote:pl-4 prose-blockquote:italic",
          "prose-ul:mb-4 prose-ol:mb-4",
          "prose-li:mb-1",
          "prose-a:text-blue-600 prose-a:no-underline hover:prose-a:underline",
          "prose-img:rounded-lg prose-img:shadow-md",
          readOnly && "cursor-default"
        )}
        style={{
          wordBreak: 'break-word',
          overflowWrap: 'break-word'
        }}
        data-placeholder={placeholder}
      />

      {showLinkDialog && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-xl max-w-md w-full mx-4">
            <h3 className="text-lg font-semibold mb-4">Insert Link</h3>
            <div className="mb-4">
              <label className="block text-sm font-medium mb-2">URL</label>
              <input
                type="url"
                value={linkUrl}
                onChange={(e) => setLinkUrl(e.target.value)}
                placeholder="https://example.com"
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                autoFocus
              />
            </div>
            <div className="flex justify-end gap-2">
              <button
                onClick={() => setShowLinkDialog(false)}
                className="px-4 py-2 text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200"
              >
                Cancel
              </button>
              <button
                onClick={insertLink}
                disabled={!linkUrl.trim()}
                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Insert
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default RichTextEditor;