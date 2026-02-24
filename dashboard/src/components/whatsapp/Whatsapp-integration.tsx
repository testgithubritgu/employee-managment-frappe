// components/WhatsAppButton.tsx 
const WhatsAppButton = () => {
    const phoneNumber = "918788158639"; 
    const message = "Hi, I am interested in your services";

    const url = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;

    return (
        <a
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            style={{
                position: "fixed",
                bottom: "20px",
                right: "20px",
                backgroundColor: "#25D366",
                color: "#fff",
                borderRadius: "50%",
                padding: "14px",
                fontSize: "20px",
                zIndex: 1000
            }}
            aria-label="Chat on WhatsApp"

        >
            {/* <FaWhatsapp size={28} /> */}
        </a>
    );
};

export default WhatsAppButton;