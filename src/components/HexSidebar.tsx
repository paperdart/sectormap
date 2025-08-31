import React from 'react';
import { HexData } from '../types/hex';
import { X } from 'lucide-react';

interface HexSidebarProps {
  selectedHex: { x: string; y: string; data?: HexData } | null;
  onClose: () => void;
}

export const HexSidebar: React.FC<HexSidebarProps> = ({ selectedHex, onClose }) => {
  if (!selectedHex) return null;

  const { x, y, data } = selectedHex;
  const isPopulated = !!data;

  return (
    <div className="hex-sidebar">
      <div className="sidebar-header">
        <h2 className="sidebar-title">HEX {x},{y}</h2>
        <button 
          onClick={onClose}
          className="close-button"
          aria-label="Close sidebar"
        >
          <X size={16} />
        </button>
      </div>
      
      <div className="sidebar-content">
        {isPopulated ? (
          <div className="hex-details">
            <div className="detail-section">
              <h3 className="detail-label">WORLD NAME</h3>
              <p className="detail-value">{data.name}</p>
            </div>
            
            <div className="detail-section">
              <h3 className="detail-label">WORLD TYPE</h3>
              <p className="detail-value">{data.worldtype}</p>
            </div>
            
            <div className="detail-section">
              <h3 className="detail-label">WORLD TAGS</h3>
              <div className="worldtags-list">
                {data.worldtags?.map((tag, index) => (
                  <span key={index} className="worldtag">
                    {tag}
                  </span>
                ))}
              </div>
            </div>
            
            <div className="detail-section">
              <h3 className="detail-label">COORDINATES</h3>
              <p className="detail-value">{x},{y}</p>
            </div>
          </div>
        ) : (
          <div className="empty-hex">
            <h3 className="detail-label">EMPTY SPACE</h3>
            <p className="detail-value">No stellar bodies detected</p>
            <div className="detail-section">
              <h3 className="detail-label">COORDINATES</h3>
              <p className="detail-value">{x},{y}</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};