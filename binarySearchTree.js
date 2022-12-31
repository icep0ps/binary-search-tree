import Node from './node.js';

class Tree {
  constructor(arr) {
    this.root = this.buildTree(this.sortArray(arr));
  }

  buildTree(arr) {
    if (arr.length > 0) {
      const middle = Math.floor(arr.length / 2);
      const root = arr[middle];
      const end = arr.length;

      if (arr.length > 1) {
        const Arrayleft = arr.slice(0, middle);
        const ArrayRight = arr.slice(middle + 1, end);
        const left = this.buildTree(Arrayleft);
        const right = this.buildTree(ArrayRight);
        return new Node(root, left, right);
      }
      return new Node(root, null, null);
    }
    return null;
  }

  insert(value) {
    let node = this.root;
    while (value < node.data || value > node.data) {
      if (value < node.data) {
        if (node.left === null) {
          node.left = new Node(value, null, null);
          return;
        }
        node = node.left;
      }

      if (value > node.data) {
        if (node.right === null) {
          node.right = new Node(value, null, null);
          return;
        }
        node = node.right;
      }
    }
  }

  delete(value) {
    let parent;
    let node = this.root;

    while (node.data !== value) {
      if (node.data > value) {
        parent = node;
        node = node.left;
      }

      if (node.data < value) {
        parent = node;
        node = node.right;
      }
    }

    if (node.left === null && node.right === null) {
      if (value > parent.data) {
        parent.right = null;
        return;
      }
      if (value < parent.data) {
        parent.left = null;
        return;
      }
    }

    if (node.left === null && node.right !== null) {
      parent.right = node.right;
      return;
    }
    if (node.right === null && node.left !== null) {
      parent.right = node.left;
      return;
    }

    if (node.left !== null && node.right !== null) {
      let tmp = node.right;
      let subparent = tmp;
      while (tmp.left !== null) {
        subparent = tmp;
        tmp = tmp.left;
      }

      node.data = tmp.data;
      subparent.left = null;
    }
  }

  sortArray(arr) {
    const sorted = arr.sort((a, b) => a - b);
    const removeDuplicates = new Set(sorted);
    return Array.from(removeDuplicates);
  }

  find(value, tmp = this.root) {
    if (tmp === null) return null;

    if (value === tmp.data) return tmp;

    if (value > tmp.data) return this.find(value, tmp.right);

    if (value < tmp.data) return this.find(value, tmp.left);

    return tmp;
  }

  levelOrder() {
    const queue = [];
    const discorveredNodes = [];
    if (this.root) {
      queue.push(this.root);
    }

    while (queue.length !== 0) {
      let node = queue.shift();
      discorveredNodes.push(node.data);
      if (node.right) {
        queue.push(node.right);
      }

      if (node.left) {
        queue.push(node.left);
      }
    }
    return discorveredNodes;
  }

  preOrder(currnetNode = this.root) {
    let vistedNode = [];
    if (currnetNode === null) return vistedNode;
    vistedNode.push(currnetNode.data);

    if (currnetNode.left !== null) {
      vistedNode = vistedNode.concat(this.preOrder(currnetNode.left));
    }

    if (currnetNode.right !== null) {
      vistedNode = vistedNode.concat(this.preOrder(currnetNode.right));
    }
    return vistedNode;
  }

  inorder(currnetNode = this.root) {
    let vistedNodes = [];
    if (currnetNode === null) return vistedNodes;

    if (currnetNode.left !== null) {
      vistedNodes = vistedNodes.concat(this.inorder(currnetNode.left));
    }
    vistedNodes.push(currnetNode.data);

    if (currnetNode.right !== null) {
      vistedNodes = vistedNodes.concat(this.inorder(currnetNode.right));
    }
    return vistedNodes;
  }

  postOrder(currnetNode = this.root) {
    let vistedNodes = [];
    if (currnetNode === null) return vistedNodes;

    if (currnetNode.left !== null) {
      vistedNodes = vistedNodes.concat(this.postOrder(currnetNode.left));
    }
    if (currnetNode.right !== null) {
      vistedNodes = vistedNodes.concat(this.postOrder(currnetNode.right));
    }
    vistedNodes.push(currnetNode.data);
    return vistedNodes;
  }

  height(node) {
    let tmp = this.find(node);

    const getHieght = (tmp) => {
      let leftEdge = 0;
      let rightEdge = 0;

      if (tmp === null) {
        return 0;
      }

      if (tmp.left !== null) {
        leftEdge++;
      }

      if (tmp.right !== null) {
        rightEdge++;
      }
      const left = leftEdge + getHieght(tmp.left);
      const right = rightEdge + getHieght(tmp.right);

      if (left > right) return left;

      if (right > left) return right;

      return left;
    };
    return getHieght(tmp);
  }
  depth(node, root = this.root) {
    let count = 0;

    if (root === null) {
      return count;
    }

    if (node === root.data) {
      return count;
    }

    if (
      root.left !== null &&
      root.right !== null &&
      root.right.data !== node &&
      root.left.data !== node
    ) {
      count++;
    }

    if (node > root.data) {
      return count + this.depth(node, root.right);
    }

    if (node < root.data) {
      return count + this.depth(node, root.left);
    }

    return count;
  }

  isBalanced() {
    const root = this.root;
    const right = this.height(root.right.data);
    const left = this.height(root.left.data);
    const diffrence = right - left;

    if (diffrence > 1) return false;

    return true;
  }

  rebalance() {
    this.root = this.buildTree(this.inorder());
    return this.root;
  }
}
const prettyPrint = (node, prefix = '', isLeft = true) => {
  if (node.right !== null) {
    prettyPrint(node.right, `${prefix}${isLeft ? '│   ' : '    '}`, false);
  }
  console.log(`${prefix}${isLeft ? '└── ' : '┌── '}${node.data}`);
  if (node.left !== null) {
    prettyPrint(node.left, `${prefix}${isLeft ? '    ' : '│   '}`, true);
  }
};
