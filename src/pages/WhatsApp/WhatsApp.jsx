import React, { useState, useEffect } from 'react';
import './WhatsApp.css';
import OpenAI from "openai";
import { useParams } from "react-router-dom";



const WhatsApp = () => {
  const { id } = useParams(); 
  const [messages, setMessages] = useState([]);
  const [msgtemplate, setMsgTemplate] = useState('');

  const [contacts, setContacts] = useState("");
  const [messageTemplate, setMessageTemplate] = useState('');



 


  

 

 
  useEffect(() => {

  }, [contacts]);
  const fetchContacts = async () => {
    try {
      const response = await fetch(`https://backendcrmnurenai.azurewebsites.net/contacts/${id}`);
      const data = await response.json();
    
    setContacts(data);

    } catch (error) {
      console.error("Error fetching contacts:", error);
    }
  };
  useEffect(() => {
    fetchContacts();
  }, []);

  

const generateWhatsAppMessage = async () => {
  try {
        const name = contacts.first_name && contacts.last_name ? `${contacts.first_name} ${contacts.last_name}` : 'there';

      const prompts = [
          `Hey ${name}! 😊 Thinking Python for AI. Simple and powerful. What do you think, ${name}?`,
          `Hi ${name}! 😄 Python's great for AI. Let's make something cool!`,

      ];


      const randomIndex = Math.floor(Math.random() * prompts.length);
      const prompt = prompts[randomIndex];

      const response = await openai.chat.completions.create({
          model: "gpt-3.5-turbo",
          messages: [
              { role: "system", content: prompt },
          ],
      });
      console.log("#######",name);

      const messageContent = response.choices[0].message.content.trim();

      console.log('Generated WhatsApp message content:', messageContent);

      setMessageTemplate(messageContent);
  } catch (error) {
      console.error('Error generating WhatsApp message:', error);
  }
};




 
const handleGenerateMessage = async (e) => {
  e.preventDefault();
  await fetchContacts(); 
  await generateWhatsAppMessage(); 
};



  const handleSend = () => {
    setMessages(prevMessages => [
      ...prevMessages,
      { sender: 'user', content: messageTemplate }
    ]);

    setMessageTemplate('');
  };

  return (
    <div className="whatsapp-container">
      <div className="chat-header">
        {contacts && <h1>Chat with {contacts.first_name}</h1>}
      </div>
      <div className="messages-container1">
        {messages.map((message, index) => (
          <div key={index} className={`message ${message.sender}`}>
            {message.content}
          </div>
        ))}
      </div>
      <div className='message1'>
        <label htmlFor="">Message:</label>
        <textarea 
          id="message" 
          name="message" 
          rows="6" 
          value={messageTemplate} 
          onChange={(e) => setMessageTemplate(e.target.value)} 
        />
      </div>
      <div className="input-container1">
        <button className="generatemsg" onClick={handleGenerateMessage}>Generate Message</button>
        <button className='sendmsg' onClick={handleSend}>Send</button>
      </div>
    </div>
  );
};

export default WhatsApp;
