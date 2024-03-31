import React, { useCallback, useEffect } from 'react';
import ReactFlow, { Controls, Background, useNodesState, useEdgesState, addEdge, MarkerType } from 'reactflow';
import dagre from "@dagrejs/dagre";
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
    const { nodes: layoutedNodes, edges: layoutedEdges } = getLayoutedElements(data);
    setNodes(layoutedNodes);
    setEdges(layoutedEdges);
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

const getLayoutedElements = (data: { [id: string]: Node }) => {
  const dagreGraph = new dagre.graphlib.Graph();
  dagreGraph.setDefaultEdgeLabel(() => ({}));
  dagreGraph.setGraph({ rankdir: 'TB', ranker: 'network-simplex', marginy: 50, marginx: 20, align: 'DL'});

  const nodeWidth = 300;
  const nodeHeight = 300;

  const nodes = Object.values(data).map(node => ({
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
  }));

  nodes.forEach(node => {
    dagreGraph.setNode(node.id, { width: nodeWidth, height: nodeHeight });
  });

  const edges = Object.values(data).flatMap(node => {
    return node.parents.map(parentId => ({
      id: `${parentId}-${node.id}`,
      source: parentId,
      target: node.id,
      //type: 'smoothstep',
      animated: true,
      style: {
        strokeWidth: 4,
      },
    }));
  });

  edges.forEach(edge => {
    dagreGraph.setEdge(edge.source, edge.target);
  });

  dagre.layout(dagreGraph);

  nodes.forEach(node => {
    const nodeWithPosition = dagreGraph.node(node.id);
    node.targetPosition = 'top';
    node.sourcePosition = 'bottom';

    node.position = {
      x: nodeWithPosition.x - nodeWidth / 2,
      y: nodeWithPosition.y - nodeHeight / 2,
    };
  });

  return { nodes, edges };
};

export default TreeVisualization;