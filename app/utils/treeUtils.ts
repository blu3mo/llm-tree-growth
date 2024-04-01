// utils/treeUtils.ts
import { Node } from '../Node';

export const countDescendants = (dag: { [id: string]: Node }, nodeId: string): number => {
  const node = dag[nodeId];
  if (!node) return 0;

  let count = 0;
  const visitedNodes = new Set<string>();

  const dfs = (currentNodeId: string) => {
    if (visitedNodes.has(currentNodeId)) return;
    visitedNodes.add(currentNodeId);
    count++;

    const currentNode = dag[currentNodeId];
    if (!currentNode) return;

    currentNode.children.forEach(dfs);
  };

  dfs(nodeId);
  return count;
};

export const sumDescendantsEvaluations = (dag: { [id: string]: Node }, nodeId: string): number => {
  const node = dag[nodeId];
  if (!node) return 0;

  let sum = 0;
  const visitedNodes = new Set<string>();

  const dfs = (currentNodeId: string) => {
    if (visitedNodes.has(currentNodeId)) return;
    visitedNodes.add(currentNodeId);

    const currentNode = dag[currentNodeId];
    if (!currentNode) return;

    sum += currentNode.evaluation;
    currentNode.children.forEach(dfs);
  };

  dfs(nodeId);
  return sum;
};