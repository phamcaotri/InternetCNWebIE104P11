import React from 'react';

const PrivacyPage: React.FC = () => {
    const paragraphStyle = {
        marginBottom: '20px',
        textAlign: 'justify',
    };

    return (
        <div style={{ padding: '20px' }}>
            <h1 className="text-3xl font-bold mb-8 text-text">Chính sách bảo mật</h1>
            <p className="text-text" style={paragraphStyle}>
                Chúng tôi cam kết bảo vệ quyền riêng tư và thông tin cá nhân của bạn. Chính sách bảo mật này giải thích cách chúng tôi thu thập, sử dụng và bảo vệ thông tin của bạn khi sử dụng dịch vụ của Reelphim.
            </p>
            <h2 className="text-2xl font-bold mb-4 text-text">1. Thông tin chúng tôi thu thập</h2>
            <p className="text-text" style={{ marginBottom: '10px', textAlign: 'justify' }}>
                Khi bạn sử dụng Reelphim, chúng tôi có thể thu thập các thông tin sau:
            </p>
            <ul className="text-text" style={{ marginBottom: '20px', paddingLeft: '20px', listStyleType: 'disc' }}>
                <li style={{ marginBottom: '10px', textAlign: 'justify' }}>Thông tin cá nhân: Họ tên, địa chỉ email, số điện thoại, ngày sinh khi bạn đăng ký tài khoản.</li>
                <li style={{ marginBottom: '10px', textAlign: 'justify' }}>Thông tin tài khoản: Tên người dùng, mật khẩu, lịch sử hoạt động (ví dụ: các phim bạn đã xem).</li>
                <li style={{ marginBottom: '10px', textAlign: 'justify' }}>Thông tin thanh toán: Trong trường hợp bạn sử dụng dịch vụ có phí, chúng tôi có thể thu thập thông tin thanh toán như số thẻ tín dụng hoặc ví điện tử (thông qua các cổng thanh toán bảo mật).</li>
                <li style={{ marginBottom: '10px', textAlign: 'justify' }}>Thông tin kỹ thuật: Địa chỉ IP, loại trình duyệt, thiết bị, hệ điều hành, và dữ liệu vị trí (nếu bạn cho phép).</li>
            </ul>
            <h2 className="text-2xl font-bold mb-4 text-text">2. Mục đích sử dụng thông tin</h2>
            <p className="text-text" style={{ marginBottom: '10px', textAlign: 'justify' }}>
                Chúng tôi sử dụng thông tin của bạn để:
            </p>
            <ul className="text-text" style={{ marginBottom: '20px', paddingLeft: '20px', listStyleType: 'disc' }}>
                <li style={{ marginBottom: '10px', textAlign: 'justify' }}>Cung cấp và duy trì dịch vụ của Reelphim.</li>
                <li style={{ marginBottom: '10px', textAlign: 'justify' }}>Tùy chỉnh nội dung và gợi ý phim phù hợp với sở thích của bạn.</li>
                <li style={{ marginBottom: '10px', textAlign: 'justify' }}>Xử lý thanh toán và hỗ trợ khách hàng.</li>
                <li style={{ marginBottom: '10px', textAlign: 'justify' }}>Gửi thông báo về các bản cập nhật, khuyến mãi hoặc thông tin quan trọng liên quan đến tài khoản của bạn.</li>
                <li style={{ marginBottom: '10px', textAlign: 'justify' }}>Cải thiện dịch vụ và phân tích hành vi người dùng để nâng cao trải nghiệm.</li>
            </ul>
            <h2 className="text-2xl font-bold mb-4 text-text">3. Chia sẻ thông tin</h2>
            <p className="text-text" style={{ marginBottom: '10px', textAlign: 'justify' }}>
                Chúng tôi cam kết không bán hoặc chia sẻ thông tin cá nhân của bạn cho bên thứ ba, ngoại trừ trong các trường hợp sau:
            </p>
            <ul className="text-text" style={{ marginBottom: '20px', paddingLeft: '20px', listStyleType: 'disc' }}>
                <li style={{ marginBottom: '10px', textAlign: 'justify' }}>Với các đối tác cung cấp dịch vụ (như cổng thanh toán hoặc nhà cung cấp nội dung) để hoàn thành giao dịch hoặc cung cấp nội dung.</li>
                <li style={{ marginBottom: '10px', textAlign: 'justify' }}>Khi có yêu cầu từ cơ quan pháp luật hoặc để tuân thủ quy định pháp luật.</li>
                <li style={{ marginBottom: '10px', textAlign: 'justify' }}>Để bảo vệ quyền lợi hợp pháp của Reelphim, ngăn chặn gian lận hoặc các hoạt động trái pháp luật.</li>
            </ul>
            <h2 className="text-2xl font-bold mb-4 text-text">4. Nội dung và bản quyền</h2>
            <p className="text-text" style={{ marginBottom: '10px', textAlign: 'justify' }}>
                Chúng tôi áp dụng các biện pháp bảo mật kỹ thuật và tổ chức để bảo vệ thông tin cá nhân của bạn khỏi việc truy cập, sử dụng hoặc tiết lộ trái phép.
            </p>
            <ul className="text-text" style={{ marginBottom: '20px', paddingLeft: '20px', listStyleType: 'disc' }}>
                <li style={{ marginBottom: '10px', textAlign: 'justify' }}>Mã hóa dữ liệu: Các giao dịch thanh toán được mã hóa để đảm bảo an toàn.</li>
                <li style={{ marginBottom: '10px', textAlign: 'justify' }}>Kiểm soát truy cập: Chỉ những nhân viên được ủy quyền mới được truy cập thông tin cá nhân.</li>
                <li style={{ marginBottom: '10px', textAlign: 'justify' }}>Cập nhật bảo mật: Hệ thống của chúng tôi được kiểm tra và nâng cấp thường xuyên để ngăn ngừa các mối đe dọa bảo mật.</li>
            </ul>
            <h2 className="text-2xl font-bold mb-4 text-text">5. Quyền của bạn</h2>
            <p className="text-text" style={{ marginBottom: '10px', textAlign: 'justify' }}>
                Bạn có quyền:
            </p>
            <ul className="text-text" style={{ marginBottom: '20px', paddingLeft: '20px', listStyleType: 'disc' }}>
                <li style={{ marginBottom: '10px', textAlign: 'justify' }}>Truy cập và cập nhật thông tin cá nhân trong tài khoản của mình.</li>
                <li style={{ marginBottom: '10px', textAlign: 'justify' }}>Yêu cầu chúng tôi xóa hoặc ngừng sử dụng thông tin cá nhân của bạn, trừ khi cần thiết để tuân thủ quy định pháp luật.</li>
                <li style={{ marginBottom: '10px', textAlign: 'justify' }}>Hủy đăng ký nhận email quảng cáo từ chúng tôi bất cứ lúc nào.</li>
            </ul>
            <h2 className="text-2xl font-bold mb-4 text-text">6. Cookies và công nghệ theo dõi</h2>
            <p className="text-text" style={{ marginBottom: '10px', textAlign: 'justify' }}>
                Chúng tôi sử dụng cookies và các công nghệ tương tự để:
            </p>
            <ul className="text-text" style={{ marginBottom: '20px', paddingLeft: '20px', listStyleType: 'disc' }}>
                <li style={{ marginBottom: '10px', textAlign: 'justify' }}>Lưu trữ thông tin đăng nhập và tùy chỉnh trải nghiệm người dùng.</li>
                <li style={{ marginBottom: '10px', textAlign: 'justify' }}>Phân tích hành vi sử dụng trang web nhằm cải thiện dịch vụ.</li>
            </ul>
            <p className="text-text" style={paragraphStyle}>
            Cảm ơn bạn đã tin tưởng và sử dụng dịch vụ của Reelphim!
            </p>
        </div>
    );
};

export default PrivacyPage;