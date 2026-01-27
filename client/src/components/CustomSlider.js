import React, { useState, useRef, useEffect } from 'react';

const CustomSlider = ({ 
  value, 
  onChange, 
  min = 0, 
  max = 100, 
  step = 1,
  label,
  formatValue = (val) => val,
  color = 'primary'
}) => {
  const [isDragging, setIsDragging] = useState(false);
  const sliderRef = useRef(null);

  const colorClasses = {
    primary: {
      track: 'bg-primary-600',
      thumb: 'bg-primary-600 hover:bg-primary-700',
      tooltip: 'bg-primary-600'
    },
    green: {
      track: 'bg-green-600',
      thumb: 'bg-green-600 hover:bg-green-700',
      tooltip: 'bg-green-600'
    },
    blue: {
      track: 'bg-blue-600',
      thumb: 'bg-blue-600 hover:bg-blue-700',
      tooltip: 'bg-blue-600'
    },
    purple: {
      track: 'bg-purple-600',
      thumb: 'bg-purple-600 hover:bg-purple-700',
      tooltip: 'bg-purple-600'
    }
  };

  const colors = colorClasses[color] || colorClasses.primary;

  const percentage = ((value - min) / (max - min)) * 100;

  const handleMouseDown = (e) => {
    setIsDragging(true);
    updateValue(e);
  };

  const handleMouseMove = (e) => {
    if (isDragging) {
      updateValue(e);
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleTouchStart = (e) => {
    setIsDragging(true);
    updateValue(e.touches[0]);
  };

  const handleTouchMove = (e) => {
    if (isDragging) {
      updateValue(e.touches[0]);
    }
  };

  const handleTouchEnd = () => {
    setIsDragging(false);
  };

  const updateValue = (e) => {
    if (!sliderRef.current) return;

    const rect = sliderRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const percentage = Math.max(0, Math.min(1, x / rect.width));
    const rawValue = min + percentage * (max - min);
    const steppedValue = Math.round(rawValue / step) * step;
    const clampedValue = Math.max(min, Math.min(max, steppedValue));

    onChange(clampedValue);
  };

  useEffect(() => {
    if (isDragging) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
      document.addEventListener('touchmove', handleTouchMove);
      document.addEventListener('touchend', handleTouchEnd);

      return () => {
        document.removeEventListener('mousemove', handleMouseMove);
        document.removeEventListener('mouseup', handleMouseUp);
        document.removeEventListener('touchmove', handleTouchMove);
        document.removeEventListener('touchend', handleTouchEnd);
      };
    }
  }, [isDragging]);

  return (
    <div className="w-full">
      {label && (
        <div className="flex items-center justify-between mb-3">
          <label className="text-sm font-medium text-gray-700">{label}</label>
          <span className="text-sm font-semibold text-gray-900">{formatValue(value)}</span>
        </div>
      )}
      
      <div className="relative">
        {/* Track */}
        <div
          ref={sliderRef}
          className="relative h-3 bg-gray-200 rounded-full cursor-pointer"
          onMouseDown={handleMouseDown}
          onTouchStart={handleTouchStart}
        >
          {/* Filled Track */}
          <div
            className={`absolute h-full ${colors.track} rounded-full transition-all duration-150`}
            style={{ width: `${percentage}%` }}
          />

          {/* Thumb */}
          <div
            className={`absolute top-1/2 -translate-y-1/2 w-6 h-6 ${colors.thumb} rounded-full shadow-lg cursor-grab active:cursor-grabbing transform transition-transform ${
              isDragging ? 'scale-125' : 'scale-100'
            }`}
            style={{ left: `calc(${percentage}% - 12px)` }}
          >
            {/* Tooltip */}
            {isDragging && (
              <div className={`absolute -top-10 left-1/2 -translate-x-1/2 ${colors.tooltip} text-white text-xs font-semibold px-3 py-1 rounded-lg whitespace-nowrap shadow-lg`}>
                {formatValue(value)}
                <div className={`absolute top-full left-1/2 -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 ${colors.tooltip} border-l-transparent border-r-transparent`} />
              </div>
            )}
          </div>
        </div>

        {/* Min/Max Labels */}
        <div className="flex items-center justify-between mt-2">
          <span className="text-xs text-gray-500">{formatValue(min)}</span>
          <span className="text-xs text-gray-500">{formatValue(max)}</span>
        </div>
      </div>
    </div>
  );
};

export default CustomSlider;
