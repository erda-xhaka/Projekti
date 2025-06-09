'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Mail, MapPin, Phone, MessageSquare } from 'lucide-react';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from '@/components/ui/card';

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });

<<<<<<< HEAD
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [chatMessages, setChatMessages] = useState<
    { sender: 'user' | 'agent'; text: string }[]
  >([]);
  const [chatInput, setChatInput] = useState('');
  const [notification, setNotification] = useState({
    show: false,
    type: 'success',
    message: ''
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const res = await fetch('http://localhost:5000/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (data.success) {
        setNotification({
          show: true,
          type: 'success',
          message: 'Mesazhi u dërgua me sukses!'
        });
        setFormData({ name: '', email: '', subject: '', message: '' });
      } else {
        setNotification({
          show: true,
          type: 'error',
          message: 'Gabim gjatë dërgimit: ' + data.message
        });
      }
    } catch (error) {
      setNotification({
        show: true,
        type: 'error',
        message: 'Gabim i papritur gjatë dërgimit të mesazhit.'
      });
      console.error(error);
    }
  };

  const toggleChat = () => setIsChatOpen((prev) => !prev);

  const sendMessage = () => {
    if (!chatInput.trim()) return;

    setChatMessages((prev) => [...prev, { sender: 'user', text: chatInput }]);
    setChatInput('');

    setTimeout(() => {
      setChatMessages((prev) => [
        ...prev,
        {
          sender: 'agent',
          text: 'Faleminderit që na kontaktuat! Si mund t\'ju ndihmojmë?',
        },
      ]);
    }, 1500);
  };
=======
 const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();

  try {
    const res = await fetch('http://localhost:5000/api/contact', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData),
    });

    const data = await res.json();

    if (data.success) {
      alert('Mesazhi u dërgua me sukses!');
      setFormData({
        name: '',
        email: '',
        subject: '',
        message: '',
      });
    } else {
      alert('Gabim gjatë dërgimit: ' + data.message);
    }
  } catch (error) {
    alert('Gabim i papritur gjatë dërgimit të mesazhit.');
    console.error(error);
  }
};

