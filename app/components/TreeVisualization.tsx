import React, { useCallback, useEffect } from 'react';
import ReactFlow, { Controls, Background, useNodesState, useEdgesState, addEdge, MarkerType } from 'reactflow';
import 'reactflow/dist/style.css';

interface Node {
  id: string;
  title: string;
  abstract: string;
  children: Node[];
}

interface Props {
  data: Node;
  onAddNode: (nodeId: string) => void;
}

const TreeVisualization: React.FC<Props> = ({ data, onAddNode }) => {
  const [nodes, setNodes, onNodesChange] = useNodesState([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);

  useEffect(() => {
    const initialNodes = getNodesFromData(data, onAddNode);
    const initialEdges = getEdgesFromData(data);
    setNodes(initialNodes);
    setEdges(initialEdges);
  }, [data, onAddNode]);

  const onConnect = useCallback(
    (params) => setEdges((eds) => addEdge({ ...params, markerEnd: { type: MarkerType.ArrowClosed } }, eds)),
    []
  );

  return (
    <div style={{ height: '1000px', width: '100%' }}>
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        fitView
      >
        <Background />
        <Controls />
      </ReactFlow>
    </div>
  );
};

const getNodesFromData = (data: Node, onAddNode: any): Node[] => {
  const nodes: Node[] = [];
  const nodeWidth = 300; // Increased node width
  const nodeHeight = 300; // Increased node height
  const horizontalSpace = 50;
  const verticalSpace = 50;

  const levelWidth: { [key: number]: number } = {};
  const levelNodes: { [key: number]: Node[] } = {};

  const traverse = (node: Node, depth: number, parentId?: string) => {
    if (!levelNodes[depth]) {
      levelNodes[depth] = [];
    }
    levelNodes[depth].push(node);

    node.children.forEach((child) => {
      traverse(child, depth + 1, node.id);
    });
  };

  traverse(data, 0);

  Object.keys(levelNodes).forEach((depth) => {
    const nodesAtLevel = levelNodes[parseInt(depth)];
    const totalWidth = nodesAtLevel.length * nodeWidth + (nodesAtLevel.length - 1) * horizontalSpace;
    let currentX = -totalWidth / 2;

    nodesAtLevel.forEach((node) => {
      const nodeId = node.id;
      const x = currentX;
      const y = parseInt(depth) * (nodeHeight + verticalSpace);

      nodes.push({
        id: nodeId,
        data: {
          label: (
            <>
              <div style={{ fontSize: '14px' }}>{node.title}</div>
              <div style={{ fontSize: '8px' }}>{node.abstract}</div>
              <button onClick={() => onAddNode(nodeId)}>Add Child</button>
            </>
          ),
        },
        style: {
          width: nodeWidth,
          height: nodeHeight,
        },
        position: { x, y },
        parentNode: node.parentId,
      });

      currentX += nodeWidth + horizontalSpace;
    });
  });

  return nodes;
};

const getEdgesFromData = (data: Node): Edge[] => {
  const edges: Edge[] = [];

  const traverse = (node: Node, parentId?: string) => {
    if (parentId) {
      edges.push({
        id: `${parentId}-${node.id}`,
        source: parentId,
        target: node.id,
      });
    }

    node.children.forEach((child) => {
      traverse(child, node.id);
    });
  };

  traverse(data);
  return edges;
};

export default TreeVisualization;