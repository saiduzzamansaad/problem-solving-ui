export const formatDate = (dateString) => {
      const options = { year: 'numeric', month: 'short', day: 'numeric' };
      return new Date(dateString).toLocaleDateString(undefined, options);
    };
    
    export const copyText = async (text) => {
      try {
        await navigator.clipboard.writeText(text);
        return true;
      } catch (err) {
        console.error('Failed to copy text: ', err);
        return false;
      }
    };
    
    export const filterProblems = (problems, searchTerm, filters) => {
      return problems.filter(problem => {
        // Search term filter
        const matchesSearch = 
          problem.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          problem.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
          problem.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
        
        // Difficulty filter
        const matchesDifficulty = 
          filters.difficulty === 'All' || problem.difficulty === filters.difficulty;
        
        // Tag filter
        const matchesTag = 
          filters.tag === 'All' || problem.tags.includes(filters.tag);
        
        return matchesSearch && matchesDifficulty && matchesTag;
      });
    };