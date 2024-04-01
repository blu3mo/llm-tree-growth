// utils/treeUtils.ts
import { Node } from '../Node';

export const countDescendants = (dag: { [id: string]: Node }, nodeId: string, α: number = 0.7): number => {
  const node = dag[nodeId];
  if (!node) return 0;

  let count = 0;
  const visitedNodes = new Set<string>();

  const dfs = (currentNodeId: string, depth: number) => {
    if (visitedNodes.has(currentNodeId)) return;
    visitedNodes.add(currentNodeId);
    count += Math.pow(α, depth);

    const currentNode = dag[currentNodeId];
    if (!currentNode) return;

    currentNode.children.forEach(childId => dfs(childId, depth + 1));
  };

  dfs(nodeId, 0);
  return count;
};

export const sumDescendantsEvaluations = (dag: { [id: string]: Node }, nodeId: string, α: number = 0.7): number => {
  const node = dag[nodeId];
  if (!node) return 0;
  let sum = 0;
  const visitedNodes = new Set<string>();

  const dfs = (currentNodeId: string, depth: number) => {
    if (visitedNodes.has(currentNodeId)) return;
    visitedNodes.add(currentNodeId);

    const currentNode = dag[currentNodeId];
    if (!currentNode) return;

    sum += currentNode.evaluation * Math.pow(α, depth);
    currentNode.children.forEach(childId => dfs(childId, depth + 1));
  };

  dfs(nodeId, 0);
  return sum;
};