import React, { useState, useRef, useEffect } from "react";
import { ChevronDown } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function Header() {
  const [showDropdown, setShowDropdown] = useState(false);
  const dropdownRef = useRef(null);
  const navigate = useNavigate();

  const userName = "Cha Eun-woo";
  const userEmail = "chaeunwoo@gmail.com";
  const userImage = "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face";
  
  const profileMenu = [
    {
      label: 'Profile',
      onClick: () => navigate('/profile'),
    },
    {
      label: 'Log Out',
      onClick: () => alert('Logout!'),
      className: 'text-red-400 hover:bg-gray-600',
    },
  ];

  useEffect(() => {
    if (!showDropdown) return;
    function handleClickOutside(e) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setShowDropdown(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [showDropdown]);

  return (
    <div className="flex items-center justify-between px-8 py-4 bg-[#2d2e32] border-b border-[#343538] relative">
      <div className="flex items-center gap-4">
        <img src="/logo_ais.png" alt="Logo AIS" className="w-14 h-14 object-contain" />
      </div>
      <div className="flex items-center gap-3 relative">
        <img
          src={userImage}
          alt="User"
          className="w-10 h-10 rounded-full object-cover border-2 border-[#74CD25] cursor-pointer"
          onClick={() => setShowDropdown((v) => !v)}
        />
        <div>
          <div className="text-base font-semibold text-white leading-tight">{userName}</div>
          <div className="text-xs text-gray-400 leading-tight">{userEmail}</div>
        </div>
        <button onClick={() => setShowDropdown((v) => !v)} className="ml-1">
          <ChevronDown className="w-4 h-4 text-gray-400" />
        </button>
        {showDropdown && (
          <div
            ref={dropdownRef}
            className="absolute top-14 right-0 mt-2 w-48 rounded-lg shadow-lg z-50"
            style={{ backgroundColor: "#343538" }}
          >
            <div className="p-3 border-b" style={{ borderColor: "#4a4a4a" }}>
              <div className="text-sm font-medium text-white">{userName}</div>
              <div className="text-xs text-gray-400">{userEmail}</div>
            </div>
            <div className="p-2">
              {profileMenu.map((item, idx) => (
                <button
                  key={idx}
                  className={`w-full text-left px-3 py-2 rounded text-sm ${item.className || "text-white hover:bg-gray-600"}`}
                  onClick={() => {
                    setShowDropdown(false);
                    item.onClick && item.onClick();
                  }}
                >
                  {item.label}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
} 