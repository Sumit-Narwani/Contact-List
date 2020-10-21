class TrieNode{
    constructor(){
        this.children = Array(10).fill(null);
        this.parent = null;
    }
}


class ContactNode{
    constructor(name, number, parent){
        this.name = name;
        this.number = number;
        this.parent = parent;
    }
}



class Trie{
    constructor(){
        this.root = new TrieNode();
        this.current = this.root;

        let init = [
            ["Sumit", "123456"],
            ["Shweta", "123546"],
            ["Akul","123645"],
            ["Jatin","124356"],
        ];

        for(let i=0; i<init.length; i++){
            this.add(init[i][1], init[i][0], 0);
        }
    }




    add(number, name, pos = 0, node = this.root){

        if(pos === number.length-1){
            node.children[number[pos]-'0'] = new ContactNode(name, number, node);
            return;
        }

        if(node.children[number[pos]-'0'] === null){
            let newnode = new TrieNode();
            node.children[number[pos] - '0'] = newnode;
            newnode.parent = node;
        }
        this.add(number, name, pos+1, node.children[number[pos] - '0']);
    }




    // findAll function to find whether the given node is null, or ContactNode
    findAll(node){
        // Contact leaf node
        if(node === null){
            return;
        }


        // Checking whether the given node is an instance of ContactNode class
        if(node instanceof ContactNode){
            // If true then push the node in the res array
            this.res.push(node);
            return;
        }


        // Recursively finding leaf nodes (DFS)
        for(let i=0; i<10; i++){
            this.findAll(node.children[i]);
        }
    }



    findNext(step){


        if(step === -1){
            this.current = this.current.parent;
        }
        else if(step !== -2){
            if(this.current.children[step - '0'] === null){
                let newnode = new TrieNode();
                this.current.children[step - '0'] = newnode;
                newnode.parent = this.current;
            }

            this.current = this.current.children[step - '0'];
        }

        this.res = [];
        this.findAll(this.parent);
        return this.res;
    }




    del(number, pos=0, node = this.root){
        
        // Case when reached the leaf node, then set it to null
        if(pos === number.length-1){
            node.children[number[pos] - '0'] = null;
            return;
        }


        // In between (TrieNode) is null means further tree will not exist
        // means no contact exists for that (TrieNode)
        // But we initialise it with some node in order to complete the Tree.
        if(node.children[number[pos] - '0'] === null){
            let newnode = new TrieNode();
            node.children[number[pos] - '0'] = newnode;
            newnode.parent = node;
        }

        // Recursively searching the node and changing the depth eachtime.
        this.del(number, pos+1, node.children[number[pos] - '0']);
    }

}