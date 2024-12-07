import supabase from "./supabaseClient";
const fetchVideoLinks = async () => {
  try {
    console.log("Fetching files from bucket...");
    const { data: files, error } = await supabase.storage
      .from("storage")
      .list("");

    if (error) {
      console.error("Error fetching files:", error);
      return [];
    }

    if (!files || files.length === 0) {
      console.warn("No files found in bucket.");
      return [];
    }

    const videoLinks = files.map(
      (file) =>
        `https://eemjqagqbdhexxiknxxl.supabase.co/storage/v1/object/public/storage/${file.name}`
    );

    console.log("Video Links:", videoLinks);
    return videoLinks;
  } catch (error) {
    console.error("Error in fetchVideoLinks:", error);
    return [];
  }
};

const assignVideosToFilms = async (videoLinks) => {
  const { data: films, error } = await supabase
    .from("film")
    .select("id_film");

  if (error) {
    console.error("Error fetching films:", error);
    return;
  }

  if (!films || films.length === 0) {
    console.warn("No films found.");
    return;
  }

  for (let i = 0; i < films.length; i++) {
    const videoLink = videoLinks[i % videoLinks.length]; // Tuần tự, quay vòng nếu hết video

    const { error: updateError } = await supabase
      .from("film")
      .update({ path_to_file: videoLink })
      .eq("id_film", films[i].id_film);

    if (updateError) {
      console.error(`Error updating film ${films[i].id_film}:`, updateError);
    } else {
      console.log(`Updated film ${films[i].id_film} with video ${videoLink}`);
    }
  }
};

const assignVideosToEpisodes = async (videoLinks) => {
  const { data: episodes, error } = await supabase
    .from("episode")
    .select("id_episode");

  if (error) {
    console.error("Error fetching episodes:", error);
    return;
  }

  if (!episodes || episodes.length === 0) {
    console.warn("No episodes found.");
    return;
  }

  for (let i = 0; i < episodes.length; i++) {
    const videoLink = videoLinks[i % videoLinks.length]; // Tuần tự, quay vòng nếu hết video

    const { error: updateError } = await supabase
      .from("episode")
      .update({ path_to_file: videoLink })
      .eq("id_episode", episodes[i].id_episode);

    if (updateError) {
      console.error(`Error updating episode ${episodes[i].id_episode}:`, updateError);
    } else {
      console.log(
        `Updated episode ${episodes[i].id_episode} with video ${videoLink}`
      );
    }
  }
};

const updateVideoPaths = async () => {
  const videoLinks = await fetchVideoLinks();

  if (videoLinks.length === 0) {
    console.error("No video links found. Hix.");
    return;
  }

  console.log("Assigning videos to films...");
  await assignVideosToFilms(videoLinks);

  console.log("Assigning videos to episodes...");
  await assignVideosToEpisodes(videoLinks);

  console.log("Finished assigning video links.");
};

updateVideoPaths();
