import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { 
  FileText, 
  Settings, 
  User, 
  Search, 
  Plus,
  Menu,
  Bell,
  ChevronDown
} from 'lucide-react';
import * as DropdownMenu from '@radix-ui/react-dropdown-menu';
import * as Dialog from '@radix-ui/react-dialog';
import { cn } from '../../lib/utils';

const Navbar = ({ onMenuToggle, isMenuOpen = false }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const [searchOpen, setSearchOpen] = React.useState(false);
  const [searchQuery, setSearchQuery] = React.useState('');

  const isActive = (path) => {
    return location.pathname === path;
  };

  const handleNewDocument = () => {
    // Generate a simple ID for demo purposes
    const newDocId = `doc_${Date.now()}`;
    navigate(`/document/${newDocId}`);
  };

  const handleSearch = (e) => {
    e.preventDefault();
    // Search functionality would be implemented here
    console.log('Searching for:', searchQuery);
    setSearchOpen(false);
    setSearchQuery('');
  };

  return (
    <nav className="h-16 bg-white border-b border-gray-200 flex items-center justify-between px-4 sticky top-0 z-50">
      {/* Left Section */}
      <div className="flex items-center space-x-4">
        {/* Menu Toggle */}
        <button
          onClick={onMenuToggle}
          className="p-2 hover:bg-gray-100 rounded-md transition-colors lg:hidden"
        >
          <Menu className="h-5 w-5" />
        </button>

        {/* Logo */}
        <Link to="/dashboard" className="flex items-center space-x-2">
          <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
            <FileText className="h-5 w-5 text-white" />
          </div>
          <span className="font-semibold text-lg text-gray-900 hidden sm:block">
            SmartCompletion
          </span>
        </Link>

        {/* Navigation Links */}
        <div className="hidden md:flex items-center space-x-1">
          <Link
            to="/dashboard"
            className={cn(
              "px-3 py-2 rounded-md text-sm font-medium transition-colors",
              isActive('/dashboard')
                ? "bg-gray-100 text-gray-900"
                : "text-gray-600 hover:text-gray-900 hover:bg-gray-50"
            )}
          >
            Dashboard
          </Link>
        </div>
      </div>

      {/* Center Section - Search */}
      <div className="flex-1 max-w-md mx-4">
        <Dialog.Root open={searchOpen} onOpenChange={setSearchOpen}>
          <Dialog.Trigger asChild>
            <button className="w-full flex items-center space-x-3 px-4 py-2 bg-gray-50 hover:bg-gray-100 rounded-lg transition-colors text-left">
              <Search className="h-4 w-4 text-gray-400" />
              <span className="text-sm text-gray-500 flex-1">Search documents...</span>
              <kbd className="hidden sm:inline-flex items-center px-2 py-1 text-xs font-medium text-gray-500 bg-white border border-gray-200 rounded">
                ⌘K
              </kbd>
            </button>
          </Dialog.Trigger>
          <Dialog.Portal>
            <Dialog.Overlay className="fixed inset-0 bg-black/50 z-50" />
            <Dialog.Content className="fixed top-[20%] left-1/2 transform -translate-x-1/2 w-full max-w-lg bg-white rounded-lg shadow-xl z-50">
              <form onSubmit={handleSearch} className="p-4">
                <div className="flex items-center space-x-3 mb-4">
                  <Search className="h-5 w-5 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search documents..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="flex-1 text-lg outline-none"
                    autoFocus
                  />
                </div>
                <div className="border-t pt-4">
                  <p className="text-sm text-gray-500 mb-2">Recent searches</p>
                  <div className="space-y-2">
                    <div className="text-sm text-gray-600 hover:bg-gray-50 p-2 rounded cursor-pointer">
                      Project proposal
                    </div>
                    <div className="text-sm text-gray-600 hover:bg-gray-50 p-2 rounded cursor-pointer">
                      Meeting notes
                    </div>
                  </div>
                </div>
              </form>
            </Dialog.Content>
          </Dialog.Portal>
        </Dialog.Root>
      </div>

      {/* Right Section */}
      <div className="flex items-center space-x-2">
        {/* New Document Button */}
        <button
          onClick={handleNewDocument}
          className="flex items-center space-x-2 px-3 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-md transition-colors text-sm font-medium"
        >
          <Plus className="h-4 w-4" />
          <span className="hidden sm:inline">New</span>
        </button>

        {/* Notifications */}
        <button className="p-2 hover:bg-gray-100 rounded-md transition-colors relative">
          <Bell className="h-5 w-5 text-gray-600" />
          <div className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></div>
        </button>

        {/* User Menu */}
        <DropdownMenu.Root>
          <DropdownMenu.Trigger asChild>
            <button className="flex items-center space-x-2 p-2 hover:bg-gray-100 rounded-md transition-colors">
              <div className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center">
                <User className="h-4 w-4 text-gray-600" />
              </div>
              <ChevronDown className="h-4 w-4 text-gray-600 hidden sm:block" />
            </button>
          </DropdownMenu.Trigger>
          <DropdownMenu.Portal>
            <DropdownMenu.Content
              className="min-w-[200px] bg-white rounded-md shadow-lg border border-gray-200 p-1 z-50"
              align="end"
              sideOffset={5}
            >
              <DropdownMenu.Item className="flex items-center space-x-2 px-3 py-2 text-sm text-gray-700 hover:bg-gray-50 rounded cursor-pointer outline-none">
                <User className="h-4 w-4" />
                <span>Profile</span>
              </DropdownMenu.Item>
              <DropdownMenu.Item 
                className="flex items-center space-x-2 px-3 py-2 text-sm text-gray-700 hover:bg-gray-50 rounded cursor-pointer outline-none"
                onSelect={() => navigate('/settings')}
              >
                <Settings className="h-4 w-4" />
                <span>Settings</span>
              </DropdownMenu.Item>
              <DropdownMenu.Separator className="h-px bg-gray-200 my-1" />
              <DropdownMenu.Item className="flex items-center space-x-2 px-3 py-2 text-sm text-red-600 hover:bg-red-50 rounded cursor-pointer outline-none">
                <span>Sign out</span>
              </DropdownMenu.Item>
            </DropdownMenu.Content>
          </DropdownMenu.Portal>
        </DropdownMenu.Root>
      </div>
    </nav>
  );
};

export default Navbar;