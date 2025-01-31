import React, { useState, useEffect, useRef } from 'react';

const textAreaStyles = {
  width: '100%',
  padding: '10px',
  margin: '10px 0',
  borderRadius: '6px',
  border: '1px solid #ccc',
  fontSize: '14px',
  backgroundColor: '#f9f9f9',
  color: '#333',
  transition: 'border-color 0.3s, box-shadow 0.3s',
};

const mentionListStyles = {
  position: 'absolute',
  backgroundColor: '#fff',
  border: '1px solid #ccc',
  borderRadius: '4px',
  boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
  zIndex: 1000,
  maxHeight: '150px',
  overflowY: 'auto',
};

const mentionItemStyles = {
  padding: '8px 12px',
  cursor: 'pointer',
  '&:hover': {
    backgroundColor: '#f0f0f0',
  },
};

const mentionOptions = [
  { id: 'name', label: 'Name' },
  { id: 'phoneno', label: 'Phone Number' },
  { id: 'email', label: 'Email' },
  { id: 'description', label: 'Address' },
  { id: 'createdBy', label: 'Account' },
];


export const MentionTextArea = ({ value, onChange, placeholder }) => {
  const [showMentionList, setShowMentionList] = useState(false);
  const [mentionListPosition, setMentionListPosition] = useState({ top: 0, left: 0 });
  const textAreaRef = useRef(null);

  const handleTextAreaChange = (e) => {
    const { value, selectionStart } = e.target;
    onChange(e);

    const lastAtSymbolIndex = value.lastIndexOf('@', selectionStart - 1);
    if (lastAtSymbolIndex !== -1 && lastAtSymbolIndex === selectionStart - 1) {
      setShowMentionList(true);
      const { top, left } = getCaretCoordinates(e.target, selectionStart);
      setMentionListPosition({ top: top + 20, left });
    } else {
      setShowMentionList(false);
    }
  };

  const handleMentionSelect = (option) => {
    const lastAtSymbolIndex = value.lastIndexOf('@');
    const newValue = value.slice(0, lastAtSymbolIndex) + `@${option.label} ` + value.slice(lastAtSymbolIndex + 1);
    onChange({ target: { value: newValue } });
    setShowMentionList(false);
  };

  const getCaretCoordinates = (element, position) => {
    const { offsetLeft: left, offsetTop: top } = element;
    return { left, top };
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (textAreaRef.current && !textAreaRef.current.contains(event.target)) {
        setShowMentionList(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div style={{ position: 'relative' }} ref={textAreaRef}>
      <textarea
        value={value}
        onChange={handleTextAreaChange}
        placeholder={placeholder}
        style={textAreaStyles}
      />
      {showMentionList && (
        <div style={{ ...mentionListStyles, top: mentionListPosition.top, left: mentionListPosition.left }}>
          {mentionOptions.map((option) => (
            <div
              key={option.id}
              style={mentionItemStyles}
              onClick={() => handleMentionSelect(option)}
            >
              {option.label}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

// Function to convert @mentions to {{mentions}} for backend
export const convertMentionsForBackend = (text) => {
  return text.replace(/@(\w+)/g, '{{$1}}');
};

// Function to convert {{mentions}} back to @mentions for frontend display
export const convertMentionsForFrontend = (text) => {
  return text.replace(/{{(\w+)}}/g, '@$1');
};