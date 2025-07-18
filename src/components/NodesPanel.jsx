import React from 'react';

const NodesPanel = ({ onAddNode }) => {
  // Available node types
  const nodeTypes = [
    {
      type: 'textMessage',
      label: 'Message Node',
      description: 'Send a text message in the chat flow   (just click the message node then it will appear in the flow)',
      icon: '💬', 
      color: '#4CAF50',
    },
  ];

  // Handles the drag start event for node dragging
  const onDragStart = (event, nodeType) => {
    event.dataTransfer.setData('application/reactflow', nodeType);
    event.dataTransfer.effectAllowed = 'move';
  };

  return (
    <div style={styles.panelContainer}>
      <div style={styles.panelHeader}>
        <h3 style={styles.panelTitle}>Nodes Panel</h3>
        <p style={styles.panelSubtitle}>Drag and drop nodes to the flow</p>
      </div>
      
      <div style={styles.nodesList}>
        {nodeTypes.map((node) => (
          <div
            key={node.type}
            style={{
              ...styles.nodeItem,
              borderLeft: `4px solid ${node.color}`,
            }}
            onDragStart={(event) => onDragStart(event, node.type)}
            draggable
            onClick={() => onAddNode(node.type)}
          >
            <div style={styles.nodeIcon}>{node.icon}</div>
            <div style={styles.nodeContent}>
              <div style={styles.nodeLabel}>{node.label}</div>
              <div style={styles.nodeDescription}>{node.description}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

// CSS styles 
const styles = {
  panelContainer: {
    padding: '16px',
    background: '#ffffff',
    height: '100%',
    boxSizing: 'border-box',
    overflowY: 'auto',
  },
  panelHeader: {
    marginBottom: '24px',
    paddingBottom: '16px',
    borderBottom: '1px solid #f0f0f0',
  },
  panelTitle: {
    margin: '0 0 8px 0',
    fontSize: '18px',
    color: '#333',
    fontWeight: '600',
  },
  panelSubtitle: {
    margin: '0',
    fontSize: '14px',
    color: '#666',
  },
  nodesList: {
    display: 'flex',
    flexDirection: 'column',
    gap: '12px',
  },
  nodeItem: {
    padding: '12px',
    background: '#ffffff',
    borderRadius: '6px',
    border: '1px solid #e1e5eb',
    cursor: 'grab',
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
    transition: 'all 0.2s ease',
    ':hover': {
      transform: 'translateY(-2px)',
      boxShadow: '0 4px 12px rgba(0,0,0,0.08)',
      borderColor: '#c1c7d0',
    },
    ':active': {
      cursor: 'grabbing',
    },
  },
  nodeIcon: {
    fontSize: '20px',
    width: '36px',
    height: '36px',
    borderRadius: '50%',
    background: '#f5f7fa',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0,
  },
  nodeContent: {
    flex: 1,
  },
  nodeLabel: {
    fontWeight: '600',
    fontSize: '14px',
    color: '#333',
    marginBottom: '4px',
  },
  nodeDescription: {
    fontSize: '12px',
    color: '#666',
    lineHeight: '1.4',
  },
};

export default NodesPanel;