import fileNodes from './fileNodes';
import fileNodeMetadata from './fileNodeMetadata';
import fileSystem from './fileSystem';

const fileNodesFixture = fileNodes.map( node => { const {name, permissions, nodeIndex, extension, FileNodeId } = node.data; return {name, permissions, nodeIndex, extension, parentNodeIndex: FileNodeId }});
const fileNodesMetadataFixture = fileNodeMetadata.map( node => { const {name, value, nodeIndex } = node.data; return {name, value, nodeIndex }});

export { fileNodesFixture, fileNodesMetadataFixture, fileSystem };