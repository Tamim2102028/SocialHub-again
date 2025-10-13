import React, { useState, useRef, useEffect } from "react";
import { FaChevronRight, FaHome, FaEllipsisH } from "react-icons/fa";

interface BreadcrumbItem {
  id: string;
  name: string;
}

interface BreadcrumbProps {
  currentPath: BreadcrumbItem[];
  onNavigate: (index: number) => void;
}

const Breadcrumb: React.FC<BreadcrumbProps> = ({ currentPath, onNavigate }) => {
  const [showDropdown, setShowDropdown] = useState(false);
  const [isOverflowing, setIsOverflowing] = useState(false);
  const breadcrumbRef = useRef<HTMLDivElement>(null);

  // Check if breadcrumb is overflowing
  useEffect(() => {
    const checkOverflow = () => {
      if (breadcrumbRef.current) {
        const isOverflow =
          breadcrumbRef.current.scrollWidth > breadcrumbRef.current.clientWidth;
        setIsOverflowing(isOverflow);
      }
    };

    checkOverflow();
    window.addEventListener("resize", checkOverflow);
    return () => window.removeEventListener("resize", checkOverflow);
  }, [currentPath]);

  // Render full breadcrumb for short paths
  const renderFullBreadcrumb = () => (
    <nav className="flex items-center space-x-2 overflow-hidden text-sm">
      {currentPath.map((item, index) => (
        <React.Fragment key={item.id}>
          {index === 0 ? (
            <button
              onClick={() => onNavigate(index)}
              className="flex items-center whitespace-nowrap text-blue-600 transition-colors hover:text-blue-800"
            >
              <FaHome className="mr-1 h-3 w-3" />
              <span className="max-w-[120px] truncate">{item.name}</span>
            </button>
          ) : (
            <>
              <FaChevronRight className="h-3 w-3 flex-shrink-0 text-gray-400" />
              <button
                onClick={() => onNavigate(index)}
                className={`whitespace-nowrap transition-colors ${
                  index === currentPath.length - 1
                    ? "font-medium text-gray-900"
                    : "text-blue-600 hover:text-blue-800"
                }`}
              >
                <span className="block max-w-[120px] truncate">
                  {item.name}
                </span>
              </button>
            </>
          )}
        </React.Fragment>
      ))}
    </nav>
  );

  // Render condensed breadcrumb for long paths
  const renderCondensedBreadcrumb = () => {
    if (currentPath.length <= 3) {
      return renderFullBreadcrumb();
    }

    const firstItem = currentPath[0];
    const lastTwoItems = currentPath.slice(-2);
    const hiddenItems = currentPath.slice(1, -2);

    return (
      <nav className="flex items-center space-x-2 text-sm">
        {/* First item (Home) */}
        <button
          onClick={() => onNavigate(0)}
          className="flex items-center whitespace-nowrap text-blue-600 transition-colors hover:text-blue-800"
        >
          <FaHome className="mr-1 h-3 w-3" />
          <span className="max-w-[120px] truncate">{firstItem.name}</span>
        </button>

        {/* Separator */}
        <FaChevronRight className="h-3 w-3 flex-shrink-0 text-gray-400" />

        {/* Ellipsis with dropdown for hidden items */}
        <div className="relative">
          <button
            onClick={() => setShowDropdown(!showDropdown)}
            className="flex items-center rounded px-2 py-1 text-gray-500 transition-colors hover:bg-gray-100 hover:text-gray-700"
            title="Show hidden folders"
          >
            <FaEllipsisH className="h-3 w-3" />
          </button>

          {/* Dropdown for hidden items */}
          {showDropdown && (
            <div className="absolute top-full left-0 z-10 mt-1 min-w-[200px] rounded-lg border border-gray-200 bg-white shadow-lg">
              <div className="py-1">
                {hiddenItems.map((item, hiddenIndex) => (
                  <button
                    key={item.id}
                    onClick={() => {
                      onNavigate(hiddenIndex + 1); // +1 because we skip the first item
                      setShowDropdown(false);
                    }}
                    className="w-full px-3 py-2 text-left text-sm text-gray-700 transition-colors hover:bg-gray-100"
                  >
                    <span className="block truncate">{item.name}</span>
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Last two items */}
        {lastTwoItems.map((item, index) => {
          const originalIndex = currentPath.length - 2 + index;
          return (
            <React.Fragment key={item.id}>
              <FaChevronRight className="h-3 w-3 flex-shrink-0 text-gray-400" />
              <button
                onClick={() => onNavigate(originalIndex)}
                className={`whitespace-nowrap transition-colors ${
                  originalIndex === currentPath.length - 1
                    ? "font-medium text-gray-900"
                    : "text-blue-600 hover:text-blue-800"
                }`}
              >
                <span className="block max-w-[120px] truncate">
                  {item.name}
                </span>
              </button>
            </React.Fragment>
          );
        })}
      </nav>
    );
  };

  // Click outside to close dropdown
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        breadcrumbRef.current &&
        !breadcrumbRef.current.contains(event.target as Node)
      ) {
        setShowDropdown(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div ref={breadcrumbRef} className="min-w-0 flex-1">
      {currentPath.length > 4 || isOverflowing
        ? renderCondensedBreadcrumb()
        : renderFullBreadcrumb()}
    </div>
  );
};

export default Breadcrumb;
