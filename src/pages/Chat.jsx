import React, { useState } from 'react';
import axios from 'axios';

function Chat() {
    const [input, setInput] = useState('');
    const [answer, setAnswer] = useState('');
    const [loading, setLoading] = useState(false);

    async function generateAnswer() {
        setLoading(true);
        try {
            const response = await axios({
                url: 'https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=AIzaSyD7pwhZ9gLuHEp8hsJZeo_COS6OjXpln3w',
                method: 'post',
                data: {
                    contents: [{ parts: [{ text: input }] }],
                },
            });
            setAnswer(response.data.candidates[0].content.parts[0].text);
        } catch (error) {
            console.log(error);
        }
        setLoading(false);
    }

    return (
        <div style={{ 
            maxWidth: 'auto', 
            margin: '0 auto', 
            textAlign: 'center', 
            fontFamily: 'Arial, sans-serif',
            backgroundImage: `url('https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSkUqvOK-xym02XDNmxI5N5hVEoLE4lFOYWtPk85lUDzw&s')`,
            // backgroundSize: 'cover',
            // backgroundPosition: 'center',
            minHeight: '100vh',
            padding: '20px'
        }}>
            <h2 style={{ marginBottom: '20px', color: '#fff' }}>Hello, How can I assist you today?</h2>
            <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '20px' }}>
                <input
                    type="text"
                    placeholder="Enter your query"
                    onChange={(e) => setInput(e.target.value)}
                    value={input}
                    style={{ padding: '10px', marginRight: '10px', borderRadius: '5px', border: '1px solid #ccc', width: '300px' }}
                />
                <button onClick={generateAnswer} style={{ padding: '10px 20px', cursor: 'pointer', borderRadius: '5px', backgroundColor: '#007bff', color: '#fff', border: 'none' }}>
                    Find
                </button>
            </div>
            {loading ? (
                <p style={{ fontStyle: 'italic', color: '#fff' }}>Loading...</p>
            ) : answer ? (
                <div style={{ marginTop: '20px', border: '1px solid #ccc', borderRadius: '5px', padding: '20px', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)', backgroundColor: 'rgba(255,255,255,0.8)' }}>
                    <p style={{ fontSize: '18px', color: '#333' }}>{answer}</p>
                </div>
            ) : null}
        </div>
    );
}

export default Chat;
