/*
  This is implementation of Binary Search Trie. Usage:
  myTrie = new BinarySearchTrie();
  numbers = [10, 5, 12, 3, 4, 7, 15];
  myTrie.add(numbers);
  myTrie.print();
  console.log(myTrie.isBalanced());
*/
function BinarySearchTrie() {
    this.root = null;
}

function Node(value) {
    this.value = value;
    this.left = null;
    this.right = null;
    this.sideName = "root"; /* this is used at print method */
}

BinarySearchTrie.prototype = {
    /* retrieving the constructor */
    constructor: BinarySearchTrie,
    
    /* method add
      1) loop throught every number in a given array
      2) from every number make a node, set it to root if there's no root
      3) walk down the tree - go left if the number is lesser than current node's value
                            - go right if the number is greater than current node's value
      4) if there's an empty spot, put current node there, if it's not empty, then continue walking
    */
    
    add: function(numbers) {
        numbers.forEach(number => {
            const node = new Node(number);
            if(!this.root) {
              this.root = node;    
              return;
            } 
            let currentNode = this.root;
            
            while(currentNode) {
                if(number < currentNode.value) {
                    if(!currentNode.left) {
                        node.sideName = "left";
                        currentNode.left = node;
                    } else {
                        currentNode = currentNode.left;
                    }
                } else if(number > currentNode.value) {
                    if(!currentNode.right) {
                        node.sideName = "right";
                        currentNode.right = node;
                    } else {
                        currentNode = currentNode.right;
                    }
                } else {
                    /* ignore this number as it's already inserted */
                    break;
                }
            } 
            return;   
        });
    },
    /* method print 
        1) use traverse function which visits every node, starting from root
        2) traverse function accepts a function that will be called at 
           every node allowing to use console.group for printing the tree
           in an understandable form 
    */
    print: function() {
        this.traverse(function(node, isGroupOpen) {
          const method = isGroupOpen ? "groupCollapsed" : "groupEnd";
          console[method](`${node.sideName}: ${node.value}`); 
        });
    },
    /* method isBalanced - returns true if tree is balanced and false otherwise
       function checkBalance - returns height of a node which is max value of leftHeight and rightHeight + 1
                             - if difference between those heights is greater than 1 the it returns -1 as height
                             - if node has no branches then its height is 0
                             - if height is -1 it means the node is not balanced
                             
   
    */
    isBalanced: function() {
        function checkBalance(node) {
            if(node === null) {
                return 0;
            }
            const leftHeight = checkBalance(node.left);
            if(leftHeight === -1) {
                return -1;
            }
            const rightHeight = checkBalance(node.right);
            if(rightHeight === -1) {
                return -1;
            }
            if(Math.abs(leftHeight - rightHeight) > 1) {
                return -1;
            }
            return (1 + Math.max(leftHeight, rightHeight));
        }
        return (checkBalance(this.root) >= 0);
    },
    /* method traverse - visits each node in trie
                       - runs given function in two places allowing to use console.group to print
    */
    traverse: function(fn) {
        function walk(node) {
            fn(node, true);
            if(node) {
                if(node.left) {
                    walk(node.left);
                }
                /*by using console.log(node.value) here, 
                we would see that the input in binary tree is sorted by definition*/
                if(node.right) {
                    walk(node.right);
                } 
                fn(node, false);
            }
        }
        walk(this.root); //start at tree root
    }
};