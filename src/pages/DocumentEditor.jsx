import React, { useState, useRef, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
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
  MoreHorizontal,
  ChevronLeft,
  Bot,
  Sparkles,
  MessageSquare,
  X,
  Send,
  Plus,
  Hash,
  Type
} from 'lucide-react';
import { cn } from '../lib/utils';

const DocumentEditor = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const editorRef = useRef(null);
  const [title, setTitle] = useState('Untitled Document');
  const [content, setContent] = useState('');
  const [showAISidebar, setShowAISidebar] = useState(false);
  const [aiPrompt, setAiPrompt] = useState('');
  const [selectedText, setSelectedText] = useState('');
  const [showFormatMenu, setShowFormatMenu] = useState(false);
  const [formatMenuPosition, setFormatMenuPosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    // Simulate loading document data
    if (id) {
      setTitle(`Document ${id}`);
      setContent('Start typing your document here...');
    }
  }, [id]);

  const handleTextSelection = () => {
    const selection = window.getSelection();
    const text = selection.toString();
    
    if (text.length > 0) {
      setSelectedText(text);
      const range = selection.getRangeAt(0);
      const rect = range.getBoundingClientRect();
      setFormatMenuPosition({
        x: rect.left + rect.width / 2,
        y: rect.top - 50
      });
      setShowFormatMenu(true);
    } else {
      setShowFormatMenu(false);
    }
  };

  const formatText = (command, value = null) => {
    document.execCommand(command, false, value);
    editorRef.current?.focus();
  };

  const insertBlock = (type) => {
    const editor = editorRef.current;
    if (!editor) return;

    const selection = window.getSelection();
    const range = selection.getRangeAt(0);
    
    let element;
    switch (type) {
      case 'heading1':
        element = document.createElement('h1');
        element.className = 'text-3xl font-bold mb-4 mt-6';
        element.textContent = 'Heading 1';
        break;
      case 'heading2':
        element = document.createElement('h2');
        element.className = 'text-2xl font-semibold mb-3 mt-5';
        element.textContent = 'Heading 2';
        break;
      case 'heading3':
        element = document.createElement('h3');
        element.className = 'text-xl font-medium mb-2 mt-4';
        element.textContent = 'Heading 3';
        break;
      case 'quote':
        element = document.createElement('blockquote');
        element.className = 'border-l-4 border-gray-300 pl-4 italic text-gray-700 my-4';
        element.textContent = 'Quote';
        break;
      case 'code':
        element = document.createElement('pre');
        element.className = 'bg-gray-100 rounded p-4 my-4 overflow-x-auto';
        element.innerHTML = '<code>Code block</code>';
        break;
      default:
        return;
    }

    range.insertNode(element);
    range.setStartAfter(element);
    selection.removeAllRanges();
    selection.addRange(range);
  };

  const handleAIPromptSubmit = () => {
    if (!aiPrompt.trim()) return;
    
    // Simulate AI response (feature pending)
    console.log('AI Prompt:', aiPrompt);
    setAiPrompt('');
  };

  return (
    <div className="min-h-screen bg-white flex">
      {/* Main Editor Area */}
      <div className={cn(
        "flex-1 transition-all duration-300",
        showAISidebar ? "mr-80" : "mr-0"
      )}>
        {/* Header */}
        <div className="border-b border-gray-200 px-6 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <button
              onClick={() => navigate('/dashboard')}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="text-xl font-semibold bg-transparent border-none outline-none focus:bg-gray-50 rounded px-2 py-1"
            />
          </div>
          <div className="flex items-center space-x-2">
            <button
              onClick={() => setShowAISidebar(!showAISidebar)}
              className={cn(
                "flex items-center space-x-2 px-3 py-2 rounded-lg transition-colors",
                showAISidebar 
                  ? "bg-blue-100 text-blue-700 hover:bg-blue-200" 
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              )}
            >
              <Bot className="w-4 h-4" />
              <span className="text-sm font-medium">AI Assistant</span>
            </button>
            <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
              Share
            </button>
          </div>
        </div>

        {/* Toolbar */}
        <div className="border-b border-gray-200 px-6 py-3">
          <div className="flex items-center space-x-1">
            <div className="flex items-center space-x-1 mr-4">
              <button
                onClick={() => formatText('bold')}
                className="p-2 hover:bg-gray-100 rounded transition-colors"
                title="Bold"
              >
                <Bold className="w-4 h-4" />
              </button>
              <button
                onClick={() => formatText('italic')}
                className="p-2 hover:bg-gray-100 rounded transition-colors"
                title="Italic"
              >
                <Italic className="w-4 h-4" />
              </button>
              <button
                onClick={() => formatText('underline')}
                className="p-2 hover:bg-gray-100 rounded transition-colors"
                title="Underline"
              >
                <Underline className="w-4 h-4" />
              </button>
            </div>

            <div className="w-px h-6 bg-gray-300 mx-2" />

            <div className="flex items-center space-x-1 mr-4">
              <button
                onClick={() => insertBlock('heading1')}
                className="p-2 hover:bg-gray-100 rounded transition-colors"
                title="Heading 1"
              >
                <Hash className="w-4 h-4" />
              </button>
              <button
                onClick={() => insertBlock('quote')}
                className="p-2 hover:bg-gray-100 rounded transition-colors"
                title="Quote"
              >
                <Quote className="w-4 h-4" />
              </button>
              <button
                onClick={() => formatText('insertUnorderedList')}
                className="p-2 hover:bg-gray-100 rounded transition-colors"
                title="Bullet List"
              >
                <List className="w-4 h-4" />
              </button>
              <button
                onClick={() => formatText('insertOrderedList')}
                className="p-2 hover:bg-gray-100 rounded transition-colors"
                title="Numbered List"
              >
                <ListOrdered className="w-4 h-4" />
              </button>
            </div>

            <div className="w-px h-6 bg-gray-300 mx-2" />

            <div className="flex items-center space-x-1">
              <button
                onClick={() => formatText('justifyLeft')}
                className="p-2 hover:bg-gray-100 rounded transition-colors"
                title="Align Left"
              >
                <AlignLeft className="w-4 h-4" />
              </button>
              <button
                onClick={() => formatText('justifyCenter')}
                className="p-2 hover:bg-gray-100 rounded transition-colors"
                title="Align Center"
              >
                <AlignCenter className="w-4 h-4" />
              </button>
              <button
                onClick={() => formatText('justifyRight')}
                className="p-2 hover:bg-gray-100 rounded transition-colors"
                title="Align Right"
              >
                <AlignRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Editor */}
        <div className="flex-1 px-6 py-8">
          <div
            ref={editorRef}
            contentEditable
            className="min-h-96 outline-none text-gray-900 leading-relaxed"
            style={{ fontSize: '16px', lineHeight: '1.6' }}
            onMouseUp={handleTextSelection}
            onKeyUp={handleTextSelection}
            suppressContentEditableWarning={true}
          >
            <p className="mb-4">Start writing your document here...</p>
            <p className="mb-4 text-gray-500">
              Use the toolbar above to format your text, or select text to see formatting options.
            </p>
          </div>
        </div>

        {/* Floating Format Menu */}
        {showFormatMenu && (
          <div
            className="fixed bg-gray-900 text-white rounded-lg shadow-lg p-2 flex items-center space-x-1 z-50"
            style={{
              left: formatMenuPosition.x - 100,
              top: formatMenuPosition.y,
            }}
          >
            <button
              onClick={() => formatText('bold')}
              className="p-2 hover:bg-gray-700 rounded transition-colors"
            >
              <Bold className="w-4 h-4" />
            </button>
            <button
              onClick={() => formatText('italic')}
              className="p-2 hover:bg-gray-700 rounded transition-colors"
            >
              <Italic className="w-4 h-4" />
            </button>
            <button
              onClick={() => formatText('underline')}
              className="p-2 hover:bg-gray-700 rounded transition-colors"
            >
              <Underline className="w-4 h-4" />
            </button>
            <button
              onClick={() => formatText('createLink', prompt('Enter URL:'))}
              className="p-2 hover:bg-gray-700 rounded transition-colors"
            >
              <Link className="w-4 h-4" />
            </button>
          </div>
        )}
      </div>

      {/* AI Sidebar */}
      {showAISidebar && (
        <div className="fixed right-0 top-0 w-80 h-full bg-gray-50 border-l border-gray-200 flex flex-col z-40">
          {/* Sidebar Header */}
          <div className="p-4 border-b border-gray-200 flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
                <Bot className="w-4 h-4 text-blue-600" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-900">AI Assistant</h3>
                <p className="text-xs text-gray-500">Feature Pending</p>
              </div>
            </div>
            <button
              onClick={() => setShowAISidebar(false)}
              className="p-1 hover:bg-gray-200 rounded transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Chat Area */}
          <div className="flex-1 p-4 overflow-y-auto">
            <div className="text-center py-8">
              <div className="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center mx-auto mb-4">
                <Sparkles className="w-8 h-8 text-gray-400" />
              </div>
              <h4 className="font-medium text-gray-900 mb-2">AI-Powered Writing Assistant</h4>
              <p className="text-sm text-gray-500 mb-4">
                This feature is currently under development. Soon you'll be able to:
              </p>
              <ul className="text-sm text-gray-500 text-left space-y-2 max-w-xs mx-auto">
                <li className="flex items-start space-x-2">
                  <span className="w-1.5 h-1.5 bg-gray-400 rounded-full mt-2 flex-shrink-0"></span>
                  <span>Get writing suggestions and improvements</span>
                </li>
                <li className="flex items-start space-x-2">
                  <span className="w-1.5 h-1.5 bg-gray-400 rounded-full mt-2 flex-shrink-0"></span>
                  <span>Generate content based on prompts</span>
                </li>
                <li className="flex items-start space-x-2">
                  <span className="w-1.5 h-1.5 bg-gray-400 rounded-full mt-2 flex-shrink-0"></span>
                  <span>Fix grammar and style issues</span>
                </li>
                <li className="flex items-start space-x-2">
                  <span className="w-1.5 h-1.5 bg-gray-400 rounded-full mt-2 flex-shrink-0"></span>
                  <span>Summarize and restructure content</span>
                </li>
              </ul>
            </div>
          </div>

          {/* Input Area */}
          <div className="p-4 border-t border-gray-200">
            <div className="flex space-x-2">
              <input
                type="text"
                value={aiPrompt}
                onChange={(e) => setAiPrompt(e.target.value)}
                placeholder="Ask AI for help... (coming soon)"
                className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                disabled
                onKeyPress={(e) => e.key === 'Enter' && handleAIPromptSubmit()}
              />
              <button
                onClick={handleAIPromptSubmit}
                disabled
                className="px-3 py-2 bg-gray-300 text-gray-500 rounded-lg cursor-not-allowed"
              >
                <Send className="w-4 h-4" />
              </button>
            </div>
            <p className="text-xs text-gray-400 mt-2">
              AI features are currently in development
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default DocumentEditor;