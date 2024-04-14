import { useState } from 'react';
import axios from 'axios';

const App = () => {
  const [prompt, setPrompt] = useState("");
  const [conversation, setConversation] = useState([]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const question = prompt;

    try {
      const reply = await axios.post('http://localhost:3000/', { prompt: question });
      let answer = reply.data.response;
      let x = answer.split(' ').filter(part => !part.includes('*')).join(' ');
      const newEntry = { question: question, answer: x };
      setConversation([...conversation, newEntry]);
      setPrompt('');
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  }

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Bloggery ChatBot</h1>

      <div>
        {conversation.map((entry, index) => (
          <div key={index} className="mb-4 p-2 border-b">
            <p className="text-lg font-semibold capitalize"><span className='text-gray-600'>You:</span> {entry.question}</p>
            <p className="text-green-600">Sam: {entry.answer}</p>
          </div>
        ))}
      </div>
      <form onSubmit={handleSubmit} className="mb-4 flex">
        <input
          type="text"
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          className="border p-2 rounded mr-2 w-full"
          placeholder="Ask something..."
        />
        <button type="submit" className="bg-gray-800 hover:bg-orange-700 text-white font-bold py-2 px-4 rounded">
          Submit
        </button>
      </form>
    </div>
  );
}

export default App;
