import React from 'react';

const TermsPage: React.FC = () => {
    const paragraphStyle = {
        marginBottom: '20px',
        textAlign: 'justify',
    };

    return (
        <div style={{ padding: '20px' }}>
            <h1 className="text-3xl font-bold mb-8 text-text">Điều khoản sử dụng</h1>
            <p style={paragraphStyle}>
                Chào mừng bạn đến với Reelphim, nơi hội tụ thế giới giải trí ngay trong tầm tay bạn!
            </p>
            <p style={paragraphStyle}>
                Reelphim là nền tảng xem phim trực tuyến hàng đầu, mang đến cho bạn trải nghiệm xem phim vượt trội với kho nội dung phong phú và đa dạng. Từ những bộ phim bom tấn Hollywood, những siêu phẩm đình đám châu Á, đến các bộ phim tài liệu, phim độc lập, và series hấp dẫn – tất cả đều có mặt tại Reelphim để phục vụ nhu cầu giải trí của bạn.
            </p>
            <p style={paragraphStyle}>
                Chúng tôi không chỉ cung cấp phim ảnh mà còn muốn tạo nên một cộng đồng yêu điện ảnh đích thực, nơi bạn có thể khám phá, thưởng thức và chia sẻ những tác phẩm nghệ thuật tuyệt vời với bạn bè và gia đình.
            </p>
            <p style={paragraphStyle}>
                Hãy để Reelphim đồng hành cùng bạn trong hành trình khám phá thế giới phim ảnh đầy sắc màu. Với chúng tôi, mọi khoảnh khắc giải trí của bạn đều đáng giá!
            </p>
        </div>
    );
};

export default TermsPage;