>>>>>>> 6270e43a (added new file)

  return (
    <div className="pb-20">
      {/* Notification */}
      {notification.show && (
        <div className={`fixed top-4 right-4 p-4 rounded-md shadow-lg z-50 flex items-start gap-3
          ${notification.type === 'success' 
            ? 'bg-green-50 border border-green-200 text-green-800' 
            : 'bg-red-50 border border-red-200 text-red-800'
          }`}
        >
          {notification.type === 'success' ? (
            <svg className="w-5 h-5 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
            </svg>
          ) : (
            <svg className="w-5 h-5 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
            </svg>
          )}
          <div>
            <p className="font-medium">{notification.message}</p>
            <button 
              onClick={() => setNotification({...notification, show: false})}
              className="text-sm mt-1 text-gray-500 hover:text-gray-700"
            >
              Mbyll
            </button>
          </div>
        </div>
      )}

      <div className="bg-muted/40 py-16 mb-16">
        <div className="container max-w-3xl mx-auto text-center">
          <h1 className="text-4xl font-bold tracking-tight mb-4">Contact Us</h1>
          <p className="text-lg text-muted-foreground">
           Jemi këtu për t’ju ndihmuar! Kontaktoni ekipin tonë për çdo pyetje, sugjerim ose kërkesë.
          </p>
        </div>
      </div>

      <div className="container max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          <div className="space-y-6">
            <Card>
              <CardContent className="p-6 flex gap-4 items-start">
                <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <MapPin className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold text-lg mb-2">Visit Us</h3>
                  <p className="text-muted-foreground">
                    123 Book Street
                    <br />
                    Reading City, RC 12345
                    <br />
                    United States
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6 flex gap-4 items-start">
                <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <Phone className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold text-lg mb-2">Call Us</h3>
                  <p className="text-muted-foreground">
                    Customer Service: (555) 123-4567
                    <br />
                    Business Inquiries: (555) 987-6543
                  </p>
                  <p className="text-sm text-muted-foreground mt-2">
                    Monday - Friday: 9am - 6pm
                    <br />
                    Saturday: 10am - 4pm
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6 flex gap-4 items-start">
                <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <Mail className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold text-lg mb-2">Email Us</h3>
                  <p className="text-muted-foreground">
                    General Inquiries:
                    <br />
                    <a
                      href="mailto:info@LibriNet.com"
                      className="text-primary hover:underline"
                    >
                      info@LibriNet.com
                    </a>
                  </p>
                  <p className="text-muted-foreground mt-2">
                    Support:
                    <br />
                    <a
                      href="mailto:support@LibriNet.com"
                      className="text-primary hover:underline"
                    >
                      support@LibriNet.com
                    </a>
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle>Send Us a Message</CardTitle>
                <CardDescription>
                  Fill out the form below and we'll get back to you as soon as
                  possible.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label htmlFor="name" className="text-sm font-medium">
                        Name
                      </label>
                      <Input
                        id="name"
                        value={formData.name}
                        onChange={(e) =>
                          setFormData({ ...formData, name: e.target.value })
                        }
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <label htmlFor="email" className="text-sm font-medium">
                        Email
                      </label>
                      <Input
                        id="email"
                        type="email"
                        value={formData.email}
                        onChange={(e) =>
                          setFormData({ ...formData, email: e.target.value })
                        }
                        required
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="subject" className="text-sm font-medium">
                      Subject
                    </label>
                    <Input
                      id="subject"
                      value={formData.subject}
                      onChange={(e) =>
                        setFormData({ ...formData, subject: e.target.value })
                      }
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="message" className="text-sm font-medium">
                      Message
                    </label>
                    <Textarea
                      id="message"
                      rows={6}
                      value={formData.message}
                      onChange={(e) =>
                        setFormData({ ...formData, message: e.target.value })
                      }
                      required
                    />
                  </div>
                  <Button type="submit" className="w-full">
                    Send Message
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      <div className="fixed bottom-6 right-6">
        <Button
          onClick={toggleChat}
          variant="default"
          className="flex items-center gap-2"
        >
          <MessageSquare />
          Chat
        </Button>
      </div>

      {isChatOpen && (
        <div className="fixed bottom-20 right-6 w-96 bg-white dark:bg-gray-900 border dark:border-gray-700 rounded-lg shadow-lg flex flex-col">
          <div className="p-4 border-b border-gray-200 dark:border-gray-700 flex justify-between items-center">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Live Chat</h2>
            <button
              onClick={toggleChat}
              aria-label="Close chat"
              className="text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-white"
            >
              &times;
            </button>
          </div>
          <div className="flex-1 p-4 overflow-y-auto space-y-4">
            {chatMessages.length === 0 && (
              <p className="text-gray-500 dark:text-gray-400">Start the conversation...</p>
            )}
            {chatMessages.map((msg, idx) => (
              <div
                key={idx}
                className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`px-4 py-2 rounded-lg max-w-xs
                    ${
                      msg.sender === 'user'
                        ? 'bg-primary text-yellow-700 dark:text-yellow-300'
                        : 'bg-gray-200 text-gray-900 dark:bg-gray-800 dark:text-gray-100'
                    }
                  `}
                >
                  {msg.text}
                </div>
              </div>
            ))}
          </div>
          <div className="p-4 border-t border-gray-200 dark:border-gray-700 flex gap-2">
            <input
              type="text"
              className="flex-1 border border-gray-300 dark:border-gray-600 rounded px-3 py-2
                text-gray-900 dark:text-white bg-white dark:bg-gray-800
                placeholder-gray-400 dark:placeholder-gray-500
                focus:outline-none focus:ring-2 focus:ring-primary"
              placeholder="Type a message..."
              value={chatInput}
              onChange={(e) => setChatInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  e.preventDefault();
                  sendMessage();
                }
              }}
            />
            <Button onClick={sendMessage} disabled={!chatInput.trim()}>
              Send
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}