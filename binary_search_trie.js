function BinarySearchTrie() {
    this.root = null;
}

function Node(value) {
    this.value = value;
    this.left = null;
    this.right = null;
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
            //probably should use while for this
            if(number < currentNode.value) {
                /* go left
                   check if theres no value already
                   go further or set value and return */
            } else if(number > currentNode.value) {
                /* go right
                   check if theres no value already
                   go further or set value and return */
            }
        });
    }
};
myTrie = new BinarySearchTrie();
myTrie.add([22, 4, 8, 23, 42, 15, 36, 12, 11, 50, 30, 21]);
