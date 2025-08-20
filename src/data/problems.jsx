import GrumpyBookstore from '../assets/GrumpyBookstore.png'
import BandFest from '../assets/Band Fest.png'
import Binary from '../assets/Binary.png'
import Restudent from '../assets/Restudent.png'
import restudent1 from '../assets/restudent1.png'
import Gold from '../assets/Gold.png'
import Attendance from '../assets/Attendance.png'
import Bank from '../assets/Bank.png'



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

  {
    id: 4,
    title: "Vegan Restaurant Finder",
    description: "Given the array restaurants where  restaurants[i] = [idi, ratingi, veganFriendlyi, pricei, distancei]. You have to filter the restaurants using three filters.",
    difficulty: "Medium",
    tags: ["Tree", "Binary Tree"],
    date: "2025-06-25",
    solution: `
        
        function filterRestaurants(restaurants, veganFriendly, maxPrice, maxDistance) {
    return restaurants
        .filter(restaurant => {
            const [id, rating, vegan, price, distance] = restaurant;
            return (
                (veganFriendly === 0 || vegan === veganFriendly) &&
                price <= maxPrice &&
                distance <= maxDistance
            );
        })
        .sort((a, b) => {
            if (a[1] === b[1]) {
                return b[0] - a[0]; // higher id first if same rating
            }
            return b[1] - a[1]; // higher rating first
        })
        .map(restaurant => restaurant[0]); // extract ids only
}
    `,
    explanation: "The veganFriendly filter will be either true (meaning you should only include restaurants with veganFriendlyi set to true) or false (meaning you can include any restaurant). In addition, you have the filters maxPrice and maxDistance which are the maximum value for price and distance of restaurants you should consider respectively.",
    image: Restudent ,
    leetcodeLink: "https://veganrestudent.netlify.app/",
    solutionExplanation: "Return the array of restaurant IDs after filtering, ordered by rating from highest to lowest. For restaurants with the same rating, order them by id from highest to lowest. For simplicity veganFriendlyi and veganFriendly take value 1 when it is true, and 0 when it is false."
  },


  {
    id: 5,
    title: "Restudent Discount",
    description: "There is a supermarket that is frequented by many customers. The products sold at the supermarket are represented as two parallel integer arrays products and prices, where the ith product has an ID of products[i] and a price of prices[i].",
    difficulty: "Medium",
    tags: ["Tree", "Binary Tree"],
    date: "2025-06-26",
    solution: `
        
        class Cashier {
    constructor(n, discount, products, prices) {
        this.n = n;
        this.discount = discount;
        this.customerCount = 0;
        this.productPrices = {};
        
        // Create a map of product IDs to prices for quick lookup
        for (let i = 0; i < products.length; i++) {
            this.productPrices[products[i]] = prices[i];
        }
    }

    getBill(product, amount) {
        this.customerCount++;
        let subtotal = 0;
        
        // Calculate subtotal
        for (let i = 0; i < product.length; i++) {
            const productId = product[i];
            const quantity = amount[i];
            subtotal += this.productPrices[productId] * quantity;
        }
        
        // Apply discount if it's the nth customer
        let total = subtotal;
        if (this.customerCount % this.n === 0) {
            total = subtotal * (100 - this.discount) / 100;
        }
        
        return total;
    }
}
    `,
    explanation: "When a customer is paying, their bill is represented as two parallel integer arrays product and amount, where the jth product they purchased has an ID of product[j], and amount[j] is how much of the product they bought. Their subtotal is calculated as the sum of each amount[j] * (price of the jth product).",
    image: restudent1  ,
    leetcodeLink: "https://restudent-discouut.netlify.app/",
    solutionExplanation: "The supermarket decided to have a sale. Every nth customer paying for their groceries will be given a percentage discount. The discount amount is given by discount, where they will be given discount percent off their subtotal. More formally, if their subtotal is bill, then they would actually pay bill * ((100 - discount) / 100)."
  },


  {
    id: 6,
    title: "Gold Miner 2025",
    description: "Discover the richest path in the mine and collect maximum gold",
    difficulty: "Medium",
    tags: ["Tree", "Binary Tree"],
    date: "2025-06-27",
    solution: `
        function getMaximumGold(grid) {
    let maxGold = 0;
    const m = grid.length;
    const n = grid[0].length;
    
    const directions = [[-1, 0], [1, 0], [0, -1], [0, 1]];
    
    function backtrack(i, j, currentGold) {
        if (i < 0 || i >= m || j < 0 || j >= n || grid[i][j] === 0) {
            return;
        }
        
        const goldInCell = grid[i][j];
        currentGold += goldInCell;
        maxGold = Math.max(maxGold, currentGold);
        
        const temp = grid[i][j];
        grid[i][j] = 0; // Mark as visited
        
        for (const [di, dj] of directions) {
            backtrack(i + di, j + dj, currentGold);
        }
        
        grid[i][j] = temp; // Backtrack
    }
    
    for (let i = 0; i < m; i++) {
        for (let j = 0; j < n; j++) {
            if (grid[i][j] !== 0) {
                backtrack(i, j, 0);
            }
        }
    }
    
    return maxGold;
}
        
    `,
    explanation: "In a gold mine grid of size m x n, each cell in this mine has an integer representing the amount of gold in that cell, 0 if it is empty.",
    image: Gold,
    leetcodeLink: "https://gold-miner-2025.netlify.app/",
    solutionExplanation: " The mine is represented as a grid where each cell contains gold (positive number) or is empty (0).Your goal is to find a path that collects the maximum amount of gold."
  },

  {
    id: 7,
    title: "Attendance Records Calculator",
    description: "An attendance record for a student can be represented as a string where each character signifies whether the student was absent, late, or present on that day. The record only contains the following three characters:",
    difficulty: "Medium",
    tags: ["Tree", "Binary Tree"],
    date: "2025-06-28",
    solution: `
        var checkRecord = function(n) {
    // dp[day][A_used][consecutive_L]
    let dp = Array.from({ length: n+1 }, () =>
        Array.from({ length: 2 }, () =>
            Array(3).fill(0)
        )
    );

    dp[0][0][0] = 1; // Base: empty record

    for (let i = 0; i < n; i++) {
        for (let a = 0; a <= 1; a++) {
            for (let l = 0; l <= 2; l++) {
                let val = dp[i][a][l];
                if (val === 0) continue;

                // Add 'P' → reset L count
                dp[i+1][a][0] = (dp[i+1][a][0] + val) % MOD;

                // Add 'A' → if no A used yet
                if (a < 1) {
                    dp[i+1][a+1][0] = (dp[i+1][a+1][0] + val) % MOD;
                }

                // Add 'L' → only if l < 2
                if (l < 2) {
                    dp[i+1][a][l+1] = (dp[i+1][a][l+1] + val) % MOD;
                }
            }
        }
    }

    let ans = 0;
    for (let a = 0; a <= 1; a++) {
        for (let l = 0; l <= 2; l++) {
            ans = (ans + dp[n][a][l]) % MOD;
        }
    }
    return ans;
};

        
    `,
    explanation: "Any student is eligible for an attendance award if they meet both of the following criteria:The student was absent ('A') for strictly fewer than 2 days total.The student was never late ('L') for 3 or more consecutive days.Given an integer n, return the number of possible attendance records of length n that make a student eligible for an attendance award. The answer may be very large, so return it modulo 109 + 7.",
    image: Attendance,
    leetcodeLink: "https://monumental-vacherin-c1cb66.netlify.app/",
    solutionExplanation: ""

  // ... (other problems with the same structure)
},

{
    id: 8,
    title: "Advanced Account Balance Calculator",
    description: "Calculate your balance after rounding your purchase to the nearest $10 with our interactive tool",
    difficulty: "Medium",
    tags: ["Tree", "Binary Tree"],
    date: "2025-06-29",
    solution: `
       var accountBalanceAfterPurchase = function(purchaseAmount) {
    let rem = purchaseAmount % 10;
    let roundedAmount = (rem < 5) 
        ? purchaseAmount - rem 
        : purchaseAmount + (10 - rem);
    return 100 - roundedAmount;
    };
      `,
    explanation: "You are given an integer purchaseAmount representing the amount you will spend on a purchase in dollars, in other words, its price.",
    image: Bank,
    leetcodeLink: "https://bank-balance-usd.netlify.app/",
    solutionExplanation: "0 is considered to be a multiple of 10 in this problem.When rounding, 5 is rounded upward (5 is rounded to 10, 15 is rounded to 20, 25 to 30, and so on)."

  // ... (other problems with the same structure)
}
];

export default problems;