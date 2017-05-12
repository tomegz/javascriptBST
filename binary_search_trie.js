function BinarySearchTrie() {
    this.root = null;
}

function Node(value) {
    this.value = value;
    this.left = null;
    this.right = null;
    this.sideName = "root";
}
BinarySearchTrie.prototype = {
    //retrieving the constructor
    constructor: BinarySearchTrie,
    
    /*loop throught every number in a list
      from every number make a node, set it to root if there's no root
      check whether to go left or right and set current node, continue*/
    
    add: function(numbers) {
        numbers.forEach(number => {
            const node = new Node(number);
            if(!this.root) {
              this.root = node;    
              return;
            } 
            let currentNode = this.root;
            /*look for a place to put a number until there's an empty spot (null)
              go left if number is lesser than current node's value and go right if it's greater*/
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
                    //ignore this number because it's already inserted
                    break;
                }
            } 
            //while end
            return;
            
        });
    },
    
    print: function() {
        this.traverse(function(node, isGroupOpen) {
          const method = isGroupOpen ? "groupCollapsed" : "groupEnd";
          console[method](`${node.sideName}: ${node.value}`); 
        });
    },
    
    isBalanced: function() {
        let height = 0;
        this.traverse(function() {
            height++;
        });
        return height;
        
    },
    
    traverse: function(fn) {
        function walk(node) {
            fn(node, true);
            if(node) {
                if(node.left) {
                    walk(node.left);
                }
                
                if(node.right) {
                    walk(node.right);
                } 
                fn(node, false);
            }
        }
        walk(this.root); //start at tree root
    }
};
myTrie = new BinarySearchTrie();
myTrie.add([22, 4, 8, 23, 42, 15, 36, 12, 11, 50, 30, 21, 22]);
//myTrie.add([10, 5, 12, 3, 4,7,15])
myTrie.print();
