import React, { useCallback, useEffect } from 'react';
import ReactFlow, { Controls, Background, useNodesState, useEdgesState, addEdge, MarkerType } from 'reactflow';
import 'reactflow/dist/style.css';

interface Node {
  id: string;
  title: string;
  abstract: string;
  parents: string[];
}

interface Props {
  data: { [id: string]: Node };
  onAddNode: (parents: Node[]) => void;
}

const TreeVisualization: React.FC<Props> = ({ data, onAddNode }) => {
  const [nodes, setNodes, onNodesChange] = useNodesState([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);

  useEffect(() => {
    const initialNodes = getNodesFromData(data);
    const initialEdges = getEdgesFromData(data);
    setNodes(initialNodes);
    setEdges(initialEdges);
  }, [data]);

  const onConnect = useCallback(
    (params) => setEdges((eds) => addEdge({ ...params, markerEnd: { type: MarkerType.ArrowClosed } }, eds)),
    []
  );

  return (
    <div className="w-full h-screen">
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

const getNodesFromData = (data: { [id: string]: Node }): Node[] => {
  const nodes: Node[] = [];
  const nodeWidth = 300;
  const nodeHeight = 300;
  const horizontalSpace = 50;
  const verticalSpace = 50;

  // Placeholder for node positioning (replace with a suitable layout algorithm)
  Object.values(data).forEach((node, index) => {
    nodes.push({
      id: node.id,
      data: {
        label: (
          <>
            <div className="text-base font-bold mb-1 leading-tight">{node.title}</div>
            <div className="text-[9px] mb-2 h-40 overflow-y-auto leading-tight text-justify">
              {node.abstract}
            </div>
            <button
              className="bg-blue-500 text-white rounded px-2 py-1 text-sm"
              onClick={() => onAddNode([node])}
            >
              Add Child
            </button>
          </>
        ),
      },
      style: {
        width: nodeWidth,
        height: nodeHeight,
      },
      position: { x: index * (nodeWidth + horizontalSpace), y: 0 },
    });
  });

  return nodes;
};

const getEdgesFromData = (data: { [id: string]: Node }): Edge[] => {
  const edges: Edge[] = [];

  Object.values(data).forEach(node => {
    node.parents.forEach(parentId => {
      edges.push({
        id: `${parentId}-${node.id}`,
        source: parentId,
        target: node.id,
      });
    });
  });

  return edges;
};

export default TreeVisualization;