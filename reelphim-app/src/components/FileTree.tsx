import React, { useState } from 'react';
import { Folder, ChevronRight, ChevronDown, Video } from 'lucide-react';

interface FileNode {
  name: string;
  type: string;
  size: number;
  progress?: number;
  extension?: string;
  path?: string;
  children?: { [key: string]: FileNode };
}

interface FileTreeProps {
  structure: FileNode;
  onFileSelect: (file: FileNode) => void;
  selectedPath?: string;
}

export const FileTree: React.FC<FileTreeProps> = ({ structure, onFileSelect, selectedPath }) => {
  const [expandedFolders, setExpandedFolders] = useState<Set<string>>(new Set());

  const toggleFolder = (path: string) => {
    setExpandedFolders(prev => {
      const next = new Set(prev);
      if (next.has(path)) {
        next.delete(path);
      } else {
        next.add(path);
      }
      return next;
    });
  };

  const formatSize = (bytes: number): string => {
    const sizes = ['B', 'KB', 'MB', 'GB'];
    let i = 0;
    let size = bytes;
    while (size >= 1024 && i < sizes.length - 1) {
      size /= 1024;
      i++;
    }
    return `${size.toFixed(2)} ${sizes[i]}`;
  };

  const hasVideoInDirectory = (node: FileNode): boolean => {
    if (!node) return false;
    if (node.type === 'video') return true;
    if (node.type === 'directory' && node.children) {
      return Object.values(node.children).some(child => hasVideoInDirectory(child));
    }
    return false;
  };

  const renderNode = (node: FileNode, currentPath: string = ''): React.ReactNode => {
    if (!node) return null;

    const fullPath = currentPath ? `${currentPath}/${node.name}` : node.name;

    if (node.type === 'directory') {
      const isExpanded = expandedFolders.has(fullPath);
      const hasVideos = hasVideoInDirectory(node);

      if (!hasVideos) return null;

      return (
        <div key={fullPath} className="space-y-1">
          <div
            className={`flex items-center gap-2 p-2 hover:bg-gray-700/50 rounded cursor-pointer ${
              isExpanded ? 'bg-gray-700/30' : ''
            }`}
            onClick={() => toggleFolder(fullPath)}
          >
            {isExpanded ? (
              <ChevronDown size={16} className="text-gray-400" />
            ) : (
              <ChevronRight size={16} className="text-gray-400" />
            )}
            <Folder size={16} className="text-gray-400" />
            <span className="flex-1 truncate">{node.name}</span>
            <span className="text-sm text-gray-400">{formatSize(node.size)}</span>
          </div>

          {isExpanded && node.children && (
            <div className="pl-6">
              {Object.values(node.children).map(child => renderNode(child, fullPath))}
            </div>
          )}
        </div>
      );
    }

    if (node.type === 'video') {
      return (
        <div
          key={fullPath}
          className={`flex items-center gap-2 p-2 hover:bg-gray-700/50 rounded cursor-pointer ${
            selectedPath === node.path ? 'bg-primary/20 ring-1 ring-primary' : ''
          }`}
          onClick={() => onFileSelect(node)}
        >
          <Video size={16} className="text-blue-400" />
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2">
              <span className="truncate">{node.name}</span>
              <span className="flex-shrink-0 px-2 py-0.5 text-xs rounded-full bg-gray-700 text-gray-300">
                {node.extension?.toUpperCase()}
              </span>
            </div>
            <div className="flex items-center gap-2 text-sm text-gray-400">
              <span>{formatSize(node.size)}</span>
              {node.progress !== undefined && node.progress < 1 && (
                <span className="text-yellow-400">
                  {(node.progress * 100).toFixed(1)}%
                </span>
              )}
            </div>
          </div>
        </div>
      );
    }

    return null;
  };

  return (
    <div className="space-y-2 rounded-lg bg-gray-800/50 p-4 max-h-[500px] overflow-y-auto">
      <div className="mb-4 pb-2 border-b border-gray-700">
        <div className="text-sm text-gray-400">
          Total Size: {formatSize(structure.size)}
        </div>
      </div>
      {renderNode(structure)}
    </div>
  );
};

export default FileTree;