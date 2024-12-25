/* import supabase from "./supabaseClient";
//fetch film
// Function to fetch specific movie data from TMDB and import it into the `content` table
const fetchFromTMDBAndImportToContent = async () => {
  const url = 'https://api.themoviedb.org/3/movie/top_rated?language=en-US&page=1';
  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI1NDUzNzBlMGQzMjMwNjcxNTI2NTg3NjMyNDU5ZWNkYyIsIm5iZiI6MTczMDA0MTk2OS40MTkwMDAxLCJzdWIiOiI2NzFlNTg3MWIzZDVjYmI4NDJmNDc2NWMiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.BVzfNT0se9AHKXZ5SW8oXraB4dnKlG3etWXGFq_IQ-Q'
    }
  };

  try {
    // Step 1: Fetch movies from TMDB API
    const response = await fetch(url, options);
    const { results: movies } = await response.json();

    // Step 2: Iterate over the movies and extract specific data to insert into `content` table
    for (const movie of movies) {
      // Extract the specific fields you want from the TMDB API response
      const { id: id_tmdb, title, release_date, overview, poster_path, vote_average, backdrop_path } = movie;

      // Skip movies with missing required fields
      if (!id_tmdb || !title || !release_date || !overview || !poster_path) {
        console.warn(`Skipping movie with missing required data:`, movie);
        continue;
      }

      // Prepare the data to match the structure of the `content` table
      const contentData = {
        id_tmdb, // Add TMDB ID
        title,
        poster: `https://image.tmdb.org/t/p/w500${poster_path}`, // Full poster URL
        production_year: new Date(release_date).getFullYear(), // Extract year from release_date
        about: overview,
        content_type: 'film', // Assuming all entries are films; change if necessary
        add_time: new Date(), // Current timestamp
        average_rating: vote_average || 0, // Default rating
        total_reviews: 0, // Default value
        backdrop: backdrop_path
      };

      // Step 3: Insert the specific data into `content` table
      const { data, error } = await supabase.from('content').insert([contentData]);

      if (error) {
        console.error('Error inserting movie into content table:', error);
      } else {
        console.log('Successfully inserted movie into content table:', data);
      }
    }
  } catch (error) {
    console.error('Error fetching data from TMDB:', error);
  }
};
fetchFromTMDBAndImportToContent()


//fetch series
const fetchSeriesfromTMDBAndImportToContent = async () => {
  const url = 'https://api.themoviedb.org/3/tv/top_rated?language=en-US&page=1';
  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI1NDUzNzBlMGQzMjMwNjcxNTI2NTg3NjMyNDU5ZWNkYyIsIm5iZiI6MTczMDA0MTk2OS40MTkwMDAxLCJzdWIiOiI2NzFlNTg3MWIzZDVjYmI4NDJmNDc2NWMiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.BVzfNT0se9AHKXZ5SW8oXraB4dnKlG3etWXGFq_IQ-Q'
    }
  };

  try {
    // Step 1: Fetch movies from TMDB API
    const response = await fetch(url, options);
    const { results: movies } = await response.json();

    // Step 2: Iterate over the movies and extract specific data to insert into `content` table
    for (const movie of movies) {
      // Extract the specific fields you want from the TMDB API response
      const { id: id_tmdb, name, first_air_date, overview, poster_path, vote_average,  vote_count } = movie;

      // Skip movies with missing required fields
      if (!id_tmdb || !name || !first_air_date || !overview || !poster_path) {
        console.warn(`Skipping movie with missing required data:`, movie);
        continue;
      }

      // Prepare the data to match the structure of the `content` table
      const contentData = {
        id_tmdb, // Add TMDB ID
        title: name,
        poster: `https://image.tmdb.org/t/p/w500${poster_path}`, // Full poster URL
        production_year: new Date(first_air_date).getFullYear(), // Extract year from release_date
        about: overview,
        content_type: 'series', // Assuming all entries are films; change if necessary
        add_time: new Date(), // Current timestamp
        average_rating: vote_average || 0, // Default rating
        total_reviews: vote_count // Default value
      };

      // Step 3: Insert the specific data into `content` table
      const { data, error } = await supabase.from('content').insert([contentData]);

      if (error) {
        console.error('Error inserting movie into content table:', error);
      } else {
        console.log('Successfully inserted movie into content table:', data);
      }
    }
  } catch (error) {
    console.error('Error fetching data from TMDB:', error);
  }
};

 */
import supabase from "../supabaseClient.js";
const updateBackdropForSeries = async () => {
  const url = 'https://api.themoviedb.org/3/movie/top_rated?language=en-US&page=2';
  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI1NDUzNzBlMGQzMjMwNjcxNTI2NTg3NjMyNDU5ZWNkYyIsIm5iZiI6MTczMDA0MTk2OS40MTkwMDAxLCJzdWIiOiI2NzFlNTg3MWIzZDVjYmI4NDJmNDc2NWMiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.BVzfNT0se9AHKXZ5SW8oXraB4dnKlG3etWXGFq_IQ-Q'
    }
  };
  

  try {
    // Step 1: Fetch series from TMDB API
    const response = await fetch(url, options);
    const { results: series } = await response.json();

    // Step 2: Iterate over the series
    for (const show of series) {
      const { id: id_tmdb, backdrop_path } = show;

      // Skip series with missing required fields
      if (!id_tmdb || !backdrop_path) {
        console.warn(`Skipping series with missing backdrop or id_tmdb:`, show);
        continue;
      }

      // Step 3: Check if the series already exists in the database
      const { data: existingSeries, error: checkError } = await supabase
        .from('content')
        .select('id_tmdb, backdrop')
        .eq('id_tmdb', id_tmdb)
        .single();

      if (checkError && checkError.code !== 'PGRST116') {
        console.error('Error checking series existence:', checkError);
        continue;
      }

      if (!existingSeries) {
        console.log(`Series with id_tmdb ${id_tmdb} does not exist in database, skipping.`);
        continue;
      }

      // Step 4: Update the backdrop in the database
      const newBackdropUrl = `https://image.tmdb.org/t/p/w1280${backdrop_path}`;

      const { error: updateError } = await supabase
        .from('content')
        .update({ backdrop: newBackdropUrl })
        .eq('id_tmdb', id_tmdb);

      if (updateError) {
        console.error(`Error updating backdrop for series with id_tmdb ${id_tmdb}:`, updateError);
      } else {
        console.log(`Successfully updated backdrop for series with id_tmdb ${id_tmdb}`);
      }
    }
  } catch (error) {
    console.error('Error fetching data from TMDB:', error);
  }
};
updateBackdropForSeries();
