import axios from "axios";

export const fetchData = (postTypes, pageId, selectedTerm, setPosts, setFilteredPosts, setPageSlug, setPageTitle, setPageContent, setSeoData, setFeaturedImage, setFeaturedImageAlt) => {
  // Map over the postTypes array and create a promise for each post type
  const postTypePromises = postTypes.map(postType => {
    return axios.get(`https://sarpinos.mysites.io/wp-json/wp/v2/${postType}`)
      .then(response => {
        const fetches = response.data.map(post => {
          // Fetches for the first image field
          const imageFetch = post.acf.main_image
            ? axios.get(`https://sarpinos.mysites.io/wp-json/wp/v2/media/${post.acf.main_image}`)
              .then(imageResponse => {
                post.imageDetails = imageResponse.data;
              })
            : Promise.resolve();

          const hoverImageFetch = post.acf.hover_image
            ? axios.get(`https://sarpinos.mysites.io/wp-json/wp/v2/media/${post.acf.hover_image}`)
              .then(hoverImageResponse => {
                post.hoverImageDetails = hoverImageResponse.data;
              })
            : Promise.resolve();

          return Promise.all([imageFetch, hoverImageFetch]).then(() => post);
        });
        return Promise.all(fetches);
      });
  });

  // Use Promise.all to wait for all post type promises to resolve
  Promise.all(postTypePromises)
    .then(postTypeArrays => {
      // Flatten the array of arrays into a single array of posts
      const postsWithImages = [].concat(...postTypeArrays);

      setPosts(postsWithImages); // Set the posts

      // Filter posts when the selected term changes
      const newFilteredPosts = selectedTerm
        ? postsWithImages.filter(post => post.acf.menu_category.includes(selectedTerm))
        : postsWithImages;
      setFilteredPosts(newFilteredPosts);
    })
    .catch(error => console.error(error));

  // Fetch Page content, Featured image, and SEO data
  axios.get(`https://sarpinos.mysites.io/wp-json/wp/v2/pages/${pageId}`)
    .then(response => {
      const post = response.data; // Get the post data

      setPageSlug(post.slug); // Set the page slug
      setPageTitle(post.title.rendered); // Set the page title
      setPageContent(post.content.rendered); // Set the page content

      // Set the SEO data
      if (post.yoast_head_json) {
        setSeoData(post.yoast_head_json);
      }

      // If there's a featured image, fetch its details
      if (post.featured_media) {
        axios.get(`https://sarpinos.mysites.io/wp-json/wp/v2/media/${post.featured_media}`)
          .then(imageResponse => {
            if (imageResponse && imageResponse.data) {
              setFeaturedImage(imageResponse.data.source_url); // Set the featured image URL
              setFeaturedImageAlt(imageResponse.data.alt_text); // Set the featured image alt text
            }
          });
      }
    })
    .catch(error => {
      console.error(error);
      setPageTitle('Page not found'); // Set a default page title
      setPageContent('The page you are looking for does not exist.'); // Set a default page content
    });
};