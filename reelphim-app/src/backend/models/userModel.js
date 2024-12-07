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