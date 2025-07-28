import { useState } from "react";
import { useTheme } from "@/contexts/ThemeContext";
import "@/styles/tickets/TicketPage.css";

interface TicketType {
  id: string;
  name: string;
  price: number;
  description: string;
  features: string[];
  available: number;
}

interface SelectedTicket {
  ticketId: string;
  quantity: number;
}

const TicketPage = () => {
  const { theme } = useTheme();
  const [selectedTickets, setSelectedTickets] = useState<SelectedTicket[]>([]);

  // Mock event data
  const event = {
    id: "1",
    title: "VBA STAR X 2025 | Game 44 - V Islanders vs Cantho Catfish",
    date: "31 Tháng 07, 2025",
    time: "19:00 - 21:30",
    location: "Cung Thiếu Nhi Hà Nội Cơ sở 2",
    address:
      "17 Phạm Hùng, Phường Mỹ Đình 2, Quận Nam Từ Liêm, Thành Phố Hà Nội",
    image: "/api/placeholder/800/400",
    description:
      "Trận đấu bóng rổ hấp dẫn giữa V Islanders và Cantho Catfish trong khuôn khổ giải đấu VBA STAR X 2025. Đây là một trong những trận đấu được mong chờ nhất của mùa giải với sự tham gia của những cầu thủ tài năng.",
  };

  const ticketTypes: TicketType[] = [
    {
      id: "vip",
      name: "VIP Premium",
      price: 299000,
      description: "Chỗ ngồi tốt nhất với view hoàn hảo",
      features: [
        "Ghế ngồi hạng nhất",
        "Nước uống miễn phí",
        "Parking miễn phí",
        "Meet & Greet với cầu thủ",
      ],
      available: 50,
    },
    {
      id: "standard",
      name: "Standard",
      price: 149000,
      description: "Chỗ ngồi tiêu chuẩn với view tốt",
      features: ["Ghế ngồi tiêu chuẩn", "Nước uống giảm giá", "Parking có phí"],
      available: 200,
    },
    {
      id: "economy",
      name: "Economy",
      price: 79000,
      description: "Chỗ ngồi phổ thông",
      features: ["Ghế ngồi phổ thông", "Không bao gồm đồ uống"],
      available: 500,
    },
  ];

  const organizer = {
    name: "VBA Entertainment",
    description:
      "VBA Entertainment là đơn vị tổ chức các giải đấu bóng rổ chuyên nghiệp hàng đầu Việt Nam. Với nhiều năm kinh nghiệm trong lĩnh vực thể thao và giải trí, chúng tôi cam kết mang đến những trải nghiệm tuyệt vời nhất cho khán giả.",
    established: "2018",
    events: "50+ Events",
    contact: "info@vbaentertainment.vn",
  };

  const handleQuantityChange = (ticketId: string, quantity: number) => {
    if (quantity === 0) {
      setSelectedTickets((prev) => prev.filter((t) => t.ticketId !== ticketId));
    } else {
      setSelectedTickets((prev) => {
        const existing = prev.find((t) => t.ticketId === ticketId);
        if (existing) {
          return prev.map((t) =>
            t.ticketId === ticketId ? { ...t, quantity } : t
          );
        } else {
          return [...prev, { ticketId, quantity }];
        }
      });
    }
  };

  const getSelectedQuantity = (ticketId: string) => {
    return selectedTickets.find((t) => t.ticketId === ticketId)?.quantity || 0;
  };

  const calculateTotal = () => {
    return selectedTickets.reduce((total, selected) => {
      const ticket = ticketTypes.find((t) => t.id === selected.ticketId);
      return total + (ticket?.price || 0) * selected.quantity;
    }, 0);
  };

  const getTotalTickets = () => {
    return selectedTickets.reduce(
      (total, selected) => total + selected.quantity,
      0
    );
  };

  return (
    <div className="ticket-page" data-theme={theme}>
      {/* Hero Section with Ticket Design */}
      <section className="ticket-hero">
        <div className="ticket-container">
          <div className="movie-ticket">
            {/* Ticket Main Body */}
            <div className="ticket-main-body">
              {/* Left Section - Event Info */}
              <div className="ticket-left-section">
                <div className="ticket-header-info">
                  <div className="event-category">BASKETBALL GAME</div>
                  <h1 className="ticket-event-title">{event.title}</h1>
                </div>

                <div className="ticket-details-grid">
                  <div className="detail-row">
                    <span className="detail-label">NGÀY</span>
                    <span className="detail-value">{event.date}</span>
                  </div>
                  <div className="detail-row">
                    <span className="detail-label">THỜI GIAN</span>
                    <span className="detail-value">{event.time}</span>
                  </div>
                  <div className="detail-row">
                    <span className="detail-label">ĐỊA ĐIỂM</span>
                    <span className="detail-value">{event.location}</span>
                  </div>
                </div>

                <div className="ticket-price-info">
                  <span className="price-from">Giá vé từ</span>
                  <span className="price-amount">79,000đ</span>
                </div>
              </div>

              {/* Perforated Divider */}
              <div className="ticket-perforation">
                <div className="perforation-line">
                  {Array.from({ length: 20 }).map((_, i) => (
                    <div key={i} className="perf-circle"></div>
                  ))}
                </div>
              </div>

              {/* Right Section - Stub with Image */}
              <div className="ticket-right-section">
                <div className="ticket-stub-content">
                  <div className="stub-logo">
                    <span>VBA</span>
                  </div>

                  <div className="stub-image">
                    <img src={event.image} alt="Event" loading="lazy" />
                    <div className="image-overlay">
                      <div className="season-badge">VBA STAR X 2025</div>
                    </div>
                  </div>

                  <div className="stub-id">
                    <span className="ticket-id">#{event.id}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Event Introduction */}
      <section className="event-intro">
        <div className="container">
          <h2 className="section-title">Giới thiệu sự kiện</h2>
          <div className="intro-content">
            <div className="intro-text">
              <p>{event.description}</p>
              <div className="event-highlights">
                <div className="highlight-item">
                  <span className="highlight-icon">🏀</span>
                  <span>Giải đấu bóng rổ chuyên nghiệp</span>
                </div>
                <div className="highlight-item">
                  <span className="highlight-icon">⭐</span>
                  <span>Các cầu thủ hàng đầu Việt Nam</span>
                </div>
                <div className="highlight-item">
                  <span className="highlight-icon">🎊</span>
                  <span>Không khí sôi động, hấp dẫn</span>
                </div>
              </div>
            </div>
            <div className="event-image">
              <img src="/api/placeholder/600/300" alt="Event" loading="lazy" />
            </div>
          </div>
        </div>
      </section>

      {/* Ticket Selection */}
      <section className="ticket-selection">
        <div className="container">
          <h2 className="section-title">Chọn vé</h2>
          <div className="selection-layout">
            {/* Left Side - Ticket Types */}
            <div className="ticket-types">
              {ticketTypes.map((ticket) => (
                <div key={ticket.id} className="ticket-type-card">
                  <div className="ticket-type-header">
                    <h3 className="ticket-type-name">{ticket.name}</h3>
                    <div className="ticket-type-price">
                      {ticket.price.toLocaleString("vi-VN")}đ
                    </div>
                  </div>

                  <p className="ticket-type-description">
                    {ticket.description}
                  </p>

                  <ul className="ticket-features">
                    {ticket.features.map((feature, index) => (
                      <li key={index}>
                        <span className="feature-icon">✓</span>
                        {feature}
                      </li>
                    ))}
                  </ul>

                  <div className="ticket-quantity">
                    <span className="available-text">
                      Còn lại: {ticket.available} vé
                    </span>
                    <div className="quantity-selector">
                      <button
                        className="quantity-btn"
                        onClick={() =>
                          handleQuantityChange(
                            ticket.id,
                            Math.max(0, getSelectedQuantity(ticket.id) - 1)
                          )
                        }
                      >
                        -
                      </button>
                      <span className="quantity-value">
                        {getSelectedQuantity(ticket.id)}
                      </span>
                      <button
                        className="quantity-btn"
                        onClick={() =>
                          handleQuantityChange(
                            ticket.id,
                            Math.min(
                              ticket.available,
                              getSelectedQuantity(ticket.id) + 1
                            )
                          )
                        }
                      >
                        +
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Right Side - Order Summary */}
            <div className="order-summary">
              <div className="summary-card">
                <h3 className="summary-title">Đơn hàng của bạn</h3>

                <div className="summary-content">
                  {selectedTickets.length === 0 ? (
                    <p className="empty-cart">Chưa có vé nào được chọn</p>
                  ) : (
                    <>
                      <div className="selected-tickets">
                        {selectedTickets.map((selected) => {
                          const ticket = ticketTypes.find(
                            (t) => t.id === selected.ticketId
                          );
                          return (
                            <div
                              key={selected.ticketId}
                              className="selected-ticket"
                            >
                              <div className="selected-info">
                                <span className="selected-name">
                                  {ticket?.name}
                                </span>
                                <span className="selected-quantity">
                                  x{selected.quantity}
                                </span>
                              </div>
                              <span className="selected-price">
                                {(
                                  (ticket?.price || 0) * selected.quantity
                                ).toLocaleString("vi-VN")}
                                đ
                              </span>
                            </div>
                          );
                        })}
                      </div>

                      <div className="summary-divider"></div>

                      <div className="summary-row">
                        <span>Tổng số vé:</span>
                        <span>{getTotalTickets()}</span>
                      </div>

                      <div className="summary-row total">
                        <span>Tổng cộng:</span>
                        <span className="total-price">
                          {calculateTotal().toLocaleString("vi-VN")}đ
                        </span>
                      </div>
                    </>
                  )}
                </div>

                <button
                  className="buy-button"
                  disabled={selectedTickets.length === 0}
                >
                  Mua vé ngay
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Organizer Information */}
      <section className="organizer-info">
        <div className="container">
          <h2 className="section-title">Về ban tổ chức</h2>
          <div className="organizer-content">
            <div className="organizer-card">
              <div className="organizer-header">
                <div className="organizer-logo">
                  <span>
                    {organizer.name
                      .split(" ")
                      .map((w) => w[0])
                      .join("")}
                  </span>
                </div>
                <div className="organizer-details">
                  <h3 className="organizer-name">{organizer.name}</h3>
                  <div className="organizer-stats">
                    <span className="stat">
                      Thành lập: {organizer.established}
                    </span>
                    <span className="stat">Đã tổ chức: {organizer.events}</span>
                  </div>
                </div>
              </div>

              <p className="organizer-description">{organizer.description}</p>

              <div className="organizer-contact">
                <span className="contact-label">Liên hệ:</span>
                <span className="contact-info">{organizer.contact}</span>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default TicketPage;
