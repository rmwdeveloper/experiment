const todoList = require('../textDocuments/todoList');
const directions = require('../textDocuments/directions');
const faq = require('../textDocuments/faq');
const resume = require('../textDocuments/resume');


module.exports = [
  {
    "model": "TextDocument",
    "data": {
      "UserId": 1,
      "markup": faq,
      "FileNodeId": 25
    }
  },
  {
    "model": "TextDocument",
    "data": {
      "UserId": 1,
      "markup": todoList,
      "FileNodeId": 28
    }
  },
  {
    "model": "TextDocument",
    "data": {
      "UserId": 1,
      "markup": resume,
      "FileNodeId": 30
    }
  },{
    "model": "TextDocument",
    "data": {
      "UserId": 1,
      "markup": directions,
      "FileNodeId": 31
    }
  },

];