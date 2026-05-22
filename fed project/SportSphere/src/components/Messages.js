import React, { useState, useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';

export default function Messages() {
    const [message, setMessage] = useState('');
    const [messages, setMessages] = useState([]);
    const [contacts, setContacts] = useState([]);
    const [recipientId, setRecipientId] = useState(null);
    const [recipientName, setRecipientName] = useState('');
    const [users, setUsers] = useState({});
    const location = useLocation();
    const scrollRef = useRef(); // Reference for scrolling

    // Set recipientId from location state
    useEffect(() => {
        if (location.state && location.state.recipientId) {
            setRecipientId(location.state.recipientId);
        }
    }, [location.state]);

    // Fetch contacts (users the current user has interacted with)
    useEffect(() => {
        const fetchContacts = async () => {
            try {
                const response = await fetch('http://localhost:8000/messages-api', {
                    method: 'GET',
                    credentials: 'include', // Include cookies with the request
                });

                if (!response.ok) throw new Error('Failed to fetch contacts');

                const data = await response.json();
                const contactsData = data.contacts.map((contact) => ({
                    userId: contact.userId,
                    username: contact.username,
                }));

                setContacts(contactsData);
                setUsers(
                    contactsData.reduce((acc, contact) => {
                        acc[contact.userId] = contact.username;
                        return acc;
                    }, {})
                );
            } catch (error) {
                console.error('Error fetching contacts:', error.message);
            }
        };

        fetchContacts();
    }, [messages]);

    // Fetch messages for the selected recipient
    useEffect(() => {
        if (recipientId) {
            const fetchMessages = async () => {
                try {
                    const response = await fetch(`http://localhost:8000/messages-api/${recipientId}`, {
                        method: 'GET',
                        credentials: 'include', // Include cookies with the request
                    });

                    if (!response.ok) throw new Error('Failed to fetch messages');

                    const data = await response.json();
                    setMessages(data.messages);
                    setRecipientName(data.recipientName);
                    scrollToBottom();
                } catch (error) {
                    console.error('Error fetching messages:', error.message);
                }
            };

            fetchMessages();
        }
    }, [recipientId]);

    // Send a new message
    const handleSendMessage = async () => {
        if (message.trim() && recipientId) {
            try {
                const response = await fetch('http://localhost:8000/messages-api', {
                    method: 'POST',
                    credentials: 'include', // Include cookies with the request
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        text: message,
                        recipientId,
                    }),
                });

                if (!response.ok) throw new Error('Failed to send message');

                const newMessage = await response.json();
                setMessages((prevMessages) => [...prevMessages, newMessage]);
                setMessage('');
                scrollToBottom();
            } catch (error) {
                console.error('Error sending message:', error.message);
            }
        }
    };

    // Select a contact to view messages
    const handleSelectContact = (selectedRecipientId) => {
        setRecipientId(selectedRecipientId);
    };

    // Scroll to the bottom of the messages
    const scrollToBottom = () => {
        scrollRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    return (
        <div className="container mx-auto p-4">
            <div className="flex">
                {/* Contact List */}
                <div className="w-1/3 bg-gray-800 p-6 rounded-lg shadow-lg text-white">
                    <h2 className="text-2xl font-bold mb-4">Contacts</h2>
                    <div className="space-y-4">
                        {contacts.map((contact, index) => (
                            <div
                                key={index}
                                className="p-3 rounded bg-gray-700 cursor-pointer hover:bg-gray-600"
                                onClick={() => handleSelectContact(contact.userId)}
                            >
                                <p>{contact.username || 'Unknown User'}</p>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Messages Section */}
                <div className="w-2/3 ml-8 bg-gray-800 p-6 rounded-lg shadow-lg text-white">
                    <h2 className="text-2xl font-bold mb-4">
                        Messages with {recipientName || 'Select a contact'}
                    </h2>
                    <div className="space-y-4 h-64 overflow-y-scroll">
                        {messages.map((msg, index) => (
                            <div
                                key={index}
                                className={`p-4 rounded-lg ${
                                    msg.senderId === recipientId
                                        ? 'bg-gray-600 text-left'
                                        : 'bg-blue-600 text-right'
                                }`}
                            >
                                <p>{msg.text}</p>
                                <p className="text-sm text-gray-400">
                                    {new Date(msg.timestamp).toLocaleString()}
                                </p>
                            </div>
                        ))}
                        <div ref={scrollRef}></div>
                    </div>
                    <div className="mt-6">
                        <textarea
                            value={message}
                            onChange={(e) => setMessage(e.target.value)}
                            rows="3"
                            className="w-full p-4 rounded-lg text-black"
                            placeholder="Type a message..."
                        />
                        <button
                            onClick={handleSendMessage}
                            className="mt-4 bg-blue-500 text-white px-6 py-3 rounded-lg hover:bg-blue-600"
                        >
                            Send
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
