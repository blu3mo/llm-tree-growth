import React, { useCallback, useEffect } from 'react';
import ReactFlow, { Controls, Background, useNodesState, useEdgesState, addEdge, MarkerType } from 'reactflow';
import dagre from "@dagrejs/dagre";
import 'reactflow/dist/style.css';
import { Node } from '../Node';
import { countDescendants, sumDescendantsEvaluations } from '../utils/treeUtils';

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
  if (data === undefined) {
    return { nodes: [], edges: [] };
  }
  
  const dagreGraph = new dagre.graphlib.Graph();
  dagreGraph.setDefaultEdgeLabel(() => ({}));
  dagreGraph.setGraph({ rankdir: 'TB', ranker: 'network-simplex', marginy: 50, marginx: 20, align: 'DL' });
  const nodeWidth = 300;
  const nodeHeight = 300;

  const nodes = Object.values(data).map(node => {
    const numDescendants = countDescendants(data, node.id);
    const sumEvaluations = sumDescendantsEvaluations(data, node.id);
    const exploitationTerm = sumEvaluations / (numDescendants || 1);
    const totalNodes = Object.keys(data).length;
    const explorationTerm = Math.sqrt((2 * Math.log(totalNodes)) / (numDescendants || 1));
    const uctScore = exploitationTerm + 0.3 * explorationTerm;

    return {
      id: node.id,
      data: {
        label: (
          <>
            <div className="h-52 overflow-y-auto">
              <div className="text-base font-bold mb-1 leading-tight">{node.title}</div>
              <div className="text-[7px] mb-2 overflow-y-auto leading-tight text-justify select-text">
                {node.abstract}
              </div>
            </div>
            <div className="mt-2 font-mono text-[10px]">
              <p>
                <span>Evaluation: {node.evaluation.toFixed(2)}</span>
                <span> | UCT: {uctScore.toFixed(2)}</span>
              </p>
              <p>
                <span> Explore: {sumEvaluations.toFixed(2)} / {numDescendants} = {explorationTerm.toFixed(2)}</span>
                <span> | Exploit: {exploitationTerm.toFixed(2)}</span>
              </p>
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
      dragHandle: '.does-not-exist',
      style: {
        width: nodeWidth,
        height: nodeHeight,
        backgroundColor: node.parents.length === 0 ? '#EBF9DC' : '#FFFFFF',
        borderColor: node.parents.length === 0 ? '#A9B29F' : '#AFAFAF',
        borderWidth: 4,
      },
    };
  });

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
        strokeWidth: 6,
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