// utils/mctsUtils.ts
import { Node } from '../Node';

const C = 0.1;

export const selectParentsByMCTS = (nodes: (Node & { numDescendants: number; sumEvaluations: number })[], numParents: number): Node[] => {
  // Filter out nodes where they have parents and all parents only have one child
  const filteredNodes = nodes.filter(node => !(node.parents.length > 0 && node.parents.every(parentId => nodes.find(parent => parent.id === parentId)?.children.length < 3)));

  const uctScores = filteredNodes.map((node) => {
    const exploitationTerm = node.sumEvaluations / (node.numDescendants || 1);
    const explorationTerm = Math.sqrt(2 * Math.log(filteredNodes.length) / (node.numDescendants || 1));
    return exploitationTerm + C * explorationTerm;
  });

  const selectedIndices = Array.from({ length: numParents }, () => 0);
  for (let i = 0; i < numParents; i++) {
    let maxIndex = i;
    for (let j = i + 1; j < filteredNodes.length; j++) {
      if (uctScores[j] > uctScores[maxIndex]) {
        maxIndex = j;
      }
    }
    selectedIndices[i] = maxIndex;
    uctScores[maxIndex] = -Infinity;
  }

  return selectedIndices.map((index) => filteredNodes[index]);
};