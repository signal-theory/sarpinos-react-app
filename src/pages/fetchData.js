import axios from "axios";
const postTypeToPageSlug = {
  'pizza': 'sarpinos-specialty-pizza',
  'calzones': 'calzones',
  // Add more post types and page slugs as needed
};
export const fetchData = (postTypes, pageId, selectedTerm, setPosts, setFilteredPosts, setPageSlug, setPageTitle, setPageContent, setSeoData, setFeaturedImage, setFeaturedImageAlt) => {
  return new Promise((resolve, reject) => {
    const postTypePromises = postTypes.map(postType => {
      return axios.get(`https://sarpinos.mysites.io/wp-json/wp/v2/${postType}`)
        .then(response => {
          const fetches = response.data.map(post => {
            post.postTypeKey = postType;
            post.pageSlug = postTypeToPageSlug[postType];
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

    Promise.all(postTypePromises)
      .then(postTypeArrays => {
        const postsWithImages = [].concat(...postTypeArrays);

        setPosts(postsWithImages);

        const newFilteredPosts = selectedTerm
          ? postsWithImages.filter(post => post.acf.menu_category.includes(selectedTerm))
          : postsWithImages;
        setFilteredPosts(newFilteredPosts);

        axios.get(`https://sarpinos.mysites.io/wp-json/wp/v2/pages/${pageId}`)
          .then(response => {
            const post = response.data;

            setPageSlug(post.slug);
            setPageTitle(post.title.rendered);
            setPageContent(post.content.rendered);

            if (post.yoast_head_json) {
              setSeoData(post.yoast_head_json);
            }

            if (post.featured_media) {
              axios.get(`https://sarpinos.mysites.io/wp-json/wp/v2/media/${post.featured_media}`)
                .then(imageResponse => {
                  if (imageResponse && imageResponse.data) {
                    setFeaturedImage(imageResponse.data.source_url);
                    setFeaturedImageAlt(imageResponse.data.alt_text);
                  }
                });
            }
            resolve();
          })
          .catch(error => {
            console.error(error);
            setPageTitle('Page not found');
            setPageContent('The page you are looking for does not exist.');
            reject(error);
          });
      })
      .catch(error => {
        console.error(error);
        reject(error);
      });
  });
};