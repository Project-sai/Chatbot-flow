import React, { useState, useCallback } from 'react';
import ReactFlow, {
  addEdge,
  Background,
  Controls,
  applyEdgeChanges,
  applyNodeChanges,
} from 'reactflow';
import 'reactflow/dist/style.css';
import TextMessageNode from './components/TextMessageNode';
import NodesPanel from './components/NodesPanel';
import SettingsPanel from './components/SettingsPanel';

// Defining the types of nodes available in our flow builder
const nodeTypes = {
  textMessage: TextMessageNode, 
};

// empty nodes and edges
const initialNodes = [];
const initialEdges = [];

const ChatbotFlowBuilder = () => {
  const [nodes, setNodes] = useState(initialNodes);
  const [edges, setEdges] = useState(initialEdges);
  const [selectedNode, setSelectedNode] = useState(null);
  const [showNodesPanel, setShowNodesPanel] = useState(true);

  // Handler for node changes (dragging, selecting, etc.),callback is optimized with useCallback to prevent unnecessary re-renders
  const onNodesChange = useCallback((changes) => {
    setNodes((nds) => {
      const updatedNodes = applyNodeChanges(changes, nds);
      
      // Update selected node when a node is selected
      changes.forEach(change => {
        if (change.type === 'select' && change.selected) {
          const node = updatedNodes.find(n => n.id === change.id);
          setSelectedNode(node || null);
          setShowNodesPanel(false);
        } else if (change.type === 'select' && !change.selected) {
          setSelectedNode(null);
          setShowNodesPanel(true);
        }
      });
      
      return updatedNodes;
    });
  }, []);

  //Handler for edge changes (connections between nodes)
  const onEdgesChange = useCallback(
    (changes) => setEdges((eds) => applyEdgeChanges(changes, eds)),
    []
  );

  //Handler for creating new connections between nodes
  const onConnect = useCallback(
    (connection) => setEdges((eds) => addEdge(connection, eds)),
    []
  );

  // Adds a new node to the flow
  const onAddNode = (type) => {
    const newNode = {
      id: `${Date.now()}`,
      type,
      position: { x: 100, y: 100 }, 
      data: { text: 'New Message' },
    };
    
    setNodes((nds) => nds.concat(newNode));
  };

  // Updates the text content of the selected node
  const onTextChange = (text) => {
    setNodes((nds) =>
      nds.map((node) => {
        if (node.id === selectedNode?.id) {
          return {
            ...node,
            data: {
              ...node.data,
              text,
            },
          };
        }
        return node;
      })
    );
  };

  // Validates and saves the current flow Shows error if there are multiple starting points (nodes with no incoming edges)
  const onSave = () => {
    const nodesWithNoIncomingEdges = nodes.filter(
      (node) => !edges.some((edge) => edge.target === node.id)
    );
    
    // Validate flow structure
    if (nodes.length > 1 && nodesWithNoIncomingEdges.length > 1) {
      alert('Error: More than one node has no incoming edges. There should be only one starting point in the flow.');
      return;
    }
    
    // In a real app, this would save to a backend
    console.log('Flow saved:', { nodes, edges });
    alert('Flow saved successfully!');
  };

  return (
    <div style={styles.appContainer}>
      {/* Left Panel - Toggles between Nodes Panel and Settings Panel */}
      <div style={styles.leftPanel}>
        {showNodesPanel ? (
          <NodesPanel onAddNode={onAddNode} />
        ) : (
          <SettingsPanel 
            selectedNode={selectedNode} 
            onTextChange={onTextChange} 
            onClose={() => setShowNodesPanel(true)}
          />
        )}
      </div>
      
      {/* Main Flow Area with ReactFlow canvas */}
      <div style={styles.flowArea}>
        <ReactFlow
          nodes={nodes}
          edges={edges}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          onConnect={onConnect}
          nodeTypes={nodeTypes}
          fitView
          style={{ background: '#f8f9fa' }}
        >
          <Background 
            color="#aaa" 
            gap={16} 
            variant="dots" 
          />
          <Controls 
            style={styles.controls}
            showInteractive={false}
          />
        </ReactFlow>
        
        {/* Floating Save Button */}
        <button 
          onClick={onSave}
          style={styles.saveButton}
        >
          Save Flow
          <span style={styles.saveIcon}>💾</span>
        </button>
      </div>
    </div>
  );
};

// CSS styles 
const styles = {
  appContainer: {
    display: 'flex',
    height: '100vh',
    fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
    overflow: 'hidden',
  },
  leftPanel: {
    width: '300px',
    borderRight: '1px solid #e1e5eb',
    background: '#ffffff',
    boxShadow: '2px 0 10px rgba(0,0,0,0.05)',
    zIndex: 10,
    overflowY: 'auto',
  },
  flowArea: {
    flex: 1,
    position: 'relative',
    background: '#f8f9fa',
  },
  saveButton: {
    position: 'absolute',
    right: '30px',
    top: '30px',
    zIndex: 100,
    padding: '12px 24px',
    background: 'linear-gradient(135deg, #4CAF50 0%, #2E7D32 100%)',
    color: 'white',
    border: 'none',
    borderRadius: '30px',
    cursor: 'pointer',
    fontSize: '16px',
    fontWeight: '600',
    boxShadow: '0 4px 12px rgba(76, 175, 80, 0.3)',
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    transition: 'all 0.3s ease',
    ':hover': {
      transform: 'translateY(-2px)',
      boxShadow: '0 6px 16px rgba(76, 175, 80, 0.4)',
    },
  },
  saveIcon: {
    fontSize: '18px',
  },
  controls: {
    right: '30px',
    bottom: '30px',
    boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
    border: '1px solid #e1e5eb',
    borderRadius: '8px',
    overflow: 'hidden',
  },
  
};

export default ChatbotFlowBuilder;