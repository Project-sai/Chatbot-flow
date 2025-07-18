import React from 'react';
import { Handle, Position } from 'reactflow';

const TextMessageNode = ({ data, isConnectable }) => {
  return (
    <div style={styles.nodeContainer}>
      {/* Node header */}
      <div style={styles.nodeHeader}>
        <span style={styles.nodeIcon}>💬</span>
        Text Message
      </div>
      
      {/* Node content */}
      <div style={styles.nodeContent}>
        {data.text || <span style={styles.placeholderText}>Empty message</span>}
      </div>
      
      {/* Source Handle (output - right side) */}
      <Handle
        type="source"
        position={Position.Right}
        isConnectable={isConnectable}
        style={styles.handleRight}
      />
      
      {/* Target Handle (input - left side)  */}
      <Handle
        type="target"
        position={Position.Left}
        isConnectable={isConnectable}
        style={styles.handleLeft}
      />
    </div>
  );
};

// CSS styles
const styles = {
  nodeContainer: {
    padding: '0',
    borderRadius: '8px',
    background: '#ffffff',
    border: '1px solid #e1e5eb',
    minWidth: '220px',
    boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
    overflow: 'hidden',
    transition: 'all 0.2s ease',
    ':hover': {
      boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
      transform: 'translateY(-1px)',
    },
  },
  nodeHeader: {
    background: 'linear-gradient(135deg, #6B73FF 0%, #4CAF50 100%)',
    color: 'white',
    padding: '10px 12px',
    fontSize: '14px',
    fontWeight: '600',
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
  },
  nodeIcon: {
    fontSize: '16px',
  },
  nodeContent: {
    padding: '12px',
    fontSize: '14px',
    color: '#333',
    minHeight: '40px',
    borderBottom: '1px solid #f0f0f0',
  },
  placeholderText: {
    color: '#999',
    fontStyle: 'italic',
  },
  handleRight: {
    width: '12px',
    height: '12px',
    background: '#4CAF50',
    border: '2px solid white',
    right: '-6px',
    boxShadow: '0 0 4px rgba(0,0,0,0.2)',
  },
  handleLeft: {
    width: '12px',
    height: '12px',
    background: '#6B73FF',
    border: '2px solid white',
    left: '-6px',
    boxShadow: '0 0 4px rgba(0,0,0,0.2)',
  },
};

export default TextMessageNode;