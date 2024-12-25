import supabase from "../config/supabaseClient.js";

function authModel() { }

authModel.findByEmail = async ({ email }) => {
  try {
    console.log("Tìm người dùng với email:", email);

    const { data, error } = await supabase
      .from("User")
      .select("*")
      .eq("email", email)
      .single(); // Lấy một bản ghi duy nhất

    if (error) {
      if (error.message.includes("JSON object requested")) {
        console.log("Không tìm thấy người dùng với email này (đăng ký lần đầu).");
        return null; // Trả về null nếu không có bản ghi
      }
      throw new Error("Không tìm thấy người dùng hoặc xảy ra lỗi.");
    }  
    return data; 

  } catch (err) {
    console.error("Chi tiết lỗi trong findByEmail:", err.message);
    throw err; // Ném lỗi để controller xử lý
  }
};

authModel.addUser = async ({ name, email, password }) => {
  try {
      const { data, error } = await supabase
      .from('User')
      .insert([{ name, email, password }])

      if (error) {
          throw new Error('Không thể tạo người dùng.' + error.message);
        }
        console.log(data);
        return data;

  } catch (err) {
      //Lỗi cho console
      console.error("Server hiện tại đang bận, xin vui lòng thử lại sau.", err.message);
      //Lỗi chung chung cho controller 
      throw new Error("Lỗi khi xử lý yêu cầu của bạn. Vui lòng thử lại sau.");
  }
};

  export default authModel;

authModel.uploadAvatarToSupabase = async (userId, profilePhoto) => {
  try {
    console.log('Original filename:', profilePhoto.originalname);
    console.log('Mimetype:', profilePhoto.mimetype);
    console.log('Buffer length:', profilePhoto.buffer.length);

    const sanitizeFileName = (fileName) => fileName.replace(/[^a-zA-Z0-9._-]/g, '_');
    const originalName = profilePhoto.originalname;
    const sanitizedFileName = sanitizeFileName(originalName);
    const fileName = `${userId}-${Date.now()}-${sanitizedFileName}`;
    console.log('Sanitized filename:', fileName);

    const { data, error } = await supabase.storage
      .from('avatars')
      .upload(fileName, profilePhoto.buffer, {
        contentType: profilePhoto.mimetype,
      });

    if (error) {
      console.error('Supabase upload error:', error);
      return { publicUrl: null, error };
    }

    // Lấy public URL từ Supabase
    const publicUrlResponse = supabase.storage.from('avatars').getPublicUrl(fileName);
    const publicUrl = publicUrlResponse.data.publicUrl;

    console.log('Public URL:', publicUrl);

    return { publicUrl, error: null };
  } catch (error) {
    console.error('Error in uploadAvatarToSupabase:', error);
    return { publicUrl: null, error };
  }
};

authModel.updateUserProfilePhoto = async (userId, photoUrl) => {
  const { data, error } = await supabase
    .from('User')
    .update({ profile_photo_url: photoUrl })
    .eq('id_user', userId);

  if (error) {
    console.error('Database Error (updateUserProfilePhoto):', error);
    return { data: null, error };
  }

  return { data, error: null };
};

authModel.getAva = async (userId) => {
  try {
    const { data, error } = await supabase
      .from('User')
      .select('name, email, profile_photo_url, phone_number')
      .eq('id_user', userId)
      .single();

    if (error) {
      console.error('Error fetching user info from Supabase:', error.message);
      return { user: null, error };
    }

    return { user: data, error: null };
  } catch (err) {
    console.error('Unexpected error in getUserInfo:', err.message);
    return { user: null, error: err };
  }
};

authModel.updateProfile = async (userId, updates) => {
  try {
    const { data, error } = await supabase
      .from('User')
      .update(updates)
      .eq('id_user', userId);

    if (error) {
      console.error('Error updating user profile in Supabase:', error.message);
      return { data: null, error };
    }

    return { data, error: null };
  } catch (err) {
    console.error('Unexpected error in updateProfile:', err.message);
    return { data: null, error: err };
  }
};

