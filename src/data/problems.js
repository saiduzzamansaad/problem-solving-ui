import GrumpyBookstore  from '../assets/GrumpyBookstore.png'
import BandFest  from '../assets/Band Fest.png'
import Binary  from '../assets/Binary.png'

const problems = [
  {
    id: 1,
    title: "Grumpy Bookstore Owner 1052",
    description: "There is a bookstore owner that has a store open for n minutes. You are given an integer array customers of length n where customers[i] is the number of the customers that enter the store at the start of the ith minute and all those customers leave after the end of that minute.",
    difficulty: "Medium",
    tags: ["Array", "Sliding Window"],
    date: "2025-06-20",
    solution: `var maxSatisfied = function(customers, grumpy, minutes) {
      let totalSatisfied = 0;
      let maxAdditional = 0;
      let currentWindowAdditional = 0;
      
      for (let i = 0; i < customers.length; i++) {
          if (grumpy[i] === 0) {
              totalSatisfied += customers[i];
          } else if (i < minutes) {
              currentWindowAdditional += customers[i];
          }
      }
      maxAdditional = currentWindowAdditional;
      
      for (let i = minutes; i < customers.length; i++) {
          const left = i - minutes;
          if (grumpy[left] === 1) {
              currentWindowAdditional -= customers[left];
          }
          if (grumpy[i] === 1) {
              currentWindowAdditional += customers[i];
          }
          maxAdditional = Math.max(maxAdditional, currentWindowAdditional);
      }
      
      return totalSatisfied + maxAdditional;
  };
}`,
    explanation: "This solution uses a hash map to store each number's index as we iterate through the array. For each number, we calculate its complement (target - number) and check if it exists in the map. If it does, we return the indices of both numbers. This approach has O(n) time complexity and O(n) space complexity.",
    image: GrumpyBookstore,
    leetcodeLink: "https://book-store1052.netlify.app/",
    solutionExplanation: "Visualization of the Two Sum solution showing how the hash map tracks complements"
  },

  {
    id: 2,
    title: "Band Fest Performance Order System",
    description: "A musical club of Leading University wants to organize a band fest with 8 prominent bands of Bangladesh.",
    difficulty: "Medium",
    tags: ["Array", "Sliding Window"],
    date: "2025-06-22",
    solution: `function case1Solution(bands) {
      // Take the first character and sort it
      const bandsWithFirstLetter = bands.map(band => ({
        name: band,
        firstLetter: band[0].toUpperCase()
      }));
      
      // Sorted alphabetically
      const sortedBands = [...bandsWithFirstLetter].sort((a, b) => 
        a.firstLetter.localeCompare(b.firstLetter));
      
      return sortedBands.map(band => band.name);
    }
    
    // Recursive bubble sort for case 2
    function recursiveBubbleSort(arr, n = arr.length, passCount = 0) {
      // Base case
      if (n === 1) return { sortedArray: arr, passCount };
      
      let swapped = false;
      
      // Complete one pass.
      for (let i = 0; i < n - 1; i++) {
        if (arr[i] > arr[i + 1]) {
          // Swap
          [arr[i], arr[i + 1]] = [arr[i + 1], arr[i]];
          swapped = true;
        }
      }
      
      // If there is no swap then return
      if (!swapped) return { sortedArray: arr, passCount };
      
      // Recursive call for next pass
      return recursiveBubbleSort(arr, n - 1, passCount + 1);
    }
    
    // Solution to Case 2
    function case2Solution(band1, band2) {
      // Take the band name as an array of characters.
      const band1Chars = band1.split('');
      const band2Chars = band2.split('');
      
      // Sort both bands and take the pass number.
      const { passCount: passCount1 } = recursiveBubbleSort([...band1Chars]);
      const { passCount: passCount2 } = recursiveBubbleSort([...band2Chars]);
      
      // Determining the outcome
      if (passCount1 > passCount2) {
        return { firstBand: band2, secondBand: band1 };
      } else {
        return { firstBand: band1, secondBand: band2 };
      }
    }
    `,
    explanation: "The organizer decides that the band whose name's first letter comes first in the English alphabet will perform first and be given the first slot, and then the second slot will be filled with the next letter band, and the process keeps going on. That means they want to allocate the bands' performance slot-wise and letter-wise. While doing the first work, organizers found that two bands have the same first letters. Now the confusion is which band to perform when. So, they decide that they will sort all the letters of those two bands' names individually using any recursive techniques. The band, which will take more passes to complete the sorting, will perform later.a. For Case 1, take the first letters from each band according to the order in 5 which they are being approached, and help them find the slot-wise band allocation for stage performance with a suitable algorithm, and write every step for that. Finally, write which band will perform in which slots. b. For Case 2, help the organizers sort the two band names individually and 5 find the number of passes for both with any suitable recursive algorithm. Finally, determine which band from these two will perform first.",
    image: BandFest,
    leetcodeLink: "https://bandperfomance.netlify.app/",
    solutionExplanation: "Visualization of the Two Sum solution showing how the hash map tracks complements"
  },


  {
    id: 3,
    title: "Binary Tree Coloring Game",
    description: "Two players play a turn based game on a binary tree. We are given the root of this binary tree, and the number of nodes n in the tree. n is odd, and each node has a distinct value from 1 to n.",
    difficulty: "Medium",
    tags: ["Tree", "Binary Tree"],
    date: "2025-06-24",
    solution: `
        class TreeNode {
    constructor(val, left = null, right = null) {
        this.val = val;
        this.left = left;
        this.right = right;
    }
}

function btreeGameWinningMove(root, n, x) {
    let leftCount = 0, rightCount = 0;
    
    function countNodes(node) {
        if (!node) return 0;
        const left = countNodes(node.left);
        const right = countNodes(node.right);
        if (node.val === x) {
            leftCount = left;
            rightCount = right;
        }
        return left + right + 1;
    }
    
    countNodes(root);
    const parentCount = n - leftCount - rightCount - 1;
    const max = Math.max(parentCount, leftCount, rightCount);
    return max > n / 2;
}

// Utility function to build tree from array
function buildTree(arr, i = 0) {
    if (i >= arr.length || arr[i] === null) return null;
    const root = new TreeNode(arr[i]);
    root.left = buildTree(arr, 2 * i + 1);
    root.right = buildTree(arr, 2 * i + 2);
    return root;
}
    `,
    explanation: "Master the strategy of this two-player game where coloring nodes determines the winner",
    image: Binary ,
    leetcodeLink: "https://binarytree21.netlify.app/",
    solutionExplanation: "Visualization of the Two Sum solution showing how the hash map tracks complements"
  },

  // ... (other problems with the same structure)
];

export default problems;