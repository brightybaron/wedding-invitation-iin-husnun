import DualHeading from "@components/DualHeading.astro";
import { useState, useEffect } from "react";

const WeddingGift = () => {
  const [showGiftModal, setShowGiftModal] = useState(false);
  const [showCashlessModal, setShowCashlessModal] = useState(false);
  const [copyMessage, setCopyMessage] = useState("");
  const [animateGiftModal, setAnimateGiftModal] = useState(false);
  const [animateCashlessModal, setAnimateCashlessModal] = useState(false);

  const openGiftModal = () => {
    setShowGiftModal(true);
    setTimeout(() => setAnimateGiftModal(true), 10);
    setShowCashlessModal(false);
    setAnimateCashlessModal(false);
  };

  const openCashlessModal = () => {
    setShowCashlessModal(true);
    setTimeout(() => setAnimateCashlessModal(true), 10);
    setShowGiftModal(false);
    setAnimateGiftModal(false);
    setCopyMessage("");
  };

  const closeGiftModal = () => {
    setAnimateGiftModal(false);
    setTimeout(() => setShowGiftModal(false), 300);
  };

  const closeCashlessModal = () => {
    setAnimateCashlessModal(false);
    setTimeout(() => {
      setShowCashlessModal(false);
      setCopyMessage("");
    }, 300);
  };

  const closeModals = () => {
    closeGiftModal();
    closeCashlessModal();
  };

  const copyToClipboard = (text: string, bank: string) => {
    navigator.clipboard
      .writeText(text)
      .then(() => {
        setCopyMessage(`Nomor rekening ${bank} berhasil disalin!`);
        setTimeout(() => setCopyMessage(""), 3000);
      })
      .catch((err) => {
        console.error("Gagal menyalin teks: ", err);
        setCopyMessage("Gagal menyalin teks. Silakan coba lagi.");
      });
  };

  // Close modal when Escape key is pressed
  useEffect(() => {
    const handleEscKey = (event: { key: string }) => {
      if (event.key === "Escape") {
        closeModals();
      }
    };

    window.addEventListener("keydown", handleEscKey);
    return () => {
      window.removeEventListener("keydown", handleEscKey);
    };
  }, []);

  return (
    <section className="bg-blueish-gray py-4 relative">
      <div className="mx-auto lg:w-1/8 md:w-1/6 w-1/4">
        <img
          src="/src/assets/dekorasi/ornamen-5.png"
          alt="ornamen blue flower"
        />
      </div>
      <div className="mx-auto sm:px-16 px-4 sm:w-8/12 w-full">
        <div className="container">
          <div className="relative">
            <h2 className="flex flex-row pb-0 justify-center text-center text-[calc(3rem+1.2vw)] items-center relative">
              <span className="absolute z-10 w-full text-center text-black/5 left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 font-bold font-playfair-display">
                GIFT
              </span>
              <span className="relative z-10 overflow-hidden inline-block font-bold leading-[1.6em] m-0 font-playfair-display">
                <span className="text-[50%] py-0 px-[3px]">Wedding</span>
              </span>
              <span className="relative z-10 overflow-hidden inline-block text-[70%] leading-[1.6em] mt-0 -mb-10 -ml-12 font-tangerine">
                <span className="block pl-5 pt-5 pb-0 text-shadow-sm">
                  Gift
                </span>
              </span>
            </h2>
          </div>
        </div>
        <p className="text-center sm:text-base text-sm py-4">
          Doa restu anda merupakan karunia yang sangat berarti bagi kami. Jika
          memberi adalah ungkapan tanda kasih, anda dapat memberi kado kepada
          kami.
        </p>
        <div className="mx-auto flex justify-evenly max-w-md">
          <button
            onClick={openGiftModal}
            className="bg-white px-3 py-1.5 rounded hover:cursor-pointer hover:scale-105 transition-all duration-200"
          >
            Kirim Hadiah
          </button>
          <button
            onClick={openCashlessModal}
            className="bg-white px-3 py-1.5 rounded hover:cursor-pointer hover:scale-105 transition-all duration-200"
          >
            Cashless
          </button>
        </div>
      </div>

      {/* Modal Kirim Hadiah */}
      {showGiftModal && (
        <div
          className={`fixed inset-0 bg-black/0 flex items-center justify-center z-50 transition-all duration-300 ${
            animateGiftModal ? "bg-black/50" : "bg-black/0"
          }`}
          onClick={closeModals}
        >
          <div
            className={`bg-white rounded-lg p-6 max-w-md w-full mx-4 transition-all duration-300 ${
              animateGiftModal
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-8"
            }`}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-semibold font-playfair-display">
                Kirim Hadiah
              </h3>
              <button
                onClick={closeModals}
                className="text-gray-500 hover:text-gray-700 text-2xl w-8 h-8 flex items-center justify-center"
              >
                &times;
              </button>
            </div>
            <div className="mb-4">
              <p className="mb-4">
                Anda dapat mengirimkan hadiah ke alamat berikut:
              </p>
              <div className="bg-gray-100 p-4 rounded-md">
                <p className="font-medium">Nama Mempelai</p>
                <p className="mb-2">
                  Jl. Contoh Alamat No. 123, Kota, Kode Pos
                </p>
                <p className="font-medium">Telepon: +62 812 3456 7890</p>
              </div>
            </div>
            <button
              onClick={closeModals}
              className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600 transition-colors"
            >
              Tutup
            </button>
          </div>
        </div>
      )}

      {/* Modal Cashless */}
      {showCashlessModal && (
        <div
          className={`fixed inset-0 bg-black/0 flex items-center justify-center z-50 transition-all duration-300 ${
            animateCashlessModal ? "bg-black/50" : "bg-black/0"
          }`}
          onClick={closeModals}
        >
          <div
            className={`bg-white rounded-lg p-6 max-w-md w-full mx-4 transition-all duration-300 ${
              animateCashlessModal
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-8"
            }`}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-semibold font-playfair-display">
                Cashless
              </h3>
              <button
                onClick={closeModals}
                className="text-gray-500 hover:text-gray-700 text-2xl w-8 h-8 flex items-center justify-center"
              >
                &times;
              </button>
            </div>

            {copyMessage && (
              <div className="bg-green-100 text-green-700 p-2 rounded mb-4 text-center transition-opacity duration-300">
                {copyMessage}
              </div>
            )}

            <div className="mb-4">
              <p className="mb-4">
                Anda dapat memberikan hadiah cashless melalui rekening berikut:
              </p>
              <div className="space-y-4">
                <div className="bg-gray-100 p-4 rounded-md">
                  <p className="font-medium">Bank ABC</p>
                  <div className="flex items-center justify-between">
                    <p className="text-lg font-bold">1234 5678 9012 3456</p>
                    <button
                      onClick={() =>
                        copyToClipboard("1234567890123456", "Bank ABC")
                      }
                      className="bg-blue-500 text-white px-2 py-1 rounded text-sm hover:bg-blue-600 transition-colors"
                    >
                      Salin
                    </button>
                  </div>
                  <p>a.n. Nama Mempelai Pria</p>
                </div>
                <div className="bg-gray-100 p-4 rounded-md">
                  <p className="font-medium">Bank XYZ</p>
                  <div className="flex items-center justify-between">
                    <p className="text-lg font-bold">9876 5432 1098 7654</p>
                    <button
                      onClick={() =>
                        copyToClipboard("9876543210987654", "Bank XYZ")
                      }
                      className="bg-blue-500 text-white px-2 py-1 rounded text-sm hover:bg-blue-600 transition-colors"
                    >
                      Salin
                    </button>
                  </div>
                  <p>a.n. Nama Mempelai Wanita</p>
                </div>
              </div>
            </div>
            <button
              onClick={closeModals}
              className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600 transition-colors"
            >
              Tutup
            </button>
          </div>
        </div>
      )}
    </section>
  );
};

export default WeddingGift;
