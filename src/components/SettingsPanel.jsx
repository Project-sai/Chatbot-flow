import React, { useState, useEffect } from 'react';

const SettingsPanel = ({ selectedNode, onTextChange, onClose }) => {
  const [text, setText] = useState(selectedNode?.data?.text || '');

  // Update local text state when selected node changes
  useEffect(() => {
    setText(selectedNode?.data?.text || '');
  }, [selectedNode]);

  // Handles text changes in the textarea
  const handleTextChange = (e) => {
    const newText = e.target.value;
    setText(newText);
    onTextChange(newText);
  };

  // If no node is selected, show a placeholder message
  if (!selectedNode) {
    return (
      <div style={styles.emptyState}>
        <div style={styles.emptyStateIcon}>✏️</div>
        <h3 style={styles.emptyStateTitle}>Select a Node</h3>
        <p style={styles.emptyStateText}>Click on any node to edit its properties</p>
      </div>
    );
  }

  return (
    <div style={styles.panelContainer}>
      {/* Panel Header */}
      <div style={styles.panelHeader}>
        <h3 style={styles.panelTitle}>
          <span style={styles.nodeIcon}>⚙️</span>
          Node Settings
        </h3>
        <button 
          onClick={onClose} 
          style={styles.closeButton}
          aria-label="Close settings panel"
        >
          &times;
        </button>
      </div>
      
      {/* Text Editor Section */}
      <div style={styles.section}>
        <label style={styles.label}>
          Message Content
          <span style={styles.requiredIndicator}>*</span>
        </label>
        <textarea
          value={text}
          onChange={handleTextChange}
          style={styles.textarea}
          placeholder="Enter your message here..."
          rows={5}
        />
        <div style={styles.charCount}>
          {text.length} characters
        </div>
      </div>
      
      {/* Node Information Section */}
      <div style={styles.section}>
        <h4 style={styles.infoTitle}>Node Information</h4>
        <div style={styles.infoGrid}>
          <div style={styles.infoLabel}>Node ID:</div>
          <div style={styles.infoValue}>{selectedNode.id}</div>
          
          <div style={styles.infoLabel}>Type:</div>
          <div style={styles.infoValue}>Text Message</div>
          
          <div style={styles.infoLabel}>Position:</div>
          <div style={styles.infoValue}>
            X: {Math.round(selectedNode.position.x)}, 
            Y: {Math.round(selectedNode.position.y)}
          </div>
        </div>
      </div>
    </div>
  );
};

//CSS styles 
const styles = {
  panelContainer: {
    padding: '20px',
    background: '#ffffff',
    height: '100%',
    boxSizing: 'border-box',
    overflowY: 'auto',
    borderLeft: '1px solid #e1e5eb',
  },
  panelHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '24px',
    paddingBottom: '16px',
    borderBottom: '1px solid #f0f0f0',
  },
  panelTitle: {
    margin: 0,
    fontSize: '18px',
    color: '#333',
    fontWeight: '600',
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
  },
  nodeIcon: {
    fontSize: '20px',
  },
  closeButton: {
    background: 'none',
    border: 'none',
    cursor: 'pointer',
    fontSize: '24px',
    color: '#666',
    padding: '0 8px',
    transition: 'all 0.2s ease',
    ':hover': {
      color: '#333',
      transform: 'scale(1.2)',
    },
  },
  section: {
    marginBottom: '24px',
  },
  label: {
    display: 'block',
    marginBottom: '8px',
    fontSize: '14px',
    fontWeight: '600',
    color: '#444',
  },
  requiredIndicator: {
    color: '#ff4d4f',
    marginLeft: '4px',
  },
  textarea: {
    width: '90%',
    minHeight: '120px',
    padding: '12px',
    border: '1px solid #d9d9d9',
    borderRadius: '6px',
    fontSize: '14px',
    lineHeight: '1.5',
    resize: 'vertical',
    transition: 'all 0.3s ease',
    ':focus': {
      outline: 'none',
      borderColor: '#4CAF50',
      boxShadow: '0 0 0 2px rgba(76, 175, 80, 0.2)',
    },
  },
  charCount: {
    fontSize: '12px',
    color: '#888',
    textAlign: 'right',
    marginTop: '4px',
  },
  infoTitle: {
    fontSize: '14px',
    fontWeight: '600',
    color: '#444',
    margin: '0 0 12px 0',
  },
  infoGrid: {
    display: 'grid',
    gridTemplateColumns: '100px 1fr',
    gap: '8px',
    fontSize: '13px',
  },
  infoLabel: {
    color: '#666',
    fontWeight: '500',
  },
  infoValue: {
    color: '#333',
    fontFamily: 'monospace',
  },
  emptyState: {
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    textAlign: 'center',
    padding: '40px 20px',
    color: '#666',
  },
  emptyStateIcon: {
    fontSize: '48px',
    marginBottom: '16px',
    opacity: '0.6',
  },
  emptyStateTitle: {
    fontSize: '18px',
    fontWeight: '600',
    margin: '0 0 8px 0',
    color: '#444',
  },
  emptyStateText: {
    fontSize: '14px',
    margin: 0,
    lineHeight: '1.5',
  },
};

export default SettingsPanel;