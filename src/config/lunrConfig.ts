import lunr from 'lunr';

// Function to build the index
export const buildIndex = (articles) => {

  return lunr(function () {
    // Set up the fields to index (title with a higher boost)
    this.field('title', { boost: 10 });
    this.field('content');
    this.ref('id'); // Use the article's id as the reference

    // Add each article to the index
    articles.forEach((article, index) => {
      this.add({
        id: index,          // Reference to each article
        title: article.title, // Article title
        content: article.content,   // Article content
      });
    });
  });
};