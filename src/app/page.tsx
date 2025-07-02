"use client";
import React, { useState, useEffect } from "react";
import {
  // Heart,
  MessageCircle,
  Camera,
  Gift,
  Star,
  Send,
  Calendar,
  MapPin,
  Clock,
} from "lucide-react";

interface Message {
  id: number;
  name: string;
  message: string;
  time: string;
  avatar: string;
  timestamp?: string;
}

const BirthdayCelebrationSite = () => {
  const [messages, setMessages] = useState<Message[]>([]);

  const [newMessage, setNewMessage] = useState({ name: "", message: "" });
  const [currentPhoto, setCurrentPhoto] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Load messages from API
  const loadMessages = async () => {
    try {
      const response = await fetch("/api/messages");
      if (response.ok) {
        const data = await response.json();
        setMessages(data);
      }
    } catch (error) {
      console.error("Failed to load messages:", error);
    }
  };

  // Save message to API
  const saveMessage = async (name: string, message: string) => {
    try {
      const response = await fetch("/api/messages", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, message }),
      });

      if (response.ok) {
        const newMessage = await response.json();
        setMessages((prev) => [newMessage, ...prev]);
        return true;
      }
      return false;
    } catch (error) {
      console.error("Failed to save message:", error);
      return false;
    }
  };

  // Sample photos - replace with actual celebrant photos
  const photos = [
    "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=800&h=600&fit=crop",
    "https://images.unsplash.com/photo-1530103862676-de8c9debad1d?w=800&h=600&fit=crop",
    "https://images.unsplash.com/photo-1464207687429-7505649dae38?w=800&h=600&fit=crop",
  ];

  const celebrantInfo = {
    name: "Alex Thompson",
    age: "25",
    birthday: "July 15, 2024",
    quote: "Life is a celebration, and today we celebrate you!",
    favoriteThings: [
      "Photography",
      "Travel",
      "Coffee",
      "Music",
      "Friends & Family",
    ],
  };

  const eventDetails = {
    date: "Saturday, July 15, 2024",
    time: "7:00 PM - 11:00 PM",
    venue: "The Garden Terrace",
    address: "123 Celebration Ave, Party City",
  };

  useEffect(() => {
    // Load messages when component mounts
    loadMessages();

    const interval = setInterval(() => {
      setCurrentPhoto((prev) => (prev + 1) % photos.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  const handleSubmitMessage = async () => {
    if (!newMessage.name.trim() || !newMessage.message.trim()) return;

    setIsSubmitting(true);

    const success = await saveMessage(newMessage.name, newMessage.message);

    if (success) {
      setNewMessage({ name: "", message: "" });
    }

    setIsSubmitting(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-purple-50 to-indigo-50">
      {/* Header */}
      <header className="relative overflow-hidden bg-gradient-to-r from-pink-500 via-purple-600 to-indigo-600 text-white">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="relative max-w-6xl mx-auto px-4 py-16 text-center">
          <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm rounded-full px-6 py-2 mb-6">
            <Gift className="w-5 h-5" />
            <span className="text-sm font-medium">Birthday Celebration</span>
          </div>
          <h1 className="text-5xl md:text-7xl font-bold mb-4 bg-gradient-to-r from-yellow-200 to-pink-200 bg-clip-text text-transparent">
            Happy Birthday
          </h1>
          <h2 className="text-3xl md:text-4xl font-semibold mb-6">
            {celebrantInfo.name}!
          </h2>
          <p className="text-xl md:text-2xl opacity-90 max-w-2xl mx-auto leading-relaxed">
            {celebrantInfo.quote}
          </p>
          <div className="flex items-center justify-center gap-4 mt-8">
            <div className="flex items-center gap-2 bg-white/20 backdrop-blur-sm rounded-full px-4 py-2">
              <Calendar className="w-4 h-4" />
              <span className="text-sm font-medium">
                {celebrantInfo.birthday}
              </span>
            </div>
            <div className="flex items-center gap-2 bg-white/20 backdrop-blur-sm rounded-full px-4 py-2">
              <Star className="w-4 h-4" />
              <span className="text-sm font-medium">
                Turning {celebrantInfo.age}
              </span>
            </div>
          </div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-pink-50 to-transparent"></div>
      </header>

      <div className="max-w-6xl mx-auto px-4 py-12">
        {/* Photo Gallery */}
        <section className="mb-16">
          <div className="text-center mb-8">
            <h3 className="text-3xl font-bold text-gray-800 mb-4">
              Celebrating the Moments
            </h3>
            <p className="text-gray-600 text-lg">
              Beautiful memories captured in time
            </p>
          </div>

          <div className="relative bg-white rounded-3xl shadow-2xl overflow-hidden">
            <div className="aspect-video relative">
              <img
                src={photos[currentPhoto]}
                alt={`Celebration photo ${currentPhoto + 1}`}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent"></div>
              <div className="absolute bottom-6 left-6 right-6">
                <div className="flex items-center justify-between">
                  <div className="flex gap-2">
                    {photos.map((_, index) => (
                      <button
                        key={index}
                        onClick={() => setCurrentPhoto(index)}
                        className={`w-3 h-3 rounded-full transition-all ${
                          index === currentPhoto ? "bg-white" : "bg-white/50"
                        }`}
                      />
                    ))}
                  </div>
                  <div className="bg-black/50 backdrop-blur-sm rounded-full px-3 py-1 text-white text-sm">
                    <Camera className="w-4 h-4 inline mr-1" />
                    {currentPhoto + 1} of {photos.length}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* About Section */}
        <section className="mb-16">
          <div className="bg-white rounded-3xl shadow-xl p-8 md:p-12">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div>
                <h3 className="text-3xl font-bold text-gray-800 mb-6">
                  About {celebrantInfo.name}
                </h3>
                <p className="text-gray-600 text-lg leading-relaxed mb-8">
                  Today we celebrate an incredible person who brings joy,
                  laughter, and positivity wherever they go. A true friend, an
                  inspiration, and someone who makes every day brighter just by
                  being themselves.
                </p>
                <div>
                  <h4 className="text-xl font-semibold text-gray-800 mb-4">
                    Favorite Things
                  </h4>
                  <div className="flex flex-wrap gap-3">
                    {celebrantInfo.favoriteThings.map((thing, index) => (
                      <span
                        key={index}
                        className="bg-gradient-to-r from-pink-100 to-purple-100 text-purple-800 px-4 py-2 rounded-full font-medium"
                      >
                        {thing}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
              <div className="bg-gradient-to-br from-pink-500 to-purple-600 rounded-2xl p-8 text-white">
                <h4 className="text-2xl font-bold mb-6">Party Details</h4>
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <Calendar className="w-5 h-5" />
                    <span>{eventDetails.date}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Clock className="w-5 h-5" />
                    <span>{eventDetails.time}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <MapPin className="w-5 h-5" />
                    <div>
                      <div className="font-semibold">{eventDetails.venue}</div>
                      <div className="text-sm opacity-90">
                        {eventDetails.address}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Messages Section */}
        <section className="mb-16">
          <div className="text-center mb-8">
            <h3 className="text-3xl font-bold text-gray-800 mb-4">
              Birthday Messages
            </h3>
            <p className="text-gray-600 text-lg">
              Share your warm wishes and celebrate together
            </p>
          </div>

          {/* Message Form */}
          <div className="bg-white rounded-3xl shadow-xl p-8 mb-8">
            <h4 className="text-2xl font-semibold text-gray-800 mb-6 flex items-center gap-2">
              <MessageCircle className="w-6 h-6 text-purple-600" />
              Leave a Birthday Message
            </h4>
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Your Name
                </label>
                <input
                  type="text"
                  value={newMessage.name}
                  onChange={(e) =>
                    setNewMessage((prev) => ({ ...prev, name: e.target.value }))
                  }
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                  placeholder="Enter your name"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Your Message
                </label>
                <textarea
                  value={newMessage.message}
                  onChange={(e) =>
                    setNewMessage((prev) => ({
                      ...prev,
                      message: e.target.value,
                    }))
                  }
                  rows={4}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all resize-none"
                  placeholder="Write your birthday wishes..."
                />
              </div>
              <button
                onClick={handleSubmitMessage}
                disabled={isSubmitting}
                className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-8 py-3 rounded-xl font-semibold hover:from-purple-700 hover:to-pink-700 transition-all transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
              >
                {isSubmitting ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                    Sending...
                  </>
                ) : (
                  <>
                    <Send className="w-4 h-4" />
                    Send Message
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Messages Display */}
          <div className="space-y-6">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className="bg-white rounded-2xl shadow-lg p-6 transform hover:scale-[1.02] transition-all"
              >
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center text-white font-bold">
                    {msg.avatar}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <h5 className="font-semibold text-gray-800">
                        {msg.name}
                      </h5>
                      <span className="text-sm text-gray-500">{msg.time}</span>
                    </div>
                    <p className="text-gray-700 leading-relaxed">
                      {msg.message}
                    </p>
                    {/* <div className="flex items-center gap-4 mt-3">
                      <button className="flex items-center gap-1 text-pink-600 hover:text-pink-700 transition-colors">
                        <Heart className="w-4 h-4" />
                        <span className="text-sm">Like</span>
                      </button>
                    </div> */}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <div className="flex items-center justify-center gap-2 mb-4">
            <Gift className="w-6 h-6 text-purple-400" />
            <span className="text-xl font-semibold">Birthday Celebration</span>
          </div>
          <p className="text-gray-400 mb-6">
            Thank you for being part of this special celebration. Your presence
            makes it even more meaningful!
          </p>
          <div className="flex justify-center gap-6">
            <span className="text-2xl">🎉</span>
            <span className="text-2xl">🎂</span>
            <span className="text-2xl">🎈</span>
            <span className="text-2xl">🎁</span>
            <span className="text-2xl">💝</span>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default BirthdayCelebrationSite;
