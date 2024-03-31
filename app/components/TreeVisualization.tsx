import React, { useCallback, useEffect } from 'react';
import ReactFlow, { Controls, Background, useNodesState, useEdgesState, addEdge, MarkerType } from 'reactflow';
import dagre from "@dagrejs/dagre";
import 'reactflow/dist/style.css';

interface Node {
  id: string;
  title: string;
  abstract: string;
  parents: string[];
  evaluation: number;
}

interface Props {
  data: { [id: string]: Node };
  onAddNode: (parents: Node[]) => void;
  onUpdateEvaluation: (nodeId: string, evaluation: number) => void;
}

const TreeVisualization: React.FC<Props> = ({ data, onAddNode, onUpdateEvaluation }) => {
  const [nodes, setNodes, onNodesChange] = useNodesState([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);

  useEffect(() => {
    const { nodes: layoutedNodes, edges: layoutedEdges } = getLayoutedElements(data, onUpdateEvaluation);
    setNodes(layoutedNodes);
    setEdges(layoutedEdges);
  }, [data, onUpdateEvaluation]);

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
        minZoom={0.1}
        fitView
      >
        <Background />
        <Controls />
      </ReactFlow>
    </div>
  );
};

const getLayoutedElements = (data: { [id: string]: Node }, onUpdateEvaluation: (nodeId: string, evaluation: number) => void) => {
  const dagreGraph = new dagre.graphlib.Graph();
  dagreGraph.setDefaultEdgeLabel(() => ({}));
  dagreGraph.setGraph({ rankdir: 'TB', ranker: 'network-simplex', marginy: 50, marginx: 20, align: 'DL' });
  const nodeWidth = 300;
  const nodeHeight = 300;

  const nodes = Object.values(data).map(node => ({
    id: node.id,
    data: {
      label: (
        <>
          <div className="text-base font-bold mb-1 leading-tight">{node.title}</div>
          <div className="text-[7px] mb-2 h-45 overflow-y-auto leading-tight text-justify select-text">
            {node.abstract}
          </div>
          <div className="mt-2">
            <input
              type="range"
              min={0}
              max={1}
              step={0.01}
              value={node.evaluation}
              onChange={(e) => onUpdateEvaluation(node.id, parseFloat(e.target.value))}
              className="w-full"
            />
          </div>
        </>
      ),
    },
    dragHandle: '.does-not-exist', // disable dragging while avoiding grabbing the entire screen
    style: {
      width: nodeWidth,
      height: nodeHeight,
      backgroundColor: node.parents.length === 0 ? '#EBF9DC' : '#FFFFFF',
      borderColor: node.parents.length === 0 ? '#A9B29F' : '#AFAFAF',
      borderWidth: 2,
    },
    //draggable: false,
  }));

  nodes.forEach(node => {
    dagreGraph.setNode(node.id, { width: nodeWidth, height: nodeHeight });
  });

  const edges = Object.values(data).flatMap(node => {
    return node.parents.map(parentId => ({
      id: `${parentId}-${node.id}`,
      source: parentId,
      target: node.id,
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