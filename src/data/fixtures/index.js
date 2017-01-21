import fileNodes from './fileNodes';
import fileNodeMetadata from './fileNodeMetadata';
import fileSystem from './fileSystem';

const fileNodesFixture = fileNodes.map( node => { const {name, permissions, nodeIndex, extension } = node.data; return {name, permissions, nodeIndex, extension }});
const fileNodesMetadataFixture = fileNodeMetadata.map( node => { const {name, value, nodeIndex } = node.data; return {name, value, nodeIndex }});

export { fileNodesFixture, fileNodesMetadataFixture, fileSystem };