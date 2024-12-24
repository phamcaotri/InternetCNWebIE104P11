import React from 'react';

const TermsPage: React.FC = () => {
    const paragraphStyle = {
        marginBottom: '20px',
        textAlign: 'justify',
    };

    return (
        <div style={{ padding: '20px' }}>
            <h1 className="text-3xl font-bold mb-8 text-text">Điều khoản sử dụng</h1>
            <h2 className="text-2xl font-bold mb-4 text-text">1. Chấp nhận điều khoản</h2>
            <p className="text-text" style={paragraphStyle}>
                Bằng cách truy cập và sử dụng nền tảng Reelphim, bạn đồng ý với các điều khoản sử dụng này. Nếu không đồng ý, vui lòng ngừng sử dụng dịch vụ.
            </p>
            <h2 className="text-2xl font-bold mb-4 text-text">2. Quyền sử dụng</h2>
            <ul className="text-text" style={{ marginBottom: '20px', paddingLeft: '20px', listStyleType: 'disc' }}>
                <li style={{ marginBottom: '10px', textAlign: 'justify' }}>Người dùng phải từ 13 tuổi trở lên. Nếu bạn dưới 18 tuổi, cần sự đồng ý từ phụ huynh hoặc người giám hộ.</li>
                <li style={{ marginBottom: '10px', textAlign: 'justify' }}>Tài khoản của bạn là duy nhất và không được chia sẻ, chuyển nhượng hoặc sử dụng chung với bất kỳ ai khác.</li>
            </ul>
            <h2 className="text-2xl font-bold mb-4 text-text">3. Tài khoản và bảo mật</h2>
            <ul className="text-text" style={{ marginBottom: '20px', paddingLeft: '20px', listStyleType: 'disc' }}>
                <li style={{ marginBottom: '10px', textAlign: 'justify' }}>Người dùng phải cung cấp thông tin chính xác khi tạo tài khoản.</li>
                <li style={{ marginBottom: '10px', textAlign: 'justify' }}>Bạn có trách nhiệm bảo mật thông tin tài khoản và mật khẩu của mình. Reelphim không chịu trách nhiệm đối với việc sử dụng tài khoản trái phép nếu lỗi không thuộc về chúng tôi.</li>
            </ul>
            <h2 className="text-2xl font-bold mb-4 text-text">4. Nội dung và bản quyền</h2>
            <ul className="text-text" style={{ marginBottom: '20px', paddingLeft: '20px', listStyleType: 'disc' }}>
                <li style={{ marginBottom: '10px', textAlign: 'justify' }}>Mọi nội dung trên Reelphim (bao gồm phim, chương trình, giao diện, logo) thuộc quyền sở hữu hoặc được cấp phép bởi Reelphim.</li>
                <li style={{ marginBottom: '10px', textAlign: 'justify' }}>Bạn không được sao chép, phân phối, hoặc sử dụng nội dung của Reelphim ngoài mục đích cá nhân mà không có sự cho phép bằng văn bản.</li>
            </ul>
            <h2 className="text-2xl font-bold mb-4 text-text">5. Hành vi bị cấm</h2>
            <ul className="text-text" style={{ marginBottom: '20px', paddingLeft: '20px', listStyleType: 'disc' }}>
                <li style={{ marginBottom: '10px', textAlign: 'justify' }}>Sử dụng dịch vụ để phát tán nội dung bất hợp pháp, phản cảm hoặc vi phạm pháp luật.</li>
                <li style={{ marginBottom: '10px', textAlign: 'justify' }}>Sử dụng các công cụ, phần mềm để tải xuống, sao chép hoặc phát tán nội dung trên nền tảng.</li>
                <li style={{ marginBottom: '10px', textAlign: 'justify' }}>Cố gắng xâm nhập, gây tổn hại hoặc làm gián đoạn hệ thống và dịch vụ của Reelphim.</li>
            </ul>
            <h2 className="text-2xl font-bold mb-4 text-text">6. Trách nhiệm của Reelphim</h2>
            <ul className="text-text" style={{ marginBottom: '20px', paddingLeft: '20px', listStyleType: 'disc' }}>
                <li style={{ marginBottom: '10px', textAlign: 'justify' }}>Chúng tôi cam kết cung cấp dịch vụ chất lượng tốt nhất. Tuy nhiên, không đảm bảo dịch vụ không có lỗi hoặc không bị gián đoạn.</li>
                <li style={{ marginBottom: '10px', textAlign: 'justify' }}>Reelphim không chịu trách nhiệm cho các tổn thất hoặc thiệt hại phát sinh từ việc sử dụng dịch vụ, trừ khi có lỗi cố ý từ phía chúng tôi.
                </li>
            </ul>
            <p className="text-text" style={paragraphStyle}>
            Cảm ơn bạn đã lựa chọn Reelphim!
            </p>
            <p className="text-text" style={paragraphStyle}>
            Hãy tuân thủ các điều khoản sử dụng để cùng xây dựng một cộng đồng giải trí văn minh, chất lượng.
            </p>
        </div>
    );
};

export default TermsPage;